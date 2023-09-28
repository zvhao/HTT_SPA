import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  CardActions,
  Grid,
  List,
  ListItem,
  ListItemText,
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
import { branchApi, staffApi } from 'api';
import MainCard from 'components/MainCard';
import { Path } from 'constant/path';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Staff = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [role, setRole] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);

    // console.log(searchTerm);
  };

  React.useEffect(() => {
    const getData = async () => {
      try {
        const role = JSON.parse(localStorage.getItem('data')).role;
        setRole(role);
        // console.log(role);
        const result = await staffApi.fetchData();
        const allStaff = result.metadata;
        // console.log(JSON.stringify(allStaff,null, 4));
        if (role && role === 'staff') {
          const columns = [
            { id: 'username', label: 'Username', minWidth: 100 },
            { id: 'position', label: 'Vị trí', minWidth: 100 },
            { id: 'infomation', label: 'Thông tin', minWidth: 100 },
            {
              id: 'operation',
              label: 'Thao tác'
              // minWidth: 170,
              // format: (value) => value.toLocaleString('en-US')
            }
          ];
          setColumns(columns);
          setData(allStaff);
        }
        if (role && role === 'owner') {
          // console.log(allStaff);
          const columns = [
            { id: 'username', label: 'Username', minWidth: 100 },
            { id: 'position', label: 'Vị trí', minWidth: 100 },
            { id: 'branch', label: 'Chi nhánh', minWidth: 100 },
            { id: 'infomation', label: 'Thông tin', minWidth: 100 },
            {
              id: 'operation',
              label: 'Thao tác'
              // minWidth: 170,
              // format: (value) => value.toLocaleString('en-US')
            }
          ];
          const newData = await Promise.all(
            allStaff.map(async (item) => {
              const detail = await branchApi.getById(item.branch);
              return { ...item, branch: detail.metadata };
            })
          );
          setColumns(columns);
          setData(newData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getData();
    const results = data.filter(
      (item) =>
        item.fullname.toLowerCase().includes(searchTerm.toLowerCase()) || item.username.toLowerCase().includes(searchTerm.toLowerCase()) || item.position.toLowerCase().includes(searchTerm.toLowerCase()) || item.phone.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
    setSearchResults(results);
  }, [searchTerm, data]);

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
      <Grid container sx={{ alignItems: 'center', width: '100%' }}>
        <Grid item xs={3}>
          <Typography sx={{ mb: 1 }} variant="h4">
            Các nhân viên
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <TextField sx={{ width: '100%' }} label="Tìm kiếm" value={searchTerm} onChange={handleSearch} />
        </Grid>
        <Grid item xs={3}>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" startIcon={<AddIcon></AddIcon>} component={Link} to={Path.Staff + `/add`}>
              Thêm nhân viên
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
                      {row.username}
                    </TableCell>
                    <TableCell align="center">{row.position}</TableCell>
                    {role === 'owner' ? (
                      <TableCell align="center">
                        {row.branch.name} <br></br>
                        {row.branch.code}
                      </TableCell>
                    ) : (
                      ''
                    )}
                    <TableCell sx={{ p: 0 }}>
                      <List>
                        <ListItem sx={{ p: 0 }}>
                          <ListItemText>{row.email}</ListItemText>
                        </ListItem>
                        <ListItem sx={{ p: 0 }}>
                          <ListItemText>{row.phone}</ListItemText>
                        </ListItem>
                        <ListItem sx={{ p: 0 }}>
                          <ListItemText>{row.address}</ListItemText>
                        </ListItem>
                      </List>
                    </TableCell>
                    <TableCell align="right">
                      <Button size="medium" variant="contained" component={Link} to={`${Path.Staff}/edit/${row._id}`}>
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

export default Staff;
