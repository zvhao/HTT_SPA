import { Button, Grid, List, ListItem, ListItemButton, ListItemText, TextField, Typography } from '@mui/material';
import { GridToolbar } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import { DatePicker, LocalizationProvider, StaticDatePicker, pickersLayoutClasses } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { commissionApi, dayoffApi, salaryApi } from 'api';
import MainCard from 'components/MainCard';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import formatCurrency from 'utils/formatCurrency';
import 'dayjs/locale/vi';
import { startOfMonth } from 'date-fns';
dayjs.locale('vi');

function ActionList(props) {
  const { onClear, onSetToday, className } = props;
  const actions = [
    { text: 'Tháng này', method: onClear },
    // { text: 'Cancel', method: onCancel },
    { text: 'Hôm nay', method: onSetToday }
  ];

  return (
    // Propagate the className such that CSS selectors can be applied
    <List className={className}>
      {actions.map(({ text, method }) => (
        <ListItem key={text} disablePadding>
          <ListItemButton onClick={method}>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
const Salary = () => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const [selectedDate, setSelectedDate] = useState(dayjs(currentDate));
  const [totalCommissionsByTechnician, setTotalCommissionsByTechnician] = useState([]);
  useEffect(() => {
    const SalaryStaffBymonth = async () => {
      try {
        var ngayHienTai = new Date();
        var ngayDauThang = new Date(ngayHienTai.getFullYear(), ngayHienTai.getMonth(), 1);
        var ngayCuoiThang = new Date(ngayHienTai.getFullYear(), ngayHienTai.getMonth() + 1, 1);
        // console.log(dayjs(ngayDauThang), dayjs(ngayCuoiThang));
        const data = {
          startOfMonth: dayjs(ngayDauThang),
          endOfMonth: dayjs(ngayCuoiThang)
        };
        const rs = await salaryApi.fetchData(data);
        console.log(rs);
      } catch (error) {
        console.error(error);
      }
    };
    const calculateStaffCommissions = async () => {
      try {
        const commissions = await commissionApi.fetchData();
        let metadata = commissions.metadata;
        // console.log(metadata);

        const totalCommissionsByTechnician = metadata.reduce((acc, commission) => {
          const technicianId = commission.technician._id;
          const commissionAmount = commission.commission;

          if (!acc[technicianId]) {
            acc[technicianId] = { technician: commission.technician, totalCommission: 0 };
          }
          acc[technicianId].totalCommission += commissionAmount;
          return acc;
        }, {});
        const resultArray = Object.values(totalCommissionsByTechnician);
        setTotalCommissionsByTechnician(resultArray);

        // console.log(resultArray);
      } catch (error) {}
    };
    SalaryStaffBymonth();
    calculateStaffCommissions();
  }, []);

  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
  };
  const handleCurrentMonthClick = () => {
    setSelectedDate(dayjs(currentDate));
  };

  const columns = [
    {
      field: 'technician',
      headerName: 'Nhân viên',
      width: 200,
      renderCell: (params) => (
        <div>
          {params.row.technician[0]}
          <br />
          {params.row.technician[1]}
        </div>
      )
    },
    {
      field: 'totalComission',
      headerName: 'Tổng chi % dịch vụ',
      width: 200,
      renderCell: (params) => <div>{formatCurrency(params.row.totalCommission)}</div>
    },
    {
      field: 'revenue',
      headerName: 'Doanh thu',
      width: 200,
      renderCell: (params) => <div>{formatCurrency(params.row.revenue)}</div>
    }
  ];
  let rows = totalCommissionsByTechnician.map((e, index) => ({
    id: index + 1,
    technician: [e.technician.username, e.technician.fullname],
    totalCommission: e.totalCommission,
    revenue: e.totalCommission * 10
  }));

  return (
    <MainCard>
      <Grid container sx={{ alignItems: 'center', width: '100%' }}>
        <Grid item xs={6}>
          <Typography sx={{ mb: 1 }} variant="h4">
            Lương nhân viên
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs} locale={'vi'}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                views={['year', 'month']}
                label="Chọn tháng"
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} variant="standard" />}
              />
            </DemoContainer>
          </LocalizationProvider>
          <Button onClick={handleCurrentMonthClick}>Tháng hiện tại</Button>
        </Grid>
      </Grid>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
        {/* <Grid item xs={4}></Grid> */}
        <Grid item xs={12}>
          <Typography sx={{ mb: 1 }} variant="h5">
            {/* Lương ngày {dayjs(selectedDate, "ddd, DD/MM/YYYY")} */}
          </Typography>
          {rows && (
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
          )}
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Salary;
