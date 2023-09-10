//External Imports
import React, { useState, useEffect } from "react";
//============================================================================
//Internal Imports
import { DisplayCampaigns } from "../components";
import Layout from "../components/Layout";
//============================================================================
const Home = () => {
  return (
    <Layout>
      <DisplayCampaigns title="All Campaigns" />
    </Layout>
  );
};

export default Home;
