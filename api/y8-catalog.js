const PAGE_SIZE_GUESS = 45;

function escapeId(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/^https?:\/\/y8\.com\/embed\//, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function titleCaseFromSlug(slug = "") {
  return String(slug)
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

function guessCategory(text = "") {
  const value = text.toLowerCase();
  if (/(shoot|sniper|gun|fps|zombie|target|war|battle|fighter|assassin|fire)/.test(value)) return "Shooting";
  if (/(car|race|racer|driv|truck|moto|bike|road|traffic|uaz|turbo|speed|ride)/.test(value)) return "Racing";
  if (/(cook|kitchen|restaurant|burger|pizza|ramen|breakfast|sushi|smoothie|coffee|cake|macaron|churro|food)/.test(value)) return "Cooking";
  if (/(dress|fashion|makeover|sofia|cathy|maggie|sara|vet|beauty|girl|valentine|style|baby)/.test(value)) return "Dress Up";
  if (/(puzzle|sort|maze|arrow|slice|shape|color|cube|draw|logic|word|line|fit|spin|orbit)/.test(value)) return "Puzzle";
  if (/(sport|ball|dunk|archery|swim|boxing|kick|soccer|basket|punch)/.test(value)) return "Sports";
  if (/(run|jump|adventure|quest|climb|escape|hero|boss|troll|legend)/.test(value)) return "Adventure";
  if (/(defense|strategy|tower|connect|tic|war)/.test(value)) return "Strategy";
  return "Arcade";
}

function cleanTitle(value = "") {
  return String(value)
    .replace(/\s+Play Now!?$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseGames(html = "") {
  const games = [];
  const seen = new Set();

  const entryRegex = /<a[^>]+href=["']\/games\/[^"']+["'][^>]*>([^<]+)<\/a>[\s\S]{0,2200}?<iframe[^>]+src=["']https:\/\/y8\.com\/embed\/([^"']+)["'][^>]*style=["'][^"']*width:\s*(\d+)px;\s*height:\s*(\d+)px/gi;
  let match;

  while ((match = entryRegex.exec(html))) {
    const title = cleanTitle(match[1]) || titleCaseFromSlug(match[2]);
    const slug = match[2];
    const externalUrl = `https://y8.com/embed/${slug}`;
    if (seen.has(externalUrl)) continue;
    seen.add(externalUrl);

    const start = Math.max(0, match.index - 1200);
    const end = Math.min(html.length, entryRegex.lastIndex + 800);
    const block = html.slice(start, end);
    const imgMatch =
      block.match(/<img[^>]+(?:data-src|src)=["']([^"']+)["'][^>]+alt=["'][^"']*["']/i) ||
      block.match(/<img[^>]+alt=["'][^"']*["'][^>]+(?:data-src|src)=["']([^"']+)["']/i);

    games.push({
      id: `y8-${escapeId(slug)}`,
      title,
      slug,
      category: guessCategory(`${title} ${slug}`),
      description: `${title} playable inside PixelRush.`,
      externalUrl,
      embedUrl: externalUrl,
      width: Number(match[3]) || 960,
      height: Number(match[4]) || 540,
      thumbnail: imgMatch ? imgMatch[1].replace(/&amp;/g, "&") : "",
      isY8: true,
      rating: 4.4,
      difficulty: "Varies",
      supportedModes: ["Solo"],
      tags: ["web game", guessCategory(`${title} ${slug}`).toLowerCase()],
    });
  }

  return games;
}

export default async function handler(req, res) {
  const limit = Math.min(Math.max(Number(req.query.limit || 500), 1), 500);
  const order = String(req.query.order || "popularity").replace(/[^a-z]/gi, "") || "popularity";
  const maxPages = Math.min(35, Math.ceil(limit / PAGE_SIZE_GUESS) + 10);
  const games = [];
  const seen = new Set();

  try {
    for (let page = 1; page <= maxPages && games.length < limit; page++) {
      const url = `https://www.y8.com/games_for_your_website?order=${order}&page=${page}`;
      const response = await fetch(url, {
        headers: {
          "user-agent": "Mozilla/5.0 PixelRushCatalogBot/1.0",
          "accept": "text/html,application/xhtml+xml",
        },
      });
      if (!response.ok) continue;
      const html = await response.text();
      for (const game of parseGames(html)) {
        if (seen.has(game.externalUrl)) continue;
        seen.add(game.externalUrl);
        game.order = games.length + 1;
        games.push(game);
        if (games.length >= limit) break;
      }
    }

    res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate=604800");
    res.status(200).json({
      count: games.length,
      limit,
      source: "https://www.y8.com/games_for_your_website",
      games,
    });
  } catch (error) {
    res.status(500).json({
      error: "Unable to build Y8 catalog",
      message: error?.message || String(error),
      games,
    });
  }
}
