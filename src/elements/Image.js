import styled from "styled-components";
import React from "react";

const Image = (props) => {
  const { shape, src, size } = props;
  const styles = {
    src: src,
    size: size,
  };

  if (shape === "circle") {
    return <ImageCircle {...styles}></ImageCircle>;
  }
  if (shape === "rectangle") {
    return (
      <AspectOutter>
        <AspectInner {...styles}></AspectInner>
      </AspectOutter>
    );
  }

  return <React.Fragment></React.Fragment>;
};

Image.defaultProps = {
  shape: "circle",
  src: "https://ctl.s6img.com/society6/img/5uFHiOtud7B5teZ02cp0Mo5O_FY/w_700/prints/~artwork/s6-original-art-uploads/society6/uploads/misc/07c252f2a6f04364ab7d484376e803be/~~/calico-cat1907816-prints.jpg?wait=0&attempt=0",
  size: 36,
};

const AspectOutter = styled.div`
  width: 100%;
  min-width: 250px;
`;

const AspectInner = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

const ImageCircle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: 4px;
`;

export default Image;
