'use client';

import { useState, useRef, useEffect } from 'react';
import Button from './Button';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Shuffle } from 'lucide-react';

export default function AudioVisualizer({ file }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState(null);

  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    audio.src = URL.createObjectURL(file);

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleCanPlay = () => {
      setError(null);
      if (!audioContextRef.current) {
        try {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          audioContextRef.current = new AudioContext();
          analyserRef.current = audioContextRef.current.createAnalyser();
          analyserRef.current.fftSize = 512;
          sourceRef.current = audioContextRef.current.createMediaElementSource(audio);
          sourceRef.current.connect(analyserRef.current);
          analyserRef.current.connect(audioContextRef.current.destination);
        } catch (err) {
          console.error('Error setting up audio context:', err);
          setError('Failed to initialize audio. Please try again.');
        }
      }
    };

    const handleError = () => {
      setError('Error loading audio. Please try another file.');
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      URL.revokeObjectURL(audio.src);
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [file]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      cancelAnimationFrame(animationRef.current);
    } else {
      audio.play().catch((error) => {
        console.error('Error playing audio:', error);
        setError('Failed to play audio. Please try again.');
      });
      animate();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const animate = () => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = 'rgba(16, 16, 48, 0.15)';
      ctx.fillRect(0, 0, width, height);

      const time = Date.now() / 1000;
      const radius = Math.min(width, height) * 0.3;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = '#10102F';
      ctx.fill();

      for (let i = 0; i < bufferLength; i++) {
        const amplitude = dataArray[i] / 255.0;
        const angle = (i / bufferLength) * Math.PI * 2;
        const length = radius * (0.4 + amplitude * 0.6);

        ctx.beginPath();
        ctx.moveTo(
          centerX + Math.cos(angle + time) * radius * 0.3,
          centerY + Math.sin(angle + time) * radius * 0.3
        );
        ctx.lineTo(
          centerX + Math.cos(angle + time) * (length + 50),
          centerY + Math.sin(angle + time) * (length + 50)
        );
        ctx.strokeStyle = `rgba(0, 255, 255, ${amplitude * 0.8})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(
          centerX + Math.cos(-angle + time * 0.5) * radius * 0.3,
          centerY + Math.sin(-angle + time * 0.5) * radius * 0.3
        );
        ctx.lineTo(
          centerX + Math.cos(-angle + time * 0.5) * (length + 30),
          centerY + Math.sin(-angle + time * 0.5) * (length + 30)
        );
        ctx.strokeStyle = `rgba(255, 0, 128, ${amplitude * 0.8})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      for (let i = 0; i < 5; i++) {
        const triangleAngle = time * 0.2 + (i * Math.PI * 2) / 5;
        const triangleRadius = radius * 1.5;

        ctx.beginPath();
        ctx.moveTo(
          centerX + Math.cos(triangleAngle) * triangleRadius,
          centerY + Math.sin(triangleAngle) * triangleRadius
        );
        ctx.lineTo(
          centerX + Math.cos(triangleAngle + 0.4) * triangleRadius * 0.7,
          centerY + Math.sin(triangleAngle + 0.4) * triangleRadius * 0.7
        );
        ctx.lineTo(
          centerX + Math.cos(triangleAngle - 0.4) * triangleRadius * 0.7,
          centerY + Math.sin(triangleAngle - 0.4) * triangleRadius * 0.7
        );
        ctx.closePath();
        ctx.strokeStyle = 'rgba(128, 0, 255, 0.3)';
        ctx.stroke();
      }
    };

    draw();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#10102F]">
      <div className="relative w-full h-full flex flex-col">
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          className="w-full h-[85vh] rounded-xl bg-[#10102F] object-cover"
        />

        <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md rounded-b-xl p-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="text-cyan-400">
                <h2 className="text-xl font-bold truncate">{file.name}</h2>
                <p className="text-sm opacity-70">Visualizing Audio</p>
              </div>
              {error && <p className="text-red-500">{error}</p>}
            </div>

            <div className="flex items-center justify-between mb-4 text-pink-500">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <Button variant="ghost" size="icon" className="text-cyan-400 hover:text-cyan-300">
                <Shuffle className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-cyan-400 hover:text-cyan-300">
                <SkipBack className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={togglePlayPause}
                className="bg-pink-500 text-white hover:bg-pink-400 rounded-full w-16 h-16 flex items-center justify-center"
              >
                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
              </Button>
              <Button variant="ghost" size="icon" className="text-cyan-400 hover:text-cyan-300">
                <SkipForward className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="text-cyan-400 hover:text-cyan-300">
                <Repeat className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center mt-4">
              <Button variant="ghost" size="icon" onClick={toggleMute} className="text-cyan-400 hover:text-cyan-300">
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

