import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Image, Text } from "../elements";

const PostCommentList = (props) => {
  const { comment_cnt, comments } = props;
  const postCommentList = useSelector((state) => state.post.postCommentList);
  const postId = window.location.href.split("/").at(-1);

  if (comments === [] || (!postCommentList && postId)) {
    return <React.Fragment></React.Fragment>;
  } else {
    return (
      <React.Fragment>
        <Grid>
          {comments.map((c) => {
            return <CommentItem key={c.user_name + c.insert_dt} {...c} />;
          })}
        </Grid>
        <Grid>
          <Text margin="0px" bold>
            View all {props.comment_cnt} comments
          </Text>
        </Grid>
      </React.Fragment>
    );
  }
};

export default PostCommentList;

const CommentItem = (props) => {
  const { user_profile, user_name, user_id, post_id, contents, insert_dt } =
    props;
  return (
    <Grid is_flex>
      <Grid is_flex width="auto">
        {/* <Image shape="circle" /> */}
        <Text bold>{user_name}</Text>
      </Grid>
      <Grid is_flex margin="0px 4px">
        <Text margin="0px">{contents}</Text>
        <Text text_align="right" margin="15px">{insert_dt}</Text>
      </Grid>
    </Grid>
  );
};

CommentItem.defaultProps = {
  user_profile: "",
  user_name: "mean0",
  user_id: "",
  post_id: 1,
  contents: "귀여운 고양이네요!",
  insert_dt: "2021-01-01 19:00:00",
};
