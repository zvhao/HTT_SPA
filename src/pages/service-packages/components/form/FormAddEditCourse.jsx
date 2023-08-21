import { LoadingButton, TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Button,
  CardActions,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
  styled,
  IconButton,
  Box
} from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import NumericFormat from 'react-number-format';
import * as yup from 'yup';
import 'react-quill/dist/quill.snow.css';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { Path } from 'constant/path';

export const validationSchema = yup.object({
  // email: yup.string().email('Email hợp lệ: example@gmail.com').required('Email là bắt buộc'),
  // password: yup.string().min(8, 'Mật khẩu phải từ 8 ký tự trở lên').required('Mật khẩu là bắt buộc')
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

function FormAddEditCourse({ initialValues, onSubmit }) {
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

  const CssTextField = styled(TextField)({ '& > div > input': { lineHeight: 2 }, '& > label': { lineHeight: 'normal' } });

  const types = [
    {
      value: 'usual-step',
      label: 'Bước thông thường'
    },
    {
      value: 'service',
      label: 'Dịch vụ'
    },
    {
      value: 'combo',
      label: 'Combo'
    }
  ];

  const [value, setValue] = useState('1');
  const [tabs, setTabs] = useState([
    { label: 'Lần 1', value: '1' },
    { label: 'Lần 2', value: '2' },
    { label: 'Lần 3', value: '3' }
  ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddTab = () => {
    const newTab = {
      label: `Lần ${tabs.length + 1}`,
      value: `${tabs.length + 1}`
    };
    setTabs([...tabs, newTab]);
  };

  const handleRemoveTab = (index) => {
    const newTabs = [...tabs];
    newTabs.splice(index, 1);
    setTabs(newTabs);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="none" noValidate onSubmit={handleSubmit}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }} mb={1}>
          <Grid item xs={6}>
            <CssTextField fullWidth margin="normal" id="coursename" name="coursename" label="Tên liệu trình" variant="outlined" />
          </Grid>
          <Grid item xs={3}>
            <CssTextField
              fullWidth
              margin="normal"
              label="Giá"
              // value={values.numberformat}
              // onChange={handleChange}
              name="numberformat"
              id="formatted-numberformat-input"
              InputProps={{
                inputComponent: NumericFormatCustom
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <CssTextField fullWidth margin="normal" id="desc" name="desc" label="Mô tả liệu trình" variant="outlined" />
          </Grid>
          <Grid item xs={3}>
            <CssTextField
              fullWidth
              margin="normal"
              id="technician-commission"
              name="technician-commission"
              label="Hoa hồng Kỹ thuật viên"
              type="number"
              variant="outlined"
              InputProps={{
                endAdornment: <InputAdornment position="start">%</InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <CssTextField
              fullWidth
              margin="normal"
              id="consulting-commission"
              name="consulting-commission"
              label="Hoa hồng tư vấn"
              type="number"
              variant="outlined"
              InputProps={{
                endAdornment: <InputAdornment position="start">%</InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <CardActions>
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
          <Grid item xs={3}>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                component={Link}
                to={Path.Combo + `/add`}
                target="_blank"
              >
                Thêm combo mới
              </Button>
            </CardActions>
          </Grid>
        </Grid>

        {/* tab */}
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                {tabs.map((tab, index) => (
                  <Tab
                    key={index}
                    label={tab.label}
                    value={tab.value}
                    iconPosition={'end'}
                    icon={
                      <IconButton size="small" onClick={() => handleRemoveTab(index)}>
                        <CloseIcon />
                      </IconButton>
                    }
                  />
                ))}
                <IconButton size="large" color="primary" onClick={handleAddTab}>
                  <AddIcon />
                </IconButton>
              </TabList>
            </Box>
            {tabs.map((tab) => (
              <TabPanel key={tab.value} value={tab.value}>
                {tab.label}
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
                  <Grid item xs={6}>
                    <CssTextField
                      fullWidth
                      margin="normal"
                      id="stepname-1"
                      name="stepname-1"
                      label="Tên lần trị liệu 1"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CssTextField
                      fullWidth
                      margin="normal"
                      id="stepduration-1"
                      name="stepduration-1"
                      label="Tổng thời gian thực hiện"
                      variant="outlined"
                      InputProps={{
                        endAdornment: <InputAdornment position="start">Phút</InputAdornment>
                      }}
                    />
                  </Grid>
                </Grid>
                <Typography variant="h6">Gồm các bước:</Typography>

                <TableContainer sx={{ marginBottom: '20px' }} component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell width={'5%'} align="center">STT</TableCell>
                        <TableCell width={'35%'} align="center">Loại</TableCell>
                        <TableCell width={'50%'} align="center">Tên loại</TableCell>
                        <TableCell width={'10%'} align="center">Thao tác</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>1</TableCell>
                        <TableCell>
                          <CssTextField fullWidth id="combo" name="combo" select label="Loại" variant="outlined">
                            {types.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </CssTextField>
                        </TableCell>

                        <TableCell>
                          <CssTextField fullWidth id="typename" name="typename" label="Tên loại" variant="outlined" />
                        </TableCell>
                        <TableCell>
                          <CardActions sx={{ justifyContent: 'end' }}>
                            <Button
                              variant="contained"
                              color="secondary"
                              startIcon={<DeleteIcon />}
                              // onClick={handleDeleteRow}
                            >
                              Xoá
                            </Button>
                          </CardActions>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                    <TableRow>
                      <TableCell colSpan={4}>
                        <Button fullWidth size="large" variant="outlined" color="primary" startIcon={<AddIcon />}></Button>
                      </TableCell>
                    </TableRow>
                  </Table>
                </TableContainer>
              </TabPanel>
            ))}
          </TabContext>
        </Box>

        <LoadingButton sx={{ mt: 3 }} type="submit" fullWidth size="large" loading={false} variant="contained">
          <span>Submit</span>
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}

export default FormAddEditCourse;
