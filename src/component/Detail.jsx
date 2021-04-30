import React, { useState } from 'react';
import {
    AppBar,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    IconButton,
    makeStyles,
    MenuItem,
    TextField,
    Toolbar,
    Typography,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Actions from '../modules/action';
import { HEADER, TYPE, EDITABLES } from '../assets/info';

const useStyle = makeStyles((theme) => ({
    container: {
        marginTop: theme.mixins.toolbar.minHeight + 30,
    },
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

const Detail = () => {
    const history = useHistory();
    const params = useParams();
    const data = useSelector(
        (state) =>
            state.items.filter((item) => item.id.toString() === params.id)[0]
    );
    const classes = useStyle();
    const [isEditable, setEditable] = useState(false);
    const dispatch = useDispatch();
    const [name, setName] = useState(data.name);
    const [code, setCode] = useState(data.code);
    const [id, setId] = useState(data.id);
    const [city, setCity] = useState(data.city);
    const [spaceAvailble, setSpaceAvailble] = useState(data.space_available);
    const [type, setType] = useState(
        TYPE.findIndex((item) => data.type === item)
    );
    const [cluster, setcluster] = useState(data.cluster);
    const [isRegistered, setRegistered] = useState(data.is_registered);
    const [isLive, setLive] = useState(data.is_live);
    const [newChange, setNewChange] = useState(false);

    /**
     * This uitlity function is used to create new item from
     * the edits
     *
     * @returns [object]
     */
    const giveItem = () => ({
        city,
        name,
        cluster,
        id,
        is_live: isLive,
        is_registered: isRegistered,
        space_available: spaceAvailble,
        type: TYPE[type],
        code,
    });

    const discardChanges = () => {
        setName(data.name);
        setCode(data.code);
        setCity(data.city);
        setcluster(data.cluster);
        setSpaceAvailble(data.space_available);
        setRegistered(data.is_registered);
        setLive(data.is_live);
        setType(TYPE.findIndex((item) => data.type === item));
    };
    return (
        <>
            <AppBar color='transparent'>
                <Toolbar>
                    <IconButton edge='start' onClick={() => history.goBack()}>
                        <ArrowBackIcon fontSize='large' />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Container maxWidth='sm' className={classes.container}>
                <Card variant='elevation'>
                    <CardContent>
                        {isEditable && newChange && (
                            <div className={classes.alert}>
                                <Typography className={classes.warn}>
                                    *There are changes to save
                                </Typography>
                            </div>
                        )}
                        {isEditable && !newChange && (
                            <div className={classes.alert}>
                                <Typography className={classes.noWarn}>
                                    *There is no change to save
                                </Typography>
                            </div>
                        )}
                        <div id='inputGroup0' className={classes.inputGroup}>
                            <Typography
                                component='span'
                                variant='h5'
                                className={classes.label}
                            >
                                Name :
                            </Typography>
                            {isEditable ? (
                                <TextField
                                    value={name}
                                    onChange={(event) => {
                                        setName(event.target.value);
                                        setNewChange(true);
                                    }}
                                />
                            ) : (
                                <Typography component='span' variant='h6'>
                                    {name}
                                </Typography>
                            )}
                        </div>
                        <div id='inputGroup1' className={classes.inputGroup}>
                            <Typography
                                component='span'
                                variant='h5'
                                className={classes.label}
                            >
                                Code :
                            </Typography>
                            <Typography component='span' variant='h6'>
                                {code}
                            </Typography>
                        </div>
                        <div id='inputGroup2' className={classes.inputGroup}>
                            <Typography
                                component='span'
                                variant='h5'
                                className={classes.label}
                            >
                                ID :
                            </Typography>
                            <Typography component='span' variant='h6'>
                                {id}
                            </Typography>
                        </div>
                        <div id='inputGroup3' className={classes.inputGroup}>
                            <Typography
                                component='span'
                                variant='h5'
                                className={classes.label}
                            >
                                City :
                            </Typography>
                            {isEditable ? (
                                <TextField
                                    value={city}
                                    onChange={(event) => {
                                        setCity(event.target.value);
                                        setNewChange(true);
                                    }}
                                />
                            ) : (
                                <Typography component='span' variant='h6'>
                                    {city}
                                </Typography>
                            )}
                        </div>
                        <div id='inputGroup4' className={classes.inputGroup}>
                            <Typography
                                component='span'
                                variant='h5'
                                className={classes.label}
                            >
                                Space Available :
                            </Typography>
                            {isEditable ? (
                                <TextField
                                    value={spaceAvailble}
                                    onChange={(event) => {
                                        setSpaceAvailble(event.target.value);
                                        setNewChange(true);
                                    }}
                                />
                            ) : (
                                <Typography component='span' variant='h6'>
                                    {spaceAvailble}
                                </Typography>
                            )}
                        </div>
                        <div id='inputGroup5' className={classes.inputGroup}>
                            <Typography
                                component='span'
                                variant='h5'
                                className={classes.label}
                            >
                                Type :
                            </Typography>
                            {isEditable ? (
                                <TextField
                                    value={type}
                                    select
                                    onChange={(event) => {
                                        setType(event.target.value);
                                        setNewChange(true);
                                    }}
                                >
                                    {TYPE.map((item, index) => (
                                        <MenuItem key={item} value={index}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            ) : (
                                <Typography component='span' variant='h6'>
                                    {TYPE[type]}
                                </Typography>
                            )}
                        </div>
                        <div id='inputGroup6' className={classes.inputGroup}>
                            <Typography
                                component='span'
                                variant='h5'
                                className={classes.label}
                            >
                                Cluster Name :
                            </Typography>
                            <Typography component='span' variant='h6'>
                                {cluster}
                            </Typography>
                        </div>
                        <div id='inputGroup7' className={classes.inputGroup}>
                            <Typography
                                component='span'
                                variant='h5'
                                className={classes.label}
                            >
                                Registered :
                            </Typography>
                            {isEditable ? (
                                <TextField
                                    value={isRegistered}
                                    select
                                    onChange={(event) => {
                                        setRegistered(event.target.value);
                                        setNewChange(true);
                                    }}
                                >
                                    <MenuItem
                                        key='registration-key-0'
                                        value={false}
                                    >
                                        No
                                    </MenuItem>
                                    <MenuItem key='registration-key-1' value>
                                        Yes
                                    </MenuItem>
                                </TextField>
                            ) : (
                                <Typography component='span' variant='h6'>
                                    {isRegistered ? 'Yes' : 'No'}
                                </Typography>
                            )}
                        </div>
                        <div id='inputGroup8' className={classes.inputGroup}>
                            <Typography
                                component='span'
                                variant='h5'
                                className={classes.label}
                            >
                                Live :
                            </Typography>
                            {isEditable ? (
                                <TextField
                                    value={isLive}
                                    select
                                    onChange={(event) => {
                                        setLive(event.target.value);
                                        setNewChange(true);
                                    }}
                                >
                                    <MenuItem key='live-key-0' value={false}>
                                        No
                                    </MenuItem>
                                    <MenuItem key='live-key-1' value>
                                        Yes
                                    </MenuItem>
                                </TextField>
                            ) : (
                                <Typography component='span' variant='h6'>
                                    {isLive ? 'Yes' : 'No'}
                                </Typography>
                            )}
                        </div>
                    </CardContent>
                    <CardActions>
                        {isEditable ? (
                            <>
                                <Button
                                    style={{ marginLeft: 'auto' }}
                                    size='medium'
                                    color='primary'
                                    variant='contained'
                                    onClick={() => {
                                        console.log('saved clicked', newChange);
                                        if (newChange) {
                                            const newItem = giveItem();
                                            dispatch(
                                                Actions.updateItem(newItem)
                                            );
                                            setNewChange(false);
                                        }
                                    }}
                                >
                                    <Typography>Save</Typography>
                                </Button>
                                <Button
                                    size='medium'
                                    color='secondary'
                                    variant='contained'
                                    onClick={() => {
                                        discardChanges();
                                        setEditable(false);
                                        setNewChange(false);
                                    }}
                                >
                                    <Typography>Cancle</Typography>
                                </Button>
                            </>
                        ) : (
                            <Button
                                style={{ marginLeft: 'auto' }}
                                size='medium'
                                color='primary'
                                variant='contained'
                                onClick={() => {
                                    setEditable(true);
                                }}
                            >
                                <Typography>Edit</Typography>
                            </Button>
                        )}
                    </CardActions>
                </Card>
            </Container>
        </>
    );
};
export default Detail;
