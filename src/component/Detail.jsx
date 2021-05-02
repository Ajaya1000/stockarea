import React, { useState } from 'react';
import {
    AppBar,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    IconButton,
    InputAdornment,
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
import { TYPE } from '../assets/info';
import Item from './Item';

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

    const giveList = () => [
        {
            label: 'Name',
            value: name,
            type: 'text',
            // endorment: {
            //     startAdornment: (
            //         <InputAdornment position='start'>Warehouse-</InputAdornment>
            //     ),
            // },
            // menuItems:{

            // }
            onChange: (value) => {
                setName(value);
                setNewChange(true);
            },
            isEditable,
        },
        {
            label: 'Code',
            value: code,
            type: 'number',
            endorment: {
                startAdornment: (
                    <InputAdornment position='start'>W-</InputAdornment>
                ),
            },
            onChange: (value) => {
                setCode(value);
                setNewChange(true);
            },
            isEditable: false,
        },
        {
            label: 'ID',
            value: id,
            type: 'number',
            isEditable: false,
        },
        {
            label: 'City',
            value: city,
            type: 'text',
            onChange: (value) => {
                setCity(value);
                setNewChange(true);
            },
            isEditable,
        },
        {
            label: 'Space Available',
            value: spaceAvailble,
            type: 'number',
            onChange: (value) => {
                setSpaceAvailble(value);
                setNewChange(true);
            },
            isEditable,
        },
        {
            label: 'Type',
            value: type,
            type: 'menu',
            onChange: (value) => {
                setType(value);
                setNewChange(true);
            },
            isEditable,
            menuItems: [
                {
                    label: TYPE[0],
                    value: 0,
                },
                {
                    label: TYPE[1],
                    value: 1,
                },
            ],
        },
        {
            label: 'Cluster Name',
            value: cluster,
            // type: 'number',
            isEditable: false,
        },
        {
            label: 'Registered',
            value: isRegistered,
            type: 'menu',
            onChange: (value) => {
                setRegistered(value);
                setNewChange(true);
            },
            isEditable,
            menuItems: [
                {
                    label: 'Yes',
                    value: true,
                },
                {
                    label: 'No',
                    value: false,
                },
            ],
        },
        {
            label: 'Live',
            value: isLive,
            type: 'menu',
            onChange: (value) => {
                setLive(value);
                setNewChange(true);
            },
            isEditable,
            menuItems: [
                {
                    label: 'Yes',
                    value: true,
                },
                {
                    label: 'No',
                    value: false,
                },
            ],
        },
    ];

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
                        {giveList().map((item) => (
                            <div className={classes.inputGroup}>
                                <Item {...item} />
                            </div>
                        ))}
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
