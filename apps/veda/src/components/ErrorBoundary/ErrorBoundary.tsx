import oops from 'assets/oops.svg';
import { Component, MouseEventHandler, ReactNode } from 'react';
import Button from 'components/Button';
import Box from 'components/FieldBox';
import { i18n } from 'translation';
import { View } from 'wiloke-react-core';

export interface ErrorBoundaryProps {
  children: ReactNode;
  onRetry?: MouseEventHandler;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // componentDidCatch(error: Error, errorInfo: any) {
  //   console.log({ error, errorInfo });
  // }

  handleClick: MouseEventHandler = e => {
    const { onRetry } = this.props;
    onRetry?.(e);
    this.setState({ hasError: false });
  };

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
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

export default ErrorBoundary;
