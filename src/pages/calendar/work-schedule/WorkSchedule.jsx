import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
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

const WorkSchedule = () => {
  const [allStaffs, setAllStaffs] = useState([]);
  const [staffsByDate, setStaffsByDate] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchAllStaffs = async () => {
      try {
        const data = await staffApi.fetchData();
        const allStaffs = data.metadata;
        // console.log(allStaffs);
        setAllStaffs(allStaffs);
        setSelectedDate(dayjs());
        const filteredStaffs = allStaffs.filter((staff) => {
          const lastStartDate = staff.workTime.map((e) => e.startDate).pop();
          return new Date(lastStartDate) <= dayjs();
        });
        setStaffsByDate(filteredStaffs);
        console.log(filteredStaffs);
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
    setStaffsByDate(filteredStaffs);
  };

  const fnGetTime = (staff) => {
    const workTime = staff.workTime.map((e) =>
      e.weekSchedule.find((schedule) => schedule.day === new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' }))
    );
    return `${dayjs(workTime[0].startTime).format('HH:mm')} - ${dayjs(workTime[0].endTime).format('HH:mm')}`;
  };

  const fnGetStatus = (staff) => {
    const workTime = staff.workTime.map((e) =>
      e.weekSchedule.find((schedule) => schedule.day === new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' }))
    );
    const currentDate = dayjs();
    const startTime = new Date(workTime[0].startTime);
    const endTime = new Date(workTime[0].endTime);
    const ST = dayjs(currentDate.format('YYYY-MM-DD') + ' ' + dayjs(startTime).format('HH:mm'), 'YYYY-MM-DD HH:mm');
    const ET = dayjs(currentDate.format('YYYY-MM-DD') + ' ' + dayjs(endTime).format('HH:mm'), 'YYYY-MM-DD HH:mm');

    const isWorking = isWithinInterval(new Date(currentDate), {
      start: new Date(ST),
      end: new Date(ET)
    });

    const isPastDate = isAfter(new Date(dayjs(currentDate.format('YYYY-MM-DD'))), new Date(dayjs(selectedDate.format('YYYY-MM-DD'))));
    const isFutureDate = isBefore(new Date(dayjs(currentDate.format('YYYY-MM-DD'))), new Date(dayjs(selectedDate.format('YYYY-MM-DD'))));
    const isPastTime = isAfter(new Date(dayjs(currentDate)), new Date(ET));
    const isFutureTime = isBefore(new Date(dayjs(currentDate)), new Date(ST));
    if (isPastDate || isPastTime) {
      return (
        <Grid container justifyContent={'center'} sx={{ color: 'green' }}>
          <CheckCircleOutlineIcon />
          <Typography>Đã xong!</Typography>
        </Grid>
      );
    }
    if (isFutureDate || isFutureTime) {
      return (
        <Grid container justifyContent={'center'} sx={{ color: 'blue' }}>
          <HourglassBottomRoundedIcon />
          <Typography>Chưa tới ca làm</Typography>
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
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
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
                    <TableCell align="center">{fnGetStatus(staff)}
                    Đang thực hiện tour</TableCell>
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
