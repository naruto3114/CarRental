import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CarCard from "../components/CarCard";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Cars = () => {
  const [searchParams] = useSearchParams();

  const location = searchParams.get("pickupLocation");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");

  const { cars, axios } = useAppContext();

  const [input, setInput] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);
  const [originalCars, setOriginalCars] = useState([]); // store original list

  const isSearchData = location && pickupDate && returnDate;

  const searchCarAvailability = async () => {
    const { data } = await axios.post("/api/bookings/check-availability", {
      location,
      pickupDate,
      returnDate,
    });
    if (data.success) {
      setFilteredCars(data.availableCars);
      setOriginalCars(data.availableCars); // save original for reset
      if (data.availableCars.length === 0) {
        toast("No cars available");
      }
    }
  };

  useEffect(() => {
    if (isSearchData) {
      searchCarAvailability();
    } else {
      setFilteredCars(cars);
      setOriginalCars(cars); // save original for reset
    }
  }, [cars]);

  // fixed applyFilter
  const applyFilter = () => {
    if (input === "") {
      setFilteredCars(originalCars); // reset to original list
      return;
    }

    const filtered = originalCars.slice().filter((car) => {
      return (
        car.brand.toLowerCase().includes(input.toLowerCase()) ||
        car.model.toLowerCase().includes(input.toLowerCase()) ||
        car.category.toLowerCase().includes(input.toLowerCase()) ||
        car.transmission.toLowerCase().includes(input.toLowerCase())
      );
    });

    setFilteredCars(filtered);
  };

  return (
    <div>
      <div className="flex flex-col items-center py-20 bg-light max-md:px-4">
        <div>
          <Title
            title="Available Cars"
            subTitle="Browse our selection of premium vehicles available for your adventure"
          />

          <div className="flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow">
            <img
              src={assets.search_icon}
              alt=""
              className="w-4.5 h-4.5 mr-2"
            />
            <input
              onChange={(e) => {
                setInput(e.target.value);
                applyFilter();
              }}
              value={input}
              type="text"
              placeholder="search by make, model, or features"
              className="w-full h-full outline-none text-gray-500"
            />
            <img
              src={assets.filter_icon}
              alt=""
              className="w-4.5 h-4.5 ml-2"
            />
          </div>
        </div>
      </div>

      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
        <p className="text-gray-500 xl:px-20 max-w-7xl mx-auto">
          Showing {filteredCars.length} Cars
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
          {filteredCars.map((car, index) => (
            <div key={index}>
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cars;
