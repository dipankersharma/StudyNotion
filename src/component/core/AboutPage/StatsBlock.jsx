import React from 'react'

const StatsBlock = () => {

    const stats = [
        { count: "5K+", label:"Active Students"},
        { count: "10+", label:"Mentors"},
        { count: "200+", label:"Courses"},
        { count: "50+", label:"Awards"},
    ]
  return (
    <div className='h-[150px] flex text-richblack-500 justify-evenly w-full items-center'>
        {
            stats.map((stat, index) => (
                <div key={index} className="flex flex-col gap-1 text-[14px] items-center font-semibold">
                    <div className='text-white text-3xl'>{stat.count}</div>
                    <div className='text-[16px]'>{stat.label}</div>
                </div>
            ))
        }
      
    </div>
  )
}

export default StatsBlock
