import React, { useEffect, useState } from "react";
import axios from "axios";

const GameAPITest = () => {
  const [gameImage, setGameImage] = useState("");

  useEffect(() => {
    const fetchGameImage = async () => {
      try {
        const response = await axios.get("https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games", {
          headers: {
            "Client-ID": process.env.REACT_APP_TWITCH_CLIENT_ID,
            Authorization: `Bearer ${process.env.REACT_APP_TWITCH_SECRET_ID}`,
          },
          data: 'fields cover.image_id; where name = "Super Smash Bros. Ultimate";',
        });

        const imageId = response.data[0].cover.image_id;
        const imageUrl = `https://images.igdb.com/igdb/image/upload/t_cover_big/${imageId}.jpg`;
        setGameImage(imageUrl);
      } catch (error) {
        console.error("Error fetching game image:", error);
      }
    };

    fetchGameImage();
  }, []);

  return <div className="w-64 h-64 bg-gray-200 flex items-center justify-center">{gameImage && <img src={gameImage} alt="Super Smash Bros. Ultimate" className="w-full h-full object-cover" />}</div>;
};

export default GameAPITest;
