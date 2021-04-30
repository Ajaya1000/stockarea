import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Toolbar,
    Typography,
    Input,
    InputAdornment,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import SearchSharpIcon from '@material-ui/icons/SearchSharp';
import { useHistory } from 'react-router-dom';
import { HEADER } from '../assets/info';

const useStyle = makeStyles(() => ({
    paper: {
        margin: '0.2% 0.4%',
    },
    title: {
        flex: '1 1 100%',
    },
}));

const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
};

const getComparator = (order, orderBy) =>
    order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);

const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
};

const List = () => {
    const data = useSelector((state) => state.items);
    const classes = useStyle();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('city');
    const [keyword, setKeyword] = useState('');
    const history = useHistory();

    const requestSortBy = (item) => {
        const isAsc = orderBy === item && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(item);
    };

    return (
        <Paper className={classes.paper}>
            <Toolbar>
                <Typography
                    className={classes.title}
                    variant='h6'
                    component='div'
                >
                    Warehouses
                </Typography>
                <Input
                    value={keyword}
                    onChange={(event) => setKeyword(event.target.value)}
                    placeholder='city or name'
                    endAdornment={
                        <InputAdornment position='end'>
                            <IconButton aria-label='search'>
                                <SearchSharpIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </Toolbar>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {HEADER.map((item) => (
                                <TableCell key={item}>
                                    <TableSortLabel
                                        active={item === orderBy}
                                        direction={order}
                                        onClick={() => requestSortBy(item)}
                                    >
                                        {item}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stableSort(
                            data.filter(
                                (item) =>
                                    item.city
                                        .toLowerCase()
                                        .search(keyword.toLowerCase()) >= 0 ||
                                    item.name
                                        .toLowerCase()
                                        .search(keyword.toLowerCase()) >= 0
                            ),
                            getComparator(order, orderBy)
                        ).map((item) => (
                            <TableRow
                                hover
                                key={item.id}
                                onClick={() =>
                                    history.push(`/detail/${item.id}`, item)
                                }
                            >
                                {HEADER.map((key) => (
                                    <TableCell key={item.id + key}>
                                        {item[key].toString()}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};
export default List;
