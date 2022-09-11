import "./App.css";
import React from "react";

import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import PostList from "../pages/PostList";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PostWrite from "../pages/PostWrite";
import PostDetail from "../pages/PostDetail";
import Profile from "../pages/Profile";

import Header from "../components/Header";
import { Grid, Button, Image } from "../elements";
import Permit from "./Permit";

import back from "../img/back.png";
import post from "../img/post.png";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as postActions } from "../redux/modules/post";

import { apiKey } from "./firebase";

function App() {
  const dispatch = useDispatch();

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  React.useEffect(() => {
    if (is_session) {
      dispatch(userActions.loginCheckFB());
    }
  }, []);

  return (
    <React.Fragment>
      <Grid margin="auto" width="30%">
        <Header />
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/write" exact component={PostWrite} />
          <Route path="/post/:id" exact component={PostDetail} />
          <Route path="/Profile" exact component={Profile} />
        </ConnectedRouter>
      </Grid>

      <Permit>
        <Grid width="50px" height="50px">
          <Button
            background="none"
            is_float
            bottom="115px"
            _onClick={() => {
              history.push("/write");
            }}
          >
            <Image shape="rectangle" src={post}></Image>
          </Button>
        </Grid>
      </Permit>
      <Grid width="50px" height="50px">
        <Button
          background="none"
          is_float
          bottom="50px"
          _onClick={() => {
            history.push("/");
          }}
        >
          <Image shape="rectangle" src={back}></Image>
        </Button>
      </Grid>
    </React.Fragment>
  );
}

export default App;
