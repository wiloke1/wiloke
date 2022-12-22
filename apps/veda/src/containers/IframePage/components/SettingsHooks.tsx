import { FC } from 'react';
import { useDeepCompareEffect } from 'react-use';
import { pageSectionsSelector } from 'store/selectors';
import Emitter, { Observers } from 'utils/functions/Emitter';
import { pmChildren } from 'utils/functions/postMessage';
import { useIframeSelector } from '../hooks/useIframeSelector';

export interface SettingsHooksData {
  sectionId: string;
  name: string;
  value: any;
  forceRender?: boolean;
}

export interface Events {
  settingsHooks: (data: SettingsHooksData) => void;
}

export type EventsObservers = { [key in keyof Events]: Observers<Events[key]> };

const eventEmitter = new Emitter<EventsObservers>();

window.hiddenFieldAction = eventEmitter.emit.bind(eventEmitter, 'settingsHooks');

export const SettingsHooks: FC = () => {
  const sections = useIframeSelector(pageSectionsSelector);

  useDeepCompareEffect(() => {
    const id = eventEmitter.on('settingsHooks', data => {
      if (typeof data.value === 'function') {
        const section = sections.find(section => section.id === data.sectionId);
        const settings = section?.data?.settings?.find?.(setting => setting.name === data.name);
        if (!!settings) {
          const value = data.value(settings.children);
          pmChildren.emit('@settingsHooks', {
            ...data,
            value,
          });
        }
      } else {
        pmChildren.emit('@settingsHooks', data);
      }
    });
    return () => {
      eventEmitter.off(id);
    };
  }, [sections]);

  return null;
};
