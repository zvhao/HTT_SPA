import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  CardActions,
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
  Typography
} from '@mui/material';
import { branchApi, staffApi } from 'api';
import MainCard from 'components/MainCard';
import { Path } from 'constant/path';
import React from 'react';
import { Link } from 'react-router-dom';

const columns = [
  { id: 'username', label: 'Username', minWidth: 100 },
  { id: 'position', label: 'Vị trí', minWidth: 100 },
  { id: 'name', label: 'Tên chi nhánh', minWidth: 100 },
  { id: 'infomation', label: 'Thông tin', minWidth: 100 },
  {
    id: 'operation',
    label: 'Thao tác'
    // minWidth: 170,
    // format: (value) => value.toLocaleString('en-US')
  }
];

const Staff = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const result = await staffApi.fetchData();
        const allStaff = result.metadata;
        // console.log(allStaff);
        const newData = await Promise.all(
          allStaff.map(async (item) => {
            console.log(item.branch);
            // const detail = await branchApi.getById(item.branch);
            // return { ...item, branch: detail.metadata };
          })
        );

        // console.log(newData);

        // setData(newData);
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
        Các nhân viên
      </Typography>
      <CardActions sx={{ mb: 1 }}>
        <Button variant="contained" color="primary" startIcon={<AddIcon></AddIcon>} component={Link} to={Path.Staff + `/add`}>
          Thêm nhân viên
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
                  <TableCell key={column.id} align="center" style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                      {row.username}
                    </TableCell>
                    <TableCell align="center">{row.position}</TableCell>
                    <TableCell align="center">{row.branch.name}</TableCell>
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

export default Staff;
