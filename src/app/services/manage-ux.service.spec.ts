import { TestBed } from '@angular/core/testing';

import { ManageUxService } from './manage-ux.service';

describe('ManageUxService', () => {
  let service: ManageUxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageUxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
