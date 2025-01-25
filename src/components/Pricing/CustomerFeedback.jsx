import React, { useState, useEffect } from 'react';
import {testimonials} from "../../content/Home/testimonials.mdx"
import {title} from "../../content/Home/testimonials.mdx"

function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState('');

  useEffect(() => {
    setFadeClass('fade-in-right');
    const timeout = setTimeout(() => setFadeClass(''), 500);
    return () => clearTimeout(timeout);
  }, [currentIndex]);

  const nextTestimonial = () => {
    setCurrentIndex((currentIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((currentIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className='overflow-x-hidden'>
      <div className='formcontainer flex items-center justify-center gap-4 w-full bg-textPrimary px-52 max-sm:px-2  py-24 max-sm:py-18'>
        <div className='flex items-center justify-center max-md:flex-col w-full h-full  '>
          <div className='w-1/2 max-md:w-full p-8 max-sm:p-4 flex items-center justify-center z-20 container-child2'>
            <img
              src='/assets/images/testimonial-sample.png'
              className='w-[330px] h-[320px]  max-md:h-full max-md:w-full rounded-2xl'
            />
          </div>
          <div className='w-full h-[300px] flex flex-col justify-between max-sm:p-5 text-white gap-20 max-md:gap-0 '>
            <style>
              {`
              @keyframes fadeInRight {
                0% {
                  opacity: 0;
                  transform: translateX(100%);
                }
                70%{
                opacity: 0.5;
                }
                100% {
                  opacity: 1;
                  transform: translateX(0);
                }
              }
              .fade-in-right {
                animation: fadeInRight 0.5s forwards;
              }
      @media(max-width:900px){
    .formcontainer{
      width: 100%;
      flex-direction: column;
      align-items: center;
      justify-items: center;
      row-gap:30px;
      
      height: auto;
    }
    
  }
              
            `}
            </style>
            <div className={`fadepart ${fadeClass} `}>
              <p className='text-base font-normal mb-4'>
                {testimonials[currentIndex].details}
              </p>
              <p className='text-sm font-bold   mb-4'>
                {testimonials[currentIndex].name}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span className='font-normal '>
                  {testimonials[currentIndex].position}
                </span>
              </p>
            </div>
            {testimonials.length > 1 && (
              <div className='flex '>
                {currentIndex == 0 ? (
                  <button
                    disabled
                    className='cursor-not-allowed h-10 w-10 border-solid border-2 border-primary rounded-full flex items-center justify-center  group pl-1'
                  >
                    <div className='inline-block transform rotate-[135deg] border-primary border-r-2 border-b-2 p-1'></div>
                  </button>
                ) : (
                  <button
                    onClick={prevTestimonial}
                    className='h-10 w-10 border-solid border-2 border-primary bg-primary rounded-full flex items-center justify-center hover:bg-white group pl-1'
                  >
                    <div className='inline-block transform rotate-[135deg]  border-r-2 border-b-2 p-1 group-hover:border-primary'></div>
                  </button>
                )}
                {currentIndex == testimonials.length - 1 ? (
                  <button
                    disabled
                    className='cursor-not-allowed ml-5 h-10 w-10 border-solid border-2  border-primary rounded-full flex items-center justify-center  group pr-1'
                  >
                    <div className='inline-block transform -rotate-[45deg] border-primary border-r-2 border-b-2 p-1 '></div>
                  </button>
                ) : (
                  <button
                    onClick={nextTestimonial}
                    className='ml-5 h-10 w-10 border-solid border-2 bg-primary border-primary rounded-full flex items-center justify-center hover:bg-white group pr-1'
                  >
                    <div className='inline-block transform -rotate-[45deg]  border-r-2 border-b-2 p-1 group-hover:border-primary'></div>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonial;
