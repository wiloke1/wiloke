export interface State {
  isVisible: boolean;
  cause: string;
  description: string;
}

export interface Props {
  id: string;
}

export type Report = (data: Omit<State, 'isVisible'>) => void;

export interface Static {
  getActions: (
    id: Props['id'],
  ) => {
    report: Report;
  };
}
