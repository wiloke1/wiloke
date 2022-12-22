import { useEffect, useRef } from 'react';
import { pmChildren } from 'utils/functions/postMessage';
import { PostMessageOff } from 'wiloke-react-core/utils';
import { useSectionIdCodeVisible } from '../globalState';

export const useListenCodeVisibleSectionId = () => {
  const pmChildrenOff = useRef<PostMessageOff | undefined>();

  const [, setSectionIdCodeVisible] = useSectionIdCodeVisible();

  useEffect(() => {
    pmChildrenOff.current = pmChildren.on('@leftBarSection/editCode', ({ sectionId }) => {
      setSectionIdCodeVisible(sectionId);
    });
    return () => {
      pmChildrenOff.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
