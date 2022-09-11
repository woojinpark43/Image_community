import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import moment from "moment/moment";
import { storage, firestore } from "../../shared/firebase";

// actions
const PROFILE_UPLOADING = "PROFILE_UPLOADING";
const PROFILE_UPLOAD_IMAGE = "PROFILE_UPLOAD_IMAGE";
const PROFILE_SET_PREVIEW = "PROFILE_SET_PREVIEW";

// action creators
const uploading = createAction(PROFILE_UPLOADING, (uploading) => ({
  uploading,
}));
const profileUploadImage = createAction(PROFILE_UPLOAD_IMAGE, (image_url) => ({
  image_url,
}));
const profileSetPreview = createAction(PROFILE_SET_PREVIEW, (preview) => ({
  preview,
}));

function profileUploadImageFB(id, image) {
  return function (dispatch, getState, { history }) {
    dispatch(uploading(true));
    const time = moment().format("YYYY-MM-DD hh:mm:ss");
    const _upload = storage.ref(`profile/${image.name}${time}`).put(image);
    _upload
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          const postDB = firestore.collection("profile");
          dispatch(profileUploadImage(url));
          postDB
            .doc(id)
            .set({ profile_image: url })
            .then((doc) => {
              // console.log("upload profile pic");
            })
            .catch((err) => {
              console.log("post write error!", err);
            });
        });
      })
      .catch((err) => {
        dispatch(uploading(false));
      });
  };
}

const checkProfile = (id) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("profile");

    postDB
      .doc(id)
      .get()
      .then((docs) => {
        let data = docs.data();
        const url = data.profile_image;

        dispatch(profileSetPreview(url));
      });
  };
};

// initial state
const initialState = {
  image_url: "",
  uploading: false,
  preview: null,
};

// reducer
export default handleActions(
  {
    [PROFILE_UPLOAD_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.image_url = action.payload.image_url;
        draft.uploading = false;
      }),
    [PROFILE_UPLOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.uploading = action.payload.uploading;
      }),
    [PROFILE_SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
  },
  initialState
);
const actionCreators = {
  profileUploadImage,
  profileUploadImageFB,
  profileSetPreview,
  checkProfile,
};
export { actionCreators };
