// Thanks for the skeleton Carla :)
import React, { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext.js";

const GetGameByName = (gameName) => {
  const { authUser } = useAuth();
  const [gameInfo, setGameInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log(`Game Name: ${gameName}`);
      // define url and headers
      let url = `https://hku6k67uqeuabts4pgtje2czy40gldpa.lambda-url.us-east-1.on.aws/api/games?name=${gameName}`;
      let options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + authUser,
        },
      };
      try {
        // make api call
        const response = await fetch(url, options);

        // Check if the response is ok
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response as JSON and return it
        const data = await response.json();
        console.log("game response status: ", response.status);
        console.log("game data retrieved: ", data);
        setGameInfo(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // You might want to throw the error or handle it in some way
        throw error;
      }
    };

    fetchData();
  }, [authUser]); // Add authUser as a dependency if needed

  return gameInfo;
};

export default GetGameByName;
