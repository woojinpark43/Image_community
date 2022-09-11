import React from "react";
import { Grid, Image, Text } from "../elements";
import { firestore } from "../shared/firebase";
import PostCommentList from "./PostCommentList";
import profile from "../img/profile.png";

const Post = (props) => {
  const [comments, setComments] = React.useState([]);
  const handleComments = () => {
    const comments = props.comments;
    if (comments.length === 0) {
      return;
    }
    if (comments.length < 3) {
      setComments(comments);
    } else {
      setComments(comments.slice(0, 3));
    }
  };

  React.useEffect(() => {
    handleComments();
    console.log(props);
    const user_id = props.user_id ? props.user_id : props.user_info.user_id;
    getProfileURL(user_id);
  }, []);

  const [URL, setURL] = React.useState("");

  const getProfileURL = (id) => {
    const postDB = firestore.collection("profile");

    postDB
      .doc(id)
      .get()
      .then((docs) => {
        let data = docs.data();
        const url = data.profile_image;
        setURL(url);
      });
  };

  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex padding="16px">
          <Grid is_flex width="auto">
            <Image shape="circle" src={URL} />
            <Text bold>{props.user_info.user_name}</Text>
          </Grid>
          <Grid is_flex width="auto">
            <Text>{props.insert_dt}</Text>
          </Grid>
        </Grid>
        <Grid padding="16px">
          <Text>{props.contents}</Text>
        </Grid>
        <Grid>
          <Image shape="rectangle" src={props.image_url} />
        </Grid>
        <PostCommentList comment_cnt={props.comment_cnt} comments={comments} />
      </Grid>
    </React.Fragment>
  );
};

Post.defaultProps = {
  user_info: {
    user_name: "",
    user_profile: profile,
  },
  image_url: profile,
  contents: "",
  comment_cnt: 0,
  insert_dt: "2021-02-27 10:00:00",
};

export default Post;
