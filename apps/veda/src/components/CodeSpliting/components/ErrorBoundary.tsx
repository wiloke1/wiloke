import oops from 'assets/oops.svg';
import Button from 'components/Button';
import { Component, MouseEventHandler } from 'react';
import { i18n } from 'translation';
import { View } from 'wiloke-react-core';
import Box from 'components/FieldBox';

interface Props {
  onRetry: MouseEventHandler;
  onError: () => void;
}
interface State {
  error: boolean;
}

const IS_DEV = process.env.NODE_ENV === 'development';

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { error: true };
  }

  componentDidCatch() {
    const { onError } = this.props;
    onError();
  }

  handleClick: MouseEventHandler = e => {
    const { onRetry } = this.props;
    onRetry(e);
    this.setState({ error: false });
  };

  render() {
    const { error } = this.state;
    const { children } = this.props;
    if (error && IS_DEV) {
      return (
        <View
          css={{
            maxWidth: '600px',
            minWidth: '200px',
            margin: 'auto',
            padding: '80px 10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <img src={oops} />
          <View css={{ marginTop: '16px', marginBottom: '16px' }}>
            <View>{i18n.t('builderPage.network_error')}</View>
            <Button backgroundColor="primary" radius={8} onClick={this.handleClick}>
              {i18n.t('builderPage.retry')}
            </Button>
          </View>
          <Box
            css={{
              position: 'relative',
              padding: 0,
              overflow: 'hidden',
              width: '100%',
            }}
            borderColor="gray3"
            tagName="form"
            action="https://login.vedabuilder.com"
            method="GET"
            radius={4}
          >
            <input
              name="shop"
              style={{
                display: 'block',
                padding: '10px',
                width: '100%',
                boxShadow: 'none',
                border: 'none',
                outline: 'none',
                height: '54px',
              }}
              placeholder="eg: your_shop (No need for the suffix .myshopkit...)"
            />
            <input type="text" hidden value="requestShopifyCode" name="action" />
            <Button type="submit" radius={4} size="small" css={{ position: 'absolute', right: '4px', top: '50%', transform: 'translateY(-50%)' }}>
              {i18n.t('general.login')}
            </Button>
          </Box>
        </View>
      );
    }

    return children;
  }
}
