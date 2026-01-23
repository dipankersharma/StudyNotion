import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import { Pagination,Autoplay,Navigation} from 'swiper/modules';
import Course_card from "./Course_card";



const CourseSlider = ({data}) => {
  return (
    <div>
      <Swiper 
      slidesPerView={1}
      spaceBetween={200}
      navigation={true}
      className='mySwiper'
      loop={true}
      modules={[ Pagination,Autoplay,Navigation]}
      Navigation={true}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        1024:{slidesPerView: 3, spaceBetween: 30},
      }}
      >
       {
        data?.map((course, index) => {
          return (
            <SwiperSlide key={index}>
              <Course_card data={course} Height="h-[200px] lg:h-[300px]" />
            </SwiperSlide>
          );
        })
       }
      </Swiper>
      
    </div>
  )
}

export default CourseSlider
