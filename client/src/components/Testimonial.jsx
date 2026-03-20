import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets";

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      name: "Anjali",
      location: "Delhi",
      image: assets.testimonial_image_1,
      review:
        "Exceptional service and attention to detail. Everything was handled professionally and efficiently from start to finish. Highly recommended!",
    },
    {
      id: 2,
      name: "Helly",
      location: "Mumbai",
      image: assets.testimonial_image_2,
      review:
        "I’m truly impressed by the quality and consistency. The entire process was smooth, and the results exceeded all expectations. Thank you!",
    },
    {
      id: 3,
      name: "Riya",
      location: "Bengluru",
      image: assets.testimonial_image_1,
      review:
        "Fantastic experience! From start to finish, the team was professional, responsive, and genuinely cared about delivering great results.",
    },
  ];

  return (
    <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44">
      <Title
        title="What Our Customers Say"
        subTitle="Discover why discerning travelers choose StayVenture for their luxury accommodation around the world."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-500"
          >
            {/* Profile */}
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="font-playfair text-xl">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.location}</p>
              </div>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-1 mt-4">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <img
                    key={index}
                    src={assets.star_icon} // ✅ should be a star icon
                    alt="star-icon"
                    className="h-4"
                  />
                ))}
            </div>

            {/* Review */}
            <p className="text-gray-500 max-w-90 mt-4 font-light">
              "{testimonial.review}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
