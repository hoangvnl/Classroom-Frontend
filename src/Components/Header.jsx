import React, { useState } from "react";
import styled from "styled-components";
import DialogAddClass from "./DialogAddClass";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import { makeStyles } from "@mui/styles";

const PopupOptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const useStyles = makeStyles({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    width: "100%",
    zIndex: 99,
    backgroundColor: "white",
  },
  header__title: {
    textAlign: "left",
    fontSize: "1.375rem",
    margin: "1rem 2rem",
  },
});

const Header = ({ user, logout }) => {
  const classes = useStyles();

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setIsOpenDialog(true);
  };

  const handleClickAvatar = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserOption = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    logout();
  };

  const open = Boolean(anchorEl);
  const id = open ? "user-popover" : undefined;

  return (
    <Card className={classes.header}>
      <h3 className={classes.header__title}>Class Room</h3>
      {user && (
        <div>
          <IconButton
            sx={{
              marginRight: "1rem",
              fontSize: "35px",
              width: "60px",
            }}
            onClick={handleOpenDialog}
          >
            +
          </IconButton>
          <DialogAddClass
            handleCloseDialog={handleCloseDialog}
            isOpenDialog={isOpenDialog}
          />
          <IconButton
            aria-describedby={id}
            variant="outlined"
            onClick={handleClickAvatar}
          >
            <Avatar sx={{ cursor: "pointer" }}>H</Avatar>
          </IconButton>
          <Popover
            id={id}
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseUserOption}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <PopupOptionsWrapper>
              <Button onClick={handleLogout}>Logout</Button>
            </PopupOptionsWrapper>
          </Popover>
        </div>
      )}
    </Card>
  );
};

export default Header;
