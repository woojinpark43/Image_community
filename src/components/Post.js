import React from "react";
import { Grid, Image, Text } from "../elements";
import { firestore } from "../shared/firebase";
import PostCommentList from "./PostCommentList";

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
    getProfileURL(props.user_info.user_id);
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
    user_name: "mean0",
    user_profile: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
  },
  image_url: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
  contents: "고양이네요!",
  comment_cnt: 10,
  insert_dt: "2021-02-27 10:00:00",
};

export default Post;
