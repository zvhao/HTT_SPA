import { DatePicker } from '@mui/lab';
import { Grid, TextField, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { LocalizationProvider, StaticDatePicker, pickersLayoutClasses } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import { useEffect, useState } from 'react';


function ActionList(props) {
  const { onCancel, onSetToday, className } = props;
  const actions = [
    { text: 'Cancel', method: onCancel },
    { text: 'Today', method: onSetToday }
  ];

  return (
    // Propagate the className such that CSS selectors can be applied
    <List className={className}>
      {actions.map(({ text, method }) => (
        <ListItem key={text} disablePadding>
          <ListItemButton onClick={method}>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
const LeaveSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  useEffect(() => {
    setSelectedDate(dayjs());
  }, []);
  return (
    <>
      <Typography sx={{ mb: 1 }} variant="h4">
        <Grid container>
          <Grid item xs={6}>
            Lịch nghỉ của nhân viên
          </Grid>
        </Grid>
      </Typography>
      <Grid container>
        <Grid item>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              value={selectedDate}
              slotProps={{
                layout: {
                  sx: {
                    [`.${pickersLayoutClasses.actionBar}`]: {
                      gridColumn: 1,
                      gridRow: 2
                    }
                  }
                }
              }}
              slots={{
                actionBar: ActionList
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item></Grid>
      </Grid>
    </>
  );
};

export default LeaveSchedule;
