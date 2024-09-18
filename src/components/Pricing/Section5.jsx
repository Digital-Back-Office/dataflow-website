import React, { useState } from 'react';
import { reviews, title, description } from "../../content/pricing/section5.mdx";

function Review() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState('');

  const reviewsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const nextTestimonial = () => {
    if (currentIndex + reviewsPerPage < reviews.length && !isAnimating) {
      setCurrentIndex(currentIndex + reviewsPerPage);
      setTransitionDirection('left');
      setIsAnimating(true);
      setTimeout(() => {
        setTransitionDirection('');
        setIsAnimating(false);
      }, 500);
    }
  };

  const prevTestimonial = () => {
    setCurrentIndex(currentIndex - reviewsPerPage);
    if (currentIndex - reviewsPerPage >= 0 && !isAnimating) {
      setCurrentIndex(currentIndex - reviewsPerPage);
      setTransitionDirection('right');
      setIsAnimating(true);
      setTimeout(() => {
        setTransitionDirection('');
        setIsAnimating(false);
      }, 500);
    }
  };

  const goToPage = (pageIndex) => {
    if (!isAnimating) {
      const newIndex = pageIndex * reviewsPerPage;
      setCurrentIndex(newIndex);
      if (newIndex < currentIndex) {
        setTransitionDirection('right');
      } else {
        setTransitionDirection('left');
      }
      setIsAnimating(true);
      setTimeout(() => {
        setTransitionDirection('');
        setIsAnimating(false);
      }, 500);
    }
  };

  const getReviewsToDisplay = () => {
    return reviews.slice(currentIndex, currentIndex + reviewsPerPage);
  };

  return (
    <div className='py-24 overflow-hidden'>
      <style>
        {`
          @keyframes slide-in-right {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          @keyframes slide-in-left {
            from {
              transform: translateX(-100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          .slide-in-right {
            animation: slide-in-right 0.5s forwards;
          }
          .slide-in-left {
            animation: slide-in-left 0.5s forwards;
          }
        `}
      </style>
      <div className='flex items-center justify-between mb-16 px-[12%]'>
        <div className='flex flex-col gap-y-2'>
          <h3 className='text-0calc text-textblack font-bold' style={{ fontFamily: "Arimo" }}>{title}</h3>
          <p className='text-xl text-textblack' style={{ fontFamily: "Arimo" }}>{description}</p>
        </div>
        <div className='flex'>
          {currentIndex === 0 ? (
            <button disabled className='cursor-not-allowed h-12 w-12 border-solid border-2 border-gray-300 rounded-full flex items-center justify-center group pl-1'>
              <div className="inline-block transform rotate-[135deg] border-gray-300 border-r-2 border-b-2 p-1"></div>
            </button>
          ) : (
            <button onClick={prevTestimonial} className='h-12 w-12 border-solid border-2 border-primary bg-primary rounded-full flex items-center justify-center hover:bg-white group pl-1'>
              <div className="inline-block transform rotate-[135deg] border-white border-r-2 border-b-2 p-1 group-hover:border-primary"></div>
            </button>
          )}
          {currentIndex + reviewsPerPage >= reviews.length ? (
            <button disabled className='cursor-not-allowed ml-5 h-12 w-12 border-solid border-2 border-gray-300 rounded-full flex items-center justify-center group pr-1'>
              <div className="inline-block transform -rotate-[45deg] border-gray-300 border-r-2 border-b-2 p-1"></div>
            </button>
          ) : (
            <button onClick={nextTestimonial} className='ml-5 h-12 w-12 border-solid border-2 bg-primary border-primary rounded-full flex items-center justify-center hover:bg-white group pr-1'>
              <div className="inline-block transform -rotate-[45deg] border-white border-r-2 border-b-2 p-1 group-hover:border-primary"></div>
            </button>
          )}
        </div>
      </div>
      <div className='flex flex-wrap gap-y-3 items-center justify-center gap-x-7'>
        {getReviewsToDisplay().map((review, index) => (
          <div
            key={index}
            className={`w-[25vw] h-[320px] min-w-[300px] border border-solid p-5 rounded-3xl transition-all duration-500 ${transitionDirection === 'left' && isAnimating ? 'slide-in-right' : transitionDirection === 'right' && isAnimating ? 'slide-in-left' : ''}`}
          >
            <p className='text-xl text-textblack font-bold mb-4' style={{ fontFamily: "Arimo" }}>{review.name}</p>
            <p className='text-base text-textblack' style={{ fontFamily: "Arimo" }}>{review.reviews}</p>
          </div>
        ))}
      </div>
      <div className='w-full flex items-center justify-center mt-8 md:mt-14'>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index)}
            className={`w-3 h-3 rounded-full mx-1 md:mx-2 ${currentIndex / reviewsPerPage === index ? 'bg-primary' : 'bg-[#bbe5e5]'}`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default Review;
