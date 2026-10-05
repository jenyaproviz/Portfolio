import React, { useState } from "react";
import { Navbar } from "./Navbar";
import Footer from "./Footer";

export const Layout = ({ children }) => {
  const [backgroundHue, setBackgroundHue] = useState(null);
  const backgroundColor =
    backgroundHue === null
      ? "rgb(31, 41, 55)"
      : `hsl(${backgroundHue}, 40%, 20%)`;

  const changeBackgroundColor = () => {
    setBackgroundHue((currentHue) =>
      currentHue === null
        ? Math.floor(Math.random() * 360)
        : (currentHue + 30 + Math.floor(Math.random() * 300)) % 360
    );
  };

  return (
    <div
      className="min-h-screen text-black"
      style={{ backgroundColor }}
    >
      <Navbar
        backgroundColor={backgroundColor}
        onChangeColor={changeBackgroundColor}
        onResetColor={() => setBackgroundHue(null)}
      />
      <main className="site-content container mx-auto">{children}</main>
      <Footer />
    </div>
  );
};
