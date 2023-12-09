import React, { useEffect } from "react";
import { OverlayView } from "@react-google-maps/api";

function CustomMarker({ position, gameImage, map }) {
  const [img, setImg] = React.useState(null);

  useEffect(() => {
    setImg(new Image());
    img.src = gameImage;
  }, [gameImage]);

  return (
    <OverlayView
      position={position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      map={map}
    >
      <div
        style={{
          width: "65px",
          height: "65px",
          borderRadius: "50%",
          backgroundImage: `url(${gameImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </OverlayView>
  );
}

export default CustomMarker;
