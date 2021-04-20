import React, { useState } from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import SubmitIcon from "@material-ui/icons/ArrowForwardIos";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    textAlign: "right",
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
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={9}>
          <TextField
            id="standard-full-width"
            multiline
            rowsMax={2}
            fullWidth
            label="Message"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </Grid>
        <Grid item xs={3} className={classes.button}>
          <Button
            variant="contained"
            onClick={(e) => submit(e)}
            color="primary"
          >
            <SubmitIcon />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
