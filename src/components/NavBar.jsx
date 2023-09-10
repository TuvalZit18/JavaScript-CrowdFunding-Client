import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useStateContext } from "../context";
import { search, thirdweb } from "../assets";
import { Flex, Image, Input } from "theme-ui";
import CustomButton from "./CustomButton";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilteredCampaigns,
  setFiltering,
} from "../redux/slices/campaignSlice";

const NavBar = () => {
  //Router
  const navigate = useNavigate();
  //States
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [searchText, setSearchText] = useState("");
  //Context
  const { connect, address } = useStateContext();
  //Redux
  const { campaigns } = useSelector((state) => state.campaign);
  const dispatch = useDispatch();
  //Functions
  const handleSearch = (e) => {
    setSearchText(e.target.value);
    //setFilteredCampaigns([]);
    if (e.target.value.length == 0) {
      dispatch(setFilteredCampaigns(campaigns));
      dispatch(setFiltering(false));
    } else {
      dispatch(setFiltering(true));
      let filteredCampagins = [...campaigns];
      filteredCampagins = filteredCampagins.filter((campaign) =>
        campaign.title.toLowerCase().includes(e.target.value)
      );
      dispatch(setFilteredCampaigns(filteredCampagins));
    }
  };
  return (
    <Flex
      id="NavBar-Container"
      sx={{
        width: "100%",
        mx: "auto",
        maxHeight: "70px",
        justifyContent: "space-between",
        mb: "35px",
      }}
    >
      <Flex
        id="search-container"
        sx={{
          flex: 1,
          maxWidth: "458px",
          py: "2px",
          pl: "4px",
          height: "52px",
          bg: "#1c1c24",
          borderRadius: "100px",
        }}
      >
        <Input
          type="text"
          placeholder="Search for campaigns"
          onChange={handleSearch}
          value={searchText}
          sx={{
            width: "100%",
            fontFamily: "Epilogue",
            display: "flex",
            fontWeight: "400",
            fontSize: "14px",
            "::placeholder": { color: "#4b5264" },
            color: "white",
            bg: "transparent",
            outline: "none",
            border: "none",
          }}
        />
        <Flex
          sx={{
            width: "72px",
            height: "100%",
            borderRadius: "100px",
            bg: "#00b9bc",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Image
            src={search}
            alt="search"
            sx={{ width: "15px", height: "15px", objectFit: "contain" }}
          />
        </Flex>
      </Flex>
      <Flex
        sx={{
          justifyContent: "flex-end",
          gap: "4px",
        }}
      >
        <CustomButton
          btnType="button"
          title={address ? "Create a campaign" : "Connect"}
          sx={{
            bg: address ? "#00b9bc" : "#8c6dfd",
            width: "100%",
          }}
          handleClick={() => {
            if (address) navigate("create-campaign");
            else connect();
          }}
        />

        <Link to="/profile">
          <Flex
            sx={{
              width: "52px",
              height: "52px",
              borderRadius: "9999px",
              bg: "#2c2f32",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              maxHeight: "52px",
              maxWidth: "52px",
            }}
          >
            <Image
              src={thirdweb}
              alt="user"
              width={"60%"}
              height={"60%"}
              sx={{
                objectFit: "contain",
              }}
            />
          </Flex>
        </Link>
      </Flex>
    </Flex>
  );
};

export default NavBar;
