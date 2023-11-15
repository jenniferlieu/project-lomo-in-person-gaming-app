import React, { useState } from "react";
import ControllerInfo from "./ControllerInfo.js";
import CommentSection from "./components/Comments.jsx";
import BeaconApplication from "./components/BeaconApplication/BeaconApplication.js";
import { Link } from 'react-router-dom';

const BeaconInfoWindow = ({ username, startTime, endTime, gameTitle, miscInfo, gamePic, userPic, onClose, playerInfo, controllerInfo, address, console, id }) => {
  const [showControllerInfo, setShowControllerInfo] = useState(false);
  const formattedText = miscInfo.replace(/\n/g, "<br>");
  const [showComments, setShowComments] = useState(false);

  const handleCommentsClick = () => {
    setShowComments(!showComments);
  };

  const handleInfoClick = () => {
    setShowControllerInfo(!showControllerInfo);
  };

  return (
    <div className="bg-white rounded-lg w-xl max-w-2xl mx-auto shadow-lg my-5 p-2 px-2 relative">
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
              className="top-0 right-0 h-20 w-20 mr-4"
            />
            <h1 className="text-2xl font-bold">{username}</h1>
          </div>
          <div className="ml-4">
            <h2 className="text-xl border-b border-solid border-gray-400 w-[95%] font-semibold">Game</h2>
            <h2 className="text-xl mb-2">{gameTitle}</h2>
            <p className="mb-2 text-xl" dangerouslySetInnerHTML={{ __html: formattedText }}></p>
            <p className="text-xl border-b border-solid border-gray-400 w-[95%] font-semibold">Console</p>
            <p className="mb-4 text-xl">{console}</p>
            <div className="mb-4 text-xl">
              <p className="border-b border-solid border-gray-400 w-[95%] font-semibold">Location</p>
              <p>{address.name}</p>
              <p>{address.address}</p>
            </div>
            <div className="flex items-center text-lg mb-4">
              <img
                src="icons/clock.png"
                alt="Clock Icon"
                className="h-10 w-10 mr-2"
              />
              <p className="text-xl">
                {startTime} - {endTime}
              </p>
            </div>
            <div className="flex items-center text-lg mb-2">
              <img
                src="icons/people.png"
                alt="People Icon"
                className="h-10 w-10 mr-4"
              />
              <p className="text-xl">
                {playerInfo.available}/{playerInfo.wanted}
              </p>
              <img
                src="icons/controller.png"
                alt="Controller Icon"
                className="h-10 w-10 ml-8 mr-4"
              />
              <p className="text-xl">
                {controllerInfo.available}/{controllerInfo.wanted}
              </p>
              <button className="h-9 w-9" onClick={handleInfoClick}>
                <img
                  src="icons/i.png"
                  alt="Info Icon"
                  className="h-3 w-3 ml-3"
                />
              </button>
              <Link to="/joinbeacon">
                <button className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Join!
                </button>
              </Link>
            </div>
          </div>
        </div>
        <img
          src={gamePic}
          alt="Game Pic"
          className="absolute top-0 right-0 h-[7.5rem] w-[7.5rem] rounded-full mx-4"
        />
      </div>
      {showControllerInfo && <ControllerInfo description={controllerInfo.description} onClose={handleInfoClick} />}
      <div className="flex justify-center">
        <button onClick={handleCommentsClick}>
          <span className="text-xl">Comments</span> <span className="text-base">{showComments ? '▲' : '▼'}</span>
        </button>
      </div>
      {showComments && <CommentSection beaconId={id} />}
    </div>
  );
};

BeaconInfoWindow.defaultProps = {
  username: "username",
  startTime: "start",
  endTime: "end",
  gameTitle: "game title",
  miscInfo: "misc info",
  console: "console",
  address: {
    name: "address name",
    address: "address location"
  },
  gamePic: "images/catCry.jpg",
  userPic: "images/catWut.jpg",
  playerInfo: {
    available: 2,
    wanted: 4
  },
  controllerInfo: {
    available: 1,
    wanted: 4,
    description: [
      "Controller Type 1",
      "Controller Type 2"
    ]
  }
};

export default BeaconInfoWindow;