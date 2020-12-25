import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Grid,
  Link,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React from "react";
import Copyright from "../components/CopyRight";
import RegisterForm from "../components/RegisterForm";
import VerifyAccount from "../components/VerifyAccount";
import { StyledPaper } from "../css/custom.component";
import "../css/style.css";

export default function RegisterPage() {
  //check register in step 1 or 2
  const [accountId, setAccountId] = React.useState();

  return (
    <Container component="main" className="main">
      <CssBaseline />
      <StyledPaper variant="outlined">
        <Avatar className="avatar">
          <LockOutlinedIcon />
        </Avatar>
        {!accountId ? (
          <>
            <Typography variant="h4">Tạo tài khoản</Typography>
            <RegisterForm setId={setAccountId} />
          </>
        ) : (
          <>
            <Typography variant="h4">Xác thực tài khoản</Typography>
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
      </StyledPaper>

      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
