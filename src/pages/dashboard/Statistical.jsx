import { Autocomplete, Button, Chip, Grid, Stack, TextField, Typography } from '@mui/material';
import { branchApi, staffApi, statisticalApi } from 'api';
import MainCard from 'components/MainCard';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import formatCurrency from 'utils/formatCurrency';
import { RiseOutlined, FallOutlined } from '@ant-design/icons';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import 'dayjs/locale/en-gb';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

const Statistical = () => {
  const [dataLastMonth, setDataLastMonth] = useState({});
  const [dataThisMonth, setDataThisMonth] = useState({});
  const [dataPercent, setDataPercent] = useState({});
  const [formData, setFormData] = useState({
    startTime: dayjs(new Date()).startOf('day').subtract(7, 'day'),
    endTime: dayjs(new Date() + 1).startOf('day')
  });
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [role, setRole] = useState([]);
  const [checkFil, setCheckFil] = useState(true);
  const [dataFinalByFil, setDataFinalByFil] = useState([]);

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
    const fetchBranches = async () => {
      try {
        const role = JSON.parse(localStorage.getItem('data')).role;
        setRole(role);
        if (role === 'owner') {
          const branchesData = await branchApi.fetchData();
          setBranches(branchesData.metadata);
        } else {
          const AccountData = await staffApi.getByToken();
          // selectedBranch(AccountData.metadata.branch);
          console.log(AccountData.metadata.branch);
          setBranches([AccountData.metadata.branch]);
        }
      } catch (error) {}
    };
    const fetchBranch = async () => {
      try {
        const role = JSON.parse(localStorage.getItem('data')).role;
        setRole(role);
        if (role === 'staff') {
          const AccountData = await staffApi.getByToken();
          selectedBranch(AccountData.metadata.branch);
        }
      } catch (error) {}
    };
    fetchBranch();
    fetchBranches();
    statistical();
    checkDis(selectedBranch, formData);
  }, [selectedBranch, formData]);

  const revenueMonth = (data = []) => {
    if (data.length !== 0) {
      return data?.reduce((total, bill) => total + bill.totalPayment, 0);
    }
    return 0;
  };

  const handleFilter = async () => {
    let data = { ...formData };
    if (role === 'staff') {
      const AccountData = await staffApi.getByToken();
      data.branch = AccountData.metadata.branch._id;
    } else {
      data.branch = selectedBranch._id;
    }
    console.log(data);
    try {
      const res = await statisticalApi.ownerStatistical(data);
      if (res && res?.status === 200 && res?.metadata) {
        setDataFinalByFil(res?.metadata);
      }
      console.log(res);
    } catch (error) {}
  };

  const handleBranchChange = (event, value) => {
    console.log(value);
    setSelectedBranch(value);
  };
  const checkDis = (selectedBranch, formData) => {
    if (selectedBranch && formData?.startTime && formData?.endTime) {
      return setCheckFil(false);
    }
    return setCheckFil(true);
  };
  const favoriteService = (allTours) => {
    let serviceCount = {};

    // Lặp qua từng lượt booking
    allTours.forEach((booking) => {
      // Lặp qua từng dịch vụ trong lượt booking
      booking.services.forEach((service) => {
        const serviceId = service._id;

        // Tăng số lượng sử dụng của dịch vụ trong đối tượng serviceCount
        serviceCount[serviceId] = (serviceCount[serviceId] || 0) + 1;
      });
    });

    // Tìm dịch vụ được sử dụng nhiều nhất
    let mostUsedServiceId = Object.keys(serviceCount).reduce((a, b) => (serviceCount[a] > serviceCount[b] ? a : b));
    const mostUsedService = allTours.flatMap((booking) => booking.services).find((service) => service._id === mostUsedServiceId);

    console.log(`Dịch vụ được sử dụng nhiều nhất là dịch vụ ${mostUsedService.name} với ${serviceCount[mostUsedServiceId]} lượt sử dụng.`);
    return {
      name: mostUsedService.name,
      count: serviceCount[mostUsedServiceId]
    };
  };
  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={{ xs: 1, sm: 2 }}>
        {dataLastMonth && (
          <Grid item xs={6}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              Tháng trước
            </Typography>
            <Grid container rowSpacing={4.5} columnSpacing={{ xs: 1, sm: 2 }}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <AnalyticEcommerce
                  title={`Số hoá đơn tháng trước`}
                  count={`${dataLastMonth?.allBillsbyLastMonth?.length || 0}   hoá đơn`}
                  percentage={59.3}
                  extra="35,000"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <AnalyticEcommerce
                  title="Tổng doanh thu tháng trước"
                  count={formatCurrency(revenueMonth(dataLastMonth?.allBillsbyLastMonth) || 0)}
                  percentage={70.5}
                  extra="8,900"
                />
              </Grid>
            </Grid>
          </Grid>
        )}
        {dataThisMonth && (
          <Grid item xs={6}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              Tháng này
            </Typography>
            <Grid container rowSpacing={4.5} columnSpacing={{ xs: 1, sm: 2 }}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <AnalyticEcommerce
                  title={`Số hoá đơn tháng này`}
                  count={`${dataThisMonth?.allBillsbyThisMonth?.length || 0}  hoá đơn`}
                  percentage={16}
                  extra="35,000"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <AnalyticEcommerce
                  title="Tổng doanh thu tháng này"
                  count={formatCurrency(revenueMonth(dataThisMonth?.allBillsbyThisMonth) || 0)}
                  percentage={20.5}
                  extra="8,900"
                />
              </Grid>
            </Grid>
          </Grid>
        )}
        <Grid item xs={12}>
          <Grid container rowSpacing={4.5} columnSpacing={{ xs: 1, sm: 2 }}>
            <Grid item xs={3}>
              {/* {role === 'owner' ? ( */}
              <Autocomplete
                sx={{
                  '& .MuiOutlinedInput-input': { lineHeight: 2, p: '10.5px 14px 10.5px 12px' },
                  '&': { mt: 1, p: 0 },
                  '& .MuiOutlinedInput-root': { pt: '0px', pb: '6px' },
                  '& .MuiInputLabel-root': { lineHeight: 'normal' },
                  '& .MuiAutocomplete-endAdornment': { top: '50%', transform: 'translate(0, -50%)' }
                }}
                fullWidth
                margin="dense"
                id="branch"
                name="branch"
                options={branches}
                getOptionLabel={(option) => option.code + ' ' + option.address}
                value={selectedBranch}
                onChange={handleBranchChange}
                renderInput={(params) => <TextField {...params} variant="outlined" label="Chi nhánh" />}
              />
              {/* ) : (
                <TextField
                  fullWidth
                  margin="dense"
                  id="branch"
                  name="branch"
                  label="Chi nhánh"
                  variant="outlined"
                  value="Chi nhánh hiện tại"
                  disabled
                />
              )} */}
            </Grid>
            <Grid item xs={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en-gb'}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    sx={{ width: '100%' }}
                    onChange={(date) => {
                      const startTime = dayjs(date).startOf('day');
                      setFormData({ ...formData, startTime });
                    }}
                    label="Ngày bắt đầu"
                    name="date"
                    value={formData.startTime}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en-gb'}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    sx={{ width: '100%' }}
                    onChange={(date) => {
                      const endTime = dayjs(date).startOf('day');
                      setFormData({ ...formData, endTime });
                    }}
                    label="Ngày kết thúc"
                    name="date"
                    value={formData.endTime}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={3}>
              <Button disabled={!selectedBranch} sx={{ mt: 1, p: 1 }} variant="outlined" color="primary" onClick={handleFilter}>
                Lọc
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {dataFinalByFil?.allBills && (
          <Grid item xs={6}>
            <Grid container rowSpacing={4.5} columnSpacing={{ xs: 1, sm: 2 }}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <AnalyticEcommerce
                  title={`Số hoá đơn`}
                  count={`${dataFinalByFil?.allBills?.length || 0}   hoá đơn`}
                  percentage={59.3}
                  extra="35,000"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <AnalyticEcommerce
                  title="Tổng doanh thu"
                  count={formatCurrency(revenueMonth(dataFinalByFil?.allBills) || 0)}
                  percentage={70.5}
                  extra="8,900"
                />
              </Grid>
            </Grid>
          </Grid>
        )}
        {dataFinalByFil?.allTours && (
          <Grid item xs={6}>
            <Grid container rowSpacing={4.5} columnSpacing={{ xs: 1, sm: 2 }}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <AnalyticEcommerce
                  title={`Lượt thực hiện dịch vụ`}
                  count={`${dataFinalByFil?.allTours?.length || 0}   lượt`}
                  percentage={59.3}
                  extra="35,000"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <AnalyticEcommerce
                  title="Dịch vụ yêu thích nhất"
                  count={dataFinalByFil?.allTours.length !== 0 ? favoriteService(dataFinalByFil?.allTours).name : 'không có dịch vụ nào'}
                  // percentage={70.5}
                  extra="8,900"
                />
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Statistical;
