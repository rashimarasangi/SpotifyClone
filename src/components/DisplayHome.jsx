import React from "react";
import Navbar from "./Navbar";
import { albumsData, songsData } from "../assets/assets";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";

const DisplayHome = () => {
  return (
    <>
      <Navbar />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto">
          {albumsData.map((item) => (
            <AlbumItem
              key={item.id}
              name={item.name}
              image={item.image}
              desc={item.desc}
              id={item.id}
            />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today's Big Hits</h1>
        <div className="flex overflow-auto">
          {songsData.map((item) => (
            <SongItem
              key={item.id}
              name={item.name}
              image={item.image}
              desc={item.desc}
              id={item.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
