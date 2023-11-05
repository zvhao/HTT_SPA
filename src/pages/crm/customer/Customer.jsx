import { Button, CardActions, Grid, TextField, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import { Path } from 'constant/path';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { customerApi } from 'api';

const Customer = () => {
  const [allCustomers, setAllCustomers] = useState([]);
  useEffect(() => {
    const fetchAllCustomers = async () => {
      try {
        const fetchData = await customerApi.fetchData();
        if (fetchData && fetchData?.metadata && fetchData?.status === 200) {
          const metadata = fetchData.metadata;
          setAllCustomers(metadata)
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
    },
    {
      field: '',
      headerName: 'CODE',
    },
    {
      field: 'code',
      headerName: 'CODE',
    },
    {
      field: 'code',
      headerName: 'CODE',
    },
  ]
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
              <Button variant="contained" color="primary" startIcon={<AddIcon></AddIcon>} component={Link} to={Path.Customer + `/add`}>
                Thêm khách hàng
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </MainCard>
      <MainCard sx={{ mt: 2 }}></MainCard>
    </>
  );
};

export default Customer;
