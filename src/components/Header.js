import React from "react";
import { Grid, Text, Button, Image } from "../elements";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as postActions } from "../redux/modules/post";
import { history } from "../redux/configureStore";
import logo from "../img/logo.png";
import Permit from "../shared/Permit";

const Header = (props) => {
  const is_login = useSelector((state) => state.user.is_login);
  const dispatch = useDispatch();

  if (is_login) {
    return (
      <Permit>
        <React.Fragment>
          <Grid is_flex padding="4px 16px">
            <Grid width="75px" height="75px">
              <Button
                background="none"
                _onClick={() => {
                  history.replace("/");
                }}
              >
                <Image shape="rectangle" src={logo}></Image>
              </Button>
            </Grid>

            <Grid width="100px"></Grid>

            <Grid is_flex width="300px">
              <Button
                text="my profile"
                _onClick={() => {
                  history.push("/Profile");
                }}
              ></Button>
              <Button
                text="log out"
                _onClick={() => {
                  dispatch(userActions.logoutFB());
                }}
              ></Button>
            </Grid>
          </Grid>
        </React.Fragment>
      </Permit>
    );
  } else {
    return (
      <React.Fragment>
        <Grid is_flex padding="4px 16px">
          <Grid width="75px" height="75px">
            <Button background="none">
              <Image shape="rectangle" src={logo}></Image>
            </Button>
          </Grid>

          <Grid width="100px"></Grid>

          <Grid is_flex>
            <Button
              text="log in"
              _onClick={() => {
                history.push("/login");
              }}
            ></Button>
            <Button
              text="sign up"
              _onClick={() => {
                history.push("/signup");
              }}
            ></Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
};

Header.defaultProps = {};

export default Header;
