export type Vinyl = {
  slug: string;
  title: string;
  artist: string;
  year: number;
  genre: string;
  price: number;
  description: string;
  tracks: string[];
  /** Two colors used to draw the sleeve. */
  colors: [string, string];
};

export const records: Vinyl[] = [
  {
    slug: "midnight-static",
    title: "Midnight Static",
    artist: "The Velvet Antennas",
    year: 1979,
    genre: "Post-punk",
    price: 29,
    description:
      "Wiry guitars and a bassline you can feel in your teeth. A late-night classic, reissued on 180g vinyl.",
    tracks: ["Signal Lost", "Concrete Bloom", "Neon Prayer", "Static Heart", "Last Train Out"],
    colors: ["#1e1b4b", "#f43f5e"],
  },
  {
    slug: "sunday-groove",
    title: "Sunday Groove",
    artist: "Lou Marlowe Quartet",
    year: 1962,
    genre: "Jazz",
    price: 34,
    description:
      "Warm, unhurried hard bop recorded live in one take. Brushes, upright bass and a tenor sax that sings.",
    tracks: ["Slow Coffee", "Rue Blue", "Sunday Groove", "Marlowe's Waltz"],
    colors: ["#78350f", "#fbbf24"],
  },
  {
    slug: "desert-bloom",
    title: "Desert Bloom",
    artist: "Sol & the Mirage",
    year: 1974,
    genre: "Psych rock",
    price: 27,
    description:
      "Fuzz-soaked guitars and hazy harmonies drifting over open highways. Gatefold sleeve.",
    tracks: ["Heatwave", "Cactus Flower", "Mirage", "Dust Devil", "Bloom"],
    colors: ["#c2410c", "#fde68a"],
  },
  {
    slug: "glass-city",
    title: "Glass City",
    artist: "Nova Kline",
    year: 1984,
    genre: "Synth-pop",
    price: 25,
    description:
      "Shimmering drum machines and big, bright hooks. Pressed on translucent blue vinyl.",
    tracks: ["Glass City", "Telephone Love", "Afterglow", "Run Tonight", "Mirrorball"],
    colors: ["#0e7490", "#a5f3fc"],
  },
  {
    slug: "roots-and-rain",
    title: "Roots & Rain",
    artist: "Ada Fennimore",
    year: 1971,
    genre: "Folk",
    price: 24,
    description:
      "Just a voice, a guitar and the sound of rain on the studio roof. Quiet, honest and timeless.",
    tracks: ["Willow Song", "Rain on Tin", "Old Roads", "Roots", "Lantern"],
    colors: ["#14532d", "#bbf7d0"],
  },
  {
    slug: "heavy-weather",
    title: "Heavy Weather",
    artist: "Iron Meridian",
    year: 1986,
    genre: "Metal",
    price: 31,
    description:
      "Thunderous riffs and galloping drums. Remastered from the original tapes, loud as ever.",
    tracks: ["Stormfront", "Black Meridian", "Hammerfall", "Eye of the Gale"],
    colors: ["#18181b", "#a1a1aa"],
  },
  {
    slug: "soul-kitchen-sessions",
    title: "Soul Kitchen Sessions",
    artist: "The Honeytones",
    year: 1968,
    genre: "Soul",
    price: 28,
    description:
      "Horns, handclaps and a voice like warm honey. Twelve songs made for dancing in the kitchen.",
    tracks: ["Stir It Slow", "Sugar Line", "Honey Do", "Kitchen Floor", "Goodnight Sweet"],
    colors: ["#9f1239", "#fda4af"],
  },
  {
    slug: "low-tide",
    title: "Low Tide",
    artist: "Harbor Lights",
    year: 1997,
    genre: "Dream pop",
    price: 26,
    description:
      "Reverb-drenched guitars that wash in and out like the sea. Best heard at dusk.",
    tracks: ["Low Tide", "Saltwater", "Lighthouse", "Drift", "Undertow"],
    colors: ["#312e81", "#c7d2fe"],
  },
];

export function getRecord(slug: string) {
  return records.find((record) => record.slug === slug);
}
