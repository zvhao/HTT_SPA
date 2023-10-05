import AddIcon from '@mui/icons-material/Add';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Button, Card, CardActions, CardContent, CardMedia } from '@mui/material';
import MainCard from 'components/MainCard';
import { Path } from 'constant/path';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const columns = [
  { id: 'code', label: 'Code', minWidth: 50 },
  { id: 'name', label: 'Tên dịch vụ', minWidth: 100 },
  { id: 'price', label: 'Giá dịch vụ', minWidth: 100 },
  { id: 'duration', label: 'Thời gian', minWidth: 100 },
  // { id: 'group', label: 'Nhóm', minWidth: 100 },
  { id: 'commission', label: 'Hoa hồng', minWidth: 100 },
  {
    id: 'operation',
    label: 'Thao tác'
    // minWidth: 170,
    // format: (value) => value.toLocaleString('en-US')
  }
];

const Service = () => {
  const [data, setData] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);

  React.useEffect(() => {});

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
        Các dịch vụ
      </Typography>
      <CardActions sx={{ mb: 1 }}>
        <Button variant="contained" color="primary" startIcon={<AddIcon></AddIcon>} component={Link} to={Path.Service + `/add`}>
          Thêm dịch vụ
        </Button>
      </CardActions>

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
                    <TableCell align="center">{row.price}</TableCell>
                    <TableCell align="center">{row.duration}</TableCell>
                    <TableCell>
                      Dịch vụ: {row.technicianCommission} <br />
                      Tư vấn: {row.consultingCommission}
                    </TableCell>
                    <TableCell align="right">
                      <Button size="medium" variant="contained" component={Link} to={`${Path.Branch}/edit/${row._id}`}>
                        {/* <EditIcon /> */}
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
