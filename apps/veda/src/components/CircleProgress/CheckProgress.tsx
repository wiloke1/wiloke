import { useStyleSheet } from 'wiloke-react-core';
import { StyleParam } from 'wiloke-react-core/dist/hooks/useStyleSheet';
import * as styled from './styles';
import { keyframeCheck } from './keyframes';

interface Props {
  css?: StyleParam;
}

export const CheckProgress = ({ css }: Props) => {
  const { styles, renderer } = useStyleSheet();
  renderer.renderStatic(keyframeCheck);

  return (
    <svg className={`${styles(styled.checkmark)} ${css ? styles(css) : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
      <circle className={styles(styled.checkmark__circle)} cx="26" cy="26" r="25" fill="none" />
      <path className={styles(styled.checkmark__check)} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
    </svg>
  );
};
