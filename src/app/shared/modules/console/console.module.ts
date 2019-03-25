import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsoleComponent } from './console.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [ConsoleComponent],
  declarations: [ConsoleComponent],
})
export class ConsoleModule { }
