import React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import * as Yup from "yup";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useFormik } from "formik";
import { makeStyles } from "@mui/styles";
import { Button, Typography } from "@mui/material";

const schema = Yup.object().shape({
  email: Yup.string().required("Vui lòng nhập tên môn học"),
});

const useStyles = makeStyles({
  inviteLinkWrapper: {
    marginBottom: "10px",
  },
  inviteLinkWrapper__link: {
    display: "flex",
    justifyContent: "space-between",
  },
});

const DialogInvite = ({ isOpenDialog, dialogTitle, handleCloseDialog }) => {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      resetForm();
    },
  });
  return (
    <Dialog open={isOpenDialog} onClose={handleCloseDialog} fullWidth>
      <DialogTitle>{dialogTitle} </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          {dialogTitle === "Mời học viên" && (
            <div className={classes.inviteLinkWrapper}>
              <Typography variant="subtitle">Đường liên kết mời</Typography>
              <div className={classes.inviteLinkWrapper__link}>
                <Typography
                  variant="body1"
                  sx={{
                    mt: 1,
                    display: "inline-block",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    opacity: "0.5",
                  }}
                >
                  https://classroom.google.com/c/NDI4MDE0MjM3NzM5?cjc=xx2flj4https://classroom.google.com/c/NDI4MDE0MjM3NzM5?cjc=xx2flj4
                </Typography>
                <Button>
                  <ContentCopyIcon />
                </Button>
              </div>
              <Divider sx={{ mt: 2 }} />
            </div>
          )}
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Nhập email"
            type="email"
            fullWidth
            variant="standard"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Huỷ</Button>
          <Button type="submit" disabled={formik.values.email === ""}>
            Mời
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DialogInvite;
