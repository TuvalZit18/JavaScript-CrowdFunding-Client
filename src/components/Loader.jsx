import React from "react";
import { Flex, Image, Text } from "theme-ui";

import { loader } from "../assets";

const Loader = () => {
  return (
    <Flex className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
      <Image
        src={loader}
        alt="loader"
        sx={{
          width: "100px",
          height: "100px",
          objectFit: "contain",
        }}
      />
      <Text
        sx={{
          mt: "20px",
          fontFamily: "sans-serif",
          fontWeight: "bold",
          fontSize: "20px",
          color: "white",
          textAlign: "center",
        }}
      >
        Transaction is in progress <br /> Please wait...
      </Text>
    </Flex>
  );
};

export default Loader;
