import { ComponentType } from 'react';
import { LocationStates } from './LocationStates';

export type PathName = keyof LocationStates;

export type Role = 'guest' | 'admin' | 'user' | 'partner' | 'dev';

export interface Page {
  path: PathName;
  exact?: boolean;
  component: ComponentType;
  title?: string;
}
