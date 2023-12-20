import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { recipesResolver } from './recipes.resolver';

describe('recipesResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => recipesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
