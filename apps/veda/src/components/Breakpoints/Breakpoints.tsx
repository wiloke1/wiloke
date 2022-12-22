import Radio from 'components/Radio';
import Tooltip from 'components/Tooltip';
import { FC } from 'react';
import { i18n } from 'translation';
import { FontAwesome } from 'wiloke-react-core';
import * as styles from './styles';

export type BreakpointsValue = 'lg' | 'md' | 'sm' | 'xs';

export interface BreakpointsProps {
  value: BreakpointsValue;
  onChange?: (value: BreakpointsValue) => void;
}

const Breakpoints: FC<BreakpointsProps> = ({ value, onChange }) => {
  return (
    <Radio.Group
      value={value}
      block
      size="large"
      onChangeValue={value => {
        onChange?.(value as BreakpointsValue);
      }}
    >
      <Radio.Button key="lg" value="lg">
        <Tooltip portal text={i18n.t('general.desktop')} css={styles.icon}>
          <FontAwesome type="far" name="desktop" size={16} />
        </Tooltip>
      </Radio.Button>
      <Radio.Button key="md" value="md">
        <Tooltip portal text={`${i18n.t('general.tablet')} (landscape)`} css={styles.icon}>
          <FontAwesome type="far" name="tablet" css={{ transform: 'rotate(90deg)' }} size={16} />
        </Tooltip>
      </Radio.Button>
      <Radio.Button key="sm" value="sm">
        <Tooltip portal text={`${i18n.t('general.tablet')} (portrait)`} css={styles.icon}>
          <FontAwesome type="far" name="tablet" size={16} />
        </Tooltip>
      </Radio.Button>
      <Radio.Button key="xs" value="xs">
        <Tooltip portal text={i18n.t('general.mobile')} css={styles.icon}>
          <FontAwesome type="far" name="mobile" size={16} />
        </Tooltip>
      </Radio.Button>
    </Radio.Group>
  );
};

export default Breakpoints;
