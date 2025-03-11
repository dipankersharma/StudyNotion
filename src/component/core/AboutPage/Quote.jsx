import React from 'react'
import HighlightedText from '../Homepage/HighlightedText'

const Quote = () => {
  return (
    <div className='text-white py-5 text-center text-xl md:text-4xl font-semibold pb-20'>
        We are passionate about revolutionizing the way we learn. Our innovative platform
        <HighlightedText text={"combines technology"}/>,
        <span  className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold">
            {""}
            expertise
        </span>
        , and community to create an
        <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">
            {" "}
            unparalleled educational
        experience.
        </span> 

      
    </div>
  )
}

export default Quote
