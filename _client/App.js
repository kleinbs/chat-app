import React, { useState } from 'react'
import {Container, CssBaseline} from "@material-ui/core";
import Login from './pages/Login';
import Messages from "./pages/Messages";

const userName = getCookieValue('userName');
const id = getCookieValue('userId');
const foundUser = userName && id ? {userName, id} : null;

export default () => {
    const [user, setUser] = useState(foundUser);

    console.log('user in app', user?.userName)
    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />
            {!user ?
                <Login onUser={(user) => {setUser(user)}} /> :
                <Messages user={user} onDisconnect={() =>
                  {
                    document.cookie = `userId=; samesite=strict; expires=Thu, 01 Jan 1970 00:00:01 GMT`
                    document.cookie = `userName=; samesite=strict; expires=Thu, 01 Jan 1970 00:00:01 GMT`
                    setUser(null)
                  }
                }
                /> }
        </Container>)
}

function getCookieValue(name) {
    let result = document.cookie.match("(^|[^;]+)\\s*" + name + "\\s*=\\s*([^;]+)")
    return result ? result.pop() : ""
}