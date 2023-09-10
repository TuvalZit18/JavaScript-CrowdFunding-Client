//External Imports
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
//Internal Imports
import FundCard from "./FundCard";
import { loader } from "../assets";
import { Flex, Image, Text } from "theme-ui";
import ScrollToTopButton from "./ScrollToTopButton";
import { useDispatch, useSelector } from "react-redux";
import { setCampaigns } from "../redux/slices/campaignSlice";
import { useStateContext } from "../context";
import { daysLeft } from "../utils";
const DisplayCampaigns = ({ title, profilePage = false }) => {
  //Context
  const { address, contract, getCampaigns, getUserCampaigns } =
    useStateContext();
  //Redux
  const dispatch = useDispatch();
  //States
  const [isLoading, setIsLoading] = useState(false);
  //const [campaigns, setCampaignsState] = useState([]);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const compareCampaigns = (c1, c2) => {
    let remainingDays1 = daysLeft(c1.deadline);
    let remainingDays2 = daysLeft(c2.deadline);
    return remainingDays1 - remainingDays2;
  };
  const descendCompareCampaigns = (c1, c2) => {
    let remainingDays1 = daysLeft(c1.deadline);
    let remainingDays2 = daysLeft(c2.deadline);
    return remainingDays2 - remainingDays1;
  };
  const sortCampaigns = (data) => {
    let negativeArr = [],
      positiveArr = [];
    let remainingDays;
    data.map((camp) => {
      remainingDays = daysLeft(camp.deadline);
      remainingDays > 0 ? positiveArr.push(camp) : negativeArr.push(camp);
    });

    console.log(negativeArr.map((camp) => daysLeft(camp.deadline)));
    let sortedArr = [
      ...positiveArr.sort(compareCampaigns),
      ...negativeArr.sort(descendCompareCampaigns),
    ];
    console.log(sortedArr);
    return sortedArr;
  };
  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    let sortedArray = sortCampaigns(data);
    dispatch(setCampaigns([...sortedArray]));
    setIsLoading(false);
  };
  const fetchUserCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    dispatch(setCampaigns([...data]));
    setIsLoading(false);
  };
  const { campaigns, isFiltering, filteredCampaigns } = useSelector(
    (state) => state.campaign
  );
  useEffect(() => {
    if (contract) {
      profilePage ? fetchUserCampaigns() : fetchCampaigns();
    }
  }, [address, contract]);
  //Constants
  const itemsPerPage = 20;

  //Use Refs
  const observer = useRef();
  const tempRef = useRef();
  //Router
  const navigate = useNavigate();
  //------------------------------------------------------------
  //Use Effects
  useEffect(() => {
    setPage(0);
    if (isFiltering && filteredCampaigns) {
      setItems([...filteredCampaigns?.slice(0, itemsPerPage)]);
    } else if (campaigns) {
      setItems([...campaigns.slice(0, itemsPerPage)]);
    }
  }, [campaigns, filteredCampaigns]);
  //------------------------------------------------------------
  useEffect(() => {
    let totalCampaigns = !isFiltering
      ? campaigns?.length
      : filteredCampaigns?.length;
    let tempArr = [];
    if (totalCampaigns > 0 && totalCampaigns > itemsPerPage) {
      let end = page * itemsPerPage + itemsPerPage;
      if (!isFiltering) {
        tempArr.push(...campaigns.slice(0, end));
      } else {
        tempArr.push(...filteredCampaigns.slice(0, end));
      }
      setItems([...tempArr]);
      setHasMore(tempArr.length < totalCampaigns);
    }
  }, [page, campaigns, filteredCampaigns]);
  //------------------------------------------------------------
  //Functions
  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };
  //------------------------------------------------------------
  const lastCampaignRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((campignEntries) => {
        if (campignEntries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );
  //------------------------------------------------------------
  return (
    <Flex sx={{ flexDirection: "column" }}>
      <Text
        sx={{
          fontFamily: "sans-serif",
          fontWeight: "semiBold",
          fontSize: "18px",
          color: "white",
          textAlign: "left",
        }}
      >
        {title} ({!isFiltering ? campaigns?.length : filteredCampaigns?.length})
      </Text>

      <Flex
        sx={{
          flexWrap: "wrap",
          mt: "20px",
          gap: "26px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
        }}
      >
        {isLoading && (
          <Image
            src={loader}
            alt="loader"
            sx={{
              width: "100px",
              height: "100px",
              objectFit: "contain",
            }}
          />
        )}

        {!isLoading && profilePage && items && items.length === 0 && (
          <Text
            sx={{
              fontFamily: "sans-serif",
              fontWeight: "semiBold",
              fontSize: "14px",
              lineHeight: "30px",
              color: "#818183",
            }}
          >
            You have not created any campigns yet
          </Text>
        )}

        {!isLoading &&
          items &&
          items.length > 0 &&
          items.map((campaign, index) => {
            if (items.length === index + 1) {
              return (
                <FundCard
                  _ref={lastCampaignRef}
                  key={campaign.id}
                  {...campaign}
                  handleClick={() => handleNavigate(campaign)}
                />
              );
            } else {
              return (
                <FundCard
                  _ref={tempRef}
                  key={campaign.id}
                  {...campaign}
                  handleClick={() => handleNavigate(campaign)}
                />
              );
            }
          })}
      </Flex>
      <ScrollToTopButton />
    </Flex>
  );
};

export default DisplayCampaigns;
