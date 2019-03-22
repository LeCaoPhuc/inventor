import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonacoEditorComponent } from './monaco-editor.component';
import { SharedModule } from '../../share.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [MonacoEditorComponent],
  declarations: [MonacoEditorComponent],
})
export class MonacoEditorModule { }
