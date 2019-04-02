import { TestBed, inject } from '@angular/core/testing';

import { ChangePageService } from './change-page.service';

describe('ChangePageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChangePageService]
    });
  });

  it('should be created', inject([ChangePageService], (service: ChangePageService) => {
    expect(service).toBeTruthy();
  }));
});
