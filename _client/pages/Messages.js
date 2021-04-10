import React, { useEffect, useState } from 'react'
import { useConnection } from '../socket/connection'
import TextEntry from "../components/TextEntry";
import Message from "../components/Message";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    messageBox: {
        height: '80vh',
        overflow: 'auto',
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'column'
    },
    messageEntry: {
        height: '20vh',
        verticalAlign: 'bottom'
    }
}));

export default ({ user, onDisconnect }) => {

    const classes = useStyles();
    const { messages, connectionState, activeUsers, sendMessage } = useConnection({user, onDisconnect});

    useEffect(() => {

    }, [] );

    const postMessage = (message) => {
        sendMessage({ ...user, message })
    }

    console.log('refreshed messages', messages.length)
    return (
        <div>
            {/*<div>*/}
            {/*    {`status ${connectionState}`}*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    {`Users: ${activeUsers.map(*/}
            {/*        user => {*/}
            {/*           return `name ${user?.userName}, active ${user?.active}` */}
            {/*        })*/}
            {/*        .join(' : ')}`}*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    {`messages ${messages?.length}`}*/}
            {/*</div>*/}
            <div className={classes.messageBox}>
                {messages.map((message, index) => {
                    return <Message
                        key={index}
                        message={message.message}
                        useName={message.userName}
                        postedOn={message.postedOn}
                        myMessage={user.userName === message.userName}
                    />
                })}
            </div>
            <TextEntry onSubmit={postMessage}/>
        </div>
    )
}