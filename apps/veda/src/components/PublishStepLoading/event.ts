import Emitter, { Observers } from 'utils/functions/Emitter';

export interface PublishStepLoadingPayload {
  title: string;
  description: string;
}

export interface Events {
  init: (totalSteps: number) => void;
  next: (step?: PublishStepLoadingPayload) => void;
  done: () => void;
  open: () => void;
}
export type EventsObservers = { [key in keyof Events]: Observers<Events[key]> };
export const event = new Emitter<EventsObservers>();
