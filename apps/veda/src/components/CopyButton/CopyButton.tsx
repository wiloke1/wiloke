import Button, { ButtonProps } from 'components/Button';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';

export interface CopyButtonProps extends Omit<ButtonProps, 'children'> {
  Copy: ReactNode;
  Copied: ReactNode;
  content: string;
}

export const copyToClipboard = (content: string) => {
  const textArea = document.createElement('textarea');
  textArea.style.width = '1px';
  textArea.style.height = '1px';
  textArea.style.background = 'transparents';
  textArea.value = content;
  document.body.append(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
};

export const CopyButton: FC<CopyButtonProps> = ({ Copied, Copy, content, onClick, ...rest }) => {
  const [status, setStatus] = useState<'copy' | 'copied'>('copy');
  const timeoutRef = useRef<number | undefined>();

  const handleClick: ButtonProps['onClick'] = e => {
    onClick?.(e);
    setStatus('copied');
    copyToClipboard(content);
  };

  useEffect(() => {
    if (status === 'copied') {
      timeoutRef.current = window.setTimeout(() => {
        setStatus('copy');
      }, 3000);
    }
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [status]);

  return (
    <Button onClick={handleClick} {...rest}>
      {status === 'copy' ? Copy : Copied}
    </Button>
  );
};
