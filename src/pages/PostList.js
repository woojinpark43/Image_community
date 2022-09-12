import React from "react";
import Post from "../components/Post";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import InfinityScroll from "../shared/InfinityScroll";
import { history } from "../redux/configureStore";
import _ from "lodash";
import useWindowScrollPositions from "../shared/useWindowScrollPositions.js";
import { Grid } from "../elements";

const PostList = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  // const user_info = useSelector((state) => state.user.user);
  const is_loading = useSelector((state) => state.post.is_loading);
  // const changed = useSelector((state) => state.post.changed);
  const paging = useSelector((state) => state.post.paging);
  // const backed = window.location.href.split("/").at(-1);
  // const post_with_id = useSelector((state) => state.post.post_with_id);
  const prevScroll = useSelector((state) => state.post.prevScroll);
  const { scrollY } = useWindowScrollPositions();

  React.useEffect(() => {
    if (post_list.length === 0) {
      dispatch(postActions.getPostFB());
    }
    window.scrollTo(0, prevScroll);
    dispatch(postActions.autoScroll(0));
  }, []);

  return (
    <React.Fragment>
      <InfinityScroll
        callNext={() => {
          dispatch(postActions.getPostFB(paging.next));
        }}
        is_next={paging.next ? true : false}
        loading={is_loading}
      >
        {post_list.map((p, idx) => {
          // if (user_info && p.user_info.user_id === user_info.uid) {
          //   return <Post key={p.id} {...p} is_me />;
          // }
          return (
            <Grid
              bg="#ffffff"
              margin="8px 0px"
              key={p.id}
              _onClick={() => {
                dispatch(postActions.autoScroll(scrollY));
                history.push(`/post/${p.id}`);
              }}
            >
              <Post key={p.id} {...p} profileID={p.user_info.user_id} />
            </Grid>
          );
        })}
      </InfinityScroll>
    </React.Fragment>
  );
};
export default PostList;
