import React from "react";
import FileSaver from "file-saver";
import LogoImage from "../utils/LOGO.jpg";

const downloadCV = () => {
  const cvFilePath = `${process.env.PUBLIC_URL}/Jenya Proviz FS.pdf`;
  FileSaver.saveAs(cvFilePath, "My_CV.pdf");
  console.log("Downloading CV...");
};

const AboutMePage = () => {
  return (
    <div className="max-w-[900px] mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-9">
        <div className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0">
          <img
            className="rounded-2xl w-32 md:w-40 h-auto shadow-lg"
            src={LogoImage}
            alt="portfolio"
          />
        </div>

        <div className="w-full md:w-2/3">
          <h2 className="text-2xl text-gray-300 font-bold mb-4">About Me</h2>
          <p className="text-gray-400 mb-4">
<b>Hi! I'm Jenya Proviz</b>, a <b>Full Stack Web Developer</b> with a strong Frontend focus (React + TypeScript), building on over 20 years of experience as an Industrial Engineer and Production Planning Manager. I combine deep systems thinking and process optimization expertise with modern software development and automation skills.          </p>
          <p className="text-gray-400 mb-4">
After leading production, supply chain, and ERP (Priority) implementations for two decades, I expanded into tech through formal studies and self-driven projects. I graduated from a Full Stack Web Development program (HackerU) and am currently completing the AI Experts program at John Bryce, specializing in Python, Machine Learning, Deep Learning, and AI-driven automation.          </p>
          <p className="text-gray-400 mb-4">
           
My technical toolkit includes React, Redux, TypeScript, JavaScript, Node.js, Express, MongoDB, SQL, Tailwind CSS, Bootstrap, and AI tools like OpenAI API, LangChain, SendGrid, and Cursor IDE. I also bring hands-on experience with tools like Jira, GitHub, Figma, and Storybook.
            <br />
            <br />
I’m passionate about building scalable, user-friendly web applications and integrating AI to automate and enhance workflows. Fluent in Hebrew, Russian, and English, I thrive in collaborative, multicultural teams.
          </p>
          <p className="text-gray-400 mb-4">
Currently seeking opportunities as a Frontend or Full Stack Developer, where I can grow, contribute, and create impactful solutions—especially at the intersection of software and intelligent automation.
            <br />
            <button
              className="bg-gray-700 text-white font-bold py-2 px-4 mt-4 rounded"
              onClick={downloadCV}
            >
              Download CV
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutMePage;
