import { LoadingButton } from '@mui/lab';
import { Grid, InputAdornment, MenuItem, TextField } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import NumericFormat from 'react-number-format';
import ReactQuill from 'react-quill';
import * as yup from 'yup';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import EditorToolbar, { formats, modules } from '../../../../components/quill-editor/Toolbar';
// import "./App.css";
import 'react-quill/dist/quill.snow.css';

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

function FormAddEditService({ initialValues, onSubmit }) {
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
  // const [values, setValues] = React.useState({
  //   numberformat: '1320'
  // });
  // const handleChange = (event) => {
  //   setValues({
  //     ...values,
  //     [event.target.name]: event.target.value
  //   });
  // };
  const [state, setState] = useState({ value: '<h1>Hello</h1>' });
  const handleChange = (content) => {
    setState({ value: content });
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="none" noValidate onSubmit={handleSubmit}>
        {/* <TextField
          fullWidth
          id="email"
          name="email"
          label="email"
          {...getFieldProps('email')}
          // margin="normal"
          sx={{ '& > div': { lineHeight: 3 }, '& > label': { lineHeight: 1.5 } }}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />

        <TextField
          fullWidth
          id="password"
          name="password"
          label="Mật khẩu"
          margin="normal"
          sx={{ '& > div': { lineHeight: 3.2 }, '& > label': { lineHeight: 1.5 } }}
          {...getFieldProps('password')}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
        /> */}
        
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              margin="normal"
              id="service-name"
              name="service-name"
              label="Tên dịch vụ"
              multiline
              maxRows={4}
              variant="standard"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
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
              variant="standard"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              margin="normal"
              id="duration"
              name="duration"
              label="Thời gian"
              variant="standard"
              InputProps={{
                endAdornment: <InputAdornment position="start">Phút</InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              margin="normal"
              id="service-type"
              name="service-type"
              select
              label="Loại dịch vụ"
              defaultValue="EUR"
              variant="standard"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField fullWidth margin="normal" id="combo" name="combo" select label="Combo" defaultValue="EUR" variant="standard">
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField fullWidth margin="normal" id="course" name="course" select label="Liệu trình" defaultValue="EUR" variant="standard">
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              margin="normal"
              id="technician-commission"
              name="technician-commission"
              label="Hoa hồng Kỹ thuật viên"
              type='number'
              variant="standard"
              InputProps={{
                endAdornment: <InputAdornment position="start">%</InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              margin="normal"
              id="consulting-commission"
              name="consulting-commission"
              label="Hoa hồng tư vấn"
              type='number'
              variant="standard"
              InputProps={{
                endAdornment: <InputAdornment position="start">%</InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>

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

        <LoadingButton sx={{ mt: 3 }} type="submit" fullWidth size="large" loading={false} variant="contained">
          <span>Submit</span>
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}

export default FormAddEditService;
