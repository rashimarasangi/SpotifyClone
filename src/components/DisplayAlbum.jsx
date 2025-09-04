import React from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { albumsData, assets, songsData } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const DisplayAlbum = () => {
  const { id } = useParams();
  const { playWithId } = useAppContext();
  const albumData = albumsData[id];
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to bottom, ${albumData.bgColor} 0%, rgba(128,128,128,0.2) 100%)`,
      }}
      className="p-4">
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end ">
        <img className="w-48 rounded" src={albumData.image} alt="" />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {albumData.name}
          </h2>
          <h4>{albumData.desc}</h4>
          <p className="mt-1 flex gap-2">
            <img
              className="inline-block w-5"
              src={assets.spotify_logo}
              alt=""
            />
            <b>Spotify</b>
            •1,235,345 likes •<b>50 songs</b>
            about 2hr 30min
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>Title
        </p>
        <p>Description</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="" />
      </div>
      <hr />
      {songsData.map((item) => (
        <div
          onClick={() => playWithId(item.id)}
          key={item.id}
          className="grid grid-cols-3 sm:grid-cols-4 mt-2 pl-2  items-center hover:bg-[#262626] cursor-pointer">
          <p className="text-white">
            <b className="mr-4 text-[#a7a7a7]">{item.id + 1}</b>
            <img className="inline w-10 mr-5" src={item.image} alt="" />
            {item.name}
          </p>
          <p>{item.desc.slice(0, 12)}</p>
          <p className="hidden sm:block">5 days ago</p>
          <p className="m-auto w-4">{item.duration}</p>
        </div>
      ))}
    </div>
  );
};

export default DisplayAlbum;
