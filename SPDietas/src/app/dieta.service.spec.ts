import { TestBed } from '@angular/core/testing';

import { DietaService } from './dieta.service';

describe('DietaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DietaService = TestBed.get(DietaService);
    expect(service).toBeTruthy();
  });
});
