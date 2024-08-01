import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    name: "Lilia Bocouse",
    position: "Head of Innovation",
    heading: "People now recognise that having a good performance conversation means that something happens as a result.",
    details: "“With Landingfolio, the design team can now build design which identifies employees’ career aspirations and goals and from which we approach managers and check to see what is happening.”"
  },
  {
    name: "John Doe",
    position: "Chief Executive Officer",
    heading: "The service was exceptional and exceeded our expectations.",
    details: "Thanks to your talented team for the branding we dreamed about :) Its seamless integration with other Google Cloud services and support for Apache Beam has made our batch and streaming data pipelines more efficient"
  },
  {
    name: "John smith",
    position: "Chief Executive Officer",
    heading: "The service was exceptional and exceeded our expectations.",
    details: "Thanks to your talented team for the branding we dreamed about :) Its seamless integration with other Google Cloud services and support for Apache Beam has made our batch and streaming data pipelines more efficient"
  },
];

function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState('');

  useEffect(() => {
    // Trigger the fade animation whenever the testimonial changes
    setFadeClass('fade-in-right');
    const timeout = setTimeout(() => setFadeClass(''), 500); // Remove the class after animation duration
    return () => clearTimeout(timeout);
  }, [currentIndex]);

  const nextTestimonial = () => {
    setCurrentIndex((currentIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((currentIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className='  bg-primary 2xl:px-[10%] px-[8%]  py-20 overflow-hidden '>
      <div className='formcontainer flex items-center justify-center w-full bg-white rounded-3xl 2xl:px-[10%] px-[7%] 2xl:py-20 py-14'>
        <div className='container-child1 w-1/2 h-full flex flex-col items-start pr-10'>
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
    .container-child1{
      width: 100%;
      padding-left:10%;
       padding-right:10px;
    }
    .container-child2{
      width: 100%;
    }
    
  }
              
            `}
          </style>
          <img src='/assets/images/qoutes.png' className='mb-8' alt='quote' />
          <p className='text-textblack text-2xl font-bold mb-8' style={{ fontFamily: "Arimo" }}>People now recognise that having a good performance conversation means that something happens as a result.</p>
          <div className={`fadepart ${fadeClass}`}>
            <p className='text-[#52525B] text-lg font-normal mb-8' style={{ fontFamily: "Arimo" }}>{testimonials[currentIndex].details}</p>
            <p className='text-base font-bold text-textblack mb-8' style={{ fontFamily: "Arimo" }}>
              {testimonials[currentIndex].name}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className='font-normal text-[#52525B]'>{testimonials[currentIndex].position}</span>
            </p>
          </div>
          <div className='flex'>
            {currentIndex == 0 ? <button disabled className='cursor-not-allowed h-12 w-12 border-solid border-2 border-primary rounded-full flex items-center justify-center  group pl-1'>
              <div className="inline-block transform rotate-[135deg] border-primary border-r-2 border-b-2 p-1"></div>
            </button> : <button onClick={prevTestimonial} className='h-12 w-12 border-solid border-2 border-primary bg-primary rounded-full flex items-center justify-center hover:bg-white group pl-1'>
              <div className="inline-block transform rotate-[135deg] border-white border-r-2 border-b-2 p-1 group-hover:border-primary"></div>
            </button>}
            {
              currentIndex==testimonials.length-1 ?  <button disabled className='cursor-not-allowed ml-5 h-12 w-12 border-solid border-2  border-primary rounded-full flex items-center justify-center  group pr-1'>
              <div className="inline-block transform -rotate-[45deg] border-primary border-r-2 border-b-2 p-1 "></div>
            </button> :  <button onClick={nextTestimonial} className='ml-5 h-12 w-12 border-solid border-2 bg-primary border-primary rounded-full flex items-center justify-center hover:bg-white group pr-1'>
              <div className="inline-block transform -rotate-[45deg] border-white border-r-2 border-b-2 p-1 group-hover:border-primary"></div>
            </button>
            }
          
          </div>
        </div>
        <div className='w-1/2  flex items-center justify-center z-20 container-child2'>
          <img src='/assets/images/qoutespicture.png' className='w-[100%]' />
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
