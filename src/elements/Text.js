import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { bold, color, size, children, text_align } = props;
  const styles = {
    bold: bold,
    color: color,
    size: size,
    text_align: text_align,
  };
  return <P {...styles}>{children}</P>;
};

Text.defaultProps = {
  children: null,
  bold: false,
  color: "#222831",
  size: "14px",
  text_align: false,
};

const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  ${(props) => (props.text_align ? `text-align: ${props.text_align}` : "")};
`;

export default Text;
