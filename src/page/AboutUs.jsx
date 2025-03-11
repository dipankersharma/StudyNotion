import React from "react";
import HighlightedText from "../component/core/Homepage/HighlightedText";
import img1 from "../assets/Images/aboutus1.webp";
import img2 from "../assets/Images/aboutus2.webp";
import img3 from "../assets/Images/aboutus3.webp";
import Quote from "../component/core/AboutPage/Quote";
import FoundingStory from "../assets/Images/FoundingStory.png";
import StatsBlock from "../component/core/AboutPage/StatsBlock";
import LearningGrid from "../component/core/AboutPage/LearningGrid";
import Form from "../component/core/AboutPage/Form";
import Footer from "../common/Footer"
const AboutUs = () => {
  return (
    <div>
      {/* Section1 */}
      <section className="bg-richblack-700 ">
        <div className=" w-11/12 mx-auto max-w-maxContent relative flex flex-col justify-between gap-10 text-white text-center">
          <header className=" py-20 flex flex-col  text-4xl font-semibold items-cente lg:w-[70%] mx-auto">
            Driving Innovation in Online Education for a
            <HighlightedText text={"Brighter Future"} />
            <p className="text-[16px] leading-5 tracking-wide text-center font-normal text-richblack-300 text-base mx-auto mt-5 lg:w-[95%]">
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </header>

          <div className="sm:h-[70px] lg:h-[150px]"></div>
          <div className="absolute flex bottom-0 left-[1%] grid grid-cols-3 translate-y-[30%] gap-3 lg:gap-10 ">
            <img src={img1} alt="" />
            <img src={img2} alt="" />
            <img src={img3} alt="" />
          </div>
        </div>
      </section>

      {/* Section2 */}
      <section className=" border-b border-richblack-700 ">
        <div className="mx-auto w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500 ">
          <div className="h-[120px]"></div>
          <Quote />
        </div>
      </section>
      {/* section3 */}
      <section>
        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col justigy-between gap-10 text-richblack-500">
          <div className="flex flex-col lg:flex-row  justify-between items-center">
            <div className=" flex my-24 flex-col gap-10 lg:w-[50%]">
              <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent">
                Our Founding Story
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>
            <div>
              <img
                src={FoundingStory}
                alt=""
                className="shadow-[0_0_20px_0] shadow-[#FC6767]"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row py-20 gap-10 justify-between">
            <div className="flex flex-col lg:w-[40%] ">
              <h1 className="text-4xl font-semibold bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text mb-10">
                Our Vision
              </h1>
              <p className="text-base font-medium text-richblack-300">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>
            <div className="flex flex-col lg:w-[40%] ">
              <h1 className="text-3xl mb-10">
                <HighlightedText text={"Our Mission"} />
              </h1>
              <p className="text-base font-medium text-richblack-300">
                Our mission goes beyond just delivering courses online. We
                wanted to create a vibrant community of learners, where
                individuals can connect, collaborate, and learn from one
                another. We believe that knowledge thrives in an environment of
                sharing and dialogue, and we foster this spirit of collaboration
                through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* section4 */}
      <section className="bg-richblack-700">
        <div className="mx-auto w-11/12 max-w-maxContent flex justify-between gap-10">
          <StatsBlock />
        </div>
      </section>

      {/* section5 */}
      <section className="mx-auto flex justify-between gap-10 mb-10 flex-col w-11/12 max-w-maxContent mt-20">
        <LearningGrid />
        <Form/>
      </section>

      {/* review */}
      <div className=" bg-richblack-800">
        <Footer />
      </div>
    </div>
  );
};

export default AboutUs;
