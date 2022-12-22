import { ReactNode, Ref } from 'react';
import { LocationStates } from 'routes/LocationStates';
import { TourPlacement } from './styles';

export interface ChildrenParam {
  ref: Ref<HTMLElement>;
  onNext: () => void;
  onClose: () => void;
  onMouseEnter: () => void;
}

export type Pathname = keyof LocationStates;

export interface TourProps {
  moveFreely?: boolean;
  visible?: boolean;
  placement?: TourPlacement;
  hover?: boolean;
  index?: number;
  title: string;
  text: string;
  top?: number;
  left?: number;
  right?: number;
  pathname: Pathname;
  nextStep?: number;
  nextDisabled?: boolean;
  onNextEnd?: () => void;
  children: ({ ref, onNext, onClose, onMouseEnter }: ChildrenParam) => ReactNode;
}
