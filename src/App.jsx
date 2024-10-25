import React, { useEffect, useState } from "react";

function App() {
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [data,setdata]= useState({
    village :"--",
    pincode : "--",
    state : "--",
    distict: "--",
    country:"--",
});
  const HandleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        setLongitude(position.coords.longitude);
        setLatitude(position.coords.latitude);
      });
    }
  };

  // useEffect to fetch location data when latitude and longitude are updated
  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
            const village = data.address.village;
            const pincode = data.address.postcode;
            const state = data.address.state;
            const distict = data.address.state_district;
             const country = data.address.country;

            console.log(data);
            let newObj = {
                village : village,
                pincode :pincode,
                state: state,
                distict: distict,
                country: country,
            }
            setdata(newObj)
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [latitude, longitude]); // Runs only when latitude and longitude are updated

  return (
    <div>
      <button onClick={HandleClick}>Get Current Location</button>
      <div>
        <p>Longitude: {longitude}</p>
        <p>Latitude: {latitude}</p>
        <p>Village : {data.village}</p>
        <p>pincode : {data.pincode}</p>
        <p>state    :  {data.state}</p>
        <p>distict : {data.distict}</p>
        <p>country : {data.country}</p>

      </div>
    </div>
  );
}

export default App;
