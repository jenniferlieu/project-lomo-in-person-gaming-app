import React, { useState } from "react";
import ControllerInfo from "./ControllerInfo.js";
import Comments from "../../Comments.jsx";
import BeaconApplication from "../../BeaconApplication/BeaconApplication.js";
import JoinedUsers from "./JoinedUsers.js";
import GetUserById from "../../BeaconInfo/GetUserById.js";
import { Link, useNavigate } from 'react-router-dom';
import GetBeaconById from "../../BeaconInfo/GetBeaconById.js";


const BeaconInfoWindow = ({
  host_id,
  start_date_time,
  end_date_time,
  game_title,
  description,
  console,
  game_image,
  host_image,
  onClose,
  players_wanted,
  controllers_wanted,
  place_name,
  street_address,
  id
}) => {
  const [showControllerInfo, setShowControllerInfo] = useState(false);
  const formattedText = description.replace(/\n/g, "<br>");
  const [showComments, setShowComments] = useState(false);
  const navigate = useNavigate();
  
  const handleCommentsClick = () => {
    setShowComments(!showComments);
  };

  const handleInfoClick = () => {
    setShowControllerInfo(!showControllerInfo);
  };

  function formatTime(dateString) {
    const date = new Date(dateString);
    let hours = date.getHours() + 5;
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strTime = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm;
    return strTime;
  }

  const handleJoinClick = () => {
    navigate(`/joinbeacon/?beacon_id=${id}&game_title=${encodeURIComponent(game_title)}&host_username=${encodeURIComponent(hostInfo.username)}`);
  };

  const startTime = formatTime(start_date_time);
  const endTime = formatTime(end_date_time);

  const hostInfo = GetUserById(host_id);
  const thisBeaconInfo = GetBeaconById(id);

  return (
    <div
      className="bg-white rounded-lg w-xl max-w-2xl mx-auto shadow-lg my-5 p-2 px-2 relative"
      style={{ maxHeight: '690px', overflowY: 'auto' }}
    >
      <div className="relative">
        <button
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500 hover:text-red-700"
          onClick={onClose}
        >
          X
        </button>
        <div className="ml-2 mt-2 text-left">
          <div className="flex items-baseline mb-2">
            <img
              src={hostInfo.avatar || "icons/defaultPFP.jpg"}
              alt="Game Pic"
              className="top-0 right-0 h-20 w-20 mr-4"
            />
            <h1 className="text-2xl font-bold">{hostInfo.username}</h1>
          </div>
          <div className="mx-4">
            <h2 className="text-xl border-b border-solid border-gray-400 w-[95%] font-semibold">Game</h2>
            <div className="flex justify-between">
              <div>
                <h2 className="text-xl mb-2">{game_title}</h2>
                <p className="mb-2 text-xl" dangerouslySetInnerHTML={{ __html: formattedText }}></p>
              </div>
              <div className="pl-2">
                <button
                  className="mr-8 mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleJoinClick}
                >
                  Join!
                </button>
              </div>
            </div>
            <p className="text-xl border-b border-solid border-gray-400 w-[95%] font-semibold">Console</p>
            <p className="mb-4 text-xl">{console}</p>
            <div className="mb-4">
              <div className="flex justify-between items-center text-xl">
                <span className="border-b border-solid border-gray-400 w-[95%] flex justify-between">
                  <p className="font-semibold">Location</p>
                  <div className="flex items-center">
                    <img
                      src="icons/clock.png"
                      alt="Clock Icon"
                      className="h-6 w-6 mr-2"
                    />
                    <p className="text-xl">
                      {startTime} - {endTime}
                    </p>
                  </div>
                </span>
              </div>
              <div className="text-xl">
                <p>{place_name}</p>
                <p>{street_address}</p>
              </div>
            </div>
            <JoinedUsers attendees={thisBeaconInfo[1]?.attendees || []} playersWanted={players_wanted} />
            {/* Old info section, keeping here just in case */}
            {/* <div className="flex items-center text-lg mb-2">
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
            </div> */}
            {/* End of old info section */}
          </div>
        </div>
        <img
          src={game_image}
          alt="Game Pic"
          className="absolute top-0 right-0 h-[7.5rem] w-[7.5rem] rounded-full mx-4"
        />
      </div>
      {/* {showControllerInfo && <ControllerInfo description={controllerInfo.description} onClose={handleInfoClick} />} */}
      <div className="flex justify-center">
        <button onClick={handleCommentsClick}>
          <span className="text-xl">Comments</span> <span className="text-base">{showComments ? '▲' : '▼'}</span>
        </button>
      </div>
      {showComments && <Comments beaconId={id} creatorId={host_id}/>}
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
    wanted: 4,
    joined: [
      {
        pic: "images/catMonster.jpg",
        username: "User 1",
        controllers: 2
      },
      {
        pic: "images/catWut.jpg",
        username: "User 2",
        controllers: 0
      },
      {
        pic: "images/catScream.jpg",
        username: "User 3",
        controllers: 1
      }
    ]
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