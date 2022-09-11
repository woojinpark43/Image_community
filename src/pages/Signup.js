import React from "react";
import { Grid, Text, Input, Button } from "../elements";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck } from "../shared/common";

const Signup = (props) => {
  const dispatch = useDispatch();

  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [pwd_check, setPwdCheck] = React.useState("");
  const [user_name, setUserName] = React.useState("");

  const signup = () => {
    if (id === "" || pwd === "" || user_name === "") {
      window.alert("Type e-mail, user name and password");
      return;
    }

    if (!emailCheck(id)) {
      window.alert("Type e-mail correctly ex) 123@gmail.com");
      return;
    }

    if (pwd !== pwd_check) {
      window.alert(
        "You typed second password differently. Please type same password."
      );
      return;
    }

    dispatch(userActions.signupFB(id, pwd, user_name));
  };
  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="32px" bold>
          Singup
        </Text>

        <Grid padding="16px 0px">
          <Input
            label="E-mail"
            placeholder="Enter email ex)123@gmail.com ..."
            _onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="User name"
            placeholder="Enter user name ex) user1 ..."
            _onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="Password"
            placeholder="Enter Password ..."
            _onChange={(e) => {
              setPwd(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="Re-enter password"
            placeholder="Re-enter password"
            _onChange={(e) => {
              setPwdCheck(e.target.value);
            }}
          />
        </Grid>

        <Button text="Singup" _onClick={signup}></Button>
      </Grid>
    </React.Fragment>
  );
};

Signup.defaultProps = {};

export default Signup;
