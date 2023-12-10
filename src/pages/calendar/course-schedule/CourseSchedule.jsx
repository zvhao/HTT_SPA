import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, CardActions, Grid, TextField, Typography, styled } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { sellingCourseApi } from 'api';
import { Path } from 'constant/path';
import 'dayjs/locale/en-gb';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import formatCurrency from 'utils/formatCurrency';
import getStatusSellingCourseString from 'utils/getStatusSellingCourseString';
import { SellingCourseDetail } from './components';
import PaymentsIcon from '@mui/icons-material/Payments';

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
        console.log(metadata);
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
      field: 'branch',
      headerName: 'Chi nhánh',
      width: 150,
      align: 'center',
      renderCell: (params) => (
        <div>
          {params.row.branch[0]}
          <br />
          {params.row.branch[1]}
          <br />
          {params.row.branch[2]}
        </div>
      )
    },
    {
      field: 'course',
      headerName: 'Liệu trình',
      width: 300,
      //   align: 'center',
      renderCell: (params) => (
        <div>
          {params.row.course[0]}
          <br />
          {params.row.course[1]}
          <br />
          {params.row.course[2]} phút
        </div>
      )
    },
    {
      field: 'account',
      headerName: 'Khách hàng',
      width: 200,
      //   align: 'center',
      renderCell: (params) => (
        <div>
          {params.row.account[0] !== '' ? (
            <div>
              {' '}
              {params.row.account[0]}
              <br />
              {params.row.account[1]}
              <br />
              {params.row.account[2]}
            </div>
          ) : (
            <div>
              {' '}
              {params.row.account[3]}
              <br />
              {params.row.account[4]}
              <br />
              {params.row.account[5]}
            </div>
          )}
        </div>
      )
    },
    {
      field: 'package_detail',
      headerName: 'Gói',
      width: 140,
      align: 'center',
      renderCell: (params) => (
        <div>
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
    course: [e.course.code, e.course.name, e.course.duration],
    status: getStatusSellingCourseString(e.status),
    branch: e.branch,
    note: e.note,
    customerInfo: e.customerInfo,
    branch: [e.branch.code, e.branch.name, e.branch.desc],
    account: [
      e.customerInfo[0]?.name,
      e.customerInfo[0]?.gender,
      e.customerInfo[0]?.phone,
      e.account?.fullname,
      e.account?.gender,
      e.account?.phone
    ],
    package_detail: e.package_detail,
    detailsOfTurns: e.detailsOfTurns
  }));
  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
        <Grid item xs={6}>
          <Typography sx={{ mb: 1 }} variant="h4">
            Theo dõi gói - liệu trình
          </Typography>
        </Grid>
        {role === 'staff' && (
          <Grid item xs={6}>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon></AddIcon>}
                component={Link}
                to={Path.CourseSchedule + `/add`}
              >
                Mua gói - liệu trình
              </Button>
            </CardActions>
          </Grid>
        )}

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
      <Dialog open={isDialogOpenInfo} onClose={() => setDialogOpenInfo(false)} sx={{ '.MuiDialog-paper': { maxWidth: '80vw' } }}>
        <DialogTitle variant="h4">Chi tiết lượt mua gói - liệu trình</DialogTitle>
        <DialogContent>{selectedSellingCourse && <SellingCourseDetail selectedEvent={{ ...selectedSellingCourse }} />}</DialogContent>
        <DialogActions>
          {role === 'staff' && (
            <>
              <Button
                sx={{ mr: 5 }}
                size="medium"
                variant="outlined"
                target="_blank"
                component={Link}
                to={`${Path.PayBill}/add/${selectedSellingCourse?.id}`}
              >
                <PaymentsIcon sx={{ mr: 1 }} />
                Hoá đơn thanh toán
              </Button>
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
            </>
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
