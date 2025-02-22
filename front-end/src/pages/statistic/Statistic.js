import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TableSortLabel, TablePagination, Paper, Box, Typography } from '@mui/material';
import axios from 'axios';

function descendingComparator(a, b, orderBy) {

  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;

    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  { id: 'id', label: 'ID' },
  { id: 'temperature', label: 'Temperature' },
  { id: 'humidity', label: 'Humidity' },
  { id: 'datetime', label: 'Datetime' },
  { id: 'account', label: 'Account' },
];

function EnhancedTableHead({ order, orderBy, onRequestSort }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align="left">
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function StatisticTable() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost/IOTWEB/nckh-2024/back-end/Statistic/get_Statistic.php');
        setRows(res.data.phpresult || res.data); // Đồng bộ dữ liệu
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = rows
    .slice()
    .sort(getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Typography variant="h6" component="div" sx={{ padding: 2 }} align="center">
          Bảng thống kê cảm biến
        </Typography>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
            <TableBody>
              {visibleRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.tempurature}</TableCell>
                  <TableCell>{row.humidfity}</TableCell>
                  <TableCell>{row.date_time}</TableCell>
                  <TableCell>{row.account}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
    { id: 'id', disablePadding: true, label: 'ID' },
    { id: 'temperature', disablePadding: false, label: 'Temperature' },
    { id: 'humidity', disablePadding: false, label: 'Humidity' },
    { id: 'datetime', disablePadding: false, label: 'Datetime' },
    { id: 'account', disablePadding: false, label: 'Account' },
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align="left"
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    onRequestSort: PropTypes.func.isRequired,
};

function EnhancedTable() {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:3301/statistic');
                setRows(res.data); // Gán dữ liệu từ API vào `rows`
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };
        fetchData();
    }, []);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = rows
        .slice()
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Box sx={{ width: '100%' }}>

            <Paper sx={{ width: '100%', mb: 2 }}>
                <Typography variant="h6" component="div" sx={{ padding: 2 }} align="center">
                    Bảng thống kê
                </Typography>
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.temperature}</TableCell>
                                    <TableCell>{row.humidity}</TableCell>
                                    <TableCell>{row.datetime}</TableCell>
                                    <TableCell>{row.account}</TableCell>
                                </TableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );

}

export default StatisticTable;
