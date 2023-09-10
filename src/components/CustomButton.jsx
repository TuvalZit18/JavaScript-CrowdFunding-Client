import React from "react";
import { Button } from "theme-ui";

const CustomButton = ({ btnType, title, handleClick, ...props }) => {
  return (
    <Button
      {...props}
      type={btnType}
      sx={{
        fontFamily: "Epilogue",
        fontWeight: "600",
        fontSize: "16px",
        lineHeight: "26px",
        color: "white",
        minHeight: "52px",
        height: "52px",
        px: "10px",
        borderRadius: "10px",
        ...props.sx,
      }}
      onClick={handleClick}
    >
      {title}
    </Button>
  );
};

export default CustomButton;
