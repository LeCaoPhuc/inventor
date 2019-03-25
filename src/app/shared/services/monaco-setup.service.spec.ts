/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MonacoSetupService } from './monaco-setup.service';

describe('Service: MonacoSetup', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonacoSetupService],
    });
  });

  it('should ...', inject([MonacoSetupService], (service: MonacoSetupService) => {
    expect(service).toBeTruthy();
  }));
});
