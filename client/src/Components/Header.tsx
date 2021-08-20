import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/auth";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      cursor: "pointer",
    },
    appBar: {
      backgroundColor: "rgba(35,170,170,1.00)",
    },
  })
);

export default function ButtonAppBar() {
  const { user, logout } = useContext(AuthContext);
  const classes = useStyles();

  const history = useHistory();

  const handleClickSignUp = () => {
    history.push("/signup");
  };

  const handleClickSignIn = () => {
    history.push("/signin");
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <span onClick={() => history.push("/")} className={classes.title}>
            <Typography variant="h6">
              {user ? user.name : "CareLulu"}
            </Typography>
          </span>

          {user ? (
            <Button onClick={logout} color="inherit">
              Logout
            </Button>
          ) : (
            <>
              <Button onClick={handleClickSignIn} color="inherit">
                Sign In
              </Button>
              <Button onClick={handleClickSignUp} color="inherit">
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
