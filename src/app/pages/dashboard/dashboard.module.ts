import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/share.module';
import { MonacoEditorModule } from '../../shared/modules/monaco-editor/monaco-editor.module';
import { ConsoleModule } from '../../shared/modules/console/console.module';
import { InputFileNameFormComponent } from './input-filename-form/input-filename-form.component';
import { ListFileStoreComponent } from './list-file-store/list-file-store.component';
import { NbDialogModule, NbWindowModule } from '@nebular/theme';

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    SharedModule,
    MonacoEditorModule,
    ConsoleModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
  ],
  declarations: [
    DashboardComponent,
    InputFileNameFormComponent,
    ListFileStoreComponent,
  ],
  entryComponents: [
    InputFileNameFormComponent,
    ListFileStoreComponent,
  ],
})
export class DashboardModule { }
