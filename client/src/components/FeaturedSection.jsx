import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets";
import CarCard from "./CarCard";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";

const fadeUp = {
  initial: { y: 20, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, amount: 0.2 }, // triggers only once when 20% is visible
};

const FeaturedSection = () => {
  const navigate = useNavigate();
  const { cars } = useAppContext();

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center py-24 px-6 md:px-16"
    >
      <motion.div {...fadeUp} transition={{ duration: 1, delay: 0.2 }}>
        <Title
          title="Featured Vehicles"
          subTitle="Explore our selection of premium vehicles available for your next adventure"
        />
      </motion.div>

      <motion.div
        {...fadeUp}
        transition={{ duration: 1, delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
      >
        {cars.slice(0, 6).map((car, i) => (
          <motion.div
            key={car._id}
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <CarCard car={car} />
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        {...fadeUp}
        transition={{ duration: 0.4, delay: 0.4 }}
        onClick={() => {
          navigate("/cars");
          window.scrollTo(0, 0);
        }}
        className="flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-16 cursor-pointer"
      >
        Explore all Cars
        <img src={assets.arrow_icon} alt="arrow" />
      </motion.button>
    </motion.div>
  );
};

export default FeaturedSection;
