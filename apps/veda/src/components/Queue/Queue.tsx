import { PureComponent, ReactNode } from 'react';

interface QueueProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface QueueState {
  isLoaded: boolean;
}

type DefaultProps = Pick<QueueProps, 'fallback'>;

export default class Queue extends PureComponent<QueueProps, QueueState> {
  static defaultProps: DefaultProps = {
    fallback: null,
  };

  _req!: number;

  constructor(props: QueueProps) {
    super(props);
    this.state = {
      isLoaded: false,
    };
    this._req = requestAnimationFrame(this._handleLoaded);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this._req);
  }

  _handleLoaded = () => {
    this.setState({
      isLoaded: true,
    });
  };

  render() {
    const { children, fallback } = this.props;
    const { isLoaded } = this.state;
    return isLoaded ? children : fallback;
  }
}
