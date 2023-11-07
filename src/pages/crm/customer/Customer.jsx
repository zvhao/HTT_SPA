import { Box, Button, CardActions, Grid, TextField, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import { Path } from 'constant/path';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { customerApi } from 'api';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import getCustomerLevel from 'utils/getCustomerLevel';
import dayjs from 'dayjs';

const Customer = () => {
  const [allCustomers, setAllCustomers] = useState([]);
  useEffect(() => {
    const fetchAllCustomers = async () => {
      try {
        const fetchData = await customerApi.fetchData();
        if (fetchData && fetchData?.metadata && fetchData?.status === 200) {
          const metadata = fetchData.metadata;
          setAllCustomers(metadata);
          console.log(metadata);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllCustomers();
  }, []);

  const columns = [
    {
      field: 'code',
      headerName: 'CODE',
      width: '120'
    },
    {
      field: 'info',
      headerName: 'Thông tin',
      width: '300',
      renderCell: (params) => (
        <Box sx={{ p: 1 }}>
          <Typography>Họ tên: {params.row.info[0]}</Typography>
          <Typography>Phone: {params.row.info[1]}</Typography>
          <Typography>Giới tính: {params.row.info[2]}</Typography>
          <Typography>Mail: {params.row.info[3]}</Typography>
          <Typography>Địa chỉ: {params.row.info[4]}</Typography>
        </Box>
      )
    },
    {
      field: 'customerLevel',
      headerName: 'Hạng thành viên',
      width: '200',
      renderCell: (params) => (
        <Box sx={{ p: 1 }}>
          <Typography>Hạng: {params.row.customerLevel[0]}</Typography>
          <Typography>Điểm: {params.row.customerLevel[1]}</Typography>
        </Box>
      )
    },
    { field: 'createdAt', headerName: 'Ngày tạo', width: '200' },
    {
      field: 'action',
      width: '100',
      headerName: 'Thao tác',
      renderCell: (params) => (
        <Button size="medium" variant="contained" component={Link} to={`${Path.Customer}/edit/${params.row.id}`}>
          <EditIcon />
        </Button>
      )
    }
  ];

  const rows = allCustomers.map((customer, index) => ({
    id: customer._id,
    code: customer.code,
    info: [customer.fullname, customer.phone, customer.gender, customer.email, customer.address],
    customerLevel: [getCustomerLevel(customer.customerLevel), customer.score],
    createdAt: dayjs(customer.createdAt).format('DD/MM/YYYY HH:mm:ss'),
    action: customer._id
  }));

  return (
    <>
      <MainCard>
        <Grid container sx={{ alignItems: 'center', width: '100%' }}>
          <Grid item xs={3}>
            <Typography sx={{ mb: 1 }} variant="h4">
              Các khách hàng
            </Typography>
          </Grid>

          {/* <Grid item xs={6}>
          <TextField sx={{ width: '100%' }} label="Tìm kiếm" value={searchTerm} onChange={handleSearch} />
        </Grid> */}
          <Grid item xs={3}>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon></AddIcon>}
                target="_blank"
                component={Link}
                to={Path.Customer + `/add`}
              >
                Thêm khách hàng
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </MainCard>
      <MainCard sx={{ mt: 2 }}>
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
          initialState={{
            sorting: {
              sortModel: [{ field: 'code', sort: 'desc' }],
            },
          }}
        />
      </MainCard>
    </>
  );
};

export default Customer;
