import React, { useState, useEffect } from "react";

import { DisplayCampaigns } from "../components";
import Layout from "../components/Layout";
import { useStateContext } from "../context";

const Profile = () => {
  return (
    <Layout>
      <DisplayCampaigns title="All Campaigns" profilePage={true} />
    </Layout>
  );
};

export default Profile;
