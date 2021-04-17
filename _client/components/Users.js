import React from "react";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        listStyle: 'none',
        margin: 0,
    },
    innerWrapper: {
        marginLeft: 0,
        marginRight: 'auto',
        display: 'inherit',
        overflowX: "scroll",
        '&::after': {
            content: "",
            zIndex: "1",
            top: 0,
            right: 0,
            bottom: '15px',
            pointerEvents: 'none',
            backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0), red 85%)',
            width: '15%'
        }
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    activeIcon: {
        color: 'green'
    },
    inactiveIcon: {
        color: 'darkgray'
    }
}));

export default ({users}) => {

    const classes = useStyles();

    const userArray = Object.entries(users)
        .map(user => user[1])
        .sort((user1, user2) =>
            user1.userName === user2.userName ? 0 : ((user1.userName > user2.userName) ? 1 : -1)
        )
        .sort((user1, user2) =>
            user1.active === user2.active ? 0 : user1.active ? -1 : 1
        )

    return (
        <Paper elevation={0} component="ul" className={classes.root}>
            <div className={classes.innerWrapper}>
            {userArray.map((user, index) => {

                const icon = <FiberManualRecordIcon
                    className={user.active ? classes.activeIcon : classes.inactiveIcon}/>
                return (
                    <li key={index}>
                        <Chip
                            icon={icon}
                            label={user.userName}
                            className={classes.chip}
                            color={user.active ? 'green' : 'lightgray'}
                        />
                    </li>
                )
            })}
            </div>
        </Paper>
    )
}