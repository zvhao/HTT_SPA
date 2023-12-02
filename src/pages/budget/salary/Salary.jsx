import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { branchApi, salaryApi, staffApi } from 'api';
import MainCard from 'components/MainCard';
import { Path } from 'constant/path';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { Field, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import NumericFormat from 'react-number-format';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import formatCurrency from 'utils/formatCurrency';
import * as yup from 'yup';
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

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(props, ref) {
  const { onChange, ...other } = props;
  const handleChange = (values) => {
    onChange({
      target: {
        name: props.name,
        value: values.value
      }
    });
  };

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={handleChange}
      thousandSeparator
      allowEmptyFormatting={false} // Không cho phép định dạng trống
      allowLeadingZeros={false} // Không cho phép số 0 ở đầu
      allowNegative={false} // Không cho phép số âm
      isnumericstring="true"
      suffix=" VNĐ"
    />
  );
});

NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

const validationSchema = yup.object({});
const Salary = () => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  let ngayDauThang = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const [selectedDate, setSelectedDate] = useState(dayjs(ngayDauThang));
  const [dataByMonth, setDataByMonth] = useState([]);
  const [initialValues, setInitialValues] = useState({});
  const [salaryArr, setSalaryArr] = useState([]);
  const [branch, setBranch] = useState(null);
  const [role, setRole] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    const FORBIDDEN = async () => {
      const role = JSON.parse(localStorage.getItem('data')).role;
      setRole(role);
      if (role && role !== 'staff') {
        navigation(Path.FORBIDDEN, { replace: true });
      }
    };
    FORBIDDEN();
    const fetchBranch = async () => {
      try {
        const role = JSON.parse(localStorage.getItem('data')).role;
        setRole(role);
        if (role === 'staff') {
          const AccountData = await staffApi.getByToken();
          setBranch(AccountData.metadata.branch._id);
        }
      } catch (error) {}
    };
    fetchBranch();
    const SalaryStaffBymonth = async (selectedDate) => {
      SSBM(selectedDate);
    };
    SalaryStaffBymonth(selectedDate);
  }, [selectedDate]);

  const SSBM = async (selectedDate) => {
    try {
      const currentDate = new Date(selectedDate);
      let ngayDauThang = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      let ngayCuoiThang = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
      // console.log(dayjs(ngayDauThang), dayjs(ngayCuoiThang));
      const data = {
        startOfMonth: dayjs(ngayDauThang),
        endOfMonth: dayjs(ngayCuoiThang)
      };
      const rs = await salaryApi.fetchData(data);
      const metadata = rs.metadata;
      const paidSalary = await salaryApi.paidSalary({ month: dayjs(ngayDauThang) });
      let salaryInfo = [];
      let salary = [];
      if (paidSalary.metadata.length !== 0) {
        const meta = paidSalary.metadata;
        meta.map((e) => {
          salaryInfo.push({
            staff: e.staff._id,
            basicSalary: e.staff.basicSalary,
            allowance: e.allowance,
            commission: e.commission,
            dayOff: e.dayOff,
            bonus: e.bonus,
            fine: e.fine,
            salary: calcSalary([e.staff.basicSalary, e.allowance, e.commission, e.dayOff, 0, 0]),
            paid: Boolean(e.paid)
          });
          salary.push({
            bonus: e.bonus,
            fine: e.fine,
            salary: calcSalary([e.staff.basicSalary, e.allowance, e.commission, e.dayOff, 0, 0]),
            paid: Boolean(e.paid)
          });
        });

        console.log(paidSalary);
      } else {
        metadata.map((e) => {
          salaryInfo.push({
            staff: e.staff._id,
            basicSalary: e.staff.basicSalary,
            allowance: totalAllowances(e.staff.allowances),
            commission: e.totalCommission,
            dayOff: deductionDayOff(dayOffStaff(e.dayOff), e.staff.numPaidLeave),
            bonus: 0,
            fine: 0,
            salary: calcSalary([
              e.staff.basicSalary,
              totalAllowances(e.staff.allowances),
              e.totalCommission,
              deductionDayOff(dayOffStaff(e.dayOff), e.staff.numPaidLeave),
              0,
              0
            ]),
            paid: Boolean(true)
          });
          salary.push({
            bonus: 0,
            fine: 0,
            salary: calcSalary([
              e.staff.basicSalary,
              totalAllowances(e.staff.allowances),
              e.totalCommission,
              deductionDayOff(dayOffStaff(e.dayOff), e.staff.numPaidLeave),
              0,
              0
            ]),
            paid: Boolean(false)
          });
        });
      }
      setSalaryArr(salary);
      setInitialValues({ ...initialValues, salaryInfo });
      setDataByMonth(metadata);
      console.log(salaryInfo);
      console.log(salary);
    } catch (error) {
      console.error(error);
    }
  };

  const dayOffStaff = (dayOffs) => {
    const statusCountMap = new Map();

    dayOffs.forEach((item) => {
      const status = item.status;
      statusCountMap.set(status, (statusCountMap.get(status) || 0) + 1);
    });
    let arr = Array.from(statusCountMap.entries());
    if (arr.length === 1) {
      if (arr[0][0] === 2) {
        arr.push([3, 0]);
      } else {
        arr.push([2, 0]);
      }
    } else if (arr.length === 0) {
      arr.push([3, 0]);
      arr.push([2, 0]);
    }
    return arr;
  };
  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
    // SSBM(date);
  };
  const handleCurrentMonthClick = () => {
    let ngayDauThang = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    console.log(dayjs(ngayDauThang));
    setSelectedDate(dayjs(ngayDauThang));
  };
  const totalAllowances = (allowances) => {
    const total = allowances.reduce((total, Obj) => total + parseInt(Obj.allowance), 0);
    if (!total) {
      return 0;
    }
    return total;
  };
  const deductionDayOff = (data, numPaidLeave) => {
    // let totalValue;

    if (data[0][1] > numPaidLeave) {
      return (data[0][1] - numPaidLeave) * 100000 + data[1][1] * 100000;
    } else {
      return data[1][1] * 100000;
    }
  };

  const calcSalary = (data) => {
    return data[0] + data[1] + data[2] - data[3] + data[4] - data[5];
  };
  const calcFinal = (idx, calc, price) => {
    if (calc === 'bonus') {
      if (price !== '') {
        salaryArr[idx].bonus = parseInt(price);
      } else {
        salaryArr[idx].bonus = 0;
      }
    } else if (calc === 'fine') {
      if (price !== '') {
        salaryArr[idx].fine = parseInt(price);
      } else {
        salaryArr[idx].fine = 0;
      }
    }
    // console.log(salaryArr);
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
      field: 'commissionInfo',
      headerName: 'Thông tin doanh thu',
      width: 220,
      renderCell: (params) => (
        <div>
          Số tour/tư vấn: <strong style={{ color: 'blue' }}>{params.row.commissionInfo[0]}</strong> lượt
          <br />
          Doanh thu: <strong style={{ color: 'blue' }}>{formatCurrency(params.row.commissionInfo[1])}</strong>
          <br />
          Nhận %: <strong style={{ color: 'blue' }}>{formatCurrency(params.row.commissionInfo[2])}</strong>
        </div>
      )
    },
    {
      field: 'dayOff',
      headerName: 'Ngày nghỉ',
      width: 250,
      renderCell: (params) => (
        <div>
          Số ngày nghỉ có lương: <strong style={{ color: 'blue' }}>{params.row.numPaidLeave}</strong> ngày
          <br />
          Số ngày nghỉ: <strong style={{ color: 'blue' }}>{params.row.dayOff[0].length}</strong> ngày
          <br />
          <div style={{ paddingLeft: '30px' }}>
            {params.row.dayOff[1].map(([status, count]) => (
              <span>
                {`${status === 2 ? 'Có phép' : 'Không phép'}: ${count} ngày`}
                <br />
              </span>
            ))}
          </div>
        </div>
      )
    }
  ];
  let rows = dataByMonth.map((e, index) => ({
    id: index + 1,
    technician: [e.staff.username, e.staff.fullname],
    technicianInfo: e.staff,
    commissionInfo: [e.commission.length, e.totalCommission * 10, e.totalCommission],
    dayOff: [e.dayOff, dayOffStaff(e.dayOff)],
    totalCommission: e.totalCommission,
    numPaidLeave: e.numPaidLeave
  }));

  const handleSubmit = async (values) => {
    setIsLoading(true);
    Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,
      showConfirmButton: false,
      showCancelButton: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });
    let formData = [...values.salaryInfo];
    formData.map((e, index) => {
      if (e.bonus === '') {
        e.bonus = 0;
      } else {
        e.bonus = parseInt(e.bonus);
        e.salary += parseInt(e.bonus);
      }
      if (e.fine === '') {
        e.fine = 0;
      } else {
        e.fine = parseInt(e.fine);
        e.salary -= parseInt(e.fine);
      }
      e.month = selectedDate;
      if (branch) {
        e.branch = branch;
      }
    });
    // console.log(selectedDate);
    console.log(formData);
    try {
      const created = await salaryApi.create({ month: selectedDate, salaryInfo: formData });
      console.log(created);
      setIsLoading(false);
      Swal.fire({
        title: 'Thành công!',
        text: '',
        icon: 'success',
        customClass: {
          container: 'custom-z-index'
        }
      });
    } catch (error) {
      setIsLoading(false);
      return Swal.fire('Lỗi!!!', error.response.data.message, 'error');
    }
  };
  const onSubmit = async (values, { setErrors, setSubmitting }) => {
    try {
      setSubmitting(false);
      handleSubmit(values);
    } catch (err) {
      setErrors({ submit: err.message });
      setSubmitting(false);
    }
  };

  return (
    <MainCard>
      <Grid container sx={{ alignItems: 'center', width: '100%' }}>
        <Grid item xs={6}>
          <Typography sx={{ mb: 1 }} variant="h4">
            Thống kê lương
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Grid container justifyContent={'flex-end'}>
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
            <Button sx={{ height: 40, m: 1 }} variant="outlined" onClick={handleCurrentMonthClick}>
              Tháng hiện tại
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }} mb={3}>
        {/* <Grid item xs={4}></Grid> */}
        <Grid item xs={12}>
          <Typography sx={{ mb: 1 }} variant="h5">
            {/* Lương ngày {dayjs(selectedDate, "ddd, DD/MM/YYYY")} */}
          </Typography>
          {rows && (
            <Box sx={{ height: 500, width: '100%' }}>
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
                  pagination: { paginationModel: { pageSize: 10 } }
                }}
                pageSizeOptions={[10, 30, 100]}
              />
            </Box>
          )}
        </Grid>
      </Grid>
      <Typography sx={{ mb: 1 }} variant="h4">
        Thống kê lương
      </Typography>
      {Object.keys(initialValues).length !== 0 && (
        <Formik enableReinitialize={true} initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
            <Form autoComplete="none" noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
              <TableContainer component={Paper} sx={{ width: '100%', overflow: 'auto', maxHeight: 700 }}>
                <Table sx={{ width: '100%' }} aria-label="simple table" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>STT</TableCell>
                      <TableCell align="center">Nhân viên</TableCell>
                      <TableCell align="center">
                        Lương cơ bản
                        <br />
                        (1)
                      </TableCell>
                      <TableCell align="center">
                        Phụ cấp
                        <br />
                        (2)
                      </TableCell>
                      <TableCell align="center">
                        Hoa hồng dịch vụ
                        <br />
                        (3)
                      </TableCell>
                      <TableCell align="center">
                        Phạt nghỉ không phép
                        <br />
                        (4)
                      </TableCell>
                      <TableCell align="center" width={150}>
                        Thưởng thêm
                        <br />
                        (5)
                      </TableCell>
                      <TableCell align="center" width={150}>
                        Phạt thêm
                        <br />
                        (6)
                      </TableCell>
                      <TableCell align="center" width={200}>
                        Thành lương
                        <br />
                        (1)+(2)+(3)-(4)+(5)-(6)
                      </TableCell>
                      <TableCell align="center">Trả lương</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell align="left">
                          {/* <TextField sx={{ display: 'none' }} name={`staff.${row.id - 1}.staff`} value={row.technicianInfo._id} />
                           */}
                          {row.technicianInfo.username}
                          <br />
                          {row.technicianInfo.fullname}
                        </TableCell>
                        <TableCell align="right">{formatCurrency(row.technicianInfo.basicSalary)}</TableCell>
                        <TableCell align="right">{formatCurrency(totalAllowances(row.technicianInfo.allowances))}</TableCell>
                        <TableCell align="right">{formatCurrency(row.totalCommission)}</TableCell>
                        <TableCell align="right">{formatCurrency(deductionDayOff(row.dayOff[1], row.numPaidLeave))}</TableCell>
                        <TableCell align="right">
                          <Field
                            as={TextField}
                            fullWidth
                            margin="dense"
                            label={`Tiền Thưởng`}
                            name={`salaryInfo.${index}.bonus`}
                            // onBlur={(e) => handleBlurCalc(e.target.value)}
                            onChange={(e) => {
                              handleChange(e);
                              calcFinal(index, 'bonus', e.target.value);
                            }}
                            variant="outlined"
                            color="secondary"
                            focused
                            InputProps={{
                              inputComponent: NumericFormatCustom
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Field
                            as={TextField}
                            fullWidth
                            margin="dense"
                            label={`Tiền phạt`}
                            name={`salaryInfo.${index}.fine`}
                            onChange={(e) => {
                              handleChange(e);
                              calcFinal(index, 'fine', e.target.value);
                            }}
                            variant="outlined"
                            color="secondary"
                            focused
                            InputProps={{
                              inputComponent: NumericFormatCustom
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          {salaryArr.length !== 0 && (
                            <Typography variant="h5" color={'blue'}>
                              {formatCurrency(salaryArr[index].salary + salaryArr[index].bonus - salaryArr[index].fine)}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.salaryInfo[index].paid}
                                onChange={() => {
                                  const checked = values.salaryInfo[index].paid;
                                  setFieldValue(`salaryInfo[${index}].paid`, !checked);
                                }}
                              ></Checkbox>
                            }
                          ></FormControlLabel>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <LoadingButton sx={{ mt: 3 }} type="submit" fullWidth size="large" loading={isLoading} variant="contained">
                <span>Lưu thông tin lương</span>
              </LoadingButton>
            </Form>
          )}
        </Formik>
      )}
    </MainCard>
  );
};

export default Salary;
