import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightedText from './HighlightedText'
import CTAbutton from "../Homepage/Button"
const InstructorSection = () => {
  return (
    <div className='flex lg:flex-row flex-col items-center gap-10 mx-10'>
      <div className='mt-16 lg:w-[50%] shadow-[-20px_-20px_0px_-5px_rgba(255,255,255)]'>
        <img src={Instructor} alt="" className=' object-cover' />
      </div>
      <div className='flex flex-col gap-8 '>
        <div className='text-4xl font semibold lg:w-[50%]'>
            Become an <HighlightedText text={"Instructor"}/>
        </div>
        <div className='text-sm text-richblack-300 lg:w-[70%]'>
            Instructor from around the world teach millions of student on the StudyNotion. we provides the tools and skills to teach what you love.
        </div>
        <div className='w-fit'>
            <CTAbutton linkto={"/signup"} active={true}>
              <div className='flex flex-row items-center gap-5'>
                Start Teaching Today
                <i class="ri-arrow-right-line"></i>
              </div>
            </CTAbutton>
        </div>
      </div>
    </div>
  )
}

export default InstructorSection
