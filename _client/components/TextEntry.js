import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import SubmitIcon from "@material-ui/icons/ArrowForwardIos";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  submitContainer: {
    position: "fixed",
    margin: "0 auto",
    paddingBottom: "40px",
    width: "60em",
    left: 0,
    right: 0,
    bottom: 0,
    "& form": {
      display: "flex",
      width: "100%",
      "& button": {
        float: "right",
        width: "10%",
        marginLeft: "5%",
      },
      "& .MuiTextField-root": {
        width: "85%",
      },
    },
  },
}));

export default ({ onSubmit }) => {
  const classes = useStyles();
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setText("");
    onSubmit(text, e);
  };

  return (
    <div className={classes.submitContainer}>
      <form onSubmit={(e) => submit(e)}>
        <TextField
          id="standard-full-width"
          multiline
          label="Message"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <Button variant="contained" onClick={(e) => submit(e)} color="primary">
          <SubmitIcon />
        </Button>
      </form>
    </div>
  );
};
