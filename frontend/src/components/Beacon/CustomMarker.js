import React from 'react';

const CustomMarker = ({ gameImage }) => {
 const style = {
   borderRadius: '50%',
   width: '65px',
   height: '65px',
 };

 return <img src={gameImage} style={style} alt="game" />;
};

export default CustomMarker;