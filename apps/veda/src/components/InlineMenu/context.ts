import { useContext } from 'react';
import { createContext } from 'react';

export interface InlineMenuContextValue {
  ids: string[];
  setIds?: (ids: string[]) => void;
}

const InlineMenuContext = createContext<InlineMenuContextValue | undefined>(undefined);

export const InlineMenuProvider = InlineMenuContext.Provider;

export const useInlineMenu = () => {
  const state = useContext(InlineMenuContext);
  return state;
};
