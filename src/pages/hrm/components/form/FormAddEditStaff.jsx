import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { LoadingButton } from '@mui/lab';
import { Checkbox, FormControlLabel, Grid, IconButton, InputAdornment, TextField, styled } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { Form, FormikProvider, useFormik } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import NumericFormat from 'react-number-format';
import 'react-quill/dist/quill.snow.css';
import * as yup from 'yup';

export const validationSchema = yup.object({
  email: yup.string().email('Email hợp lệ: example@gmail.com').required('Email là bắt buộc'),
  username: yup.string().required('Username là bắt buộc'),
  password: yup.string().required('Password là bắt buộc'),
  fullname: yup.string().required('Họ tên là bắt buộc')
});
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

const CssTextField = styled(TextField)({ '& > div > input': { lineHeight: 2 }, '& > label': { lineHeight: 'normal' } });

function FormAddEditStaff({ initialValues, onSubmit }) {
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (!onSubmit) return;
      onSubmit(values);
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  const [state, setState] = useState({ value: '<h1>Hello</h1>' });
  const handleChange = (content) => {
    setState({ value: content });
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
  const [value, setValue] = React.useState(dayjs('2023-08-07T20:00'));
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

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="none" noValidate onSubmit={handleSubmit}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
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
                  {...getFieldProps('username')}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                />
              </Grid>
              <Grid item xs={6}>
                <CssTextField
                  fullWidth
                  margin="dense"
                  id="fullname"
                  name="fullname"
                  label="Họ tên quản lý"
                  variant="outlined"
                  {...getFieldProps('fullname')}
                  error={touched.fullname && Boolean(errors.fullname)}
                  helperText={touched.fullname && errors.fullname}
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
                  {...getFieldProps('password')}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={handleTogglePassword}>{showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}</IconButton>
                    )
                  }}
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
                  {...getFieldProps('email')}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item xs={6}>
                <CssTextField fullWidth margin="dense" id="phone" name="phone" label="Số điện thoại" variant="outlined" />
              </Grid>
              <Grid item xs={6}>
                <CssTextField fullWidth margin="dense" id="address" name="address" label="Địa chỉ" variant="outlined" />
              </Grid>
              <Grid item xs={6}>
                <CssTextField fullWidth margin="dense" id="branch" name="branch" label="Chi nhánh" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
                  <Grid item xs={6}>
                    <CssTextField
                      fullWidth
                      margin="dense"
                      id="basic-salary"
                      name="basic-salary"
                      label="Lương cơ bản"
                      variant="outlined"
                      InputProps={{
                        inputComponent: NumericFormatCustom
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CssTextField
                      fullWidth
                      margin="dense"
                      id="consulting-commission"
                      name="consulting-commission"
                      label="Hoa hồng tư vấn"
                      variant="outlined"
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
                      id="num-workdays"
                      name="num-workdays"
                      label="Số ngày công"
                      variant="outlined"
                      type="number"
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
                      id="num-paid-leave"
                      name="num-paid-leave"
                      label="Số ngày nghỉ phép có lương"
                      variant="outlined"
                      type="number"
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
                      id="working-hours"
                      name="working-hours"
                      label="Số giờ làm việc"
                      variant="outlined"
                      type="number"
                      sx={{ '& > label': { lineHeight: 'normal' } }}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">/ngày</InputAdornment>
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
                      id="name-allowance-1"
                      name="name-allowance-1"
                      label="Phụ cấp 1"
                      variant="outlined"
                      sx={{ '& > label': { lineHeight: 'normal' } }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CssTextField
                      fullWidth
                      margin="dense"
                      id="money-allowance-1"
                      name="money-allowance-1"
                      label="Khoản tiền"
                      variant="outlined"
                      sx={{ '& > label': { lineHeight: 'normal' } }}
                      InputProps={{
                        inputComponent: NumericFormatCustom
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CssTextField
                      fullWidth
                      margin="dense"
                      id="name-allowance-2"
                      name="name-allowance-2"
                      label="Phụ cấp 2"
                      variant="outlined"
                      sx={{ '& > label': { lineHeight: 'normal' } }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CssTextField
                      fullWidth
                      margin="dense"
                      id="money-allowance-2"
                      name="money-allowance-2"
                      label="Khoản tiền"
                      variant="outlined"
                      sx={{ '& > label': { lineHeight: 'normal' } }}
                      InputProps={{
                        inputComponent: NumericFormatCustom
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CssTextField
                      fullWidth
                      margin="dense"
                      id="name-allowance-3"
                      name="name-allowance-3"
                      label="Phụ cấp 3"
                      variant="outlined"
                      sx={{ '& > label': { lineHeight: 'normal' } }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CssTextField
                      fullWidth
                      margin="dense"
                      id="money-allowance-3"
                      name="money-allowance-3"
                      label="Khoản tiền"
                      variant="outlined"
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
              <Grid item xs={12}>
                <FormControlLabel label="Tất cả các ngày" control={<Checkbox checked={parentChecked} onChange={handleParentChange} />} />
              </Grid>
              {/* {children} */}
              {cards.map((card, index) => (
                <Grid key={index} item xs={12} sx={{ pl: 3, display: 'inline-flex', justifyContent: 'space-between', mb: 2 }}>
                  <FormControlLabel
                    label={card.label}
                    control={<Checkbox checked={childChecked[index]} onChange={handleChangeChild(index)} />}
                  />{' '}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {' '}
                    <DemoContainer components={['TimePicker', 'TimePicker']}>
                      <TimePicker label="Thời gian bắt đầu" defaultValue={dayjs('2022-04-17T09:00')} />
                      <TimePicker label="Thời gian kết thúc" value={value} onChange={(newValue) => setValue(newValue)} />{' '}
                    </DemoContainer>{' '}
                  </LocalizationProvider>{' '}
                </Grid>
              ))}
              <Grid item></Grid>
            </Grid>
          </Grid>
        </Grid>

        <LoadingButton sx={{ mt: 3 }} type="submit" fullWidth margin="dense" size="large" loading={false} variant="contained">
          <span>Gửi</span>
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}

export default FormAddEditStaff;
