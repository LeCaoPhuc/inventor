import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { LoadingService } from '../../shared/services/loading.service';
import { MonacoEditorComponent } from '../../shared/modules/monaco-editor/monaco-editor.component';

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
	constructor(
		private themeService: NbThemeService,
		private loadingService: LoadingService,
	) {
	}

	ngOnDestroy() {
	}

	onClick() {
		this.loadingService.start();
		let self = this;
		setTimeout(function(){
			// self.loadingService.stop();
		}, 2000);
	}
}
