import { Box, Grid, InputAdornment, TextField, Typography, styled } from '@mui/material';
import { Path } from 'constant/path';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import NumericFormat from 'react-number-format';
import ReactQuill from 'react-quill';
import { useNavigate, useParams } from 'react-router-dom';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import * as yup from 'yup';
import EditorToolbar, { formats, modules } from '../../../components/quill-editor/Toolbar';

// import "./App.css";
import { LoadingButton } from '@mui/lab';
import { serviceApi } from 'api';
import 'react-quill/dist/quill.snow.css';

const validationSchema = yup.object({
  // code: yup.string().required('Mã dịch vụ là bắt buộc'),
  name: yup.string().required('Tên dịch vụ là bắt buộc'),
  price: yup.number().required('Giá dịch vụ là bắt buộc'),
  duration: yup.string().required('Thời gian dịch vụ là bắt buộc'),

  technicianCommission: yup.string().required('Hoa hồng là bắt buộc'),
  consultingCommission: yup.string().required('Hoa hồng là bắt buộc')
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
  const CssTextField = styled(TextField)({ '& > div > input': { lineHeight: 2 }, '& > label': { lineHeight: 'normal' } });

  //
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigation = useNavigate();
  const [serviceCount, setServiceCount] = useState(0);
  const [serviceCode, setServiceCode] = useState('');
  const [errorApi, setErrorApi] = useState(null);
  const [desc, setDesc] = useState({ value: '<h1>Hello</h1>' });
  const handleChangeDesc = (content) => {
    setDesc({ value: content });
  };

  const [initialValues, setInitialValues] = useState({
    name: '',
    price: '',
    duration: '',
    technicianCommission: 0,
    consultingCommission: 0,
    desc: ''
  });

  useEffect(() => {
    const generateServiceCode = async () => {
      try {
        const result = await serviceApi.fetchData();
        const keys = Object.keys(result.metadata);
        const count = keys.length;
        setServiceCount(count);
        const code = `DV${String(serviceCount + 1).padStart(3, '0')}`;
        setServiceCode(code);
        // console.log(result);
      } catch (error) {}
    };

    const getOneService = async (id) => {
      if (isEditMode) {
        const serviceApiGetById = await serviceApi.getById(id);
        const oneServiceData = { ...serviceApiGetById.metadata };
        // oneServiceData.desc = desc;
        setDesc({ value: oneServiceData.desc });
        setServiceCode(oneServiceData.code);
        setInitialValues(oneServiceData);
        console.log('data:', oneServiceData);
        try {
        } catch (error) {
          console.log(error);
        }
      }
    };

    generateServiceCode();
    getOneService(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceCount, isEditMode, id]);

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
    // alert(JSON.stringify(values, null, 4));
    const data = { ...values };
    data.code = serviceCode;
    data.price = parseInt(values.price);
    data.duration = parseInt(values.duration);
    console.log(data);
    navigation(Path.Service, { replace: true });
    if (isEditMode) {
      try {
        data.desc = desc.value
        const rs = await serviceApi.update(id, data);
        console.log(rs);
        navigation(Path.Service, { replace: true });
        return rs;
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        data.serviceTypes = [];
        data.combos = [];
        data.courses = [];
        const rs = await serviceApi.create(data);
        navigation(Path.Service, { replace: true });
        return rs;
      } catch (error) {
        // if (error?.response?.data?.message && error?.response?.data?.message === 'Code exists') {
        //   setErrorApi(error?.response?.data?.message);
        //   setTimeout(() => {
        //     setErrorApi(null);
        //   }, 3000);
        // }
        console.error(error);
      }
    }
  };

  return (
    <Box>
      <Typography variant="h4">{isEditMode ? 'Cập nhật' : 'Thêm'} dịch vụ</Typography>
      <Formik enableReinitialize={true} initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
          <Form autoComplete="none" noValidate onSubmit={handleSubmit}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
              <Grid item xs={6}>
                <CssTextField
                  fullWidth
                  margin="normal"
                  id="code"
                  name="code"
                  label="Mã dịch vụ"
                  variant="outlined"
                  value={serviceCode}
                  disabled
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.code && Boolean(errors.code)}
                  helperText={touched.code && errors.code}
                />
              </Grid>
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
                value={desc.value}
                onChange={handleChangeDesc}
                placeholder={'Write something awesome...'}
                modules={modules}
                formats={formats}
              />

              <ReactQuill theme="bubble" readOnly value={desc.value} />

              <div className="ql-editor" style={{ padding: 0 }}></div>
              <ReactMarkdown className="ql-editor" rehypePlugins={[rehypeRaw, rehypeHighlight]}>
                {desc.value}
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
