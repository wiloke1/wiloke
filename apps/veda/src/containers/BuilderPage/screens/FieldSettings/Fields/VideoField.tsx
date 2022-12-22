import VideoPlayer from 'components/VideoPlayer';
import withDebounce from 'hocs/withDebounce';
import { useSelector } from 'react-redux';
import { useUpdateSettingsValue } from 'store/actions/actionPages';
import { sectionIdActiveSelector } from 'store/selectors';
import { pmParent } from 'utils/functions/postMessage';
import { FieldContainerProps } from '../types';

export interface VideoFieldProps<T> extends FieldContainerProps<T> {}

const DebounceVideo = withDebounce(VideoPlayer, 'src', 'onChange', 300);

const VideoField = <T extends string>({ value, settingId, childId, grandChildId, forceRenderSection }: VideoFieldProps<T>) => {
  const updateSettingsValue = useUpdateSettingsValue();
  const sectionIdActive = useSelector(sectionIdActiveSelector);

  const handleChange = (src: string) => {
    updateSettingsValue({
      value: src,
      settingId,
      childId,
      grandChildId,
    });
    if (forceRenderSection) {
      pmParent.emit('@rerender', { sectionId: sectionIdActive, action: 'VideoField.tsx' });
    }
  };

  return <DebounceVideo src={value} onChange={handleChange} />;
};

export default VideoField;
