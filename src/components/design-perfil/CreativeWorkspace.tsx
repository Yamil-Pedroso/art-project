import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  FiArrowUpRight,
  FiCopy,
  FiChevronDown,
  FiCircle,
  FiEye,
  FiGrid,
  FiLayers,
  FiLink,
  FiLock,
  FiMousePointer,
  FiPause,
  FiPenTool,
  FiPlay,
  FiPlus,
  FiSliders,
  FiSquare,
  FiTrash2,
  FiType,
} from "react-icons/fi";
import designImage from "@/assets/images/hero/design-hero.webp";
import styles from "./CreativeWorkspace.module.css";
import figma from "@/assets/images/design-perfil/figma.png";

const tools = [
  {
    name: "Photoshop",
    badge: "Ps",
    extension: "psd",
    color: "#70c5ef",
    discipline: "Image & imagination",
    layers: ["Color study", "Paper texture", "Background"],
    property: "Color balance",
    value: "+24",
    shape:
      "M 0 -85 C 55 -85 85 -45 85 0 C 85 55 45 85 0 85 C -55 85 -85 45 -85 0 C -85 -55 -45 -85 0 -85 Z",
  },
  {
    name: "Illustrator",
    badge: "Ai",
    extension: "ai",
    color: "#ffb363",
    discipline: "Points into possibilities",
    layers: ["Bézier study", "Construction lines", "Artboard 01"],
    property: "Corner radius",
    value: "32 px",
    shape:
      "M 0 -85 C 15 -15 15 -15 85 0 C 15 15 15 15 0 85 C -15 15 -15 15 -85 0 C -15 -15 -15 -15 0 -85 Z",
  },
  {
    name: "InDesign",
    badge: "Id",
    extension: "indd",
    color: "#f49cb6",
    discipline: "Type, rhythm & space",
    layers: ["Editorial typography", "Image frame", "Baseline grid"],
    property: "Baseline grid",
    value: "12 pt",
    shape:
      "M 0 -85 C 60 -85 85 -60 85 0 C 85 12 12 12 0 85 C -60 85 -85 60 -85 0 C -85 -12 -12 -12 0 -85 Z",
  },
  {
    name: "Figma",
    image: figma,
    extension: "fig",
    color: "#bea7ef",
    discipline: "Made for the human side",
    layers: ["Atelier / Home", "Components", "Design tokens"],
    property: "Auto layout",
    value: "24 px",
    shape:
      "M 0 -85 C 10 -85 85 -10 85 0 C 85 10 10 85 0 85 C -10 85 -85 10 -85 0 C -85 -10 -10 -85 0 -85 Z",
  },
];

const markPositions = [
  { x: 436, y: 320, scale: 1.15, rotate: -15 },
  { x: 390, y: 300, scale: 1.1, rotate: 0 },
  { x: 515, y: 270, scale: 1.2, rotate: 15 },
  { x: 505, y: 250, scale: 0.62, rotate: 45 },
];

export type WorkspaceDesign = "design-1" | "design-2";

const CreativeWorkspace = ({
  design = "design-1",
}: {
  design?: WorkspaceDesign;
}) => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.25 });
  const reducedMotion = useReducedMotion();
  const tool = tools[active];
  const duration = reducedMotion ? 0 : 0.85;

  useEffect(() => {
    if (paused || focused || !inView || reducedMotion) return;
    const timer = window.setTimeout(
      () => setActive((current) => (current + 1) % tools.length),
      6500,
    );
    return () => window.clearTimeout(timer);
  }, [active, paused, focused, inView, reducedMotion]);

  return (
    <section
      ref={ref}
      className={`${styles.studio} ${design === "design-2" ? styles.editorVariant : ""}`}
      data-design={design}
      aria-label="A preview of my creative studio"
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      }}
      style={{ "--studio-accent": tool.color } as React.CSSProperties}
    >
      <div className={styles.intro}>
        <span className={styles.kicker}>
          <span /> A small look inside the process
        </span>
        <span className={styles.edition}>YAMI ATELIER / STUDIO 01</span>
      </div>

      <div className={styles.shell}>
        <div className={styles.shellHeader}>
          <div className={styles.projectTab}>
            <span className={styles.projectIcon} aria-hidden="true">
              <FiPenTool />
            </span>
            <span>
              Creative desk
              <span className={styles.projectSubtitle}>
                Yami Atelier / In progress
              </span>
            </span>
          </div>
          <div
            className={styles.toolTabs}
            role="group"
            aria-label="Explore a creative tool"
          >
            {tools.map((item, index) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setActive(index)}
                aria-pressed={active === index}
                className={`${styles.toolTab} ${active === index ? styles.toolActive : ""}`}
                style={{ "--tab-color": item.color } as React.CSSProperties}
              >
                <span className={styles.toolBadge} aria-hidden="true">
                  {item.image ? (
                    <img src={item.image} alt="" className="h-4 w-4" />
                  ) : (
                    item.badge
                  )}
                </span>
                <span>{item.name}</span>
                <span className={styles.toolNumber} aria-hidden="true">
                  0{index + 1}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className={styles.editor}>
          <div className={styles.sessionBar}>
            <div className={styles.sessionIdentity}>
              <span className={styles.sessionBadge} aria-hidden="true">
                {tool.image ? (
                  <img src={tool.image} alt="" className="h-6 w-6" />
                ) : (
                  tool.badge
                )}
              </span>
              <div>
                <span className={styles.sessionEyebrow}>THE WORKING FILE</span>
                <span className={styles.filename}>
                  an_idea_in_progress.{tool.extension}
                  <span className={styles.unsaved}>*</span>
                </span>
              </div>
            </div>
            <div className={styles.sessionMetrics} aria-hidden="true">
              <span>
                <small>Discipline</small>
                {tool.name}
              </span>
              <span>
                <small>Perspective</small>0{active + 1} / 04
              </span>
              <span>
                <small>Workspace</small>66.7%
              </span>
            </div>
          </div>
          <div className={styles.workbench}>
            <svg
              className={styles.connections}
              viewBox="0 0 1200 500"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M0 125 H120 Q185 125 185 190 V325 Q185 375 240 375 H960 Q1015 375 1015 320 V190 Q1015 125 1070 125 H1200" />
              <path d="M0 70 H75 Q110 70 110 110 V400 Q110 440 160 440 H1200" />
              <circle cx="185" cy="125" r="5" />
              <circle cx="1015" cy="375" r="5" />
            </svg>

            <div className={styles.toolbar} aria-hidden="true">
              {[
                FiMousePointer,
                FiPenTool,
                FiType,
                FiSquare,
                FiCircle,
                FiGrid,
              ].map((Icon, index) => (
                <span
                  key={index}
                  className={index === active + 1 ? styles.selectedTool : ""}
                >
                  <Icon />
                </span>
              ))}
              <div className={styles.swatches}>
                <i />
                <i />
              </div>
            </div>

            <div className={styles.layers} aria-hidden="true">
              <div className={styles.panelHeading}>
                <FiLayers /> {active === 2 ? "Pages" : "Layers"} <FiPlus />
              </div>
              <div className={styles.layerGroup}>
                <FiChevronDown />{" "}
                {tool.name === "Figma" ? "Atelier app" : "The working file"}
              </div>
              {tool.layers.map((layer, index) => (
                <div
                  key={index}
                  className={`${styles.layer} ${index === 0 ? styles.layerSelected : ""}`}
                >
                  <FiEye />
                  <span>{layer}</span>
                  {index === 2 && <FiLock />}
                </div>
              ))}
              <div className={styles.layerNote}>
                Somewhere between
                <br />
                the first thought
                <br />
                and the final detail.
              </div>
            </div>

            <div className={styles.canvas}>
              <svg
                viewBox="0 0 720 480"
                className={styles.artboard}
                role="img"
                aria-label={`${tool.name} creative study: ${tool.discipline}`}
              >
                <defs>
                  <pattern
                    id="studio-grid"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 20 0 H 0 V 20"
                      fill="none"
                      stroke="#c7c2b5"
                      strokeWidth="0.5"
                    />
                  </pattern>
                  <clipPath id="studio-image-clip">
                    <rect x="85" y="30" width="550" height="420" />
                  </clipPath>
                </defs>
                <rect x="85" y="30" width="550" height="420" fill="#eee9dd" />
                <AnimatePresence initial={false}>
                  <motion.g
                    key={tool.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration }}
                  >
                    {active === 0 && (
                      <>
                        <image
                          href={designImage}
                          x="85"
                          y="30"
                          width="550"
                          height="420"
                          preserveAspectRatio="xMidYMid slice"
                          clipPath="url(#studio-image-clip)"
                        />
                        <rect
                          x="85"
                          y="30"
                          width="550"
                          height="420"
                          fill="#142a3a"
                          opacity="0.3"
                        />
                        <text
                          x="113"
                          y="75"
                          fill="#fff"
                          fontSize="10"
                          letterSpacing="3"
                        >
                          EXPERIMENT NO. 01
                        </text>
                        <text
                          x="110"
                          y="145"
                          fill="#fff"
                          fontSize="57"
                          fontWeight="700"
                          letterSpacing="-3"
                        >
                          A different
                        </text>
                        <text
                          x="110"
                          y="201"
                          fill="#fff"
                          fontSize="57"
                          fontWeight="700"
                          letterSpacing="-3"
                        >
                          perspective.
                        </text>
                        <path d="M110 400 H270" stroke="#fff" strokeWidth="1" />
                        <text
                          x="110"
                          y="421"
                          fill="#fff"
                          fontSize="9"
                          letterSpacing="2"
                        >
                          COLOR / TEXTURE / FEELING
                        </text>
                      </>
                    )}
                    {active === 1 && (
                      <>
                        <rect
                          x="85"
                          y="30"
                          width="550"
                          height="420"
                          fill="url(#studio-grid)"
                        />
                        <text
                          x="110"
                          y="74"
                          fill="#756f60"
                          fontSize="10"
                          letterSpacing="3"
                        >
                          THE BEAUTY OF A BÉZIER
                        </text>
                        <text
                          x="110"
                          y="130"
                          fill="#24291f"
                          fontSize="43"
                          fontWeight="600"
                          letterSpacing="-2"
                        >
                          Every point
                        </text>
                        <text
                          x="110"
                          y="173"
                          fill="#24291f"
                          fontSize="43"
                          fontWeight="600"
                          letterSpacing="-2"
                        >
                          has potential.
                        </text>
                        <path
                          d="M160 340 C200 200 490 400 570 180"
                          fill="none"
                          stroke="#376eae"
                          strokeWidth="1.5"
                          strokeDasharray="5 4"
                        />
                        <path
                          d="M160 340 L200 200 M490 400 L570 180"
                          stroke="#376eae"
                          strokeWidth="0.75"
                        />
                        {[
                          [160, 340],
                          [200, 200],
                          [490, 400],
                          [570, 180],
                        ].map(([x, y]) => (
                          <rect
                            key={x}
                            x={x - 3}
                            y={y - 3}
                            width="6"
                            height="6"
                            fill="#eee9dd"
                            stroke="#376eae"
                          />
                        ))}
                        <text
                          x="110"
                          y="423"
                          fill="#756f60"
                          fontSize="9"
                          letterSpacing="2"
                        >
                          PATHS, NOT LIMITS.
                        </text>
                      </>
                    )}
                    {active === 2 && (
                      <>
                        <rect
                          x="45"
                          y="45"
                          width="630"
                          height="390"
                          fill="#f4efe4"
                        />
                        <path d="M360 45 V435" stroke="#d6cdbc" />
                        <rect
                          x="69"
                          y="69"
                          width="267"
                          height="342"
                          fill="none"
                          stroke="#db9cb0"
                          strokeWidth="0.5"
                        />
                        <rect
                          x="384"
                          y="69"
                          width="267"
                          height="342"
                          fill="none"
                          stroke="#db9cb0"
                          strokeWidth="0.5"
                        />
                        <text
                          x="82"
                          y="100"
                          fill="#8a3851"
                          fontSize="10"
                          letterSpacing="3"
                        >
                          NOTES ON DESIGN / VOL. 01
                        </text>
                        <text
                          x="78"
                          y="206"
                          fill="#25271f"
                          fontFamily="Georgia, serif"
                          fontSize="92"
                          fontStyle="italic"
                          letterSpacing="-5"
                        >
                          Form
                        </text>
                        <text
                          x="82"
                          y="250"
                          fill="#25271f"
                          fontFamily="Georgia, serif"
                          fontSize="31"
                        >
                          follows curiosity.
                        </text>
                        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                          <path
                            key={i}
                            d={`M83 ${290 + i * 12} H${i === 6 ? 178 : 209} M225 ${290 + i * 12} H${i === 6 ? 290 : 324}`}
                            stroke="#b6b0a3"
                            strokeWidth="2"
                          />
                        ))}
                        <text x="82" y="398" fill="#756f60" fontSize="9">
                          01 — Looking closer
                        </text>
                        <text x="610" y="411" fill="#756f60" fontSize="9">
                          02
                        </text>
                      </>
                    )}
                    {active === 3 && (
                      <>
                        <rect
                          x="85"
                          y="30"
                          width="550"
                          height="420"
                          fill="#e3e4dd"
                        />
                        <text
                          x="110"
                          y="74"
                          fill="#5f665b"
                          fontSize="10"
                          letterSpacing="3"
                        >
                          LESS FRICTION. MORE FEELING.
                        </text>
                        <rect
                          x="110"
                          y="100"
                          width="275"
                          height="315"
                          rx="12"
                          fill="#fcf9f1"
                        />
                        <text
                          x="132"
                          y="132"
                          fill="#30372f"
                          fontSize="12"
                          fontWeight="600"
                        >
                          atelier.
                        </text>
                        <text
                          x="132"
                          y="184"
                          fill="#30372f"
                          fontSize="34"
                          fontWeight="600"
                          letterSpacing="-1"
                        >
                          A little more
                        </text>
                        <text
                          x="132"
                          y="221"
                          fill="#30372f"
                          fontSize="34"
                          fontWeight="600"
                          letterSpacing="-1"
                        >
                          human.
                        </text>
                        <rect
                          x="132"
                          y="244"
                          width="230"
                          height="82"
                          rx="8"
                          fill="#d3d9c8"
                        />
                        <path
                          d="M147 303 L178 268 L212 295 L250 261 L290 303"
                          fill="none"
                          stroke="#78916b"
                          strokeWidth="2"
                        />
                        <rect
                          x="132"
                          y="349"
                          width="122"
                          height="35"
                          rx="18"
                          fill="#30372f"
                        />
                        <text x="153" y="371" fill="#fff" fontSize="10">
                          Make some space ↗
                        </text>
                        <rect
                          x="420"
                          y="100"
                          width="170"
                          height="315"
                          rx="22"
                          fill="#fcf9f1"
                          stroke="#b8c1b0"
                        />
                        <rect
                          x="477"
                          y="112"
                          width="56"
                          height="5"
                          rx="3"
                          fill="#b8c1b0"
                        />
                        <text
                          x="439"
                          y="155"
                          fill="#30372f"
                          fontSize="12"
                          fontWeight="600"
                        >
                          Your daily pause.
                        </text>
                        <rect
                          x="438"
                          y="175"
                          width="134"
                          height="151"
                          rx="8"
                          fill="#d3d9c8"
                        />
                        <path
                          d="M440 351 H559 M440 364 H520 M440 390 H560"
                          stroke="#b8c1b0"
                          strokeWidth="3"
                        />
                        <path
                          d="M385 366 H403 V260 H420"
                          fill="none"
                          stroke="#9475c5"
                          strokeWidth="1.5"
                        />
                        <circle cx="385" cy="366" r="4" fill="#9475c5" />
                      </>
                    )}
                  </motion.g>
                </AnimatePresence>

                <motion.g
                  animate={markPositions[active]}
                  transition={{
                    duration: reducedMotion ? 0 : 1.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <motion.path
                    animate={{
                      d: tool.shape,
                      fill:
                        active === 0
                          ? "#b7e0ef"
                          : active === 1
                            ? "#ce713d"
                            : active === 2
                              ? "#b6556d"
                              : "#78916b",
                    }}
                    transition={{ duration: reducedMotion ? 0 : 1.2 }}
                  />
                  <motion.rect
                    x="-91"
                    y="-91"
                    width="182"
                    height="182"
                    fill="none"
                    stroke={
                      active === 1
                        ? "#376eae"
                        : active === 3
                          ? "#9475c5"
                          : "#fff"
                    }
                    strokeWidth="0.8"
                    animate={{
                      opacity: active === 1 || active === 3 ? 1 : 0.45,
                    }}
                  />
                  {[
                    [-91, -91],
                    [91, -91],
                    [91, 91],
                    [-91, 91],
                  ].map(([x, y]) => (
                    <rect
                      key={`${x}-${y}`}
                      x={x - 3}
                      y={y - 3}
                      width="6"
                      height="6"
                      fill="#f4efe4"
                      stroke={active === 3 ? "#9475c5" : "#376eae"}
                      strokeWidth="0.8"
                    />
                  ))}
                </motion.g>
                <motion.g
                  aria-hidden="true"
                  animate={{
                    x: markPositions[active].x + 80,
                    y: markPositions[active].y + 50,
                  }}
                  transition={{
                    duration: reducedMotion ? 0 : 1.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <path
                    d="M0 0 L0 22 L6 17 L10 27 L15 24 L10 15 L19 15 Z"
                    fill="#252a23"
                    stroke="#fff"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="17"
                    y="23"
                    width="47"
                    height="18"
                    rx="3"
                    fill="#252a23"
                  />
                  <text x="25" y="35" fill="#fff" fontSize="9">
                    Yami
                  </text>
                </motion.g>
              </svg>
              <span className={styles.canvasLabel}>
                ONE IDEA. FOUR WAYS TO SHAPE IT.
              </span>
            </div>

            <div className={styles.inspector} aria-hidden="true">
              <div className={styles.panelHeading}>
                <FiSliders /> Properties
              </div>
              <span className={styles.inspectorLabel}>TRANSFORM</span>
              <div className={styles.propertyGrid}>
                <span>
                  X <b>128</b>
                </span>
                <span>
                  Y <b>96</b>
                </span>
                <span>
                  W <b>480</b>
                </span>
                <span>
                  H <b>640</b>
                </span>
              </div>
              <span className={styles.inspectorLabel}>APPEARANCE</span>
              <div className={styles.colorProperty}>
                <i style={{ background: tool.color }} />
                <span>{tool.color.toUpperCase()}</span>
                <span>100%</span>
              </div>
              <div className={styles.sliderLabel}>
                <span>{tool.property}</span>
                <b>{tool.value}</b>
              </div>
              <div className={styles.sliderTrack}>
                <motion.i
                  animate={{ left: `${22 + active * 17}%` }}
                  transition={{ duration }}
                />
              </div>
              <span className={styles.inspectorLabel}>WORKING PALETTE</span>
              <div className={styles.palette}>
                {["#ede9dc", tool.color, "#30372f", "#b55635"].map((color) => (
                  <i key={color} style={{ background: color }} />
                ))}
              </div>
              <div className={styles.inspectorFooter}>
                <FiPenTool />
                <span>
                  Always a work
                  <br />
                  in progress.
                </span>
              </div>
            </div>
            {design === "design-2" && (
              <>
                <div className={styles.contextMenu} aria-hidden="true">
                  <span>
                    Bring forward <small>⌘ ]</small>
                  </span>
                  <span>
                    Bring to front <small>⇧ ⌘ ]</small>
                  </span>
                  <span>
                    Send backward <small>⌘ [</small>
                  </span>
                  <span>
                    Send to back <small>⇧ ⌘ [</small>
                  </span>
                  <i />
                  <span>
                    <FiTrash2 /> Delete
                  </span>
                  <span>
                    <FiCopy /> Duplicate
                  </span>
                  <span className={styles.contextSelected}>
                    <FiLock /> Lock
                  </span>
                  <span>
                    <FiLink /> Link
                  </span>
                  <i />
                  <span>
                    <FiLayers /> Group selection
                  </span>
                </div>
                <div
                  className={styles.filmstrip}
                  role="group"
                  aria-label="Artboard previews"
                >
                  {tools.map((item, index) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setActive(index)}
                      aria-label={`Preview ${item.name}`}
                      aria-pressed={active === index}
                      className={active === index ? styles.previewActive : ""}
                    >
                      <span
                        className={styles.previewArt}
                        style={
                          {
                            "--preview-accent": item.color,
                          } as React.CSSProperties
                        }
                        aria-hidden="true"
                      >
                        {index === 0 ? (
                          <img src={designImage} alt="" />
                        ) : index === 1 ? (
                          <span className={styles.previewStar}>✦</span>
                        ) : index === 2 ? (
                          <span className={styles.previewType}>Aa</span>
                        ) : (
                          <span className={styles.previewFrames}>
                            <i />
                            <i />
                          </span>
                        )}
                      </span>
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className={styles.statusbar}>
            <span>
              <i /> {tool.discipline}
            </span>
            <span>
              Yami Atelier <FiArrowUpRight />
            </span>
          </div>
        </div>
      </div>

      <div className={styles.caption}>
        {!reducedMotion && (
          <button
            type="button"
            onClick={() => setPaused((current) => !current)}
            aria-label={
              paused ? "Play studio animation" : "Pause studio animation"
            }
            aria-pressed={paused}
            className={styles.pause}
          >
            {paused ? (
              <FiPlay aria-hidden="true" />
            ) : (
              <FiPause aria-hidden="true" />
            )}
          </button>
        )}
      </div>
    </section>
  );
};

export default CreativeWorkspace;
