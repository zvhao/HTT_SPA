import AddIcon from '@mui/icons-material/Add';
import {
  Autocomplete,
  Box,
  Button,
  CardActions,
  Grid,
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
import NumericFormat from 'react-number-format';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
// import "./App.css";
import { LoadingButton } from '@mui/lab';
import { serviceApi, serviceTypeApi } from 'api';
import 'react-quill/dist/quill.snow.css';

const validationSchema = yup.object({
  // code: yup.string().required('Mã dịch vụ là bắt buộc'),
  name: yup.string().required('Tên dịch vụ là bắt buộc')
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
const ServiceTypeForm = () => {
  const CssTextField = styled(TextField)({ '& > div > input': { lineHeight: 2 }, '& > label': { lineHeight: 'normal' } });

  //
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigation = useNavigate();
  const [serviceTypeCount, setServiceTypeCount] = useState(0);
  const [serviceTypeCode, setServiceTypeCode] = useState('');

  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const [initialValues, setInitialValues] = useState({
    name: '',
    desc: ''
  });

  useEffect(() => {
    const generateServiceTypeCode = async () => {
      if (!isEditMode) {
        try {
          const result = await serviceTypeApi.fetchData();
          const keys = Object.keys(result.metadata);
          const count = keys.length;
          setServiceTypeCount(count);
          const code = `LDV${String(serviceTypeCount + 1).padStart(3, '0')}`;
          setServiceTypeCode(code);
          // console.log(result);
        } catch (error) {
          console.log(error);
        }
      }
    };

    const getOneServiceType = async (id) => {
      if (isEditMode) {
        const serviceTypeApiGetById = await serviceTypeApi.getById(id);
        const oneServiceTypeData = { ...serviceTypeApiGetById.metadata };
        setSelectedServices(oneServiceTypeData.services);
        setServiceTypeCode(oneServiceTypeData.code);
        setInitialValues(oneServiceTypeData);
        try {
        } catch (error) {
          console.log(error);
        }
      }
    };
    const fetchServices = async () => {
      try {
        const serviceData = await serviceApi.fetchData();
        setServices(serviceData.metadata);
      } catch (error) {
        console.log(error);
      }
    };

    generateServiceTypeCode();
    getOneServiceType(id);
    fetchServices();
  }, [serviceTypeCount, isEditMode, id]);

  const handleServicesChange = (event, value) => {
    setSelectedServices(value);
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
    const data = { ...values };
    data.code = serviceTypeCode;
    if (selectedServices.length > 0) {
      const servicesArray = selectedServices.map((service) => service._id);
      data.services = servicesArray;
    } else {
      data.services = [];
    }
    // console.log(data);
    if (isEditMode) {
      try {
        // console.log(data);
        const rs = await serviceTypeApi.update(id, data);
        navigation(Path.ServiceType, { replace: true });
        return rs;
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        // console.log(data);
        const rs = await serviceTypeApi.create(data);
        navigation(Path.ServiceType, { replace: true });
        return rs;
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Box>
      <Typography variant="h4">{isEditMode ? 'Cập nhật' : 'Thêm'} loại dịch vụ</Typography>
      <Formik enableReinitialize={true} initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
          <Form autoComplete="none" noValidate onSubmit={handleSubmit}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
              <Grid item xs={6}>
                <CssTextField
                  fullWidth
                  margin="dense"
                  id="code"
                  name="code"
                  label="Mã dịch vụ"
                  variant="outlined"
                  value={serviceTypeCode}
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
                  margin="dense"
                  id="name"
                  name="name"
                  label="Tên loại dịch vụ"
                  variant="outlined"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid item xs={6}>
                <CssTextField
                  fullWidth
                  margin="dense"
                  id="desc"
                  name="desc"
                  label="Mô tả ngắn"
                  variant="outlined"
                  value={values.desc}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.desc && Boolean(errors.desc)}
                  helperText={touched.desc && errors.desc}
                />
              </Grid>
              <Grid item xs={6}>
                <CardActions sx={{ justifyContent: 'start' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    component={Link}
                    to={Path.Service + `/add`}
                    target="_blank"
                  >
                    Thêm dịch vụ mới
                  </Button>
                </CardActions>
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
                  getOptionLabel={(option) => `${option.code} - ${option.name}`}
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
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
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

export default ServiceTypeForm;
