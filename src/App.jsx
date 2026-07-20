import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import BorderGlow from "./components/BorderGlow";
import Galaxy from "./components/Galaxy";
import PillNav from "./components/PillNav";
import PixelTransition from "./components/PixelTransition";
import ShapeBlur from "./components/ShapeBlur";

const profile = {
  name: "王铮",
  englishName: "Wang Zheng",
  photo: "/image/Profile.jpg",
  role: "VR交互设计 / 游戏策划 / 关卡设计 / 技术策划",
  school:
    "MSc Immersive Technologies (Virtual and Augmented Reality), University of Bristol",
  location: "Bristol / 国内机会",
  email: "kagaminic@gmail.com",
  availability: "可到岗时间：2026年9月1日后",
  intro:
    "我希望寻找 VR交互设计、游戏策划、关卡设计或技术策划相关岗位，擅长把交互逻辑、空间叙事、关卡流程和实时3D原型结合成可体验的游戏内容。",
  cnIntro:
    "我的项目经历覆盖 Unity VR/AR 原型、Unreal 回合制战斗系统、关卡流程设计、交互道具设计、声音反馈与3D场景搭建。作品集中重点展示我从概念、机制、流程到可玩原型落地的能力。",
};

const projects = [
  {
    title: "Starlit Reverie",
    cnTitle: "《Starlit Reverie》VR 太空梦境关卡",
    year: "2026",
    period: "2026.02.23 — 2026.05.07",
    type: "VR / Level Design / Interaction",
    team: "5人团队",
    role: "梦境关卡设计、交互流程、道具交互、氛围营造与完整关卡序列制作",
    tools: ["Unity", "Wwise", "Maya", "Blender"],
    tags: ["VR", "Level Design", "Dream Space", "Interactive Props", "Sound"],
    video:
      "/Video/VR%E6%B8%B8%E6%88%8F.mp4",
    images: [
      "/image/image1.png",
      "/image/image2.png",
      "/image/image3.png",
      "/image/image4.png",
      "/image/image5.png",
      "/image/image6.png",
    ],
    summary:
      "一款以宇航员视角展开的 VR 沉浸式体验。玩家驾驶飞船穿越小行星带，并在太空中的梦境片段里逐步寻找记忆线索。",
    details:
      "我负责完整梦境关卡的体验设计与制作，包括教室、客厅生日记忆、烟花三个梦境场景，随后衔接记忆重构阶段，并通过 passthrough 视角完成回到现实的最终转换。",
    highlights: [
      "设计由发光传送门连接的多阶段梦境关卡流程。",
      "制作笔记本、铅笔、橡皮、蛋糕、蜡烛、礼花枪、玩具飞船和烟花等交互道具。",
      "设计抓取、投掷、飞行、拉取传送门、发射烟花等手势与手柄交互。",
      "用空间氛围和物件交互呈现可探索的碎片化记忆体验。",
    ],
    featured: true,
  },
  {
    title: "The Living Grimoire: Runes of the Realm",
    cnTitle: "《The Living Grimoire: Runes of the Realm》AR 符文战斗游戏",
    year: "2026",
    period: "2026.02.21 — 2026.04.28",
    type: "AR / Unity / Gameplay Prototype",
    team: "团队项目",
    role: "AR平面/图像扫描、关卡切换逻辑与战斗空间生成",
    tools: ["Unity"],
    tags: ["AR", "Image Tracking", "Level Generation", "Gameplay"],
    video:
      "/Video/AR%E6%B8%B8%E6%88%8F.mp4",
    images: ["/image/image10.png", "/image/image11.png", "/image/image12.png"],
    summary:
      "一款基于符文识别、空间扫描和战斗场景生成的 AR 玩法原型。",
    details:
      "我的工作重点是把 AR 识别流程与玩法推进连接起来：扫描平面与图像目标，触发关卡切换，并在真实空间中生成战斗区域。",
    highlights: [
      "实现 AR 平面识别与图像扫描流程。",
      "将扫描目标与关卡切换逻辑连接。",
      "支持在 AR 环境中生成可游玩的战斗空间。",
    ],
    featured: true,
  },
  {
    title: "VR Museum Audio Interaction Experience",
    cnTitle: "VR 博物馆音频交互体验 — 风铃关卡",
    year: "2025",
    period: "2025.11.03 — 2025.12.15",
    type: "VR / Sound Interaction / Museum Experience",
    team: "团队项目",
    role: "风铃关卡制作与音频交互设计",
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
      "一个 VR 博物馆音频交互原型，玩家可以触碰风铃、触发声音，并观察声音波形的可视化反馈。",
    details:
      "用户可以通过手部追踪或手柄与风铃互动。风铃在碰撞后产生声音反馈和声波视觉反馈，打开窗户后风会推动风铃，形成另一层环境交互。",
    highlights: [
      "使用手部追踪和手柄输入设计可触碰的 VR 声音交互。",
      "将碰撞检测与音频反馈连接。",
      "设计由风驱动风铃运动的环境交互。",
      "探索博物馆展品如何转化为可游玩的感官体验。",
    ],
    featured: false,
  },
  {
    title: "Turn-Based Battle System Prototype",
    cnTitle: "UE 回合制战斗游戏",
    year: "2024",
    period: "2024.01.03 — 2024.04.06",
    type: "Unreal Engine / Combat System / Game Prototype",
    team: "个人项目",
    role: "关卡设计与回合制战斗系统原型",
    tools: ["Unreal Engine"],
    tags: ["UE", "Turn-Based Combat", "AI", "UI", "Game System"],
    video:
      "/Video/%E5%9B%9E%E5%90%88%E5%88%B6%E6%88%98%E6%96%97%E6%B8%B8%E6%88%8F.mp4",
    images: ["/image/image7.png", "/image/image8.png", "/image/image9.png"],
    summary:
      "一个使用 Unreal Engine 制作的回合制战斗原型，包含行动顺序 UI、目标选择、敌人遭遇、战斗反馈、掉落和仓库系统。",
    details:
      "项目探索 RPG 战斗核心逻辑，包括行动条、目标高亮、攻击与受击动画、技能效果、数值系统，以及类似宝可梦草丛遇敌的随机遭遇区域。",
    highlights: [
      "搭建行动顺序 UI，并加入目标与头像高亮反馈。",
      "实现攻击、移动、受击反馈和技能效果。",
      "设计战斗数值逻辑、掉落与仓库系统。",
      "制作基于概率触发的遇敌区域。",
    ],
    featured: false,
  },
  {
    title: "Sakura and Star Dream",
    cnTitle: "《樱与星之梦》",
    year: "2024",
    period: "彩蛋",
    type: "UE / Blueprint / Puzzle Game",
    team: "个人项目",
    role: "蓝图逻辑、场景交互、解密机制、时间与天空变化、粒子和音频效果、场景重搭",
    tools: ["Unreal Engine", "Blueprint"],
    tags: ["UE", "Blueprint", "Puzzle", "Scene Interaction", "Personal Game"],
    video:
      "/Video/%E6%A8%B1%E4%B9%8B%E6%A2%A6.mp4",
    images: ["/image/%E6%A8%B1%E4%B9%8B%E6%A2%A60.png", "/image/%E6%A8%B1%E4%B9%8B%E6%A2%A61.png"],
    summary:
      "彩蛋：人生中第一个游戏。用 UE 蓝图完成场景交互、解密机制、时间变化、特效和音频反馈。",
    details:
      "虽然结尾现在看来仍有些难为情，但我不会忘记那时投入的热情，与完成时的满足。那是我逝去的青春(=´▽｀)ゞ",
    highlights: [
      "UE 蓝图实现场景交互、上锁的门等解密机制。",
      "制作改变天空/时间、粒子特效、音乐音效和射线追踪效果。",
      "场景资产来自商城，但窗户、玻璃、房梁、柱子、花草、灯光、画卷和榻榻米全部手动重新搭建。",
      "耗时两个半月，用来表白。（最后失败了）（笑）",
    ],
    pixelTransition: true,
    pixelIntro: [
      "人生中第一个游戏",
      "UE蓝图实现，场景交互，解密机制（上锁的门），改变天空/时间，粒子特效，音乐音效，射线追踪...",
      "场景资产来自商城但全部手动重新搭建，包括每一个窗户，每一个玻璃，每一个房梁和柱子，花草，灯光，画卷和榻榻米",
      "耗时两个半月，用来表白",
      "（最后失败了）（笑）",
      "虽然结尾现在看来仍有些难为情",
      "但我不会忘记那时投入的热情，与完成时的满足",
      "那是我逝去的青春(=´▽｀)ゞ",
    ],
    featured: false,
  },
  {
    title: "The Interval of Time",
    cnTitle: "时之狭间 — 建模作品",
    year: "2025",
    period: "2025.11.04 — 2025.12.28",
    type: "3D Modeling / Maya",
    team: "个人项目",
    role: "模型制作与视觉构图",
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
      "一个使用 Maya 完成的 3D 建模作品，重点探索空间氛围、物件细节和视觉构图。",
    details:
      "该项目展示我的 3D 资产制作能力，也为沉浸式项目中的场景搭建、视觉组织和环境表达提供支持。",
    highlights: [
      "使用 Maya 完成 3D 资产与空间构图。",
      "关注物件细节、氛围塑造和视觉叙事。",
    ],
    featured: true,
  },
  {
    title: "Star Wars Micro Film",
    cnTitle: "星球大战微视频",
    year: "2025",
    period: "2025.06.10 — 2025.07.20",
    type: "UE / Cinematic Sequence / Scene Building",
    team: "个人项目",
    role: "场景搭建、动画与关卡序列制作",
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
      "一个使用 Unreal Engine 制作的短片项目，重点练习场景搭建、镜头运动、动画节奏和关卡序列。",
    details:
      "项目帮助我练习实时影像制作流程，包括场景调度、动画安排、镜头节奏和 Unreal Engine 中的序列编辑。",
    highlights: [
      "在 Unreal Engine 中搭建电影化场景。",
      "制作动画与关卡序列。",
      "探索镜头节奏和实时视觉叙事。",
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

const mainProjects = [
  projects.find((project) => project.title === "Starlit Reverie"),
  projects.find((project) => project.title === "The Living Grimoire: Runes of the Realm"),
  projects.find((project) => project.title === "The Interval of Time"),
].filter(Boolean);

const supportingProjects = projects.filter((project) => !mainProjects.includes(project));
const portfolioVideo = "/Video/%E4%BD%9C%E5%93%81%E9%9B%86%E8%A7%86%E9%A2%91.mp4";
const navItems = [
  { label: "作品", href: "#work" },
  { label: "关于我", href: "#about" },
  { label: "联系", href: "#contact" },
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

function Reveal({
  children,
  className = "",
  delay = 0,
  as: Component = motion.div,
  ...props
}) {
  return (
    <Component
      initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}

function ProjectDivider({ project, index }) {
  return (
    <div className="project-breath-divider flex items-center gap-4 py-3">
      <div className="breath-line h-px flex-1" />
      <div className="breath-chip max-w-[74vw] truncate rounded-full border px-4 py-2 text-xs uppercase tracking-[0.24em] text-neutral-300 backdrop-blur">
        Main Project {String(index + 1).padStart(2, "0")} · {project.cnTitle}
      </div>
      <div className="breath-line h-px flex-1" />
    </div>
  );
}

function ImageTile({ image, project, imageIndex, layoutClass = "" }) {
  return (
    <figure className={`relative overflow-hidden rounded-2xl bg-neutral-800 ${layoutClass}`}>
      <img
        src={image}
        alt={`${project.title} screenshot ${imageIndex + 1}`}
        className="h-full min-h-[145px] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
      />
    </figure>
  );
}

function ProjectCard({ project, index }) {
  const visibleImages = project.images?.slice(0, project.featured ? 6 : 4) || [];
  const isThreeImageFeature = project.featured && visibleImages.length === 3;
  const isCompactFeature = isThreeImageFeature;

  return (
    <BorderGlow
      animated={index === 0}
      className={`group transition hover:-translate-y-1 ${
        project.featured ? "md:col-span-2" : ""
      }`}
      backgroundColor="rgba(21, 21, 21, 0.9)"
      borderRadius={32}
      glowColor="190 92 72"
    >
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: index * 0.04 }}
        className="overflow-hidden bg-[#151515]/88 backdrop-blur"
      >
        <div
          className={`grid gap-0 ${
            project.featured
              ? isCompactFeature
                ? "md:grid-cols-[0.84fr_1.16fr]"
                : "md:grid-cols-[0.92fr_1.08fr]"
              : ""
          }`}
        >
          <div className="relative overflow-hidden bg-neutral-900">
            <div
              className={`grid grid-cols-2 gap-1 p-1 ${
                isCompactFeature
                  ? "h-[420px] auto-rows-fr md:h-[520px]"
                  : "h-full min-h-[300px]"
              }`}
            >
              {visibleImages.map((image, imageIndex) => {
                const layoutClass =
                  visibleImages.length === 1
                    ? "col-span-2 row-span-2"
                    : isCompactFeature && imageIndex === 2
                      ? "col-span-2"
                      : "";

                return (
                  <ImageTile
                    key={image}
                    image={image}
                    project={project}
                    imageIndex={imageIndex}
                    layoutClass={layoutClass}
                  />
                );
              })}
            </div>

            <div className="absolute left-5 top-5 rounded-full bg-black/60 px-4 py-2 text-xs text-neutral-100 backdrop-blur">
              {project.period}
            </div>

            <div className="absolute bottom-5 left-5 right-5 rounded-3xl bg-black/50 p-4 backdrop-blur">
              <p className="text-sm text-neutral-300">{project.cnTitle}</p>
              <h3 className="mt-2 break-words text-3xl font-semibold leading-tight tracking-tight text-white">
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
                <span className="text-neutral-200">项目类型</span>
                <br />
                {project.type}
              </p>

              <p>
                <span className="text-neutral-200">团队</span>
                <br />
                {project.team}
              </p>

              <p className="sm:col-span-2">
                <span className="text-neutral-200">我的职责</span>
                <br />
                {project.role}
              </p>

              <p className="sm:col-span-2">
                <span className="text-neutral-200">使用工具</span>
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
                  观看演示 <Arrow />
                </a>
              ) : (
                <span className="rounded-full border border-white/10 px-5 py-3 text-sm text-neutral-500">
                  暂无演示视频
                </span>
              )}
            </div>

            {project.video && (
              <p className="mt-4 break-all rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-xs leading-5 text-neutral-400">
                <span className="text-neutral-200">演示链接： </span>
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
    </BorderGlow>
  );
}

function SupportingCarousel({ projects, activeIndex, setActiveIndex }) {
  const project = projects[activeIndex];
  const visibleImages = project.images?.slice(0, 3) || [];
  const isPixelProject = Boolean(project.pixelTransition);

  const go = (direction) => {
    setActiveIndex((current) => {
      const next = current + direction;
      if (next < 0) return projects.length - 1;
      if (next >= projects.length) return 0;
      return next;
    });
  };

  return (
    <Reveal as={motion.section} className="mx-auto max-w-7xl px-6 py-20">
      <Reveal delay={0.08} className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-neutral-500">
            Supporting Work
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            其他作品
          </h2>
        </div>
      </Reveal>

      <Reveal delay={0.16} className="relative">
        <button
          onClick={() => go(-1)}
          aria-label="上一个其他作品"
          className="group absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/[0.07] text-lg text-white shadow-[0_18px_60px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-xl transition duration-200 hover:border-white/25 hover:bg-white/[0.12] hover:shadow-[0_18px_70px_rgba(125,211,252,0.18),inset_0_1px_0_rgba(255,255,255,0.24)] active:scale-90 active:bg-white/[0.16] md:left-0 md:-translate-x-1/2"
        >
          <span className="transition duration-200 group-active:-translate-x-0.5">←</span>
        </button>

        <button
          onClick={() => go(1)}
          aria-label="下一个其他作品"
          className="group absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/[0.07] text-lg text-white shadow-[0_18px_60px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-xl transition duration-200 hover:border-white/25 hover:bg-white/[0.12] hover:shadow-[0_18px_70px_rgba(125,211,252,0.18),inset_0_1px_0_rgba(255,255,255,0.24)] active:scale-90 active:bg-white/[0.16] md:right-0 md:translate-x-1/2"
        >
          <span className="transition duration-200 group-active:translate-x-0.5">→</span>
        </button>

        <BorderGlow
          key={project.title}
          backgroundColor="rgba(21, 21, 21, 0.9)"
          borderRadius={32}
          glowColor="265 86 76"
        >
          {isPixelProject ? (
            <motion.article
              initial={{ opacity: 0.65, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32 }}
              className="overflow-hidden bg-white"
            >
              <PixelTransition
                className="sakura-pixel-card min-h-[520px]"
                gridSize={16}
                pixelColor="#ffffff"
                animationStepDuration={0.46}
                aspectRatio="0"
                firstContent={
                  <div className="sakura-pixel-front">
                    <div className="sakura-menu-title">彩蛋</div>
                  </div>
                }
                secondContent={
                  <div className="sakura-pixel-back">
                    <div className="sakura-pixel-copy">
                      {project.pixelIntro.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                    <div className="sakura-pixel-images">
                      {visibleImages.map((image, imageIndex) => (
                        <img
                          key={image}
                          src={image}
                          alt={`${project.title} screenshot ${imageIndex + 1}`}
                        />
                      ))}
                    </div>
                    <a
                      href={project.video}
                      target="_blank"
                      rel="noreferrer"
                      className="sakura-pixel-link"
                    >
                      观看 Demo <Arrow />
                    </a>
                    <span className="sakura-pixel-count">
                      {activeIndex + 1} / {projects.length}
                    </span>
                  </div>
                }
              />
            </motion.article>
          ) : (
            <motion.article
              initial={{ opacity: 0.65, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32 }}
              className="overflow-hidden bg-[#151515]/88 backdrop-blur"
            >
              <div className="grid min-h-[520px] gap-0 lg:grid-cols-[0.88fr_1.12fr]">
                <div className="bg-neutral-950 p-1">
                  <div className="grid h-full grid-cols-3 gap-1 lg:grid-cols-1">
                    {visibleImages.map((image, imageIndex) => (
                      <figure key={image} className="overflow-hidden rounded-2xl bg-neutral-800">
                        <img
                          src={image}
                          alt={`${project.title} screenshot ${imageIndex + 1}`}
                          className="h-full min-h-[160px] w-full object-cover"
                        />
                      </figure>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-center p-6 md:p-10">
                  <div className="mb-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>

                  <p className="text-sm text-neutral-400">{project.period}</p>
                  <h3 className="mt-3 break-words text-4xl font-semibold leading-tight text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-lg text-neutral-300">{project.cnTitle}</p>

                  <div className="mt-6 grid gap-3 text-sm text-neutral-400 sm:grid-cols-2">
                    <p>
                      <span className="text-neutral-200">项目类型</span>
                      <br />
                      {project.type}
                    </p>
                    <p>
                      <span className="text-neutral-200">团队</span>
                      <br />
                      {project.team}
                    </p>
                    <p className="sm:col-span-2">
                      <span className="text-neutral-200">我的职责</span>
                      <br />
                      {project.role}
                    </p>
                    <p className="sm:col-span-2">
                      <span className="text-neutral-200">使用工具</span>
                      <br />
                      {project.tools.join(" · ")}
                    </p>
                  </div>

                  <p className="mt-6 leading-7 text-neutral-300">{project.summary}</p>
                  <p className="mt-4 leading-7 text-neutral-400">{project.details}</p>

                  <div className="mt-7 flex items-center justify-between gap-4">
                    {project.video ? (
                      <a
                        href={project.video}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-white px-5 py-3 text-sm font-medium text-neutral-950 transition hover:bg-neutral-200"
                      >
                        观看演示 <Arrow />
                      </a>
                    ) : (
                      <span className="rounded-full border border-white/10 px-5 py-3 text-sm text-neutral-500">
                        暂无演示视频
                      </span>
                    )}
                    <span className="text-sm text-neutral-500">
                      {activeIndex + 1} / {projects.length}
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          )}
        </BorderGlow>
      </Reveal>
    </Reveal>
  );
}

function BackgroundVideo({ src, className = "opacity-[0.16]" }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      video.play().catch(() => {});
    };

    playVideo();
    video.addEventListener("canplay", playVideo);
    return () => video.removeEventListener("canplay", playVideo);
  }, []);

  return (
    <video
      ref={videoRef}
      className={`pointer-events-none absolute inset-0 h-full w-full object-cover ${className}`}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
}

function SectionEdgeBlur() {
  const layerRef = useRef(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return undefined;

    const handlePointerMove = (event) => {
      const rect = layer.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      const edgeRange = Math.min(360, viewportWidth * 0.18);
      const inVerticalRange = event.clientY >= rect.top && event.clientY <= rect.bottom;
      const leftStrength = inVerticalRange
        ? Math.max(0, 1 - event.clientX / edgeRange)
        : 0;
      const rightStrength = inVerticalRange
        ? Math.max(0, 1 - (viewportWidth - event.clientX) / edgeRange)
        : 0;
      const activeStrength = Math.max(leftStrength, rightStrength);

      layer.style.setProperty("--edge-x", `${x}px`);
      layer.style.setProperty("--edge-y", `${y}px`);
      layer.style.setProperty("--edge-active", activeStrength.toFixed(3));
      layer.style.setProperty("--edge-left-active", leftStrength.toFixed(3));
      layer.style.setProperty("--edge-right-active", rightStrength.toFixed(3));
    };

    const handlePointerLeave = () => {
      layer.style.setProperty("--edge-active", "0");
      layer.style.setProperty("--edge-left-active", "0");
      layer.style.setProperty("--edge-right-active", "0");
    };

    window.addEventListener("pointermove", handlePointerMove);
    layer.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      layer.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div className="section-edge-blur" ref={layerRef} aria-hidden="true">
      <span className="edge-follow edge-follow-left" />
      <span className="edge-follow edge-follow-right" />
      <div className="edge-shape edge-shape-left">
        <ShapeBlur
          variation={0}
          shapeSize={1.05}
          roundness={0.68}
          borderSize={0.08}
          circleSize={0.22}
          circleEdge={0.72}
        />
      </div>
      <div className="edge-shape edge-shape-right">
        <ShapeBlur
          variation={2}
          shapeSize={1.12}
          roundness={0.52}
          borderSize={0.055}
          circleSize={0.24}
          circleEdge={0.7}
        />
      </div>
    </div>
  );
}

function VideoModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined;
    const handleKeyDown = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      onMouseDown={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-5xl overflow-hidden rounded-3xl border border-white/15 bg-[#111216] shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.cnTitle} 演示视频`}
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
          <div className="min-w-0">
            <p className="truncate font-medium text-white">{project.cnTitle}</p>
            <p className="truncate text-sm text-neutral-500">{project.title}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-xl text-white transition hover:bg-white/10"
            aria-label="关闭视频"
          >
            ×
          </button>
        </div>
        <video
          src={project.video}
          controls
          autoPlay
          playsInline
          className="aspect-video w-full bg-black"
        />
      </motion.div>
    </div>,
    document.body,
  );
}

export default function App() {
  const [supportIndex, setSupportIndex] = useState(0);
  const [videoProject, setVideoProject] = useState(null);

  const handleLocalVideoClick = (event) => {
    const link = event.target.closest('a[href^="/Video/"]');
    if (!link) return;
    const project = projects.find((item) => item.video === link.getAttribute("href"));
    if (!project) return;
    event.preventDefault();
    setVideoProject(project);
  };

  return (
    <main className="portfolio-bg min-h-screen text-neutral-50" onClick={handleLocalVideoClick}>
      <section className="relative min-h-screen overflow-hidden border-b border-white/10">
        <BackgroundVideo src={portfolioVideo} className="opacity-[0.48]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_34%,rgba(8,9,12,0.08),rgba(5,6,8,0.68)_74%)]" />
        <div className="absolute inset-0 bg-black/12" />

        <PillNav
          logo={profile.photo}
          logoAlt={`${profile.englishName} avatar`}
          items={navItems}
          activeHref="#top"
          baseColor="rgba(255, 255, 255, 0.92)"
          pillColor="rgba(12, 13, 16, 0.92)"
          hoveredPillTextColor="#101114"
          pillTextColor="#f6f7fb"
        />

        <div
          id="top"
          className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-28 md:grid-cols-[1.25fr_0.75fr] md:items-end md:pt-40"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300 backdrop-blur">
              求职作品集 · VR交互设计 / 游戏策划 / 关卡设计 / 技术策划
            </div>

            <h1 className="max-w-5xl text-5xl font-semibold leading-[0.98] tracking-tight md:text-7xl">
              用可玩的交互原型，把空间、机制和叙事落地。
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
                查看项目作品 <Arrow />
              </a>

              <a
                href={projects[0].video}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                观看VR项目演示 <Arrow />
              </a>
            </div>
          </motion.div>

          <BorderGlow
            animated
            backgroundColor="rgba(255,255,255,0.08)"
            borderRadius={32}
            glowColor="190 90 74"
          >
            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="bg-white/10 p-6 shadow-2xl shadow-black/30 backdrop-blur"
            >
              <div className="relative aspect-square overflow-hidden rounded-[1.5rem] border border-white/10 bg-neutral-900">
                <img
                  src={profile.photo}
                  alt={`${profile.englishName} profile photo`}
                  className="h-full w-full object-cover object-center"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-3xl font-semibold text-white">
                    {profile.name}
                  </p>
                  <p className="mt-1 text-lg text-neutral-100">
                    {profile.englishName}
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3 text-sm leading-6 text-neutral-300">
                <p>{profile.role}</p>
                <p>{profile.school}</p>
                <p>{profile.location}</p>
                <p>{profile.availability}</p>
              </div>
            </motion.aside>
          </BorderGlow>
        </div>
      </section>

      <div className="post-home-shell">
        <SectionEdgeBlur />
      <section
        id="work"
        className="work-section mx-auto max-w-7xl px-6 py-20"
      >
        <Reveal delay={0.08} className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-neutral-500">
              Selected Projects
            </p>

            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              作品
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 space-y-9">
          {mainProjects.map((project, index) => {
            const hasVrGalaxy = project.title === "Starlit Reverie";

            return (
              <Reveal
                key={project.title}
                delay={0.12 + index * 0.08}
                className={`relative space-y-5 ${
                  hasVrGalaxy ? "vr-project-galaxy -mx-6 overflow-hidden rounded-[2rem] px-6 py-8" : ""
                }`}
              >
                {hasVrGalaxy && (
                  <>
                    <div className="absolute inset-0 opacity-100">
                      <Galaxy
                        density={1.8}
                        glowIntensity={0.62}
                        hueShift={210}
                        saturation={0.9}
                        starSpeed={0.68}
                        twinkleIntensity={0.58}
                        rotationSpeed={0.035}
                        repulsionStrength={1.25}
                      />
                    </div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_46%_38%,rgba(12,15,20,0.02),rgba(7,8,11,0.58)_78%)]" />
                  </>
                )}
                <div className="relative space-y-5">
                  <ProjectDivider project={project} index={index} />
                  <div className="grid gap-5 md:grid-cols-2">
                    <ProjectCard project={project} index={index} />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <SupportingCarousel
        projects={supportingProjects}
        activeIndex={supportIndex}
        setActiveIndex={setSupportIndex}
      />

      <Reveal
        as={motion.section}
        id="about"
        className="relative mx-auto my-12 grid max-w-7xl gap-8 overflow-hidden rounded-[2rem] px-6 py-20 md:grid-cols-[0.85fr_1.15fr] md:px-10"
      >
        <div className="absolute inset-0 bg-[#090a0c]/72 backdrop-blur-[1px]" />
        <Reveal delay={0.1} className="relative">
          <p className="text-sm uppercase tracking-[0.24em] text-neutral-500">
            About
          </p>

          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            我关注能被进入、被操作、被记住的沉浸式体验。
          </h2>
        </Reveal>

        <Reveal delay={0.18} className="relative space-y-6 text-lg leading-8 text-neutral-300">
          <p>
            我的实践方向位于沉浸式技术、游戏交互和关卡体验之间。我尤其关注虚拟空间、声音反馈、手势操作和可交互物件如何共同组成清晰的玩法节奏。
          </p>

          <p>
            目前我希望寻找 VR交互设计、游戏策划、关卡设计或技术策划相关机会。可贡献的方向包括交互方案设计、玩法流程梳理、Unity/Unreal 原型搭建、关卡节奏设计、需求拆解与跨职能沟通。
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
        </Reveal>
      </Reveal>

      <Reveal as={motion.section} id="contact" className="mx-auto max-w-7xl px-6 py-20">
        <BorderGlow backgroundColor="#f6f7fb" glowColor="266 85 72" borderRadius={32}>
        <div className="overflow-hidden bg-white p-8 text-neutral-950 md:p-12">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
            <Reveal delay={0.12}>
              <p className="text-sm uppercase tracking-[0.24em] text-neutral-500">
                Contact
              </p>

              <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">
                期待参与能真正玩起来的沉浸式项目。
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
                求职方向：VR交互设计、游戏策划、关卡设计、技术策划。{profile.availability}，可参与 VR/AR 原型、玩法设计、关卡流程和实时3D项目制作。
              </p>
            </Reveal>

            <Reveal delay={0.2} className="flex flex-col gap-3">
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
                返回项目作品
              </a>
            </Reveal>
          </div>
        </div>
        </BorderGlow>
      </Reveal>

      <footer className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-10 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between">
        <p>
          © 2026 {profile.englishName}. VR / AR / Game Design Portfolio.
        </p>
        <p>Built with React for job applications in China.</p>
      </footer>
      </div>
      <VideoModal project={videoProject} onClose={() => setVideoProject(null)} />
    </main>
  );
}
