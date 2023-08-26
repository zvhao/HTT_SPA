import { Box, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Path } from 'constant/path';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import NumericFormat from 'react-number-format';
import ReactQuill from 'react-quill';
import * as yup from 'yup';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import EditorToolbar, { formats, modules } from '../../../components/quill-editor/Toolbar';
import { Grid, InputAdornment, MenuItem, TextField, styled } from '@mui/material';

// import "./App.css";
import 'react-quill/dist/quill.snow.css';
import { LoadingButton } from '@mui/lab';

const validationSchema = yup.object({
  name: yup.string().required('Tên dịch vụ là bắt buộc'),
  price: yup.number().required('Tên dịch vụ là bắt buộc'),
  duration: yup.string().required('Tên dịch vụ là bắt buộc'),
  servicetype: yup.string().required('Tên dịch vụ là bắt buộc'),
  combo: yup.string().required('Tên dịch vụ là bắt buộc'),
  course: yup.string().required('Tên dịch vụ là bắt buộc'),
  technicianCommission: yup.string().required('Tên dịch vụ là bắt buộc'),
  consultingCommission: yup.string().required('Tên dịch vụ là bắt buộc')
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
const ServiceForm = () => {
  const currencies = [
    {
      value: 'USD',
      label: '$'
    },
    {
      value: 'EUR',
      label: '€'
    },
    {
      value: 'BTC',
      label: '฿'
    },
    {
      value: 'JPY',
      label: '¥'
    }
  ];

  const [state, setState] = useState({ value: '<h1>Hello</h1>' });
  const handleChange = (content) => {
    setState({ value: content });
  };

  const CssTextField = styled(TextField)({ '& > div > input': { lineHeight: 2 }, '& > label': { lineHeight: 'normal' } });

  //
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigation = useNavigate();

  const initialValues = {
    name: '',
    price: '',
    duration: '',
    servicetype: '',
    combo: '',
    course: '',
    technicianCommission: '',
    consultingCommission: ''
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

  const handleSubmit = (values) => {
    alert(JSON.stringify(values, null, 4));
    navigation(Path.Service, { replace: true });
    if (isEditMode) {
      // TODO: Update
    } else {
      // TODO: CREATE
    }
  };

  return (
    <Box>
      <Typography variant="h4">{isEditMode ? 'Cập nhật' : 'Thêm'} dịch vụ</Typography>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <Form autoComplete="none" noValidate onSubmit={handleSubmit}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
              <Grid item xs={6}>
                <CssTextField
                  fullWidth
                  margin="normal"
                  id="name"
                  name="name"
                  label="Tên dịch vụ"
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
                  margin="normal"
                  label="Giá"
                  // value={values.numberformat}
                  // onChange={handleChange}
                  name="price"
                  id="price"
                  InputProps={{
                    inputComponent: NumericFormatCustom
                  }}
                  variant="outlined"
                  value={values.price}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.price && Boolean(errors.price)}
                  helperText={touched.price && errors.price}
                />
              </Grid>
              <Grid item xs={3}>
                <CssTextField
                  fullWidth
                  margin="normal"
                  id="duration"
                  name="duration"
                  label="Thời gian"
                  variant="outlined"
                  value={values.duration}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.duration && Boolean(errors.duration)}
                  helperText={touched.duration && errors.duration}
                  InputProps={{
                    endAdornment: <InputAdornment position="start">Phút</InputAdornment>
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <CssTextField
                  fullWidth
                  margin="normal"
                  id="servicetype"
                  name="servicetype"
                  select
                  label="Loại dịch vụ"
                  defaultValue="EUR"
                  variant="outlined"
                  value={values.servicetype}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.servicetype && Boolean(errors.servicetype)}
                  helperText={touched.servicetype && errors.servicetype}
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CssTextField>
              </Grid>
              <Grid item xs={3}>
                <CssTextField
                  fullWidth
                  margin="normal"
                  id="combo"
                  name="combo"
                  select
                  label="Combo"
                  defaultValue="EUR"
                  variant="outlined"
                  value={values.combo}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.combo && Boolean(errors.combo)}
                  helperText={touched.combo && errors.combo}
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CssTextField>
              </Grid>
              <Grid item xs={3}>
                <CssTextField
                  fullWidth
                  margin="normal"
                  id="course"
                  name="course"
                  select
                  label="Liệu trình"
                  defaultValue="EUR"
                  variant="outlined"
                  value={values.course}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.course && Boolean(errors.course)}
                  helperText={touched.course && errors.course}
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CssTextField>
              </Grid>
              <Grid item xs={3}>
                <CssTextField
                  fullWidth
                  margin="normal"
                  id="technicianCommission"
                  name="technicianCommission"
                  label="Hoa hồng Kỹ thuật viên"
                  type="number"
                  variant="outlined"
                  value={values.technicianCommission}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.technicianCommission && Boolean(errors.technicianCommission)}
                  helperText={touched.technicianCommission && errors.technicianCommission}
                  InputProps={{
                    endAdornment: <InputAdornment position="start">%</InputAdornment>
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <CssTextField
                  fullWidth
                  margin="normal"
                  id="consultingCommission"
                  name="consultingCommission"
                  label="Hoa hồng tư vấn"
                  type="number"
                  variant="outlined"
                  value={values.consultingCommission}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.consultingCommission && Boolean(errors.consultingCommission)}
                  helperText={touched.consultingCommission && errors.consultingCommission}
                  InputProps={{
                    endAdornment: <InputAdornment position="start">%</InputAdornment>
                  }}
                />
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
            <Box>
              <EditorToolbar />
              <ReactQuill
                theme="snow"
                className="editor"
                bounds={'#editor'}
                value={state.value}
                onChange={handleChange}
                placeholder={'Write something awesome...'}
                modules={modules}
                formats={formats}
              />

              {/* <ReactQuill theme="bubble" readOnly value={state.value} /> */}

              {/* <div className="" style={{ padding: 0 }}> */}
              <ReactMarkdown className="ql-editor" rehypePlugins={[rehypeRaw, rehypeHighlight]}>
                {state.value}
              </ReactMarkdown>
            </Box>

            <LoadingButton sx={{ mt: 3 }} type="submit" fullWidth size="large" loading={isSubmitting} variant="contained">
              <span>Gửi</span>
            </LoadingButton>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ServiceForm;
