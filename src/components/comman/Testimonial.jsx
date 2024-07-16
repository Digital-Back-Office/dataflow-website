import React, { useState } from 'react';

const testimonials = [
  {
    name: "Lilia Bocouse",
    position: "Head of Innovation",
    feedback: "Thanks to your talented team for the branding we dreamed about :)",
    details: "Leo vitae sem eget eget at in vivamus placerat sodales tristique risusiis senectusic quisque faucibus est justo egetert lobortis ultrices eu dignissim etiamier turpis tincidunt eget placerat feugiat senectusic quisque faucibus placerat sodales vitae tempor morbi tellus pulvinar ut iaculis sit tristique in turpis volutpat quam nec."
  },
  {
    name: "John Doe",
    position: "Chief Executive Officer",
    feedback: "The service was exceptional and exceeded our expectations.",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
 
];

function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    console.log("Next testimonial clicked");
    setCurrentIndex((currentIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    console.log("Previous testimonial clicked");
    setCurrentIndex((currentIndex - 1 + testimonials.length) % testimonials.length);
  };

  console.log("Current Index:", currentIndex);

  return (
    <div className="h-screen w-full flex items-center justify-center" style={{
      backgroundImage: "url('/assets/images/testimonialbackground.png')",
      backgroundPositionX: "70%",
      backgroundPositionY: "40%",
      backgroundSize: "90vh",
      backgroundRepeat: "no-repeat"
    }}>
      <div className="h-[50vh] w-3/5 flex">
        <div className="h-[50vh] w-3/12 flex flex-col justify-center items-start">
          <div className="h-[15vh]">
            <img src="/assets/images/qoutes.png" alt="Quotes" />
          </div>
          <p className="w-full text-start text-lg mt-5" style={{ fontFamily: 'Arimo' }}>
            {testimonials[currentIndex].name}
          </p>
          <p className="w-full text-start text-base text-gray-400 mb-5 font-normal" style={{ fontFamily: 'Arimo' }}>
            {testimonials[currentIndex].position}
          </p>
          <div className="flex justify-between items-center">
            <button className="nav-button ease-in h-10 w-10 rounded-full border border-[#2FB7B8] flex items-center justify-center hover:bg-[#30BABA]" onClick={prevTestimonial}>
              <img className="button-img" src="/assets/images/arrowleft.png" alt="Previous" />
            </button>
            <p style={{ fontFamily: 'Arimo' }} className='mx-4'>{currentIndex + 1}/{testimonials.length}</p>
            <button className="nav-button ease-in h-10 w-10 rounded-full border border-[#2FB7B8] flex items-center justify-center hover:bg-[#30BABA]" onClick={nextTestimonial}>
              <img className="button-img" src="/assets/images/arrowright.png" alt="Next" />
            </button>
          </div>
        </div>
        <div className="w-9/12 h-full flex flex-col justify-center items-start transition-all duration-500 ease-in-out">
          <div key={currentIndex} className="transition-opacity duration-500 ease-in-out animate-fadeIn">
            <p className="text-xl font-bold w-full" style={{ fontFamily: 'Arimo' }}>
              {testimonials[currentIndex].feedback}
            </p>
            <p className="text-lg text-gray-500 w-full mt-10" style={{ fontFamily: 'Arimo' }}>
              {testimonials[currentIndex].details}
            </p>
          </div>
        </div>
      </div>
      <style>
        {`
          .nav-button {
            transition: all 0.3s ease-in-out;
          }
          .nav-button:hover {
            background-color: #30BABA;
          }
          .button-img {
            height: 20px;
            width: 20px;
            transition: filter 0.3s ease-in-out;
          }
          .nav-button:hover .button-img {
            filter: brightness(0) invert(1);
          }
        `}
      </style>
    </div>
  );
}

export default Testimonial;
