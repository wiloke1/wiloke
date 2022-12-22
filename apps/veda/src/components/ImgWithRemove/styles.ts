import { Theme, Styles } from 'wiloke-react-core';

export const container = (width: number, height: number, src: string): Styles => ({
  position: 'relative',
  borderRadius: '10px',
  width: `${width}px`,
  height: `${height}px`,
  backgroundImage: `url('${src}')`,
  backgroundSize: 'cover',
  backgroundPosition: '50% 50%',
});

export const close = ({ colors }: Theme): Styles => ({
  position: 'absolute',
  top: '5px',
  right: '5px',
  borderRadius: '50%',
  width: '20px',
  height: '20px',
  lineHeight: '20px',
  textAlign: 'center',
  backgroundColor: colors.gray9,
  cursor: 'pointer',
});
