import { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/search";
import Loader from "./components/Loader.jsx";
import Error from "./components/Error";
import Card from "./components/Card";
import Footer from "./components/Footer";
import Themebtn from "./components/Themebtn";

function App() {
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState({
    name: null
  });
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);


  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const handleToggle = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };


  const HandleClick = async () => {
    if (!city) {
      setError("Please enter a city");
      setWeather({name: null});
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}?q=${city}&appid=${
          import.meta.env.VITE_API_KEY
        }&units=metric`
      );
      if(response.status === 404){
        setWeather({name:null})
        setError("City not found");
        return;
      }      
      const data = await response.json();
      console.log(data);
      setWeather(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const setInput = (e) => {
    setCity(e.target.value);
  };

  const ResetError = () => {
    setError(null);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); 
        HandleClick();
      }
    };
  
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [city]); 
  

  if (loading) {
    return (
      <>
        <h1>WeatherU</h1>
        <Search fun={HandleClick} click={setInput} city={city} />
        <br /><br /><br /><br /><br />
        <Loader />
        <h5>Loading...</h5>
      </>
    );
  }

  return (
    <>
     {error && <Error msg={error} fun={ResetError} />}
     <Themebtn isDarkMode={isDarkMode} onToggle={handleToggle} />
      <h1>WeatherU</h1>
      <Search fun={HandleClick} click={setInput} city={city} />
      {weather.name ? (
        <>
          <br /><br />
          <Card weather={weather} />
        </>
      ) : (
        <h5>Search for a city</h5>
      )}

      <Footer/>
    </>
  );
}

export default App;
