import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { recipeResolver } from './recipe.resolver';

describe('recipeResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => recipeResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
