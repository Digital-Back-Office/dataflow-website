import React, { useState } from 'react';

const testimonials = [
  {
    name: "Lilia Bocouse",
    position: "Head of Innovation",
    feedback: "",
    details: " Dataflow has significantly improved our data processing workflows. Its seamless integration with other Google Cloud services and support for Apache Beam has made our batch and streaming data pipelines more efficient"
  },
  {
    name: "John Doe",
    position: "Chief Executive Officer",
    feedback: "The service was exceptional and exceeded our expectations.",
    details: "Thanks to your talented team for the branding we dreamed about :) Its seamless integration with other Google Cloud services and support for Apache Beam has made our batch and streaming data pipelines more efficient"
  },
];

function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
   
    setCurrentIndex((currentIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    
    setCurrentIndex((currentIndex - 1 + testimonials.length) % testimonials.length);
  };

  const currentIndexset = (index) => {
    setCurrentIndex(index);
  };



  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-primary">
      <h3 className='w-full text-4xl md:text-5xl font-bold text-center text-white' style={{ fontFamily: 'Arimo' }}>What User Say About Us</h3>
      <div className="w-11/12 md:w-4/5 flex flex-col items-center justify-center">
        <div className='w-full flex justify-start'>
          <img src='assets/images/qouteiconbottom.png' className='rotate-180' alt="quote icon top"/>
        </div>
        <div>
          <p className='text-xl md:text-3xl text-white text-center px-4 md:px-[5%] font-bold leading-normal md:leading-[68px]' style={{ fontFamily: 'Arimo' }}>{testimonials[currentIndex].details}</p>
        </div>
        <div className='w-full flex justify-end'>
          <img src='assets/images/qouteiconbottom.png' alt="quote icon bottom"/>
        </div>
      </div>
      <div className='flex w-full items-center justify-center mt-10'>
      <button onClick={nextTestimonial} className='next-button rotate-180 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center p-2 md:p-[13px] ml-3'>
          <img src='assets/images/testimonial.png' alt="testimonial"/>
        </button>
        <div className='w-11/12 md:w-4/5 flex flex-col items-center  '>
          <p className='text-lg md:text-2xl font-bold text-center text-white' style={{ fontFamily: "Arimo" }}>{testimonials[currentIndex].name}</p>
          <p className='text-sm md:text-lg text-center text-white' style={{ fontFamily: "Arimo" }}>{testimonials[currentIndex].position}</p>
        </div>
        <button onClick={prevTestimonial} className='next-button w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center p-2 md:p-[13px] mr-3'>
          <img src='assets/images/testimonial.png' alt="testimonial"/>
        </button>
      </div>
      <div className='w-full flex items-center justify-center mt-8 md:mt-14'>
        {testimonials.map((_, index) => (
          index === currentIndex ? (
            <button key={index} onClick={() => currentIndexset(index)} className='w-3 h-3 bg-secondary rounded-full mx-1 md:mx-2'></button>
          ) : (
            <button key={index} onClick={() => currentIndexset(index)} className='cursor-pointer w-3 h-3 bg-[#434343] rounded-full mx-1 md:mx-2'></button>
          )
        ))}
      </div>
    </div>
  );
}

export default Testimonial;
