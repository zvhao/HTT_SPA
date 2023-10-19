import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { DateCalendar, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { staffApi } from 'api';
import MainCard from 'components/MainCard';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { Path } from 'constant/path';
dayjs.extend(utc);
dayjs.extend(timezone);

const WorkSchedule = () => {
  const [allStaffs, setAllStaffs] = useState([]);
  const [staffsByDate, setStaffsByDate] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const filteredStaffs = allStaffs.filter((staff) => {
      const lastStartDate = staff.workTime.map((e) => e.startDate).pop();
      return new Date(lastStartDate) <= date;
    });
    setStaffsByDate(filteredStaffs);
  };

  useEffect(() => {
    const fetchAllStaffs = async () => {
      try {
        const data = await staffApi.fetchData();
        const allStaffs = data.metadata;
        // console.log(allStaffs);
        setAllStaffs(allStaffs);
      } catch (error) {}
    };

    fetchAllStaffs();
  }, []);

  const fnGetTime = (staff) => {
    const arr = staff.workTime.map((e) =>
      e.weekSchedule.find((schedule) => schedule.day === new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' }))
    );
    return `${dayjs(arr[0].startTime).format('HH:mm')} - ${dayjs(arr[0].endTime).format('HH:mm')}`;
    // return (
    //   <LocalizationProvider dateAdapter={AdapterDayjs}>
    //     <TimePicker label="Thời gian bắt đầu" defaultValue={arr[0].startTime} />
    //     <TimePicker label="Thời gian kết thúc" defaultValue={arr[0].endTime} />
    //   </LocalizationProvider>
    // );
  };
  return (
    <MainCard>
      <Typography sx={{ mb: 1 }} variant="h4">
        Lich lam viec
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
        <Grid item xs={6}>
          <Typography variant="h5">{selectedDate && <div>{dayjs(selectedDate).format('DD/MM/YYYY')}</div>}</Typography>
          <Grid container>
            {staffsByDate.map((staff) => (
              <Grid item xs={12}>
                {/* <Typography>{staff.username}</Typography> */}
                {/* <Grid>{staff.workTime.map((e) => e.weekSchedule.map((day) => day.day))}</Grid> */}
              </Grid>
            ))}
          </Grid>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width="100px" align="center">
                    STT
                  </TableCell>
                  <TableCell align="center">Username</TableCell>
                  <TableCell align="center">Họ tên</TableCell>
                  <TableCell align="center">Thời gian làm việc</TableCell>
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
                      <Button size="medium" variant="contained" component={Link} to={`${Path.Staff}/edit/${staff._id}`}>
                        <EditIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
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
