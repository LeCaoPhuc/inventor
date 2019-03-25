import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ResourcePoolComponent } from './resource-pool.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  exports: [ResourcePoolComponent],
  declarations: [ResourcePoolComponent],
})
export class ResourcePoolModule { }
