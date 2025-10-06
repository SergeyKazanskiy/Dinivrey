import React from "react";
import { BACKEND_APP_IMAGES_URL } from '../shared/constants'


const levelColors = ["gold","silver","#cd7f32"]

interface AnimatedIconProps {
  uri: string;
  label: string;
}

export const AchieveImage: React.FC<AnimatedIconProps> = ({ uri, label}) => {

  return (
    <svg viewBox="0 0 100 100" width="80" height="80">
      <image href={BACKEND_APP_IMAGES_URL + `/achieves/images/${uri}.png`} x="20" y="20" width="60" height="60" clipPath="circle(30px)" />
      <circle cx="50" cy="50" r="30" stroke='gray' strokeWidth="8" fill="white" fill-opacity="1%" />
      <text x="50" y="98" textAnchor="middle" fontSize="16" fill="#F29F56" fontWeight="medium">{label}</text>
    </svg>
  );
};

/*
{rare && <polygon points="17,60 10,50 6,30 15,40" fill="violet" strokeWidth='2px' stroke="red"/>}
      {rare && <polygon points="83,60 90,50 94,30 85,40" fill="violet" strokeWidth='2px' stroke="red" />}
*/