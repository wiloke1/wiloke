import { css, Theme } from 'wiloke-react-core';

export const container = (bodyHeight: number) => ({ colors, fonts }: Theme) => css`
  position: relative;
  z-index: 9999;
  input[type='text'] {
    border: 1px solid ${colors.gray3} !important;
    height: 46px !important;
    padding: 0 15px !important;
    border-radius: 6px !important;
    width: 100% !important;
  }
  .react-datepicker {
    border: 1px solid ${colors.gray3} !important;
    font-family: ${fonts.primary} !important;
    border-radius: 6px !important;
    font-size: 14px;
    color: ${colors.gray7} !important;
  }
  .react-datepicker__portal {
    width: 100% !important;
    height: ${bodyHeight}px !important;
    background-color: rgba(${colors.rgbGray9}, 0.5) !important;
  }
  .react-datepicker__day {
    border-radius: 50% !important;
  }
  .react-datepicker__day--keyboard-selected,
  .react-datepicker__month-text--keyboard-selected,
  .react-datepicker__quarter-text--keyboard-selected,
  .react-datepicker__year-text--keyboard-selected,
  .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range,
  .react-datepicker__month-text--selected,
  .react-datepicker__month-text--in-selecting-range,
  .react-datepicker__month-text--in-range,
  .react-datepicker__quarter-text--selected,
  .react-datepicker__quarter-text--in-selecting-range,
  .react-datepicker__quarter-text--in-range,
  .react-datepicker__year-text--selected,
  .react-datepicker__year-text--in-selecting-range,
  .react-datepicker__year-text--in-range {
    color: ${colors.light} !important;
    background-color: ${colors.primary} !important;
  }
  .react-datepicker__current-month,
  .react-datepicker-time__header,
  .react-datepicker-year-header {
    color: ${colors.gray8} !important;
  }
  .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker__time-name {
    color: ${colors.gray7} !important;
  }
  .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__month-read-view--down-arrow,
  .react-datepicker__month-year-read-view--down-arrow,
  .react-datepicker__navigation-icon::before {
    border-color: ${colors.gray8} !important;
    width: 12px !important;
    height: 12px !important;
  }
  .react-datepicker__day--disabled,
  .react-datepicker__month-text--disabled,
  .react-datepicker__quarter-text--disabled,
  .react-datepicker__year-text--disabled {
    color: ${colors.gray4} !important;
  }
  .react-datepicker__portal .react-datepicker__current-month,
  .react-datepicker__portal .react-datepicker-time__header {
    font-size: 22px !important;
  }
  .react-datepicker__header {
    background-color: ${colors.light} !important;
    border-bottom: 1px solid ${colors.gray4} !important;
  }
  .react-datepicker-popper[data-placement^='bottom'] .react-datepicker__triangle {
    &:before {
      border-bottom-color: ${colors.gray3} !important;
    }
    &:after {
      border-bottom-color: ${colors.light} !important;
    }
  }
  .react-datepicker__input-time-container .react-datepicker-time__input-container .react-datepicker-time__input input {
    border-radius: 6px !important;
    border: 1px solid ${colors.gray3} !important;
    height: 42px !important;
    padding: 0 5px 0 8px !important;
  }
  .react-datepicker__month {
    width: 267px !important;
    margin: 5px !important;
  }
  .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker__time-name {
    width: 2rem !important;
    line-height: 2rem !important;
    color: ${colors.gray7} !important;
  }
  .react-datepicker__current-month {
    padding: 10px 0;
    font-family: ${fonts.secondary};
    font-weight: 600 !important;
  }
  .react-datepicker__navigation {
    top: 12px;
  }
`;
