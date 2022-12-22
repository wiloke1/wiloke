import { FC } from 'react';
import { Helmet } from 'react-helmet';

export interface LinkFontProps {
  fontFamily?: string;
}

const LinkFont: FC<LinkFontProps> = ({ fontFamily }) => {
  if (!fontFamily) {
    return null;
  }
  return (
    <Helmet
      link={[
        {
          rel: 'stylesheet',
          // @ts-ignore
          crossorigin: 'anonymous',
          href: `https://fonts.googleapis.com/css2?family=${fontFamily.replace(
            /\s/g,
            '+',
          )}:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap`,
        },
      ]}
    />
  );
};

export default LinkFont;
