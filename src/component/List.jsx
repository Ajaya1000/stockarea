import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const HEADER = [
    'city',
    'cluster',
    'code',
    'id',
    'is_live',
    'is_registered',
    'name',
    'space_available',
    'type',
];

const useStyle = makeStyles((theme) => ({
    paper: {
        margin: '10px 20px',
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

    const requestSortBy = (item) => {
        const isAsc = orderBy === item && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(item);
    };

    return (
        <Paper className={classes.paper}>
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
                        {stableSort(data, getComparator(order, orderBy)).map(
                            (item) => (
                                <TableRow key={item.id}>
                                    {HEADER.map((key) => (
                                        <TableCell key={item.id + key}>
                                            {item[key].toString()}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};
export default List;
