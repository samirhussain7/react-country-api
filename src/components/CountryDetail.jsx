import React, { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'

const CountryDetail = () => {
    const { name } = useParams()
    const [country, setCountry] = useState(null)

    // Fetching that country data.
    useEffect(() => {
      (async function(){

        const res = await fetch('/data.json')
        const data = await res.json()
        const country = data.filter(country => name === country.name)
        setCountry(...country)
      })();
    }, [])
    // console.log(country)
    // console.log(country?.borders)
    
  return (
    <div className='flex-1 w-full p-4 lg:pt-20 max-w-325 mx-auto md:p-0'>
      <Link to='/' className='text-md bg-gray-600 px-5 py-1'>Back</Link>
      <div className="details flex flex-col lg:flex-row justify-around gap-4 md:items-center mt-10">
        <div className="image w-full h-75 max-w-125 flex items-center justify-center">
          <img className='w-full object-cover object-center' src={country?.flags.png} alt={name} />
        </div>

        <div className="info flex flex-col gap-6">
          <h2 className='text-3xl font-semibold'>{name}</h2>

          <div className='flex flex-col gap-10 md:flex-row md:gap-40'>
            <div className="left">
              <h2 className='font-semibold'>Native Name: <span className='opacity-50'>{country?.nativeName}</span> </h2>
              <h2 className='font-semibold'>Population: <span className='opacity-50'>{country?.population}</span> </h2>
              <h2 className='font-semibold'>Region: <span className='opacity-50'>{country?.region}</span> </h2>
              <h2 className='font-semibold'>Sub Region: <span className='opacity-50'>{country?.subregion}</span> </h2>
              <h2 className='font-semibold'>Capital: <span className='opacity-50'>{country?.capital}</span> </h2>
            </div>
            <div className="right">
              <h2>Top Level Domain: <span className='opacity-50'>{country?.topLevelDomain?.[0]}</span></h2>
              <h2>Currencies: <span className='opacity-50'>{country?.currencies?.[0].code}</span></h2>
              <h2>Language: <span className='opacity-50'>{country?.languages?.[0].name}</span></h2>
            </div>

          </div>
            <h2 className='flex flex-wrap gap-y-2'>Border Countries: {country?.borders ? country?.borders?.map((e, index) => <span key={index} className='ml-2 bg-gray-600 rounded px-2'>{e}</span>) : <span className='ml-2 bg-gray-600 rounded px-2 pb-0.5'>No border countries.</span>}</h2>
        </div>
      </div>
    </div>
  )
}

export default CountryDetail