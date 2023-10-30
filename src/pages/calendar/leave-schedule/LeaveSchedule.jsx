import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Paper,
  Select,
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
import { dayoffApi, staffApi } from 'api';
import { Path } from 'constant/path';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getStatusString from 'utils/getStatusString';
import EditIcon from '@mui/icons-material/Edit';

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
  const [branch, setBranch] = useState({});
  const [allStaffs, setAllStaffs] = useState([]);
  const [selectedDayOff, setSelectedDayOff] = useState(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');

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

        // console.log(filteredData(metadata, selectedDate));
        setDayOffsByDate(filteredData(metadata, selectedDate));
      } catch (error) {
        console.error(error);
      }
    };
    const allStaffs = async () => {
      try {
        let fetchData = await staffApi.fetchData();
        let metadata = fetchData.metadata;
        setAllStaffs(metadata);
      } catch (error) {
        console.error(error);
      }
    };
    const branchCurrent = async () => {
      try {
        const AccountData = await staffApi.getByToken();
        setBranch(AccountData.metadata.branch);
      } catch (error) {
        console.error(error);
      }
    };
    allDayOffs();
    allStaffs();
    branchCurrent();
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

  const handleViewClick = (dayOff) => {
    setSelectedDayOff(dayOff);
    setStatus(dayOff.status);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    let data = { ...selectedDayOff };
    data.status = status;
    console.log(data);
    // Xử lý logic lưu thông tin sau khi chỉnh sửa
    // ...
    setOpen(false);
  };
  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
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
        </Grid>
        <Grid item xs={8}>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h5">
                {selectedDate ? (
                  <div> Nhân viên đăng ký nghỉ trong ngày {dayjs(selectedDate).format('DD/MM/YYYY')}</div>
                ) : (
                  <div>Tất cả lượt đăng ký nghỉ phép</div>
                )}
              </Typography>
            </Grid>
            <Grid item xs={6} display={'flex'} justifyContent={'flex-end'}>
              <Typography> Có {dayOffsByDate.length} lượt đăng ký</Typography>
            </Grid>
          </Grid>

          <TableContainer component={Paper} sx={{ width: '100%' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width="100px" align="center">
                    STT
                  </TableCell>
                  <TableCell align="center">Nhân viên</TableCell>
                  <TableCell align="center">Ngày nghỉ</TableCell>
                  <TableCell align="center">Lý do</TableCell>
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
                    <TableCell align="center">{dayOff.reason}</TableCell>
                    <TableCell align="center" color="">
                      {getStatusString(dayOff.status)}
                    </TableCell>
                    <TableCell align="center">
                      {/* <Button size="medium" variant="contained" component={Link} to={`${Path.LeaveSchedule}/edit/${dayOff._id}`}>
                        
                      </Button> */}
                      <Button variant="contained" onClick={() => handleViewClick(dayOff)}>
                        <EditIcon />
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
        <Grid item xs={6}>
          <Typography variant="h5" color={'red'}>
            LƯU Ý:
          </Typography>
          <Box paddingLeft={4}>
            <Typography>
              Tổng số kỹ thuật viên: <strong>{allStaffs.length}</strong>
            </Typography>
            <Typography>
              Số khách tối đa được phục vụ cùng một lúc: <strong>{branch.capacity}</strong>
            </Typography>
            <Typography>
              Số nhân viên tối thiểu cần có mặt mỗi ngày:{' '}
              {allStaffs.length > branch.capacity ? <strong>{branch.capacity / 2}</strong> : <strong>{allStaffs.length - 1}</strong>}
            </Typography>
            <Typography>
              Số nhân viên tối đa có thể nghỉ trong ngày:{' '}
              {allStaffs.length > branch.capacity ? <strong>{allStaffs.length - branch.capacity / 2}</strong> : <strong>1</strong>}
            </Typography>
          </Box>
          {/* Nếu tổng số kỹ thuật viên lớn hơn số sức chứa của chi nhánh / 2: <br />
          Số nhân viên tối thiểu cần có mặt mỗi ngày: sức chứa của chi nhánh / 2 <br />
          Nếu số nhân viên nhỏ hơn hoặc bằng số sức chứa của chi nhánh / 2: <br />
          Số nhân viên tối thiểu cần có mặt mỗi ngày = tổng số nhân viên - 1 */}
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
      {/* Popup */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Đăng ký ngày nghỉ</DialogTitle>
        <DialogContent sx={{ minWidth: '50vw' }}>
          {/* Hiển thị thông tin chi tiết của nhân viên */}
          {selectedDayOff && (
            <div>
              <p>Tên: {selectedDayOff.staff.fullname}</p>
              <FormControl fullWidth>
                <InputLabel id="select-label">Trạng thái</InputLabel>
                <Select labelId="select-label" id="selectStatus" value={status} label="status" onChange={handleChangeStatus}>
                  <MenuItem value={2} sx={{ color: 'green' }}>
                    Duyệt
                  </MenuItem>
                  <MenuItem value={1} sx={{ color: 'orange' }}>
                    Chờ duyệt
                  </MenuItem>
                  <MenuItem value={0} sx={{ color: 'red' }}>
                    Không duyệt
                  </MenuItem>
                </Select>
              </FormControl>
              {/* Các trường thông tin khác */}
              {/* ... */}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LeaveSchedule;
