const { Stack, Typography } = require('@mui/material');
const { default: MainCard } = require('components/MainCard');
const { default: formatCurrency } = require('utils/formatCurrency');

const RevenueMonth = (data) => {
  const CalcRevenueMonth = (data) => {
    return data.reduce((total, bill) => total + bill.totalPayment, 0) || 0;
  };
  return (
    <>
      <MainCard>
        {' '}
        {data && Object.keys(data).length !== 0 && Object.keys(data.allBillsbyThisMonth).length !== 0 && (
          <Stack spacing={0.5}>
            <Typography variant="h6" color="textSecondary">
              Có {data?.allBillsbyThisMonth?.length} hoá đơn hoá đơn được tạo
            </Typography>
            <Typography variant="h4" color="inherit">
              {formatCurrency(CalcRevenueMonth(data?.allBillsbyThisMonth))}
            </Typography>
          </Stack>
        )}
      </MainCard>
    </>
  );
};
export default RevenueMonth;
