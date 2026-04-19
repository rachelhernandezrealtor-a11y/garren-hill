import React from 'react';
import SecondFloorFeature from './SecondFloorFeature';
import CinematicBridge from './CinematicBridge';


export default function UpperLevelSection() {
  return (
    <>
      <CinematicBridge
        fromImage="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/2eb818889_centerstairwellhouse.jpg"
        toImage="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/099cb9a82_secondfloorhallway.jpg"
        fromAlt="Center stairwell ascending"
        toAlt="Second floor hallway"
        caption="Ascending to the Upper Level"
      />

      <div id="second-floor">
        <SecondFloorFeature />
      </div>


    </>
  );
}