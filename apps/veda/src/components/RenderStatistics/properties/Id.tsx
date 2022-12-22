import { FC } from 'react';

interface Props {
  id: string;
}

export const Id: FC<Props> = ({ id }) => {
  return <span>ID: {id}</span>;
};
