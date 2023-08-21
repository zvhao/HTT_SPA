import {
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
  styled
} from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import * as yup from 'yup';
// import "./App.css";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Path } from 'constant/path';
// import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

export const validationSchema = yup.object({
});

function FormAddEditServiceType({ initialValues, onSubmit }) {
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

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="none" noValidate onSubmit={handleSubmit}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
          <Grid item xs={6}>
            <CssTextField
              fullWidth
              margin="dense"
              id="typename"
              name="typename"
              label="Tên loại dịch vụ"
              variant="outlined"

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
          <Grid item xs={6}>
            <CssTextField
              fullWidth
              margin="dense"
              id="desc"
              name="desc"
              label="Mô tả"
              variant="outlined"
              multiline

            />
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
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
        <LoadingButton sx={{ mt: 3 }} type="submit" fullWidth margin="dense" size="large" loading={false} variant="contained">
          <span>Gửi</span>
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}

export default FormAddEditServiceType;
