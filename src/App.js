import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import ClassroomList from "./components/classroom-list";
import Classroom from "./components/class-details";
import userDetails from "./components/user-details/index";
import Header from "./components/header";
import LoginPage from "./components/login-page";
import RegisterPage from "./components/register-page";
import JoinClassroom from "./components/join-classroom";
import PrivateRoute from "./utils/private-route";
import { createStructuredSelector } from "reselect";
import { selectUser } from "./redux/user/user.selector";
import { connect } from "react-redux";
import { useState } from "react";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
});

const App = ({ user }) => {
  const classes = useStyles();

  const [activeTab, setActiveTab] = useState(0);

  const handleChangeTab = (e, newTab) => {
    setActiveTab(newTab);
  };

  useEffect(() => {
    document.title = "Classroom";
  }, []);

  return (
    <div className={classes.root}>
      <BrowserRouter>
        <Header
          user={user}
          activeTab={activeTab}
          handleChangeTab={handleChangeTab}
        />
        <Switch>
          <Route
            path="/login"
            render={() =>
              !user ? <LoginPage /> : <Redirect to="/classrooms" />
            }
          />
          <Route
            path="/register"
            render={() =>
              !user ? <RegisterPage /> : <Redirect to="/classrooms" />
            }
          />
          <PrivateRoute
            path="/classrooms"
            component={ClassroomList}
            authed={user}
            exact
          />
          <PrivateRoute
            path="/classrooms/:id"
            component={Classroom}
            activeTab={activeTab}
            authed={user}
          />
          <PrivateRoute path="/user" component={userDetails} authed={user} />
          <PrivateRoute
            path="/join/:invitationCode"
            component={JoinClassroom}
            authed={user}
          />
          <Route path="/" render={() => <Redirect to="/classrooms" />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

const mapState = createStructuredSelector({
  user: selectUser,
});

export default connect(mapState)(App);
