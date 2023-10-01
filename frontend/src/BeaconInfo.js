import React from 'react';

const BeaconInfo = ({ username, startTime, endTime, gameTitle, miscInfo, gamePic }) => {
    return (
        <div className="bg-white rounded-lg p-4 w-full max-w-md mx-auto shadow-lg mt-5">
            <img src={gamePic} alt="Game Pic" className="top-0 right-0 text-right h-16 w-16 rounded-full" />
            <h1 className="text-2xl font-bold mb-2">{username}</h1>
            <h2 className="text-xl mb-2">{gameTitle}</h2>
            <p className="mb-2">Start Time: <span className="font-light">{startTime}</span></p>
            <p className="mb-2">End Time: <span className="font-light">{endTime}</span></p>
            <p className="mb-2">Misc Info: <span className="font-light">{miscInfo}</span></p>
        </div>
    )
};

BeaconInfo.defaultProps = {
    username: "username",
    startTime: "start",
    endTime: "end",
    gameTitle: "game title",
    miscInfo: "misc info",
    gamePic: "images/catCry.jpg"
};

export default BeaconInfo;