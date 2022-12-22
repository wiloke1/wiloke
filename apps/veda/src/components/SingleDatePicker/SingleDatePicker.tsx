import useBodyHeight from 'hooks/useBodyHeight';
import { FC, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getLocale } from 'translation';
import { View } from 'wiloke-react-core';
import * as css from './styles';

export interface SingleDatePickerProps {
  date: Date | null;
  withPortal?: boolean;
  onChange?: (date: Date | null) => void;
  minDate?: Date | null;
}

const SingleDatePicker: FC<SingleDatePickerProps> = ({ date, withPortal = false, minDate = new Date(), onChange }) => {
  const [dateState, setDate] = useState(date);
  const bodyHeight = useBodyHeight();

  useEffect(() => {
    onChange?.(dateState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateState]);

  return (
    <View css={css.container(bodyHeight)}>
      <DatePicker
        selected={dateState}
        minDate={minDate}
        onChange={date => setDate(date)}
        timeInputLabel="Time:"
        dateFormat="MM/dd/yyyy h:mm aa"
        withPortal={withPortal}
        showTimeInput
        locale={getLocale()}
      />
    </View>
  );
};

export default SingleDatePicker;
