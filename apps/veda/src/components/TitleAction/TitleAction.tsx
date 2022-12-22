import Button from 'components/Button';
import Title, { TitleProps } from 'components/Title/Title';
import { FC } from 'react';

export interface TitleActionProps extends Omit<TitleProps, 'Right' | 'css' | 'titleCss'> {
  buttonText: string;
  onClick?: () => void;
}

const TitleAction: FC<TitleActionProps> = ({ buttonText, onClick, ...rest }) => {
  return (
    <Title
      {...rest}
      css={({ colors }) => ({ padding: '15px', border: `1px solid ${colors.gray3}`, borderRadius: '6px', backgroundColor: colors.gray2 })}
      Right={
        <Button size="extra-small" radius={4} fontFamily="secondary" css={{ fontWeight: 500 }} onClick={onClick}>
          {buttonText}
        </Button>
      }
    />
  );
};

export default TitleAction;
