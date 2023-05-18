import { TestBed } from '@angular/core/testing';

import { ManageIdeasService } from './manage-ideas.service';

describe('ManageIdeasService', () => {
  let service: ManageIdeasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageIdeasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
