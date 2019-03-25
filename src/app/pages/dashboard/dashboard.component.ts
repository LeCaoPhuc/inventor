import { Component, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { LoadingService } from '../../shared/services/loading.service';
import { MonacoEditorComponent } from '../../shared/modules/monaco-editor/monaco-editor.component';
import { Router } from '@angular/router';
import { NbMenuService, NbDialogService } from '@nebular/theme';
import { ParseService } from '../../shared/services/parse.service';
import { InputFileNameFormComponent } from './input-filename-form/input-filename-form.component';
import { ListFileStoreComponent } from './list-file-store/list-file-store.component';
import { ShareDataService } from '../../shared/services/share-data.service';
import { Subject } from 'rxjs';
import { currentFileNameKey } from '../pages-menu';

interface CardSettings {
	title: string;
	iconClass: string;
	type: string;
}

@Component({
	selector: 'ngx-dashboard',
	styleUrls: ['./dashboard.component.scss'],
	templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {
	@ViewChild('monacoEditor') monacoEditor: MonacoEditorComponent;
	@ViewChild('customFile') customFile: ElementRef;
	public currentFileName: Subject<string> = new Subject();
	public cmdContent: string = `Console log Information...`;
	public code: string = ``;
	public currentFile: any = null;
	constructor(
		private loadingService: LoadingService,
		private router: Router,
		private nbMenuService: NbMenuService,
		private parseService: ParseService,
		private dialogService: NbDialogService,
		private shareDataService: ShareDataService,
	) {
		this.shareDataService.setData(currentFileNameKey, this.currentFileName);
		this.nbMenuService.onItemClick().subscribe((itemSelected) => {
			console.log('onItemSelect');
			if (itemSelected.item && itemSelected.item.data) {
				if (itemSelected.item.data.type === 'file') {
					this.setUpEventForFileGroup(itemSelected.item.data);
				}
				if (itemSelected.item.data.type === 'build')  {
					this.setUpEventForBuildGroup(itemSelected.item.data);
				}
			} else {
				console.log('empty data');
			}
		});
	}
	ngOnDestroy() {

	}

	setUpEventForFileGroup(data: any) {
		switch (data.value) {
			case 'open-directory':
				this.openFileSelector();
				break;
			case 'open-file-store':
				console.log('click open File from FileStore');
				this.openFileStoreList();
				break;
			case 'save':
				console.log('click Save');
				this.saveFileStore();
				break;
			case 'save-as':
				console.log('click Save');
				this.saveAsFileStore();
				break;
			default:
				break;
		}
	}

	setUpEventForBuildGroup(data: any) {
		switch (data.value) {
			case 'run':
				this.run();
				break;
			default:
				break;
		}
	}

	saveFileStore() {
		this.code = this.monacoEditor.code;
		let self = this;
		if (self.currentFile) {
			self.parseService.saveFileStore({
				content: self.code,
				id: self.currentFile.id,
				filename: self.currentFile.get('filename'),
			})
			.then(function(res) {
				alert('Save File Success');
				console.log('res ', res);
			})
			.catch(function(error: any) {
				console.log(error);
			});
		} else {
			self.saveAsFileStore();
		}
	}
	saveAsFileStore() {
		this.code = this.monacoEditor.code;
		if (!this.code.trim()) {
			alert('File was not empty');
			return;
		}
		let self = this;
		this.dialogService.open(InputFileNameFormComponent)
		.onClose.subscribe((filename) => {
			console.log('fileName', filename);
			if (filename) {
				self.parseService.saveFileStore({
					content: self.code,
					filename: filename + '.robot',
				})
				.then(function(res) {
					alert('Save File Success');
					self.currentFileName.next(filename + '.robot');
					console.log('res ', res);
				})
				.catch(function(error: any) {
					console.log(error);
				});
			}
		});
	}

	openFileStoreList() {
		let self = this;
		this.dialogService.open(ListFileStoreComponent)
		.onClose.subscribe((item) => {
			if (item) {
				console.log('item', item);
				self.currentFile = item;
				self.code = item.get('content');
				self.currentFileName.next(item.get('filename'));
			} else {
				console.log('none item');
			}
		});
	}

	onClick() {
		// this.loadingService.start();
		// let self = this;
		this.router.navigate(['login']);
		setTimeout(function() {
			// self.loadingService.stop();
		}, 2000);
	}

	run() {
		console.log('run');
		if (this.cmdContent === 'Console log Information...') {
			this.cmdContent = '';
		} else {
			this.cmdContent += '\n';
		}
		let self = this;
		this.code = this.monacoEditor.code;
		this.parseService.saveFile(this.code)
			.then(function (res) {
				self.callCloud();
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	onClickItemRobot(robot) {
		console.log('robot ', robot);
	}

	callCloud() {
		let self = this;
		self.loadingService.start();
		this.parseService.executeCMD()
			.then(function (res: any) {
				self.loadingService.stop();
				if (res.success) {
					self.cmdContent += res.data.trim();
					self.getLog();
				} else {
					self.cmdContent += res.data;
				}
			})
			.catch(function (error) {
				self.loadingService.stop();
				console.log('error ', error);
				self.cmdContent += error.toString();
			});
	}

	getLog() {
		this.parseService.getLog()
			.then(function (res: any) {
				console.log(res);
				if (res && res.success) {
					let blob = new Blob([res.data], { type: 'text/html' });
					let url = window.URL.createObjectURL(blob);
					window.open(url, '_blank');
				}
			})
			.catch(function (error) {
				console.log('error ', error);
			});
	}

	openFileSelector() {
		console.log('Open');
		this.customFile.nativeElement.click();
	}

	fileChangeEvent(event) {
		console.log('fileChangeEvent');
		let self = this;
		let reader = new FileReader();
        reader.onload = () => {
            // this 'text' is the content of the file
			self.code = <string>reader.result;
			self.customFile.nativeElement.value = '';
			self.currentFile = null;
			self.currentFileName.next('');
			console.log('fileEventChange');
        };
        reader.readAsText(this.customFile.nativeElement.files[0]);
	}
}
