import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./containers/Home";
import About from "./containers/About";
import Contact from "./containers/Contact";
import Game from "./containers/Game";
import Rules from "./containers/Rules";
import Profile from "./containers/Profile";
import Header from "./containers/Header/index";
import Footer from "./containers/Footer";
import GlobalProvider from "./contexts";
import Prize from "./containers/Prize";
import Legalites from "./containers/Legalites";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/game" element={<Game />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/prize" element={<Prize />} />
          <Route path="/legalites" element={<Legalites />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
