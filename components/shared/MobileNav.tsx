"use client"
import { useState } from "react";


export default function MobileNav() {

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleClick = () => {
    setIsOpenMenu((prevState) => !prevState);
  };

  return (
    <div className="wrapper lg:hidden flex items-center justify-between bg-blue-5 dark:bg-blue-1">
       <div className="text-2xl sm:text-3xl font-semibold">CompleteME 😡</div>

       <div
          className={`block lg:hidden z-50 icon-menu ${isOpenMenu && "open"}`}
          onClick={handleClick}
        >
          <div className="bar bar--1"></div>
          <div className="bar bar--2"></div>
          <div className="bar bar--3"></div>
        </div>
    </div>
  );
}