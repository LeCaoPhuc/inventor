import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created with ♥ by <b><a href="https://innoria.com" target="_blank">PhucLe & AnNguyen</a></b> 2019
    </span>
  `,
})
export class FooterComponent {
}
