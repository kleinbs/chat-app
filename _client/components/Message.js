import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
        message: {
            margin: "10px",
            padding: "5px 20px",
            backgroundColor: "lightgray",
            borderRadius: "10px",
        },
        myMessage: {
            margin: "10px",
            padding: "20px",
            backgroundColor: "lightblue",
            borderRadius: "10px",
        },
        text: {
            display: "block"
        },
        from: {
            display: "block",
        },
        gutter: {
            minWidth: "100%"
        },
        postedOn: {
            float: "right"
        }
    }
));

export default ({ message, useName, postedOn, myMessage }) => {

    const classes = useStyles();

    const formattedDate = new Date(postedOn)
    const formattedMessage = message.split("\n").map(function(item, idx) {
        return (
            <span key={idx}>
                {item}
                <br/>
            </span>
        )
    })

    return (
        <div className={myMessage ? classes.myMessage : classes.message}>
            <Typography variant="body1" color="textPrimary" paragraph>
            {formattedMessage}
            </Typography>
            <div className={classes.gutter}>
                <Typography variant="caption" display="inline" align='left' color="textSecondary" gutterBottom>
                    {useName}
                </Typography>
                <Typography className={classes.postedOn} variant="caption" display="inline" align='right' color="textSecondary" gutterBottom>
                    {formattedDate.toString()}
                </Typography>
            </div>
        </div>
    )

}