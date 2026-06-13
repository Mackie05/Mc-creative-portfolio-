import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Activity, Share2, Layers, TrendingUp, Sparkles, AlertCircle, Heart } from "lucide-react";
import { Link, useParams, Navigate } from "react-router-dom";

// ============================================
// ANIMATION SUB-COMPONENTS
// ============================================

// 1. Growth Illustration (brand-growth-campaign)
function GrowthIllustration() {
  const points = ["Day 1: Baseline Audit", "Day 30: Compounding Multipliers", "Day 90: Exponential Scaling"];
  
  return (
    <div className="w-full h-full min-h-[280px] flex flex-col md:flex-row items-center justify-around gap-6 p-4 bg-black/40 rounded-2xl relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
      
      {/* Interactive Line Chart SVG */}
      <div className="w-full md:w-3/5 h-44 relative flex items-center justify-center">
        <svg viewBox="0 0 300 120" className="w-full h-full drop-shadow-[0_0_15px_rgba(249,115,22,0.15)]">
          {/* Axis */}
          <line x1="10" y1="110" x2="290" y2="110" stroke="#333" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="10" y1="10" x2="10" y2="110" stroke="#333" strokeWidth="1" strokeDasharray="3 3" />
          
          {/* Chart Path Line */}
          <motion.path
            d="M 10 100 Q 80 95 130 75 T 230 40 T 280 15"
            fill="none"
            stroke="url(#gradient-orange)"
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, ease: "easeOut" }}
          />

          {/* Glowing pulse at the tip */}
          <motion.circle
            cx="280"
            cy="15"
            r="5"
            fill="#f97316"
            className="shadow-glow"
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="gradient-orange" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#f97316" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#fb923c" stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Key Milestones */}
      <div className="w-full md:w-2/5 flex flex-col gap-3 relative z-10">
        <h4 className="text-xs uppercase tracking-[0.2em] text-orange-400/80 font-semibold mb-1 flex items-center gap-1.5">
          <TrendingUp size={12} className="text-orange-400" /> Compounding Trajectory
        </h4>
        {points.map((pt, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.3 + 0.5, duration: 0.5 }}
            className="flex items-center gap-3 bg-white/[0.02] border border-white/5 p-2 rounded-lg"
          >
            <span className="text-xs font-mono bg-orange-500/10 text-orange-400 border border-orange-500/20 w-5 h-5 flex items-center justify-center rounded-full shrink-0">
              {i + 1}
            </span>
            <span className="text-xs text-white/70">{pt}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// 2. Pillars Illustration (content-pillar-system)
function PillarsIllustration() {
  return (
    <div className="w-full h-full min-h-[280px] flex flex-col items-center justify-center p-6 bg-black/40 rounded-2xl relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      {/* Hub Map SVG */}
      <div className="w-full max-w-[400px] relative h-48 flex items-center justify-center">
        <svg viewBox="0 0 200 100" className="w-full h-full">
          {/* Main Hub Node */}
          <circle cx="100" cy="50" r="14" fill="rgba(249, 115, 22, 0.12)" stroke="#f97316" strokeWidth="1.5" />
          <text x="100" y="53" textAnchor="middle" fill="#fff" fontSize="6px" className="font-mono tracking-tight font-bold">1 FILM</text>

          {/* Connection Lines with moving particles */}
          <path d="M 100,50 L 30,25" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <path d="M 100,50 L 30,75" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <path d="M 100,50 L 170,25" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <path d="M 100,50 L 170,75" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

          {/* Animated Particles flowing outward */}
          <motion.circle r="2" fill="#fb923c"
            animate={{ cx: [100, 30], cy: [50, 25] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle r="2" fill="#fb923c"
            animate={{ cx: [100, 30], cy: [50, 75] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: 0.55 }}
          />
          <motion.circle r="2" fill="#fb923c"
            animate={{ cx: [100, 170], cy: [50, 25] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: 1.1 }}
          />
          <motion.circle r="2" fill="#fb923c"
            animate={{ cx: [100, 170], cy: [50, 75] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: 1.65 }}
          />

          {/* Derived Clip Nodes */}
          <g>
            <circle cx="30" cy="25" r="8" fill="#111" stroke="#444" strokeWidth="1" />
            <text x="30" y="27.5" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="5px" className="font-mono font-semibold">Tiktok</text>
          </g>
          <g>
            <circle cx="30" cy="75" r="8" fill="#111" stroke="#444" strokeWidth="1" />
            <text x="30" y="77.5" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="5px" className="font-mono font-semibold">Reels</text>
          </g>
          <g>
            <circle cx="170" cy="25" r="8" fill="#111" stroke="#444" strokeWidth="1" />
            <text x="170" y="27.5" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="5px" className="font-mono font-semibold">Shorts</text>
          </g>
          <g>
            <circle cx="170" cy="75" r="8" fill="#111" stroke="#444" strokeWidth="1" />
            <text x="170" y="77.5" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="5px" className="font-mono font-semibold">Threads</text>
          </g>
        </svg>
      </div>

      <div className="text-center mt-2">
        <p className="text-xs text-orange-400 font-mono tracking-wide flex items-center justify-center gap-1.5 uppercase">
          <Layers size={12} /> Multiple Platform Multipliers Generated From A Single Master Edit
        </p>
      </div>
    </div>
  );
}

// 3. Retention Illustration (retention-optimized-editing-framework)
function RetentionIllustration() {
  return (
    <div className="w-full h-full min-h-[280px] flex flex-col md:flex-row items-center justify-around gap-6 p-4 bg-black/40 rounded-2xl relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_1px] pointer-events-none" />

      {/* Curves Chart SVG */}
      <div className="w-full md:w-3/5 h-44 relative flex items-center justify-center">
        <svg viewBox="0 0 300 120" className="w-full h-full">
          {/* Axis Grid lines */}
          <line x1="10" y1="10" x2="290" y2="10" stroke="#222" strokeWidth="1" />
          <line x1="10" y1="60" x2="290" y2="60" stroke="#222" strokeWidth="1" />
          <line x1="10" y1="110" x2="290" y2="110" stroke="#333" strokeWidth="1" />

          {/* Red/Dotted standard dropoff line */}
          <motion.path
            d="M 10,10 Q 50,90 90,105 T 280,108"
            fill="none"
            stroke="#555"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5 }}
          />
          <text x="45" y="90" fill="#555" fontSize="6px" className="font-mono font-semibold">Slow Pace Intro Drop</text>

          {/* Orange high-retention line */}
          <motion.path
            d="M 10,10 C 60,11 110,25 180,45 S 250,55 280,55"
            fill="none"
            stroke="#f97316"
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, ease: "easeOut" }}
          />

          {/* Callouts along the orange path */}
          <circle cx="20" cy="11.5" r="3px" fill="#fb923c" />
          <circle cx="110" cy="25" r="3px" fill="#fb923c" />
          <circle cx="180" cy="45" r="3px" fill="#fb923c" />

          <text x="25" y="22" fill="#fff" fontSize="5.5px" className="font-mono bg-black/60 p-0.5">0-3s Hook Interrupt</text>
          <text x="115" y="18" fill="#fff" fontSize="5.5px" className="font-mono">Dynamic Face Zoom</text>
          <text x="175" y="38" fill="#fff" fontSize="5.5px" className="font-mono">Subtle Sound Bed</text>

          <text x="210" y="70" fill="#f97316" fontSize="7px" className="font-mono uppercase font-bold tracking-wider">Our Strategic Edit</text>
        </svg>
      </div>

      {/* Descriptive Text List */}
      <div className="w-full md:w-2/5 flex flex-col gap-2 relative z-10 text-xs">
        <h4 className="text-xs font-semibold tracking-[0.15em] text-orange-400 uppercase flex items-center gap-1.5">
          <Activity size={12} /> Optimization Metrics
        </h4>
        <div className="bg-white/[0.02] border border-white/5 p-2 rounded-lg">
          <p className="font-bold text-white text-[13px]">&#43;180% Watch Duration</p>
          <p className="text-white/40 text-[10px]">Average view time surged to 11.8s</p>
        </div>
        <div className="bg-white/[0.02] border border-white/5 p-2 rounded-lg">
          <p className="font-bold text-white text-[13px]">&#45;45% Bounce Rate</p>
          <p className="text-white/40 text-[10px]">Reduced immediate swipe aways in first 3s</p>
        </div>
      </div>
    </div>
  );
}

// 4. Storytelling Wedding Timeline (storytelling-wedding-film)
function StorytellingIllustration() {
  return (
    <div className="w-full h-full min-h-[280px] flex flex-col p-5 bg-black/40 rounded-2xl relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      <h4 className="text-xs uppercase tracking-[0.2em] text-orange-400 font-semibold mb-3 flex items-center gap-1.5 border-b border-white/5 pb-2">
        <Clock size={12} className="text-orange-400" /> Non-Linear Storyline Timeline Block Integration
      </h4>

      {/* Simplified Mock Timeline Representation */}
      <div className="flex-1 flex flex-col gap-2.5 justify-center relative font-mono">
        {/* Timeline Tracks */}
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-white/30 w-16 text-right shrink-0">VIDEO V2</span>
          <div className="flex-1 h-6 bg-white/[0.03] rounded border border-white/5 relative overflow-hidden">
            <motion.div
              className="absolute left-[30%] right-[30%] h-full bg-amber-500/10 border-x border-amber-500/30 flex items-center justify-center text-[8px] text-amber-400 font-bold"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              PRE-WEDDING PREP B-ROLL
            </motion.div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[9px] text-white/30 w-16 text-right shrink-0">VIDEO V1</span>
          <div className="flex-1 h-6 bg-white/[0.03] rounded border border-white/5 relative overflow-hidden">
            <div className="absolute left-[5%] right-[65%] h-full bg-orange-500/20 border-x border-orange-500/40 flex items-center justify-center text-[8px] text-orange-400 font-bold">
              ESTABLISHING
            </div>
            <div className="absolute left-[40%] right-[5%] h-full bg-orange-500/20 border-x border-orange-500/40 flex items-center justify-center text-[8px] text-orange-400 font-bold">
              THE VOW EXCHANGE SEQUENCE
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[9px] text-white/30 w-16 text-right shrink-0">DIALOGUE</span>
          <div className="flex-1 h-6 bg-orange-500/10 rounded border border-orange-500/15 relative overflow-hidden">
            <motion.div
              className="absolute inset-[2px] bg-[linear-gradient(90deg,transparent_50%,#f97316_50%)] bg-[size:6px_100%] opacity-40"
              animate={{ x: [-20, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
            <div className="absolute left-[15%] right-[20%] h-full flex items-center justify-center text-[8px] text-white/70">
              AUDIO ANCHOR SPEECH SPINE (VOWS & SPEECHES BEDROCK)
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[9px] text-white/30 w-16 text-right shrink-0">SOUND FX</span>
          <div className="flex-1 h-5 bg-white/[0.02] rounded border border-white/5 relative">
            <div className="absolute left-[38%] w-10 h-full bg-green-500/20 border border-green-500/30 flex items-center justify-center text-[7px] text-green-400">WIND SWOOSH</div>
            <div className="absolute left-[80%] w-8 h-full bg-green-500/20 border border-green-500/30 flex items-center justify-center text-[7px] text-green-400">LAUGHTER</div>
          </div>
        </div>

        {/* Timeline Scrubber Playhead Line */}
        <motion.div
          className="absolute top-0 bottom-0 w-[1.5px] bg-orange-500/80 z-20"
          style={{ left: "70px" }}
          animate={{ left: ["76px", "90%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}

// ============================================
// PROJECT DATA METRICS & STRATEGIES
// ============================================

const projectData: Record<string, {
  title: string;
  category: string;
  year: string;
  client: string;
  role: string;
  description: string;
  challenge: string;
  solution: string;
  strategy: { phase: string; title: string; description: string }[];
  metrics: { value: string; label: string; detail: string }[];
  animationType: "growth" | "pillars" | "retention" | "storytelling";
}> = {
  "brand-growth-campaign": {
    title: "Brand Growth Campaign",
    category: "Social Strategy / Short Form",
    year: "2025",
    client: "Premium Lifestyle Brand",
    role: "Creative Director & Social Strategist",
    description: "A compounding social content system that transformed a low-reach brand into an active community-hub, netting 45K engaged followers in 90 days organic.",
    challenge: "The client had outstanding product lines but zero organic traction. Views were stuck beneath the 200-view ceiling, descriptions were boring, video edits lacked cohesive flow, and captions failed to register.",
    solution: "We engineered a disciplined 3-phase growth program centering high-affinity hooks, rhythmic audio spacing, and dynamic visual intervals. Rather than single shots, we scaled systematic batch creation sprints.",
    strategy: [
      {
        phase: "Phase 1: Position & Script",
        title: "Intentional Hooks",
        description: "Replaced flat brand introduction entries with customized, personalized questions and high-tempo pattern interrupts within the first 1.5 seconds of play."
      },
      {
        phase: "Phase 2: Agile Production",
        title: "Batched Content Sprints",
        description: "Optimized filming logistics. Coordinated single 30-day recording cycles to produce 90 distinct vertical short clips, reducing cost overhead."
      },
      {
        phase: "Phase 3: Retention Review",
        title: "Data-Driven Adaptation",
        description: "Audited daily viewer retention timelines. Dynamically repositioned copy hooks and zoom triggers where data patterns dropped off."
      }
    ],
    metrics: [
      { value: "0 to 45K", label: "Followers Gained", detail: "Purely organic community growth." },
      { value: "11.2M", label: "Organic Reach", detail: "Compounding impressions over 90 days." },
      { value: "3.8%", label: "Profile Conversion", detail: "Conversion percentage from viewer to loyal follower." },
      { value: "+340%", label: "Inbound Leads", detail: "Qualified e-commerce referral leads from social bio." }
    ],
    animationType: "growth"
  },
  "content-pillar-system": {
    title: "Content Pillar System",
    category: "Creative Direction / Content Strategy",
    year: "2025",
    client: "Next-gen Venture Fund & Media Hub",
    role: "Creative Director & Asset Architect",
    description: "Developing a modular storytelling system that takes a single quarterly 2-hour recording session and breaks it down into 16+ high-performance social assets.",
    challenge: "Brand executives and creators were suffering from profound creative burnout and high creation overhead, struggling to remain consistent on LinkedIn, YouTube, and short platforms.",
    solution: "We designed a multi-tier nesting strategy. By recording dynamic, high-concept interactive fireside sessions, we built a comprehensive script map allowing modular breakdown into micro-clips.",
    strategy: [
      {
        phase: "Phase 1: Deep Extraction",
        title: "Active Dialogue Mapping",
        description: "Engineered recording transcripts around a highly organized 5-topic schedule with pre-structured narrative loops to serve as independent vertical episodes."
      },
      {
        phase: "Phase 2: Decoupled Cuts",
        title: "Micro-Scribing",
        description: "Sectored the primary video file into discrete short clips, rewriting copy hooks and formatting typography for multi-platform consumption."
      },
      {
        phase: "Phase 3: Channel Adaptation",
        title: "Dynamic Grading & Audio",
        description: "Configured individual audio signatures and subtle color adjustments calibrated for LinkedIn's conservative feed vs. TikTok's high-octane algorithm."
      }
    ],
    metrics: [
      { value: "16x Assets", label: "Recycling Multiplier", detail: "Engaging vertical clips from a 2-hour session." },
      { value: "-35%", label: "Overhead Reduction", detail: "Saved significant time previously spent on scripting." },
      { value: "+400K", label: "Extended Monthly Reach", detail: "Captured off-platform audiences on TikTok & Reels." },
      { value: "100%", label: "Consistency Rate", detail: "Maintained a continuous daily post rate." }
    ],
    animationType: "pillars"
  },
  "retention-optimized-editing-framework": {
    title: "Retention-Optimized Editing Framework",
    category: "Video Editing / Short Form",
    year: "2025",
    client: "SaaS & Direct-to-Consumer Brands",
    role: "Lead Editor & Motion Designer",
    description: "A precise, algorithm-focused editing system utilizing micro-timing patterns, pattern interrupts, and seamless sound beds to hold audience attention.",
    challenge: "Viewers dropped within the first 3 seconds due to slow verbal pacing and static wide frames, resulting in depressed search visibility and high-bounce swipe rates.",
    solution: "We built a rigid compression framework, discarding extra adverbs and silent pauses. By incorporating visual anchors, sound effects, and frame zooms every 1.5 seconds, we doubled organic retention.",
    strategy: [
      {
        phase: "Phase 1: The Hook Formula",
        title: "0-3 Second Anchors",
        description: "Merged sudden visual zoom-ins with precise, rhythmic audio sound effects to shock and interest the viewer immediately."
      },
      {
        phase: "Phase 2: Spacial Compression",
        title: "Eliminating Dead Space",
        description: "Applied seamless split-level J-cuts and L-cuts to stack audio dialogue together, eliminating redundant pauses and breath spaces completely."
      },
      {
        phase: "Phase 3: Sensory Dressing",
        title: "Kinetic Context Text",
        description: "Programmed high-contrast color kinetic captions paired with foley background details that visually emphasize key descriptors."
      }
    ],
    metrics: [
      { value: "+180%", label: "Retention Surge", detail: "Average completion duration increased significantly." },
      { value: "-45%", label: "Swipe-away Drop", detail: "Fewer audience drop-offs during core initial intro." },
      { value: "2.4x Shares", label: "Virality Boost", detail: "Higher sharing density due to caption call-outs." },
      { value: "3x Output", label: "Editing Velocity", detail: "Standardized editing template speed of delivery." }
    ],
    animationType: "retention"
  },
  "storytelling-wedding-film": {
    title: "Creative Content Storytelling",
    category: "Creative Direction / Long Form",
    year: "2025",
    client: "Legacy Private Archiving",
    role: "Lead Director, Sound Scaper & Editor",
    description: "Developing platform-native episodic narratives and brand stories that captivate long-form audiences across premium channels by establishing high-fidelity structural audio story spines beneath gorgeous pacing.",
    challenge: "Most brand documentaries or episodic series suffer from flat chronological sequences, failing to establish immediate narrative hooks or maintain audience curiosity.",
    solution: "We selected organic dialogue files as the primary driving engine, structuring fluid non-linear visual cuts around raw audio hooks while applying cinematic color grading schemas.",
    strategy: [
      {
        phase: "Phase 1: Audio Core Selection",
        title: "The Dialogue Bedrock",
        description: "Analyzed hours of speeches and vows, editing together a coherent acoustic story spine before touching any primary video reels."
      },
      {
        phase: "Phase 2: Narrative Sequencing",
        title: "Non-Linear Juxtaposition",
        description: "Threaded high-tension pre-ceremony moments beside joyous end-of-night activities, creating beautiful cinematic contrasts."
      },
      {
        phase: "Phase 3: Natural Soundscapes",
        title: "Environmental Anchors",
        description: "Wove subtle background elements (distant ocean surf, church bell resonances, wind) to ground the visual B-roll."
      }
    ],
    metrics: [
      { value: "92%", label: "Completion Rate", detail: "High audience retention during the 6-minute movie." },
      { value: "Cinema", label: "Grade Aesthetics", detail: "Custom color table calibrated across all sensors." },
      { value: "10K+", label: "Organic Shares", detail: "Shared widely within community circles." },
      { value: "100%", label: "Emotional Satisfaction", detail: "Superb reviews from families." }
    ],
    animationType: "storytelling"
  }
};

// ============================================
// MAIN CASE STUDY COMPONENT
// ============================================

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? projectData[slug] : null;

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  // Choose display illustration
  const renderIllustration = () => {
    switch (project.animationType) {
      case "growth":
        return <GrowthIllustration />;
      case "pillars":
        return <PillarsIllustration />;
      case "retention":
        return <RetentionIllustration />;
      case "storytelling":
        return <StorytellingIllustration />;
      default:
        return null;
    }
  };

  return (
    <div className="pt-32 pb-32 px-6 max-w-5xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Breadcrumb back */}
        <Link
          to="/work"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 group"
          id="back-to-process"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Process Studies
        </Link>

        {/* Header content section */}
        <div className="space-y-4 mb-10">
          <div className="flex items-center gap-4">
            <span className="text-xs uppercase tracking-widest text-accent font-semibold px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">
              {project.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            {project.title}
          </h1>
        </div>

        {/* Dynamic Animated Vector Illustration */}
        <div className="mb-14 rounded-3xl border border-white/5 bg-white/[0.01] overflow-hidden shadow-2xl relative">
          <div className="p-1 border-b border-white/5 bg-white/[0.02] flex items-center gap-1.5 px-6 py-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            <span className="text-[10px] font-mono text-white/40 ml-2">strategic_model_visualizer.tsx</span>
          </div>
          <div className="p-4 md:p-6 lg:p-8">
            {renderIllustration()}
          </div>
        </div>

        {/* Main Details and Core Challenges */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16 pb-12 border-b border-border/20">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-3 text-white flex items-center gap-2">
                <Sparkles size={18} className="text-orange-400" /> Executive Overview
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg font-light">
                {project.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5">
                <h3 className="text-sm uppercase tracking-wider text-white/50 mb-2 flex items-center gap-1.5">
                  <AlertCircle size={14} className="text-neutral-400" /> The Challenge
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-orange-500/[0.01] border border-orange-500/10">
                <h3 className="text-sm uppercase tracking-wider text-orange-400 mb-2 flex items-center gap-1.5 animate-pulse">
                  <Heart size={14} className="text-orange-400" /> The Strategy Solution
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar parameters */}
          <div className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl h-fit space-y-6">
            <h3 className="text-xs uppercase tracking-widest text-white font-semibold font-mono border-b border-white/5 pb-2">Engagement Registry</h3>
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-1">Company / Brand</p>
              <p className="font-semibold text-white text-base">{project.client}</p>
            </div>
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-1">Operational Role</p>
              <p className="font-semibold text-white/90 text-sm leading-relaxed">{project.role}</p>
            </div>
          </div>
        </div>

        {/* Detailed Strategic Roadmap Steps */}
        <div className="space-y-6 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Chronological Implementation Strategy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.strategy.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-orange-500/20 transition-all duration-300 relative group"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-mono bg-white/5 text-white/50 px-2.5 py-1 rounded-md">
                    {step.phase}
                  </span>
                  <span className="text-2xl font-bold font-mono text-white/10 group-hover:text-orange-500/20 transition-colors">
                    {`0${index + 1}`}
                  </span>
                </div>
                <h3 className="font-bold text-white text-base mb-2 group-hover:text-orange-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* High-Impact Realistic Results Dashboard */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">Performance Yield</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {project.metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 text-left"
              >
                <p className="text-2xl md:text-3xl font-bold text-orange-400 tracking-tight mb-1">
                  {metric.value}
                </p>
                <p className="text-xs text-white uppercase tracking-wider font-semibold mb-2">
                  {metric.label}
                </p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {metric.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Back Link bottom page footer */}
        <div className="mt-20 pt-10 border-t border-border/20 flex justify-center">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-sm text-orange-400 hover:text-orange-300 transition-colors font-medium bg-orange-500/10 px-6 py-3 rounded-full border border-orange-500/20 hover:bg-orange-500/20"
          >
            <ArrowLeft className="h-4 w-4" />
            Explore Other Process Studies
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
