import { FC } from 'react';
import { View } from 'wiloke-react-core';

export type IconSvgName = 'text' | 'heading' | 'divider' | 'button' | 'countdown' | 'social' | 'badge';

export interface IconSvgProps {
  name: IconSvgName;
  size?: number;
}

const IconSvg: FC<IconSvgProps> = ({ name, size = 40 }) => {
  return (
    <View css={{ width: `${size}px` }}>
      <View
        tagName="img"
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        src={require(`./icons/${name}.svg`).default as string}
        alt=""
      />
    </View>
  );
};

export default IconSvg;
