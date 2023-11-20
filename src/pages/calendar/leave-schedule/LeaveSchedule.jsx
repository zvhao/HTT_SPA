import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  TextField,
  Typography,
  styled
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { DatePicker, LocalizationProvider, StaticDatePicker, pickersLayoutClasses } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { dayoffApi, staffApi } from 'api';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import getStatusString from 'utils/getStatusString';
import '../../../components/css/sweetAlert2.css';
import { Path } from 'constant/path';
import { useNavigate } from 'react-router-dom';
import 'dayjs/locale/en-gb';


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
  const CssTextField = styled(TextField)({ '& > div > input': { lineHeight: 2 }, '& > label': { lineHeight: 'normal' } });
  const navigation = useNavigate();
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const [selectedDate, setSelectedDate] = useState(dayjs(currentDate));
  const [dayOffs, setDayOffs] = useState([]);
  const [dayOffsByDate, setDayOffsByDate] = useState([]);
  const [branch, setBranch] = useState({});
  const [allStaffs, setAllStaffs] = useState([]);
  const [formDayOffAdd, setFormDayOffAdd] = useState({
    staff: '',
    branch: '',
    dayOff: '',
    reason: '',
    status: 1
  });
  const [selectedDayOff, setSelectedDayOff] = useState(null);
  const [open, setOpen] = useState(false);
  const [openAddPopup, setOpenAddPopup] = useState(false);
  const [statusV1, setStatusV1] = useState('');
  const [role, setRole] = useState('owner');

  useEffect(() => {
    
    const allStaffs = async () => {
      try {
        let fetchData = await staffApi.fetchData();
        let metadata = fetchData.metadata;
        setAllStaffs(metadata);
        console.log(fetchData);
      } catch (error) {
        console.error(error);
      }
    };
    const branchCurrent = async () => {
      const role = JSON.parse(localStorage.getItem('data')).role;
      setRole(role);
      if (role && role === 'staff') {
        try {
          const AccountData = await staffApi.getByToken();
          setBranch(AccountData.metadata.branch);
        } catch (error) {
          console.error(error);
        }
      }
    };
    allDayOffs();
    allStaffs();
    branchCurrent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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

  //View popup
  const handleViewClick = (dayOff) => {
    setSelectedDayOff(dayOff);
    setStatusV1(dayOff.status);
    setOpen(true);
  };

  // const handleDelete = () => {
  //   console.log(selectedDayOff);
  //   setOpen(false);
  //   Swal.fire({
  //     title: 'Bạn chắc chắn xoá?',
  //     text: 'Bạn sẽ không thể hoàn lại thao tác này!',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Chắc chắn xoá!'
  //   }).then((result) => {
  //     try {
  //     } catch (error) {}
  //     if (result.isConfirmed) {
  //       Swal.fire('Đã xoá!', 'Mục này đã được xoá.', 'success');
  //     }
  //   });
  // };

  const handleClose = () => {
    setOpen(false);
    setOpenAddPopup(false);
    setFormDayOffAdd({
      staff: '',
      branch: '',
      dayOff: '',
      reason: '',
      status: 1
    });
  };

  const handleSave = () => {
    // let data = { ...selectedDayOff };
    const id = selectedDayOff.id;
    let data = { status: statusV1, dayOff: selectedDayOff.dayOff, staff: selectedDayOff.staff._id };
    // return console.log({ id, data });

    // setOpen(false);
    if (statusV1 === selectedDayOff.status) {
      Swal.fire({
        title: 'Bạn chưa thay đổi trạng thái',
        text: '',
        icon: 'info',
        customClass: {
          container: 'custom-z-index'
        }
      });
    } else {
      Swal.fire({
        title: `Bạn muốn thay đổi trạng thái thành ${getStatusString(statusV1).status}?`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Lưu',
        denyButtonText: `Không lưu`,
        cancelButtonText: 'Thoát',
        customClass: {
          container: 'custom-z-index'
        }
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        // setOpen(false);
        if (result.isConfirmed) {
          try {
            const updated = await dayoffApi.update(id, data);
            if (updated?.metadata?._id) {
              allDayOffs();
              Swal.fire('Đã lưu!', '', 'success');
              setOpen(false);
              setStatusV1('');
            }
            // console.log(updated);
          } catch (error) {
            Swal.fire('Lỗi!', '', 'error');
            setOpen(false);
          }
        } else if (result.isDenied) {
          Swal.fire({
            title: 'Các thay đổi không được lưu',
            icon: 'info',
            customClass: {
              container: 'custom-z-index'
            }
          });
          // setOpen(false);
          // setStatusV1('');
        }
      });
    }
    // console.log(data);
    // Xử lý logic lưu thông tin sau khi chỉnh sửa
    // ...
  };
  const handleChangeStatus = (event) => {
    setStatusV1(event.target.value);
  };

  //Add popup
  const handleAddPopup = () => {
    setOpenAddPopup(true);
    const data = { ...formDayOffAdd, dayOff: selectedDate };
    setFormDayOffAdd(data);
  };

  const handleSaveDayOff = async () => {
    let formData = { ...formDayOffAdd, branch: branch._id };
    const fields = Object.keys(formData);
    let hasMissingData = false;
    let missingField = [];
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      const value = formData[field];

      if (value === null || value === '') {
        switch (field) {
          case 'staff':
            missingField.push('nhân viên');
            break;
          case 'branch':
            missingField.push('lỗi chi nhánh');
            break;
          case 'dayOff':
            missingField.push('ngày nghỉ');
            break;
          case 'reason':
            missingField.push('lý do');
            break;
          case 'status':
            missingField.push('trạng thái');
            break;
          default:
            break;
        }
        // console.log(`[${field}] thiếu dữ liệu`);
        hasMissingData = true;
      }
    }
    if (hasMissingData) {
      Swal.fire({
        title: 'Thiếu dữ liệu',
        text: `trường:${missingField.map((e) => ' ' + e)}`,
        icon: 'info',
        customClass: {
          container: 'custom-z-index'
        }
      });
    }
    if (!hasMissingData) {
      formData.staff = formDayOffAdd.staff._id;
      try {
        Swal.fire({
          title: 'Bạn chắc chắn muốn lưu?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Lưu',
          denyButtonText: `Không lưu`,
          cancelButtonText: 'Thoát',
          customClass: {
            container: 'custom-z-index'
          }
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              let created = await dayoffApi.create(formData);
              if (created?.metadata?._id) {
                allDayOffs();
                Swal.fire('Đã lưu!', '', 'success');
                setOpenAddPopup(false);
                setStatusV1('');
                setFormDayOffAdd({
                  staff: '',
                  branch: '',
                  dayOff: '',
                  reason: '',
                  status: 1
                });
              }
            } catch (error) {
              console.log(error);
              Swal.fire('Lỗi!', `${error?.response?.data?.message}`, 'error');
              setOpenAddPopup(false);
            }
          } else if (result.isDenied) {
            Swal.fire({
              title: 'Các thay đổi không được lưu',
              icon: 'info',
              customClass: {
                container: 'custom-z-index'
              }
            });
            // setOpen(false);
            // setStatusV1('');
          }
        });
        // setSelectedDate(formData.dayOff);
        // handleDateChange(formData.dayOff)
      } catch (error) {
        if (error?.response?.data?.message)
          Swal.fire({
            title: 'Lỗi!',
            text: error?.response?.data?.message,
            icon: 'error',
            customClass: {
              container: 'custom-z-index'
            }
          });
      }
    }
  };

  const handleFieldAddChange = (field, value) => {
    // console.log(value);
    const data = { ...formDayOffAdd, [field]: value };
    setFormDayOffAdd(data);
  };

  const getSalary = (daySalary, dayOff) => {
    const calcSalaryDate = dayjs(daySalary).format('DD');
    const selectedDateData = new Date(dayOff);

    // Tính ngày bắt đầu và ngày kết thúc lương
    const selectedMonth = selectedDateData.getMonth() + 1;
    const selectedYear = selectedDateData.getFullYear();
    let startDate, endDate;

    if (calcSalaryDate > selectedDateData.getDate()) {
      const thangTruoc = selectedMonth > 1 ? selectedMonth - 1 : 12;
      const namTruoc = selectedMonth > 1 ? selectedYear : selectedYear - 1;
      // console.log({ thangTruoc, namTruoc });
      startDate = new Date(namTruoc, thangTruoc - 1, calcSalaryDate);
      endDate = new Date(selectedYear, selectedMonth - 1, calcSalaryDate);
    } else {
      startDate = new Date(selectedYear, selectedMonth - 1, calcSalaryDate);
      endDate = new Date(selectedYear, selectedMonth, calcSalaryDate);
    }
    // console.log({ startDate, endDate });
    return (
      <span>
        từ {dayjs(startDate).format('DD/MM/YYYY')} đến {dayjs(endDate).format('DD/MM/YYYY')}
      </span>
    );
  };

  const columns = [
    {
      field: 'stt',
      headerName: 'STT',
      width: 100,
      align: 'center'
    },
    {
      field: 'staff',
      headerName: 'Nhân viên',
      width: 250,

      flex: 1,
      // align: 'center',
      renderCell: (params) => (
        <div style={{ fontWeight: 'bold' }}>
          {params.row.staff.username}
          <br />
          {params.row.staff.fullname}
          <br />
        </div>
      )
    },
    {
      field: 'dayOff',
      headerName: 'Ngày nghỉ',
      // flex: 1,
      width: 150,
      align: 'center',
      renderCell: (params) => dayjs(params.row.dayOff).format('ddd, DD/MM/YYYY')
    },
    {
      field: 'reason',
      headerName: 'Lý do',
      width: 50,
      flex: 1,
      align: 'center'
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      // flex: 1,
      width: 150,
      align: 'center',
      renderCell: (params) => (
        <div style={{ color: getStatusString(params.row.status).color }}>{getStatusString(params.row.status).status}</div>
      )
    },
    {
      field: 'action',
      headerName: 'Thao tác',
      width: 100,
      align: 'center',
      renderCell: (params) => (
        <Button variant="contained" onClick={() => handleViewClick(params.row)}>
          <EditIcon />
        </Button>
      )
    }
  ];

  const rows = dayOffsByDate.map((dayOff, index) => ({
    id: dayOff._id,
    stt: index + 1,
    staff: dayOff.staff,
    dayOff: dayOff.dayOff,
    reason: dayOff.reason,
    status: dayOff.status,
    action: dayOff._id
  }));

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
          <Grid container>
            <Grid item width={'100%'}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                  showDaysOutsideCurrentMonth
                  value={selectedDate}
                  onChange={handleDateChange}
                  slotProps={{
                    layout: {
                      sx: {
                        [`.${pickersLayoutClasses.actionBar}`]: {
                          // gridColumn: 1,
                          gridRow: 3,
                          display: 'flex'
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
          </Grid>
        </Grid>
        <Grid item xs={8}>
          {role === 'staff' && (
            <Button variant="outlined" onClick={() => handleAddPopup()}>
              Đăng ký ngày nghỉ cho nhân viên
            </Button>
          )}

          <Grid container mt={2} mb={2}>
            <Grid item xs={8}>
              <Typography variant="h5">
                {selectedDate ? (
                  <div> Nhân viên đăng ký nghỉ trong ngày {dayjs(selectedDate).format('DD/MM/YYYY')}</div>
                ) : (
                  <div>Tất cả lượt đăng ký nghỉ phép</div>
                )}
              </Typography>
            </Grid>
            <Grid item xs={4} display={'flex'} justifyContent={'flex-end'}>
              <Typography> Có {dayOffsByDate.length} lượt đăng ký</Typography>
            </Grid>
          </Grid>
          {dayOffsByDate && (
            <div>
              <DataGrid
                sx={{
                  width: '100%',
                  fontSize: '14px',
                  boxShadow: 2,
                  border: 2,
                  borderColor: 'primary.light',
                  '& .MuiDataGrid-cell:hover': {
                    color: 'primary.main'
                  }
                }}
                autoHeight
                rows={rows}
                columns={columns}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                  toolbar: {
                    showQuickFilter: true
                  }
                }}
              />
            </div>
          )}
        </Grid>
      </Grid>
      {/* Popup */}
      {selectedDayOff && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle variant="h4">Cập nhật trạng thái</DialogTitle>
          <DialogContent sx={{ minWidth: '50vw' }}>
            {/* Hiển thị thông tin chi tiết của nhân viên */}
            <div>
              <Typography>Username: {selectedDayOff.staff.username}</Typography>
              <Typography>Tên: {selectedDayOff.staff.fullname}</Typography>
              <Typography>
                Trong tháng lương: <strong>{getSalary(selectedDayOff.staff.createdAt, selectedDayOff.dayOff)}</strong>
              </Typography>
              <Typography>
                Số ngày nghỉ có lương: <strong>{selectedDayOff.staff.numPaidLeave}</strong> ngày
              </Typography>
              <Typography>
                Ngày tạo lượt đăng ký: <strong>{dayjs(selectedDayOff.createdAt).format('ddd, DD/MM/YYYY HH:mm:ss')}</strong>
              </Typography>
              <Typography>Lý do nghỉ: {selectedDayOff.reason}</Typography>
              <CssTextField
                fullWidth
                margin="normal"
                label="Trạng thái"
                variant="outlined"
                select
                value={statusV1}
                onChange={handleChangeStatus}
              >
                <MenuItem value={2} sx={{ color: 'green' }}>
                  Duyệt
                </MenuItem>
                <MenuItem value={1} sx={{ color: 'orange' }}>
                  Chờ duyệt
                </MenuItem>
                <MenuItem value={0} sx={{ color: 'red' }}>
                  Không duyệt
                </MenuItem>
              </CssTextField>
              {/* <Typography>Lượt đăng ký ngày nghỉ trong tháng</Typography> */}
              {/* Các trường thông tin khác */}
              {/* ... */}
            </div>
          </DialogContent>
          <DialogActions>
            {/* <Button variant="outlined" onClick={handleDelete} color="error">
              <HelpOutlineOutlinedIcon />
              Huỷ đăng ký ngày nghỉ
            </Button> */}
            <Button variant="contained" onClick={handleSave}>
              <SaveOutlinedIcon />
              Lưu trạng thái
            </Button>
            <Button variant="outlined" onClick={handleClose} color="warning">
              <CancelOutlinedIcon />
              Huỷ thao tác
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Dialog open={openAddPopup} onClose={handleClose}>
        <DialogTitle variant="h4">Đăng ký ngày nghỉ cho nhân viên</DialogTitle>
        <DialogContent sx={{ minWidth: '50vw' }}>
          {/* Hiển thị thông tin chi tiết của nhân viên */}
          <div>
            <Grid container columnSpacing={{ xs: 1, sm: 2 }}>
              <Grid item xs={8}>
                <Autocomplete
                  sx={{
                    '& .MuiOutlinedInput-input': { lineHeight: 2, p: '10.5px 14px 10.5px 12px' },
                    '&': { mt: 2, p: 0 },
                    '& .MuiOutlinedInput-root': { pt: '0px', pb: '6px' },
                    '& .MuiInputLabel-root': { lineHeight: 'normal' },
                    '& .MuiAutocomplete-endAdornment': { top: '50%', transform: 'translate(0, -50%)' }
                  }}
                  fullWidth
                  margin={'normal'}
                  options={allStaffs}
                  getOptionLabel={(option) => `${option.username} - ${option.fullname}`}
                  // value={formDayOffAdd.staff}
                  onChange={(event, value) => handleFieldAddChange('staff', value)}
                  renderInput={(params) => <TextField {...params} variant="outlined" label="Nhân viên" />}
                ></Autocomplete>
              </Grid>
              <Grid item xs={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}  adapterLocale={'en-gb'}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ mt: 1, mb: 1 }}
                      label="Chọn ngày nghỉ"
                      value={selectedDate}
                      onChange={(date) => handleFieldAddChange('dayOff', date)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  margin="normal"
                  value={formDayOffAdd.reason}
                  label="Lý do nghỉ"
                  onChange={(event) => handleFieldAddChange('reason', event.target.value)}
                ></TextField>
              </Grid>
              <Grid item xs={4}>
                <CssTextField
                  fullWidth
                  margin="normal"
                  label="Trạng thái"
                  variant="outlined"
                  value={formDayOffAdd.status}
                  select
                  onChange={(event) => handleFieldAddChange('status', event.target.value)}
                >
                  <MenuItem value={2} sx={{ color: 'green' }}>
                    Duyệt
                  </MenuItem>
                  <MenuItem value={1} sx={{ color: 'orange' }}>
                    Chờ duyệt
                  </MenuItem>
                  <MenuItem value={0} sx={{ color: 'red' }}>
                    Không duyệt
                  </MenuItem>
                </CssTextField>
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          {/* <Button variant="outlined" onClick={handleDelete} color="error">
              <HelpOutlineOutlinedIcon />
              Huỷ đăng ký ngày nghỉ
            </Button> */}
          <Button variant="contained" onClick={handleSaveDayOff}>
            <SaveOutlinedIcon />
            Lưu trạng thái
          </Button>
          <Button variant="outlined" onClick={handleClose} color="warning">
            <CancelOutlinedIcon />
            Huỷ thao tác
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LeaveSchedule;
