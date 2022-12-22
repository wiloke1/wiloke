import { ReactNode } from 'react';

export const getDisplayName = (child: ReactNode) => {
  const { displayName } = { ...(child as any).type } as { displayName: string };
  return displayName;
};
