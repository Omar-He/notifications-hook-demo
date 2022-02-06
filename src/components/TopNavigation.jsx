import React, { useState } from "react";
import {
  FaSearch,
  FaHashtag,
  FaRegBell,
  FaUserCircle,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import useDarkMode from "@hooks/useDarkMode";
import NotificationsPopup from "./NotificationsPopup";

const TopNavigation = () => {
  const [contentList, showList] = useState(false);

  const openList = () => {
    showList((oldState) => !oldState);
  };
  return (
    <div className="top-navigation">
      <Title />
      <ThemeIcon />
      <Search />
      <div className="relative">
        <BellIcon onClick={openList} />
        <NotificationsPopup open={contentList} />
        {contentList && (
          <div
            id="backdrop"
            className="fixed top-0 bottom-0 left-0 right-0 bg-gray-700 opacity-50 z-10"
            onClick={() => showList(false)}
          ></div>
        )}
      </div>
      <UserCircle />
    </div>
  );
};

const ThemeIcon = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);
  return (
    <span onClick={handleMode}>
      {darkTheme ? (
        <FaSun size="24" className="top-navigation-icon" />
      ) : (
        <FaMoon size="24" className="top-navigation-icon" />
      )}
    </span>
  );
};

const Search = () => (
  <div className="search">
    <input className="search-input" type="text" placeholder="Search..." />
    <FaSearch size="18" className="text-secondary my-auto" />
  </div>
);
const BellIcon = ({ onClick }) => (
  <FaRegBell size="24" className="top-navigation-icon" onClick={onClick} />
);
const UserCircle = () => (
  <FaUserCircle size="24" className="top-navigation-icon" />
);
const Title = () => <h5 className="title-text">Notifications Demo</h5>;

export default TopNavigation;
