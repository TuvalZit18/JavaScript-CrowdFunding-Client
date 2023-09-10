import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useStateContext } from "../context";
import { CountBox, CustomButton, Loader } from "../components";
import { calculateBarPercentage, daysLeft } from "../utils";
import { thirdweb } from "../assets";
import { Flex, Image, Input, Text } from "theme-ui";
import Layout from "../components/Layout";

const CampaignDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);

    setDonators(data);
  };

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  const handleDonate = async () => {
    setIsLoading(true);

    await donate(state.pId, amount);

    navigate("/");
    setIsLoading(false);
  };

  return (
    <Layout>
      <Flex sx={{ flexDirection: "column" }}>
        {isLoading && <Loader />}

        <Flex
          sx={{
            width: "100%",
            height: "100%",
            mt: "10px",
            gap: "50px",
            justifyContent: "space-between",
            alignItems: "space-between",
          }}
        >
          <Flex
            id="image-container"
            sx={{
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Image
              src={state.image}
              alt="campaign"
              sx={{
                width: "100%",
                height: "410px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
            <Flex
              id="progress-bar-frame"
              sx={{
                position: "relative",
                width: "100%",
                height: "5px",
                bg: "#3a3a43",
                mt: "2px",
              }}
            >
              <Flex
                id="progress-bar-process"
                sx={{
                  position: "absolute",
                  height: "100%",
                  bg: "#4acd8d",
                  width: `${calculateBarPercentage(
                    state.target,
                    state.amountCollected
                  )}%`,
                  maxWidth: "100%",
                }}
              ></Flex>
            </Flex>
          </Flex>

          <Flex
            sx={{
              flexWrap: "wrap",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CountBox title="Days Left" value={remainingDays} />
            <CountBox
              title={`Raised of ${state.target}`}
              value={state.amountCollected}
            />
            <CountBox title="Total Backers" value={donators.length} />
          </Flex>
        </Flex>
        {/* ========================================================= */}
        <Flex
          id="bottom-container"
          sx={{
            mt: "60px",
            gap: "50px",
          }}
        >
          <Flex
            sx={{
              flex: "2",
              flexDirection: "column",
              gap: "40px",
            }}
          >
            <Flex id="owner-section-container" sx={{ flexDirection: "column" }}>
              <Text
                sx={{
                  fontFamily: "sans-serif",
                  fontWeight: "semiBold",
                  fontSize: "18px",
                  color: "white",
                  textTransform: "uppercase",
                }}
              >
                Creator
              </Text>

              <Flex
                id="owner-image-container"
                sx={{
                  mt: "20px",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "14px",
                }}
              >
                <Flex
                  id="owner-image-container"
                  sx={{
                    width: "52px",
                    height: "52px",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "9999px",
                    bg: "#2c2f32",
                    cursor: "pointer",
                  }}
                >
                  <Image
                    src={thirdweb}
                    alt="user"
                    sx={{
                      width: "60%",
                      height: "60%",
                      objectFit: "contain",
                    }}
                  />
                </Flex>
                <Flex id="owner-container" sx={{}}>
                  <Text
                    sx={{
                      fontFamily: "sans-serif",
                      fontWeight: "semiBold",
                      fontSize: "14px",
                      color: "white",
                      wordBreak: "break-all",
                    }}
                  >
                    {state.owner}
                  </Text>
                  <Text
                    sx={{
                      mt: "4px",
                      fontFamily: "sans-serif",
                      fontWeight: "normal",
                      fontSize: "12px",
                      color: "#808191",
                    }}
                  ></Text>
                </Flex>
              </Flex>
            </Flex>

            <Flex id="story-section-container" sx={{ flexDirection: "column" }}>
              <Text
                sx={{
                  fontFamily: "sans-serif",
                  fontWeight: "semiBold",
                  fontSize: "18px",
                  color: "white",
                  textTransform: "uppercase",
                }}
              >
                Story
              </Text>

              <Flex
                id="story-container"
                sx={{
                  mt: "20px",
                }}
              >
                <Text
                  sx={{
                    fontFamily: "sans-serif",
                    fontWeight: "normal",
                    fontSize: "16px",
                    color: "#808191",
                    lineHeight: "26px",
                    textAlign: "justify",
                  }}
                >
                  {state.description}
                </Text>
              </Flex>
            </Flex>

            <Flex sx={{ flexDirection: "column" }}>
              <Text
                sx={{
                  fontFamily: "sans-serif",
                  fontWeight: "semiBold",
                  fontSize: "18px",
                  color: "white",
                  textTransform: "uppercase",
                }}
              >
                Donators
              </Text>

              <Flex
                sx={{
                  mt: "20px",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                {donators.length > 0 ? (
                  donators.map((item, index) => (
                    <Flex
                      key={`${item.donator}-${index}`}
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Text
                        sx={{
                          fontFamily: "sans-serif",
                          fontWeight: "normal",
                          fontSize: "16px",
                          color: "#b2b3bd",
                          lineHeight: "26px",
                          textAlign: "justify",
                          wordBreak: "break-all",
                        }}
                      >
                        {index + 1}. {item.donator}
                      </Text>
                      <Text
                        sx={{
                          fontFamily: "sans-serif",
                          fontWeight: "normal",
                          fontSize: "16px",
                          color: "#808191",
                          lineHeight: "26px",
                          wordBreak: "break-all",
                        }}
                      >
                        {item.donation}
                      </Text>
                    </Flex>
                  ))
                ) : (
                  <Text
                    sx={{
                      fontFamily: "sans-serif",
                      fontWeight: "normal",
                      fontSize: "16px",
                      color: "#808191",
                      lineHeight: "26px",
                      textAlign: "justify",
                    }}
                  >
                    No donators yet. Be the first one!
                  </Text>
                )}
              </Flex>
            </Flex>
          </Flex>

          <Flex
            sx={{
              flex: "1",
              flexDirection: "column",
            }}
          >
            <Text
              sx={{
                fontFamily: "sans-serif",
                fontWeight: "semiBold",
                fontSize: "18px",
                color: "white",
                textTransform: "uppercase",
              }}
            >
              Fund
            </Text>

            <Flex
              sx={{
                mt: "20px",
                flexDirection: "column",
                padding: "30px",
                bg: "#1c1c24",
                borderRadius: "10px",
              }}
            >
              <Text
                sx={{
                  fontFamily: "sans-serif",
                  fontWeight: "medium",
                  fontSize: "20px",
                  lineHeight: "30px",
                  textAlign: "center",
                  color: "#808191",
                }}
              >
                Fund the campaign
              </Text>
              <Flex
                sx={{
                  mt: "30px",
                  flexDirection: "column",
                }}
              >
                <Input
                  type="number"
                  placeholder="ETH 0.1"
                  step="0.01"
                  sx={{
                    width: "100%",
                    py: "10px",
                    px: "15px",
                    outline: "none",
                    borderWidth: "1px",
                    borderColor: "#3a3a43",
                    bg: "transparent",
                    fontFamily: "sans-serif",
                    color: "white",
                    fontSize: "18px",
                    lineHeight: "30px",
                    borderRadius: "10px",
                    "::placeholder": { color: "#4b5264" },
                  }}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />

                <Flex
                  sx={{
                    my: "20px",
                    padding: "20px",
                    bg: "#13131a",
                    borderRadius: "10px",
                    flexDirection: "column",
                  }}
                >
                  <Text
                    sx={{
                      fontFamily: "sans-serif",
                      fontWeight: "semiBold",
                      fontSize: "14px",
                      lineHeight: "22px",
                      color: "white",
                      //textAlign: "center",
                    }}
                  >
                    Back it because you believe in it.
                  </Text>
                  <Text
                    sx={{
                      mt: "20px",
                      fontFamily: "sans-serif",
                      fontWeight: "normal",
                      fontSize: "14px",
                      lineHeight: "22px",
                      color: "#808191",
                    }}
                  >
                    Support the project for no reward, just because it speaks to
                    you.
                  </Text>
                </Flex>

                <CustomButton
                  btnType="button"
                  title="Fund Campaign"
                  sx={{
                    width: "100%",
                    bg: "#8c6dfd",
                  }}
                  styles="w-full bg-[#8c6dfd]"
                  handleClick={handleDonate}
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default CampaignDetails;
