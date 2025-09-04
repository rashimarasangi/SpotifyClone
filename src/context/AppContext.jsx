import {
  Children,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { songsData } from "../assets/assets";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(songsData[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      seconds: 0,
      minutes: 0,
    },
    totalTime: {
      seconds: 0,
      minutes: 0,
    },
  });

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const playWithId = async (id) => {
    await setTrack(songsData[id]);
    await audioRef.current.play();
    setIsPlaying(true);
  };
  const nextSong = async () => {
    if (track.id >= 0) {
      await setTrack(songsData[track.id + 1]);
      await audioRef.current.play();
      setIsPlaying(true);
    }
  };
  const prevSong = async () => {
    if (track.id < songsData.length - 1) {
      await setTrack(songsData[track.id - 1]);
      await audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const seekSong = (e) => {
    if (!audioRef.current || !seekBg.current) return;
    const width = seekBg.current.clientWidth;
    const offsetX = e.nativeEvent.offsetX;
    const percent = (offsetX / width) * 100;
    audioRef.current.currentTime = (percent / 100) * audioRef.current.duration;
    seekBar.current.style.width = `${percent}%`;
  };

  useEffect(() => {
    if (!audioRef.current || !seekBar.current) return;

    audioRef.current.ontimeupdate = () => {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;

      if (!isNaN(duration) && duration > 0) {
        // Update time state
        setTime({
          currentTime: {
            seconds: Math.floor(current % 60),
            minutes: Math.floor(current / 60),
          },
          totalTime: {
            seconds: Math.floor(duration % 60),
            minutes: Math.floor(duration / 60),
          },
        });

        // Update seek bar width
        seekBar.current.style.width = `${Math.floor(
          (current / duration) * 100
        )}%`;
      }
    };
  }, []);

  const value = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    isPlaying,
    setIsPlaying,
    time,
    setTime,
    play,
    pause,
    nextSong,
    prevSong,
    playWithId,
    seekSong,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
