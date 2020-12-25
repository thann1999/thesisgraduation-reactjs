import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import img from "../../../assets/images/forgot-password.png";
import Copyright from "../components/CopyRight";
import ForgotPassword from "../components/ForgotPassword";
import { StyledPaper, StyledTypography } from "../css/custom.component";
import "../css/style.css";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(3, 0, 2),
    background: "#F7F7F7",
  },
  link: {
    fontWeight: "bold",
    color: "#434343",
  },
}));

export default function ForgotPasswordPage() {
  const classes = useStyles();
  const [isExistEmail, setExistEmail] = React.useState(false);
  return (
    <>
      <Container component="main" className="main">
        <CssBaseline />
        <StyledPaper variant="outlined">
          <Avatar className="avatar" src={img}></Avatar>
          <Typography component="h1" variant="h5">
            Quên mật khẩu
          </Typography>
          {!isExistEmail ? (
            <>
              <StyledTypography>
                Nhập email của bạn và chúng tôi sẽ gửi link đặt lại mật khẩu
              </StyledTypography>

              <ForgotPassword exist={setExistEmail} />
              <Grid container justify="flex-end">
                <Grid item>
                  Bạn đã có tài khoản?{" "}
                  <Link href="/auth/login" variant="body2">
                    Đăng nhập
                  </Link>
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <StyledTypography>
                Chúng tôi đã gửi link đặt lại mật khẩu qua email của bạn. Nếu
                không thấy mail trong vài phút, hãy kiểm tra hộp thư spam
              </StyledTypography>

              <Button variant="contained" className={classes.button}>
                <Link
                  href="/auth/login"
                  variant="body2"
                  className={classes.link}
                >
                  Quay lại đăng nhập
                </Link>
              </Button>
            </>
          )}
        </StyledPaper>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
