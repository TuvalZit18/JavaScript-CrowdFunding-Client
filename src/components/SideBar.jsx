import React, { useContext, useEffect, useState } from "react";
import { Flex, Image } from "theme-ui";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { logo, logout, sun } from "../assets";
import { navlinks } from "../contants/index.js";
import { useDispatch, useSelector } from "react-redux";
import {
  setFiltering,
} from "../redux/slices/campaignSlice";
import { useStateContext } from "../context";
const Icon = ({
  name,
  key,
  imgUrl,
  isActive = true,
  disabled = false,
  handleClick,
  ...props
}) => {
  return (
    <Flex
      onClick={handleClick}
      {...props}
      sx={{
        width: "48px",
        height: "48px",
        borderRadius: "10px",
        bg: location.pathname.split("/")[1] === name && "#2c2f32",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        filter: location.pathname.split("/")[1] !== name && "grayscale(100%)",
        "&:hover": { filter: "none" },
        ...props.sx,
      }}
    >
      <Image
        src={imgUrl}
        alt="fund_logo"
        sx={{ width: "50%", height: "50%" }}
      />
    </Flex>
  );
};
const SideBar = () => {
  const navigate = useNavigate();
  let location = useLocation();
  const [isActive, setIsActive] = useState("");
  const dispatch = useDispatch();
  const { disconnect } = useStateContext();
  useEffect(() => {
    console.log("sideBar item", location.pathname.split("/")[1]);
    console.log(isActive && isActive === location.pathname.split("/")[1]);
  }, [location]);
  return (
    <Flex
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        position: "fixed",
        top: "5px",
        alignSelf: "flex-start",
      }}
    >
      <Link to="/">
        <Icon
          sx={{ width: "52px", height: "52px", bg: "#2c2f32" }}
          imgUrl={logo}
        />
      </Link>

      <Flex
        sx={{
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          bg: "#1c1c24",
          borderRadius: "20px",
          width: "76px",
          mt: "40px",
          py: "25px",
          height: "90vh",
        }}
      >
        <Flex
          sx={{
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "3px",
          }}
        >
          {navlinks.map((link, index) => {
            if (link.name !== "logout") {
              return (
                <Icon
                  key={link.name}
                  name={link.name}
                  {...link}
                  isActive={isActive}
                  handleClick={() => {
                    if (!link.disabled) {
                      setIsActive(link.name);
                      dispatch(setFiltering(false));
                      navigate(link.link);
                    }
                  }}
                />
              );
            }
          })}
        </Flex>
        <Flex>
          <Icon
            imgUrl={logout}
            handleClick={() => {
              disconnect();
              setIsActive("dashboard");
              navigate("/");
            }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SideBar;
