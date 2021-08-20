import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../Graphql/Mutations";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    minHeight: "70vh",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = () => {
  const context = useContext(AuthContext);
  const classes = useStyles();
  const history = useHistory();
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    password: "",
    username: "",
  });

  const [createUser, { loading }] = useMutation(CREATE_USER, {
    onCompleted: () => {
      setValues({
        firstname: "",
        lastname: "",
        password: "",
        username: "",
      });
      setError("");
      history.push("/");
    },
    onError: (err) => {
      console.log(err.message);
      setError(err.message);
      setTimeout(() => {
        setError("");
      }, 10000);
    },
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fullname = values.firstname + " " + values.lastname;
    if (!loading) {
      try {
        const res = await createUser({
          variables: {
            name: fullname,
            username: values.username,
            password: values.password,
          },
        });
        context.login(res.data.createUser);
      } catch (error) {}
    }
  };

  return (
    <Container className={classes.root} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstname"
                variant="outlined"
                required={true}
                fullWidth
                id="firstName"
                label="First Name"
                onChange={handleChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastname"
                autoComplete="lname"
                onChange={handleChange}
                value={values.lastname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={error.length > 0}
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username "
                name="username"
                autoComplete="username"
                onChange={handleChange}
                value={values.username}
                helperText={error}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                value={values.password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
