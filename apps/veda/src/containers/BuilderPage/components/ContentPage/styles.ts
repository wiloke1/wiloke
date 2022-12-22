import { Device } from 'containers/BuilderPage/store/responsive/slice';
import { Styles, Theme } from 'wiloke-react-core';

export const header: Styles = {
  className: 'BuilderContentPage-header',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: '10px',
};

export const tab = ({ colors }: Theme): Styles => ({
  backgroundColor: colors.light,
  marginTop: '-50px',
  borderBottom: `1px solid ${colors.gray3}`,
});

export const tabItem: Styles = {
  height: '50px',
  display: 'flex',
  alignItems: 'center',
};

export const iframe = (isDragging: boolean, responsive: Device) => ({ colors }: Theme): Styles => ({
  className: 'BuilderContentPage-iframe',
  position: 'relative',
  transformOrigin: '50% 0',
  transition: 'all 0.2s',
  backgroundColor: colors.light,
  margin: 'auto',
  ...(isDragging
    ? {
        transform: 'scale(0.5) translateY(20px)',
        height: `calc((100vh - 54px - ${responsive === 'desktop' ? '0px' : '20px'}) * 2 - 40px)`,
        border: `1px solid ${colors.gray3}`,
      }
    : {
        height: `calc(100vh - 54px - ${responsive === 'desktop' ? '0px' : '20px'})`,
        width: responsive === 'mobile' ? '400px' : responsive === 'tablet' ? '768px' : '100%',
        marginTop: responsive === 'desktop' ? undefined : '10px',
      }),
});

export const zoom = (scale: number): Styles => ({
  className: 'BuilderContentPage-zoom',
  transformOrigin: '0 0',
  transform: `scale(${scale})`,
  width: `${100 * (1 / scale)}%`,
  height: `${100 * (1 / scale)}%`,
});

export const content = (value: string, compare: string): Styles => ({
  position: value === compare ? 'relative' : 'absolute',
  width: '100%',
  height: value === compare ? '100%' : '0',
  visibility: value === compare ? 'visible' : 'hidden',
  overflow: 'hidden',
});

export const textEditorWrap: Styles = {
  display: 'flex',
  height: '100%',
};
