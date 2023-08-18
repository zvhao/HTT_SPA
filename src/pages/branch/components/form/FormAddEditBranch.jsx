import { LoadingButton } from '@mui/lab';
import { Grid, InputAdornment, styled, TextField } from '@mui/material';
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

const CssTextField = styled(TextField)({ '& > div > input': { lineHeight: 2 }, '& > label': { lineHeight: 'normal' } });


function FormAddEditBranch({ initialValues, onSubmit }) {
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

export default FormAddEditBranch;
