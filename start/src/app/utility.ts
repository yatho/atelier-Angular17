import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export const getFromResolvers = <T>(key: string) => {
  const data = inject(ActivatedRoute).snapshot.data;
  return data[key] ?? undefined;
};
