import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { useStateContext } from "../context";
import { money } from "../assets";
import { CustomButton, FormField, Loader } from "../components";
import { checkIfImage } from "../utils";
import { Box, Flex, Image, Text } from "theme-ui";
import Layout from "../components/Layout";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });
        setIsLoading(false);
        navigate("/");
      } else {
        alert("Provide valid image URL");
        setForm({ ...form, image: "" });
      }
    });
  };

  return (
    <Layout>
      <Flex
        sx={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          bg: "#1c1c24",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        {isLoading && <Loader />}
        <Flex
          sx={{
            justifyContent: "center",
            alignItems: "center",
            padding: "16px",
            bg: "#3a3a43",
            borderRadius: "10px",
          }}
        >
          <Text
            sx={{
              fontFamily: "sans-serif",
              fontWeight: "bold",
              fontSize: "18px",
              lineHeight: "38px",
              color: "white",
            }}
          >
            Start a Campaign
          </Text>
          <Image
            src={money}
            alt="money"
            sx={{
              width: "40px",
              height: "40px",
              objectFit: "contain",
            }}
          />
        </Flex>

        <Flex
          id="formBox"
          as="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
            mt: "65px",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Flex
            sx={{
              flexWrap: "wrap",
              gap: "40px",
            }}
          >
            <FormField
              labelName="Your Name *"
              placeholder="John Doe"
              inputType="text"
              value={form.name}
              handleChange={(e) => handleFormFieldChange("name", e)}
            />
            <FormField
              labelName="Campaign Title *"
              placeholder="Write a title"
              inputType="text"
              value={form.title}
              handleChange={(e) => handleFormFieldChange("title", e)}
            />
          </Flex>

          <FormField
            labelName="Story *"
            placeholder="Write your story"
            isTextArea={true}
            value={form.description}
            handleChange={(e) => handleFormFieldChange("description", e)}
          />

          <Flex
            sx={{
              width: "100%",
              justifyContent: "start",
              alignItems: "center",
              padding: "4px",
              bg: "#8c6dfd",
              height: "120px",
              borderRadius: "10px",
            }}
          >
            <Image
              src={money}
              alt="money"
              sx={{
                width: "40px",
                height: "40px",
                objectFit: "contain",
              }}
            />
            <Text
              sx={{
                fontFamily: "sans-serif",
                fontWeight: "bold",
                fontSize: "25px",
                color: "white",
                ml: "20px",
              }}
            >
              You will get 100% of the raised amount
            </Text>
          </Flex>

          <Flex
            sx={{
              flexWrap: "wrap",
              gap: "40px",
            }}
          >
            <FormField
              labelName="Goal *"
              placeholder="ETH 0.50"
              inputType="text"
              value={form.target}
              handleChange={(e) => handleFormFieldChange("target", e)}
            />
            <FormField
              labelName="End Date *"
              placeholder="End Date"
              inputType="date"
              value={form.deadline}
              handleChange={(e) => handleFormFieldChange("deadline", e)}
            />
          </Flex>

          <FormField
            labelName="Campaign image *"
            placeholder="Place image URL of your campaign"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange("image", e)}
          />

          <Flex
            sx={{
              justifyContent: "center",
              alignItems: "center",
              mt: "40px",
            }}
          >
            <CustomButton
              btnType="submit"
              title="Submit new campaign"
              styles="bg-[#1dc071]"
            />
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default CreateCampaign;
