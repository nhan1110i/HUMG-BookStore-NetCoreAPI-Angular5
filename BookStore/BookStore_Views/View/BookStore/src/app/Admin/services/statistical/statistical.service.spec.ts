import { TestBed } from '@angular/core/testing';

import { StatisticalService } from './statistical.service';

describe('StatisticalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatisticalService = TestBed.get(StatisticalService);
    expect(service).toBeTruthy();
  });
});
