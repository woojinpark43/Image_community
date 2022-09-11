import React from "react";
import { firestore } from "../shared/firebase";
import { Grid, Image, Text } from "../elements";

const CommentList = (props) => {
  const { comments } = props;
  return (
    <React.Fragment>
      <Grid padding="16px">
        {comments.map((c) => {
          return <CommentItem key={c.user_name + c.insert_dt} {...c} />;
        })}
      </Grid>
    </React.Fragment>
  );
};

export default CommentList;

const CommentItem = (props) => {
  const { user_profile, user_name, user_id, post_id, contents, insert_dt } =
    props;

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

  React.useEffect(() => {
    getProfileURL(user_id);
  }, []);

  return (
    <Grid is_flex>
      <Grid is_flex width="auto">
        <Image shape="circle" src={URL} />
        <Text bold>{user_name}</Text>
      </Grid>
      <Grid is_flex margin="0px 4px">
        <Text margin="0px">{contents}</Text>
        <Text margin="0px">{insert_dt}</Text>
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
