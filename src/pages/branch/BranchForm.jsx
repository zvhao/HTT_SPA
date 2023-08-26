import AddIcon from '@mui/icons-material/Add';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, IconButton, InputAdornment, TextField, Typography, styled } from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
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

const validationSchema = yup.object({
  name: yup.string().required('Tên dịch vụ là bắt buộc'),
  code: yup.string().required('Tên dịch vụ là bắt buộc'),
  capacity: yup.string().required('Tên dịch vụ là bắt buộc'),
  // manager: yup.string().required('Tên dịch vụ là bắt buộc'),
  address: yup.string().required('Tên dịch vụ là bắt buộc'),
  desc: yup.string().required('Tên dịch vụ là bắt buộc')
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

const BranchForm = () => {
  const CssTextField = styled(TextField)({ '& > div > input': { lineHeight: 2 }, '& > label': { lineHeight: 'normal' } });

  //
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigation = useNavigate();

  const [initialValues, setInitialValues] = useState({
    name: 'HTT SPA',
    code: '',
    capacity: '',
    manager: '64a6dc237004fb28bcd6f96c',
    address: '',
    desc: 'Chi nhánh 1',
    startTime: dayjs('2013-11-18 09:00:00'),
    endTime: dayjs('2013-11-18 20:00:00')
  });

  useEffect(() => {
    const getOneBranch = async (id) => {
      if (isEditMode) {
        try {
          const oneBranchData = await branchApi.getById(id);
          const newOneBranchData = { ...oneBranchData.metadata };
          newOneBranchData.startTime = dayjs(oneBranchData.metadata.startTime, 'HH:mm');
          newOneBranchData.endTime = dayjs(oneBranchData.metadata.endTime, 'HH:mm');
          setInitialValues(newOneBranchData);
          return newOneBranchData;
        } catch (error) {
          console.log(error);
        }
      }
    };
    getOneBranch(id);
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
    const newdata = { ...values };
    newdata.startTime = dayjs(values.startTime).format('HH:mm');
    newdata.endTime = dayjs(values.endTime).format('HH:mm');

    if (isEditMode) {
      try {
        // console.log(newdata);
        const rs = await branchApi.update(id, newdata);
        navigation(Path.Branch, { replace: true });
        return rs
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const rs = await branchApi.create(newdata);
        navigation(Path.Branch, { replace: true });
        console.log(rs);
        return rs

      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Box>
      <Typography variant="h4">{isEditMode ? 'Cập nhật' : 'Thêm'} dịch vụ</Typography>
      <Formik enableReinitialize={true} initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <Form autoComplete="none" noValidate onSubmit={handleSubmit}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
              <Grid item xs={3}>
                <CssTextField
                  fullWidth
                  margin="dense"
                  id="name"
                  name="name"
                  label="Tên chi nhánh"
                  variant="outlined"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid item xs={3}>
                <CssTextField
                  fullWidth
                  margin="dense"
                  id="code"
                  name="code"
                  label="Mã chi nhánh"
                  variant="outlined"
                  value={values.code}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.code && Boolean(errors.code)}
                  helperText={touched.code && errors.code}
                />
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
                  value={values.capacity}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.capacity && Boolean(errors.capacity)}
                  helperText={touched.capacity && errors.capacity}
                  InputProps={{
                    endAdornment: <InputAdornment position="start">người</InputAdornment>
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <CssTextField
                  sx={{ '& > div': { padding: 0 } }}
                  fullWidth
                  margin="dense"
                  id="manager"
                  name="manager"
                  label="Nhân viên quản lý"
                  variant="outlined"
                  value={values.manager}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.manager && Boolean(errors.manager)}
                  helperText={touched.manager && errors.manager}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="large" color="primary" component={Link} to={Path.Staff + `/add`} target="_blank">
                          <AddIcon />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <CssTextField
                  fullWidth
                  id="address"
                  name="address"
                  label="Địa chỉ"
                  variant="outlined"
                  value={values.address}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.address && Boolean(errors.address)}
                  helperText={touched.address && errors.address}
                />
              </Grid>
              <Grid item xs={6}>
                <CssTextField
                  fullWidth
                  id="desc"
                  name="desc"
                  label="Mô tả"
                  variant="outlined"
                  value={values.desc}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.desc && Boolean(errors.desc)}
                  helperText={touched.desc && errors.desc}
                />
              </Grid>

              <Grid item xs={6}>
                <Typography mb={2} variant="h5">
                  Thời gian hoạt động
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
                    <Grid item xs={6}>
                      <Field name="startTime">
                        {({ field }) => (
                          <TimePicker
                            {...field}
                            sx={{ width: '100%' }}
                            label="Thời gian bắt đầu"
                            value={field.value}
                            onChange={(value) => {
                              field.onChange({ target: { name: field.name, value } });
                            }}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={6}>
                      <Field name="endTime">
                        {({ field }) => (
                          <TimePicker
                            {...field}
                            sx={{ width: '100%' }}
                            label="Thời gian kết thúc"
                            value={field.value}
                            onChange={(value) => {
                              field.onChange({ target: { name: field.name, value } });
                            }}
                          />
                        )}
                      </Field>
                    </Grid>
                  </Grid>
                </LocalizationProvider>
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

export default BranchForm;
