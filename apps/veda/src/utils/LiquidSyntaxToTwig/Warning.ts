import { notification } from 'antd';

export class LiquidSyntaxToTwigWarning {
  constructor(message: string) {
    console.warn(message);
    if (!window.location.pathname.includes('iframe')) {
      notification.warn({ message: '!!!!!!', description: message });
    }
  }
}
