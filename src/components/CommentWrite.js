import React from "react";
import { Grid, Input, Button } from "../elements";
import { actionCreators as postActions } from "../redux/modules/post";
import { useSelector, useDispatch } from "react-redux";
import Permit from "../shared/Permit";
import moment from "moment";

const CommentWrite = (props) => {
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user);

  const { comments, postID, comment_cnt } = props;
  const [comment, setComment] = React.useState("");

  const submit_comment = () => {
    if (comment === "") {
      window.alert("please enter comment before submitting :)");
    }

    let user_profile =
      user_info.user_profile === undefined ? "" : user_info.user_profile;
    const commentData = {
      contents: comment,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
      user_id: user_info.uid,
      user_name: user_info.user_name,
      user_profile: user_profile,
    };

    dispatch(
      postActions.addPostComment(postID, comment_cnt, commentData, comments)
    );
    setComment("");
  };

  const onChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <React.Fragment>
      <Permit>
        <Grid padding="16px" is_flex>
          <Input
            _onChange={(e) => {
              onChange(e);
            }}
            placeholder="write a comment... :)"
            value={comment}
            onSubmit={submit_comment}
            is_submit
          />

          <Button
            width="50px"
            margin="0px 16px 0px 2px"
            _onClick={submit_comment}
          >
            add
          </Button>
        </Grid>
      </Permit>
    </React.Fragment>
  );
};

export default CommentWrite;
