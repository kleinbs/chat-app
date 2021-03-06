import React from "react";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    listStyle: "none",
    margin: 0,
    padding: "5px",
    overflowX: "scroll",
  },
  innerWrapper: {
    marginLeft: 0,
    display: "inherit",
    minWidth: "100%",
    "&:after": {
      content: "",
      position: "absolute",
      zIndex: 1,
      bottom: 0,
      left: 0,
      pointerEvents: "none",
      backgroundImage:
        "linear-gradient(to right, rgba(255,255,255,0), red 85%)",
      width: "100%",
      height: "4em",
    },
    fade: {
      position: "absolute",
      height: "35px",
      right: 0,
      width: "10%",
      zIndex: "999",
      backgroundImage:
        "linear-gradient(to right, rgba(255,255,255,0), red 85%)",
    },
    //"linear-gradient(to right, rgba(255,255,255,0), #fafafa 85%)",
  },
  chip: {
    margin: theme.spacing(0.1),
  },
  activeIcon: {
    color: "green",
  },
  inactiveIcon: {
    color: "darkgray",
  },
}));

export default ({ users }) => {
  const classes = useStyles();

  const userArray = Object.entries(users)
    .map((user) => user[1])
    .sort((user1, user2) =>
      user1.userName === user2.userName
        ? 0
        : user1.userName > user2.userName
        ? 1
        : -1
    )
    .sort((user1, user2) =>
      user1.active === user2.active ? 0 : user1.active ? -1 : 1
    );

  return (
    <div className={classes.innerWrapper}>
      <Paper elevation={5} component="ul" className={classes.root}>
        {userArray.map((user, index) => {
          const icon = (
            <FiberManualRecordIcon
              className={
                user.active ? classes.activeIcon : classes.inactiveIcon
              }
            />
          );
          return (
            <li key={index}>
              <Chip
                icon={icon}
                label={user.userName}
                className={classes.chip}
              />
            </li>
          );
        })}
      </Paper>
      <div className={classes.fade} />
    </div>
  );
};
