"use client";

import Image from "next/image";
import pfpcollege from "../public/pfp college.png"
import { ReactTyped } from 'react-typed';
import { FaSquareWhatsapp } from "react-icons/fa6";


export default function Home() {
  return (
    <div className="divide-y divide-teal-300 dark:divide-gray-700">
      <div className="space-y-2 pt-5 pb-8 md:space-x-5">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-10">
        Home
        </h1>
    </div>

    <div className=" items-center space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-3 xl:space-y-0">

      {/* pic and slight introduction about me */}
      <div className="flex flex-col items-center pt-8 ">
        <Image src={pfpcollege} alt="pfp" width={500} height={500} className=" rounded-full h-48 w-48 object-cover object-top"/>
        <h3 className="pt-4 pb-2 md:text-3xl text-2xl font-bold leading-8 tracking-tight">Sayed Ali</h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-center text-xl">
          Hey i&apos;m Sayed and i am a Front-end web developer using
          <ReactTyped   className=' text-xl font-bold  pl-2 dark:text-teal-500 text-teal-800'
  strings={['React.js' , 'Next.js' , 'Tailwind CSS','JavaScript','TypeScript','Sanity' ,'CSS']} 
  typeSpeed={140} backSpeed={100} loop/>
        </p>

        {/* my socials links */}
        <div className="flex space-x-5 pt-6">
          <a href="https://github.com/sayed-54" rel="noopener" target="_blank">
          <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
     className=" w-8 h-8 text-teal-950 hover:text-teal-500 dark:text-teal-500 dark:hover:text-teal-700"
    >
      <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7
       15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5
        34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3
         33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8
          48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0138.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227
           304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z" />
    </svg>
          </a>
          
          <a href="https://www.linkedin.com/in/sayed-ali-03bb2a326/" rel="noopener" target="_blank">
          <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
     className=" w-8 h-8 text-teal-950 hover:text-teal-500 dark:text-teal-500 dark:hover:text-teal-700"
    >
      <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM349.3 793.7H230.6V411.9h118.7v381.8zm-59.3-434a68.8 68.8 0 1168.8-68.8c-.1 38-30.9 68.8-68.8 68.8zm503.7 434H675.1V608c0-44.3-.8-101.2-61.7-101.2-61.7 0-71.2 48.2-71.2 98v188.9H423.7V411.9h113.8v52.2h1.6c15.8-30 54.5-61.7 112.3-61.7 120.2 0 142.3 79.1 142.3 181.9v209.4z" />
    </svg>
          </a>
          
          <a href="mailto:sayedewas1234@gmail.com" rel="noopener" target="_blank">
          <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
     className=" w-8 h-8 text-teal-950 hover:text-teal-500 dark:text-teal-500 dark:hover:text-teal-700"
    >
            <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-80.8 
            108.9L531.7 514.4c-7.8 6.1-18.7 6.1-26.5 0L189.6 268.9A7.2 7.2 0 01194 256h648.8a7.2 7.2 0 014.4 12.9z" />

    </svg>
          </a>
  
          <a href="https://x.com/Urfav1Slayer" rel="noopener" target="_blank">
          <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
     className=" w-8 h-8 dark:text-teal-500 dark:hover:text-teal-700 text-teal-950 hover:text-teal-500"
    >
      <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM727.3 401.7c.3 4.7.3 9.6.3 14.4 0 146.8-111.8 315.9-316.1 315.9-63 0-121.4-18.3-170.6-49.8 9 1 17.6 1.4 26.8 1.4 52 0 99.8-17.6 137.9-47.4-48.8-1-89.8-33-103.8-77 17.1 2.5 32.5 2.5 50.1-2a111 111 0 01-88.9-109v-1.4c14.7 8.3 32 13.4 50.1 14.1a111.13 111.13 0 01-49.5-92.4c0-20.7 5.4-39.6 15.1-56a315.28 315.28 0 00229 116.1C492 353.1 548.4 292 616.2 292c32 0 60.8 13.4 81.1 35 25.1-4.7 49.1-14.1 70.5-26.7-8.3 25.7-25.7 47.4-48.8 61.1 22.4-2.4 44-8.6 64-17.3-15.1 22.2-34 41.9-55.7 57.6z" />


    </svg>
          </a>
          <a href="https://wa.me/201018102365" rel="noopener" target="_blank">
         <FaSquareWhatsapp      className=" w-8 h-8 dark:text-teal-500 dark:hover:text-teal-700 text-teal-950 hover:text-teal-500"
 />
          </a>

        </div>
        

      </div>
      <div className=" prose max-w-none prose-lg pt-8 pb-8 dark:prose-invert xl:col-span-2">

      <p>Hey everyone, I&apos;m Sayed, a 22 years old Front-End Developer from Egypt.
         I love creating responsive, user-friendly websites using <span className="text-teal-500 font-bold text-xl">Next.js</span> and 
         <span className="text-teal-500 font-bold text-xl pl-1">TypeScript</span>. When I discovered Next.js,
         I was blown away by its speed, interactivity, and how it simplifies routing.
         It&apos;s now my go-to tool for building dynamic web applications that look great and work seamlessly.</p>

      <p>
        I&apos;m passionate about blending design and technology to create projects that are both functional and visually appealing.
        From smooth animations to performance optimization and accessibility enhancements, I strive to make the web a better place.
        I&apos;m also dedicated to continuous learning, staying updated with the latest trends,
        and engaging with the tech community in Egypt through open-source contributions.
     </p>
     
     <p>
        Thanks for visiting my portfolio! If you&apos;re looking for a developer who&apos;s passionate about building high-quality,
        responsive websites, feel free to get in touch.</p>

      </div>

    </div>

    </div>  
);
}
