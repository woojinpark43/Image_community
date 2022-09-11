import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as profileActions } from "../redux/modules/profile";
const ProfileUpload = (props) => {
  const dispatch = useDispatch();
  const uploading = useSelector((state) => state.profile.uploading);
  const uid = useSelector((state) => state.user.user.uid);
  const fileInput = React.useRef();

  React.useEffect(() => {
    dispatch(profileActions.checkProfile(uid));
  }, []);

  const selectFile = (e) => {
    console.log("this is file input");
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(profileActions.profileSetPreview(reader.result));
    };
    uploadToFB();
  };

  const uploadToFB = () => {
    if (!fileInput.current || fileInput.current.files.length === 0) {
      window.alert("choose a file");
      return;
    }
    console.log("this is file input", fileInput);
    dispatch(
      profileActions.profileUploadImageFB(uid, fileInput.current.files[0])
    );
  };
  return (
    <React.Fragment>
      <input
        type="file"
        ref={fileInput}
        disabled={uploading}
        onChange={selectFile}
      />
      {/* <Button _onClick={uploadFB}>Upload Image</Button> */}
    </React.Fragment>
  );
};
export default ProfileUpload;
