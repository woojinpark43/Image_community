import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../elements";
import { actionCreators as imageActions } from "../redux/modules/image";
const Upload = (props) => {
  const dispatch = useDispatch();
  const uploading = useSelector((state) => state.image.uploading);
  const fileInput = React.useRef();

  const selectFile = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(imageActions.setPreview(reader.result));
    };
    uploadFB();
  };

  const uploadFB = () => {
    if (!fileInput.current || fileInput.current.files.length === 0) {
      window.alert("choose a file");
      return;
    }
    dispatch(imageActions.uploadImageFB(fileInput.current.files[0]));
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
export default Upload;
