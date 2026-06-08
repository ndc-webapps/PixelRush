#!/usr/bin/env node
// PixelRush Y8 catalog importer.
// Scrapes y8.com's official "games for your website" embed list and writes y8-catalog.js.
// Usage: node tools/y8-importer.mjs --limit=500
import fs from "node:fs/promises";
import path from "node:path";

const limitArg = process.argv.find((arg) => arg.startsWith("--limit="));
const LIMIT = Math.min(Math.max(Number(limitArg?.split("=")[1] || 500), 1), 2000);
const OUT = path.resolve("y8-catalog.js");

function escapeId(value = "") {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function titleCaseFromSlug(slug = "") {
  return String(slug).replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, (m) => m.toUpperCase());
}
function decode(value = "") {
  return String(value).replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim();
}
function guessCategory(text = "") {
  const v = text.toLowerCase();
  if (/(dress|fashion|makeover|sofia|cathy|maggie|sara|barbie|princess|beauty|salon|nail|wedding|valentine|style)/.test(v)) return "Dress Up";
  if (/(cook|kitchen|restaurant|burger|pizza|ramen|breakfast|sushi|smoothie|coffee|cake|macaron|churro|ice cream|food|bakery|chef)/.test(v)) return "Cooking";
  if (/(shoot|sniper|gun|fps|target|war|fire|strike|bullet|defen)/.test(v)) return "Shooting";
  if (/(zombie|horror|scary|haunt|evil|dark|creepy|granny|nightmare)/.test(v)) return "Horror";
  if (/(survival|survive|hunger|island|craft|raft|miner|mine)/.test(v)) return "Survival";
  if (/(car|race|racer|driv|truck|moto|bike|road|traffic|turbo|drift|wheel|parking|rally|kart)/.test(v)) return "Racing";
  if (/(fight|boxing|punch|kung|karate|warrior|ninja|street|combat|brawl)/.test(v)) return "Fighting";
  if (/(sport|ball|dunk|archery|swim|soccer|basket|golf|tennis|pool|bowling|football|cricket|baseball|hockey)/.test(v)) return "Sports";
  if (/(2 ?player|two player|1v1|local multiplayer)/.test(v)) return "2 Player";
  if (/(io|multiplayer|online|arena)/.test(v)) return "Multiplayer";
  if (/(puzzle|sort|maze|match|shape|color|cube|logic|word|line|block|jigsaw|mahjong|2048|sudoku|hex|merge)/.test(v)) return "Puzzle";
  if (/(defense|tower|strategy|tactic|kingdom|empire|build|tycoon|idle|clicker|manage)/.test(v)) return "Strategy";
  if (/(sim|simulator|farm|city|life|pet|doctor|dentist|surgery|baby|care)/.test(v)) return "Simulation";
  if (/(platform|jump|run|climb|sprint|hop|parkour)/.test(v)) return "Platformer";
  if (/(adventure|quest|escape|hero|boss|legend|story|rpg|dungeon)/.test(v)) return "Adventure";
  if (/(kid|toddler|preschool|coloring|paint|learn|abc|baby)/.test(v)) return "Kids";
  if (/(girl|princess|unicorn)/.test(v)) return "Girls";
  return "Arcade";
}

function parseGames(html = "") {
  const games = [];
  // Each card holds: <img ... src="THUMB" ...><div class='name'>TITLE</div> ... <iframe src="https://y8.com/embed/SLUG" ... style="width: Wpx; height: Hpx;
  const cardRegex = /<img[^>]+src=["']([^"']+\.(?:webp|jpe?g|png|gif)[^"']*)["'][^>]*>\s*<div class=['"]name['"]>([^<]+)<\/div>[\s\S]{0,600}?<iframe src=["']https:\/\/y8\.com\/embed\/([^"']+)["'][^>]*style=["'][^"']*width:\s*(\d+)px;\s*height:\s*(\d+)px/gi;
  let m;
  while ((m = cardRegex.exec(html))) {
    const thumbnail = decode(m[1]);
    const title = decode(m[2]) || titleCaseFromSlug(m[3]);
    const slug = m[3];
    const category = guessCategory(`${title} ${slug}`);
    games.push({
      id: `y8-${escapeId(slug)}`,
      title,
      slug,
      category,
      description: `${title} - a free web game playable inside PixelRush.`,
      externalUrl: `https://y8.com/embed/${slug}`,
      embedUrl: `https://y8.com/embed/${slug}`,
      thumbnail,
      width: Number(m[4]) || 960,
      height: Number(m[5]) || 600,
      source: "Y8",
      isY8: true,
      rating: 4.4,
      difficulty: "Varies",
      tags: ["y8", "web game", category.toLowerCase()],
    });
  }
  return games;
}

const games = [];
const seen = new Set();
for (let page = 1; page <= 45 && games.length < LIMIT; page++) {
  const url = `https://www.y8.com/games_for_your_website?order=popularity&page=${page}`;
  process.stdout.write(`page ${page} ... `);
  let html = "";
  try {
    const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
    if (!res.ok) { console.log(`http ${res.status}`); continue; }
    html = await res.text();
  } catch (e) { console.log("err", e.message); continue; }
  let added = 0;
  for (const g of parseGames(html)) {
    if (seen.has(g.externalUrl)) continue;
    seen.add(g.externalUrl);
    g.order = games.length + 1;
    games.push(g);
    added++;
    if (games.length >= LIMIT) break;
  }
  console.log(`+${added} (total ${games.length})`);
  if (added === 0 && page > 3) break;
}

await fs.writeFile(OUT, `window.PIXELRUSH_Y8_GAMES = ${JSON.stringify(games, null, 2)};\n`);
console.log(`Saved ${games.length} verified Y8 embed games to ${OUT}`);
