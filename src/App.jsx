import { FaMoon, FaSun } from "react-icons/fa";
import { Route, Routes } from "react-router-dom";
import AllCountry from "./components/AllCountry";
import CountryDetail from "./components/CountryDetail";
import NotFoundPage from "./pages/NotFoundPage";
import { useState } from "react";

function App() {

  const [theme, setTheme] = useState(localStorage.getItem('theme') === 'true');
  
  function saveTheme() {
    if (theme) {
      localStorage.setItem("theme", false)
      setTheme(false)
    } else {
      localStorage.setItem('theme', true)
      setTheme(true)
    }
  }

  
  return (
    <div className={`${theme ? "dark" : "light"} duration-200 lg:flex lg:flex-col min-h-screen`}>
      <header className="w-full p-8 shadow-2xl/10 shadow-black">
        <nav className="flex items-center justify-between max-w-325 mx-auto">
          <h2 className="text-2xl font-bold sp cursor-default">
            Where in the world?
          </h2>
          <button onClick={() => {
            saveTheme()
          }} className="font-semibold flex items-center gap-1 cursor-pointer lg:hover:opacity-80 active:scale-95 duration-100 px-2 py-1">
            { !theme ? <FaMoon /> : <FaSun /> } { !theme ? <span className="text-sm whitespace-nowrap" >Dark Mode</span> : <span className="text-sm whitespace-nowrap" >Light Mode</span> }
          </button>
        </nav>
      </header>


      <Routes>
        <Route path="/" element={<AllCountry theme={theme} />} />
        <Route path="/country/:name" element={<CountryDetail theme={theme} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      
    </div>
  );
}

export default App;