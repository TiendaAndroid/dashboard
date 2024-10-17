"use client";
import React, { useState, useEffect } from "react";
import Menu from "@/components/menu";
import { FiMenu } from "react-icons/fi";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    // Function to check the screen size
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind `md` is 768px
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="h-screen flex flex-col">
      {/* TOP BAR */}
      {isMobile && (
        <div className="w-full bg-gray-200 p-4 flex justify-between">
          <h1 className="text-lg">Panel de administración</h1>

          <button onClick={toggleMenu} className="text-pink-500 p-2 rounded-md">
            <FiMenu />
          </button>
        </div>
      )}

      <div className="flex w-full h-full">
        {/* Menu Overlay for small screens */}
        {isMobile && menuOpen && (
          <div>
            <div className="fixed top-0 left-0 w-[75%] h-full bg-white z-50">
              <div className="flex w-full h-full">
                <Menu /> {/* Close the menu when a Menu option is clicked */}
              </div>
            </div>
            <div
              className="fixed top-0 right-0 w-[25%] h-full bg-[#67676764] z-50"
              onClick={toggleMenu} // Close the menu when clicking on the gray overlay
            ></div>
          </div>
        )}

        {/* Always visible Menu for larger screens */}
        {!isMobile && (
          <div className="w-[15%] h-full bg-white">
            <Menu />
          </div>
        )}

        {/* Content */}
        <div className={`w-full bg-[#FBFBFD] overflow-y-scroll flex flex-col`}>
          {children}
        </div>
      </div>
    </div>
  );
}
