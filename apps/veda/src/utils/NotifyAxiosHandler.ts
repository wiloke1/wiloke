import { notification } from 'antd';
import { AxiosError } from 'axios';

export interface ErrorData {
  code: number;
  message: string;
  status: string;
}

export interface HandleErrorParams {
  error: any;
  fileDetail?: string;
  showNotification?: boolean;
}

const defaultMessage = 'Sorry, something went wrong! Please contact our Supporter  to report this issue';

class NotifyAxiosHandler {
  isAxiosError(error: unknown) {
    if ((error as AxiosError).isAxiosError) {
      return true;
    }
    return false;
  }

  handleError<T extends AxiosError<ErrorData> | Error>(error: T, detail?: string) {
    if ((error as AxiosError).isAxiosError) {
      const _error = error as AxiosError<ErrorData>;
      notification.error({
        duration: 10,
        message: _error.response?.data.message ?? defaultMessage,
        description: detail,
        style: {
          borderRadius: '6px',
        },
      });
    } else {
      notification.error({
        duration: 10,
        message: error.message ?? defaultMessage,
        description: detail,
        style: {
          borderRadius: '6px',
        },
      });
    }
    console.log(error);
  }

  handleSuccess(message: string) {
    notification.success({
      duration: 3,
      message,
      style: {
        borderRadius: '6px',
      },
    });
  }

  handleErrorDetail({ error, fileDetail, showNotification }: HandleErrorParams) {
    let errString;
    if (error.response) {
      errString = JSON.stringify(
        error.response.data.error?.message || error.response.data.error?.msg || error.response.data.error || error.response.data,
      );
    } else if (error.request) {
      errString = JSON.stringify(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      errString = error.message;
    }
    if (showNotification) {
      notification.error({
        message: errString,
        description: fileDetail,
        style: {
          borderRadius: '6px',
        },
      });
    }
    return errString;
  }
}

export const notifyAxiosHandler = new NotifyAxiosHandler();
