import { useEffect, useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
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
      } finally {
        console.log("Fetching complete!");
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
    <>
      <div className="w-full max-w-325 mx-auto px-2">
        <div className="relative">
          <input
            onChange={(e) => {
              setInpVal(e.target.value);
            }}
            className={`border-2 my-4 rounded p-2 pr-6 lg:pr-30 ${theme ? "border-gray-400" : "border-gray-400"}`}
            type="text"
            placeholder="Search any countries."
            name="search"
            id="search"
            value={inpVal}
          />
          {inpVal && (
            <button
              onClick={() => setInpVal("")}l
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              X
            </button>
          )}
          {/* <label className="absolute top-1/2 left-3 -translate-y-1/2 text-sm opacity-60" htmlFor="search">Search any countries.</label> */}
        </div>
      </div>
      <section className="max-w-[1300px] w-full mx-auto flex justify-start flex-wrap gap-3 p-2 lg:p-0">
        {filteredCountries?.length > 0 ? (
          filteredCountries?.map((item, index) => {
            return (
              <div
                key={index}
                className={`w-full ${filteredCountries.length < 5 ? '' : 'mx-auto'} sm:max-w-62 overflow-hidden rounded-md ${theme ? "bg-gray-800" : "bg-gray-100"}`}
              >
                <Link to={`/country/${item.name}`} className="w-full h-[200px]">
                  <img
                    src={item.flags.png}
                    alt={item.name.common}
                    className="w-full h-[200px] sm:h-[150px] object-cover"
                    loading="lazy"
                  />
                </Link>
                <div className="p-2 px-4">
                  <h2 className="text-lg font-semibold mt-4">{item.name}</h2>
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
    </>
  );
};

export default AllCountry;
