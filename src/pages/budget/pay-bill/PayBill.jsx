import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import '../../../components/css/sweetAlert2.css';
import payBillApi from 'api/payBills';
import MainCard from 'components/MainCard';
import { Button, CardActions, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Path } from 'constant/path';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid';
import { staffApi } from 'api';

const PayBill = () => {
  const [PayBills, setPayBills] = useState([]);
  const [branch, setBranch] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchData = await payBillApi.fetchData();
        const metadata = fetchData.metadata;
        console.log(metadata);
        setPayBills(metadata);
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
    console.log(data);
  }

  const columns = [
    {
      field: 'stt',
      headerName: 'STT',
      width: 70,
      align: 'center'
    },
    {
      field: 'code',
      headerName: 'code',
      //   width: 70,
      align: 'center'
    },
    {
      field: 'bookingInfomation',
      headerName: 'Dịch vụ/liệu trình',
      //   width: 70,
      align: 'center'
    },
    {
      field: 'time',
      headerName: 'Thời gian',
      //   width: 70,
      align: 'center'
    },
    {
      field: 'payments',
      headerName: 'Thành tiền',
      //   width: 70,
      align: 'center'
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

  const rows = PayBills.map((e, index) => ({
    id: e._id,
    stt: index + 1,
    code: e.code,
    bookingInfomation: e.bookingInfomation,
    bookingTime: e.bookingTime,
    branch: e.branch,
    totalPayment: e.totalPayment,
    counselorInfomation: e.counselorInfomation,
    paymentInformation: e.paymentInformation,
    paymentMethods: e.paymentMethods,
    time: [e.bookingTime, e.createdAt]
  }));
  return (
    <MainCard>
      <Grid container sx={{ alignItems: 'center', width: '100%' }}>
        <Grid item xs={6}>
          <Typography sx={{ mb: 1 }} variant="h4">
            Các hoá đơn
          </Typography>
        </Grid>
        <Grid item xs={6}>
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
        </Grid>
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
    </MainCard>
  );
};

export default PayBill;
