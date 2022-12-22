import normalize from './normalize';

const styleBase = `
${normalize}
*,
:after,
:before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

body {
  font-size: 14px;
  line-height: 1.45;
  font-weight: 400;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  height: 100%;
}

.monaco-editor {
  -moz-osx-font-smoothing: inherit;
  -webkit-font-smoothing: auto;
}

h1 {
  font-size: 44px;
}
h2 {
  font-size: 36px;
}
h3 {
  font-size: 28px;
}
h4 {
  font-size: 20px;
}
h5 {
  font-size: 16px;
}
h6 {
  font-size: 14px;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 500;
  line-height: 1.3;
  margin: 0;
}

p {
  margin: 0;
}

input[type="search"],
input[type="text"],
input[type="url"],
input[type="number"],
input[type="password"],
input[type="email"],
input[type="file"] {
  appearance: none;
  border-radius: 0;
}
textarea {
  vertical-align: middle;
  appearance: none;
  border-radius: 0;
}
a, input, textarea {
  outline: none !important;
}
img {
  max-width: 100%;
  height: auto;
  border: 0;
  vertical-align: middle;
}

.ant-message-notice-content {
  border-radius: 6px;
}

#iframe-content {
  border: 0;
  box-shadow: none;
}

.ant-notification-notice {
  border-radius: 6px;
}

.ant-slide-up-appear, .ant-slide-up-enter, .ant-slide-up-leave {
  animation-duration: 0.1s !important;
}

.customEditorButton, .customEditorButton:hover, .customEditorButton:active, .customEditorButton:hover {
  outline: none !important;
  border-collapse: unset !important;
}

`;

export default styleBase;
