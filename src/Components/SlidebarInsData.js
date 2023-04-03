import React from "react";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

// RiLogoutBoxLine

export const SlidebarInsData = [
  {
    title: "Home",
    path: "/Institution",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Issue",
    path: "/Institution/Issue",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Get All Certificates",
    path: "/Institution/Certificates",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
  {
    title: "Profile",
    path: "/Institution/profile",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
  {
    title: "Messages",
    path: "/",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text",
  },
  {
    title: "Logout",
    path: "/Logout",
    icon: <RiIcons.RiLogoutBoxFill />,
    cName: "nav-text",
  },
];
