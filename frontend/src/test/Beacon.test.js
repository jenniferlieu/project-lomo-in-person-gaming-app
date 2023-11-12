import React from "react";
import { render } from "@testing-library/react";
import MapContainer from "../MapContainer";

describe("MapContainer", () => {
  it("renders correct number of Beacon components", async () => {
    const beaconList = [
      {
        circleLat: 40,
        circleLng: -75,
      },
      {
        beaconInfo: {
          miscInfo: "fahgettaboudit",
          username: "amofro",
          gamePic: "images/catScream.jpg",
          userPic: "images/catMonster.jpg",
        },
      },
      {
        circleLat: 40.05,
        circleLng: -75.1,
        beaconInfo: {
          miscInfo: "AYYYYYY fahgettaboudit",
          username: "abkrivo",
          gamePic: "images/catWut.png",
          userPic: "images/catScream.jpg",
        },
      },
    ];

    const { findAllByTestId } = render(<MapContainer beaconList={beaconList} />);
    const beaconElements = await findAllByTestId('beacon');

    expect(beaconElements.length).toBe(beaconList.length);
  });
});
