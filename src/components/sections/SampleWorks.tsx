import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Volume2, VolumeX, Pause, Maximize, ChevronLeft, ChevronRight } from "lucide-react";
import { ScrambleHover } from "../ScrambleHover";
import { SectionSubtitle } from "../SectionSubtitle";
// @ts-ignore
import gamingThumbnail from "../../assets/images/gaming_thumbnail_1781681062902.jpg";

const videos = [
  {
    id: 1,
    title: "Storytelling Edit",
    platform: "TikTok / Reels",
    views: "2.4M views",
    src: "https://res.cloudinary.com/dtnfg5rly/video/upload/v1778550670/Crimeshort_Story_Telling_xwgugw.mp4",
    duration: "0:15",
  },
  {
    id: 2,
    title: "Talking Head Edit",
    platform: "TikTok / Reels",
    views: "1.8M views",
    src: "https://res.cloudinary.com/dtnfg5rly/video/upload/v1778550669/Short_V1_Motion_Graphics_zpetim.mp4",
    duration: "0:22",
  },
  {
    id: 3,
    title: "Podcast Edit",
    platform: "Instagram / YouTube Shorts",
    views: "890K views",
    src: "https://res.cloudinary.com/dtnfg5rly/video/upload/v1778550669/Short_V2_Podcast_xckgwf.mp4",
    duration: "0:18",
  },
  {
    id: 4,
    title: "Talking Head Edit",
    platform: "Instagram / YouTube Shorts",
    views: "890K views",
    src: "https://res.cloudinary.com/dtnfg5rly/video/upload/v1778784980/Short_V3_ei8c23.mp4",
    duration: "0:24",
  },
  {
    id: 6,
    title: "Fitness Reel Edit",
    platform: "Instagram / Reels",
    views: "1.5M views",
    src: "https://res.cloudinary.com/dtnfg5rly/video/upload/v1782492197/Fitness_V2_i5o11w.mp4",
    duration: "0:20",
  },
];

const allVideos = Array(20).fill(videos).flat();

function VideoModal({ video, onClose }: { video: typeof videos[0]; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.2);
  const [showVolume, setShowVolume] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.volume = 0.2;
      v.muted = true;
    }
    v?.play();
  }, []);

  const applyVolume = (newVol: number) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolume(clamped);
    setIsMuted(clamped === 0);
    if (videoRef.current) {
      videoRef.current.volume = clamped;
      videoRef.current.muted = clamped === 0;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        const newVol = volume > 0 ? volume : 0.2;
        applyVolume(newVol);
      } else {
        applyVolume(0);
      }
    }
  };

  const handleTrackMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = rect.bottom - e.clientY;
    const pct = Math.max(0, Math.min(1, y / 80));
    applyVolume(pct);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
      
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        <X className="h-5 w-5 text-white" />
      </button>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="relative z-10 w-full max-w-[340px] rounded-3xl overflow-hidden shadow-2xl bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[9/16]">
          <video
            ref={videoRef}
            src={video.src}
            className="w-full h-full object-cover"
            loop
            playsInline
            muted={isMuted}
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          />
          
          <div 
            className="absolute bottom-4 right-4 z-20 flex flex-col items-center"
            onMouseEnter={() => setShowVolume(true)}
            onMouseLeave={() => setShowVolume(false)}
          >
            <motion.div
              initial={false}
              animate={{ 
                height: showVolume ? 80 : 0,
                opacity: showVolume ? 1 : 0,
                marginBottom: showVolume ? 8 : 0
              }}
              transition={{ duration: 0.15 }}
              className="relative overflow-hidden"
              style={{ width: '28px' }}
            >
              <div 
                className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[3px] bg-white/25 rounded-full"
                style={{ height: '80px' }}
              />
              
              <div 
                className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[3px] bg-white rounded-full pointer-events-none"
                style={{ height: `${volume * 80}px` }}
              />
              
              <div 
                className="absolute left-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md pointer-events-none"
                style={{ 
                  bottom: `${volume * 80 - 7}px`,
                  marginLeft: '-7px'
                }}
              />
              
              <div
                className="absolute inset-0 cursor-pointer"
                style={{ width: '28px', height: '80px' }}
                onMouseDown={handleTrackMouse}
                onMouseMove={(e) => {
                  if (e.buttons === 1) handleTrackMouse(e);
                }}
              />
            </motion.div>

            <button
              onClick={toggleMute}
              className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4 text-white" />
              ) : (
                <Volume2 className="h-4 w-4 text-white" />
              )}
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="absolute bottom-8 left-0 right-0 text-center z-10"
      >
        <p className="text-xs text-white/50 tracking-wider uppercase mb-1">{video.platform}</p>
        <h3 className="text-lg font-semibold text-white">{video.title}</h3>
      </motion.div>
    </motion.div>
  );
}

const getCloudinaryThumbnail = (videoUrl: string) => {
  if (videoUrl.includes("res.cloudinary.com")) {
    return videoUrl
      .replace("/video/upload/", "/video/upload/w_360,h_640,c_fill,q_80,f_auto/")
      .replace(/\.mp4$/, ".jpg");
  }
  return "";
};

function VideoCard({ video, onClick }: { video: typeof videos[0]; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let playPromise: Promise<void> | undefined;
    if (isHovered) {
      if (videoRef.current) {
        videoRef.current.src = video.src;
        videoRef.current.load();
        playPromise = videoRef.current.play();
        playPromise.catch(() => {});
      }
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = "";
      }
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = "";
      }
    };
  }, [isHovered, video.src]);

  const thumbnailUrl = getCloudinaryThumbnail(video.src);

  return (
    <motion.div
      className="relative flex-shrink-0 w-[240px] md:w-[280px] cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      onHoverStart={() => {
        setIsHovered(true);
      }}
      onHoverEnd={() => {
        setIsHovered(false);
      }}
      onClick={onClick}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="relative aspect-[9/16] rounded-3xl overflow-hidden bg-black border border-white/10 shadow-lg">
        {thumbnailUrl && (
          <img
            src={thumbnailUrl}
            alt={video.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none z-0 ${
              isHovered ? "opacity-0" : "opacity-100"
            }`}
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        )}

        {isHovered && (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover z-0"
            preload="none"
            muted
            playsInline
            loop
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none" />
        
        {!isHovered && (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Play className="h-5 w-5 fill-white text-white ml-0.5" />
            </div>
          </div>
        )}
        
        <div className="absolute bottom-3 left-3 z-20 pointer-events-none">
          <span className="text-[10px] font-medium text-white/80 tracking-wider uppercase bg-black/40 px-2 py-1 rounded-md">
            {video.duration}
          </span>
        </div>
      </div>

      <div className="mt-3 px-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-medium text-accent tracking-wider uppercase">
            {video.platform}
          </span>
        </div>
        <h3 className="text-sm font-semibold leading-snug text-foreground/90">{video.title}</h3>
      </div>
    </motion.div>
  );
}

interface FeaturedVideoItem {
  id: number;
  title: string;
  tag: string;
  description: string;
  format: string;
  software: string;
  type: "native" | "youtube";
  src: string;
  poster: string;
}

const featuredVideos: FeaturedVideoItem[] = [
  {
    id: 1,
    title: "Podcast Trailer",
    tag: "Featured Highlight · 16:9 Wide Format",
    description: "High-impact promotional campaign edited for a top-tier brand. Engineered to hook the audience in the first 3 seconds, blending energetic multivariable dynamic cuts with clean studio grade audio mastering.",
    format: "1080p Cine Ratio",
    software: "DaVinci Resolve",
    type: "native" as const,
    src: "https://res.cloudinary.com/dtnfg5rly/video/upload/v1781335977/TRAILER_-_Video_Editor_Mc_Kinly_Bongadillo_sv3kcr.mp4",
    poster: "https://res.cloudinary.com/dtnfg5rly/video/upload/w_1200,h_675,c_fill,q_80,f_auto/v1781335977/TRAILER_-_Video_Editor_Mc_Kinly_Bongadillo_sv3kcr.jpg"
  },
  /*
  {
    id: 2,
    title: "Gaming Edits",
    tag: "Featured Highlight · 16:9 Wide Format",
    description: "Dynamic high-action gaming montage featuring high-fidelity audio syncing, flow-state motion graphics trackers, premium custom 3D transitions, and bespoke screen-rumble impact effects.",
    format: "1080p 60fps",
    software: "DaVinci Resolve",
    type: "youtube" as const,
    src: "DQJ1MpbHYYs",
    poster: gamingThumbnail
  }
  */
];

function PodcastTrailerPlayer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const activeVideo = featuredVideos[activeIndex];

  // Reset states when video changes
  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      if (activeVideo.type === "native") {
        videoRef.current.src = activeVideo.src;
        videoRef.current.muted = isMuted;
        videoRef.current.load();
      } else {
        videoRef.current.src = "";
      }
    }
  }, [activeIndex, activeVideo, isMuted]);

  const togglePlay = () => {
    if (activeVideo.type === "native" && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    } else if (activeVideo.type === "youtube") {
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (activeVideo.type === "native" && videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    } else if (activeVideo.type === "youtube") {
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (activeVideo.type === "native" && videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration || 1;
      setCurrentTime(current);
      setProgress((current / total) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (activeVideo.type === "native" && videoRef.current) {
      setDuration(videoRef.current.duration || 1);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (activeVideo.type === "native" && videoRef.current && duration > 0) {
      const newTime = (value / 100) * duration;
      videoRef.current.currentTime = newTime;
      setProgress(value);
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? featuredVideos.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === featuredVideos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-20 px-6">
      {/* Title block */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 border-t border-white/5 pt-12">
        <div className="flex-1">
          <span className="text-[10px] font-bold text-orange-500 tracking-wider uppercase font-mono bg-orange-500/10 px-2.5 py-1.5 rounded-md border border-orange-500/20">
            {activeVideo.tag}
          </span>
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mt-4 flex items-center gap-2">
            {activeVideo.title}
          </h3>
          <p className="text-white/60 text-sm mt-2 max-w-xl leading-relaxed min-h-[60px]">
            {activeVideo.description}
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs text-white/50 font-mono self-start md:self-end">
          <div className="bg-white/[0.03] px-3 py-2 rounded-xl border border-white/5">
            <span className="text-white/30 block text-[9px] uppercase tracking-wider">Format</span>
            <span className="text-white/95">{activeVideo.format}</span>
          </div>
          <div className="bg-white/[0.03] px-3 py-2 rounded-xl border border-white/5">
            <span className="text-white/30 block text-[9px] uppercase tracking-wider">Software</span>
            <span className="text-white/95">{activeVideo.software}</span>
          </div>
        </div>
      </div>

      {/* Styled video player container */}
      <div 
        className="relative aspect-video w-full rounded-2xl md:rounded-3xl overflow-hidden bg-black border border-white/10 group shadow-2xl transition-all duration-500 hover:border-orange-500/30"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onContextMenu={(e) => e.preventDefault()}
      >
        {activeVideo.type === "native" ? (
          <video
            ref={videoRef}
            src={activeVideo.src}
            poster={activeVideo.poster}
            className="w-full h-full object-cover cursor-pointer"
            preload="none"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleVideoEnded}
            onClick={togglePlay}
            playsInline
            muted={isMuted}
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          />
        ) : (
          <>
            {isPlaying ? (
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.src}?autoplay=1&mute=${isMuted ? 1 : 0}&rel=0&showinfo=0&iv_load_policy=3&controls=1`}
                title={activeVideo.title}
                className="absolute inset-0 w-full h-full border-0 z-10"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div 
                className="absolute inset-0 w-full h-full cursor-pointer z-10"
                onClick={togglePlay}
              >
                <img
                  src={activeVideo.poster}
                  alt={activeVideo.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
              </div>
            )}
          </>
        )}

        {/* Navigation Arrows inside the Player Frame */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-black/60 hover:bg-orange-500 text-white backdrop-blur-md rounded-full w-10 h-10 flex items-center justify-center transition-all border border-white/10 shadow-lg cursor-pointer opacity-100 md:opacity-40 md:group-hover:opacity-100 focus:opacity-100"
          aria-label="Previous Highlight"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-black/60 hover:bg-orange-500 text-white backdrop-blur-md rounded-full w-10 h-10 flex items-center justify-center transition-all border border-white/10 shadow-lg cursor-pointer opacity-100 md:opacity-40 md:group-hover:opacity-100 focus:opacity-100"
          aria-label="Next Highlight"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Native Controls Overlay - only show for native videos, or youtube when NOT playing */}
        {(activeVideo.type === "native" || !isPlaying) && (
          <>
            {/* Big play button overlay when paused */}
            {!isPlaying && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer pointer-events-none"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:bg-orange-500/20 group-hover:border-orange-500/30 transition-all duration-300">
                  <Play className="h-6 w-6 md:h-8 md:w-8 fill-white text-white ml-1 filter drop-shadow" />
                </div>
              </motion.div>
            )}

            {/* Custom interactive control panel for Native Player */}
            {activeVideo.type === "native" && (
              <div className={`absolute bottom-0 left-0 right-0 z-30 p-4 md:p-6 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-auto transition-opacity duration-300 ${isHovering || !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
                <div className="space-y-4">
                  {/* Custom slider progress bar */}
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-white/50 w-8 text-right select-none">{formatTime(currentTime)}</span>
                    <div className="relative flex-1 group/slider h-1.5 flex items-center">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="0.1"
                        value={progress}
                        onChange={handleProgressChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="absolute left-0 right-0 h-1 rounded-full bg-white/15 overflow-hidden group-hover/slider:h-1.5 transition-all">
                        <div 
                          className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div 
                        className="absolute w-3 h-3 rounded-full bg-white opacity-0 group-hover/slider:opacity-100 shadow transition-opacity duration-150 pointer-events-none"
                        style={{ left: `calc(${progress}% - 6px)` }}
                      />
                    </div>
                    <span className="text-[11px] font-mono text-white/50 w-8 select-none">{formatTime(duration)}</span>
                  </div>

                  {/* Sub-controls list */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Play/Pause Button */}
                      <button
                        onClick={togglePlay}
                        className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/5"
                        title={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? (
                          <Pause className="h-4 w-4 text-white fill-white" />
                        ) : (
                          <Play className="h-4 w-4 text-white fill-white ml-0.5" />
                        )}
                      </button>

                      {/* Mute/Unmute Button */}
                      <button
                        onClick={toggleMute}
                        className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/5"
                        title={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? (
                          <VolumeX className="h-4 w-4 text-white" />
                        ) : (
                          <Volume2 className="h-4 w-4 text-white" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Fullscreen Button */}
                      <button
                        onClick={handleFullscreen}
                        className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/5"
                        title="Fullscreen"
                      >
                        <Maximize className="h-4 w-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Navigation Indicators */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {featuredVideos.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
              idx === activeIndex 
                ? "bg-orange-500 w-6" 
                : "bg-white/20 hover:bg-white/40"
            }`}
            title={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export function SampleWorks() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null);
  
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const hasModalRef = useRef(false);
  const dragStartRef = useRef(0);
  const translateStartRef = useRef(0);
  const didDragRef = useRef(false);
  const translateXRef = useRef(0);
  const setWidthRef = useRef(0);

  useEffect(() => {
    hasModalRef.current = !!selectedVideo;
  }, [selectedVideo]);

  useEffect(() => {
    const calculateWidth = () => {
      const totalWidth = trackRef.current?.scrollWidth || 0;
      setWidthRef.current = totalWidth / 20;
      translateXRef.current = -setWidthRef.current * 10;
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${translateXRef.current}px)`;
      }
    };
    setTimeout(calculateWidth, 150);
  }, []);

  const wrapPosition = useCallback((pos: number, W: number) => {
    const min = -W * 18;
    const max = -W * 2;
    let wrapped = pos;
    while (wrapped < min) wrapped += W * 16;
    while (wrapped > max) wrapped -= W * 16;
    return wrapped;
  }, []);

  useEffect(() => {
    let animationId: number;

    const animate = () => {
      if (!isHoveredRef.current && !hasModalRef.current && !isDraggingRef.current) {
        const W = setWidthRef.current;
        if (W > 0) {
          translateXRef.current -= 0.4;
          translateXRef.current = wrapPosition(translateXRef.current, W);
          if (trackRef.current) {
            trackRef.current.style.transform = `translateX(${translateXRef.current}px)`;
          }
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [wrapPosition]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDraggingRef.current = true;
    didDragRef.current = false;
    dragStartRef.current = e.pageX;
    translateStartRef.current = translateXRef.current;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    
    const walk = (e.pageX - dragStartRef.current) * 1.5;
    if (Math.abs(e.pageX - dragStartRef.current) > 5) {
      didDragRef.current = true;
    }
    
    const W = setWidthRef.current;
    translateXRef.current = translateStartRef.current + walk;
    
    if (W > 0) {
      translateXRef.current = wrapPosition(translateXRef.current, W);
      translateStartRef.current = translateXRef.current - walk;
    }
    
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${translateXRef.current}px)`;
    }
  }, [wrapPosition]);

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    isHoveredRef.current = true;
    isDraggingRef.current = true;
    didDragRef.current = false;
    dragStartRef.current = e.touches[0].pageX;
    translateStartRef.current = translateXRef.current;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    
    const walk = (e.touches[0].pageX - dragStartRef.current) * 1.5;
    if (Math.abs(e.touches[0].pageX - dragStartRef.current) > 5) {
      didDragRef.current = true;
    }
    
    const W = setWidthRef.current;
    translateXRef.current = translateStartRef.current + walk;
    
    if (W > 0) {
      translateXRef.current = wrapPosition(translateXRef.current, W);
      translateStartRef.current = translateXRef.current - walk;
    }
    
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${translateXRef.current}px)`;
    }
  }, [wrapPosition]);

  const handleTouchEnd = useCallback(() => {
    isDraggingRef.current = false;
    isHoveredRef.current = false;
  }, []);

  const handleClick = useCallback((video: typeof videos[0]) => {
    if (!didDragRef.current) {
      setSelectedVideo(video);
    }
  }, []);

  return (
    <>
      <section id="edit-room" className="py-24 bg-background select-none relative overflow-hidden">
        {/* Glowing Orange-Teal Grid Background */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
              radial-gradient(circle 800px at 100% 200px, rgba(249, 115, 22, 0.1) 0%, rgba(13, 148, 136, 0.05) 50%, transparent 100%)
            `,
            backgroundSize: "96px 64px, 96px 64px, 100% 100%",
          }}
        />

        <div className="relative z-10">
          <div className="px-6 max-w-7xl mx-auto mb-10">
            <SectionSubtitle number="03" text="SAMPLE WORKS" className="mb-3" />
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
              <ScrambleHover text="The edit room." scrambledClassName="text-orange-500" />
            </h2>
          </div>

          <div
            className="overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseEnter={() => { isHoveredRef.current = true; }}
            onMouseLeave={() => { 
              isHoveredRef.current = false; 
              isDraggingRef.current = false; 
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              ref={trackRef}
              className="flex gap-4 px-6 will-change-transform"
              style={{ transform: "translateX(0px)" }}
            >
              {allVideos.map((video, index) => (
                <div key={`${video.id}-${index}`}>
                  <VideoCard
                    video={video}
                    onClick={() => handleClick(video)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="px-6 max-w-7xl mx-auto mt-8">
            <p className="text-xs text-muted-foreground/40 tracking-wide">
              Drag to explore · Click to watch
            </p>
          </div>

          {/* Podcast Trailer Subsection */}
          <PodcastTrailerPlayer />
        </div>
      </section>

      <AnimatePresence>
        {selectedVideo && (
          <VideoModal
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
