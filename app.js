const STORE_KEY = "pixelrush_custom_games_v1";
const PLAYS_KEY = "pixelrush_play_counts_v1";
const FAV_KEY = "pixelrush_favorites_v1";
const RECENT_KEY = "pixelrush_recent_games_v1";
const CURRENT_KEY = "pixelrush_current_game_v1";
const LOGO_SRC = "./assets/pixelrush-logo.png";

const categories = ["All","Arcade","Puzzle","Strategy","Board","Racing","Shooter","Cards","Sports","Brain","Retro","Classic","Creative","Shooting","Survival","Cooking","Dress Up","Adventure"];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const escapeHtml = (value = "") =>
  value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[char]);

// Prebuilt/local games removed on purpose. PixelRush is embedded-only (Y8). Do not re-add.
const builtInGames = [];
const extraBuiltInGames = [];
const onlineGames = [];

const Y8_VERIFIED_ONLY_NOTE = "Only official embed URLs listed here are used; guessed 1000-game slugs are intentionally not added because they can 404."; 
const y8Games = [
  {
    "id": "y8-001-zombie-fps-survival-3d",
    "title": "Zombie FPS Survival 3D",
    "category": "Shooting",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "3D zombie FPS survival embed from Y8's website-games library. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/zombie_fps_survival_3d",
    "embedUrl": "https://y8.com/embed/zombie_fps_survival_3d",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 1215,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "shooting"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1001
  },
  {
    "id": "y8-002-color-shooter",
    "title": "Color Shooter",
    "category": "Shooting",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Fast color-shooting challenge for short arcade sessions. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/color_shooter",
    "embedUrl": "https://y8.com/embed/color_shooter",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "shooting"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1002
  },
  {
    "id": "y8-003-stealth-assassin",
    "title": "Stealth Assassin",
    "category": "Shooting",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Stealth action shooter-style arena challenge. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/stealth_assasin",
    "embedUrl": "https://y8.com/embed/stealth_assasin",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "shooting"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1003
  },
  {
    "id": "y8-004-flappy-shooter",
    "title": "Flappy Shooter",
    "category": "Shooting",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Arcade shooter with quick restart gameplay. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/flappy_shooter_webgl",
    "embedUrl": "https://y8.com/embed/flappy_shooter_webgl",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "shooting"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1004
  },
  {
    "id": "y8-005-furious-ride",
    "title": "Furious Ride",
    "category": "Shooting",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Action riding shooter with fast hazards. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/furious_ride_webgl",
    "embedUrl": "https://y8.com/embed/furious_ride_webgl",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "shooting"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1005
  },
  {
    "id": "y8-006-fire-it-up",
    "title": "Fire It Up",
    "category": "Shooting",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Shoot upward, break targets, and chase score. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/fire_it_up_webgl",
    "embedUrl": "https://y8.com/embed/fire_it_up_webgl",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "shooting"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1006
  },
  {
    "id": "y8-007-target-master-2d",
    "title": "Target Master 2D",
    "category": "Shooting",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "2D target shooting with simple score chasing. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/target_master_2d",
    "embedUrl": "https://y8.com/embed/target_master_2d",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 900,
    "height": 540,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "shooting"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1007
  },
  {
    "id": "y8-008-fire-target-shooter",
    "title": "Fire Target Shooter",
    "category": "Shooting",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Mobile-friendly target shooter from the Y8 embed list. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/fire_target_shooter",
    "embedUrl": "https://y8.com/embed/fire_target_shooter",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "shooting"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1008
  },
  {
    "id": "y8-009-gun-jet-runner",
    "title": "Gun Jet Runner",
    "category": "Shooting",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Runner-shooter hybrid with weapon-based movement. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/gun_jet_runner",
    "embedUrl": "https://y8.com/embed/gun_jet_runner",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 960,
    "height": 540,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "shooting"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1009
  },
  {
    "id": "y8-010-sniper-mission",
    "title": "Sniper Mission",
    "category": "Shooting",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Classic sniper-style mission game. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/sniper_mission",
    "embedUrl": "https://y8.com/embed/sniper_mission",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 960,
    "height": 640,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "shooting"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1010
  },
  {
    "id": "y8-011-car-rush",
    "title": "Car Rush",
    "category": "Racing",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Classic arcade racing with quick controls. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/car_rush",
    "embedUrl": "https://y8.com/embed/car_rush",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 800,
    "height": 600,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "racing"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1011
  },
  {
    "id": "y8-012-russian-uaz-offroad-driving-3d",
    "title": "Russian UAZ Offroad Driving 3D",
    "category": "Racing",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "3D off-road driving challenge. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/russian_uaz_offroad_driving_3d",
    "embedUrl": "https://y8.com/embed/russian_uaz_offroad_driving_3d",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 960,
    "height": 596,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "racing"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1012
  },
  {
    "id": "y8-013-turbo-racer-3d",
    "title": "Turbo Racer 3D",
    "category": "Racing",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Vertical arcade traffic racing. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/turbo_racer_3d",
    "embedUrl": "https://y8.com/embed/turbo_racer_3d",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "racing"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1013
  },
  {
    "id": "y8-014-criminal-escape-the-cops-3d",
    "title": "Criminal Escape the Cops 3D",
    "category": "Racing",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Police chase driving challenge. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/criminal_escape_the_cops_3d",
    "embedUrl": "https://y8.com/embed/criminal_escape_the_cops_3d",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "racing"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1014
  },
  {
    "id": "y8-015-car-draw",
    "title": "Car Draw",
    "category": "Racing",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Draw-and-drive puzzle racing. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/car_draw_webgl",
    "embedUrl": "https://y8.com/embed/car_draw_webgl",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "racing"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1015
  },
  {
    "id": "y8-016-battle-ball-kickout-3d",
    "title": "Battle Ball Kickout 3D",
    "category": "Racing",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Action sports-driving style arena challenge. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/battle_ball_kickout_3d",
    "embedUrl": "https://y8.com/embed/battle_ball_kickout_3d",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "racing"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1016
  },
  {
    "id": "y8-017-roll-master-3d",
    "title": "Roll Master 3D",
    "category": "Racing",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Rolling obstacle run with speed and timing. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/roll_master_3d",
    "embedUrl": "https://y8.com/embed/roll_master_3d",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "racing"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1017
  },
  {
    "id": "y8-018-color-rush-runner",
    "title": "Color Rush Runner",
    "category": "Racing",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Fast runner with color switching. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/color_rush_runner",
    "embedUrl": "https://y8.com/embed/color_rush_runner",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "racing"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1018
  },
  {
    "id": "y8-019-cube-dash",
    "title": "Cube Dash",
    "category": "Racing",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Reflex dash run for quick sessions. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/cube_dash",
    "embedUrl": "https://y8.com/embed/cube_dash",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "racing"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1019
  },
  {
    "id": "y8-020-color-road",
    "title": "Color Road",
    "category": "Racing",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Color-matching lane runner. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/color_road",
    "embedUrl": "https://y8.com/embed/color_road",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "racing"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1020
  },
  {
    "id": "y8-021-crowd-hunt-3d",
    "title": "Crowd Hunt 3D",
    "category": "Survival",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Hunt, survive, and grow your crowd. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/crowd_hunt_3d",
    "embedUrl": "https://y8.com/embed/crowd_hunt_3d",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "survival"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1021
  },
  {
    "id": "y8-022-run-clash",
    "title": "Run & Clash",
    "category": "Survival",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Crowd survival runner with clash mechanics. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/run_clash",
    "embedUrl": "https://y8.com/embed/run_clash",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 519,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "survival"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1022
  },
  {
    "id": "y8-023-run-boss-3d",
    "title": "Run Boss 3D",
    "category": "Survival",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Boss-run survival challenge. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/run_boss_3d",
    "embedUrl": "https://y8.com/embed/run_boss_3d",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "survival"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1023
  },
  {
    "id": "y8-024-block-run",
    "title": "Block Run",
    "category": "Survival",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Obstacle survival runner. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/block_run_webgl",
    "embedUrl": "https://y8.com/embed/block_run_webgl",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "survival"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1024
  },
  {
    "id": "y8-025-wick-runner",
    "title": "Wick Runner",
    "category": "Survival",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Endless survival run with quick restarts. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/wick_runner",
    "embedUrl": "https://y8.com/embed/wick_runner",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "survival"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1025
  },
  {
    "id": "y8-026-stone-climb",
    "title": "Stone Climb",
    "category": "Survival",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Vertical survival climb challenge. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/stone_climb",
    "embedUrl": "https://y8.com/embed/stone_climb",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "survival"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1026
  },
  {
    "id": "y8-027-double-roll",
    "title": "Double Roll",
    "category": "Survival",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Dual-control rolling survival game. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/double_roll_webgl",
    "embedUrl": "https://y8.com/embed/double_roll_webgl",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "survival"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1027
  },
  {
    "id": "y8-028-jump-smash-3d",
    "title": "Jump Smash 3D",
    "category": "Survival",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Smash and survive platform obstacles. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/jump_smash_3d",
    "embedUrl": "https://y8.com/embed/jump_smash_3d",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "survival"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1028
  },
  {
    "id": "y8-029-spikes",
    "title": "Spikes",
    "category": "Survival",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Avoid spikes and chase high score. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/spikes_webgl",
    "embedUrl": "https://y8.com/embed/spikes_webgl",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "survival"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1029
  },
  {
    "id": "y8-030-helix-ring",
    "title": "Helix Ring",
    "category": "Survival",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Survive the ring drop through hazards. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/helix_ring_webgl",
    "embedUrl": "https://y8.com/embed/helix_ring_webgl",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "survival"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1030
  },
  {
    "id": "y8-031-diary-maggie-smoothie-craze",
    "title": "Diary Maggie: Smoothie Craze",
    "category": "Cooking",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Smoothie-making cooking game. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/diary_maggie_smoothie_craze",
    "embedUrl": "https://y8.com/embed/diary_maggie_smoothie_craze",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 900,
    "height": 600,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "cooking"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1031
  },
  {
    "id": "y8-032-roxie-s-kitchen-sushi-pizza",
    "title": "Roxie's Kitchen: Sushi Pizza",
    "category": "Cooking",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Roxie cooking game with sushi-pizza theme. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/roxie_s_kitchen_sushi_pizza",
    "embedUrl": "https://y8.com/embed/roxie_s_kitchen_sushi_pizza",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 900,
    "height": 600,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "cooking"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1032
  },
  {
    "id": "y8-033-roxie-s-kitchen-truffle-bulgogi-burger",
    "title": "Roxie's Kitchen: Truffle Bulgogi Burger",
    "category": "Cooking",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Burger cooking game from the Roxie series. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/roxie_s_kitchen_truffle_bulgogi_burger",
    "embedUrl": "https://y8.com/embed/roxie_s_kitchen_truffle_bulgogi_burger",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 900,
    "height": 600,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "cooking"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1033
  },
  {
    "id": "y8-034-coffee-sort-puzzle",
    "title": "Coffee Sort Puzzle",
    "category": "Cooking",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Coffee-themed sorting puzzle. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/coffee_sort_puzzle",
    "embedUrl": "https://y8.com/embed/coffee_sort_puzzle",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 513,
    "height": 912,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "cooking"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1034
  },
  {
    "id": "y8-035-big-restaurant-chef",
    "title": "Big Restaurant Chef",
    "category": "Cooking",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Restaurant management/cooking game. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/big_restaurant_chef",
    "embedUrl": "https://y8.com/embed/big_restaurant_chef",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 900,
    "height": 600,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "cooking"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1035
  },
  {
    "id": "y8-036-roxie-s-kitchen-fun-churros",
    "title": "Roxie's Kitchen: Fun Churros",
    "category": "Cooking",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Dessert cooking challenge. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/roxie_s_kitchen_fun_churros",
    "embedUrl": "https://y8.com/embed/roxie_s_kitchen_fun_churros",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 900,
    "height": 600,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "cooking"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1036
  },
  {
    "id": "y8-037-roxie-s-kitchen-king-crab",
    "title": "Roxie's Kitchen: King Crab",
    "category": "Cooking",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Seafood cooking game. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/roxie_s_kitchen_king_crab",
    "embedUrl": "https://y8.com/embed/roxie_s_kitchen_king_crab",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 900,
    "height": 600,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "cooking"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1037
  },
  {
    "id": "y8-038-roxie-s-kitchen-cute-macaron",
    "title": "Roxie's Kitchen: Cute Macaron",
    "category": "Cooking",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Macaron dessert cooking game. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/roxie_s_kitchen_cute_macaron",
    "embedUrl": "https://y8.com/embed/roxie_s_kitchen_cute_macaron",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 900,
    "height": 600,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "cooking"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1038
  },
  {
    "id": "y8-039-roxie-s-kitchen-egg-fried-rice",
    "title": "Roxie's Kitchen: Egg Fried Rice",
    "category": "Cooking",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Rice cooking game. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/roxie_s_kitchen_egg_fried_rice",
    "embedUrl": "https://y8.com/embed/roxie_s_kitchen_egg_fried_rice",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 900,
    "height": 600,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "cooking"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1039
  },
  {
    "id": "y8-040-roxie-s-kitchen-american-breakfast",
    "title": "Roxie's Kitchen: American Breakfast",
    "category": "Cooking",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Breakfast cooking game. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/roxie_s_kitchen_american_breakfast",
    "embedUrl": "https://y8.com/embed/roxie_s_kitchen_american_breakfast",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 900,
    "height": 600,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "cooking"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1040
  },
  {
    "id": "y8-041-diary-maggie-friend-makeover",
    "title": "Diary Maggie: Friend Makeover",
    "category": "Dress Up",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Makeover and styling game. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/diary_maggie_friend_makeover",
    "embedUrl": "https://y8.com/embed/diary_maggie_friend_makeover",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 900,
    "height": 600,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "dress up"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1041
  },
  {
    "id": "y8-042-blonde-sofia-underwater",
    "title": "Blonde Sofia: Underwater",
    "category": "Dress Up",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Dress-up and underwater style game. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/blonde_sofia_underwater",
    "embedUrl": "https://y8.com/embed/blonde_sofia_underwater",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 900,
    "height": 600,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "dress up"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1042
  },
  {
    "id": "y8-043-trendy-fashion-valentine-s-part-3",
    "title": "Trendy Fashion: Valentine's Part 3",
    "category": "Dress Up",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Fashion styling game. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/trendy_fashion_valentine_s_part_3",
    "embedUrl": "https://y8.com/embed/trendy_fashion_valentine_s_part_3",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 800,
    "height": 600,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "dress up"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1043
  },
  {
    "id": "y8-044-diary-maggie-time-travel",
    "title": "Diary Maggie: Time Travel",
    "category": "Dress Up",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Time-travel themed dress-up. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/diary_maggie_time_travel",
    "embedUrl": "https://y8.com/embed/diary_maggie_time_travel",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 900,
    "height": 600,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "dress up"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1044
  },
  {
    "id": "y8-045-baby-cathy-ep49-1st-flight",
    "title": "Baby Cathy Ep49: 1st Flight",
    "category": "Dress Up",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Lifestyle dress-up and care episode. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/baby_cathy_ep49_1st_flight",
    "embedUrl": "https://y8.com/embed/baby_cathy_ep49_1st_flight",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 900,
    "height": 600,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "dress up"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1045
  },
  {
    "id": "y8-046-baby-cathy-ep50-space-adventure",
    "title": "Baby Cathy Ep50: Space Adventure",
    "category": "Dress Up",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Space-themed style and care game. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/baby_cathy_ep50_space_adventure",
    "embedUrl": "https://y8.com/embed/baby_cathy_ep50_space_adventure",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 900,
    "height": 600,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "dress up"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1046
  },
  {
    "id": "y8-047-baby-cathy-ep51-aquarium-keeper",
    "title": "Baby Cathy Ep51: Aquarium Keeper",
    "category": "Dress Up",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Aquarium lifestyle styling episode. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/baby_cathy_ep_51_aquarium_keeper",
    "embedUrl": "https://y8.com/embed/baby_cathy_ep_51_aquarium_keeper",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 900,
    "height": 600,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "dress up"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1047
  },
  {
    "id": "y8-048-sara-vet-life-ep14-owl",
    "title": "Sara Vet Life Ep14: Owl",
    "category": "Dress Up",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Animal-care lifestyle game. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/sara_vet_life_ep14_owl",
    "embedUrl": "https://y8.com/embed/sara_vet_life_ep14_owl",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 900,
    "height": 600,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "dress up"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1048
  },
  {
    "id": "y8-049-sara-vet-life-ep-13-goat",
    "title": "Sara Vet Life Ep:13 Goat",
    "category": "Dress Up",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Animal-care lifestyle game. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/sara_vet_life_ep_13_goat",
    "embedUrl": "https://y8.com/embed/sara_vet_life_ep_13_goat",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 900,
    "height": 600,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "dress up"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1049
  },
  {
    "id": "y8-050-sara-vet-life-ep11-ferret",
    "title": "Sara Vet Life Ep11: Ferret",
    "category": "Dress Up",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Animal-care lifestyle game. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/sara_vet_life_ep11_ferret",
    "embedUrl": "https://y8.com/embed/sara_vet_life_ep11_ferret",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 900,
    "height": 600,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "dress up"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1050
  },
  {
    "id": "y8-051-slice-it-up",
    "title": "Slice It Up",
    "category": "Puzzle",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Slicing puzzle with quick level play. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/slice_it_up_webgl",
    "embedUrl": "https://y8.com/embed/slice_it_up_webgl",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "puzzle"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1051
  },
  {
    "id": "y8-052-shape-fit",
    "title": "Shape Fit",
    "category": "Puzzle",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Shape-fitting puzzle. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/shape_fit_webgl",
    "embedUrl": "https://y8.com/embed/shape_fit_webgl",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "puzzle"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1052
  },
  {
    "id": "y8-053-slices",
    "title": "Slices",
    "category": "Puzzle",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Circular slice puzzle. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/slices",
    "embedUrl": "https://y8.com/embed/slices",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "puzzle"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1053
  },
  {
    "id": "y8-054-spiky-circle",
    "title": "Spiky Circle",
    "category": "Puzzle",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Timing puzzle around rotating hazards. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/spiky_circle_webgl",
    "embedUrl": "https://y8.com/embed/spiky_circle_webgl",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "puzzle"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1054
  },
  {
    "id": "y8-055-maze-turn",
    "title": "Maze Turn",
    "category": "Puzzle",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Maze rotation puzzle. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/maze_turn",
    "embedUrl": "https://y8.com/embed/maze_turn",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "puzzle"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1055
  },
  {
    "id": "y8-056-perfect-roll-slide-puzzle",
    "title": "Perfect Roll Slide Puzzle",
    "category": "Puzzle",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Slide puzzle with rolling logic. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/perfect_roll_slide_puzzle",
    "embedUrl": "https://y8.com/embed/perfect_roll_slide_puzzle",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "puzzle"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1056
  },
  {
    "id": "y8-057-starline-puzzle",
    "title": "Starline Puzzle",
    "category": "Puzzle",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Line-connecting puzzle challenge. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/starline_puzzle",
    "embedUrl": "https://y8.com/embed/starline_puzzle",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "puzzle"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1057
  },
  {
    "id": "y8-058-draw-cube",
    "title": "Draw Cube",
    "category": "Puzzle",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Draw-and-solve cube puzzle. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/draw_cube",
    "embedUrl": "https://y8.com/embed/draw_cube",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "puzzle"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1058
  },
  {
    "id": "y8-059-arrow-out",
    "title": "Arrow Out",
    "category": "Puzzle",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Arrow extraction puzzle. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/arrow_out",
    "embedUrl": "https://y8.com/embed/arrow_out",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 513,
    "height": 912,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "puzzle"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1059
  },
  {
    "id": "y8-060-color-spin",
    "title": "Color Spin",
    "category": "Puzzle",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Color matching reflex puzzle. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/color_spin",
    "embedUrl": "https://y8.com/embed/color_spin",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 360,
    "height": 630,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "puzzle"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1060
  },
  {
    "id": "y8-061-trollface-quest-horror-2",
    "title": "TrollFace Quest: Horror 2",
    "category": "Arcade",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Classic point-and-click prank puzzle. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/trollface_quest_horror_2",
    "embedUrl": "https://y8.com/embed/trollface_quest_horror_2",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 980,
    "height": 630,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "arcade"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1061
  },
  {
    "id": "y8-062-ultimate-tictactoe",
    "title": "Ultimate TicTacToe",
    "category": "Arcade",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Classic board game variation. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/ultimate_tictactoe",
    "embedUrl": "https://y8.com/embed/ultimate_tictactoe",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 500,
    "height": 900,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "arcade"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1062
  },
  {
    "id": "y8-063-catch-the-ball",
    "title": "Catch The Ball",
    "category": "Arcade",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Classic catch-and-score arcade game. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/catch_the_ball",
    "embedUrl": "https://y8.com/embed/catch_the_ball",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 900,
    "height": 600,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "arcade"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1063
  },
  {
    "id": "y8-064-connect-4",
    "title": "Connect 4",
    "category": "Arcade",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Classic Connect Four board game. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/connect_4",
    "embedUrl": "https://y8.com/embed/connect_4",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 800,
    "height": 559,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "arcade"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1064
  },
  {
    "id": "y8-065-zig-zag",
    "title": "Zig Zag",
    "category": "Arcade",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Classic zig-zag arcade reflex game. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/zig_zag_webgl",
    "embedUrl": "https://y8.com/embed/zig_zag_webgl",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 513,
    "height": 912,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "arcade"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1065
  },
  {
    "id": "y8-066-circle-run",
    "title": "Circle Run",
    "category": "Arcade",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Circular runner arcade challenge. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/circle_run_webgl",
    "embedUrl": "https://y8.com/embed/circle_run_webgl",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "arcade"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1066
  },
  {
    "id": "y8-067-color-bounce",
    "title": "Color Bounce",
    "category": "Arcade",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Bounce-based color arcade. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/color_bounce_webgl",
    "embedUrl": "https://y8.com/embed/color_bounce_webgl",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "arcade"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1067
  },
  {
    "id": "y8-068-cube-run",
    "title": "Cube Run",
    "category": "Arcade",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Classic cube runner. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/cube_run",
    "embedUrl": "https://y8.com/embed/cube_run",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "arcade"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1068
  },
  {
    "id": "y8-069-jelly-shift",
    "title": "Jelly Shift",
    "category": "Arcade",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Shape-shifting arcade runner. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/jelly_shift",
    "embedUrl": "https://y8.com/embed/jelly_shift",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "arcade"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1069
  },
  {
    "id": "y8-070-wall-jump",
    "title": "Wall Jump",
    "category": "Arcade",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Classic wall-jump arcade challenge. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/wall_jump_webgl",
    "embedUrl": "https://y8.com/embed/wall_jump_webgl",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 909,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "arcade"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1070
  },
  {
    "id": "y8-071-dunk-smash",
    "title": "Dunk Smash",
    "category": "Sports",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Basketball dunk timing game. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/dunk_smash",
    "embedUrl": "https://y8.com/embed/dunk_smash",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 513,
    "height": 912,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "sports"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1071
  },
  {
    "id": "y8-072-battle-ball-kickout-3d",
    "title": "Battle Ball Kickout 3D",
    "category": "Sports",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Ball sports arena challenge. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/battle_ball_kickout_3d",
    "embedUrl": "https://y8.com/embed/battle_ball_kickout_3d",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "sports"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1072
  },
  {
    "id": "y8-073-jump-smash-3d",
    "title": "Jump Smash 3D",
    "category": "Sports",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Jump-and-smash sports action. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/jump_smash_3d",
    "embedUrl": "https://y8.com/embed/jump_smash_3d",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "sports"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1073
  },
  {
    "id": "y8-074-archery",
    "title": "Archery",
    "category": "Sports",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Archery precision sports game. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/archery",
    "embedUrl": "https://y8.com/embed/archery",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 800,
    "height": 400,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "sports"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1074
  },
  {
    "id": "y8-075-pick-it-up-3d",
    "title": "Pick It Up 3D",
    "category": "Sports",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Timing and pickup sports-style game. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/pick_it_up_3d",
    "embedUrl": "https://y8.com/embed/pick_it_up_3d",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "sports"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1075
  },
  {
    "id": "y8-076-roll-master-3d",
    "title": "Roll Master 3D",
    "category": "Sports",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Rolling precision challenge. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/roll_master_3d",
    "embedUrl": "https://y8.com/embed/roll_master_3d",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "sports"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1076
  },
  {
    "id": "y8-077-grass-cutter-3d",
    "title": "Grass Cutter 3D",
    "category": "Sports",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Casual field-clearing challenge. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/grass_cutter_3d",
    "embedUrl": "https://y8.com/embed/grass_cutter_3d",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "sports"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1077
  },
  {
    "id": "y8-078-shape-fit",
    "title": "Shape Fit",
    "category": "Sports",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Skill precision sports-style puzzle. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/shape_fit_webgl",
    "embedUrl": "https://y8.com/embed/shape_fit_webgl",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "sports"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1078
  },
  {
    "id": "y8-079-fire-it-up",
    "title": "Fire It Up",
    "category": "Sports",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Target precision game. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/fire_it_up_webgl",
    "embedUrl": "https://y8.com/embed/fire_it_up_webgl",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "sports"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1079
  },
  {
    "id": "y8-080-target-master-2d",
    "title": "Target Master 2D",
    "category": "Sports",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Target precision sports/shooter hybrid. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/target_master_2d",
    "embedUrl": "https://y8.com/embed/target_master_2d",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 900,
    "height": 540,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "sports"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1080
  },
  {
    "id": "y8-081-stealth-assassin",
    "title": "Stealth Assassin",
    "category": "Adventure",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Stealth action game. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/stealth_assasin",
    "embedUrl": "https://y8.com/embed/stealth_assasin",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "adventure"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1081
  },
  {
    "id": "y8-082-crowd-hunt-3d",
    "title": "Crowd Hunt 3D",
    "category": "Adventure",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Action crowd hunt. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/crowd_hunt_3d",
    "embedUrl": "https://y8.com/embed/crowd_hunt_3d",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "adventure"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1082
  },
  {
    "id": "y8-083-run-clash",
    "title": "Run & Clash",
    "category": "Adventure",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Action clash runner. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/run_clash",
    "embedUrl": "https://y8.com/embed/run_clash",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 519,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "adventure"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1083
  },
  {
    "id": "y8-084-criminal-escape-the-cops-3d",
    "title": "Criminal Escape the Cops 3D",
    "category": "Adventure",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Action escape game. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/criminal_escape_the_cops_3d",
    "embedUrl": "https://y8.com/embed/criminal_escape_the_cops_3d",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "adventure"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1084
  },
  {
    "id": "y8-085-furious-ride",
    "title": "Furious Ride",
    "category": "Adventure",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Action riding challenge. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/furious_ride_webgl",
    "embedUrl": "https://y8.com/embed/furious_ride_webgl",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "adventure"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1085
  },
  {
    "id": "y8-086-wick-runner",
    "title": "Wick Runner",
    "category": "Adventure",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Action runner. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/wick_runner",
    "embedUrl": "https://y8.com/embed/wick_runner",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "adventure"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1086
  },
  {
    "id": "y8-087-run-boss-3d",
    "title": "Run Boss 3D",
    "category": "Adventure",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Boss action runner. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/run_boss_3d",
    "embedUrl": "https://y8.com/embed/run_boss_3d",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "adventure"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1087
  },
  {
    "id": "y8-088-battle-ball-kickout-3d",
    "title": "Battle Ball Kickout 3D",
    "category": "Adventure",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "3D action arena. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/battle_ball_kickout_3d",
    "embedUrl": "https://y8.com/embed/battle_ball_kickout_3d",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "adventure"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1088
  },
  {
    "id": "y8-089-block-run",
    "title": "Block Run",
    "category": "Adventure",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Action obstacle run. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/block_run_webgl",
    "embedUrl": "https://y8.com/embed/block_run_webgl",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "adventure"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1089
  },
  {
    "id": "y8-090-gun-jet-runner",
    "title": "Gun Jet Runner",
    "category": "Adventure",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Action runner-shooter. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/gun_jet_runner",
    "embedUrl": "https://y8.com/embed/gun_jet_runner",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 960,
    "height": 540,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "adventure"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1090
  },
  {
    "id": "y8-091-connect-4",
    "title": "Connect 4",
    "category": "Strategy",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Strategy board classic. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/connect_4",
    "embedUrl": "https://y8.com/embed/connect_4",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 800,
    "height": 559,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "strategy"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1091
  },
  {
    "id": "y8-092-ultimate-tictactoe",
    "title": "Ultimate TicTacToe",
    "category": "Strategy",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Strategy grid duel. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/ultimate_tictactoe",
    "embedUrl": "https://y8.com/embed/ultimate_tictactoe",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 500,
    "height": 900,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "strategy"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1092
  },
  {
    "id": "y8-093-coffee-sort-puzzle",
    "title": "Coffee Sort Puzzle",
    "category": "Strategy",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Sorting strategy puzzle. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/coffee_sort_puzzle",
    "embedUrl": "https://y8.com/embed/coffee_sort_puzzle",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 513,
    "height": 912,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "strategy"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1093
  },
  {
    "id": "y8-094-starline-puzzle",
    "title": "Starline Puzzle",
    "category": "Strategy",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Line-planning strategy puzzle. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/starline_puzzle",
    "embedUrl": "https://y8.com/embed/starline_puzzle",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "strategy"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1094
  },
  {
    "id": "y8-095-perfect-roll-slide-puzzle",
    "title": "Perfect Roll Slide Puzzle",
    "category": "Strategy",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Planning puzzle. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/perfect_roll_slide_puzzle",
    "embedUrl": "https://y8.com/embed/perfect_roll_slide_puzzle",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "strategy"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1095
  },
  {
    "id": "y8-096-maze-turn",
    "title": "Maze Turn",
    "category": "Strategy",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Maze path strategy. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/maze_turn",
    "embedUrl": "https://y8.com/embed/maze_turn",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "strategy"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1096
  },
  {
    "id": "y8-097-draw-cube",
    "title": "Draw Cube",
    "category": "Strategy",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Draw-path strategy. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/draw_cube",
    "embedUrl": "https://y8.com/embed/draw_cube",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 521,
    "height": 911,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "strategy"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1097
  },
  {
    "id": "y8-098-arrow-out",
    "title": "Arrow Out",
    "category": "Strategy",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Extraction logic puzzle. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/arrow_out",
    "embedUrl": "https://y8.com/embed/arrow_out",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 513,
    "height": 912,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "strategy"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1098
  },
  {
    "id": "y8-099-war-of-metal",
    "title": "War of Metal",
    "category": "Strategy",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Vehicle battle strategy/action. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/war_of_metal",
    "embedUrl": "https://y8.com/embed/war_of_metal",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 960,
    "height": 670,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "strategy"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1099
  },
  {
    "id": "y8-100-sniper-mission",
    "title": "Sniper Mission",
    "category": "Strategy",
    "badges": [
      "Y8",
      "Official Embed",
      "Sandboxed"
    ],
    "icon": "Y8",
    "description": "Mission-based strategy shooting. Plays inside PixelRush; popups/top-page navigation are blocked by the sandbox.",
    "thumb": "linear-gradient(135deg,#ff4f8b,#ffd166,#3be7ff)",
    "externalUrl": "https://y8.com/embed/sniper_mission",
    "embedUrl": "https://y8.com/embed/sniper_mission",
    "source": "Y8 official iframe embed",
    "license": "Y8 Games for your website embed",
    "isY8": true,
    "isPlayable": true,
    "mayContainAds": true,
    "width": 960,
    "height": 640,
    "supportedModes": [
      "Solo"
    ],
    "tags": [
      "Y8",
      "embed",
      "sandboxed",
      "strategy"
    ],
    "rating": 4.4,
    "difficulty": "Varies",
    "order": 1100
  }
];

let dynamicY8Games = Array.isArray(window.PIXELRUSH_Y8_GAMES)
  ? window.PIXELRUSH_Y8_GAMES.map((game, index) => normalizeY8Game(game, index))
  : [];

function normalizeY8Game(game, index = 0) {
  const slug = String(game.slug || game.id || game.externalUrl || index)
    .replace(/^https?:\/\/y8\.com\/embed\//, "")
    .replace(/[^a-z0-9_ -]/gi, "")
    .trim();
  const safeId = String(game.id || `y8-${slug || index}`)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return {
    id: safeId.startsWith("y8-") ? safeId : `y8-${safeId}`,
    title: game.title || slug.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase()),
    category: game.category || guessY8Category(`${game.title || ""} ${slug}`),
    badges: [],
    icon: game.icon || "",
    description: game.description || "Playable web game embedded inside PixelRush.",
    thumb: game.thumbnail || game.thumb || "",
    thumbnail: game.thumbnail || game.thumb || "",
    externalUrl: game.externalUrl || game.embedUrl || `https://y8.com/embed/${slug}`,
    embedUrl: game.embedUrl || game.externalUrl || `https://y8.com/embed/${slug}`,
    source: "Official embeddable game iframe",
    license: "Official website-game iframe",
    isY8: true,
    isPlayable: true,
    mayContainAds: true,
    width: Number(game.width) || 960,
    height: Number(game.height) || 540,
    supportedModes: ["Solo"],
    tags: ["web game", guessY8Category(`${game.title || ""} ${slug}`).toLowerCase()],
    rating: Number(game.rating) || 4.4,
    difficulty: game.difficulty || "Varies",
    order: Number(game.order) || index + 1000,
  };
}

function guessY8Category(text = "") {
  const value = text.toLowerCase();
  if (/(shoot|sniper|gun|fps|zombie|target|war|battle|fighter|assassin)/.test(value)) return "Shooting";
  if (/(car|race|racer|driv|truck|moto|bike|road|traffic|uaz|turbo|speed)/.test(value)) return "Racing";
  if (/(cook|kitchen|restaurant|burger|pizza|ramen|breakfast|sushi|smoothie|coffee|cake|macaron|churro)/.test(value)) return "Cooking";
  if (/(dress|fashion|makeover|sofia|cathy|maggie|sara|vet|beauty|girl|valentine|style)/.test(value)) return "Dress Up";
  if (/(puzzle|sort|maze|arrow|slice|shape|color|cube|draw|logic|word|line)/.test(value)) return "Puzzle";
  if (/(sport|ball|dunk|archery|swim|boxing|kick|soccer|basket)/.test(value)) return "Sports";
  if (/(run|jump|adventure|quest|climb|escape|hero|boss)/.test(value)) return "Adventure";
  if (/(defense|strategy|tower|connect|tic|war)/.test(value)) return "Strategy";
  return "Arcade";
}

function activeY8Games() {
  const merged = [...dynamicY8Games, ...y8Games.map((game, index) => normalizeY8Game(game, index + 9000))];
  const seen = new Set();
  return merged.filter((game) => {
    const key = game.externalUrl || game.id;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function loadY8Catalog() {
  const endpoints = ["./y8-catalog.js"];
  try {
    if (Array.isArray(window.PIXELRUSH_Y8_GAMES) && window.PIXELRUSH_Y8_GAMES.length > dynamicY8Games.length) {
      dynamicY8Games = window.PIXELRUSH_Y8_GAMES.map((game, index) => normalizeY8Game(game, index));
      renderAll();
    }
  } catch {}
  try {
    const response = await fetch("/api/y8-catalog?limit=500&order=popularity", { cache: "force-cache" });
    if (!response.ok) return;
    const data = await response.json();
    if (Array.isArray(data.games) && data.games.length > dynamicY8Games.length) {
      dynamicY8Games = data.games.map((game, index) => normalizeY8Game(game, index));
      renderAll();
    }
  } catch {
    // Static/local preview keeps the bundled catalog. Deployed Vercel version auto-loads 500 via /api/y8-catalog.
  }
}


let state = {
  query: "",
  category: "All",
  sort: "featured",
  currentGame: null,
  customGames: loadJson(STORE_KEY, []),
  playCounts: loadJson(PLAYS_KEY, {}),
  favorites: loadJson(FAV_KEY, []),
  recent: loadJson(RECENT_KEY, []),
  y8Category: "All",
};

function loadJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function allGames() {
  return [...builtInGames, ...extraBuiltInGames, ...onlineGames, ...activeY8Games(), ...state.customGames].map(normalizeGame);
}

function normalizeGame(game, index = 0) {
  const badgeText = (game.badges || []).join(" ");
  return {
    tags: game.tags || [game.category, "quick"],
    rating: game.rating || (badgeText.includes("Featured") ? 4.8 : badgeText.includes("Popular") ? 4.7 : 4.5),
    difficulty: game.difficulty || "Normal",
    source: game.source || (game.externalUrl ? "External sandbox iframe" : game.custom ? "Admin custom code" : "PixelRush built-in"),
    license: game.license || (game.externalUrl ? "User-supplied external URL; verify embed rights" : game.custom ? "User supplied" : "Original PixelRush implementation"),
    isPlayable: game.isPlayable !== false && (!!game.code || !!game.externalUrl),
    hasAIPlayer: !!game.hasAIPlayer || ["tic-tac-toe", "connect-four", "pong-rush"].includes(game.id),
    supportedModes: game.supportedModes || (["tic-tac-toe", "connect-four", "pong-rush"].includes(game.id) ? ["Player vs AI"] : ["Solo"]),
    hasProgression: game.hasProgression ?? ["snake", "block-puzzle", "simple-shooter", "memory-cards", "brick-breaker", "space-dodge", "rush-2048", "word-guess", "pong-rush"].includes(game.id),
    maxLevel: game.maxLevel || (["memory-cards", "brick-breaker", "word-guess"].includes(game.id) ? 4 : 1),
    order: game.order || index,
    ...game,
  };
}


function normalizeSearchText(value = "") {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function gameById(id) {
  return allGames().find((game) => game.id === id);
}

function thumbStyle(game) {
  if (!game.thumb) return "";
  if (/^https?:\/\//i.test(game.thumb) || game.thumb.startsWith("data:")) {
    return `url("${game.thumb.replace(/"/g, "%22")}")`;
  }
  return game.thumb;
}


function y8IconArt(game) {
  const category = game.category || "Arcade";
  const paletteMap = {
    Shooting: ["#ff4f8b", "#ffd166", "#3be7ff"],
    Shooter: ["#ff4f8b", "#ffd166", "#3be7ff"],
    Racing: ["#3be7ff", "#ff4f8b", "#101425"],
    Survival: ["#8df27d", "#ff4f8b", "#101425"],
    Cooking: ["#ffd166", "#ff8c42", "#ff4f8b"],
    "Dress Up": ["#ff9ad5", "#9b5cff", "#3be7ff"],
    Puzzle: ["#ffd166", "#3be7ff", "#8df27d"],
    Arcade: ["#3be7ff", "#ffd166", "#ff4f8b"],
    Sports: ["#8df27d", "#3be7ff", "#ffd166"],
    Adventure: ["#9b5cff", "#ff4f8b", "#ffd166"],
    Strategy: ["#31445f", "#8df27d", "#ffd166"],
  };
  const colors = paletteMap[category] || ["#ff4f8b", "#ffd166", "#3be7ff"];
  const words = String(game.title || "Game").replace(/[^a-z0-9 ]/gi, " ").trim().split(/\s+/).filter(Boolean);
  const label = escapeHtml(words.slice(0, 3).map((word) => word[0]).join("").toUpperCase() || "PR");
  const glyph = /shoot|gun|sniper|fps|target/i.test(game.title) ? "✦"
    : /race|car|drive|road|rider|turbo/i.test(game.title) ? "▰"
    : /cook|kitchen|food|pizza|burger|coffee/i.test(game.title) ? "●"
    : /dress|fashion|makeover|girl|style/i.test(game.title) ? "◆"
    : /puzzle|sort|maze|slice|word|shape/i.test(game.title) ? "▦"
    : /sport|ball|dunk|archery/i.test(game.title) ? "●"
    : "▶";
  return `<svg viewBox="0 0 220 140">
    <defs>
      <linearGradient id="yg-${label}" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="${colors[0]}"/>
        <stop offset=".52" stop-color="${colors[1]}"/>
        <stop offset="1" stop-color="${colors[2]}"/>
      </linearGradient>
    </defs>
    <rect x="18" y="16" width="184" height="108" rx="24" fill="rgba(7,11,28,.62)" stroke="rgba(255,255,255,.16)"/>
    <circle cx="68" cy="70" r="34" fill="${colors[0]}" opacity=".88"/>
    <circle cx="112" cy="70" r="38" fill="${colors[1]}" opacity=".82"/>
    <circle cx="154" cy="70" r="34" fill="${colors[2]}" opacity=".78"/>
    <text x="110" y="80" text-anchor="middle" font-size="34" font-weight="950" fill="#071020">${label}</text>
    <text x="180" y="112" text-anchor="middle" font-size="22" font-weight="950" fill="#f6f8ff">${glyph}</text>
  </svg>`;
}

function coverArt(game) {
  if (game.isY8) return y8IconArt(game);
  const alias = {
    "embedded-speed-rush": "speed-rush",
    "embedded-tank-94": "tank-arena-94",
    "embedded-tetris-stack": "tetris-stack",
    "embedded-pac-maze": "pac-maze",
    "embedded-bomber-grid": "bomber-grid",
    "embedded-racer": "neon-racer",
    "embedded-breaker": "brick-breaker",
    "embedded-connect-four": "connect-four",
  };
  const id = alias[game.id] || game.id;
  const palette = `fill="none" stroke="rgba(255,255,255,.92)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"`;
  const covers = {
    "block-puzzle": `<svg viewBox="0 0 220 140"><rect x="28" y="22" width="38" height="38" rx="7" fill="#3be7ff"/><rect x="70" y="22" width="38" height="38" rx="7" fill="#ff4f8b"/><rect x="112" y="22" width="38" height="38" rx="7" fill="#ffd166"/><rect x="70" y="64" width="38" height="38" rx="7" fill="#8df27d"/><rect x="112" y="64" width="38" height="38" rx="7" fill="#9b5cff"/><path d="M24 118h156" ${palette}/></svg>`,
    snake: `<svg viewBox="0 0 220 140"><path d="M30 98c35 0 32-54 68-54 38 0 33 58 72 58" ${palette}/><circle cx="174" cy="102" r="17" fill="#8df27d"/><circle cx="184" cy="97" r="3" fill="#07114e"/><circle cx="42" cy="42" r="14" fill="#ff4f8b"/></svg>`,
    chess: `<svg viewBox="0 0 220 140"><rect x="28" y="96" width="160" height="20" rx="6" fill="#d6e4ff"/><path d="M82 96V56l20-22 20 22v40M70 116h64" ${palette}/><circle cx="102" cy="30" r="11" fill="#ffd166"/></svg>`,
    "snake-ladder": `<svg viewBox="0 0 220 140"><path d="M48 112 142 24M74 112l94-88M72 84h72M94 60h72" ${palette}/><path d="M160 104c-22 0-16-32-42-32" stroke="#ff4f8b" stroke-width="10" fill="none"/><rect x="35" y="28" width="38" height="38" rx="8" fill="#ffd166"/></svg>`,
    "simple-shooter": `<svg viewBox="0 0 220 140"><path d="M36 78h98l44-26-22 26 22 26-44-26H36z" fill="#3be7ff" stroke="#07114e" stroke-width="8"/><circle cx="178" cy="38" r="15" fill="#ff4f8b"/><circle cx="190" cy="100" r="11" fill="#ffd166"/></svg>`,
    "space-defender": `<svg viewBox="0 0 220 140"><path d="M40 88h92l38-22-18 22 18 22-38-22H40z" fill="#7adfff" stroke="#07114e" stroke-width="8"/><circle cx="180" cy="42" r="15" fill="#ff4f8b"/><circle cx="168" cy="98" r="11" fill="#ffd166"/><path d="M34 120h120" stroke="#8df27d" stroke-width="10" stroke-linecap="round"/></svg>`,
    "tic-tac-toe": `<svg viewBox="0 0 220 140"><path d="M82 18v104M138 18v104M42 54h136M42 96h136" ${palette}/><path d="M51 28l31 31M82 28 51 59" stroke="#ff4f8b" stroke-width="9"/><circle cx="161" cy="76" r="19" stroke="#3be7ff" stroke-width="9" fill="none"/></svg>`,
    "memory-cards": `<svg viewBox="0 0 220 140"><rect x="45" y="34" width="55" height="78" rx="10" fill="#3be7ff" transform="rotate(-9 72 73)"/><rect x="92" y="24" width="55" height="78" rx="10" fill="#ff4f8b"/><rect x="138" y="36" width="55" height="78" rx="10" fill="#ffd166" transform="rotate(9 165 75)"/><path d="M119 48v28M105 62h28" ${palette}/></svg>`,
    "flappy-rush": `<svg viewBox="0 0 220 140"><circle cx="82" cy="70" r="24" fill="#ffd166"/><path d="M100 70h40M42 18v104M164 18v104" ${palette}/><path d="M42 52h30M164 92h30" stroke="#8df27d" stroke-width="14"/></svg>`,
    "brick-breaker": `<svg viewBox="0 0 220 140"><g fill="#ff4f8b"><rect x="28" y="24" width="42" height="18" rx="4"/><rect x="76" y="24" width="42" height="18" rx="4"/><rect x="124" y="24" width="42" height="18" rx="4"/><rect x="52" y="50" width="42" height="18" rx="4"/><rect x="100" y="50" width="42" height="18" rx="4"/></g><circle cx="110" cy="88" r="13" fill="#ffd166"/><rect x="66" y="114" width="88" height="12" rx="6" fill="#3be7ff"/></svg>`,
    "space-dodge": `<svg viewBox="0 0 220 140"><path d="M110 24 78 112l32-18 32 18z" fill="#3be7ff" stroke="#07114e" stroke-width="8"/><circle cx="50" cy="40" r="16" fill="#9aa4ba"/><circle cx="174" cy="82" r="20" fill="#ff4f8b"/><path d="M88 116h44" stroke="#ffd166" stroke-width="10"/></svg>`,
    "rush-2048": `<svg viewBox="0 0 220 140"><rect x="28" y="20" width="164" height="100" rx="16" fill="rgba(255,255,255,.12)"/><text x="110" y="88" text-anchor="middle" font-size="44" font-weight="900" fill="#ffd166">2048</text></svg>`,
    minesweeper: `<svg viewBox="0 0 220 140"><g fill="#3be7ff">${[0,1,2,3].map(i=>`<rect x="${48+i*32}" y="34" width="25" height="25" rx="4"/>`).join("")}${[0,1,2,3].map(i=>`<rect x="${48+i*32}" y="68" width="25" height="25" rx="4"/>`).join("")}</g><circle cx="164" cy="82" r="22" fill="#ff4f8b"/><path d="M164 48v-22M146 52l-14-14M182 52l14-14" ${palette}/></svg>`,
    "connect-four": `<svg viewBox="0 0 220 140"><rect x="36" y="22" width="148" height="94" rx="14" fill="#243bff"/><g>${[0,1,2,3].map(r=>[0,1,2,3,4].map(c=>`<circle cx="${62+c*24}" cy="${46+r*22}" r="8" fill="${(r+c)%2?'#ff4f8b':'#ffd166'}"/>`).join("")).join("")}</g></svg>`,
    "pong-rush": `<svg viewBox="0 0 220 140"><rect x="40" y="28" width="12" height="84" rx="6" fill="#3be7ff"/><rect x="168" y="28" width="12" height="84" rx="6" fill="#ff4f8b"/><circle cx="112" cy="70" r="12" fill="#ffd166"/><path d="M110 20v100" stroke="rgba(255,255,255,.36)" stroke-width="6" stroke-dasharray="10 10"/></svg>`,
    "word-guess": `<svg viewBox="0 0 220 140"><g fill="#8df27d">${['W','O','R','D'].map((l,i)=>`<rect x="${36+i*42}" y="42" width="34" height="34" rx="7"/><text x="${53+i*42}" y="66" text-anchor="middle" font-size="20" font-weight="900" fill="#07114e">${l}</text>`).join("")}</g><path d="M54 100h112" ${palette}/></svg>`,
    "speed-rush": `<svg viewBox="0 0 220 140"><path d="M40 102c18-44 42-68 72-68 16 0 28 8 40 18" stroke="#ffd166" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M78 100h84" stroke="#3be7ff" stroke-width="10" stroke-linecap="round"/><circle cx="70" cy="104" r="14" fill="#ff4f8b"/><circle cx="150" cy="104" r="14" fill="#ff4f8b"/></svg>`,
    "tank-arena-94": `<svg viewBox="0 0 220 140"><rect x="58" y="54" width="86" height="40" rx="12" fill="#8df27d" stroke="#07114e" stroke-width="8"/><rect x="92" y="34" width="18" height="24" rx="5" fill="#8df27d" stroke="#07114e" stroke-width="6"/><path d="M110 46h58" stroke="#ffd166" stroke-width="10" stroke-linecap="round"/><circle cx="78" cy="102" r="12" fill="#31445f"/><circle cx="126" cy="102" r="12" fill="#31445f"/></svg>`,
    "tetris-stack": `<svg viewBox="0 0 220 140"><rect x="36" y="34" width="28" height="28" rx="6" fill="#3be7ff"/><rect x="68" y="34" width="28" height="28" rx="6" fill="#3be7ff"/><rect x="100" y="34" width="28" height="28" rx="6" fill="#ff4f8b"/><rect x="100" y="66" width="28" height="28" rx="6" fill="#ff4f8b"/><rect x="132" y="66" width="28" height="28" rx="6" fill="#ffd166"/><rect x="68" y="66" width="28" height="28" rx="6" fill="#9b5cff"/><path d="M30 112h136" stroke="#ffffff" stroke-opacity=".85" stroke-width="10" stroke-linecap="round"/></svg>`,
    "neon-racer": `<svg viewBox="0 0 220 140"><path d="M56 26h108l-24 88H80z" fill="rgba(255,255,255,.1)" stroke="#3be7ff" stroke-width="8"/><path d="M76 42h12M110 42h12M144 42h12" stroke="#ffd166" stroke-width="8" stroke-linecap="round"/><path d="M104 102l10-22 10 22" stroke="#ff4f8b" stroke-width="10" fill="none" stroke-linecap="round"/></svg>`,
    "typing-speed": `<svg viewBox="0 0 220 140"><rect x="34" y="48" width="152" height="50" rx="12" fill="rgba(255,255,255,.1)" stroke="#3be7ff" stroke-width="8"/><path d="M58 74h16M82 74h16M106 74h16M130 74h16M154 74h16" stroke="#ffd166" stroke-width="8" stroke-linecap="round"/><path d="M68 34h84" stroke="#8df27d" stroke-width="10" stroke-linecap="round"/></svg>`,
    "reaction-time": `<svg viewBox="0 0 220 140"><circle cx="110" cy="72" r="34" fill="#ff4f8b"/><path d="M110 72 132 56" stroke="#fff" stroke-width="8" stroke-linecap="round"/><path d="M110 38v-12M78 46 70 36M142 46l8-10" ${palette}/></svg>`,
    "tower-stacker": `<svg viewBox="0 0 220 140"><rect x="72" y="94" width="76" height="18" rx="6" fill="#3be7ff"/><rect x="82" y="74" width="62" height="18" rx="6" fill="#ffd166"/><rect x="92" y="54" width="54" height="18" rx="6" fill="#ff4f8b"/><rect x="102" y="34" width="40" height="18" rx="6" fill="#8df27d"/></svg>`,
    "color-sort": `<svg viewBox="0 0 220 140"><rect x="42" y="28" width="28" height="82" rx="12" fill="rgba(255,255,255,.12)" stroke="#3be7ff" stroke-width="6"/><rect x="88" y="28" width="28" height="82" rx="12" fill="rgba(255,255,255,.12)" stroke="#ffd166" stroke-width="6"/><rect x="134" y="28" width="28" height="82" rx="12" fill="rgba(255,255,255,.12)" stroke="#ff4f8b" stroke-width="6"/><circle cx="56" cy="88" r="9" fill="#3be7ff"/><circle cx="56" cy="64" r="9" fill="#3be7ff"/><circle cx="102" cy="88" r="9" fill="#ffd166"/><circle cx="102" cy="64" r="9" fill="#ffd166"/><circle cx="148" cy="88" r="9" fill="#ff4f8b"/><circle cx="148" cy="64" r="9" fill="#ff4f8b"/></svg>`,
    "pac-maze": `<svg viewBox="0 0 220 140"><path d="M34 34h152v72H34z" fill="rgba(18,33,84,.55)" stroke="#3be7ff" stroke-width="8"/><path d="M64 70h92" stroke="#3be7ff" stroke-width="8"/><circle cx="72" cy="68" r="16" fill="#ffd166"/><circle cx="142" cy="68" r="14" fill="#ff4f8b"/><circle cx="102" cy="68" r="5" fill="#fff"/></svg>`,
    "bomber-grid": `<svg viewBox="0 0 220 140"><g>${[0,1,2].map(r=>[0,1,2,3].map(c=>`<rect x="${42+c*34}" y="26${''}" width="24" height="24" rx="5" fill="${(r+c)%2?'#ffd166':'#8b5733'}"/>`).join("")).join("")}</g><circle cx="148" cy="88" r="16" fill="#ff4f8b"/><path d="M148 58v-12" stroke="#fff" stroke-width="6" stroke-linecap="round"/></svg>`,
  };

  if (game.isY8) {
    const paletteMap = {
      Shooting: ["#ff4f8b", "#ffd166", "#3be7ff"],
      Racing: ["#3be7ff", "#ff4f8b", "#101425"],
      Survival: ["#8df27d", "#ff4f8b", "#101425"],
      Cooking: ["#ffd166", "#ff8c42", "#ff4f8b"],
      "Dress Up": ["#ff9ad5", "#9b5cff", "#3be7ff"],
      Puzzle: ["#ffd166", "#3be7ff", "#8df27d"],
      Arcade: ["#3be7ff", "#ffd166", "#ff4f8b"],
      Sports: ["#8df27d", "#3be7ff", "#ffd166"],
      Adventure: ["#9b5cff", "#ff4f8b", "#ffd166"],
      Strategy: ["#31445f", "#8df27d", "#ffd166"],
    };
    const colors = paletteMap[game.category] || ["#ff4f8b", "#ffd166", "#3be7ff"];
    const labelText = escapeHtml((game.title || "Y8").split(/\s+/).map((word) => word[0]).join("").slice(0, 3).toUpperCase());
    return `<svg viewBox="0 0 220 140"><rect x="20" y="18" width="180" height="104" rx="24" fill="rgba(7,11,28,.55)" stroke="rgba(255,255,255,.16)"/><circle cx="72" cy="70" r="32" fill="${colors[0]}" opacity=".92"/><circle cx="110" cy="70" r="32" fill="${colors[1]}" opacity=".82"/><circle cx="148" cy="70" r="32" fill="${colors[2]}" opacity=".86"/><text x="110" y="78" text-anchor="middle" font-size="30" font-weight="900" fill="#071020">${labelText}</text><text x="172" y="113" text-anchor="middle" font-size="14" font-weight="900" fill="#f6f8ff">Y8</text></svg>`;
  }
  if (covers[id]) return covers[id];
  const label = (game.icon || game.title || 'PR').toString().slice(0, 3).toUpperCase();
  return `<svg viewBox="0 0 220 140"><rect x="26" y="24" width="168" height="92" rx="22" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.15)"/><circle cx="68" cy="70" r="26" fill="#3be7ff" opacity=".9"/><circle cx="110" cy="70" r="26" fill="#ff4f8b" opacity=".72"/><circle cx="152" cy="70" r="26" fill="#ffd166" opacity=".84"/><text x="110" y="79" text-anchor="middle" font-size="32" font-weight="900" fill="#07114e">${label}</text></svg>`;
}


function y8PreviewDoc(game) {
  const url = escapeHtml(game.externalUrl || "");
  const title = escapeHtml(game.title || "Y8 game");
  const width = Number(game.width) || 960;
  const height = Number(game.height) || 540;
  return `<!doctype html><html><head><meta charset="UTF-8"><style>
    html,body{width:100%;height:100%;margin:0;overflow:hidden;background:#050712}
    iframe{position:absolute;inset:0;border:0;width:${width}px;height:${height}px;transform-origin:top left}
  </style></head><body>
    <iframe src="${url}" title="${title}" width="${width}" height="${height}" scrolling="no" loading="lazy"
      sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-forms"
      allow="gamepad *; autoplay; pointer-lock" referrerpolicy="no-referrer"></iframe>
    <script>
      const frame=document.querySelector('iframe');
      const W=${width},H=${height};
      function fit(){const s=Math.max(innerWidth/W,innerHeight/H);frame.style.transform='scale('+s+')';frame.style.left=((innerWidth-W*s)/2)+'px';frame.style.top=((innerHeight-H*s)/2)+'px'}
      addEventListener('resize',fit,{passive:true});fit();
    <\/script>
  </body></html>`;
}

function renderThumb(game) {
  if ((game.isY8 || game.externalUrl) && game.externalUrl) {
    const fallbackPoster = `<div class="cover-art y8-idle-poster y8-fallback-poster">${coverArt(game)}</div>`;
    const imageUrl = game.thumbnail || (typeof game.thumb === "string" && /^https?:\/\//i.test(game.thumb) ? game.thumb : "");
    const photo = imageUrl
      ? `<img class="thumb-photo y8-real-photo" src="${escapeHtml(imageUrl)}" alt="${escapeHtml(game.title)}" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()" />`
      : "";
    return `${fallbackPoster}${photo}<div class="thumb-preview-slot" aria-hidden="true"></div>`;
  }
  return `<div class="cover-art">${coverArt(game)}</div>`;
}

function renderCard(game) {
  const plays = state.playCounts[game.id] || 0;
  const playableClass = game.isPlayable ? "" : " is-locked";
  const cardClass = `game-card compact-game-card${playableClass}${game.isY8 ? " is-y8-card" : ""}`;
  const categoryName = game.category === "Shooting" ? "Shooting" : game.category;
  return `
    <article class="${cardClass}" data-game-id="${game.id}" tabindex="0" role="button" aria-label="${game.isPlayable ? "Play" : "Coming soon"} ${escapeHtml(game.title)}">
      <div class="game-thumb" style="--thumb:${thumbStyle(game)}">
        ${renderThumb(game)}
        <div class="play-hover">▶</div>
      </div>
      <div class="game-body">
        <h3>${escapeHtml(game.title)}</h3>
        <p class="tile-category">${escapeHtml(categoryName)}</p>
        <p class="tile-plays">${plays} plays</p>
        <div class="card-actions">
          <button class="quick-play" data-quick="${game.id}" ${game.isPlayable || game.externalUrl ? "" : "disabled"}>${game.isPlayable || game.externalUrl ? "Play" : "Soon"}</button>
          <button class="favorite-card" data-favorite="${game.id}" aria-label="Favorite ${escapeHtml(game.title)}">${state.favorites.includes(game.id) ? "♥" : "♡"}</button>
        </div>
      </div>
    </article>`;
}

function filteredGames() {
  const query = normalizeSearchText(state.query);
  const games = allGames().filter((game) => {
    const matchesCategory =
      state.category === "All" ||
      game.category === state.category ||
      (state.category === "Y8" && game.isY8) ||
      (state.category === "Shooter" && game.category === "Shooting");
    const haystack = normalizeSearchText(`${game.title} ${game.category} ${game.description} ${game.source || ""} ${game.license || ""} ${(game.tags || []).join(" ")}`);
    return matchesCategory && (!query || haystack.includes(query));
  });
  return sortGames(games);
}

function sortGames(games) {
  const list = [...games];
  if (state.sort === "popular") return list.sort((a, b) => (state.playCounts[b.id] || 0) - (state.playCounts[a.id] || 0));
  if (state.sort === "rating") return list.sort((a, b) => b.rating - a.rating);
  if (state.sort === "newest") return list.reverse();
  if (state.sort === "az") return list.sort((a, b) => a.title.localeCompare(b.title));
  return list.sort((a, b) => Number(b.badges?.includes("Featured") || b.badges?.includes("Editor Pick")) - Number(a.badges?.includes("Featured") || a.badges?.includes("Editor Pick")) || b.rating - a.rating);
}

function renderGrid(element, games) {
  element.innerHTML = games.map(renderCard).join("");
}

function liveCategories() {
  // Build the filter list from categories that actually have games, ordered by the preferred list.
  const present = new Set(allGames().map((g) => g.category).filter(Boolean));
  const preferred = ["Action","Shooting","Racing","Sports","Puzzle","Arcade","Adventure","Cooking","Dress Up","Girls","Fighting","Strategy","Multiplayer","2 Player","Simulation","Platformer","Casual","Kids","Horror","Survival"];
  const ordered = preferred.filter((c) => present.has(c));
  const extras = [...present].filter((c) => !preferred.includes(c)).sort();
  return ["All", ...ordered, ...extras];
}

function renderFilters(element) {
  element.innerHTML = liveCategories()
    .map((cat) => `<button class="chip ${cat === state.category ? "is-active" : ""}" data-category="${cat}">${cat}</button>`)
    .join("");
}


function renderY8Section() {
  const grid = $("#y8Grid");
  const pills = $("#y8CategoryPills");
  if (!grid || !pills) return;
  const groups = liveCategories();
  const query = normalizeSearchText(state.query);
  pills.innerHTML = groups.map((group) => `<button class="chip ${group === state.y8Category ? "is-active" : ""}" data-y8-category="${group}">${group}</button>`).join("");
  const games = activeY8Games().filter((game) => {
    const inGroup = state.y8Category === "All" || game.category === state.y8Category;
    const haystack = normalizeSearchText(`${game.title} ${game.category} ${game.description} ${(game.tags || []).join(" ")}`);
    return inGroup && (!query || haystack.includes(query));
  });
  renderGrid(grid, games.slice(0, query ? 120 : state.y8Category === "All" ? 60 : 36).map(normalizeGame));
}

function renderHome() {
  renderFilters($("#categoryFilters"));
  const recentGames = state.recent.map(gameById).filter(Boolean);
  const favoriteGames = state.favorites.map(gameById).filter(Boolean);
  const portalGames = allGames().filter((g) => g.isPlayable);
  const byPlays = (id) => state.playCounts[id] || 0;
  renderGrid($("#continueGrid"), recentGames.slice(0, 6));
  $("#continueEmpty").hidden = recentGames.length > 0;
  renderGrid($("#favoritesGrid"), favoriteGames.slice(0, 6));
  $("#favoritesEmpty").hidden = favoriteGames.length > 0;
  // All games are embedded now, so feature/popular sections derive from the catalog itself.
  renderGrid($("#featuredGrid"), portalGames.slice(0, 12));
  renderGrid($("#popularGrid"), portalGames.slice().sort((a, b) => byPlays(b.id) - byPlays(a.id)).slice(0, 6));
  renderGrid($("#recentGrid"), portalGames.slice().reverse().slice(0, 6));
  renderY8Section();
  renderGrid($("#editorGrid"), portalGames.slice(12, 20));
}

function renderLibrary() {
  renderFilters($("#libraryFilters"));
  const games = filteredGames();
  renderGrid($("#libraryGrid"), games);
  $("#emptyState").hidden = games.length > 0;
  const countEl = $("#libraryCount");
  if (countEl) countEl.textContent = allGames().filter((g) => g.isPlayable).length.toLocaleString();
  const catEl = $("#libraryCatCount");
  if (catEl) catEl.textContent = Math.max(0, liveCategories().length - 1); // minus "All"
}

function renderAdminList() {
  const list = $("#customGamesList");
  if (!list) return;
  $("#adminEmpty").hidden = state.customGames.length > 0;
  list.innerHTML = state.customGames.map((game) => `
    <div class="admin-row">
      <div><h3>${escapeHtml(game.title)}</h3><p>${escapeHtml(game.category)} - ${escapeHtml(game.description)}</p></div>
      <div class="row-actions">
        <button class="secondary-button" data-edit="${game.id}">Edit</button>
        <button class="secondary-button" data-delete="${game.id}">Delete</button>
        <button class="primary-button" data-play="${game.id}">Play</button>
      </div>
    </div>`).join("");
}

function renderAll() {
  if ($("#home")) renderHome();
  if ($("#library")) renderLibrary();
  if ($("#customGamesList")) renderAdminList();
  if (state.currentGame && $("#relatedGrid")) renderRelated(state.currentGame);
}

function setRoute(hash) {
  const defaultPage = $("#home") ? "home" : "admin";
  const page = (hash || location.hash || `#${defaultPage}`).replace("#", "");
  $$(".page").forEach((screen) => screen.classList.toggle("is-active", screen.dataset.page === page || (!$("#home") && screen.dataset.page === "admin")));
  $$(".main-nav a").forEach((link) => {
    const href = link.getAttribute("href") || "";
    const active = href === `#${page}` || (page === "admin" && href.includes("admin.html"));
    link.classList.toggle("is-active", active);
  });
  $("#mainNav")?.classList.remove("is-open");
  if (page === "library" && $("#library")) renderLibrary();
  // Restore the game after a refresh on #play (currentGame is in-memory only).
  if (page === "play" && $("#play") && !state.currentGame) {
    let lastId = "";
    try { lastId = localStorage.getItem(CURRENT_KEY) || ""; } catch {}
    if (lastId && gameById(lastId)) {
      openGame(lastId);
    } else {
      location.replace("#library");
    }
  }
}


function buildExternalEmbedDoc(game) {
  const url = escapeHtml(game.externalUrl || "");
  const title = escapeHtml(game.title || "Embedded game");
  const width = Number(game.width) || 960;
  const height = Number(game.height) || 540;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title}</title>
<style>
  * { box-sizing: border-box; }
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    overflow: hidden;
    background:
      radial-gradient(circle at 18% 12%, rgba(255,79,139,.18), transparent 24rem),
      radial-gradient(circle at 82% 8%, rgba(59,231,255,.16), transparent 24rem),
      linear-gradient(135deg, #050712, #0b1024 52%, #050712);
    color: #f6f8ff;
    font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
  .stage {
    position: fixed;
    inset: 0;
    display: grid;
    place-items: center;
    padding: 18px;
    overflow: hidden;
  }
  .game-wrap {
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,.14);
    border-radius: 18px;
    background: #050712;
    box-shadow:
      0 28px 90px rgba(0,0,0,.55),
      0 0 0 1px rgba(59,231,255,.08),
      0 0 36px rgba(59,231,255,.11);
  }
  .game-wrap::before {
    content: "Loading game...";
    position: absolute;
    inset: 0;
    z-index: 0;
    display: grid;
    place-items: center;
    color: rgba(246,248,255,.66);
    font-size: 14px;
    font-weight: 800;
    letter-spacing: .04em;
    text-transform: uppercase;
  }
  iframe {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    border: 0;
    background: #fff;
    transform-origin: top left;
  }
  .note {
    position: fixed;
    left: 50%;
    bottom: 10px;
    transform: translateX(-50%);
    z-index: 3;
    max-width: calc(100vw - 24px);
    padding: 7px 10px;
    border: 1px solid rgba(255,255,255,.12);
    border-radius: 999px;
    background: rgba(5,7,18,.72);
    color: rgba(246,248,255,.72);
    font-size: 11px;
    font-weight: 800;
    backdrop-filter: blur(12px);
    white-space: nowrap;
  }
  @media (max-width: 720px) {
    .stage { padding: 8px; }
    .game-wrap { border-radius: 12px; }
    .note { display: none; }
  }
</style>
</head>
<body>
  <div class="stage">
    <div id="wrap" class="game-wrap">
      <iframe
        id="innerGame"
        title="${title}"
        src="${url}"
        width="${width}"
        height="${height}"
        sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-forms"
        allow="fullscreen; gamepad *; autoplay; pointer-lock"
        referrerpolicy="no-referrer"
        scrolling="no"
        allowfullscreen>
      </iframe>
    </div>
  </div>
<script>
  const naturalWidth = ${width};
  const naturalHeight = ${height};
  const wrap = document.getElementById("wrap");
  const iframe = document.getElementById("innerGame");

  function fitGame() {
    const pad = window.innerWidth <= 720 ? 16 : 36;
    const maxWidth = Math.max(240, window.innerWidth - pad);
    const maxHeight = Math.max(240, window.innerHeight - pad);
    const scale = Math.min(maxWidth / naturalWidth, maxHeight / naturalHeight);
    const fittedWidth = Math.floor(naturalWidth * scale);
    const fittedHeight = Math.floor(naturalHeight * scale);

    wrap.style.width = fittedWidth + "px";
    wrap.style.height = fittedHeight + "px";
    iframe.style.width = naturalWidth + "px";
    iframe.style.height = naturalHeight + "px";
    iframe.style.transform = "scale(" + scale + ")";
  }

  addEventListener("resize", fitGame, { passive: true });
  addEventListener("orientationchange", () => setTimeout(fitGame, 120), { passive: true });
  fitGame();
</script>
</body>
</html>`;
}

// Send a custom event to Vercel Web Analytics (no-op if analytics isn't loaded).
function trackEvent(name, data) {
  try {
    if (typeof window.va === "function") window.va("event", { name, ...(data ? { data } : {}) });
  } catch {}
}

function openGame(id) {
  const game = gameById(id);
  if (!game || !game.isPlayable) return;
  state.currentGame = game;
  try { localStorage.setItem(CURRENT_KEY, id); } catch {}
  state.playCounts[id] = (state.playCounts[id] || 0) + 1;
  trackEvent("play_game", {
    game: game.title,
    category: game.category || "Unknown",
    source: game.isY8 ? "Y8" : game.custom ? "Custom" : "Other",
  });
  state.recent = [id, ...state.recent.filter((gameId) => gameId !== id)].slice(0, 12);
  saveJson(PLAYS_KEY, state.playCounts);
  saveJson(RECENT_KEY, state.recent);
  $("#playTitle").textContent = game.title;
  $("#playDescription").textContent = game.description;
  $("#playCategory").textContent = game.category;
  $("#playCount").textContent = `${state.playCounts[id]} plays`;
  $("#playBadge").textContent = game.badges?.[0] ? `${game.badges[0]} PixelRush game` : "PixelRush game";
  $("#favoriteButton").textContent = state.favorites.includes(id) ? "Saved favorite" : "Save favorite";
  const frame = $("#gameFrame");
  const shell = $(".player-shell");
  shell.classList.toggle("is-online-game", Boolean(game.externalUrl));
  frame.onload = () => {
    frame.focus();
    if (frame.contentWindow) frame.contentWindow.focus();
  };
  if (game.externalUrl) {
    frame.removeAttribute("src");
    frame.removeAttribute("scrolling");
    frame.setAttribute("sandbox", "allow-scripts allow-same-origin allow-pointer-lock allow-forms");
    frame.setAttribute("allow", "fullscreen; gamepad *; autoplay; pointer-lock");
    frame.srcdoc = buildExternalEmbedDoc(game);
    $("#playerStatus").textContent = `Now Playing: ${game.title}`;
  } else {
    frame.removeAttribute("src");
    frame.removeAttribute("scrolling");
    frame.setAttribute("sandbox", "allow-scripts");
    frame.srcdoc = game.code;
    $("#playerStatus").textContent = "Playing inside sandbox";
  }
  frame.focus();
  renderRelated(game);
  location.hash = "play";
  renderAll();
  requestAnimationFrame(() => {
    $("#play").scrollIntoView({ block: "start" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function restartCurrentGame() {
  if (state.currentGame) openGame(state.currentGame.id);
}

function playRandomGame() {
  const playable = allGames().filter((game) => game.isPlayable);
  const game = playable[Math.floor(Math.random() * playable.length)];
  if (game) openGame(game.id);
}

function renderRelated(game) {
  const related = allGames().filter((item) => item.id !== game.id && item.category === game.category).slice(0, 4);
  renderGrid($("#relatedGrid"), related.length ? related : allGames().filter((item) => item.id !== game.id).slice(0, 4));
}

function resetForm() {
  $("#gameId").value = "";
  $("#gameTitle").value = "";
  $("#gameCategory").value = "Arcade";
  $("#gameThumb").value = "";
  $("#gameTags").value = "";
  $("#gameDifficulty").value = "Normal";
  $("#gameType").value = "Embedded URL";
  $("#gameMaxLevel").value = "1";
  $("#gameControls").value = "";
  $("#gameProgression").value = "None";
  $("#gameSupports2P").checked = false;
  $("#gameSupportsBot").checked = false;
  $("#gameDescription").value = "";
  $("#gameCode").value = sampleCustomGame();
  $("#previewFrame").srcdoc = sampleCustomGame();
}

function sampleCustomGame() {
  return `<!doctype html>
<html>
<head>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <style>
    *{box-sizing:border-box}
    body{margin:0;min-height:100vh;background:#080914;color:#f6f8ff;font-family:Inter,system-ui,sans-serif;display:grid;place-items:center;padding:18px}
    .game{width:min(98vw,680px);display:grid;gap:12px;padding:18px;border:1px solid rgba(255,255,255,.1);border-radius:24px;background:rgba(10,12,22,.95)}
    .hud{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap}
    .pill{padding:10px 14px;border-radius:999px;background:rgba(59,231,255,.12);font-weight:900}
    canvas{width:100%;border:1px solid rgba(255,255,255,.12);border-radius:18px;background:#050712;touch-action:none}
    button{padding:12px 16px;border:0;border-radius:14px;background:#3be7ff;color:#060813;font-weight:900;cursor:pointer}
    .hint{font-size:0.92rem;color:#a9b3ca}
  </style>
</head>
<body>
  <div class="game">
    <div class="hud"><span class="pill">Score <strong id="score">0</strong></span><span class="pill">Best <strong id="best">0</strong></span></div>
    <canvas id="canvas" width="560" height="360"></canvas>
    <div class="hud"><button id="restart">Restart</button><span class="hint">Use arrow keys or touch to move. Avoid red blocks and last as long as possible.</span></div>
  </div>
  <script>
    const canvas=document.getElementById('canvas');
    const ctx=canvas.getContext('2d');
    const scoreEl=document.getElementById('score');
    const bestEl=document.getElementById('best');
    let player,blocks,score,best=+localStorage.getItem('pr_custom_best')||0,loop,active;
    function init(){player={x:266,y:316,w:28,h:28};blocks=[];score=0;active=true;scoreEl.textContent=0;bestEl.textContent=best;spawnBlocks();cancelAnimationFrame(loop);tick();}
    function spawnBlocks(){const count=4+Math.min(10,Math.floor(score/8));for(let i=0;i<count;i++){blocks.push({x:20+Math.random()*520,y:-20-Math.random()*220,w:18+Math.random()*18,vy:2+score*0.04});}}
    function tick(){ctx.fillStyle='#050712';ctx.fillRect(0,0,560,360);blocks.forEach((b)=>{b.y+=b.vy;ctx.fillStyle='#ff4f8b';ctx.fillRect(b.x,b.y,b.w,b.w);if(b.y>360){b.y=-50;b.x=20+Math.random()*520;score+=1;scoreEl.textContent=score;}});
      ctx.fillStyle='#3be7ff';ctx.fillRect(player.x,player.y,player.w,player.h);
      if(blocks.some((b)=>b.x<player.x+player.w&&b.x+b.w>player.x&&b.y<player.y+player.h&&b.y+b.w>player.y)){active=false;end();return;}
      if(score>0 && score%10===0 && blocks.length<14 && !blocks.some(b=>b.y<0)){spawnBlocks();}
      loop=requestAnimationFrame(tick);
    }
    function end(){best=Math.max(best,score);localStorage.setItem('pr_custom_best',best);bestEl.textContent=best;ctx.fillStyle='#ffffff';ctx.font='900 34px Inter';ctx.textAlign='center';ctx.fillText('Game Over',280,170);ctx.font='700 16px Inter';ctx.fillText('Press restart to play again',280,200);}
    function move(dx,dy){if(!active)return;player.x=Math.max(0,Math.min(532,player.x+dx));player.y=Math.max(0,Math.min(332,player.y+dy));}
    document.addEventListener('keydown',(e)=>{if(!active)return; if(e.key==='ArrowLeft')move(-22,0); if(e.key==='ArrowRight')move(22,0); if(e.key==='ArrowUp')move(0,-22); if(e.key==='ArrowDown')move(0,22);});
    canvas.addEventListener('touchmove',(e)=>{e.preventDefault();const rect=canvas.getBoundingClientRect();player.x=(e.touches[0].clientX-rect.left)-player.w/2;player.y=(e.touches[0].clientY-rect.top)-player.h/2;player.x=Math.max(0,Math.min(532,player.x));player.y=Math.max(0,Math.min(332,player.y));});
    document.getElementById('restart').onclick=init;init();
  <\/script>
</body>
</html>`;
}


function cleanEmbedInput(value = "") {
  return String(value || "")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();
}

function normalizeGameEmbedUrl(url = "") {
  let clean = cleanEmbedInput(url).replace(/^["']|["']$/g, "").trim();
  if (!clean) return "";

  if (clean.startsWith("//")) clean = `https:${clean}`;
  if (/^www\./i.test(clean)) clean = `https://${clean}`;

  try {
    const parsed = new URL(clean, location.origin);
    const host = parsed.hostname.replace(/^www\./, "").toLowerCase();

    if (host === "y8.com" && parsed.pathname.startsWith("/games/")) {
      const slug = parsed.pathname.split("/games/")[1]?.split(/[/?#]/)[0];
      if (slug) return `https://y8.com/embed/${slug}`;
    }

    if (host === "y8.com" && parsed.pathname.startsWith("/embed/")) {
      return `https://y8.com${parsed.pathname}${parsed.search}`;
    }

    return parsed.href;
  } catch {
    return clean;
  }
}

function textFromHtmlSnippet(html = "") {
  const withoutTags = cleanEmbedInput(html)
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\bPlay Now!?\b/gi, "")
    .trim();
  return withoutTags;
}

function titleCaseFromSlug(slug = "") {
  return String(slug || "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

function extractEmbedMeta(value = "") {
  const text = cleanEmbedInput(value);
  if (!text) return { url: "", width: 960, height: 540, title: "", thumbnail: "" };

  const iframeSrc = text.match(/<iframe[^>]+src=["']([^"']+)["']/i);
  const anchorHref = text.match(/<a[^>]+href=["']([^"']+)["']/i);
  const imgSrc =
    text.match(/<img[^>]+(?:data-src|src)=["']([^"']+)["']/i) ||
    text.match(/<img[^>]+srcset=["']([^"'\s,]+)[^"']*["']/i);
  const imgAlt = text.match(/<img[^>]+alt=["']([^"']+)["']/i);
  const iframeWidth = text.match(/\bwidth=["']?(\d+)["']?/i) || text.match(/width:\s*(\d+)px/i);
  const iframeHeight = text.match(/\bheight=["']?(\d+)["']?/i) || text.match(/height:\s*(\d+)px/i);

  const urls = [];
  if (iframeSrc?.[1]) urls.push(iframeSrc[1]);
  if (anchorHref?.[1]) urls.push(anchorHref[1]);

  for (const match of text.matchAll(/https?:\/\/[^\s"'<>]+/gi)) urls.push(match[0]);
  for (const match of text.matchAll(/\/\/(?:www\.)?y8\.com\/[^\s"'<>]+/gi)) urls.push(match[0]);

  const preferred =
    urls.find((url) => /y8\.com\/embed\//i.test(url)) ||
    urls.find((url) => /y8\.com\/games\//i.test(url)) ||
    urls[0] ||
    text;

  const url = normalizeGameEmbedUrl(preferred);
  const slug = url.match(/\/embed\/([^/?#]+)/i)?.[1] || preferred.match(/\/games\/([^/?#]+)/i)?.[1] || "";

  const title =
    cleanEmbedInput(imgAlt?.[1] || "") ||
    textFromHtmlSnippet(text) ||
    titleCaseFromSlug(slug);

  return {
    url,
    width: Math.max(320, Number(iframeWidth?.[1]) || 960),
    height: Math.max(240, Number(iframeHeight?.[1]) || 540),
    title,
    thumbnail: imgSrc?.[1] ? cleanEmbedInput(imgSrc[1]) : "",
  };
}

function extractEmbedUrl(value = "") {
  return extractEmbedMeta(value).url;
}

function isY8EmbedUrl(value = "") {
  return /https?:\/\/(?:www\.)?y8\.com\/embed\//i.test(String(value));
}

function previewCustomGame() {
  const frame = $("#previewFrame");
  if (!frame) return;
  if ($("#gameType")?.value === "Embedded URL") {
    const embed = extractEmbedMeta($("#gameCode").value);
    frame.removeAttribute("src");
    frame.srcdoc = buildExternalEmbedDoc({
      title: $("#gameTitle")?.value || embed.title || "Embedded game",
      externalUrl: embed.url,
      width: embed.width,
      height: embed.height,
    });
  } else {
    frame.removeAttribute("src");
    frame.srcdoc = $("#gameCode").value;
  }
}


function migrateStoredCustomGames() {
  if (!Array.isArray(state.customGames)) return;
  let changed = false;
  state.customGames = state.customGames.map((game) => {
    if (!game || game.gameType !== "Embedded URL") return game;
    const raw = game.externalUrl || game.code || "";
    const embed = extractEmbedMeta(raw);
    const normalizedUrl = embed.url || raw;
    const migrated = {
      ...game,
      title: game.title || embed.title || "Embedded Game",
      description: game.description || embed.title || "Embedded Game",
      thumb: game.thumb || embed.thumbnail || "linear-gradient(135deg,#ff4f8b,#3be7ff,#8df27d)",
      thumbnail: game.thumbnail || embed.thumbnail || "",
      externalUrl: normalizedUrl,
      width: game.width || embed.width,
      height: game.height || embed.height,
      isPlayable: true,
      isY8: isY8EmbedUrl(normalizedUrl),
      source: isY8EmbedUrl(normalizedUrl) ? "Y8 embed URL" : game.source || "Admin embedded URL",
      license: isY8EmbedUrl(normalizedUrl) ? "Y8 iframe embed" : game.license || "User supplied embed",
    };
    if (JSON.stringify(migrated) !== JSON.stringify(game)) changed = true;
    return migrated;
  });
  if (changed) saveJson(STORE_KEY, state.customGames);
}

function publishCustomGame(event) {
  event.preventDefault();
  const id = $("#gameId").value || `custom-${Date.now()}`;
  const embedMeta = $("#gameType").value === "Embedded URL" ? extractEmbedMeta($("#gameCode").value) : { url: "", width: 960, height: 540, title: "", thumbnail: "" };
  const modeLabels = [];
  if ($("#gameSupports2P").checked) modeLabels.push("Player vs Player");
  if ($("#gameSupportsBot").checked) modeLabels.push("Player vs Bot");
  const game = {
    id,
    title: $("#gameTitle").value.trim() || embedMeta.title,
    category: $("#gameCategory").value,
    description: $("#gameDescription").value.trim(),
    thumb: $("#gameThumb").value.trim() || embedMeta.thumbnail || "linear-gradient(135deg,#ff4f8b,#3be7ff,#8df27d)",
    thumbnail: $("#gameThumb").value.trim() || embedMeta.thumbnail || "",
    icon: "",
    tags: $("#gameTags").value.split(",").map((tag) => tag.trim()).filter(Boolean),
    difficulty: $("#gameDifficulty").value,
    gameType: $("#gameType").value,
    maxLevel: Math.max(1, Number($("#gameMaxLevel").value) || 1),
    controls: $("#gameControls").value.trim(),
    progression: $("#gameProgression").value,
    supportedModes: modeLabels.length ? modeLabels : ["Solo"],
    supportsBot: $("#gameSupportsBot").checked,
    supports2P: $("#gameSupports2P").checked,
    rating: 4.4,
    isPlayable: $("#gameType").value !== "Coming Soon",
    badges: ["New"],
    code: $("#gameType").value === "Embedded URL" ? "" : $("#gameCode").value,
    externalUrl: $("#gameType").value === "Embedded URL" ? embedMeta.url : "",
    width: embedMeta.width,
    height: embedMeta.height,
    isY8: isY8EmbedUrl(embedMeta.url),
    source: isY8EmbedUrl(embedMeta.url) ? "Y8 embed URL" : "Admin embedded URL",
    license: isY8EmbedUrl(embedMeta.url) ? "Y8 iframe embed" : "User supplied embed",
    custom: true,
  };
  if (!game.title || (!game.code && !game.externalUrl && game.isPlayable)) return;
  if (!game.description) game.description = game.title;
  const index = state.customGames.findIndex((item) => item.id === id);
  if (index >= 0) state.customGames[index] = game;
  else state.customGames.unshift(game);
  saveJson(STORE_KEY, state.customGames);
  renderAll();
  resetForm();
  location.hash = "library";
}

function editCustomGame(id) {
  const game = state.customGames.find((item) => item.id === id);
  if (!game) return;
  $("#gameId").value = game.id;
  $("#gameTitle").value = game.title;
  $("#gameCategory").value = game.category;
  $("#gameThumb").value = /^linear-gradient/.test(game.thumb) ? "" : game.thumb;
  $("#gameTags").value = (game.tags || []).join(", ");
  $("#gameDifficulty").value = game.difficulty || "Normal";
  $("#gameType").value = game.gameType || "Custom HTML";
  $("#gameMaxLevel").value = game.maxLevel || 1;
  $("#gameControls").value = game.controls || "";
  $("#gameProgression").value = game.progression || "None";
  $("#gameSupports2P").checked = !!game.supports2P;
  $("#gameSupportsBot").checked = !!game.supportsBot;
  $("#gameDescription").value = game.description;
  $("#gameCode").value = game.code || game.externalUrl || "";
  previewCustomGame();
  location.hash = "admin";
}

function deleteCustomGame(id) {
  state.customGames = state.customGames.filter((game) => game.id !== id);
  state.favorites = state.favorites.filter((gameId) => gameId !== id);
  delete state.playCounts[id];
  saveJson(STORE_KEY, state.customGames);
  saveJson(FAV_KEY, state.favorites);
  saveJson(PLAYS_KEY, state.playCounts);
  renderAll();
}

function toggleFavorite() {
  if (!state.currentGame) return;
  const id = state.currentGame.id;
  state.favorites = state.favorites.includes(id)
    ? state.favorites.filter((item) => item !== id)
    : [...state.favorites, id];
  saveJson(FAV_KEY, state.favorites);
  $("#favoriteButton").textContent = state.favorites.includes(id) ? "Saved favorite" : "Save favorite";
  renderAll();
}

function toggleFavoriteById(id) {
  state.favorites = state.favorites.includes(id)
    ? state.favorites.filter((item) => item !== id)
    : [...state.favorites, id];
  saveJson(FAV_KEY, state.favorites);
  if (state.currentGame?.id === id) {
    $("#favoriteButton").textContent = state.favorites.includes(id) ? "Saved favorite" : "Save favorite";
  }
  renderAll();
}


function startTilePreview(card) {
  if (!card || !card.classList.contains("is-y8-card")) return;
  const slot = card.querySelector(".thumb-preview-slot");
  if (!slot || slot.dataset.loaded === "true") return;
  const game = gameById(card.dataset.gameId);
  if (!game || !game.isY8 || !game.externalUrl) return;
  slot.innerHTML = `<iframe class="thumb-live-preview" title="${escapeHtml(game.title)} preview" loading="lazy" sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-forms" referrerpolicy="no-referrer" srcdoc="${escapeHtml(y8PreviewDoc(game))}"></iframe>`;
  slot.dataset.loaded = "true";
  card.classList.add("has-live-preview");
}

function stopTilePreview(card) {
  if (!card || !card.classList.contains("is-y8-card")) return;
  const slot = card.querySelector(".thumb-preview-slot");
  if (!slot) return;
  slot.innerHTML = "";
  slot.dataset.loaded = "false";
  card.classList.remove("has-live-preview");
}

document.addEventListener("click", (event) => {
  const favorite = event.target.closest("[data-favorite]");
  if (favorite) {
    event.stopPropagation();
    toggleFavoriteById(favorite.dataset.favorite);
    return;
  }
  const quick = event.target.closest("[data-quick]");
  if (quick) {
    event.stopPropagation();
    openGame(quick.dataset.quick);
    return;
  }
  const y8Chip = event.target.closest("[data-y8-category]");
  if (y8Chip) {
    state.y8Category = y8Chip.dataset.y8Category;
    renderY8Section();
    return;
  }
  const card = event.target.closest("[data-game-id]");
  if (card) openGame(card.dataset.gameId);
  const chip = event.target.closest("[data-category]");
  if (chip) {
    state.category = chip.dataset.category;
    renderAll();
  }
  const edit = event.target.closest("[data-edit]");
  if (edit) editCustomGame(edit.dataset.edit);
  const remove = event.target.closest("[data-delete]");
  if (remove) deleteCustomGame(remove.dataset.delete);
  const play = event.target.closest("[data-play]");
  if (play) openGame(play.dataset.play);
});


document.addEventListener("mouseover", (event) => {
  const card = event.target.closest(".is-y8-card[data-game-id]");
  if (card) startTilePreview(card);
});

document.addEventListener("mouseout", (event) => {
  const card = event.target.closest(".is-y8-card[data-game-id]");
  if (card && !card.contains(event.relatedTarget)) stopTilePreview(card);
});

document.addEventListener("focusin", (event) => {
  const card = event.target.closest(".is-y8-card[data-game-id]");
  if (card) startTilePreview(card);
});

document.addEventListener("focusout", (event) => {
  const card = event.target.closest(".is-y8-card[data-game-id]");
  if (card && !card.contains(event.relatedTarget)) stopTilePreview(card);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && event.target.matches("[data-game-id]")) openGame(event.target.dataset.gameId);
});


function bind(selector, eventName, handler) {
  const element = $(selector);
  if (element) element.addEventListener(eventName, handler);
}

bind("#globalSearch", "input", (event) => {
  state.query = event.target.value;
  if ($("#librarySearch")) $("#librarySearch").value = state.query;
  if ($("#heroSearch")) $("#heroSearch").value = state.query;
  renderAll();
});

bind("#heroSearch", "input", (event) => {
  state.query = event.target.value;
  if ($("#globalSearch")) $("#globalSearch").value = state.query;
  if ($("#librarySearch")) $("#librarySearch").value = state.query;
  renderAll();
});

bind("#librarySearch", "input", (event) => {
  state.query = event.target.value;
  if ($("#globalSearch")) $("#globalSearch").value = state.query;
  if ($("#heroSearch")) $("#heroSearch").value = state.query;
  renderAll();
});

bind("#sortSelect", "change", (event) => {
  state.sort = event.target.value;
  renderAll();
});

bind("#menuToggle", "click", () => $("#mainNav")?.classList.toggle("is-open"));
bind("#backToGames", "click", () => { location.hash = "library"; });
bind("#favoriteButton", "click", toggleFavorite);
bind("#randomGameButton", "click", playRandomGame);
bind("#restartGameButton", "click", restartCurrentGame);
bind("#fullscreenButton", "click", () => {
  const target = $(".player-shell.is-online-game .game-frame-viewport") || $("#gameFrame");
  target?.requestFullscreen?.();
});
bind("#newGameButton", "click", resetForm);
bind("#previewButton", "click", previewCustomGame);
bind("#cancelEditButton", "click", resetForm);
bind("#gameType", "change", () => {
  if ($("#gameCode") && $("#gameType")?.value === "Embedded URL" && $("#gameCode").value.includes("<canvas")) {
    $("#gameCode").value = "";
  }
});
bind("#gameForm", "submit", publishCustomGame);
window.addEventListener("hashchange", () => setRoute());

window.addEventListener("load", () => {
  setTimeout(() => $("#loader")?.classList.add("is-hidden"), 350);
});

// --- Admin password gate (client-side; change ADMIN_PASSWORD below) ---
const ADMIN_PASSWORD = "pixelrush2026";
const ADMIN_SESSION_KEY = "pixelrush_admin_ok_v1";
function unlockAdmin() {
  document.body.classList.remove("admin-locked");
  $("#adminGate")?.remove();
}
function setupAdminGate() {
  const gate = $("#adminGate");
  if (!gate) return; // not the admin page
  if (sessionStorage.getItem(ADMIN_SESSION_KEY) === "1") {
    unlockAdmin();
  } else {
    setTimeout(() => $("#adminGatePass")?.focus(), 400);
  }
  $("#adminGateForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    if ($("#adminGatePass").value === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, "1");
      unlockAdmin();
    } else {
      $("#adminGateError").hidden = false;
      $("#adminGatePass").value = "";
      $("#adminGatePass").focus();
    }
  });
  $("#adminLockButton")?.addEventListener("click", () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    location.reload();
  });
}
setupAdminGate();

if ($("#gameForm")) resetForm();
migrateStoredCustomGames();
renderAll();
setRoute();
if (typeof loadY8Catalog === "function") loadY8Catalog();

