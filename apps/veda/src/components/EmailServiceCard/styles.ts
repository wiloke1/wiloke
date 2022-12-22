import { Theme, Styles } from 'wiloke-react-core';

export const container = (isSelected: boolean, isLoading: boolean) => ({ colors }: Theme): Styles => ({
  backgroundColor: isSelected ? colors.gray2 : colors.gray1,
  border: `2px solid ${isSelected ? colors.primary : colors.gray2}`,
  borderRadius: '10px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
  padding: '20px',
  ...(isLoading ? { opacity: 0.4 } : {}),
});

export const right: Styles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const active: Styles = {
  marginRight: '40px',
};

export const select: Styles = {
  width: '200px',
  marginRight: '40px',
};
