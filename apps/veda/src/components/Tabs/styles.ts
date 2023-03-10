import { css, nightModeBlacklist, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme) => css`
  debug: Tab-container;
  position: relative;

  .rc-tabs {
    border: none !important;
    overflow: initial;
  }

  .rc-tabs-nav-more {
    cursor: pointer !important;
    outline: none !important;
  }

  .rc-tabs-nav-list {
    background-color: transparent;
    border-radius: 20px;
    overflow: hidden;
    padding: 0;
  }

  .rc-tabs-content-holder {
    display: block;
  }

  .rc-tabs-tab {
    padding: 4px 0;
    text-transform: capitalize;
    background-color: transparent !important;
    background: transparent;
    color: ${colors.dark};
  }

  .rc-tabs-nav {
    padding: 0;
    align-items: center;
    width: 100%;
    background-color: transparent;

    /* border-radius: 10px 0 0 10px; */
  }

  .rc-tabs-nav-wrap {
    padding: 0;
    width: 100%;

    &::before,
    &::after {
      content: '';
      display: none;
    }
  }

  .rc-tabs-nav-more {
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${colors.light};
    color: ${colors.gray8};
    border: 1px solid ${colors.gray4};
    cursor: pointer;

    font-size: 14px;
    padding: 10px 16px;
    margin: 0 !important;

    outline: none !important;
  }

  .rc-tabs-tab {
    padding: 10px 20px;
    background-color: ${colors.light};
    transition: 0.03s ease-in-out;
    position: relative;
    border-radius: 20px;

    &:first-child {
      margin-left: 0px;
    }

    &:last-child {
      margin-right: 0px;
    }
  }

  .rc-tabs-tab .rc-tabs-tab-btn {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    border: none;
    color: ${colors.gray7};

    &:active,
    &:hover,
    &:focus {
      border: none;
      outline: none;
    }
  }

  .rc-tabs-tab-active {
    background-color: ${colors.primary} !important;
    border-radius: 20px;
    font-weight: 500;
  }

  .rc-tabs-tab-active .rc-tabs-tab-btn {
    color: ${colors.light} !important;
  }

  .rc-tabs-ink-bar {
    display: none;
  }

  .rc-tabs-tab-disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  .rc-tabs-tabpane {
    font-size: 14px;
    color: ${colors.gray9};

    &:active,
    &:hover,
    &:focus {
      border: none;
      outline: none;
    }
  }

  :global {
    .rc-tabs-dropdown {
      transition: 0.3s ease-in-out;
      border: unset !important;
      outline: unset !important;
      box-shadow: 0 3px 6px -4px rgba(${colors.rgbDark}, 0.12), 0 6px 16px 0 rgba(${colors.rgbDark}, 0.08),
        0 9px 28px 8px rgba(${colors.rgbDark}, 0.05);

      &:hover,
      &:focus,
      &:active {
        outline: unset !important;
      }
    }
    .rc-tabs-dropdown-menu {
      border: unset !important;
      &:hover,
      &:focus,
      &:active {
        outline: unset !important;
      }
    }
    .rc-tabs-dropdown-menu-item {
      padding: 4px 12px;
      transition: 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
      font-size: 14px;
      color: ${nightModeBlacklist(colors.gray8)};
      cursor: pointer !important;
    }
  }
`;

export const tabPaneChildren = css`
  display: none;
`;

export const container2 = ({ colors }: Theme) => css`
  debug: Tab-container;
  position: relative;

  .rc-tabs {
    border: none !important;
    overflow: initial;
  }

  .rc-tabs-nav-more {
    cursor: pointer !important;
    outline: none !important;
  }

  .rc-tabs-nav-list {
    background-color: rgba(${colors.rgbGray3}, 0.6);
    border-radius: 8px;
    overflow: hidden;
    padding: 5px;
  }

  .rc-tabs-content-holder {
    display: block;
  }

  .rc-tabs-tab {
    padding: 4px 0;
    text-transform: capitalize;
    background-color: transparent !important;
    background: transparent;
    color: ${colors.dark};
  }

  .rc-tabs-nav {
    padding: 0;
    align-items: center;
    width: 100%;
    background-color: transparent;
  }

  .rc-tabs-nav-wrap {
    padding: 0;
    width: 100%;

    &::before,
    &::after {
      content: '';
      display: none;
    }
  }

  .rc-tabs-nav-more {
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${colors.light};
    color: ${colors.gray8};
    border: 1px solid ${colors.gray4};
    cursor: pointer;

    font-size: 14px;
    padding: 10px 16px;
    margin: 0 !important;

    outline: none !important;
  }

  .rc-tabs-tab {
    padding: 10px 20px;
    background-color: transparent;
    transition: 0.03s ease-in-out;
    position: relative;
    border-radius: 6px;
  }

  .rc-tabs-tab .rc-tabs-tab-btn {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    border: none;
    color: ${colors.gray8};

    &:active,
    &:hover,
    &:focus {
      border: none;
      outline: none;
    }
  }

  .rc-tabs-tab-active {
    background-color: ${colors.light} !important;
    border-radius: 6px;
    font-weight: 500;
    box-shadow: 0 0 10px rgba(${colors.rgbGray9}, 0.2);
  }

  .rc-tabs-tab-active .rc-tabs-tab-btn {
    color: ${colors.primary} !important;
  }

  .rc-tabs-ink-bar {
    display: none;
  }

  .rc-tabs-tab-disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  .rc-tabs-tabpane {
    font-size: 14px;
    color: ${colors.gray9};

    &:active,
    &:hover,
    &:focus {
      border: none;
      outline: none;
    }
  }

  :global {
    .rc-tabs-dropdown {
      transition: 0.3s ease-in-out;
      border: unset !important;
      outline: unset !important;
      box-shadow: 0 3px 6px -4px rgba(${colors.rgbDark}, 0.12), 0 6px 16px 0 rgba(${colors.rgbDark}, 0.08),
        0 9px 28px 8px rgba(${colors.rgbDark}, 0.05);

      &:hover,
      &:focus,
      &:active {
        outline: unset !important;
      }
    }
    .rc-tabs-dropdown-menu {
      border: unset !important;
      &:hover,
      &:focus,
      &:active {
        outline: unset !important;
      }
    }
    .rc-tabs-dropdown-menu-item {
      padding: 4px 12px;
      transition: 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
      font-size: 14px;
      color: ${nightModeBlacklist(colors.gray8)};
      cursor: pointer !important;
    }
  }
`;
