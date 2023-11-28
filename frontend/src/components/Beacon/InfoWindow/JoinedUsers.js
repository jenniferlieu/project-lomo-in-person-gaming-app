import React from "react";

const JoinedUsers = ({ playerInfo }) => {
  return (
    <>
      {(playerInfo.joined || this.defaultProps.playerInfo.joined).map((user, index) => (
        <div key={index} className="flex items-center text-lg mb-2">
          <img
            src={user.pic}
            alt="User Pic"
            className="h-9 w-9 mr-4 rounded-full"
          />
          <p className="text-xl">{user.username}</p>
          {user.controllers > 0 && (
            <div className="ml-4 flex items-center">
              <img
                src="icons/controller.png"
                alt="Controllers Icon"
                className="h-7 w-7 mx-2"
              />
              <p className="text-xl">{user.controllers}</p>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

JoinedUsers.defaultProps = {
  joined: [
    {
      pic: "images/catMonster.jpg",
      username: "User 1",
      controllers: 2,
    },
    {
      pic: "images/catWut.jpg",
      username: "User 2",
      controllers: 0,
    },
    {
      pic: "images/catScream.jpg",
      username: "User 3",
      controllers: 1,
    },
  ],
};

export default JoinedUsers;
