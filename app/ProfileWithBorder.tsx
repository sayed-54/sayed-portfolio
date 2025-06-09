import { useState } from "react";
import Image from "next/image";
import pfpcollege from "../public/pfp college.png"; // adjust as needed

export default function ProfilePicture() {
  const [clicked, setClicked] = useState(false);

  return (
    <div
      className={`rotating-border-wrapper ${clicked ? "clicked" : ""}`}
      onClick={() => setClicked(!clicked)}
    >
      <div className="rotating-border"></div>
      <Image
        src={pfpcollege}
        alt="Sayed Ali"
        width={500}
        height={500}
        className="profile-image"
        priority
      />
    </div>
  );
}
