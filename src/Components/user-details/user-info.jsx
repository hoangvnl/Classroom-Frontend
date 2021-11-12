import React from "react";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as Yup from "yup";

const UserInfo = ({ user }) => {
  const schema = Yup.object().shape({
    fullname: Yup.string().required("Vui lòng nhập họ tên"),
  });

  const formik = useFormik({
    initialValues: {
      fullname: user.fullname,
      id: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      return;
    },
  });

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          width: "100%",
          boxShadow: 2,
          m: 3,
        }}
        variant="outlined"
      >
        <form onSubmit={formik.handleSubmit}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <Typography variant="h4" sx={{ textAlign: "left" }}>
              Thông tin cá nhân
            </Typography>
            <TextField
              sx={{ my: 1, mt: 3 }}
              label="Email"
              value={user.email}
              disabled
            />
            <TextField
              id="fullname"
              name="fullname"
              sx={{ my: 1 }}
              label="Họ tên"
              value={formik.values.fullname}
              onChange={formik.handleChange}
              error={formik.touched.fullname && Boolean(formik.errors.fullname)}
              helperText={formik.touched.fullname && formik.errors.fullname}
            />
            <TextField
              sx={{ mt: 1 }}
              id="id"
              name="id"
              label="Mã số sinh viên"
              onChange={formik.handleChange}
              value={formik.values.id}
            />
          </CardContent>
          <CardActions sx={{ justifyContent: "right" }}>
            <Button type="submit">Lưu</Button>
          </CardActions>
        </form>
      </Card>
    </div>
  );
};

export default UserInfo;
