import type { ImgKey } from "./images";

export type Lang = "el" | "en";
export type T2 = { el: string; en: string };
export type DestId = "athens" | "riviera" | "mykonos" | "santorini" | "crete" | "corfu";
export type Cat = "venue" | "photo" | "beauty" | "music" | "catering" | "florals" | "extras";
export type Style = "romantic" | "boho" | "classic" | "glam" | "rustic";

export interface Destination {
  id: DestId;
  name: T2;
  tagline: T2;
  season: T2;
  from: number;
  images: ImgKey[];
}

export const DESTINATIONS: Destination[] = [
  {
    id: "santorini",
    name: { el: "Σαντορίνη", en: "Santorini" },
    tagline: { el: "Όρκοι πάνω από την καλντέρα, στο πιο διάσημο ηλιοβασίλεμα του κόσμου", en: "Vows above the caldera, at the world's most famous sunset" },
    season: { el: "Απρίλιος – Οκτώβριος", en: "April – October" },
    from: 14900,
    images: ["oia", "domes", "caldera"],
  },
  {
    id: "mykonos",
    name: { el: "Μύκονος", en: "Mykonos" },
    tagline: { el: "Λευκά σοκάκια, ανεμόμυλοι και πάρτι μέχρι το ξημέρωμα", en: "Whitewashed lanes, windmills and parties until sunrise" },
    season: { el: "Μάιος – Οκτώβριος", en: "May – October" },
    from: 16500,
    images: ["mykonos", "windmill", "littleVenice"],
  },
  {
    id: "athens",
    name: { el: "Αθήνα", en: "Athens" },
    tagline: { el: "Ένας γάμος με θέα την Ακρόπολη, εκεί που ξεκίνησαν όλα", en: "A wedding facing the Acropolis, where it all began" },
    season: { el: "Όλο τον χρόνο", en: "All year round" },
    from: 9800,
    images: ["acropolis", "toast", "goldTable"],
  },
  {
    id: "riviera",
    name: { el: "Αθηναϊκή Ριβιέρα", en: "Athens Riviera" },
    tagline: { el: "Από τη Βουλιαγμένη ως το Σούνιο, η θάλασσα μισή ώρα από την πόλη", en: "From Vouliagmeni to Sounion, the sea half an hour from the city" },
    season: { el: "Απρίλιος – Νοέμβριος", en: "April – November" },
    from: 11900,
    images: ["sounion", "oceanCeremony", "sunsetKiss"],
  },
  {
    id: "crete",
    name: { el: "Κρήτη", en: "Crete" },
    tagline: { el: "Τιρκουάζ λιμνοθάλασσες, ελαιώνες και αυθεντική κρητική φιλοξενία", en: "Turquoise lagoons, olive groves and true Cretan hospitality" },
    season: { el: "Απρίλιος – Νοέμβριος", en: "April – November" },
    from: 10900,
    images: ["balos", "creteCoast", "longTable"],
  },
  {
    id: "corfu",
    name: { el: "Κέρκυρα", en: "Corfu" },
    tagline: { el: "Βενετσιάνικη κομψότητα, καταπράσινοι λόφοι και κρυστάλλινοι κόλποι", en: "Venetian elegance, green hills and crystal-clear bays" },
    season: { el: "Μάιος – Οκτώβριος", en: "May – October" },
    from: 12400,
    images: ["corfuBay", "corfuTown", "candleTable"],
  },
];

export interface Vendor {
  id: string;
  cat: Cat;
  name: string;
  dests: DestId[] | "all";
  price: number;
  perGuest?: boolean;
  rating: number;
  reviews: number;
  styles: Style[];
  tier: 1 | 2 | 3;
  images: ImgKey[];
  blurb: T2;
  capacity?: number;
}

const ALL = "all" as const;

export const VENDORS: Vendor[] = [
  // ——— Venues (3 per destination)
  { id: "v-oia", cat: "venue", name: "Oia Cliff Villa", dests: ["santorini"], price: 9500, rating: 4.9, reviews: 182, styles: ["romantic", "glam"], tier: 3, capacity: 120, images: ["oia", "caldera", "sparkKiss"], blurb: { el: "Ιδιωτική βίλα στην άκρη της καλντέρας με infinity pool και θέα στο ηλιοβασίλεμα της Οίας.", en: "A private villa on the caldera's edge with an infinity pool and Oia's sunset view." } },
  { id: "v-imero", cat: "venue", name: "Imerovigli Chapel & Terrace", dests: ["santorini"], price: 5200, rating: 4.8, reviews: 96, styles: ["classic", "romantic"], tier: 2, capacity: 80, images: ["domes", "dome2", "whiteTable"], blurb: { el: "Γαλάζιος τρούλος, λευκή αυλή και δείπνο στην ταράτσα κάτω από τα αστέρια.", en: "A blue-domed chapel, a white courtyard and dinner on the terrace under the stars." } },
  { id: "v-pyrgos", cat: "venue", name: "Pyrgos Winery Estate", dests: ["santorini"], price: 3400, rating: 4.7, reviews: 64, styles: ["rustic", "boho"], tier: 1, capacity: 150, images: ["longTable", "candleTable", "goldenField"], blurb: { el: "Αμπελώνας με ηφαιστειακό κρασί, μακριά τραπέζια και ζεστό φως από φανάρια.", en: "A volcanic-wine vineyard with long tables and warm lantern light." } },

  { id: "v-agios", cat: "venue", name: "Agios Ioannis Beach Club", dests: ["mykonos"], price: 8800, rating: 4.9, reviews: 141, styles: ["glam", "boho"], tier: 3, capacity: 220, images: ["mykonos", "sparklers", "dancing"], blurb: { el: "Beach club με DJ booth, πισίνα και πάρτι πάνω στην άμμο μέχρι το πρωί.", en: "A beach club with a DJ booth, pool and a party on the sand until morning." } },
  { id: "v-windmill", cat: "venue", name: "Kato Mili Windmill Terrace", dests: ["mykonos"], price: 5600, rating: 4.8, reviews: 88, styles: ["romantic", "classic"], tier: 2, capacity: 90, images: ["windmill", "whiteTable", "sunsetKiss"], blurb: { el: "Οι ανεμόμυλοι πίσω σας και η Μικρή Βενετία στα πόδια σας.", en: "The windmills behind you and Little Venice at your feet." } },
  { id: "v-ano", cat: "venue", name: "Ano Mera Stone Estate", dests: ["mykonos"], price: 3900, rating: 4.6, reviews: 52, styles: ["rustic", "boho"], tier: 1, capacity: 140, images: ["littleVenice", "longTable", "candleTable"], blurb: { el: "Πέτρινο κτήμα στην ενδοχώρα με ελιές, βουκαμβίλιες και μυκονιάτικη κουζίνα.", en: "A stone estate inland with olive trees, bougainvillea and Mykonian cuisine." } },

  { id: "v-plaka", cat: "venue", name: "Plaka Rooftop with Acropolis View", dests: ["athens"], price: 6200, rating: 4.9, reviews: 203, styles: ["classic", "glam"], tier: 3, capacity: 110, images: ["acropolis", "goldTable", "toast"], blurb: { el: "Ταράτσα στην Πλάκα με τον Παρθενώνα φωτισμένο ακριβώς απέναντι.", en: "A Plaka rooftop with the illuminated Parthenon directly across." } },
  { id: "v-kifisia", cat: "venue", name: "Kifisia Garden Mansion", dests: ["athens"], price: 4300, rating: 4.7, reviews: 77, styles: ["romantic", "classic"], tier: 2, capacity: 200, images: ["setTable", "whiteTable", "coupleBouquet"], blurb: { el: "Νεοκλασική έπαυλη με κήπους, σιντριβάνια και αίθουσα χορού.", en: "A neoclassical mansion with gardens, fountains and a ballroom." } },
  { id: "v-penteli", cat: "venue", name: "Penteli Olive Grove", dests: ["athens"], price: 2600, rating: 4.6, reviews: 58, styles: ["rustic", "boho"], tier: 1, capacity: 250, images: ["longTable", "goldenField", "candleTable"], blurb: { el: "Αιωνόβιος ελαιώνας στους πρόποδες της Πεντέλης, 20 λεπτά από το κέντρο.", en: "A centuries-old olive grove at the foot of Penteli, 20 minutes from the centre." } },

  { id: "v-sounion", cat: "venue", name: "Cape Sounion Sunset Lawn", dests: ["riviera"], price: 7400, rating: 4.9, reviews: 119, styles: ["romantic", "glam"], tier: 3, capacity: 160, images: ["sounion", "oceanCeremony", "sparkKiss"], blurb: { el: "Γκαζόν πάνω από το Αιγαίο με τον Ναό του Ποσειδώνα στο ηλιοβασίλεμα.", en: "A lawn above the Aegean facing the Temple of Poseidon at sunset." } },
  { id: "v-vouli", cat: "venue", name: "Vouliagmeni Bay Pavilion", dests: ["riviera"], price: 4900, rating: 4.8, reviews: 84, styles: ["classic", "glam"], tier: 2, capacity: 180, images: ["oceanCeremony", "whiteTable", "brideSea"], blurb: { el: "Παβιλιόνι πάνω στο νερό με ιδιωτική πλαζ και lounge.", en: "A pavilion over the water with a private beach and lounge." } },
  { id: "v-varkiza", cat: "venue", name: "Varkiza Seaside Taverna", dests: ["riviera"], price: 2900, rating: 4.6, reviews: 61, styles: ["rustic", "boho"], tier: 1, capacity: 130, images: ["toast", "longTable", "rockySunset"], blurb: { el: "Ψαροταβέρνα με τα τραπέζια στην άμμο και γλέντι μέχρι αργά.", en: "A fish taverna with tables on the sand and celebrations late into the night." } },

  { id: "v-elounda", cat: "venue", name: "Elounda Bay Resort", dests: ["crete"], price: 7800, rating: 4.9, reviews: 132, styles: ["glam", "classic"], tier: 3, capacity: 240, images: ["creteCoast", "goldTable", "sparklers"], blurb: { el: "Πεντάστερο resort με ιδιωτική χερσόνησο και θέα στη Σπιναλόγκα.", en: "A five-star resort on a private peninsula overlooking Spinalonga." } },
  { id: "v-chania", cat: "venue", name: "Chania Venetian Harbour House", dests: ["crete"], price: 4600, rating: 4.8, reviews: 73, styles: ["romantic", "classic"], tier: 2, capacity: 100, images: ["harbour", "candleTable", "veil"], blurb: { el: "Αρχοντικό στο ενετικό λιμάνι με τον φάρο να φωτίζει τη βραδιά.", en: "A mansion on the Venetian harbour, the lighthouse glowing all evening." } },
  { id: "v-olive", cat: "venue", name: "Archanes Olive Estate", dests: ["crete"], price: 2700, rating: 4.7, reviews: 49, styles: ["rustic", "boho"], tier: 1, capacity: 300, images: ["longTable", "goldenField", "toast"], blurb: { el: "Οικογενειακό κτήμα με ελαιόλαδο, κρασί και λύρα κάτω από τα δέντρα.", en: "A family estate with olive oil, wine and lyra music under the trees." } },

  { id: "v-achilleion", cat: "venue", name: "Kanoni Palace Gardens", dests: ["corfu"], price: 6900, rating: 4.9, reviews: 97, styles: ["classic", "glam"], tier: 3, capacity: 200, images: ["corfuBay", "goldTable", "archVenue"], blurb: { el: "Ανακτορικοί κήποι με αγάλματα, κυπαρίσσια και θέα στο Ιόνιο.", en: "Palatial gardens with statues, cypresses and Ionian views." } },
  { id: "v-paleo", cat: "venue", name: "Paleokastritsa Cliff Chapel", dests: ["corfu"], price: 4100, rating: 4.8, reviews: 66, styles: ["romantic", "boho"], tier: 2, capacity: 90, images: ["corfuTown", "terrace", "coupleCliff"], blurb: { el: "Ξωκλήσι στον γκρεμό πάνω από τα πιο γαλαζοπράσινα νερά της Κέρκυρας.", en: "A clifftop chapel above Corfu's most turquoise waters." } },
  { id: "v-liston", cat: "venue", name: "Old Town Liston Loggia", dests: ["corfu"], price: 2800, rating: 4.6, reviews: 45, styles: ["classic", "rustic"], tier: 1, capacity: 120, images: ["corfuTown", "candleTable", "toast"], blurb: { el: "Κομψή λότζια στην Παλιά Πόλη, ιδανική για ένα κλασικό, ζεστό τραπέζι.", en: "An elegant loggia in the Old Town, perfect for a classic, warm reception." } },

  // ——— Photographers & videographers
  { id: "p-lumen", cat: "photo", name: "Lumen Atelier", dests: ALL, price: 4800, rating: 5.0, reviews: 211, styles: ["glam", "classic"], tier: 3, images: ["photographer", "sunsetKiss", "veil"], blurb: { el: "Editorial φωτογραφία και cinematic ταινία 4K με drone. Δύο φωτογράφοι, όλη μέρα.", en: "Editorial photography and a cinematic 4K film with drone. Two shooters, full day." } },
  { id: "p-elia", cat: "photo", name: "Elia Film Studio", dests: ALL, price: 3200, rating: 4.9, reviews: 154, styles: ["romantic", "boho"], tier: 2, images: ["coupleCliff", "goldenField", "silhouette"], blurb: { el: "Φυσικό φως, αληθινά συναισθήματα και φιλμ 35mm για όσους αγαπούν το ρετρό.", en: "Natural light, real emotion and 35mm film for lovers of timeless images." } },
  { id: "p-aegean", cat: "photo", name: "Aegean Frames", dests: ["santorini", "mykonos", "crete"], price: 2300, rating: 4.8, reviews: 98, styles: ["romantic", "classic"], tier: 2, images: ["brideSea", "rockySunset", "oia"], blurb: { el: "Ειδικοί στα νησιά: ξέρουν κάθε γωνιά και κάθε ώρα με το καλύτερο φως.", en: "Island specialists who know every corner and every golden hour." } },
  { id: "p-kostas", cat: "photo", name: "Kostas & Maria Photography", dests: ALL, price: 1600, rating: 4.7, reviews: 87, styles: ["classic", "rustic"], tier: 1, images: ["camera", "coupleBouquet", "hands"], blurb: { el: "Ζευγάρι φωτογράφων με 15 χρόνια εμπειρίας σε ελληνικούς γάμους.", en: "A husband-and-wife team with 15 years of Greek weddings." } },

  // ——— Hair & makeup
  { id: "b-sliakas", cat: "beauty", name: "Beauty Bar by Nikos Sliakas", dests: ["athens", "riviera"], price: 1400, rating: 5.0, reviews: 176, styles: ["classic", "glam", "romantic"], tier: 3, images: ["hairPearl", "makeup2", "veil"], blurb: { el: "Νυφικά χτενίσματα και μακιγιάζ από την ομάδα του Beauty Bar στην Αγία Παρασκευή. Δοκιμή περιλαμβάνεται.", en: "Bridal hair and makeup by the Beauty Bar team in Agia Paraskevi. Trial included." } },
  { id: "b-glow", cat: "beauty", name: "Glow Bridal Artists", dests: ALL, price: 1100, rating: 4.9, reviews: 132, styles: ["glam", "romantic"], tier: 3, images: ["makeup", "makeup2", "brideSea"], blurb: { el: "Ομάδα που ταξιδεύει σε όλα τα νησιά, για τη νύφη και όλες τις παράνυμφους.", en: "A travelling team covering every island, for the bride and the whole bridal party." } },
  { id: "b-aura", cat: "beauty", name: "Aura Hair Studio", dests: ALL, price: 750, rating: 4.8, reviews: 91, styles: ["boho", "romantic"], tier: 2, images: ["hairFlower", "hairPearl", "goldenField"], blurb: { el: "Ρομαντικά, ανάλαφρα χτενίσματα με φρέσκα λουλούδια και αξεσουάρ.", en: "Soft, romantic hairstyles with fresh flowers and accessories." } },
  { id: "b-natural", cat: "beauty", name: "Natural Beauty Co.", dests: ALL, price: 450, rating: 4.7, reviews: 64, styles: ["classic", "rustic", "boho"], tier: 1, images: ["makeup", "hairFlower", "coupleBouquet"], blurb: { el: "Φρέσκο, φυσικό look που αντέχει στον ήλιο και στον χορό.", en: "A fresh, natural look that lasts through sun and dancing." } },

  // ——— Music
  { id: "m-orchestra", cat: "music", name: "Aegean String Quartet & Band", dests: ALL, price: 4200, rating: 4.9, reviews: 108, styles: ["classic", "glam"], tier: 3, images: ["guitar", "dancing", "sparklers"], blurb: { el: "Κουαρτέτο εγχόρδων για την τελετή, πλήρης μπάντα και DJ για το πάρτι.", en: "A string quartet for the ceremony, then a full band and DJ for the party." } },
  { id: "m-eleni", cat: "music", name: "Eleni Voice — Live Singer", dests: ALL, price: 1900, rating: 4.9, reviews: 85, styles: ["romantic", "classic"], tier: 2, images: ["mic", "candleTable", "sunsetKiss"], blurb: { el: "Ζωντανή φωνή για την είσοδο της νύφης και τον πρώτο χορό, σε ελληνικά, αγγλικά και ιταλικά.", en: "A live voice for the bridal entrance and first dance, in Greek, English and Italian." } },
  { id: "m-dj", cat: "music", name: "DJ Nikolas Sunset Sessions", dests: ALL, price: 1300, rating: 4.8, reviews: 140, styles: ["glam", "boho"], tier: 2, images: ["partyDance", "sparklers", "dancing"], blurb: { el: "Deep house στο ηλιοβασίλεμα και hits μέχρι το πρωί, με φωτισμό και ηχητικά.", en: "Deep house at sunset and hits until morning, lights and sound included." } },
  { id: "m-glendi", cat: "music", name: "Glendi Traditional Ensemble", dests: ALL, price: 1100, rating: 4.8, reviews: 72, styles: ["rustic", "classic"], tier: 1, images: ["toast", "dancing", "longTable"], blurb: { el: "Μπουζούκι, βιολί και λύρα για ένα αληθινό ελληνικό γλέντι.", en: "Bouzouki, violin and lyra for an authentic Greek glendi." } },

  // ——— Catering (per guest)
  { id: "c-michelin", cat: "catering", name: "Chef Andreas — Fine Dining", dests: ALL, price: 145, perGuest: true, rating: 5.0, reviews: 93, styles: ["glam", "classic"], tier: 3, images: ["fineDining", "goldTable", "whiteTable"], blurb: { el: "Μενού γευσιγνωσίας 7 πιάτων από βραβευμένο σεφ, με οινική αντιστοίχιση.", en: "A seven-course tasting menu by an award-winning chef, with wine pairing." } },
  { id: "c-meze", cat: "catering", name: "Meraki Mediterranean Feast", dests: ALL, price: 95, perGuest: true, rating: 4.9, reviews: 127, styles: ["romantic", "boho"], tier: 2, images: ["longTable", "buffet", "toast"], blurb: { el: "Μεζέδες για μοίρασμα, φρέσκο ψάρι και σταθμοί με σουβλάκι και γλυκά.", en: "Sharing mezze, fresh fish and live stations for souvlaki and desserts." } },
  { id: "c-island", cat: "catering", name: "Island Table Catering", dests: ["santorini", "mykonos", "crete", "corfu"], price: 80, perGuest: true, rating: 4.8, reviews: 81, styles: ["rustic", "boho"], tier: 2, images: ["buffet", "candleTable", "longTable"], blurb: { el: "Τοπικά προϊόντα από κάθε νησί, μαγειρεμένα με αγάπη και εποχικότητα.", en: "Local produce from each island, cooked with love and seasonality." } },
  { id: "c-classic", cat: "catering", name: "Classic Greek Banquet", dests: ALL, price: 60, perGuest: true, rating: 4.7, reviews: 110, styles: ["classic", "rustic"], tier: 1, images: ["buffet", "setTable", "toast"], blurb: { el: "Το αγαπημένο ελληνικό τραπέζι γάμου, πλούσιο και γενναιόδωρο.", en: "The beloved Greek wedding feast, rich and generous." } },

  // ——— Florals & décor
  { id: "f-blanc", cat: "florals", name: "Maison Blanc Florals", dests: ALL, price: 5200, rating: 5.0, reviews: 88, styles: ["glam", "classic"], tier: 3, images: ["whiteTable", "goldTable", "archVenue"], blurb: { el: "Εντυπωσιακές λευκές συνθέσεις, αψίδα τελετής και τραπέζια με κεριά.", en: "Statement white arrangements, a ceremony arch and candlelit tables." } },
  { id: "f-wild", cat: "florals", name: "Wild Olive Botanica", dests: ALL, price: 2900, rating: 4.9, reviews: 76, styles: ["boho", "rustic", "romantic"], tier: 2, images: ["roses", "softFlowers", "candleTable"], blurb: { el: "Αγριολούλουδα, κλαδιά ελιάς και ξερά χόρτα σε φυσικές, ελεύθερες συνθέσεις.", en: "Wildflowers, olive branches and dried grasses in loose, natural designs." } },
  { id: "f-petal", cat: "florals", name: "Petal & Linen", dests: ALL, price: 1500, rating: 4.7, reviews: 59, styles: ["classic", "romantic"], tier: 1, images: ["bouquetWhite", "setTable", "ringsRoses"], blurb: { el: "Νυφική ανθοδέσμη, μπουτονιέρες και κομψά κεντρικά τραπεζιών.", en: "Bridal bouquet, boutonnières and elegant centrepieces." } },
];

export interface Extra { id: string; name: T2; price: number; image: ImgKey }
export const EXTRAS: Extra[] = [
  { id: "x-yacht", name: { el: "Άφιξη με ιδιωτικό σκάφος", en: "Private yacht arrival" }, price: 2400, image: "yacht" },
  { id: "x-fire", name: { el: "Πυροτεχνήματα & sparklers", en: "Fireworks & sparklers" }, price: 1800, image: "sparklers" },
  { id: "x-drone", name: { el: "Drone video & teaser ταινία", en: "Drone footage & teaser film" }, price: 900, image: "camera" },
  { id: "x-transport", name: { el: "Μεταφορά καλεσμένων", en: "Guest transport" }, price: 1500, image: "harbour" },
  { id: "x-welcome", name: { el: "Welcome party την προηγούμενη μέρα", en: "Welcome party the night before" }, price: 3200, image: "toast" },
  { id: "x-brunch", name: { el: "Brunch την επόμενη μέρα", en: "Next-day farewell brunch" }, price: 2100, image: "longTable" },
];

export const CATS: { id: Cat; label: T2; short: T2 }[] = [
  { id: "venue", label: { el: "Χώρος", en: "Venue" }, short: { el: "Χώρος", en: "Venue" } },
  { id: "photo", label: { el: "Φωτογραφία & Video", en: "Photo & Video" }, short: { el: "Φωτογράφος", en: "Photo" } },
  { id: "beauty", label: { el: "Μαλλιά & Μακιγιάζ", en: "Hair & Makeup" }, short: { el: "Ομορφιά", en: "Beauty" } },
  { id: "music", label: { el: "Μουσική", en: "Music" }, short: { el: "Μουσική", en: "Music" } },
  { id: "catering", label: { el: "Catering", en: "Catering" }, short: { el: "Catering", en: "Catering" } },
  { id: "florals", label: { el: "Λουλούδια & Διακόσμηση", en: "Florals & Décor" }, short: { el: "Λουλούδια", en: "Florals" } },
  { id: "extras", label: { el: "Extras", en: "Extras" }, short: { el: "Extras", en: "Extras" } },
];

export const STYLES: { id: Style; label: T2 }[] = [
  { id: "romantic", label: { el: "Ρομαντικό", en: "Romantic" } },
  { id: "boho", label: { el: "Boho", en: "Boho" } },
  { id: "classic", label: { el: "Κλασικό", en: "Classic" } },
  { id: "glam", label: { el: "Glam", en: "Glam" } },
  { id: "rustic", label: { el: "Rustic", en: "Rustic" } },
];

export interface Pkg {
  id: "essential" | "signature" | "royal";
  tier: 1 | 2 | 3;
  name: T2;
  sub: T2;
  guests: T2;
  from: number;
  image: ImgKey;
  includes: T2[];
}

export const PACKAGES: Pkg[] = [
  {
    id: "essential", tier: 1, from: 9800, image: "coupleBouquet",
    name: { el: "Essential", en: "Essential" },
    sub: { el: "Όλα τα απαραίτητα, άψογα οργανωμένα", en: "Everything you need, flawlessly organised" },
    guests: { el: "έως 60 καλεσμένοι", en: "up to 60 guests" },
    includes: [
      { el: "Χώρος τελετής & δεξίωσης", en: "Ceremony & reception venue" },
      { el: "Φωτογράφος για 6 ώρες", en: "Photographer for 6 hours" },
      { el: "Νυφικό μακιγιάζ & χτένισμα", en: "Bridal hair & makeup" },
      { el: "Ελληνικό τραπέζι γάμου", en: "Greek wedding banquet" },
      { el: "Ανθοδέσμη & βασική διακόσμηση", en: "Bouquet & essential décor" },
      { el: "Συντονιστής την ημέρα του γάμου", en: "Day-of coordinator" },
    ],
  },
  {
    id: "signature", tier: 2, from: 24500, image: "sunsetKiss",
    name: { el: "Signature", en: "Signature" },
    sub: { el: "Η πιο αγαπημένη επιλογή των ζευγαριών μας", en: "Our couples' favourite" },
    guests: { el: "έως 120 καλεσμένοι", en: "up to 120 guests" },
    includes: [
      { el: "Χώρος με θέα θάλασσα ή ηλιοβασίλεμα", en: "Sea or sunset-view venue" },
      { el: "Φωτογραφία & cinematic video", en: "Photography & cinematic video" },
      { el: "Μαλλιά & μακιγιάζ για νύφη + 2", en: "Hair & makeup for bride + 2" },
      { el: "Μεσογειακό μενού με μεζέδες", en: "Mediterranean sharing menu" },
      { el: "Ζωντανή φωνή & DJ", en: "Live singer & DJ" },
      { el: "Πλήρης διακόσμηση με λουλούδια", en: "Full floral design" },
      { el: "Προσωπικός wedding planner", en: "Dedicated wedding planner" },
    ],
  },
  {
    id: "royal", tier: 3, from: 58000, image: "sparkKiss",
    name: { el: "Royal", en: "Royal" },
    sub: { el: "Ένας γάμος που θα συζητιέται για χρόνια", en: "A wedding they'll talk about for years" },
    guests: { el: "έως 250 καλεσμένοι", en: "up to 250 guests" },
    includes: [
      { el: "Αποκλειστική βίλα ή resort", en: "Exclusive villa or resort" },
      { el: "Δύο φωτογράφοι, ταινία 4K & drone", en: "Two photographers, 4K film & drone" },
      { el: "Beauty team για όλη την ομάδα", en: "Beauty team for the whole party" },
      { el: "Fine dining από βραβευμένο σεφ", en: "Fine dining by an award-winning chef" },
      { el: "Κουαρτέτο εγχόρδων & πλήρης μπάντα", en: "String quartet & full band" },
      { el: "Άφιξη με σκάφος & πυροτεχνήματα", en: "Yacht arrival & fireworks" },
      { el: "Welcome party & brunch επόμενης μέρας", en: "Welcome party & farewell brunch" },
      { el: "Concierge για τους καλεσμένους σας", en: "Concierge for your guests" },
    ],
  },
];

export const TESTIMONIALS = [
  { names: "Sophie & James", from: { el: "Λονδίνο → Σαντορίνη", en: "London → Santorini" }, image: "sunsetKiss" as ImgKey, quote: { el: "Οργανώσαμε τα πάντα από το Λονδίνο σε λίγες εβδομάδες. Όταν φτάσαμε, όλα ήταν ακριβώς όπως τα ονειρευτήκαμε, μόνο πιο όμορφα.", en: "We planned everything from London in a few weeks. When we arrived, it was exactly as we'd dreamed, only more beautiful." } },
  { names: "Μαρία & Γιώργος", from: { el: "Αθήνα → Σούνιο", en: "Athens → Sounion" }, image: "oceanCeremony" as ImgKey, quote: { el: "Το ηλιοβασίλεμα πίσω από τον ναό, η μουσική, το φαγητό… Οι καλεσμένοι μας ακόμα μιλάνε γι' αυτό.", en: "The sunset behind the temple, the music, the food… our guests are still talking about it." } },
  { names: "Emily & Ryan", from: { el: "Νέα Υόρκη → Μύκονος", en: "New York → Mykonos" }, image: "sparklers" as ImgKey, quote: { el: "Ο builder μάς έδειξε από την αρχή πόσο θα κοστίσει. Καμία έκπληξη, μόνο ένα απίστευτο πάρτι.", en: "The builder showed us the cost from day one. No surprises, just an incredible party." } },
  { names: "Chloe & Liam", from: { el: "Σίδνεϊ → Κρήτη", en: "Sydney → Crete" }, image: "longTable" as ImgKey, quote: { el: "Ένα μακρύ τραπέζι κάτω από τις ελιές, λύρα και 90 άνθρωποι που αγαπάμε. Τέλειο.", en: "One long table under the olive trees, lyra music and 90 people we love. Perfect." } },
];

export const GALLERY: { image: ImgKey; cat: "ceremony" | "reception" | "details" | "couples"; tall?: boolean }[] = [
  { image: "archVenue", cat: "ceremony", tall: true },
  { image: "sunsetKiss", cat: "couples" },
  { image: "goldTable", cat: "reception" },
  { image: "ringsRoses", cat: "details" },
  { image: "brideSea", cat: "couples", tall: true },
  { image: "oceanCeremony", cat: "ceremony" },
  { image: "sparkKiss", cat: "reception", tall: true },
  { image: "hairPearl", cat: "details" },
  { image: "longTable", cat: "reception" },
  { image: "silhouette", cat: "couples" },
  { image: "bouquetWhite", cat: "details", tall: true },
  { image: "hands", cat: "ceremony" },
  { image: "veil", cat: "details" },
  { image: "coupleCliff", cat: "couples", tall: true },
  { image: "whiteTable", cat: "reception" },
  { image: "rings", cat: "details" },
];
