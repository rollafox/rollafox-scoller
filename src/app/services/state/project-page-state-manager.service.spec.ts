import { TestBed } from '@angular/core/testing';

import { ProjectPageStateManagerService } from './project-page-state-manager.service';

describe('ProjectPageStateManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectPageStateManagerService = TestBed.get(ProjectPageStateManagerService);
    expect(service).toBeTruthy();
  });
});
