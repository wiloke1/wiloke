import { event, PublishStepLoadingPayload } from './event';
import { PublishStepLoadingComponent } from './Component';

class PublishStepLoading {
  private totalSteps: number;
  constructor(totalSteps: number) {
    this.totalSteps = totalSteps;
  }

  private init = () => {
    event.emit('init', this.totalSteps);
  };

  public next = (step?: PublishStepLoadingPayload) => {
    this.init();
    event.emit('next', step);
  };

  public done = () => {
    event.emit('done', undefined);
  };

  public cancel = () => {
    this.done();
  };

  public open = () => {
    event.emit('open', undefined);
  };

  public off = (id: number) => {
    event.off(id);
  };
}

export const createPublishStepLoading = (totalSteps: number) => {
  return new PublishStepLoading(totalSteps);
};

export { PublishStepLoadingComponent };
