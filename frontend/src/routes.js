// src/routes.js
const React = require('react');
const { Route } = require('react-router-dom');
const Home = require('./containers/Home').default;
const About = require('./containers/About').default;
const Contact = require('./containers/Contact').default;
const Game = require('./containers/Game').default;
const Rules = require('./containers/Rules').default;
const Profile = require('./containers/Profile').default;
const Prize = require('./containers/Prize').default;
const Legalites = require('./containers/Legalites').default;

const routes = [
  <Route path="/" element={<Home />} />,
  <Route path="/about" element={<About />} />,
  <Route path="/contact" element={<Contact />} />,
  <Route path="/game" element={<Game />} />,
  <Route path="/rules" element={<Rules />} />,
  <Route path="/profile" element={<Profile />} />,
  <Route path="/prize" element={<Prize />} />,
  <Route path="/legalites" element={<Legalites />} />,
];

module.exports = routes;

