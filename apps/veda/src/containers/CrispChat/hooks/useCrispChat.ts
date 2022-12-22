import { useEffect, useMemo } from 'react';
import { createGlobalState } from 'react-use';
import { useStyleSheet } from 'wiloke-react-core';

const useGlobalEmail = createGlobalState<string | undefined>();
const useGlobalInitialized = createGlobalState(false);

export const useCrispChat = () => {
  const [email, setEmail] = useGlobalEmail();
  const [initialized, setInitialized] = useGlobalInitialized();
  const { renderer } = useStyleSheet();

  const CRISP_CONSTS = useMemo(() => {
    return {
      CRISP_WEBSITE_ID: '92a4593d-e4db-40bd-b5cf-474d9d99e996',
      SCRIPT: 'https://client.crisp.chat/l.js',
    };
  }, []);

  const _handleLoaded = () => {
    const email = window.$crisp.get('user:email');
    setEmail(email);
  };

  const _handleEmailChanged = (email: string) => {
    setEmail(email);
  };

  useEffect(() => {
    if (initialized) {
      window.$crisp.push(['on', 'session:loaded', _handleLoaded]);
      window.$crisp.push(['on', 'user:email:changed', _handleEmailChanged]);
      return () => {
        window.$crisp.push(['off', 'session:loaded']);
        window.$crisp.push(['off', 'user:email:changed']);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized]);

  const handleInitCrispChat = () => {
    if (!initialized) {
      window.$crisp = [];
      window.$crisp.push(['config', 'color:theme', ['green']]);
      window.CRISP_WEBSITE_ID = CRISP_CONSTS.CRISP_WEBSITE_ID;
      const scriptEl = document.createElement('script');
      scriptEl.src = CRISP_CONSTS.SCRIPT;
      scriptEl.async = true;
      document.head.appendChild(scriptEl);
      renderer.renderStatic(`
        #crisp-chatbox > div > a {
          opacity: 0 !important;
          pointer-events: none !important;
        }
      `);
      renderer.renderStatic(`
        #crisp-chatbox > div > a[data-visible="true"][data-animate-minimize="false"] {
          opacity: 1 !important;
          pointer-events: initial !important;
        }
      `);
      scriptEl.onload = () => {
        setInitialized(true);
        scriptEl.onload = null;
      };
    }
  };

  const handleSetUser = (email: string, shopName: string) => {
    window.$crisp.push(['set', 'user:email', [email]]);
    window.$crisp.push(['set', 'user:nickname', [shopName]]);
  };

  const handleReset = () => {
    window.$crisp.push(['do', 'session:reset']);
  };

  const handleReportError = ({ comment, cause, description }: Record<'comment' | 'cause' | 'description', string>) => {
    window.$crisp.push(['do', 'chat:open']);
    window.$crisp.push(['do', 'message:send', ['text', description]]);
    window.$crisp.push(['do', 'message:send', ['text', cause]]);
    window.$crisp.push(['do', 'message:send', ['text', comment]]);
  };

  const handleSendMessage = ({ message }: { message: string }) => {
    window.$crisp.push(['do', 'chat:open']);
    window.$crisp.push(['do', 'message:send', ['text', message]]);
  };

  const handleGetLinkChat = () => {
    const sessionId = window.$crisp.get('session:identifier');
    if (sessionId) {
      return `https://app.crisp.chat/website/${CRISP_CONSTS.CRISP_WEBSITE_ID}/inbox/${sessionId}`;
    }
    return null;
  };

  return {
    email,
    initialized,
    setUser: handleSetUser,
    initCrispChat: handleInitCrispChat,
    reset: handleReset,
    reportError: handleReportError,
    getLink: handleGetLinkChat,
    sendMessage: handleSendMessage,
  };
};
