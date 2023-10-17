import React from "react";

const BeaconInfoWindow = ({ username, startTime, endTime, gameTitle, miscInfo, gamePic, userPic, onClose }) => {
  return (
    <div className="bg-white rounded-lg w-full max-w-xl mx-auto shadow-lg my-5 p-2 px-2 relative">
      <div className="relative">
        <button
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          X
        </button>
        <div className="ml-2 mt-2 text-left">
          <div className="flex items-baseline mb-2">
            <img
              src={userPic}
              alt="Game Pic"
              className="top-0 right-0 h-16 w-16 mr-4"
            />
            <h1 className="text-3xl font-bold">{username}</h1>
          </div>
          <div className="ml-4">
            <h2 className="text-2xl mb-2">{gameTitle}</h2>
            <p className="text-lg mb-2">
              {startTime} - {endTime}
            </p>
            <p className="mb-2 text-lg">
              Misc Info: <span className="font-light">{miscInfo}</span>
            </p>
          </div>
        </div>
        <img
          src={gamePic}
          alt="Game Pic"
          className="absolute top-0 right-0 h-32 w-32 rounded-full"
        />
      </div>
    </div>
  );
};

BeaconInfoWindow.defaultProps = {
  username: "username",
  startTime: "start",
  endTime: "end",
  gameTitle: "game title",
  miscInfo: "misc info",
  gamePic: "images/catCry.jpg",
  userPic: "images/catWut.jpg",
};

export default BeaconInfoWindow;
