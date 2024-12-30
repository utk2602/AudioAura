import { useState, useRef } from "react";
import { curve, heroBackground } from "../assets";
import Button from "./Button";
import Section from "./Section";
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";
import { heroIcons } from "../constants";
import { ScrollParallax } from "react-just-parallax";
import Notification from "./Notification";
import AudioVisualizer from "./audio-visualizer";
import { Upload } from 'lucide-react';

const Hero = ({ onGetStarted }) => {
  const [audioFile, setAudioFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setAudioFile(file);
      console.log("Uploaded file:", file.name);
    }
  };

  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative">
        {/* Hero Header */}
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h1 className="h1 mb-6">
            Explore the Possibilities of&nbsp;Visualization &nbsp;working with{" "}
            <span className="inline-block relative">
              AudioAura{" "}
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h1>
          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
            Bring your music to life with AudioAura &nbsp;where sound meets
            stunning &nbsp;visuals.
          </p>
        </div>

        {/* File Upload and Visualization Section */}
        <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
          <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
            <div className="relative bg-n-8 rounded-[1rem]">
              <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />
              <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
                {!audioFile ? (
                  <div className="flex flex-col items-center justify-center h-full p-8">
                    <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-pink-500 text-transparent bg-clip-text">
                      Ready to Visualize?
                    </h2>
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={handleFileChange}
                      className="hidden"
                      ref={fileInputRef}
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full max-w-md h-32 flex flex-col items-center justify-center gap-4 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 hover:from-cyan-500/20 hover:to-pink-500/20 border border-cyan-500/20 rounded-xl transition-all duration-300 group"
                    >
                      <Upload className="w-10 h-10 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-lg font-medium bg-gradient-to-r from-cyan-400 to-pink-500 text-transparent bg-clip-text">
                        Upload Your Audio
                      </span>
                    </button>
                    <p className="mt-4 text-sm text-gray-400">
                      Supported formats: MP3, WAV, OGG
                    </p>
                  </div>
                ) : (
                  <AudioVisualizer file={audioFile} />
                )}
              </div>
            </div>
            <Gradient />
          </div>

          {/* Background Image */}
          <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]">
            <img
              src={heroBackground}
              className="w-full"
              width={1440}
              height={1800}
              alt="hero background"
            />
          </div>

          <BackgroundCircles />
        </div>
      </div>

      <BottomLine />
    </Section>
  );
};

export default Hero;

