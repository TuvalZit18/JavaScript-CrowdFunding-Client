import React from "react";
import { Flex, Text } from "theme-ui";

const CountBox = ({ title, value }) => {
  return (
    <Flex
      sx={{
        flexDirection: "column",
        alignItems: "center",
        width: "150px",
      }}
    >
      <Flex
        sx={{
          padding: "3px",
          bg: "#1c1c24",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          width: "100%",
          height: "60px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          sx={{
            fontFamily: "sans-serif",
            fontWeight: "bold",
            fontSize: "30px",
            color: "white",
            width: "100%",
            textAlign: "center",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {value}
        </Text>
      </Flex>
      <Flex
        sx={{
          px: "3px",
          py: "2px",
          bg: "#28282e",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          sx={{
            fontFamily: "sans-serif",
            fontWeight: "normal",
            fontSize: "16px",
            color: "#808191",
            width: "100%",
            textAlign: "center",
          }}
        >
          {title}
        </Text>
      </Flex>
    </Flex>
  );
};

export default CountBox;
