import React, { useEffect, useRef } from "react";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import { userLogin } from "../redux/user/user.action";
import { createStructuredSelector } from "reselect";
import { selectIsWrongAccount, selectError } from "../redux/user/user.selector";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import WithSpinner from "./with-spinner";

const useStyles = makeStyles({
  loginForm: {
    display: "flex",
    flexDirection: "column",
  },
  formWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "35%",
    margin: "auto",
    marginTop: "5rem",
    border: "12px",
    boxShadow: "1px",
  },
  formContent: {
    justifySelf: "center",
  },
  wrongAccountMessage: {
    color: "red",
  },
  messageField: {
    marginTop: "2px",
  },
  shake: {
    animation: "$shake 0.5s",
  },
  "@keyframes shake": {
    "10%": { transform: "translate(-1px, -2px) rotate(-1deg)" },
    " 0%": { transform: "translate(1px, 1px) rotate(0deg) " },
    "20%": { transform: "translate(-3px, 0px) rotate(1deg) " },
    "30%": { transform: "translate(3px, 2px) rotate(0deg)" },
    "40%": { transform: "translate(1px, -1px) rotate(1deg) " },
    "50%": { transform: "translate(-1px, 2px) rotate(-1deg)" },
    "60%": { transform: "translate(-3px, 1px) rotate(0deg) " },
    "70%": { transform: "translate(3px, 1px) rotate(-1deg) " },
    "80%": { transform: "translate(-1px, -1px) rotate(1deg)" },
    "90%": { transform: "translate(1px, 2px) rotate(0deg)" },
    "100%": { transform: "translate(1px, -2px) rotate(-1deg)" },
  },
});

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  password: Yup.string().required("Vui lòng nhập mật khẩu"),
});

const Login = ({ isWrongAccount, userLogin, error }) => {
  const classes = useStyles();
  const emailRef = useRef();
  const passwordRef = useRef();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      userLogin(values.email, values.password);
    },
  });

  useEffect(() => {
    if (isWrongAccount === true) formik.setFieldValue("password", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWrongAccount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formik.values.email === "" || Boolean(formik.errors.email)) {
      emailRef.current.classList.add(classes.shake);
    }
    if (formik.values.password === "") {
      passwordRef.current.classList.add(classes.shake);
    }
    formik.handleSubmit(e);
  };

  return (
    <Card
      className={classes.formWrapper}
      sx={{ boxShadow: 2 }}
      variant="outlined"
    >
      <CardContent className={classes.formContent}>
        <Typography variant="h4">Chào mừng đến với </Typography>
        <Typography variant="h2">Classroom</Typography>
        <Typography variant="subtitle1">
          Đăng nhập để sử dụng ứng dụng
        </Typography>
        <form className={classes.loginForm} onSubmit={handleSubmit}>
          <TextField
            ref={emailRef}
            id="email"
            label="Email"
            variant="outlined"
            name="email"
            sx={{ mt: 2 }}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            onAnimationEnd={(e) => e.target.classList.remove(classes.shake)}
          />

          <TextField
            ref={passwordRef}
            id="password"
            type="password"
            label="Mật khẩu"
            variant="outlined"
            name="password"
            sx={{ mt: 1 }}
            value={"" || formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            onAnimationEnd={(e) => e.target.classList.remove(classes.shake)}
          />
          {isWrongAccount && (
            <Typography
              variant="body2"
              display="block"
              sx={{ mt: 2 }}
              className={classes.wrongAccountMessage}
            >
              Email hay Mật khẩu bạn nhập không đúng!
            </Typography>
          )}
          {error && (
            <Typography
              variant="body2"
              display="block"
              sx={{ mt: 2 }}
              className={classes.wrongAccountMessage}
            >
              Server đang gặp chút trục trặc! Vui lòng quay lại sau
            </Typography>
          )}
          <Button sx={{ mt: 1 }} variant="outlined" type="submit">
            Đăng nhập
          </Button>
          <Link href="/register" variant="body2" sx={{ mt: 2 }}>
            Bạn chưa có tài khoản? Nhấn vào đây để đăng ký
          </Link>
        </form>
      </CardContent>
    </Card>
  );
};

const mapState = createStructuredSelector({
  isWrongAccount: selectIsWrongAccount,
  error: selectError,
});

const mapDispatch = (dispatch) => ({
  userLogin: (email, password) => dispatch(userLogin(email, password)),
});

export default WithSpinner(connect(mapState, mapDispatch)(Login));
