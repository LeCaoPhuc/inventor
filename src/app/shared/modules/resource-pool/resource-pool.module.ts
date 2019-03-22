import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourcePoolComponent } from './resource-pool.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [ResourcePoolComponent],
  declarations: [ResourcePoolComponent],
})
export class ResourcePoolModule { }
