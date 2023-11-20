import { Autocomplete, Button, Grid, TextField, Typography, styled } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { sellingCourseApi } from 'api';
import { Path } from 'constant/path';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import formatCurrency from 'utils/formatCurrency';
import getStatusSellingCourseString from 'utils/getStatusSellingCourseString';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import 'dayjs/locale/en-gb';
import getStatusDetailsOfTurnsString from 'utils/getStatusDetailsOfTurnsString';
import { SellingCourseDetail } from './components';

const CourseSchedule = () => {
  const CssTextField = styled(TextField)({ '& > div > input': { lineHeight: 2 }, '& > label': { lineHeight: 'normal' } });
  const [sellingCourse, setSellingCourse] = useState([]);
  const [role, setRole] = useState('');
  const [isDialogOpenInfo, setDialogOpenInfo] = useState(false);
  const [selectedSellingCourse, setSelectedSellingCourse] = useState(null);

  useEffect(() => {
    const genderSellingCourses = async () => {
      try {
        const role = JSON.parse(localStorage.getItem('data')).role;
        setRole(role);
        let fetchData = await sellingCourseApi.fetchData();
        let metadata = fetchData.metadata;
        setSellingCourse(metadata);
        console.log(fetchData);
      } catch (error) {
        console.error(error);
      }
    };
    genderSellingCourses();
  }, []);

  const handleViewClick = async (data) => {
    setDialogOpenInfo(true);
    setSelectedSellingCourse(data);
    console.log(data);
  };

  const columns = [
    {
      field: 'stt',
      headerName: 'STT',
      width: 70,
      align: 'center'
    },
    {
      field: 'course',
      headerName: 'Liệu trình',
      width: 300,
      //   align: 'center',
      renderCell: (params) => (
        <div style={{ fontWeight: 'bold' }}>
          {params.row.course.code}
          <br />
          {params.row.course.name}
          <br />
        </div>
      )
    },
    {
      field: 'account',
      headerName: 'Khách hàng',
      width: 200,
      //   align: 'center',
      renderCell: (params) => (
        <div style={{ fontWeight: 'bold' }}>
          {params.row?.customerInfo?.name}
          {params.row?.account?.fullname}
          <br />
          {params.row?.customerInfo?.gender}
          {params.row?.account?.gender}
          <br />
          {params.row?.customerInfo?.phone}
          {params.row?.account?.phone}
        </div>
      )
    },
    {
      field: 'package_detail',
      headerName: 'Gói',
      width: 140,
      align: 'center',
      renderCell: (params) => (
        <div style={{ fontWeight: 'bold' }}>
          {params.row?.package_detail?.times} lần
          <br />
          {formatCurrency(params.row?.package_detail?.price)}
        </div>
      )
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 150,
      align: 'center'
    },
    // {
    //   field: 'detailsOfTurns',
    //   headerName: 'Thông tin',
    //   //   width: 100,
    //   align: 'center',
    //   renderCell: (params) => <>{params.detailsOfTurns.length}</>
    // },
    {
      field: 'action',
      headerName: 'Thao tác',
      width: 150,
      align: 'center',
      renderCell: (params) => (
        <>
          {' '}
          {/* <Button size="medium" variant="contained" component={Link} to={`${Path.CourseSchedule}/edit/${params.row.id}`}>
            <EditIcon />
          </Button> */}
          <Button size="medium" variant="contained" onClick={() => handleViewClick(params.row)}>
            <VisibilityIcon />
          </Button>
        </>
      )
    }
  ];

  const rows = sellingCourse.map((e, index) => ({
    id: e._id,
    stt: index + 1,
    course: e.course,
    status: getStatusSellingCourseString(e.status),
    branch: e.branch,
    note: e.note,
    customerInfo: e.customerInfo,
    account: e.account,
    package_detail: e.package_detail,
    detailsOfTurns: e.detailsOfTurns
  }));
  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
        <Grid item xs={6}></Grid>
        <Grid item xs={12}>
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
            getRowHeight={() => 'auto'}
            rows={rows}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true
              }
            }}
          />
        </Grid>
      </Grid>
      <Dialog open={isDialogOpenInfo} onClose={() => setDialogOpenInfo(false)}>
        <DialogTitle variant="h4">Chi tiết lịch hẹn</DialogTitle>
        <DialogContent>
          {selectedSellingCourse && (
            <SellingCourseDetail selectedEvent={selectedSellingCourse}/>
          )}
        </DialogContent>
        <DialogActions>
          {role === 'staff' && (
            <Button
              sx={{ mr: 5 }}
              size="medium"
              variant="contained"
              component={Link}
              to={`${Path.CourseSchedule}/edit/${selectedSellingCourse?.id}`}
            >
              <EditIcon />
              vào trang Cập nhật
            </Button>
          )}

          <Button onClick={() => setDialogOpenInfo(false)} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default CourseSchedule;
