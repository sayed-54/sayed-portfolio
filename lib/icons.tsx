import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as RiIcons from "react-icons/ri";
import * as BiIcons from "react-icons/bi";
import * as HiIcons from "react-icons/hi";
import * as MdIcons from "react-icons/md";
import React from 'react';

export const getDynamicIcon = (iconName: string, color?: string, size: number = 24) => {
  const families = [FaIcons, SiIcons, RiIcons, BiIcons, HiIcons, MdIcons];
  let IconComponent = null;

  for (const family of families) {
    if ((family as any)[iconName]) {
      IconComponent = (family as any)[iconName];
      break;
    }
  }

  if (IconComponent) {
    if (iconName === 'FaGithub') {
      return (
        <IconComponent
          size={size}
          className="text-slate-900 dark:text-slate-100"
        />
      );
    }
    return (
      <IconComponent
        size={size}
        style={{ color: color || "#14b8a6" }} // Fallback to teal-500
      />
    );
  }
  
  // Fallback to React icon if not found
  return <FaIcons.FaReact size={size} style={{ color: color || "#14b8a6" }} />;
};
