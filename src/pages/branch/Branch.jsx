import AddIcon from '@mui/icons-material/Add';
import { Button, CardActions, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import { Path } from 'constant/path';
import { Link } from 'react-router-dom';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { branchApi } from '../../api';
import EditIcon from '@mui/icons-material/Edit';

const columns = [
  { id: 'code', label: 'Code', minWidth: 50 },
  { id: 'name', label: 'Tên chi nhánh', minWidth: 100 },
  { id: 'capacity', label: 'Sức chứa', minWidth: 100 },
  { id: 'manager', label: 'Quản lý', minWidth: 100 },
  { id: 'operatingTime', label: 'Thời gian hoạt động', minWidth: 100 },
  {
    id: 'address',
    label: 'Địa chỉ',
    // minWidth: 100,
    // format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'operation',
    label: 'Thao tác',
    // minWidth: 170,
    // format: (value) => value.toLocaleString('en-US')
  }
];
const Branch = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const result = await branchApi.fetchData();
        // console.log('result: ', result.metadata);
        setData(result.metadata);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <MainCard>
      <Typography sx={{ mb: 1 }} variant="h4">
        Các chi nhánh
      </Typography>
      <CardActions sx={{ mb: 1 }}>
        <Button variant="contained" color="primary" startIcon={<AddIcon></AddIcon>} component={Link} to={Path.Branch + `/add`}>
          Thêm chi nhánh mới
        </Button>
      </CardActions>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
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
                  <TableCell key={column.id} align='center' style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    <TableCell align='center' sx={{ fontWeight: 'bold' }}>{row.code}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align='center'>{row.capacity}</TableCell>
                    <TableCell>{row.manager}
                    </TableCell>
                    <TableCell align='center'>
                      {row.startTime} - {row.endTime}
                    </TableCell>
                    <TableCell>{row.address}</TableCell>
                    <TableCell align='right'>
                      <Button size="medium" variant="contained" component={Link} to={`${Path.Branch}/edit/${row._id}`}>
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
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </MainCard>
  );
};

export default Branch;
