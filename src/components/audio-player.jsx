import { useRef, useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'react-feather';
import { Button } from './Button'; // Assuming a Button component exists
import Visualizer from './visualizer'; // Assuming a Visualizer component exists

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

const AudioPlayer = ({ audioSrc }) => {
  const audioRef = useRef(null);
  const analyserRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = new Audio(audioSrc);
    audioRef.current = audio;
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const source = context.createMediaElementSource(audio);
    analyserRef.current = context.createAnalyser();
    source.connect(analyserRef.current);
    analyserRef.current.connect(context.destination);

    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });

    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });

    return () => {
      audio.removeEventListener('timeupdate', () => {});
      audio.removeEventListener('loadedmetadata', () => {});
    };
  }, [audioSrc]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className="w-full max-w-[300px] mx-auto bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur rounded-xl p-4">
      <div className="mb-4 h-24 rounded-lg overflow-hidden bg-black/20">
        {analyserRef.current && <Visualizer analyser={analyserRef.current} />}
      </div>

      <div className="mb-4">
        <input
          type="range"
          value={currentTime}
          max={duration}
          onChange={handleProgressChange}
          className="w-full h-1 bg-gray-600/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-lg border border-gray-700 bg-black/50 hover:bg-gray-800 hover:border-cyan-500/50 transition-all"
          onClick={() => audioRef.current?.load()}
        >
          <RotateCcw className="h-4 w-4 text-gray-400" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full bg-gradient-to-tr from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-cyan-600 border-0 transition-all duration-300"
          onClick={togglePlayPause}
        >
          {isPlaying ? <Pause className="h-6 w-6 text-white" /> : <Play className="h-6 w-6 text-white ml-1" />}
        </Button>
      </div>
    </div>
  );
};

export default AudioPlayer;
