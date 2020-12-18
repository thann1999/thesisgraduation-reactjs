import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Grid,
  Link,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import RegisterForm from "../components/RegisterForm";
import React from "react";
import Copyright from "../components/CopyRight";
import VerifyAccount from "../components/VerifyAccount";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: theme.spacing(60),
    height: "auto",
    padding: theme.spacing(5),
    background: "#F7F7F7"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function RegisterPage() {
  const classes = useStyles();
  //check register in step 1 or 2
  const [accountId, setAccountId] = React.useState();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper variant="outlined" className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        {!accountId ? (
          <>
            <Typography variant="h4" >
              Tạo tài khoản
            </Typography>
            <RegisterForm setId={setAccountId} />
          </>
        ) : (
          <>
            <Typography variant="h4">
              Xác thực tài khoản
            </Typography>
            <VerifyAccount account={accountId} />
          </>
        )}
        <Grid container justify="flex-end">
          <Grid item>
            Bạn đã có tài khoản?{" "}
            <Link href="/auth/login" variant="body2">
              Đăng nhập
            </Link>
          </Grid>
        </Grid>
      </Paper>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
