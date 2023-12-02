import { Chip, Grid, Stack, Typography } from '@mui/material';
import { statisticalApi } from 'api';
import MainCard from 'components/MainCard';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import formatCurrency from 'utils/formatCurrency';
import { RiseOutlined, FallOutlined } from '@ant-design/icons';

const Statistical = () => {
  const [dataLastMonth, setDataLastMonth] = useState({});
  const [dataThisMonth, setDataThisMonth] = useState({});
  const [dataPercent, setDataPercent] = useState({});
  useEffect(() => {
    const statistical = async () => {
      try {
        const currentDate = new Date();
        let firstDayOfThisMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        let firstDayOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        let firstDayOfNextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        const data = { firstDayOfLastMonth, firstDayOfThisMonth, firstDayOfNextMonth };

        const statistical = await statisticalApi.statistical(data);
        if (statistical && statistical?.status === 200 && statistical?.metadata) {
          const metadata = statistical.metadata;
          console.log(metadata.ThisMonth);

          setDataLastMonth(metadata.LastMonth);
          setDataThisMonth(metadata.ThisMonth);
        }
      } catch (error) {}
    };
    statistical();
  }, []);

  const revenueMonth = (data = []) => {
    if (data.length !== 0) {
      return data.reduce((total, bill) => total + bill.totalPayment, 0);
    }
    return 0;
  };

  const getPercentage = (LastMonth, ThisMonth) => {
    let data = {};
    const percent = ((ThisMonth - LastMonth) / LastMonth) * 100;
    if (LastMonth <= ThisMonth) {
      data = { color: 'primary', percent: percent, increase: Boolean(true) };
      setDataPercent(data);
      return data;
    } else if (LastMonth > ThisMonth) {
      data = { color: 'warning', percent: percent, increase: Boolean(false) };
      setDataPercent(data);
      return data;
    }
  };
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
              <MainCard>
                {' '}
                {dataLastMonth && (
                  <Stack spacing={0.5}>
                    <Typography variant="h6" color="textSecondary">
                      Có {dataLastMonth?.allBillsbyLastMonth?.length || 0} hoá đơn được tạo
                    </Typography>
                    <Grid container>
                      <Grid item>
                        <Typography variant="h4" color="inherit">
                          {formatCurrency(revenueMonth(dataLastMonth?.allBillsbyLastMonth) || 0)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Stack>
                )}
              </MainCard>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              {/* <MainCard></MainCard> */}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            Tháng này
          </Typography>
          <Grid container rowSpacing={4.5} columnSpacing={{ xs: 1, sm: 2 }}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <MainCard>
                {' '}
                {dataThisMonth && (
                  <Stack spacing={0.5}>
                    <Typography variant="h6" color="textSecondary">
                      Có {dataThisMonth?.allBillsbyThisMonth?.length || 0} hoá đơn được tạo
                    </Typography>
                    <Typography variant="h4" color="inherit">
                      {formatCurrency(revenueMonth(dataThisMonth?.allBillsbyThisMonth) || 0)}
                    </Typography>
                  </Stack>
                )}
              </MainCard>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              {/* <MainCard></MainCard> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Statistical;
