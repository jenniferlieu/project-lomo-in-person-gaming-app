
function GetBeaconList() {
    // define url and headers
    let url = "http://localhost/api/beacons";
    let logindata = {
      email: "pikachu@test.com",
      password: "secret1234",
    };
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + authUser,
      },
      body: JSON.stringify(data),
    };

    // make api call
    fetch(url, options)
    //   .then((response) => {
    //     const responseclone = response.clone();
    //     if (responseclone.ok) {
    //       displayText("Beacon Confirmed!");
    //       return responseclone;
    //     }
    //   })

    //   .then((response) => response.json())
      .then((response) => {
        console.log("response", response);
      })

      .catch((error) => console.log("error", error));
    return
}