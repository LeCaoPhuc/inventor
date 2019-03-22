import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { MonacoSetupService } from '../../services/monaco-setup.service';

@Component({
	moduleId: module.id,
	selector: 'app-monaco-editor',
	templateUrl: './monaco-editor.component.html',
	styleUrls: ['./monaco-editor.component.scss'],
})
export class MonacoEditorComponent implements OnInit {

	constructor(
		private loadingService: LoadingService,
		private monacoSetupService: MonacoSetupService,
	) { }
	public loading: boolean = true;
	options = {
		theme: 'vs',
		language: 'javascript',
	};
	options1 = {
		theme: 'robotTheme',
		language: 'robotLanguage',
	};
	code: string = ``;

	ngOnInit() {
		console.log('mg');
		this.loadingService.start();
		let self = this;
		let i = 0;
		let interval = setInterval(function () {
			let monaco = (window as any).monaco;
			console.log('Timeoit');
			if (monaco) {
				self.loading = false;
				if (i === 0) {
					i++;
					self.monacoSetupService.initNewLanguage(monaco);
				}
				setTimeout(function () {
					monaco.editor.setTheme('robotTheme');
					self.loadingService.stop();
					clearInterval(interval);
				}, 500);
			}
		}, 100);
	}
}
