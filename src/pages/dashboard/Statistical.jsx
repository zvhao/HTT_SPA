import { Grid, Typography } from '@mui/material';
import { statisticalApi } from 'api';
import MainCard from 'components/MainCard';
import dayjs from 'dayjs';
import { useEffect } from 'react';

const Statistical = () => {
  useEffect(() => {
    const statistical = async () => {
      try {
        const currentDate = new Date();
        let firstDayOfThisMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        let firstDayOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        let firstDayOfNextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        const data = { firstDayOfLastMonth, firstDayOfThisMonth, firstDayOfNextMonth };

        const statistical = await statisticalApi.statistical(data);
        console.log(statistical);
      } catch (error) {}
    };
    statistical();
  }, []);
  return (
    <>
      {/* <Typography variant="h4" sx={{ mb: 2 }}>
        Thống kê
      </Typography> */}
      <Grid container rowSpacing={4.5} columnSpacing={{ xs: 1, sm: 2 }}>
        <Grid item xs={6}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            Tháng trước
          </Typography>
          <Grid container rowSpacing={4.5} columnSpacing={{ xs: 1, sm: 2 }}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <MainCard></MainCard>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <MainCard></MainCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            Tháng này
          </Typography>
          <Grid container rowSpacing={4.5} columnSpacing={{ xs: 1, sm: 2 }}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <MainCard></MainCard>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <MainCard></MainCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Statistical;
