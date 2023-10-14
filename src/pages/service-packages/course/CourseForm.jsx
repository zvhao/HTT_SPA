import {
  Autocomplete,
  Box,
  Button,
  Grid,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled
} from '@mui/material';
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
import { serviceApi, courseApi, comboApi } from 'api';
import 'react-quill/dist/quill.snow.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import formatCurrency from 'utils/formatCurrency';

const validationSchema = yup.object({
  // code: yup.string().required('Mã gói - liệu trình là bắt buộc'),
  name: yup.string().required('Tên gói - liệu trình là bắt buộc'),
  // price: yup.number().required('Giá gói - liệu trình là bắt buộc'),
  duration: yup.string().required('Thời gian gói - liệu trình là bắt buộc'),
  technicianCommission: yup.number().required('Hoa hồng là bắt buộc').min(0, 'Hoa hồng phải lớn hơn hoặc bằng 0'),
  consultingCommission: yup.number().required('Hoa hồng là bắt buộc').min(0, 'Hoa hồng phải lớn hơn hoặc bằng 0')
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
const CourseForm = () => {
  const CssTextField = styled(TextField)({ '& > div > input': { lineHeight: 2 }, '& > label': { lineHeight: 'normal' } });

  //
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigation = useNavigate();
  const [courseCount, setCourseCount] = useState(0);
  const [courseCode, setCourseCode] = useState('');
  const [errorApi, setErrorApi] = useState(null);
  const [desc, setDesc] = useState({ value: '' });
  const handleChangeDesc = (content) => {
    setDesc({ value: content });
  };

  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [initialValues, setInitialValues] = useState({
    code: '',
    name: '',
    details_each_time: '',
    imgs: '',
    duration: 0,
    consultingCommission: 0,
    technicianCommission: 0,
    desc: '',
    services: ''
  });

  useEffect(() => {
    const generateCourseCode = async () => {
      try {
        const result = await courseApi.fetchData();
        // console.log(result);
        const keys = Object.keys(result.metadata);
        const count = keys.length;
        setCourseCount(count);
        const code = `LT${String(courseCount + 1).padStart(3, '0')}`;
        setCourseCode(code);
        // console.log(result);
      } catch (error) {}
    };

    const getOneCourse = async (id) => {
      if (isEditMode) {
        const courseApiGetById = await courseApi.getById(id);
        const oneCourseData = { ...courseApiGetById.metadata };
        setDesc({ value: oneCourseData.desc });
        setSelectedServices(oneCourseData.services);
        setCourseCode(oneCourseData.code);
        setInitialValues(oneCourseData);
        console.log('data:', oneCourseData);
        try {
        } catch (error) {
          console.log(error);
        }
      }
    };

    const fetchServices = async () => {
      try {
        const services = await serviceApi.fetchData();
        const servicesData = services.metadata;
        const combos = await comboApi.fetchData();
        const combosData = combos.metadata;

        const combinedArray = servicesData.concat(combosData);
        // console.log(combinedArray);
        setServices(combinedArray);
      } catch (error) {
        console.log(error);
      }
    };

    generateCourseCode();
    getOneCourse(id);
    fetchServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseCount, isEditMode, id]);

  const handleServicesChange = (event, value) => {
    setSelectedServices(value);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
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

  const handleSubmit = async (values) => {
    // alert(JSON.stringify(values, null, 4));
    let data = { ...values };
    data.code = courseCode;
    data.duration = parseInt(values.duration);
    console.log(data);
    console.log(selectedFiles);
    if (isEditMode) {
      try {
        data.desc = desc.value;
        // console.log(data);
        // const rs = await serviceApi.update(id, data);
        // console.log(rs);
        // navigation(Path.Service, { replace: true });
        // return rs;
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        // console.log(data);
        // const rs = await serviceApi.create(data);
        // navigation(Path.Service, { replace: true });
        // return rs;
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
      <Typography variant="h4">{isEditMode ? 'Cập nhật' : 'Thêm'} gói - liệu trình</Typography>
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
                  label="Mã gói - liệu trình"
                  variant="outlined"
                  value={courseCode}
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
                  label="Tên gói - liệu trình"
                  variant="outlined"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              {/* <Grid item xs={3}>
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
              </Grid> */}
              <Grid item xs={3}>
                <CssTextField
                  fullWidth
                  margin="normal"
                  id="duration"
                  name="duration"
                  label="Thời gian"
                  variant="outlined"
                  // disabled
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
                  label="% Tour Kỹ thuật viên"
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
                  label="% tư vấn"
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
              <Grid item xs={3}>
                <Box sx={{mt: 2}}>
                  <input id="upload-button" multiple type="file" style={{ display: 'none' }} onChange={handleFileChange} />
                  <label htmlFor="upload-button">
                    <Button variant="contained" component="span" startIcon={<CloudUploadIcon />}>
                      Chọn nhiều hình ảnh mô tả
                    </Button>
                  </label>
                </Box>
              </Grid>
              <Grid item xs={12}>
                {selectedFiles.length > 0 && (
                  <Grid item xs={12}>
                    {selectedFiles.length > 0 && (
                      <Paper elevation={3} style={{ padding: '20px' }}>
                        <Grid container spacing={2}>
                          {selectedFiles.map((file, index) => (
                            <Grid item key={index}>
                              <img src={URL.createObjectURL(file)} alt="" style={{ width: 'auto', height: '50px' }} />
                            </Grid>
                          ))}
                        </Grid>
                      </Paper>
                    )}
                  </Grid>
                )}
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-input': { lineHeight: 2, p: '10.5px 14px 10.5px 12px' },
                    '&': { mt: 2, mb: 2, p: 0 },
                    '& .MuiOutlinedInput-root': { pt: '0px', pb: '6px' },
                    '& .MuiInputLabel-root': { lineHeight: 'normal' },
                    '& .MuiAutocomplete-endAdornment': { top: '50%', transform: 'translate(0, -50%)' }
                  }}
                  multiple
                  id="tags-outlined"
                  options={services}
                  getOptionLabel={(option) => `${option.code} - ${option.name} - ${option.price / 1000}k - ${option.duration} phút`}
                  filterOptions={(options, { inputValue }) =>
                    options.filter(
                      (option) =>
                        option.code.toLowerCase().includes(inputValue.toLowerCase()) ||
                        option.name.toLowerCase().includes(inputValue.toLowerCase())
                    )
                  }
                  onChange={handleServicesChange}
                  value={selectedServices.length > 0 ? selectedServices : []}
                  filterSelectedOptions
                  renderInput={(params) => <TextField {...params} label="Chọn nhiều dịch vụ" placeholder={values.name} />}
                />
              </Grid>
              <Grid item xs={6} mt={2}>
                {selectedServices && selectedServices.length !== 0 && (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell width="100px" align="center">
                            STT
                          </TableCell>
                          <TableCell align="center">Mã dịch vụ</TableCell>
                          <TableCell align="center">Tên dịch vụ</TableCell>
                          <TableCell align="center">Thời gian</TableCell>
                          <TableCell align="center">Giá</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedServices.map((service, index) => (
                          <TableRow key={index}>
                            <TableCell sx={{ fontWeight: 'bold' }} align="center">
                              {index + 1}
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} align="center">
                              {service.code}
                            </TableCell>
                            <TableCell align="center">{service.name}</TableCell>
                            <TableCell align="center">{service.duration}</TableCell>
                            <TableCell align="center">{formatCurrency(service.price)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Grid>
            </Grid>
            <Box sx={{ mt: 3 }}>
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

export default CourseForm;
