import React from "react";
import { Grid, Text, Button, Image, Input } from "../elements";
import { useSelector, useDispatch } from "react-redux";
import ProfileUpload from "../shared/ProfileUpload";

const Profile = (props) => {
  const dispatch = useDispatch();
  const preview = useSelector((state) => state.profile.preview);
  const user_info = useSelector((state) => state.user.user);

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text margin="0px" size="36px" bold>
          User Profile
        </Text>
        <ProfileUpload />
        <Text margin="0px" size="24px" bold>
          upload image to change profile picture
        </Text>
      </Grid>

      <Grid>
        <Grid bg="white" width="257px" radius border="1px solid black">
          <Image
            size={250}
            shape="circle"
            src={preview ? preview : "http://via.placeholder.com/150x150"}
          />
        </Grid>
      </Grid>
      <Grid padding="25px" width="300px">
        <Text margin="0px" size="24px" bold>
          e-mail:
        </Text>
        <Text margin="0px" size="24px" bold>
          {user_info?.id}
        </Text>
      </Grid>
      <Grid padding="25px" width="300px">
        <Text margin="0px" size="24px" bold>
          user name:
        </Text>
        <Text margin="0px" size="24px" bold>
          {user_info?.user_name}
        </Text>
      </Grid>

      <Grid padding="16px">
        {/* <Button text="Upload Post" _onClick={updateProfile}></Button> */}
      </Grid>
    </React.Fragment>
  );
};

export default Profile;
