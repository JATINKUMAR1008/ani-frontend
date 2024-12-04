import { useEffect, useRef } from "react";
import videojs from "video.js";
import type Player from "video.js/dist/types/player";
interface PlayerProps {
  props: {
    options: any;
    onReady: (player: Player) => void;
    markers?: {
      intro?: { start: number; end: number };
      outro?: { start: number; end: number };
    };
  };
}

export const VPlayer = ({ props }: PlayerProps) => {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);
  const { options, onReady, markers } = props;

  useEffect(() => {
    if (!playerRef.current) {
      const videoEle = document.createElement("video-js");
      videoEle.classList.add("vjs-big-play-centered");
      videoEle.classList.add("vjs-container");
      videoEle.classList.add("vjs-youtube-like");
      videoRef.current?.appendChild(videoEle);

      const player = (playerRef.current = videojs(videoEle, {
        ...options,
        userActions: {
          hotkeys: true,
          doubleClick: true
        },
        controlBar: {
          ...options.controlBar,
          volumePanel: {
            inline: true,
            volumeControl: {
              vertical: true
            }
          },
          children: [
            'playToggle',
            'currentTimeDisplay',
            'progressControl',
            'durationDisplay',
            'volumePanel',
            'playbackRateMenuButton',
            'captionsButton',
            'qualitySelector',
            'pictureInPictureToggle',
            'fullscreenToggle'
          ],
        },
      }, () => {
        videojs.log("Player is ready");
        onReady && onReady(player);
      }));
    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef, markers]);

  useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player className="w-full h-full">
      <div ref={videoRef} className="ms:max-w-[45%] mx-auto max-h-[55vh]"></div>
    </div>
  );
};
