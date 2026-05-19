import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

const profile = {
  name: "王铮",
  englishName: "Wang Zheng",
  role: "Immersive Technology / VR & AR / Game Interaction Designer",
  school:
    "MSc Immersive Technologies (Virtual and Augmented Reality), University of Bristol",
  location: "Bristol / Remote",
  email: "kagaminic@gmail.com",
  intro:
    "I create immersive game experiences that combine spatial storytelling, interactive systems, sound, and real-time 3D environments. My work focuses on VR/AR interaction, level design, gameplay prototyping, and digital cultural experience design.",
  cnIntro:
    "我关注 VR/AR 交互、游戏设计、关卡设计、声音交互与数字文化体验。通过实时 3D、空间叙事和可交互系统，我希望创造能够被探索、被触碰、被记住的沉浸式体验。",
};

const projects = [
  {
    title: "Space Traveler — Immersive Game Experience",
    cnTitle: "VR 太空梦境关卡",
    year: "2026",
    period: "2026.02.23 — 2026.05.07",
    type: "VR / Level Design / Interaction",
    team: "Team of 5",
    role: "Dream level creation, interaction flow, props, atmosphere and full level sequence",
    tools: ["Unity", "Wwise", "Maya", "Blender"],
    tags: ["VR", "Level Design", "Dream Space", "Interactive Props", "Sound"],
    video:
      "https://1drv.ms/v/c/bdc609e61e93261b/IQA_mekCI6GaSpH3eIB8oNaOAfF_ZEwCSe3---imRMerGiI?e=2JuBRi",
    images: [
      "/image/image1.png",
      "/image/image2.png",
      "/image/image3.png",
      "/image/image4.png",
      "/image/image5.png",
      "/image/image6.png",
    ],
    summary:
      "Step into the role of an astronaut. Pilot your spacecraft through a dangerous asteroid field while uncovering fragmented dreams and memories hidden in deep space.",
    details:
      "I created the full dream-level experience, including three dream scenes — classroom, living room birthday memory, and fireworks — followed by a memory-reconstruction stage and a final transition back to reality through passthrough view.",
    highlights: [
      "Designed a multi-stage dream sequence connected through glowing portals.",
      "Built interactive props including notebook, pencil, eraser, cake, candle, ribbon gun, toy spaceship and fireworks.",
      "Created gesture and controller-based interactions such as grabbing, throwing, flying, pulling portals, and launching fireworks.",
      "Used spatial atmosphere and object interaction to present fragmented memory as an explorable VR experience.",
    ],
    featured: true,
  },
  {
    title: "AR Rune Battle Game",
    cnTitle: "AR 符文战斗游戏",
    year: "2026",
    period: "2026.02.21 — 2026.04.28",
    type: "AR / Unity / Gameplay Prototype",
    team: "Team project",
    role: "AR plane and image scanning, level switching and generation",
    tools: ["Unity"],
    tags: ["AR", "Image Tracking", "Level Generation", "Gameplay"],
    video:
      "https://1drv.ms/v/c/bdc609e61e93261b/IQB9BGnLzaYEQ49cjvwzRyVPAXVLZr_NGopP7Z4jCVwNr-s?e=s5amzI",
    images: ["/image/image10.png", "/image/image11.png", "/image/image12.png"],
    summary:
      "An AR battle prototype based on rune recognition, spatial scanning, and generated combat scenes.",
    details:
      "My work focused on connecting AR recognition with gameplay progression: scanning surfaces and images, switching levels, and generating battle spaces in the physical environment.",
    highlights: [
      "Implemented AR plane and image scanning workflow.",
      "Connected scanned targets with level switching logic.",
      "Supported generated gameplay spaces in AR context.",
    ],
    featured: true,
  },
  {
    title: "VR Museum Audio Interaction Experience",
    cnTitle: "VR 博物馆音频交互体验 — 风铃关卡",
    year: "2025",
    period: "2025.11.03 — 2025.12.15",
    type: "VR / Sound Interaction / Museum Experience",
    team: "Team project",
    role: "Wind chime level creation and interaction design",
    tools: ["Unity", "Maya"],
    tags: [
      "VR",
      "Audio Interaction",
      "Hand Tracking",
      "Museum",
      "Sound Visualization",
    ],
    video:
      "https://1drv.ms/v/c/bdc609e61e93261b/IQCv-5qkPvNjSKy2ktSPuxjyAVEYDD_FqeMcrem1lKcqQiA?e=EDHsSm",
    images: ["/image/image21.png", "/image/image22.png"],
    summary:
      "A VR museum audio-interaction prototype where visitors can touch wind chimes, trigger sounds, and observe visualized sound waves.",
    details:
      "Users can interact with wind chimes through hand tracking or controllers. The chimes produce collision-based sound feedback and visual sound-wave responses. Opening the window allows wind to move the chimes, creating another layer of environmental interaction.",
    highlights: [
      "Created a tactile sound interaction in VR using hand/controller input.",
      "Linked collision detection with audio feedback.",
      "Designed environmental interaction through wind-driven chime movement.",
      "Explored how museum objects can become playable sensory experiences.",
    ],
    featured: true,
  },
  {
    title: "Turn-Based Battle System Prototype",
    cnTitle: "UE 回合制战斗游戏",
    year: "2024",
    period: "2024.01.03 — 2024.04.06",
    type: "Unreal Engine / Combat System / Game Prototype",
    team: "Solo project",
    role: "Level design and combat system prototyping",
    tools: ["Unreal Engine"],
    tags: ["UE", "Turn-Based Combat", "AI", "UI", "Game System"],
    video:
      "https://1drv.ms/v/c/bdc609e61e93261b/IQDnaPtUb5VLRLHC99mHdIMsAUisBOkQ5fUN1UxRBcXwLZo?e=yltLhC",
    images: ["/image/image7.png", "/image/image8.png", "/image/image9.png"],
    summary:
      "A turn-based combat prototype made in Unreal Engine, featuring action order UI, target selection, enemy encounters, battle feedback, loot and storage systems.",
    details:
      "The project explored core RPG battle logic, including action bars, highlighted target states, attack and hit animations, skill effects, numerical systems, and random encounter zones similar to grass-area encounters in Pokémon.",
    highlights: [
      "Built turn-order UI with target and avatar highlight feedback.",
      "Implemented attack, movement, hit reactions and skill effects.",
      "Designed numerical combat logic, loot and warehouse systems.",
      "Created probability-based encounter zones for combat triggering.",
    ],
    featured: false,
  },
  {
    title: "The Interval of Time",
    cnTitle: "时之狭间 — 建模作品",
    year: "2025",
    period: "2025.11.04 — 2025.12.28",
    type: "3D Modeling / Maya",
    team: "Solo project",
    role: "Modeling and visual composition",
    tools: ["Maya"],
    tags: ["3D Modeling", "Maya", "Visual Design"],
    video: "",
    images: [
      "/image/image13.png",
      "/image/image14.png",
      "/image/image15.png",
      "/image/image16.png",
    ],
    summary:
      "A 3D modeling work exploring spatial mood, object detail, and visual composition through Maya.",
    details:
      "This project demonstrates my 3D asset creation ability and supports my immersive design practice with modeling, composition and visual environment-building skills.",
    highlights: [
      "Created 3D assets and spatial composition in Maya.",
      "Focused on object detail, atmosphere, and visual storytelling.",
    ],
    featured: false,
  },
  {
    title: "Star Wars Micro Film",
    cnTitle: "星球大战微视频",
    year: "2025",
    period: "2025.06.10 — 2025.07.20",
    type: "UE / Cinematic Sequence / Scene Building",
    team: "Solo project",
    role: "Scene building, animation and level sequence",
    tools: ["Unreal Engine"],
    tags: ["UE", "Cinematic", "Animation", "Scene Design"],
    video: "",
    images: [
      "/image/image17.png",
      "/image/image18.png",
      "/image/image19.png",
      "/image/image20.png",
    ],
    summary:
      "A short cinematic video created in Unreal Engine, focusing on scene construction, camera movement, animation timing and level sequencing.",
    details:
      "The project helped me practice real-time cinematic production, including scene staging, animation arrangement, shot rhythm and sequence editing in Unreal Engine.",
    highlights: [
      "Built cinematic scenes in Unreal Engine.",
      "Created animation and level sequences.",
      "Explored camera rhythm and real-time visual storytelling.",
    ],
    featured: false,
  },
];

const focusAreas = [
  "VR / AR Interaction",
  "Game Design",
  "Level Design",
  "Sound Interaction",
  "Real-time 3D",
  "Digital Cultural Experience",
  "Unity",
  "Unreal Engine",
  "Maya / Blender",
  "Gameplay Prototyping",
];

const filters = [
  "All",
  "VR",
  "AR",
  "UE",
  "Level Design",
  "Sound",
  "Game System",
  "3D Modeling",
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function Tag({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-neutral-300">
      {children}
    </span>
  );
}

function ProjectCard({ project, index }) {
  const visibleImages = project.images?.slice(0, project.featured ? 6 : 4) || [];

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      className={`group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] shadow-2xl shadow-black/20 transition hover:-translate-y-1 hover:bg-white/[0.08] ${
        project.featured ? "md:col-span-2" : ""
      }`}
    >
      <div
        className={`grid gap-0 ${
          project.featured ? "md:grid-cols-[0.92fr_1.08fr]" : ""
        }`}
      >
        <div className="relative overflow-hidden bg-neutral-900">
          <div className="grid h-full min-h-[300px] grid-cols-2 gap-1 p-1">
            {visibleImages.map((image, imageIndex) => (
              <figure
                key={image}
                className={`relative overflow-hidden rounded-2xl bg-neutral-800 ${
                  visibleImages.length === 1 ? "col-span-2 row-span-2" : ""
                }`}
              >
                <img
                  src={image}
                  alt={`${project.title} screenshot ${imageIndex + 1}`}
                  className="h-full min-h-[145px] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </figure>
            ))}
          </div>

          <div className="absolute left-5 top-5 rounded-full bg-black/60 px-4 py-2 text-xs text-neutral-100 backdrop-blur">
            {project.period}
          </div>

          <div className="absolute bottom-5 left-5 right-5 rounded-3xl bg-black/50 p-4 backdrop-blur">
            <p className="text-sm text-neutral-300">{project.cnTitle}</p>
            <h3 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-white">
              {project.title}
            </h3>
          </div>
        </div>

        <div className="flex flex-col p-6 md:p-8">
          <div className="mb-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          <div className="mb-6 grid gap-3 text-sm text-neutral-400 sm:grid-cols-2">
            <p>
              <span className="text-neutral-200">Type</span>
              <br />
              {project.type}
            </p>
            <p>
              <span className="text-neutral-200">Team</span>
              <br />
              {project.team}
            </p>
            <p className="sm:col-span-2">
              <span className="text-neutral-200">My Role</span>
              <br />
              {project.role}
            </p>
            <p className="sm:col-span-2">
              <span className="text-neutral-200">Tools</span>
              <br />
              {project.tools.join(" · ")}
            </p>
          </div>

          <p className="leading-7 text-neutral-300">{project.summary}</p>
          <p className="mt-4 leading-7 text-neutral-400">{project.details}</p>

          <ul className="mt-5 space-y-2 text-sm leading-6 text-neutral-300">
            {project.highlights.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-3">
            {project.video ? (
              <a
                href={project.video}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-white px-5 py-3 text-sm font-medium text-neutral-950 transition hover:bg-neutral-200"
              >
                Watch Demo <Arrow />
              </a>
            ) : (
              <span className="rounded-full border border-white/10 px-5 py-3 text-sm text-neutral-500">
                Video to be added
              </span>
            )}
          </div>

          {project.video && (
            <p className="mt-4 break-all rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-xs leading-5 text-neutral-400">
              <span className="text-neutral-200">Video link: </span>
              <a
                href={project.video}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-white/30 underline-offset-4 hover:text-white"
              >
                {project.video}
              </a>
            </p>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();

    return projects.filter((project) => {
      const searchable = [
        project.title,
        project.cnTitle,
        project.type,
        project.role,
        project.summary,
        project.details,
        project.tags.join(" "),
        project.tools.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = !q || searchable.includes(q);
      const matchesFilter =
        activeFilter === "All" ||
        project.tags.includes(activeFilter) ||
        project.type.includes(activeFilter) ||
        project.tools.includes(activeFilter);

      return matchesQuery && matchesFilter;
    });
  }, [query, activeFilter]);

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-white blur-3xl" />
          <div className="absolute -bottom-40 right-0 h-[32rem] w-[32rem] rounded-full bg-neutral-600 blur-3xl" />
        </div>

        <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <a
            href="#top"
            className="text-sm font-semibold tracking-wide text-neutral-200"
          >
            {profile.englishName}
          </a>

          <div className="hidden items-center gap-6 text-sm text-neutral-300 md:flex">
            <a href="#work" className="hover:text-white">
              Work
            </a>
            <a href="#about" className="hover:text-white">
              About
            </a>
            <a href="#contact" className="hover:text-white">
              Contact
            </a>
          </div>

          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-neutral-950 transition hover:bg-neutral-200"
          >
            Contact
          </a>
        </nav>

        <div
          id="top"
          className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-14 md:grid-cols-[1.25fr_0.75fr] md:items-end md:pt-28"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300 backdrop-blur">
              Digital Heritage 2026 · Portfolio for Global Innovator Contest
            </div>

            <h1 className="max-w-5xl text-5xl font-semibold leading-[0.98] tracking-tight md:text-7xl">
              Immersive interaction for memory, space and cultural experience.
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-300 md:text-xl">
              {profile.intro}
            </p>

            <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-400">
              {profile.cnIntro}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#work"
                className="rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition hover:bg-neutral-200"
              >
                View Selected Work <Arrow />
              </a>

              <a
                href={projects[0].video}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Watch Main VR Demo <Arrow />
              </a>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/30 backdrop-blur"
          >
            <div className="aspect-square rounded-[1.5rem] bg-[radial-gradient(circle_at_35%_20%,rgba(255,255,255,0.9),transparent_18%),radial-gradient(circle_at_70%_70%,rgba(120,120,120,0.8),transparent_24%),linear-gradient(135deg,#fafafa,#555_45%,#060606)] p-1">
              <div className="flex h-full items-end rounded-[1.35rem] bg-neutral-950/35 p-5">
                <div>
                  <p className="text-3xl font-semibold">{profile.name}</p>
                  <p className="mt-1 text-lg text-neutral-100">
                    {profile.englishName}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-3 text-sm leading-6 text-neutral-300">
              <p>{profile.role}</p>
              <p>{profile.school}</p>
              <p>{profile.location}</p>
            </div>
          </motion.aside>
        </div>
      </section>

      <section id="work" className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-neutral-500">
              Selected Work
            </p>

            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Projects for immersive cultural experience
            </h2>

            <p className="mt-4 max-w-3xl leading-7 text-neutral-400">
              A curated selection of VR, AR, gameplay, sound interaction and
              real-time 3D projects, emphasizing my ability to build interactive
              environments and playable experiences.
            </p>
          </div>

          <div className="w-full md:w-[380px]">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, tools or tags"
              className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-white/30"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                activeFilter === filter
                  ? "bg-white text-neutral-950"
                  : "border border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </section>

      <section
        id="about"
        className="mx-auto grid max-w-7xl gap-8 px-6 py-20 md:grid-cols-[0.85fr_1.15fr]"
      >
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-neutral-500">
            About
          </p>

          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Designing experiences that can be entered, touched and remembered.
          </h2>
        </div>

        <div className="space-y-6 text-lg leading-8 text-neutral-300">
          <p>
            My current practice sits between immersive technology, game
            interaction and digital cultural storytelling. I am especially
            interested in how virtual spaces, sound, gestures and interactive
            objects can turn memory or cultural content into embodied
            experience.
          </p>

          <p>
            目前我希望在本次 Digital Heritage 2026 Global Innovator Contest
            中突出自己的 VR/AR
            交互、游戏系统、关卡设计、声音交互和数字文化体验能力，为团队贡献沉浸式原型制作与互动叙事设计。
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {focusAreas.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-neutral-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-6 py-20">
        <div className="overflow-hidden rounded-[2rem] bg-white p-8 text-neutral-950 md:p-12">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-neutral-500">
                Contact
              </p>

              <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">
                Let’s build immersive heritage experiences.
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
                Available for Digital Heritage 2026 team collaboration, VR/AR
                prototyping, interactive experience design and real-time 3D
                production.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="rounded-full bg-neutral-950 px-6 py-3 text-center text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                {profile.email}
              </a>

              <a
                href="#work"
                className="rounded-full border border-neutral-300 px-6 py-3 text-center text-sm font-medium text-neutral-950 transition hover:bg-neutral-100"
              >
                Back to Projects
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-10 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between">
        <p>
          © 2026 {profile.englishName}. Portfolio for Digital Heritage 2026
          Global Innovator Contest.
        </p>
        <p>Built with React and immersive curiosity.</p>
      </footer>
    </main>
  );
}