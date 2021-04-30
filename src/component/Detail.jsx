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
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

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
}));

const CustomInputGroup = ({ label, value, onChange, isEditable }) => {};

const Detail = () => {
    const history = useHistory();
    const classes = useStyle();
    const [isEditable, setEditable] = useState(false);
    const dispatch = useDispatch();
    const [name, setName] = useState(history.location.state.name);
    const [code, setCode] = useState(history.location.state.code);
    const [id, setId] = useState(history.location.state.id);
    const [city, setCity] = useState(history.location.state.city);
    const [spaceAvailble, setSpaceAvailble] = useState(
        history.location.state.space_available
    );
    const [type, setType] = useState(
        TYPE.findIndex((item) => history.location.state.type === item)
    );
    const [cluster, setcluster] = useState(history.location.state.cluster);
    const [isRegistered, setRegistered] = useState(
        history.location.state.is_registered
    );
    const [isLive, setLive] = useState(history.location.state.is_live);

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
                        {/* {HEADER.map(
                            (key, index) => (
                                <CustomInputGroup key={key} label={key} isEditable={isEditable && EDITABLES.findIndex(key)>=0} on />
                            )
                        )} */}
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
                                    onChange={(event) =>
                                        setName(event.target.value)
                                    }
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
                                    onChange={(event) =>
                                        setCity(event.target.value)
                                    }
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
                                    onChange={(event) =>
                                        setSpaceAvailble(event.target.value)
                                    }
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
                                    onChange={(event) =>
                                        setType(event.target.value)
                                    }
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
                                    onChange={(event) =>
                                        setRegistered(event.target.value)
                                    }
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
                                    onChange={(event) =>
                                        setLive(event.target.value)
                                    }
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
                        <Button
                            style={{ marginLeft: 'auto' }}
                            size='medium'
                            color='primary'
                            variant='contained'
                            onClick={() => {
                                dispatch(
                                    Actions.createItem(history.location.state)
                                );
                                setEditable(true);
                            }}
                        >
                            <Typography>Edit</Typography>
                        </Button>
                    </CardActions>
                </Card>
            </Container>
        </>
    );
};
export default Detail;
