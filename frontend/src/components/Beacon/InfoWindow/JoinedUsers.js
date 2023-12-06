import React from "react";

const JoinedUsers = ({ attendees, playersWanted }) => {
  // console.log("attendees");
  // console.log(attendees);
  const picClass = "h-12 w-12 rounded-full";

  const renderLayout = () => {
    const placeholders = Array(playersWanted - attendees.length).fill({
        avatar: "icons/question.jpg",
        username: "",
        controllers_brought: 0,
      });
      const users = attendees && attendees.length > 0 ? [...attendees, ...placeholders] : [...placeholders];
    switch (playersWanted) {
      case 2:
        return (
          <div className="flex flex-row justify-between items-start ml-16 mr-20">
            {users.map(
              (user, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-lg mb-2"
                >
                  <img src={user.avatar || "icons/defaultPFP.jpg"} alt="User Pic" className={picClass} />
                  <p className="text-xl">{user.username}</p>
                  {user.controllers_brought != null && user.controllers_brought > 0 && (
                    <div className="flex items-center">
                      <img
                        src="icons/controller.png"
                        alt="Controllers Icon"
                        className="h-7 w-7 mx-2"
                      />
                      <p className="text-xl">{user.controllers_brought}</p>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        );
      case 3:
        return (
          <div className="flex flex-row justify-between items-start mr-4">
            {users.map(
              (user, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-lg mb-2"
                >
                  <img src={user.avatar || "icons/defaultPFP.jpg"} alt="User Pic" className={picClass} />
                  <p className="text-xl">{user.username}</p>
                  {user.controllers_brought != null && user.controllers_brought > 0 && (
                    <div className="flex items-center">
                      <img
                        src="icons/controller.png"
                        alt="Controllers Icon"
                        className="h-7 w-7 mx-2"
                      />
                      <p className="text-xl">{user.controllers_brought}</p>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-2 gap-2">
            {users.map(
              (user, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-lg mb-2"
                >
                  <img src={user.avatar || "icons/defaultPFP.jpg"} alt="User Pic" className={picClass} />
                  <p className="text-xl">{user.username}</p>
                  {user.controllers_brought != null && user.controllers_brought > 0 && (
                    <div className="flex items-center">
                      <img
                        src="icons/controller.png"
                        alt="Controllers Icon"
                        className="h-7 w-7 mx-2"
                      />
                      <p className="text-xl">{user.controllers_brought}</p>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        );
      case 5:
        return (
          <div className="grid grid-rows-2 gap-4">
            <div className="flex flex-row justify-between items-start mr-4">
              {users
                .slice(0, 3)
                .map((user, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-lg mb-2"
                  >
                    <img src={user.avatar || "icons/defaultPFP.jpg"} alt="User Pic" className={picClass} />
                    <p className="text-xl">{user.username}</p>
                    {user.controllers_brought != null && user.controllers_brought > 0 && (
                      <div className="flex items-center">
                        <img
                          src="icons/controller.png"
                          alt="Controllers Icon"
                          className="h-7 w-7 mx-2"
                        />
                        <p className="text-xl">{user.controllers_brought}</p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
            <div className="flex flex-row justify-between items-start ml-16 mr-20">
              {users
                .slice(3, 5)
                .map((user, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-lg mb-2"
                  >
                    <img src={user.avatar || "icons/defaultPFP.jpg"} alt="User Pic" className={picClass} />
                    <p className="text-xl">{user.username}</p>
                    {user.controllers_brought != null && user.controllers_brought > 0 && (
                      <div className="flex items-center">
                        <img
                          src="icons/controller.png"
                          alt="Controllers Icon"
                          className="h-7 w-7 mx-2"
                        />
                        <p className="text-xl">{user.controllers_brought}</p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="grid grid-rows-2 gap-4">
            <div className="flex flex-row justify-between items-start mr-4">
              {users
                .slice(0, 3)
                .map((user, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-lg mb-2"
                  >
                    <img src={user.avatar || "icons/defaultPFP.jpg"} alt="User Pic" className={picClass} />
                    <p className="text-xl">{user.username}</p>
                    {user.controllers_brought != null && user.controllers_brought > 0 && (
                      <div className="flex items-center">
                        <img
                          src="icons/controller.png"
                          alt="Controllers Icon"
                          className="h-7 w-7 mx-2"
                        />
                        <p className="text-xl">{user.controllers_brought}</p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
            <div className="flex flex-row justify-between items-start mr-4">
              {users
                .slice(3, 6)
                .map((user, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-lg mb-2"
                  >
                    <img src={user.avatar || "icons/defaultPFP.jpg"} alt="User Pic" className={picClass} />
                    <p className="text-xl">{user.username}</p>
                    {user.controllers_brought != null && user.controllers_brought > 0 && (
                      <div className="flex items-center">
                        <img
                          src="icons/controller.png"
                          alt="Controllers Icon"
                          className="h-7 w-7 mx-2"
                        />
                        <p className="text-xl">{user.controllers_brought}</p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        );
      case 7:
        return (
          <div className="grid grid-rows-3 gap-4">
            <div className="flex flex-row justify-between items-start ml-16 mr-20">
              {users
                .slice(0, 2)
                .map((user, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-lg mb-2"
                  >
                    <img src={user.avatar || "icons/defaultPFP.jpg"} alt="User Pic" className={picClass} />
                    <p className="text-xl">{user.username}</p>
                    {user.controllers_brought != null && user.controllers_brought > 0 && (
                      <div className="flex items-center">
                        <img
                          src="icons/controller.png"
                          alt="Controllers Icon"
                          className="h-7 w-7 mx-2"
                        />
                        <p className="text-xl">{user.controllers_brought}</p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
            <div className="flex flex-row justify-between items-start mr-4">
              {users
                .slice(2, 5)
                .map((user, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-lg mb-2"
                  >
                    <img src={user.avatar || "icons/defaultPFP.jpg"} alt="User Pic" className={picClass} />
                    <p className="text-xl">{user.username}</p>
                    {user.controllers_brought != null && user.controllers_brought > 0 && (
                      <div className="flex items-center">
                        <img
                          src="icons/controller.png"
                          alt="Controllers Icon"
                          className="h-7 w-7 mx-2"
                        />
                        <p className="text-xl">{user.controllers_brought}</p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
            <div className="flex flex-row justify-between items-start ml-16 mr-20">
              {users
                .slice(5, 7)
                .map((user, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-lg mb-2"
                  >
                    <img src={user.avatar || "icons/defaultPFP.jpg"} alt="User Pic" className={picClass} />
                    <p className="text-xl">{user.username}</p>
                    {user.controllers_brought != null && user.controllers_brought > 0 && (
                      <div className="flex items-center">
                        <img
                          src="icons/controller.png"
                          alt="Controllers Icon"
                          className="h-7 w-7 mx-2"
                        />
                        <p className="text-xl">{user.controllers_brought}</p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        );
      case 8:
        return (
          <div className="grid grid-rows-3 gap-4">
            <div className="flex flex-row justify-between items-start mr-4">
              {users
                .slice(0, 3)
                .map((user, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-lg mb-2"
                  >
                    <img src={user.avatar || "icons/defaultPFP.jpg"} alt="User Pic" className={picClass} />
                    <p className="text-xl">{user.username}</p>
                    {user.controllers_brought != null && user.controllers_brought > 0 && (
                      <div className="flex items-center">
                        <img
                          src="icons/controller.png"
                          alt="Controllers Icon"
                          className="h-7 w-7 mx-2"
                        />
                        <p className="text-xl">{user.controllers_brought}</p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
            <div className="flex flex-row justify-between items-start ml-16 mr-20">
              {users
                .slice(3, 5)
                .map((user, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-lg mb-2"
                  >
                    <img src={user.avatar || "icons/defaultPFP.jpg"} alt="User Pic" className={picClass} />
                    <p className="text-xl">{user.username}</p>
                    {user.controllers_brought != null && user.controllers_brought > 0 && (
                      <div className="flex items-center">
                        <img
                          src="icons/controller.png"
                          alt="Controllers Icon"
                          className="h-7 w-7 mx-2"
                        />
                        <p className="text-xl">{user.controllers_brought}</p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
            <div className="flex flex-row justify-between items-start mr-4">
              {users
                .slice(5, 8)
                .map((user, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-lg mb-2"
                  >
                    <img src={user.avatar || "icons/defaultPFP.jpg"} alt="User Pic" className={picClass} />
                    <p className="text-xl">{user.username}</p>
                    {user.controllers_brought != null && user.controllers_brought > 0 && (
                      <div className="flex items-center">
                        <img
                          src="icons/controller.png"
                          alt="Controllers Icon"
                          className="h-7 w-7 mx-2"
                        />
                        <p className="text-xl">{user.controllers_brought}</p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        );
      case 9:
        return (
          <div className="grid grid-rows-3 gap-4">
            <div className="flex flex-row justify-between items-start mr-4">
              {users.slice(0, 3).map((user, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-lg mb-2"
                >
                  <img src={user.avatar || "icons/defaultPFP.jpg"} alt="User Pic" className={picClass} />
                  <p className="text-xl">{user.username}</p>
                  {user.controllers_brought != null && user.controllers_brought > 0 && (
                    <div className="flex items-center">
                      <img
                        src="icons/controller.png"
                        alt="Controllers Icon"
                        className="h-7 w-7 mx-2"
                      />
                      <p className="text-xl">{user.controllers_brought}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-row justify-between items-start mr-4">
              {users.slice(3, 6).map((user, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-lg mb-2"
                >
                  <img src={user.avatar || "icons/defaultPFP.jpg"} alt="User Pic" className={picClass} />
                  <p className="text-xl">{user.username}</p>
                  {user.controllers_brought != null && user.controllers_brought > 0 && (
                    <div className="flex items-center">
                      <img
                        src="icons/controller.png"
                        alt="Controllers Icon"
                        className="h-7 w-7 mx-2"
                      />
                      <p className="text-xl">{user.controllers_brought}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-row justify-between items-start mr-4">
              {users.slice(6, 9).map((user, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-lg mb-2"
                >
                  <img src={user.avatar || "icons/defaultPFP.jpg"} alt="User Pic" className={picClass} />
                  <p className="text-xl">{user.username}</p>
                  {user.controllers_brought != null && user.controllers_brought > 0 && (
                    <div className="flex items-center">
                      <img
                        src="icons/controller.png"
                        alt="Controllers Icon"
                        className="h-7 w-7 mx-2"
                      />
                      <p className="text-xl">{user.controllers_brought}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <>
            {users.map(
              (user, index) => (
                <div key={index} className="flex items-center text-lg mb-2">
                  <img
                    src={user.pic}
                    alt="User Pic"
                    className="h-9 w-9 mr-4 rounded-full"
                  />
                  <p className="text-xl">{user.username}</p>
                  {user.controllers_brought != null && user.controllers_brought > 0 && (
                    <div className="ml-4 flex items-center">
                      <img
                        src="icons/controller.png"
                        alt="Controllers Icon"
                        className="h-7 w-7 mx-2"
                      />
                      <p className="text-xl">{user.controllers_brought}</p>
                    </div>
                  )}
                </div>
              )
            )}
          </>
        );
    }
  };

  return <>{renderLayout()}</>;
};

JoinedUsers.defaultProps = {
  attendees: {
    available: 2,
    wanted: 4,
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
  },
};

export default JoinedUsers;
