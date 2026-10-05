import React from "react";
import AboutPage from "./AboutPage";
import ContactMePage from "./ContactMePage";
import { PostsSlides } from "../components/PostsSlides";

export const MainPage = () => {
  return (
    <div className="flex w-full flex-col gap-10 px-4 py-10">
      <PostsSlides />
      <AboutPage />
      <ContactMePage embedded />
    </div>
  );
};
