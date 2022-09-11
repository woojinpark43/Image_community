import React from "react";
import { Text, Input, Grid, Button } from "../elements";
import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck } from "../shared/common";

const Login = (props) => {
  const dispatch = useDispatch();

  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");

  const login = () => {
    if (id === "" || pwd === "") {
      window.alert("Type both e-mail and password");
      return;
    }

    if (!emailCheck(id)) {
      window.alert("type e-mail correctly ex) 123@gmail.com");
      return;
    }

    dispatch(userActions.loginFB(id, pwd));
  };

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="32px" bold>
          Login
        </Text>

        <Grid padding="16px 0px">
          <Input
            label="E-mail"
            placeholder="Enter e-mail ..."
            _onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="Password"
            placeholder="Enter password ..."
            type="password"
            _onChange={(e) => {
              setPwd(e.target.value);
            }}
          />
        </Grid>

        <Button
          text="Login"
          _onClick={() => {
            login();
          }}
        ></Button>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
