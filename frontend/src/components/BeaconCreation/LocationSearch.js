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
            className="p-1 border-teal-100 border-2 rounded w-full"
          />
        </Autocomplete>
      </div>
    </div>
  );
}

export default LocationSearch;
