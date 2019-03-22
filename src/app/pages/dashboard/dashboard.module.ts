import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/share.module';
import { MonacoEditorModule } from '../../shared/modules/monaco-editor/monaco-editor.module';

@NgModule({
  imports: [
    ThemeModule,
	NgxEchartsModule,
	SharedModule,
	MonacoEditorModule,
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
