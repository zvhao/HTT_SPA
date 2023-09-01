import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import AddIcon from '@mui/icons-material/Add';
import { LoadingButton } from '@mui/lab';
import { Box, Checkbox, FormControlLabel, Grid, IconButton, InputAdornment, TextField, Typography, styled, MenuItem } from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { branchApi } from 'api';
import { Path } from 'constant/path';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { Field, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import NumericFormat from 'react-number-format';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

dayjs.extend(utc);
dayjs.extend(timezone);

const validationSchema = yup.object({});
const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      thousandSeparator
      valueIsNumericString
      suffix=" VND"
    />
  );
});

NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

const StaffForm = () => {
  const CssTextField = styled(TextField)({ '& > div > input': { lineHeight: 2 }, '& > label': { lineHeight: 'normal' } });

  //
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigation = useNavigate();

  const [initialValues, setInitialValues] = useState({
    fullname: 'Huynh Thanh Thuong',
    username: 'qlcn0101',
    phone: '',
    email: '',
    address: '',
    numPaidLeave: 2,
    basicSalary: 4000000,
    position: '',
    password: '',
    consultingCommission: 10,
    serviceCommission: 10,
    allowances: '',
    workTime: '',
    roles: '',
    branches: ''
  });

  useEffect(() => {
    const getOneStaff = async (id) => {
      if (isEditMode) {
        try {
          // const oneBranchData = await branchApi.getById(id);
          // const newOneBranchData = { ...oneBranchData.metadata };
          // newOneBranchData.startTime = dayjs(oneBranchData.metadata.startTime, 'HH:mm');
          // newOneBranchData.endTime = dayjs(oneBranchData.metadata.endTime, 'HH:mm');
          // setInitialValues(newOneBranchData);
          // return newOneBranchData;
        } catch (error) {
          // console.log(error);
        }
      }
    };
    getOneStaff(id);
  }, []);

  const onSubmit = async (values, { setErrors, setSubmitting }) => {
    try {
      setSubmitting(false);
      handleSubmit(values);
    } catch (err) {
      setErrors({ submit: err.message });
      setSubmitting(false);
    }
  };

  const handleSubmit = async (values) => {
    // const newdata = { ...values };
    // newdata.startTime = dayjs(values.startTime).format('HH:mm');
    // newdata.endTime = dayjs(values.endTime).format('HH:mm');
    alert(JSON.stringify(values, null, 4));

    if (isEditMode) {
      try {
        // console.log(newdata);
        // const rs = await branchApi.update(id, newdata);
        // navigation(Path.Branch, { replace: true });
        // return rs
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        // const rs = await branchApi.create(newdata);
        // navigation(Path.Branch, { replace: true });
        // console.log(rs);
        // return rs
      } catch (error) {
        console.error(error);
      }
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [childChecked, setChildChecked] = useState([true, true, true, true, true, true, true]);
  const [parentChecked, setParentChecked] = useState(true);

  const handleParentChange = (event) => {
    setParentChecked(event.target.checked);
    setChildChecked(childChecked.map(() => event.target.checked));
  };

  const handleChangeChild = (index) => (event) => {
    const newChildChecked = [...childChecked];
    newChildChecked[index] = event.target.checked;
    setChildChecked(newChildChecked);
    setParentChecked(newChildChecked.every((checked) => checked));
  };

  // const [value, setValue] = React.useState(dayjs('2023-08-07T20:00'));
  const [cards, _setCards] = useState([
    {
      label: 'Thứ 2'
    },
    {
      label: 'Thứ 3'
    },
    {
      label: 'Thứ 4'
    },
    {
      label: 'Thứ 5'
    },
    {
      label: 'Thứ 6'
    },
    {
      label: 'Thứ 7'
    },
    {
      label: 'Chủ nhật'
    }
  ]);

  return (
    <Box>
      <Typography variant="h4">{isEditMode ? 'Cập nhật' : 'Thêm'} nhân viên</Typography>
      <Formik enableReinitialize={true} initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <Form autoComplete="none" noValidate onSubmit={handleSubmit}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }} sx={{ padding: 1 }}>
              <Grid item xs={6}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
                  <Grid item xs={6}>
                    <CssTextField
                      fullWidth
                      margin="dense"
                      id="username"
                      name="username"
                      label="Username"
                      variant="outlined"
                      value={values.username}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CssTextField
                      fullWidth
                      margin="dense"
                      id="branch"
                      name="branch"
                      label="Chi nhánh"
                      variant="outlined"
                      value={values.branch}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CssTextField
                      fullWidth
                      margin="dense"
                      id="password"
                      name="password"
                      label="Password"
                      variant="outlined"
                      type={showPassword ? 'text' : 'password'}
                      value={values.password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      InputProps={{
                        endAdornment: (
                          <IconButton onClick={handleTogglePassword}>
                            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                          </IconButton>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CssTextField
                      fullWidth
                      margin="dense"
                      id="position"
                      name="position"
                      label="Vị trí"
                      variant="outlined"
                      select
                      value={values.position}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    >
                      <MenuItem value="manager">Nhân viên quản lý</MenuItem>
                      <MenuItem value="technicians">Kĩ thuật viên</MenuItem>
                      <MenuItem value="receptionists">Lễ tân</MenuItem>
                      <MenuItem value="counselors">Tư vấn viên</MenuItem>
                      <MenuItem value="otherStaff">Nhân viên khác</MenuItem>
                    </CssTextField>
                  </Grid>

                  <Grid item xs={6}>
                    <CssTextField
                      fullWidth
                      margin="dense"
                      id="fullname"
                      name="fullname"
                      label="Họ tên quản lý"
                      variant="outlined"
                      value={values.fullname}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <CssTextField
                      fullWidth
                      margin="dense"
                      id="email"
                      name="email"
                      label="email"
                      variant="outlined"
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CssTextField
                      fullWidth
                      margin="dense"
                      id="phone"
                      name="phone"
                      label="Số điện thoại"
                      variant="outlined"
                      value={values.phone}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CssTextField
                      fullWidth
                      margin="dense"
                      id="address"
                      name="address"
                      label="Địa chỉ"
                      variant="outlined"
                      value={values.address}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
                      <Grid item xs={6}>
                        <CssTextField
                          fullWidth
                          margin="dense"
                          id="basicSalary"
                          name="basicSalary"
                          label="Lương cơ bản"
                          variant="outlined"
                          value={values.basicSalary}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          InputProps={{
                            inputComponent: NumericFormatCustom
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <CssTextField
                          fullWidth
                          margin="dense"
                          id="consultingCommission"
                          name="consultingCommission"
                          label="Hoa hồng tư vấn"
                          variant="outlined"
                          value={values.consultingCommission}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          sx={{ '& > label': { lineHeight: 'normal' } }}
                          InputProps={{
                            endAdornment: <InputAdornment position="start">%</InputAdornment>
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <CssTextField
                          fullWidth
                          margin="dense"
                          id="numPaidLeave"
                          name="numPaidLeave"
                          label="Số ngày nghỉ phép có lương"
                          variant="outlined"
                          type="number"
                          value={values.numPaidLeave}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          sx={{ '& > label': { lineHeight: 'normal' } }}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">/tháng</InputAdornment>
                          }}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <CssTextField
                          fullWidth
                          margin="dense"
                          id="serviceCommission"
                          name="serviceCommission"
                          label="Hoa hồng dịch vụ"
                          variant="outlined"
                          value={values.serviceCommission}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          sx={{ '& > label': { lineHeight: 'normal' } }}
                          InputProps={{
                            endAdornment: <InputAdornment position="start">%</InputAdornment>
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
                      <Grid item xs={6}>
                        <CssTextField
                          fullWidth
                          margin="dense"
                          id="namAllowance"
                          name="namAllowance"
                          label="Phụ cấp 1"
                          variant="outlined"
                          value={values.namAllowance}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          sx={{ '& > label': { lineHeight: 'normal' } }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <CssTextField
                          fullWidth
                          margin="dense"
                          id="moneyAllowance"
                          name="moneyAllowance"
                          label="Khoản tiền"
                          variant="outlined"
                          value={values.moneyAllowance}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          sx={{ '& > label': { lineHeight: 'normal' } }}
                          InputProps={{
                            inputComponent: NumericFormatCustom
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={12} sx={{ display: 'inline-flex', justifyContent: 'space-between', mb: 2 }}>
                    <Grid container>
                      <Grid item xs={3}>
                        <FormControlLabel
                          label="Tất cả các ngày"
                          control={<Checkbox checked={parentChecked} onChange={handleParentChange} />}
                        />
                      </Grid>
                      <Grid item xs={9}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={['TimePicker', 'TimePicker']}>
                            <TimePicker label="Thời gian bắt đầu" value={values.startTime} defaultValue={dayjs('2022-04-17T09:00')} />
                            <TimePicker label="Thời gian kết thúc" value={values.startTime} defaultValue={dayjs('2022-04-17T20:00')} />
                          </DemoContainer>
                        </LocalizationProvider>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* {children} */}
                  {cards.map((card, index) => (
                    <Grid key={index} item xs={12} sx={{ justifyContent: 'space-between', mb: 2 }}>
                      <Grid container>
                        <Grid item xs={3}>
                          <FormControlLabel sx={{ pl: 3 }}
                            label={card.label}
                            control={<Checkbox checked={childChecked[index]} onChange={handleChangeChild(index)} />}
                          />{' '}
                        </Grid>
                        <Grid item xs={9}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            {' '}
                            <DemoContainer components={['TimePicker', 'TimePicker']}>
                              <TimePicker label="Thời gian bắt đầu" value={values.startTime} defaultValue={dayjs('2022-04-17T09:00')} />
                              <TimePicker label="Thời gian kết thúc" value={values.startTime} defaultValue={dayjs('2022-04-17T20:00')} />{' '}
                            </DemoContainer>{' '}
                          </LocalizationProvider>{' '}
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                  <Grid item></Grid>
                </Grid>
              </Grid>
            </Grid>

            <LoadingButton sx={{ mt: 3 }} type="submit" fullWidth size="large" loading={isSubmitting} variant="contained">
              <span>Gửi</span>
            </LoadingButton>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default StaffForm;
