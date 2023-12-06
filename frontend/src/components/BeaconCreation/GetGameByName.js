// Thanks for the skeleton Carla :)
import React, { useEffect, useState } from 'react';
import { useAuth } from "../../AuthContext.js";

const GetGameByName = async (gameName, authUser) => {
  console.log(`Game Name: ${gameName}`);
  let url = `http://localhost/api/games/${encodeURIComponent(gameName)}`;
  let options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + authUser,
    }
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("game response status: ", response.status);
    console.log("game data retrieved: ", data);
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default GetGameByName;