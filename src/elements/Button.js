import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const {
    text,
    _onClick,
    is_float,
    children,
    margin,
    width,
    background,
    bottom,
    left,
  } = props;

  if (is_float) {
    return (
      <React.Fragment>
        <FloatButton
          onClick={_onClick}
          bottom={bottom}
          background={background}
          left={left}
        >
          {text ? text : children}
        </FloatButton>
      </React.Fragment>
    );
  }

  const styles = {
    margin: margin,
    width: width,
  };

  return (
    <React.Fragment>
      <ElButton {...styles} onClick={_onClick} background={background}>
        {text ? text : children}
      </ElButton>
    </React.Fragment>
  );
};

Button.defaultProps = {
  text: false,
  children: null,
  _onClick: () => {},
  is_float: false,
  margin: false,
  width: "100%",
  background: false,
  bottom: false,
  left: false,
};

const ElButton = styled.button`
  width: ${(props) => props.width};
  background-color: #212121;
  color: #ffffff;
  padding: 12px 0px;
  box-sizing: border-box;
  border: none;
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.background ? `background: ${props.background};` : "")}
`;

const FloatButton = styled.button`
  width: 75px;
  height: 75px;
  ${(props) => (props.left ? `left: ${props.left};` : "")}
  background-color: #ffffff;
  color: #ffffff;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  ${(props) => (props.background ? `background: ${props.background};` : "")}
  ${(props) => (props.bottom ? `bottom: ${props.bottom};` : "bottom: 50px;")}
  right: 16px;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 50px;
`;

export default Button;
