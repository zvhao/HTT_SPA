import EditIcon from '@mui/icons-material/Edit';
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
import { DateCalendar, StaticDatePicker, pickersLayoutClasses } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { staffApi } from 'api';
import MainCard from 'components/MainCard';
import { Path } from 'constant/path';
import { isAfter, isBefore, isWithinInterval } from 'date-fns';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HourglassBottomRoundedIcon from '@mui/icons-material/HourglassBottomRounded';
import AvTimerRoundedIcon from '@mui/icons-material/AvTimerRounded';

dayjs.extend(utc);
dayjs.extend(timezone);

function ActionList(props) {
  const { onSetToday, className } = props;
  const actions = [ { text: 'Today', method: onSetToday }];

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

const WorkSchedule = () => {
  const [allStaffs, setAllStaffs] = useState([]);
  const [staffsByDate, setStaffsByDate] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  useEffect(() => {
    const fetchAllStaffs = async () => {
      try {
        const data = await staffApi.fetchData();
        const allStaffs = data.metadata;
        // console.log(allStaffs);
        setAllStaffs(allStaffs);
        // setSelectedDate(dayjs());
        const filteredStaffs = allStaffs.filter((staff) => {
          const lastStartDate = staff.workTime.map((e) => e.startDate).pop();
          return new Date(lastStartDate) <= dayjs();
        });
        setStaffsByDate(filteredStaffs);
        // console.log(filteredStaffs);
      } catch (error) {}
    };

    fetchAllStaffs();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const filteredStaffs = allStaffs.filter((staff) => {
      const lastStartDate = staff.workTime.map((e) => e.startDate).pop();
      return new Date(lastStartDate) <= date;
    });
    // console.log(filteredStaffs);
    setStaffsByDate(filteredStaffs);
  };

  const fnGetTime = (staff) => {
    // const final = staff.workTime.pop()
    const workTime = staff.workTime.map((e) =>
      e.weekSchedule.find((schedule) => schedule.day === new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' }))
    );
    // console.log(workTime);
    return `${dayjs(workTime[workTime.length - 1].startTime).format('HH:mm')} - ${dayjs(workTime[workTime.length - 1].endTime).format(
      'HH:mm'
    )}`;
  };

  const fnGetStatus = (staff) => {
    const workTime = staff.workTime.map((e) =>
      e.weekSchedule.find((schedule) => schedule.day === new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' }))
    );
    const currentDate = dayjs();
    const startTime = new Date(workTime[workTime.length - 1].startTime);
    const endTime = new Date(workTime[workTime.length - 1].endTime);
    const ST = dayjs(currentDate.format('YYYY-MM-DD') + ' ' + dayjs(startTime).format('HH:mm'), 'YYYY-MM-DD HH:mm');
    const ET = dayjs(currentDate.format('YYYY-MM-DD') + ' ' + dayjs(endTime).format('HH:mm'), 'YYYY-MM-DD HH:mm');

    const isWorking = isWithinInterval(new Date(currentDate), {
      start: new Date(ST),
      end: new Date(ET)
    });
    const currentDateV2 = new Date(dayjs(currentDate.format('YYYY-MM-DD')));
    const selectedDateV2 = new Date(dayjs(selectedDate.format('YYYY-MM-DD')));
    const isPastDate = isAfter(currentDateV2, selectedDateV2); // đúng nếu ngày chọn trước ngày hiện tại
    const isFutureDate = isBefore(currentDateV2, selectedDateV2); // đúng nếu ngày chọn sau ngày hiện tại

    const isPastTime = isAfter(new Date(dayjs(currentDate)), new Date(ET)); // đúng nếu đã qua giờ làm

    const isFutureTime = isBefore(new Date(dayjs(currentDate)), new Date(ST)); // đúng nếu chưa tới giờ làm
    if (isPastDate) {
      return (
        <Grid container justifyContent={'center'} sx={{ color: 'green' }}>
          <CheckCircleOutlineIcon />
          <Typography>Đã qua ngày làm</Typography>
        </Grid>
      );
    }

    if (
      selectedDateV2.getDate() === currentDateV2.getDate() &&
      selectedDateV2.getMonth() === currentDateV2.getMonth() &&
      selectedDateV2.getFullYear() === currentDateV2.getFullYear()
    ) {
      if (isPastTime) {
        return (
          <Grid container justifyContent={'center'} sx={{ color: 'green' }}>
            <CheckCircleOutlineIcon />
            <Typography>Đã qua giờ làm</Typography>
          </Grid>
        );
      }
      if (isFutureTime) {
        return (
          <Grid container justifyContent={'center'} sx={{ color: 'blue' }}>
            <HourglassBottomRoundedIcon />
            <Typography>Chưa tới giờ làm</Typography>
          </Grid>
        );
      }
    }
    if (isFutureDate) {
      return (
        <Grid container justifyContent={'center'} sx={{ color: 'blue' }}>
          <HourglassBottomRoundedIcon />
          <Typography>Chưa tới ngày làm</Typography>
        </Grid>
      );
    }

    if (isWorking) {
      return (
        <Grid container justifyContent={'center'} sx={{ color: 'orange' }}>
          <AvTimerRoundedIcon />
          <Typography>Đang trong ca</Typography>
        </Grid>
      );
    }
  };
  return (
    <MainCard>
      <Typography sx={{ mb: 1 }} variant="h4">
        <Grid container>
          <Grid item xs={6}>
            Lịch làm việc của nhân viên
          </Grid>
        </Grid>
      </Typography>
      <Grid container rowSpacing={1}>
        <Grid item xs={4}>
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
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={selectedDate}
              onChange={handleDateChange}
              renderDay={(day, _value, DayComponentProps) => (
                <div>
                  {dayjs(day).format('DD/MM/YYYY')}
                  <DayComponentProps />
                </div>
              )}
            />
          </LocalizationProvider> */}
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h5">
            {selectedDate && <div> Nhân viên làm trong ngày {dayjs(selectedDate).format('DD/MM/YYYY')}</div>}
          </Typography>
          <TableContainer component={Paper} sx={{ width: '100%' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width="100px" align="center">
                    STT
                  </TableCell>
                  <TableCell align="center">Username</TableCell>
                  <TableCell align="center">Họ tên</TableCell>
                  <TableCell align="center">Thời gian làm việc</TableCell>
                  <TableCell align="center">Trạng thái</TableCell>
                  <TableCell align="center">Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {staffsByDate.map((staff, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ fontWeight: 'bold' }} align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="center">
                      {staff.username}
                    </TableCell>
                    <TableCell align="center">{staff.fullname}</TableCell>
                    <TableCell align="center">{fnGetTime(staff)}</TableCell>
                    <TableCell align="center">
                      {fnGetStatus(staff)}
                      {/* Đang thực hiện tour */}
                    </TableCell>
                    <TableCell align="center">
                      <Button size="medium" variant="contained" component={Link} to={`${Path.Staff}/edit/${staff._id}`}>
                        <EditIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {staffsByDate.length === 0 && (
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

      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDateTimePicker orientation="landscape" />
      </LocalizationProvider> */}
    </MainCard>
  );
};

export default WorkSchedule;
