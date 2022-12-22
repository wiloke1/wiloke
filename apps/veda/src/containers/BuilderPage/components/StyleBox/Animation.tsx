import Field from 'components/Field';
import FieldGroup from 'components/FieldGroup';
import SelectAntd from 'components/SelectAntd';
import { FC, useEffect, useRef, useState } from 'react';
import { i18n } from 'translation';
import { pmParent } from 'utils/functions/postMessage';
import { AnimateField } from './AnimateField';
import { Animate, CssAnimation } from './types';

export interface AnimationProps {
  value: CssAnimation;
  onChange?: (value: CssAnimation) => void;
}

export const Animation: FC<AnimationProps> = ({ value, onChange }) => {
  const [animateType, setAnimateType] = useState<CssAnimation['type']>(value.type);
  const [animate, setAnimate] = useState<Animate>(value.animate);
  const mountedRef = useRef(false);
  const visibleRef = useRef(value.animate !== '');

  useEffect(() => {
    if (mountedRef.current) {
      onChange?.({ animate, type: animateType });
      pmParent.emit('@animate');
    }

    mountedRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate, animateType]);

  return (
    <FieldGroup
      visible={visibleRef.current}
      label={i18n.t('general.animation')}
      containerCss={{ marginBottom: '5px' }}
      contentCss={{ paddingBottom: 0 }}
      onToggle={() => {
        pmParent.emit('@animate');
      }}
    >
      <Field label={i18n.t('general.choose', { text: i18n.t('general.animation'), textTransform: 'capitalize' })} fontSize={13}>
        <AnimateField value={animate} onChange={setAnimate} />
      </Field>
      <Field label={i18n.t('general.animation_type')} fontSize={13}>
        <SelectAntd
          value={animateType}
          data={[
            {
              label: i18n.t('general.repeat'),
              value: 'infinite',
            },
            {
              label: i18n.t('general.once'),
              value: '',
            },
            {
              label: i18n.t('general.scroll_down_to_run'),
              value: 'scroll',
            },
          ]}
          onChange={setAnimateType}
        />
      </Field>
    </FieldGroup>
  );
};
