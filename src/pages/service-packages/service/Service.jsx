import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
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
  TablePagination,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { serviceApi } from 'api';
import MainCard from 'components/MainCard';
import { Path } from 'constant/path';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import formatCurrency from 'utils/formatCurrency';

const columns = [
  { id: 'code', label: 'Code', minWidth: 50 },
  { id: 'name', label: 'Tên dịch vụ', minWidth: 100 },
  { id: 'price', label: 'Giá dịch vụ', minWidth: 100 },
  { id: 'duration', label: 'Thời gian', minWidth: 100 },
  { id: 'commission', label: 'Hoa hồng', minWidth: 100 },
  {
    id: 'operation',
    label: 'Thao tác'
    // minWidth: 170,
    // format: (value) => value.toLocaleString('en-US')
  }
];

const Service = () => {
  const navigation = useNavigate();

  const [data, setData] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);

    // console.log(searchTerm);
  };

  React.useEffect(() => {
    const getData = async () => {
      try {
        const result = await serviceApi.fetchData();
        if (result && result?.metadata) {
          const allServices = result.metadata;

          setData(allServices);
          // console.log('result: ', allServices);
        }
        if (result?.response?.data?.code && result.response.data.code === 403) {
          // console.log('result: ', result.response.data.code);
          navigation(Path.FORBIDDEN, { replace: true });
        }
      } catch (error) {
        if (error?.response?.data?.code && error.response.data.code === 403) {
          // console.log('error: ', error.response.data.code);
          navigation(Path.FORBIDDEN, { replace: true });
        }
      }
    };
    getData();
    const resultsFilter = data.filter((item) => {
      const priceMatch = item.price === parseInt(searchTerm);
      const durationMatch = item.duration === parseInt(searchTerm);
      return (
        item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        priceMatch ||
        durationMatch
      );
    });
    // console.log(resultsFilter);
    setSearchResults(resultsFilter);
  }, [searchTerm, data, navigation]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <MainCard>
      <Grid container sx={{ alignItems: 'center', width: '100%' }}>
        <Grid item xs={3}>
          <Typography sx={{ mb: 1 }} variant="h4">
            Các dịch vụ
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <TextField sx={{ width: '100%' }} label="Tìm kiếm" value={searchTerm} onChange={handleSearch} />
        </Grid>
        <Grid item xs={3}>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" startIcon={<AddIcon></AddIcon>} component={Link} to={Path.Service + `/add`}>
              Thêm dịch vụ mới
            </Button>
          </CardActions>
        </Grid>
      </Grid>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={searchResults.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align="center" style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {searchResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                      {row.code}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="center">{formatCurrency(row.price)}</TableCell>
                    <TableCell align="center">{row.duration} phút</TableCell>
                    <TableCell>
                      Dịch vụ: {row.technicianCommission}% <br />
                      Tư vấn: {row.consultingCommission}%
                    </TableCell>

                    <TableCell align="center">
                      <Button size="medium" variant="contained" component={Link} to={`${Path.Service}/edit/${row._id}`}>
                        <EditIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={searchResults.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </MainCard>
  );
};

export default Service;
