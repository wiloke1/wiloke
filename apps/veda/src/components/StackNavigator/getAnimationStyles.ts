import { AnimationType } from './types';

const getAnimationStyles = (animationType: AnimationType) => {
  switch (animationType) {
    case 'stack':
      return {
        defaultIn: '-10%',
        defaultOut: '100%',
        activeIn: '100%',
        activeOut: '-10%',
      };
    default:
      return {
        defaultIn: '-100%',
        defaultOut: '100%',
        activeIn: '100%',
        activeOut: '-100%',
      };
  }
};

export default getAnimationStyles;
