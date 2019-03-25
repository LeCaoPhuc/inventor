import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  template: `
    <nb-card>
    <nb-card-header>Enter file name</nb-card-header>
    <nb-card-body>
      <input #filename nbInput placeholder="FileName">
    </nb-card-body>
    <nb-card-footer>
      <button nbButton status="danget" (click)="cancel()">Cancel</button>
      <button nbButton status="success" (click)="submit(filename.value)">Submit</button>
    </nb-card-footer>
  </nb-card>

  `,
  styleUrls: ['input-filename-form.component.scss'],
})
export class InputFileNameFormComponent {
  constructor(protected ref: NbDialogRef<InputFileNameFormComponent>) {}

  cancel() {
    this.ref.close();
  }

  submit(name) {
    this.ref.close(name);
  }
}
