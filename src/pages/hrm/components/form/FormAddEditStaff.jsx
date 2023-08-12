import { LoadingButton } from '@mui/lab';
import { Box, Checkbox, FormControlLabel, Grid, InputAdornment, TextField } from '@mui/material';
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
  // const [childChecked, setChildChecked] = useState([true, true, true, true, true, true, true]);
  // const [parentChecked, setParentChecked] = useState(true);

  // const handleParentChange = (event) => {
  //   setParentChecked(event.target.checked);
  //   setChildChecked(childChecked.map(() => event.target.checked));
  // };

  // const handleChangeChild = (index) => (event) => {
  //   const newChildChecked = [...childChecked];
  //   newChildChecked[index] = event.target.checked;
  //   setChildChecked(newChildChecked);
  //   setParentChecked(newChildChecked.every((checked) => checked));
  // };
  // const [value, setValue] = React.useState(dayjs('2023-08-07T20:00'));

  const [checked, setChecked] = React.useState([true, false]);

  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked]);
  };
  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel label="Child 1" control={<Checkbox checked={checked[0]} onChange={handleChange2} />} />
      <FormControlLabel label="Child 2" control={<Checkbox checked={checked[1]} onChange={handleChange3} />} />
    </Box>
  );
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="none" noValidate onSubmit={handleSubmit}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
          <Grid item xs={6}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="fullname"
                  name="fullname"
                  label="Họ tên quản lý"
                  margin="normal"
                  variant="outlined"
                  {...getFieldProps('fullname')}
                  sx={{ '& > div > input': { lineHeight: 2 }, '& > label': { lineHeight: 'normal' } }}
                  error={touched.fullname && Boolean(errors.fullname)}
                  helperText={touched.fullname && errors.fullname}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="email"
                  margin="normal"
                  variant="outlined"
                  {...getFieldProps('email')}
                  sx={{ '& > div > input': { lineHeight: 2 }, '& > label': { lineHeight: 'normal' } }}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="phone"
                  name="phone"
                  label="Số điện thoại"
                  margin="normal"
                  variant="outlined"
                  sx={{ '& > div > input': { lineHeight: 2 }, '& > label': { lineHeight: 'normal' } }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="address"
                  name="address"
                  label="Địa chỉ"
                  margin="normal"
                  variant="outlined"
                  sx={{ '& > div > input': { lineHeight: 2 }, '& > label': { lineHeight: 'normal' } }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="branch"
                  name="branch"
                  label="Chi nhánh"
                  margin="normal"
                  variant="outlined"
                  sx={{ '& > div > input': { lineHeight: 2 }, '& > label': { lineHeight: 'normal' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="basic-salary"
                      name="basic-salary"
                      label="Lương cơ bản"
                      margin="normal"
                      variant="outlined"
                      sx={{ '& > div > input': { lineHeight: 2 }, '& > label': { lineHeight: 'normal' } }}
                      InputProps={{
                        inputComponent: NumericFormatCustom
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="consulting-commission"
                      name="consulting-commission"
                      label="Hoa hồng tư vấn"
                      margin="normal"
                      variant="outlined"
                      sx={{ '& > label': { lineHeight: 'normal' } }}
                      InputProps={{
                        endAdornment: <InputAdornment position="start">%</InputAdornment>
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="num-workdays"
                      name="num-workdays"
                      label="Số ngày công"
                      margin="normal"
                      variant="outlined"
                      type="number"
                      sx={{ '& > label': { lineHeight: 'normal' } }}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">/tháng</InputAdornment>
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="num-paid-leave"
                      name="num-paid-leave"
                      label="Số ngày nghỉ phép có lương"
                      margin="normal"
                      variant="outlined"
                      type="number"
                      sx={{ '& > label': { lineHeight: 'normal' } }}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">/tháng</InputAdornment>
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="working-hours"
                      name="working-hours"
                      label="Số giờ làm việc"
                      margin="normal"
                      variant="outlined"
                      type="number"
                      sx={{ '& > label': { lineHeight: 'normal' } }}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">/ngày</InputAdornment>
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        id="name-allowance-1"
                        name="name-allowance-1"
                        label="Phụ cấp 1"
                        margin="normal"
                        variant="outlined"
                        sx={{ '& > label': { lineHeight: 'normal' } }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        id="money-allowance-1"
                        name="money-allowance-1"
                        label=""
                        margin="normal"
                        variant="outlined"
                        sx={{ '& > label': { lineHeight: 'normal' } }}
                        InputProps={{
                          inputComponent: NumericFormatCustom
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        id="name-allowance-2"
                        name="name-allowance-2"
                        label="Phụ cấp 2"
                        margin="normal"
                        variant="outlined"
                        sx={{ '& > label': { lineHeight: 'normal' } }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        id="money-allowance-2"
                        name="money-allowance-2"
                        label=""
                        margin="normal"
                        variant="outlined"
                        sx={{ '& > label': { lineHeight: 'normal' } }}
                        InputProps={{
                          inputComponent: NumericFormatCustom
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        id="name-allowance-3"
                        name="name-allowance-3"
                        label="Phụ cấp 3"
                        margin="normal"
                        variant="outlined"
                        sx={{ '& > label': { lineHeight: 'normal' } }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        id="money-allowance-3"
                        name="money-allowance-3"
                        label=""
                        margin="normal"
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
          </Grid>

          {/* <Grid item xs={6}>
            <Grid container>
              <Grid item xs={12}>
                <FormControlLabel label="Tất cả các ngày" control={<Checkbox checked={parentChecked} onChange={handleParentChange} />} />
              </Grid>
              <Grid item xs={12} sx={{ pl: 3, display: 'inline-flex', justifyContent: 'space-between', mb: 2 }}>
                <FormControlLabel label="Thứ 2" control={<Checkbox checked={childChecked[0]} onChange={handleChangeChild(0)} />} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['TimePicker', 'TimePicker']}>
                    <TimePicker label="Thời gian bắt đầu" defaultValue={dayjs('2022-04-17T09:00')} />
                    <TimePicker label="Thời gian kết thúc" value={value} onChange={(newValue) => setValue(newValue)} />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sx={{ pl: 3, display: 'inline-flex', justifyContent: 'space-between', mb: 2 }}>
                <FormControlLabel label="Thứ 3" control={<Checkbox checked={childChecked[1]} onChange={handleChangeChild(1)} />} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['TimePicker', 'TimePicker']}>
                    <TimePicker label="Thời gian bắt đầu" defaultValue={dayjs('2022-04-17T09:00')} />
                    <TimePicker label="Thời gian kết thúc" value={value} onChange={(newValue) => setValue(newValue)} />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sx={{ pl: 3, display: 'inline-flex', justifyContent: 'space-between', mb: 2 }}>
                <FormControlLabel label="Thứ 4" control={<Checkbox checked={childChecked[2]} onChange={handleChangeChild(2)} />} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['TimePicker', 'TimePicker']}>
                    <TimePicker label="Thời gian bắt đầu" defaultValue={dayjs('2022-04-17T09:00')} />
                    <TimePicker label="Thời gian kết thúc" value={value} onChange={(newValue) => setValue(newValue)} />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sx={{ pl: 3, display: 'inline-flex', justifyContent: 'space-between', mb: 2 }}>
                <FormControlLabel label="Thứ 5" control={<Checkbox checked={childChecked[3]} onChange={handleChangeChild(3)} />} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['TimePicker', 'TimePicker']}>
                    <TimePicker label="Thời gian bắt đầu" defaultValue={dayjs('2022-04-17T09:00')} />
                    <TimePicker label="Thời gian kết thúc" value={value} onChange={(newValue) => setValue(newValue)} />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sx={{ pl: 3, display: 'inline-flex', justifyContent: 'space-between', mb: 2 }}>
                <FormControlLabel label="Thứ 6" control={<Checkbox checked={childChecked[4]} onChange={handleChangeChild(4)} />} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['TimePicker', 'TimePicker']}>
                    <TimePicker label="Thời gian bắt đầu" defaultValue={dayjs('2022-04-17T09:00')} />
                    <TimePicker label="Thời gian kết thúc" value={value} onChange={(newValue) => setValue(newValue)} />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sx={{ pl: 3, display: 'inline-flex', justifyContent: 'space-between', mb: 2 }}>
                <FormControlLabel label="Thứ 7" control={<Checkbox checked={childChecked[5]} onChange={handleChangeChild(5)} />} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['TimePicker', 'TimePicker']}>
                    <TimePicker label="Thời gian bắt đầu" defaultValue={dayjs('2022-04-17T09:00')} />
                    <TimePicker label="Thời gian kết thúc" value={value} onChange={(newValue) => setValue(newValue)} />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sx={{ pl: 3, display: 'inline-flex', justifyContent: 'space-between', mb: 2 }}>
                <FormControlLabel label="Chủ nhật " control={<Checkbox checked={childChecked[6]} onChange={handleChangeChild(6)} />} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['TimePicker', 'TimePicker']}>
                    <TimePicker label="Thời gian bắt đầu" defaultValue={dayjs('2022-04-17T09:00')} />
                    <TimePicker label="Thời gian kết thúc" value={value} onChange={(newValue) => setValue(newValue)} />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item></Grid>
            </Grid>
          </Grid> */}
          <Grid item xs={6}>
            <FormControlLabel
              label="Parent"
              control={<Checkbox checked={checked[0] && checked[1]} indeterminate={checked[0] !== checked[1]} onChange={handleChange1} />}
            />
            <Grid container>{children}</Grid>
          </Grid>
        </Grid>

        <LoadingButton sx={{ mt: 3 }} type="submit" fullWidth size="large" loading={false} variant="contained">
          <span>Gửi</span>
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}

export default FormAddEditStaff;
