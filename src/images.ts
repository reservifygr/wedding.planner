// All imagery: Unsplash (free to use under the Unsplash License, no attribution required).
// Swap any photo by changing its id. Every <Img> falls back to a soft gradient if a link ever breaks.

export const IMG = {
  // Destinations
  oia: "1570077188670-e3a8d69ac5ff",
  domes: "1613395877344-13d4a8e0d49e",
  caldera: "1761047726518-d9b6d6f5776e",
  dome2: "1586015298373-f885ba285829",
  mykonos: "1601581875309-fafbf2d3ed3a",
  windmill: "1523568129082-a8d6c095638e",
  littleVenice: "1764185258558-1ba95c098354",
  acropolis: "1603565816030-6b389eeb23cb",
  sounion: "1599423217192-34da246be9e8",
  balos: "1601836743857-4d1e6da20a32",
  creteCoast: "1611697522020-f44d4e818698",
  corfuBay: "1781880163645-81358779b76e",
  corfuTown: "1781880141115-a920020ffff1",
  harbour: "1504512485720-7d83a16ee930",
  terrace: "1469796466635-455ede028aca",

  // Couples & ceremony
  sunsetKiss: "1600270237614-d20aef1c8b14",
  brideSea: "1600164913117-2125c1f60b01",
  coupleCliff: "1557307970-9b07c4c95e76",
  silhouette: "1519307212971-dd9561667ffb",
  goldenField: "1606490194859-07c18c9f0968",
  rockySunset: "1769540243269-e90a53d26a4b",
  brideBeach: "1783818412138-e2eeccd6a9b1",
  coupleBouquet: "1519741497674-611481863552",
  hands: "1465495976277-4387d4b0b4c6",
  archVenue: "1727424831565-7ce0c8ab0610",
  oceanCeremony: "1768488292726-9c850289925a",
  veil: "1753703986184-6be8122d1e85",
  boatCouple: "1753703986203-cae375294196",

  // Reception
  toast: "1774660811278-3a9710b375cd",
  longTable: "1536392706976-e486e2ba97af",
  whiteTable: "1769812343338-12a591ef0317",
  goldTable: "1767050292710-8e5da59ec5d8",
  setTable: "1775126964424-913480443772",
  candleTable: "1758705477576-8783430d55b6",
  sparklers: "1768777273847-e5d8531b7fc5",
  sparkKiss: "1769230375941-55a7f556d7f1",
  dancing: "1784202388427-5c92c7a165a6",
  partyDance: "1758810409996-583f3bad7d51",

  // Vendors
  makeup: "1773688189414-7637b9b138e1",
  makeup2: "1774814304885-bb5cc796a6c3",
  hairPearl: "1782776852521-77b0aed8831d",
  hairFlower: "1549236177-77e8271c34b6",
  photographer: "1769635177236-116c95222fab",
  camera: "1516035069371-29a1b244cc32",
  guitar: "1775126964224-99c03c0e439c",
  mic: "1511671782779-c97d3d27a1d4",
  buffet: "1555244162-803834f70033",
  fineDining: "1414235077428-338989a2e8c0",
  bouquetWhite: "1595467959554-9ffcbf37f10f",
  roses: "1776437209317-e1f7bcff1300",
  softFlowers: "1561848355-890d054dc55a",
  rings: "1606800052052-a08af7148866",
  ringsRoses: "1515934751635-c81c6bc9a2d8",
  yacht: "1567899378494-47b22a2ae96a",
} as const;

export type ImgKey = keyof typeof IMG;

export const img = (k: ImgKey, w = 1200, h?: number) =>
  `https://images.unsplash.com/photo-${IMG[k]}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ""}&q=80`;
