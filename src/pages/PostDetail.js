import React from "react";
import Post from "../components/Post";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Text } from "../elements";
import { actionCreators as postActions } from "../redux/modules/post";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";

const PostDetail = (props) => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post.post_with_id);
  const changed = useSelector((state) => state.post.changed);
  const postId = window.location.href.split("/").at(-1);

  React.useEffect(() => {
    dispatch(postActions.getPostWithID(postId));
  }, []);

  React.useEffect(() => {
    if (changed) {
      dispatch(postActions.getPostWithID(postId));
      dispatch(postActions.changeApplied());
    }
  }, [changed]);

  if (post !== null) {
    return (
      <React.Fragment>
        <Post {...post} />
        <Grid>
          <Text margin="0px" bold>
            {post.comments.length} comments
          </Text>
        </Grid>
        <CommentWrite postID={postId} {...post} />
        <CommentList comments={post.comments} />
      </React.Fragment>
    );
  } else {
    <React.Fragment></React.Fragment>;
  }
};

export default PostDetail;
