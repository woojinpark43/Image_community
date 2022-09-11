import { createAction, handleActions } from "redux-actions";
import moment from "moment/moment";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import profile from "../../img/profile.png";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const LOADING = "LOADING";
const SETPOSTWITHID = "SETPOSTWITHID";
const ADD_COMMENT = "ADD_COMMENT";
const CHANGED = "CHANGED";
const SCROLL = "SCROLL";

const setPost = createAction(SET_POST, (post_list, paging) => ({
  post_list,
  paging,
}));
const setPostWithID = createAction(SETPOSTWITHID, (post) => ({ post }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const loading = createAction(LOADING, (loading) => ({ loading }));
const addComment = createAction(ADD_COMMENT, () => ({}));
const changed = createAction(CHANGED, () => ({}));
const scroll = createAction(SCROLL, (value) => ({ value }));

const initialState = {
  list: [],
  paging: { start: null, next: null, size: 3 },
  is_loading: false,
  post_with_id: null,
  changed: false,
  postCommentList: true,
  prevScroll: 0,
};

const initialPost = {
  image_url: profile,
  contents: "",
  comment_cnt: 0,
  insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
};

const getPostFB = (start = null, size = 3) => {
  return function (dispatch, getState, { history }) {
    let _paging = getState().post.paging;

    if (_paging.start && !_paging.next) {
      return;
    }

    dispatch(loading(true));

    const postDB = firestore.collection("post");
    let query = postDB.orderBy("insert_dt", "desc");

    if (start) {
      query = query.startAt(start);
    }

    query
      .limit(size + 1)
      .get()
      .then((docs) => {
        let paging = {
          start: docs.docs[0],
          next:
            docs.docs.length === size + 1
              ? docs.docs[docs.docs.length - 1]
              : null,
          size: size,
        };

        let post_list = [];
        docs.forEach((doc) => {
          let _post = doc.data();
          let post = {
            id: doc.id,
            user_info: {
              user_name: _post.user_name,
              user_profile: _post.user_profile,
              user_id: _post.user_id,
            },
            contents: _post.contents,
            image_url: _post.image_url,
            comment_cnt: _post.comment_cnt,
            insert_dt: _post.insert_dt,
            comments: [..._post.comments],
          };
          post_list.push(post);
        });

        post_list.pop();

        dispatch(setPost(post_list, paging));
      });
  };
};

const getPostWithID = (id) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");

    postDB
      .doc(id)
      .get()
      .then((docs) => {
        let _post = docs.data();
        const post = _post;

        dispatch(setPostWithID(post));
      });
  };
};

const addPostComment = (id, comment_cnt, new_comment, prevComment) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");
    let comments = [...prevComment];
    comments.push(new_comment);
    const update_Data = { comment_cnt: comment_cnt + 1, comments: comments };
    postDB
      .doc(id)
      .update(update_Data)
      .then((docs) => {
        dispatch(addComment());
        const list_size = getState().post.list.size;
        getPostFB(null, list_size);
      });
  };
};

const changeApplied = () => {
  return function (dispatch, getState, { history }) {
    dispatch(changed());
  };
};

const autoScroll = (value) => {
  return function (dispatch, getState, { history }) {
    dispatch(scroll(value));
  };
};

const addPostFB = (contents = "") => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");
    const _user = getState().user.user;
    const _image_url = getState().image.image_url;
    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    };
    const _post = {
      ...initialPost,
      comments: [],
      contents: contents,
      image_url: _image_url,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };

    postDB
      .add({ ...user_info, ..._post })
      .then((doc) => {
        let post = { user_info, ..._post, id: doc.id };
        dispatch(addPost(post));
        history.push("/");
      })
      .catch((err) => {
        console.log("post write error!", err);
      });
  };
};

// reducer
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list);
        draft.paging = action.payload.paging;
        draft.is_loading = false;
        draft.postCommentList = true;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.loading;
      }),
    [SETPOSTWITHID]: (state, action) =>
      produce(state, (draft) => {
        draft.post_with_id = action.payload.post;
        draft.postCommentList = false;
      }),
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.changed = true;
      }),
    [CHANGED]: (state, action) =>
      produce(state, (draft) => {
        draft.changed = false;
      }),
    [SCROLL]: (state, action) =>
      produce(state, (draft) => {
        console.log("scroll change", action.payload.value);
        draft.prevScroll = action.payload.value;
      }),
  },
  initialState
); // action creator export
const actionCreators = {
  setPost,
  addPost,
  getPostFB,
  addPostFB,
  loading,
  getPostWithID,
  addPostComment,
  changeApplied,
  autoScroll,
};
export { actionCreators };
