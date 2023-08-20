import { LoadingButton } from '@mui/lab';
import {
  Button,
  CardActions,
  Grid,
  InputAdornment,
  MenuItem,
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
import { Form, FormikProvider, useFormik } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import NumericFormat from 'react-number-format';
import * as yup from 'yup';
import 'react-quill/dist/quill.snow.css';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
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

function FormAddEditCombo({ initialValues, onSubmit }) {
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

  const CssTextField = styled(TextField)({ '& > div > input': { lineHeight: 2 }, '& > label': { lineHeight: 'normal' } });

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="none" noValidate onSubmit={handleSubmit}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }} mb={1}>
          <Grid item xs={6}>
            <CssTextField fullWidth margin="normal" id="comboname" name="comboname" label="Tên Combo" variant="outlined" />
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
          <Grid item xs={3}>
            <CssTextField
              fullWidth
              margin="normal"
              id="duration"
              name="duration"
              label="Thời gian"
              variant="outlined"
              InputProps={{
                endAdornment: <InputAdornment position="start">Phút</InputAdornment>
              }}
            />
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
          <Grid item xs={6}>
            <CardActions sx={{ justifyContent: 'end' }}>
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
        </Grid>

        <Typography variant="h5">Gồm các dịch vụ:</Typography>
        <TableContainer sx={{ marginBottom: '20px' }} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell align="center">Tên dịch vụ</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>1</TableCell>
                <TableCell>
                  <CssTextField fullWidth id="servicename" name="servicename" label="Tên dịch vụ" variant="outlined" />
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
              <TableCell colSpan={3}>
                <Button fullWidth size="large" variant="outlined" color="primary" startIcon={<AddIcon />}></Button>
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>

        <Typography variant="h5">Gồm các bước:</Typography>
        <TableContainer sx={{ marginBottom: '20px' }} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Bước</TableCell>
                <TableCell align="center">Tên bước</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>1</TableCell>
                <TableCell>
                  <CssTextField fullWidth id="stepname" name="stepname" label="Tên bước" variant="outlined" />
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
              <TableCell colSpan={3}>
                <Button fullWidth size="large" variant="outlined" color="primary" startIcon={<AddIcon />}></Button>
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>

        <LoadingButton sx={{ mt: 3 }} type="submit" fullWidth size="large" loading={false} variant="contained">
          <span>Submit</span>
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}

export default FormAddEditCombo;
