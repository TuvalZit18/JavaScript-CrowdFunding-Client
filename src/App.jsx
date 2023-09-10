//External Imports
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Flex } from "theme-ui";
import { NavBar, SideBar } from "./components";
//=========================================================
import { CampaignDetails, CreateCampaign, Home, Profile } from "./pages";

//51:56
const App = () => {
  return (
    <Router >
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-campaign" element={<CreateCampaign />} />
        <Route path="/campaign-details/:id" element={<CampaignDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
