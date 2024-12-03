import { createContext, useState } from "react";

interface PlayerContextProps {
  autoPlay: boolean;
  setAutoPlay: (autoPlay: boolean) => void;
  autoNext: boolean;
  setAutoNext: (autoNext: boolean) => void;
  autoSkipIntro: boolean;
  setAutoSkipIntro: (autoSkipIntro: boolean) => void;
  videoServer: string;
  setVideoServer: (server: string) => void;
}

export const PlayerContext = createContext<PlayerContextProps | null>(null);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [autoPlay, setAutoPlay] = useState(true);
  const [autoNext, setAutoNext] = useState(true);
  const [autoSkipIntro, setAutoSkipIntro] = useState(true);
const [videoServer, setVideoServer] = useState("hd-1/sub");
  return (
    <PlayerContext.Provider
      value={{
        autoNext,
        autoPlay,
        autoSkipIntro,
        setAutoNext,
        setAutoPlay,
        setAutoSkipIntro,
        videoServer,
        setVideoServer,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
