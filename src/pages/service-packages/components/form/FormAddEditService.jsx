import { LoadingButton } from '@mui/lab';
import { InputAdornment, MenuItem, TextField } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import NumericFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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
        <TextField fullWidth margin="normal" id="title" name="title" label="Tiêu đề" multiline maxRows={4} variant="standard" />
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
        <TextField
          fullWidth
          margin="normal"
          id="duration"
          name="duration"
          label="Thời gian"
          variant="standard"
          InputProps={{
            endAdornment: <InputAdornment position="start">Phút</InputAdornment>,
            inputMode: 'numeric',
            pattern: '[0-9]*'
          }}
        />
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
        <TextField fullWidth margin="normal" id="combo" name="combo" select label="Combo" defaultValue="EUR" variant="standard">
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField fullWidth margin="normal" id="course" name="course" select label="Liệu trình" defaultValue="EUR" variant="standard">
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <CKEditor
          editor={ClassicEditor}
          data=""
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            console.log('Focus.', editor);
          }}
        />

        <LoadingButton sx={{ mt: 3 }} type="submit" fullWidth size="large" loading={false} variant="contained">
          <span>Submit</span>
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}

export default FormAddEditService;
