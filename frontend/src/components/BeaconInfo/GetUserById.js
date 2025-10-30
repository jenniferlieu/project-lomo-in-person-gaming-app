// Thanks for the skeleton Carla :)
//I'm glad it helped! -Carla
import React, { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext.js";

const GetUserById = (userId) => {
  const { authUser } = useAuth();
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log(`User Id: ${userId}`);
      // define url and headers
      let url = `${process.env.REACT_APP_BACKEND}s/api/users/${userId}`;
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
        console.log("user response status: ", response.status);
        console.log("user data retrieved: ", data.data);
        setUserInfo(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // You might want to throw the error or handle it in some way
        throw error;
      }
    };

    fetchData();
  }, [authUser]); // Add authUser as a dependency if needed

  return userInfo;
};

export default GetUserById;
