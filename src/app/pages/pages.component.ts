import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { ShareDataService } from '../shared/services/share-data.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import {currentFileNameKey} from './pages-menu' ;
@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
    <app-loading-cmp></app-loading-cmp>
  `,
})
export class PagesComponent implements OnInit {
  menu: NbMenuItem[] = [
    {
      title: 'Code View',
      icon: 'fa fa-code',
      link: '/pages/dashboard',
      children: [
        {
          title: 'File - New File',
          children: [
            {
              title: 'Open From Directory',
              data: {
                type: 'file',
                value: 'open-directory',
              },
            },
            {
              title: 'Open From FileStore',
              data: {
                type: 'file',
                value: 'open-file-store',
              },
            },
            {
              title: 'Save',
              data: {
                type: 'file',
                value: 'save',
              },
            },
            {
              title: 'Save As...',
              data: {
                type: 'file',
                value: 'save-as',
              },
            },
          ],
        },
        {
          title: 'Build',
          children: [
            {
              title: 'Run',
              data: {
                type: 'build',
                value: 'run',
              },
            },
          ],
        },
      ],
    },
    {
      title: 'Resource Pool',
      icon: 'fa fa-laptop-code',
      link: '/pages/modal-overlays/window',
    },
  ];
  constructor(
    public shareDataService: ShareDataService,
    public changeDetectorRef: ChangeDetectorRef,
  ) {
  }
  ngOnInit() {
    let self = this;
    <DashboardComponent>this.shareDataService.data[currentFileNameKey].subscribe((value: string) => {
      if (value) {
        self.menu[0].children[0].title = 'File - ' + value;
      } else {
        self.menu[0].children[0].title = 'File - ' + 'New File';
      }
      self.changeDetectorRef.detectChanges();
    });
  }
}
