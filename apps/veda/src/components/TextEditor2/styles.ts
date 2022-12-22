import { css, Theme } from 'wiloke-react-core';

export const container = ({ colors, fonts }: Theme) => css`
  --ck-color-text: ${colors.gray8};
  --ck-color-base-foreground: ${colors.light};
  --ck-color-base-background: ${colors.light};
  --ck-color-base-border: ${colors.gray3};
  --ck-color-base-action: #61b045;
  --ck-color-base-focus: #6cb5f9;
  --ck-color-base-text: ${colors.gray8};
  --ck-color-base-active: ${colors.primary};
  --ck-color-base-active-focus: ${colors.primary};
  --ck-color-base-error: #db3700;
  --ck-color-focus-border-coordinates: 208, 79%, 51%;
  --ck-color-focus-border: hsl(var(--ck-color-focus-border-coordinates));
  --ck-color-focus-outer-shadow: ${colors.transparent};
  --ck-color-focus-disabled-shadow: ${colors.transparent};
  --ck-color-focus-error-shadow: ${colors.transparent};
  --ck-color-shadow-drop: ${colors.transparent};
  --ck-color-shadow-drop-active: ${colors.transparent};
  --ck-color-shadow-inner: ${colors.transparent};
  --ck-color-button-default-background: transparent;
  --ck-color-button-default-hover-background: ${colors.gray2};
  --ck-color-button-default-active-background: ${colors.gray2};
  --ck-color-button-default-active-shadow: ${colors.gray3};
  --ck-color-button-default-disabled-background: transparent;
  --ck-color-button-on-background: ${colors.transparent};
  --ck-color-button-on-hover-background: ${colors.gray3};
  --ck-color-button-on-active-background: ${colors.gray3};
  --ck-color-button-on-active-shadow: ${colors.gray3};
  --ck-color-button-on-disabled-background: ${colors.gray2};
  --ck-color-button-action-background: var(--ck-color-base-action);
  --ck-color-button-action-hover-background: #579e3d;
  --ck-color-button-action-active-background: #53973b;
  --ck-color-button-action-active-shadow: #498433;
  --ck-color-button-action-disabled-background: #7ec365;
  --ck-color-button-action-text: var(--ck-color-base-background);
  --ck-color-button-save: #008a00;
  --ck-color-button-cancel: #db3700;
  --ck-color-switch-button-off-background: ${colors.gray2};
  --ck-color-switch-button-off-hover-background: ${colors.gray3};
  --ck-color-switch-button-on-background: var(--ck-color-button-action-background);
  --ck-color-switch-button-on-hover-background: #579e3d;
  --ck-color-switch-button-inner-background: var(--ck-color-base-background);
  --ck-color-switch-button-inner-shadow: rgba(0, 0, 0, 0.1);
  --ck-color-dropdown-panel-background: var(--ck-color-base-background);
  --ck-color-dropdown-panel-border: var(--ck-color-base-border);
  --ck-color-input-background: var(--ck-color-base-background);
  --ck-color-input-border: ${colors.gray3};
  --ck-color-input-error-border: var(--ck-color-base-error);
  --ck-color-input-text: var(--ck-color-base-text);
  --ck-color-input-disabled-background: ${colors.gray1};
  --ck-color-input-disabled-border: ${colors.gray2};
  --ck-color-input-disabled-text: ${colors.gray4};
  --ck-color-list-background: var(--ck-color-base-background);
  --ck-color-list-button-hover-background: var(--ck-color-button-default-hover-background);
  --ck-color-list-button-on-background: var(--ck-color-base-active);
  --ck-color-list-button-on-background-focus: var(--ck-color-base-active-focus);
  --ck-color-list-button-on-text: var(--ck-color-base-background);
  --ck-color-panel-background: var(--ck-color-base-background);
  --ck-color-panel-border: var(--ck-color-base-border);
  --ck-color-toolbar-background: var(--ck-color-base-foreground);
  --ck-color-toolbar-border: var(--ck-color-base-border);
  --ck-color-tooltip-background: var(--ck-color-base-text);
  --ck-color-tooltip-text: var(--ck-color-base-background);
  --ck-color-engine-placeholder-text: ${colors.gray4};
  --ck-color-upload-bar-background: ${colors.secondary};
  --ck-color-link-default: #0000f0;
  --ck-color-link-selected-background: rgba(${colors.rgbGray9}, 0.1);
  --ck-color-link-fake-selection: rgba(${colors.rgbPrimary}, 0.3);
  --ck-disabled-opacity: 0.5;
  --ck-focus-outer-shadow-geometry: 0 0 0 3px;
  --ck-focus-outer-shadow: var(--ck-focus-outer-shadow-geometry) var(--ck-color-focus-outer-shadow);
  --ck-focus-disabled-outer-shadow: var(--ck-focus-outer-shadow-geometry) var(--ck-color-focus-disabled-shadow);
  --ck-focus-error-outer-shadow: var(--ck-focus-outer-shadow-geometry) var(--ck-color-focus-error-shadow);
  --ck-focus-ring: 1px solid var(--ck-color-focus-border);
  --ck-font-size-base: 13px;
  --ck-line-height-base: 1.84615;
  --ck-font-face: ${fonts.primary};
  --ck-font-size-tiny: 0.7em;
  --ck-font-size-small: 0.75em;
  --ck-font-size-normal: 1em;
  --ck-font-size-big: 1.4em;
  --ck-font-size-large: 1.8em;
  --ck-ui-component-min-height: 2.3em;
  --ck-drop-shadow: none;
  --ck-border-radius: 6px;
  .ck.ck-button.ck-on,
  a.ck.ck-button.ck-on {
    color: ${colors.primary} !important;
  }
  .ck.ck-editor__editable {
    box-shadow: none !important;
    border: 1px solid ${colors.gray3} !important;
    min-height: 80px !important;
    padding: 8px 10px !important;
    line-height: 1.45 !important;
  }
  .ck.ck-toolbar {
    border: 1px solid ${colors.gray3} !important;
    border-bottom: 0 !important;
  }
  .ck.ck-editor__editable_inline > * {
    margin: 0 !important;
  }
  .ck-rounded-corners .ck.ck-dropdown .ck-dropdown__panel .ck-list,
  .ck-rounded-corners .ck.ck-input,
  .ck.ck-dropdown__panel.ck-dropdown__panel_se,
  .ck.ck-dropdown__panel.ck-dropdown__panel_sw,
  .ck.ck-editor__top .ck-sticky-panel .ck-toolbar.ck-rounded-corners,
  .ck.ck-dropdown .ck-button.ck-dropdown__button.ck-on {
    border-radius: 6px !important;
  }
  .ck-rounded-corners .ck.ck-dropdown .ck-dropdown__panel .ck-list {
    overflow: hidden !important;
  }
  .ck.ck-dropdown__panel.ck-dropdown__panel_sw {
    border: 0 !important;
  }
  .ck.ck-dropdown__panel {
    box-shadow: none !important;
  }
  .ck.ck-editor__top .ck-sticky-panel .ck-dropdown .ck-toolbar {
    border: 1px solid ${colors.gray3} !important;
    border-radius: var(--ck-border-radius) !important;
    width: 250px;
  }
  .ck-list .ck.ck-button.ck-on .ck-button__label,
  .ck-list a.ck.ck-button.ck-on .ck-button__label {
    color: ${colors.light} !important;
  }

  .ck.ck-button.ck.ck-color-grid__tile {
    width: 30px !important;
    height: 30px !important;
  }

  .ck.ck-button.ck-off.ck.ck-color-grid__tile {
    border-radius: 50% !important;
    cursor: pointer;
    border: 1px solid ${colors.gray3};
    outline: none !important;
    box-shadow: none !important;
  }

  .ck.ck-button.ck-on.ck.ck-color-grid__tile {
    outline: none !important;
    border-radius: 50% !important;
    box-shadow: none !important;
    border: 1px solid ${colors.primary};
  }

  .ck.ck-button.ck-off.ck.ck-color-grid__tile:hover {
    outline: none;
    box-shadow: none;
    border: 1px solid ${colors.gray3};
  }

  .ck.ck-dropdown.ck-heading-dropdown {
    width: 100px;
    padding: 0px 4px;
  }

  .ck.ck-color-grid__tile .ck.ck-icon {
    color: ${colors.primary} !important;
  }

  .ck-color-ui-dropdown {
    padding-left: 34px;
  }

  .ck-fontawesome {
    font-family: 'Font Awesome 5 Pro' !important;
    font-weight: 400 !important;
    cursor: pointer;
    font-size: 16px !important;
    line-height: normal;
  }
`;

export const textarea = ({ colors }: Theme) => css`
  width: 100%;
  border: 1px solid ${colors.gray3};
  min-height: 80px;
  padding: 8px 10px;
  line-height: 1.45;
  border-radius: 6px;
  resize: none;
`;
