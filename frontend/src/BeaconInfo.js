import React from 'react';

const BeaconInfo = ({ username, startTime, endTime, gameTitle, miscInfo, gamePic }) => {
    return (
        <div className="bg-white rounded-lg w-full max-w-md mx-auto shadow-lg my-5 p-10 flex justify-between">
            <div className='ml-20 text-left' >
                <h1 className="text-2xl font-bold mb-2">{username}</h1>
                <h2 className="text-xl mb-2">{gameTitle}</h2>
                <p className="mb-2">{startTime} - {endTime}</p>
                <p className="mb-2">Misc Info: <span className="font-light">{miscInfo}</span></p>
            </div>
            <img src={gamePic} alt="Game Pic" className="top-0 right-0 h-16 w-16 rounded-full" />
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