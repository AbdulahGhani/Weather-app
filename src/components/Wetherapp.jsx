import { useEffect, useState } from "react";
const Wetherapp = () => {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("lahore");
  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=0b5d525db2c6738de35265436fcce145`;
    const fetchapi = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("City not found");
        }
        const resJson = await response.json();
        setCity(resJson);
      } catch (err) {
        console.error(err);
        setCity(null);
      }
    };

    fetchapi();
  }, [search]);

  const convertKtoC = (tempK) => {
    return tempK - 273.15;
  };

  return (
    <div className="absolute bg-zinc-400 w-screen h-screen flex justify-center items-center ">
      <div className="relative bg-sky-400  w-1/4 h-[80vh]   text-center rounded-xl shadow-2xl overflow-hidden">
        <input
          type="search"
          className=" p-3 rounded-full mt-2 bg-white border-none font-semibold"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        {!city ? (
          <p>no city found</p>
        ) : (
          <>
            <div className="relative flex flex-col  gap-10 justify-center items-center mt-[8rem] ">
              <h1 className=" location text-6xl font-semibold">
                <i className="  location fa-solid fa-street-view text-[70px]"></i>{" "}
                {search}
              </h1>
              <h1 className="text-4xl mt-5 font-bold">
                {convertKtoC(city.main.temp).toFixed(0)}°C
              </h1>
              <h2 className="font-bold">
                {" "}
                Min: {convertKtoC(city.main.temp_min).toFixed(0)}°C | Max:{" "}
                {convertKtoC(city.main.temp_max).toFixed(0)}°C
              </h2>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wetherapp;
