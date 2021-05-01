import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    Tooltip,
    Fab,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    MenuItem,
    DialogActions,
    Button,
    Snackbar,
    Menu,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/styles';
import SearchSharpIcon from '@material-ui/icons/SearchSharp';
import NearMeIcon from '@material-ui/icons/NearMe';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useHistory } from 'react-router-dom';

import { HEADER, TYPE } from '../assets/info';
import Actions from '../modules/action';

const useStyle = makeStyles((theme) => ({
    paper: {
        margin: '0.2% 0.4%',
    },
    title: {
        flex: '1 1 100%',
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(3),
        right: theme.spacing(4),
    },
}));

const useModalStyle = makeStyles(() => ({
    label: {
        marginRight: '20px',
    },
    inputGroup: {
        marginBottom: '5px',
    },
    alert: {
        marginBottom: '10px',
    },
    warn: {
        color: '#ce6866',
    },
    noWarn: {
        color: '#428342',
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

const EnhancedRow = ({ item }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    return (
        <TableRow hover key={item.id}>
            {HEADER.map((key) => (
                <TableCell key={item.id + key}>
                    {item[key].toString()}
                </TableCell>
            ))}
            <TableCell>
                <Tooltip title='Delete'>
                    <IconButton
                        onClick={() => dispatch(Actions.deleteItem(item))}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title='Detail'>
                    <IconButton
                        onClick={() => history.push(`/detail/${item.id}`, item)}
                    >
                        <NearMeIcon />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    );
};

const AddModal = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [id, setId] = useState('');
    const [city, setCity] = useState('');
    const [spaceAvailble, setSpaceAvailble] = useState(0);
    const [type, setType] = useState(0);
    const [cluster, setcluster] = useState('');
    const [isRegistered, setRegistered] = useState(false);
    const [isLive, setLive] = useState(false);

    const classes = useModalStyle();

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const giveItem = () => ({
        city,
        name: `Warehouse-${name}`,
        cluster: `cluster-${cluster}`,
        is_live: isLive,
        is_registered: isRegistered,
        space_available: spaceAvailble,
        type: TYPE[type],
        code: `W-${code}`,
    });

    const discardChanges = () => {
        setName('');
        setCode('');
        setCity('');
        setcluster('');
        setSpaceAvailble('');
        setRegistered(false);
        setLive(false);
        setType(0);
    };

    return (
        <Dialog open={open} onClose={() => onClose()} keepMounted>
            <DialogTitle> Add Item</DialogTitle>
            <DialogContent>
                <div id='inputGroup0' className={classes.inputGroup}>
                    <Typography
                        component='span'
                        variant='h5'
                        className={classes.label}
                    >
                        Name :
                    </Typography>
                    <TextField
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    Warehouse-
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div id='inputGroup1' className={classes.inputGroup}>
                    <Typography
                        component='span'
                        variant='h5'
                        className={classes.label}
                    >
                        Code :
                    </Typography>
                    <TextField
                        value={code}
                        type='number'
                        onChange={(event) => {
                            setCode(event.target.value);
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    W -
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div id='inputGroup3' className={classes.inputGroup}>
                    <Typography
                        component='span'
                        variant='h5'
                        className={classes.label}
                    >
                        City :
                    </Typography>

                    <TextField
                        value={city}
                        onChange={(event) => {
                            setCity(event.target.value);
                        }}
                    />
                </div>
                <div id='inputGroup4' className={classes.inputGroup}>
                    <Typography
                        component='span'
                        variant='h5'
                        className={classes.label}
                    >
                        Space Available :
                    </Typography>

                    <TextField
                        type='number'
                        value={spaceAvailble}
                        onChange={(event) => {
                            setSpaceAvailble(event.target.value);
                        }}
                    />
                </div>
                <div id='inputGroup5' className={classes.inputGroup}>
                    <Typography
                        component='span'
                        variant='h5'
                        className={classes.label}
                    >
                        Type :
                    </Typography>

                    <TextField
                        value={type}
                        select
                        onChange={(event) => {
                            setType(event.target.value);
                        }}
                    >
                        {TYPE.map((item, index) => (
                            <MenuItem key={item} value={index}>
                                {item}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div id='inputGroup6' className={classes.inputGroup}>
                    <Typography
                        component='span'
                        variant='h5'
                        className={classes.label}
                    >
                        Cluster Name :
                    </Typography>
                    <TextField
                        value={cluster}
                        onChange={(event) => {
                            setcluster(event.target.value);
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    cluster-
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div id='inputGroup7' className={classes.inputGroup}>
                    <Typography
                        component='span'
                        variant='h5'
                        className={classes.label}
                    >
                        Registered :
                    </Typography>

                    <TextField
                        value={isRegistered}
                        select
                        onChange={(event) => {
                            setRegistered(event.target.value);
                        }}
                    >
                        <MenuItem key='registration-key-0' value={false}>
                            No
                        </MenuItem>
                        <MenuItem key='registration-key-1' value>
                            Yes
                        </MenuItem>
                    </TextField>
                </div>
                <div id='inputGroup8' className={classes.inputGroup}>
                    <Typography
                        component='span'
                        variant='h5'
                        className={classes.label}
                    >
                        Live :
                    </Typography>

                    <TextField
                        value={isLive}
                        select
                        onChange={(event) => {
                            setLive(event.target.value);
                        }}
                    >
                        <MenuItem key='live-key-0' value={false}>
                            No
                        </MenuItem>
                        <MenuItem key='live-key-1' value>
                            Yes
                        </MenuItem>
                    </TextField>
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                    size='medium'
                    color='primary'
                    onClick={() => {
                        const newItem = giveItem();
                        dispatch(Actions.createItem(newItem));
                        discardChanges();
                        setSuccess(true);
                    }}
                >
                    <Typography>Add</Typography>
                </Button>
                <Button
                    size='medium'
                    color='secondary'
                    autoFocus
                    onClick={() => {
                        onClose();
                    }}
                >
                    <Typography>Cancle</Typography>
                </Button>
                <Snackbar
                    open={success}
                    autoHideDuration={6000}
                    onClose={() => setSuccess(false)}
                >
                    <MuiAlert elevation={6} variant='filled' severity='success'>
                        Item added succesfully
                    </MuiAlert>
                </Snackbar>
            </DialogActions>
        </Dialog>
    );
};

// const FIlterMenuItem = (props) =>{

//     return
// }

const List = () => {
    const data = useSelector((state) => state.items);
    const classes = useStyle();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('city');
    const [keyword, setKeyword] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const [live, setLive] = useState('all');
    const [registered, setRegistered] = useState('all');

    const category = [
        { label: 'Live', values: ['yes', 'no', 'all'] },
        { label: 'Registred', values: ['yes', 'no', 'all'] },
    ];

    const requestSortBy = (item) => {
        const isAsc = orderBy === item && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(item);
    };

    /**
     * Give list of data w.r.t to the search string
     * @returns {[data]}
     */
    const filteredData = () =>
        data.filter(
            (item) =>
                (item.city.toLowerCase().search(keyword.toLowerCase()) >= 0 ||
                    item.name.toLowerCase().search(keyword.toLowerCase()) >=
                        0) &&
                (registered === 'all' ||
                    (item.is_registered
                        ? registered === 'yes'
                        : registered === 'no')) &&
                (live === 'all' ||
                    (item.is_live ? live === 'yes' : live === 'no'))
        );

    const handlClose = () => {
        setModalOpen(false);
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
                <Tooltip title='Filter list'>
                    <IconButton
                        aria-label='filter list'
                        onClick={(event) => setAnchorEl(event.currentTarget)}
                    >
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                >
                    <MenuItem>
                        <FormControl component='fieldset'>
                            <FormLabel component='legend'>Live</FormLabel>
                            <RadioGroup
                                name='live'
                                value={live}
                                onChange={(event) =>
                                    setLive(event.target.value)
                                }
                            >
                                <FormControlLabel
                                    value='all'
                                    control={<Radio />}
                                    label='All'
                                />
                                <FormControlLabel
                                    value='yes'
                                    control={<Radio />}
                                    label='Yes'
                                />
                                <FormControlLabel
                                    value='no'
                                    control={<Radio />}
                                    label='No'
                                />
                            </RadioGroup>
                        </FormControl>
                    </MenuItem>
                    <MenuItem>
                        <FormControl component='fieldset'>
                            <FormLabel component='legend'>Registered</FormLabel>
                            <RadioGroup
                                name='registred'
                                value={registered}
                                onChange={(event) =>
                                    setRegistered(event.target.value)
                                }
                            >
                                <FormControlLabel
                                    value='all'
                                    control={<Radio />}
                                    label='All'
                                />
                                <FormControlLabel
                                    value='yes'
                                    control={<Radio />}
                                    label='Yes'
                                />
                                <FormControlLabel
                                    value='no'
                                    control={<Radio />}
                                    label='No'
                                />
                            </RadioGroup>
                        </FormControl>
                    </MenuItem>
                </Menu>
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
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stableSort(
                            filteredData(),
                            getComparator(order, orderBy)
                        ).map((item) => (
                            <EnhancedRow item={item} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Tooltip title='Add to the list'>
                <Fab
                    color='secondary'
                    className={classes.fab}
                    onClick={() => setModalOpen(true)}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
            <AddModal open={isModalOpen} onClose={handlClose} />
        </Paper>
    );
};
export default List;
