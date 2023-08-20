import { LoadingButton } from '@mui/lab';
import { Button, CardActions, Grid, InputAdornment, styled, TextField, Typography } from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Form, FormikProvider, useFormik } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import NumericFormat from 'react-number-format';
import 'react-quill/dist/quill.snow.css';
import * as yup from 'yup';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { Path } from 'constant/path';
import AddIcon from '@mui/icons-material/Add';

export const validationSchema = yup.object({
  email: yup.string().email('Email hợp lệ: example@gmail.com').required('Email là bắt buộc'),
  manager: yup.string().required('Họ tên là bắt buộc')
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

  const [value, setValue] = React.useState(dayjs('2023-08-07T20:00'));

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="none" noValidate onSubmit={handleSubmit}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
          <Grid item xs={3}>
            <CssTextField fullWidth margin="dense" id="name-branch" name="name-branch" label="Tên chi nhánh" variant="outlined" />
          </Grid>
          <Grid item xs={3}>
            <CssTextField
              fullWidth
              margin="dense"
              id="capacity"
              type="number"
              name="capacity"
              label="Sức chứa"
              variant="outlined"
              InputProps={{
                endAdornment: <InputAdornment position="start">người</InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
              <Grid item xs={6}>
                <CssTextField
                  fullWidth
                  margin="dense"
                  id="manager"
                  name="manager"
                  label="Nhân viên quản lý"
                  variant="outlined"
                  {...getFieldProps('manager')}
                  error={touched.manager && Boolean(errors.manager)}
                  helperText={touched.manager && errors.manager}
                />
              </Grid>
              <Grid item xs={6}>
                <CardActions sx={{ mb: 1, width: '100%' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    component={Link}
                    to={Path.Staff + `/add`}
                    target="_blank"
                  >
                    Thêm nhân viên quản lý
                  </Button>
                </CardActions>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6} sx={{ display: 'flex', alignItems: 'end' }}>
            <CssTextField fullWidth id="address" name="address" label="Địa chỉ" variant="outlined" />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h5">Thời gian hoạt động</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['TimePicker', 'TimePicker']}>
                <TimePicker sx={{ width: '100%' }} label="Thời gian bắt đầu" defaultValue={dayjs('2022-04-17T09:00')} />
                <TimePicker sx={{ width: '100%' }} label="Thời gian kết thúc" value={value} onChange={(newValue) => setValue(newValue)} />
              </DemoContainer>
            </LocalizationProvider>
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
