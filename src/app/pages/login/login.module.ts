import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { SharedModule } from '../../shared/share.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [LoginComponent],
  declarations: [LoginComponent],
})
export class LoginModule { }
