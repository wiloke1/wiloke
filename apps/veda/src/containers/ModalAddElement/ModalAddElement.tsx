import MyModal from 'components/MyModal';
import ScrollBars from 'components/ScrollBars';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { FC } from 'react';
import { useAddElement } from 'store/actions/actionPages';
import { i18n } from 'translation';
import { pmParent } from 'utils/functions/postMessage';
import { View } from 'wiloke-react-core';
import { PostMessageOff } from 'wiloke-react-core/utils';
import { dataFake1, dataFake2 } from './dataFake';
import NavBar from './NavBar';
import * as styles from './styles';

const ModalAddElement: FC = () => {
  const [visible, setVisible] = useState(false);
  const [sectionId, setSectionId] = useState('');
  const [elementIndex, setElementIndex] = useState<number>();
  const pmParentOff = useRef<PostMessageOff>();
  const addElement = useAddElement();

  useEffect(() => {
    pmParentOff.current = pmParent.on('@component/openModalAddElement', ({ sectionId, elementIndex }) => {
      setSectionId(sectionId);
      setElementIndex(elementIndex);
      setVisible(true);
    });
    return () => {
      pmParentOff.current?.();
    };
  }, []);

  const renderNav = (
    <ScrollBars css={styles.left}>
      <NavBar />
    </ScrollBars>
  );

  const renderContent = (
    <ScrollBars css={styles.right}>
      <button
        onClick={() => {
          if (!!sectionId && elementIndex !== undefined) {
            addElement({
              sectionId,
              elementIndex,
              ...dataFake1,
            });
            setVisible(false);
          }
        }}
      >
        {i18n.t('general.tabs')}
      </button>
      <button
        onClick={() => {
          if (!!sectionId && elementIndex !== undefined) {
            addElement({
              sectionId,
              elementIndex,
              ...dataFake2,
            });
            setVisible(false);
          }
        }}
      >
        {i18n.t('schema.fieldLabel.slider')}
      </button>
    </ScrollBars>
  );

  return (
    <MyModal
      size="large"
      scrollDisabled
      isVisible={visible}
      headerText={i18n.t('general.element')}
      contentCss={{ padding: 0 }}
      onCancel={() => {
        setVisible(false);
      }}
      cancelText=""
      okText=""
      bodyCss={{ maxWidth: '600px', width: '100%' }}
    >
      <View css={styles.inner}>
        {renderNav}
        {renderContent}
      </View>
    </MyModal>
  );
};

export default ModalAddElement;
