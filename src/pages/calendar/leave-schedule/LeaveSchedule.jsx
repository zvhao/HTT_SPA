import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { LocalizationProvider, StaticDatePicker, pickersLayoutClasses } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { dayoffApi } from 'api';
import { Path } from 'constant/path';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ActionList(props) {
  const { onClear, onSetToday, className } = props;
  const actions = [
    { text: 'Tất cả', method: onClear },
    // { text: 'Cancel', method: onCancel },
    { text: 'Hôm nay', method: onSetToday }
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
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const [selectedDate, setSelectedDate] = useState(dayjs(currentDate));
  const [dayOffs, setDayOffs] = useState([]);
  const [dayOffsByDate, setDayOffsByDate] = useState([]);

  useEffect(() => {
    const allDayOffs = async () => {
      try {
        // console.log(dayjs(selectedDate));
        let fetchData = await dayoffApi.fetchData();
        let metadata = fetchData.metadata;
        setDayOffs(metadata);
        // metadata.map((e) => {
        //   return console.log(dayjs(e.dayOff));
        // });

        console.log(filteredData(metadata, selectedDate));
        setDayOffsByDate(filteredData(metadata, selectedDate));
      } catch (error) {
        console.error(error);
      }
    };
    allDayOffs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const filteredData = (data, date) => {
    const filteredData = data.filter((item) => dayjs(item.dayOff).format('YYYY-MM-DD') === dayjs(date).format('YYYY-MM-DD'));
    return filteredData;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date === null) {
      return setDayOffsByDate(dayOffs);
    }

    // console.log(date);
    setDayOffsByDate(filteredData(dayOffs, date));
  };
  return (
    <>
      <Typography sx={{ mb: 1 }} variant="h4">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
          <Grid item xs={6}>
            Lịch nghỉ của nhân viên
          </Grid>
        </Grid>
      </Typography>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
        <Grid item>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              value={selectedDate}
              onChange={handleDateChange}
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
        <Grid item>
          <Typography variant="h5">
            {selectedDate && <div> Nhân viên đăng ký nghỉ trong ngày {dayjs(selectedDate).format('DD/MM/YYYY')}</div>}
          </Typography>
          <TableContainer component={Paper} sx={{ width: '100%' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width="100px" align="center">
                    Ưu tên
                  </TableCell>
                  <TableCell align="center">Nhân viên</TableCell>
                  <TableCell align="center">Ngày nghỉ</TableCell>
                  <TableCell align="center">Trạng thái</TableCell>
                  <TableCell align="center">Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dayOffsByDate.map((dayOff, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ fontWeight: 'bold' }} align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="center">
                      {dayOff.staff.username}
                      <br></br>
                      {dayOff.staff.fullname}
                      <br></br>
                    </TableCell>
                    <TableCell align="center">{dayjs(dayOff.dayOff).format('ddd, DD/MM/YYYY')}</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center">{/* Đang thực hiện tour */}</TableCell>
                    <TableCell align="center">
                      <Button size="medium" variant="contained" component={Link} to={`${Path.dayOff}/edit/${dayOff._id}`}>
                        {/* <EditIcon /> */}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {dayOffsByDate.length === 0 && (
                  <TableRow>
                    <TableCell align="center" colSpan={6}>
                      Không có nhân viên nào làm việc
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default LeaveSchedule;
