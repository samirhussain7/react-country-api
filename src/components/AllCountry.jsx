import { useEffect, useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {FaXmark} from "react-icons/fa6"
import useDebounce from "../hooks/useDebounce"

const AllCountry = ({ theme }) => {
  const [data, setData] = useState(null);
  const [inpVal, setInpVal] = useState("");
  const debouncedSearch = useDebounce(inpVal, 300);

  // Here we are fetching all countries data.
  useEffect(() => {
    const fetching = async () => {
      try {
        const response = await fetch("/data.json");
        const data = await response.json();
        setData(data);
      } catch (err) {
        console.log("Some Error: ", err);
      }
    };

    fetching();
  }, []);

  const filteredCountries = useMemo(() => {
    if (!data) return [];
    return data.filter(country => 
      country.name.toLowerCase().includes(debouncedSearch.toLowerCase().trim())
    );
  }, [data, debouncedSearch]);

  return (
    <section className="max-w-325 w-full mx-auto">
      {/* Search Input */}
      <div className="w-full px-10 sm:px-0 my-4">
        <div className="relative">
          <input
            onChange={(e) => {
              setInpVal(e.target.value);
            }}
            className={`rounded p-2 pl-4 pr-6 lg:pr-30 ${theme ? "dark-elem" : "light-elem"}`}
            type="text"
            placeholder="Search any countries."
            name="search"
            id="search"
            value={inpVal}
          />
          {inpVal && (
            <button
              onClick={() => setInpVal("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-600"
            >
              <FaXmark />
            </button>
          )}
        </div>
      </div>

      {/* Country Cards */}
      <section className="flex justify-center lg:justify-start mx-auto flex-wrap sm:gap-8 gap-10 p-2 lg:p-0">
        {filteredCountries?.length > 0 ? (
          filteredCountries?.map((item, index) => {
            return (
              <div
                key={index}
                className={`w-[90%] sm:max-w-72 overflow-hidden rounded-md ${theme ? "dark-elem" : "light-elem"}`}
              >
                <Link to={`/country/${item.name}`}>
                  <img
                    src={item.flags.png}
                    alt={item.name.common}
                    className="w-full h-52.5 md:h-42.5 object-cover object-center"
                    loading="lazy"
                  />
                </Link>
                <div className="p-2 px-4 pb-8">
                  <h2 className="text-lg font-semibold mt-4">{item.name}</h2>
                  <p>Population: <span>{item.population}</span></p>
                  <p>Region: <span>{item.region}</span></p>
                  <p>Capital: <span>{item.capital}</span></p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="w-full text-center mt-10">
            <h2 className="text-2xl font-semibold">No country found!</h2>
          </div>
        )}
      </section>
    </section>
  );
};

export default AllCountry;
