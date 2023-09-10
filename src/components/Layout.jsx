import React from "react";
import { Flex } from "theme-ui";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

const Layout = ({ children, campaigns, isLoading }) => {
  return (
    <Flex id="SideBar_Container" bg="#13131a">
      <Flex
        sx={{
          bg: "#13131a",
          minHeight: "100vh",
        }}
      >
        <SideBar />
      </Flex>
      <Flex
        id="NavBarRouter_Container"
        sx={{
          flex: "1",
          maxWidth: "1280px",
          pr: "5px",
          mx: "auto",
          flexDirection: "column",
        }}
      >
        <NavBar />
        {children}
      </Flex>
    </Flex>
  );
};
export default Layout;
