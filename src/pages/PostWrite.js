import React from "react";
import { Grid, Text, Button, Image, Input } from "../elements";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import Upload from "../shared/Upload";
import empty_folder from "../img/empty_folder.png";

const PostWrite = (props) => {
  const [contents, setContents] = React.useState("");
  const dispatch = useDispatch();
  const preview = useSelector((state) => state.image.preview);

  const addPost = () => {
    if(!preview) {
      window.alert("please upload an image before posting");
      return;
    }
    dispatch(postActions.addPostFB(contents));
  };

  const changeContents = (e) => {
    setContents(e.target.value);
  };

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text margin="0px" size="36px" bold>
          Create Post
        </Text>
        <Upload />
      </Grid>

      <Grid>
        <Grid padding="16px">
          <Text margin="0px" size="24px" bold>
            Preview Image
          </Text>
        </Grid>

        <Image shape="rectangle" src={preview ? preview : empty_folder} />
      </Grid>

      <Grid padding="16px">
        <Input
          _onChange={changeContents}
          label="Post Context"
          placeholder="Write Context"
          value={contents}
          multiLine
        />
      </Grid>

      <Grid padding="16px">
        <Button text="Upload Post" _onClick={addPost}></Button>
      </Grid>
    </React.Fragment>
  );
};

export default PostWrite;
