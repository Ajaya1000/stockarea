import React from 'react';
import {
    AppBar,
    Card,
    CardContent,
    Container,
    IconButton,
    makeStyles,
    Toolbar,
    Typography,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';
import {} from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
    container: {
        marginTop: theme.mixins.toolbar.minHeight + 30,
    },
}));

const Detail = () => {
    const history = useHistory();
    const classes = useStyle();

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
                        {Object.keys(history.location.state).map((key) => (
                            <div>
                                <Typography
                                    key={key}
                                    variant='h4'
                                    component='span'
                                >
                                    {key} :
                                </Typography>
                                <Typography
                                    key={key}
                                    variant='h5'
                                    component='span'
                                >
                                    {history.location.state[key].toString()}
                                </Typography>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </Container>
        </>
    );
};
export default Detail;
