import { PreviewImage } from 'types/Page';

export type ChooseImageMode = 'drawer' | 'popup';

interface SetImage {
  type: 'SetImage';
  payload: Partial<State>;
}

export type Actions = SetImage;

interface State {
  image?: PreviewImage;
  visible: boolean;
  imageMode: ChooseImageMode;
  imageWidth?: number;
  loading: Record<string, boolean>;
}

export const defaultState: State = {
  image: undefined,
  imageMode: 'popup',
  visible: false,
  loading: {},
  imageWidth: undefined,
};

export const reducerImage = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'SetImage': {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
