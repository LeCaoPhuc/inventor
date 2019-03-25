import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss'],
})
export class ConsoleComponent implements OnInit {
  @Input('cmdContent') cmdContent: string;
  constructor() { }

  ngOnInit() {
  }

}
