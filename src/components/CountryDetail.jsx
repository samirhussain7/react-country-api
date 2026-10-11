import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link, Navigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const CountryDetail = ({theme}) => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);

  // Fetching that country data.
  useEffect(() => {
    (async function () {
      const res = await fetch("/data.json");
      const data = await res.json();
      const country = data.filter((country) => name === country.name);
      setCountry(...country);
    })();
  }, []);

  return (
    <>
      <Helmet>
        <title>
          {country?.name ? `${country.name} | REST COUNTRY API` : "Loading..."}
        </title>
      </Helmet>
      <div className="flex-1 w-full p-4 mt-5 lg:mt-0 lg:pt-20 max-w-325 mx-auto">
        <div>
          <Link to="/" className={`${theme ? 'dark-elem' : 'light-elem'} w-25 group text-md px-5 py-1 rounded flex items-center gap-2`}>
            <FaArrowLeft className="inline-block group-hover:-translate-x-1 duration-200" />
            Back
          </Link>
        </div>
        <div className="details w-full flex flex-col lg:flex-row justify-between gap-10 md:items-center mt-16">
          <div className={`${theme ? 'dark-elem' : 'light-elem'} image w-110 lg:w-150`}>
            <img
              className="w-full object-cover object-center"
              src={country?.flags.png}
              alt={name}
              loading="lazy"
            />
          </div>

          <div className="info flex flex-col gap-6">
            <h2 className="text-3xl font-semibold">{name}</h2>

            <div className="flex flex-col gap-10 md:flex-row md:gap-40">
              <div className="left">
                <h2 className="font-semibold">
                  Native Name:{" "}
                  <span className="opacity-50">{country?.nativeName}</span>{" "}
                </h2>
                <h2 className="font-semibold">
                  Population:{" "}
                  <span className="opacity-50">{country?.population}</span>{" "}
                </h2>
                <h2 className="font-semibold">
                  Region:{" "}
                  <span className="opacity-50">{country?.region}</span>{" "}
                </h2>
                <h2 className="font-semibold">
                  Sub Region:{" "}
                  <span className="opacity-50">{country?.subregion}</span>{" "}
                </h2>
                <h2 className="font-semibold">
                  Capital:{" "}
                  <span className="opacity-50">{country?.capital}</span>{" "}
                </h2>
              </div>
              <div className="right">
                <h2>
                  Top Level Domain:{" "}
                  <span className="opacity-50">
                    {country?.topLevelDomain?.[0]}
                  </span>
                </h2>
                <h2>
                  Currencies:{" "}
                  <span className="opacity-50">
                    {country?.currencies?.[0].code}
                  </span>
                </h2>
                <h2>
                  Language:{" "}
                  <span className="opacity-50">
                    {country?.languages?.[0].name}
                  </span>
                </h2>
              </div>
            </div>

            <h2 className="flex flex-wrap gap-y-2 max-w-4/5">
              Border Countries:{" "}
              {country?.borders ? (
                country?.borders?.map((e, index) => (
                  <span
                    key={index}
                    className={`ml-2 ${theme ? 'dark-elem' : 'light-elem'} rounded px-4 text-sm`}
                  >
                    {e}
                  </span>
                ))
              ) : (
                <span className="ml-2 bg-gray-600 rounded px-2 pb-0.5">
                  No border countries.
                </span>
              )}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountryDetail;
