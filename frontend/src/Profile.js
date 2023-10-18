import React from "react";

const Profile = ({ profilePic, username, favList, currentList }) => {
  const picStyles = "w-24 h-36 mx-2";

  return (
    <>
      <div className="bg-white rounded-lg w-full max-w-4xl mx-auto shadow-lg p-5">
        <div className="flex items-baseline mb-7">
          <img className="w-18 h-24" src={profilePic} alt="Profile Pic" />
          <h1 className="mx-5 font-semibold text-2xl">{username}</h1>
        </div>
        <div className="flex justify-between px-7">
          <div className="flex-col">
            <h1 className="font-bold text-xl">Favorite Games</h1>
            <div className="flex justify-between">
              {favList.map((image, index) => (
                <img
                  key={index}
                  className={picStyles}
                  src={image}
                  alt={`Fav Game ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <div>
            <h1 className="font-bold text-xl">What I'm currently playing</h1>
            <div className="flex justify-between">
              {currentList.map((image, index) => (
                <img
                  key={index}
                  className={picStyles}
                  src={image}
                  alt={`Current Game ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="text-left">
            <h1>New Section</h1>
        </div>
      </div>
    </>
  );
};

Profile.defaultProps = {
  profilePic: "images/catScream.jpg",
  username: "username",
  favList: ["games/smashMelee.jpg", "games/ori.jpg", "games/bg3.jpg"],
  currentList: [
    "games/pokemonSV.jpg",
    "games/mgr.jpg",
    "games/smashUltimate.jpg",
  ],
};

export default Profile;
