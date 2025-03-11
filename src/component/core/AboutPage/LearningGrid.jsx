import React from "react";
import HighlightedText from "../Homepage/HighlightedText";
import Button from "../Homepage/Button";

const LearningGrid = () => {
  const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
  ];

  return (
    <div className="grid mx-auto w-[350px] xl:w-fit xl:grid-cols-4 grid-cols-1 mb-10 ">
      {LearningGridArray.map((card, index) => {
        return (
          <div
          key={index}
            className={`${index === 0 && "xl:col-span-2 xl:h-[294px]"} ${
              card.order % 2 === 1
                ? "bg-richblack-700 h-[294px]"
                : card.order % 2 === 0
                ? "bg-richblack-800 h-[294px]"
                : "bg-transparent"
            }
                    ${card.order === 3 && "xl:col-start-2"}`}
          >
            {card.order < 0 ? (
              <div className="flex flex-col gap-5 xl:w-[90%]  pb-10 xl:pb-0">
                <div className="text-4xl font-semibold text-white">
                  {card.heading}
                  <HighlightedText text={card.highlightText} />
                </div>
                <p className="text-richblack-300 font-medium">{card.description}</p>
                <div className="w-fit mt-2">
                  <Button active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col p-10 gap-10">
                <h1 className="text-lg text-richblack-5">{card.heading}</h1>
                <p className="text-richblack-300 font-medium">{card.description}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;
