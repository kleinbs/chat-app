import React, {useState, useEffect} from 'react'
import { Paper } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/icons/ChatBubbleOutline';
import {Avatar, Button, Grid, TextField, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(5),
        backgroundColor: theme.palette.primary.main
    },
    form: {
        width: '70%',
        marginTop: theme.spacing(3),
        paddingBottom: '5%',
        paddingTop: '5%',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    })
)

const Login = ({onUser}) => {

    const classes = useStyles();
    const [userName, setUserName] = useState()
    const [error, setError] = useState();

    const ERRORS = {
        NAME_TAKEN: 'The user name you selected is taken, please try a different one',
        UNKNOWN_ERROR: 'Something went wrong, please try again later'
    }

    useEffect(() => {
        // If we get to the login page, we delete any userID and userName cookies
        document.cookie = `userId=; samesite=strict; expires=Thu, 01 Jan 1970 00:00:01 GMT`
        document.cookie = `userName=; samesite=strict; expires=Thu, 01 Jan 1970 00:00:01 GMT`
    }, [])

    const onSubmit = (async (e) => {
        e.preventDefault();
        const result = await fetch(`api/createUser?value=${userName}`, {method: 'POST'});
        const parsedResult = await result.json();
        if(parsedResult.data){
            const { id, userName } = parsedResult.data.user;
            document.cookie = `userId=${id}; samesite=strict`
            document.cookie = `userName=${userName}; samesite=strict`
            onUser(parsedResult.data.user)
        } else {
            setError(parsedResult.error ? parsedResult.error : {CODE: 'UNKNOWN_ERROR'})
        }
    })

    return (
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <Icon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Start Chatting
            </Typography>
            <form className={classes.form} noValidate onSubmit={onSubmit}>
                <Grid container spacing={2}>
                    <TextField
                        name="userName"
                        variant="standard"
                        required
                        fullWidth
                        id="userName"
                        label="User Name"
                        error={!!error}
                        helperText={error && ERRORS[error.CODE ? error?.CODE : 'UNKNOWN_ERROR']}
                        autoFocus
                        onChange={(e) => {setUserName(e.target.value)}}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                </Grid>
            </form>
        </Paper>
    )
}

export default Login