import React from "react";

const Profile = ({ profilePic, username, favList, currentList, systemList, genreList }) => {
  const gamePicStyles = "w-24 h-36 mx-2";
  const titleStyles = "font-bold text-xl";
  const consolePicStyles = "w-28 h-28 mx-2";

  return (
    <>
      <div className="bg-white rounded-lg w-full max-w-4xl mx-auto shadow-lg p-5">
        <div className="flex items-baseline mb-7">
          <img className="w-20 h-28" src={profilePic} alt="Profile Pic" />
          <h1 className="mx-5 font-semibold text-3xl">{username}</h1>
        </div>
        <div className="flex justify-between px-7">
          <div className="flex-col">
            <h1 className={titleStyles}>Favorite Games</h1>
            <div className="flex justify-between">
              {favList.map((image, index) => (
                <img
                  key={index}
                  className={gamePicStyles}
                  src={image}
                  alt={`Fav Game ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <div>
            <h1 className={titleStyles}>What I'm currently playing</h1>
            <div className="flex justify-between">
              {currentList.map((image, index) => (
                <img
                  key={index}
                  className={gamePicStyles}
                  src={image}
                  alt={`Current Game ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between px-12 mt-7">
          <div className="flex-col">
            <h1 className={titleStyles}>Preferred Systems</h1>
            <div className="flex justify-between">
              {systemList.map((image, index) => (
                <img
                  key={index}
                  className={consolePicStyles}
                  src={image}
                  alt={`Preferred System ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="flex-col">
            <h1 className={titleStyles}>Preferred Genres</h1>
            <div className="grid grid-cols-2 gap-1.5 text-left">
              {genreList.map((genre, index) => (
                <h2 key={index} className="">{genre}</h2>
              ))}
            </div>
          </div>
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
  systemList: [
    "systems/xbox.png",
    "systems/switch.png"
  ],
  genreList: [
    "2D platformers",
    "Party Games",
    "Fighting Games",
    "First Person Shooters",
    "Another Genre",
    "Some other Genre",
    "Soulslikes",
    "Roguelikes"
  ]
};

export default Profile;
