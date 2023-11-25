import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, Dialog, DialogActions, DialogContent, Grid, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { staffApi } from 'api';
import payBillApi from 'api/payBills';
import MainCard from 'components/MainCard';
import { Path } from 'constant/path';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import formatCurrency from 'utils/formatCurrency';
import '../../../components/css/sweetAlert2.css';
import PayBillForm from './PayBillForm';

const PayBill = () => {
  const [PayBills, setPayBills] = useState([]);
  const [branch, setBranch] = useState(null);
  const [isDialogOpenInfo, setDialogOpenInfo] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [role, setRole] = useState('owner');
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const role = JSON.parse(localStorage.getItem('data')).role;
        setRole(role);
        const fetchData = await payBillApi.fetchData();
        const metadata = fetchData.metadata;
        // console.log(metadata);
        setPayBills(metadata);
        const r = metadata.map((e, index) => ({
          id: e._id,
          stt: index + 1,
          code: e.code,
          bookingInfomation: [
            e.bookingInfomation.account?.fullname,
            e.bookingInfomation.account?.phone,
            [e.bookingInfomation.customerInfo]
          ],
          bookingTime: e.bookingTime,
          branch: e.branch,
          totalPayment: e.totalPayment,
          counselorInfomation: e.counselorInfomation,
          paymentInformation: e.paymentInformation,
          paymentMethods: e.paymentMethods,
          customerInfo: [e.bookingInfomation.customerInfo[0]?.name, e.bookingInfomation.customerInfo[0]?.gender],
          time: [dayjs(e.bookingTime).format('DD/MM/YYYY HH:mm:ss'), dayjs(e.createdAt).format('DD/MM/YYYY HH:mm:ss')]
        }));
        console.log(r);
        setRows(r);
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: 'Lỗi từ máy chủ',
          text: 'Lỗi khi hiển thị dữ liệu',
          icon: 'error',
          customClass: {
            container: 'custom-z-index'
          }
        });
      }
    };
    const accountData = async () => {
      try {
        const fetchData = await staffApi.getByToken();
        const metadata = fetchData.metadata;
        setBranch(metadata.branch);
        // console.log(metadata);
        // setPayBills(metadata);
      } catch (error) {
        Swal.fire({
          title: 'Lỗi từ máy chủ',
          text: 'Lỗi khi hiển thị dữ liệu',
          icon: 'error',
          customClass: {
            container: 'custom-z-index'
          }
        });
      }
    };
    fetchData();
    accountData();
  }, []);

  const handleViewClick = async (data) => {
    setSelectedBill(data);
    setDialogOpenInfo(true);
    // console.log(data);
  };

  const columns = [
    // {
    //   field: 'stt',
    //   headerName: 'STT',
    //   width: 70,
    //   align: 'center'
    // },
    {
      field: 'code',
      headerName: 'Mã HĐ',
      width: 120,
      align: 'center',
      renderCell: (params) => <strong>{params.row.code}</strong>
    },
    {
      field: 'bookingInfomation',
      headerName: 'Khách hàng',
      width: 170,
      // align: 'center',
      renderCell: (params) => (
        <Grid container>
          {
            <Grid item xs={12}>
              <Typography>{params.row.bookingInfomation[0] !== undefined ? 'Tài khoản tích điểm:' : 'Không có tài khoản'}</Typography>
              <Typography sx={{ fontWeight: 'bold', color: 'blue' }}>{params.row.bookingInfomation[0]}</Typography>
              <Typography sx={{ fontWeight: 'bold', color: 'blue' }}>{params.row.bookingInfomation[1]}</Typography>
            </Grid>
          }
          {params.row?.customerInfo[0] && (
            <Grid item xs={12}>
              <Typography>đặt hộ:</Typography>
              <Typography sx={{ fontWeight: 'bold', color: 'blue' }}>
                {params.row?.customerInfo[0]}-{params.row?.customerInfo[1]}
              </Typography>
            </Grid>
          )}
        </Grid>
      )
    },
    {
      field: 'time',
      headerName: 'Thời gian',
      width: 250,
      align: 'center',
      renderCell: (params) => (
        <Box sx={{ p: 1 }}>
          <Typography>Tạo lịch: {params.row.time[0]}</Typography>
          <Typography>Tạo bill: {params.row.time[1]}</Typography>
        </Box>
      )
    },
    {
      field: 'totalPayment',
      headerName: 'Thành tiền',
      width: 150,
      align: 'center',
      renderCell: (params) => formatCurrency(params.row.totalPayment)
    },
    {
      field: 'paymentMethods',
      headerName: 'Thanh toán',
      width: 150,
      align: 'center'
      // renderCell: (params) => formatCurrency(params.row.totalPayment)
    },
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

  return (
    <MainCard>
      <Grid container sx={{ alignItems: 'center', width: '100%' }}>
        <Grid item xs={6}>
          <Typography sx={{ mb: 1 }} variant="h4">
            Các hoá đơn
          </Typography>
        </Grid>
        {/* <Grid item xs={6}>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon></AddIcon>}
              target="_blank"
              component={Link}
              to={Path.PayBill + `/add`}
            >
              Tạo hoá đơn
            </Button>
          </CardActions>
        </Grid> */}
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
        <DialogContent>
          <div style={{ pointerEvents: 'none' }}>{selectedBill && <PayBillForm selectBill={selectedBill}></PayBillForm>}</div>
        </DialogContent>
        <DialogActions>
          {role === 'staff' && (
            <>
              <Button
                sx={{ mr: 5 }}
                size="medium"
                variant="outlined"
                target="_blank"
                component={Link}
                to={`${Path.PayBill}/edit/${selectedBill?.id}`}
              >
                <EditIcon sx={{ mr: 1 }} />
                vào trang Cập nhật
              </Button>
            </>
          )}

          <Button onClick={() => setDialogOpenInfo(false)} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
};

export default PayBill;
