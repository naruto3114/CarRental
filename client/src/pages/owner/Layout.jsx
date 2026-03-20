import React, { useEffect } from "react";
import NavBarOwner from "../../components/owner/NavBarOwner";
import Sidebar from "../../components/owner/Sidebar";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const Layout = () => {
 
  const {isOwner, navigate} = useAppContext()

  useEffect (()=>{
    if (!isOwner) {
      navigate('/')
    }
  },[isOwner])//add navigate
  return (
    <div className="flex flex-col">
      <NavBarOwner />
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
