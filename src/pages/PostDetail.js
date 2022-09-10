import React from "react";
import Post from "../components/Post";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";

const PostDetail = (props) => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post.post_with_id);
  const postId = window.location.href.split("/").at(-1);
  console.log("this is post", post);

  React.useEffect(() => {
    dispatch(postActions.getPostWithID(postId));
  }, []);

  if (post !== null) {
    return (
      <React.Fragment>
        <Post {...post} />
        <CommentWrite postID={postId} {...post} />
        <CommentList comments={post.comments} />
      </React.Fragment>
    );
  } else {
    <React.Fragment></React.Fragment>;
  }
};

export default PostDetail;
