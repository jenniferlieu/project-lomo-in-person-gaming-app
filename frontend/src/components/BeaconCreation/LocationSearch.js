import React, { useState } from "react";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";

const placesLibrary = ["places"];

function LocationSearch({ returnValue }) {
  const [searchResult, setSearchResult] = useState("Result: none");

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: placesLibrary,
  });

  function onLoad(autocomplete) {
    setSearchResult(autocomplete);
  }

  function onPlaceChanged() {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      const name = place.name;
      const coords = place.geometry.location;
      const status = place.business_status;
      const formattedAddress = place.formatted_address;
      returnValue({ name, coords, status, formattedAddress });
    } else {
      alert("Please enter text");
    }
  }

  return (
    <div>
      <div className="my-2">
        <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
          <input
            type="text"
            placeholder="Where are we playing?"
            className="w-full h-8 px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
          />
        </Autocomplete>
      </div>
    </div>
  );
}

export default LocationSearch;
