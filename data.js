const PRODUCTS = [
  {
    id: 1, rank: 1,
    name: "Lash Lift & Tint Kit",
    category: "Beauty", subcategory: "Eye Care / Lash",
    filter: "beauty",
    description: "Professional-grade at-home lash lift + tint kit. Lifts, curls, and darkens lashes — eliminating mascara for 6–8 weeks.",
    customer: "Women who frequent lash salons",
    gender: "Female", age: "19–40",
    countries: ["USA", "UK", "Australia", "Canada"],
    sellPrice: 39.99, supplierCost: 7.50, margin: 78,
    shipping: "$3–$5", weight: "120g", delivery: "7–14 days",
    storeType: "Niche Beauty Brand", single: true, branded: true,
    subscription: true, bundle: true,
    upsell: ["Lash Serum", "Brow Lamination Kit", "Lash Growth Oil"],
    scores: {
      overall: 88, trend: 88, demand: 91, virality: 95,
      competition: 38, profit: 86, branding: 88,
      repeat: 94, problemSolving: 87, impulse: 89,
      shipping: 92, evergreen: 91, gift: 75
    },
    whyBuy: "Salon lash lifts cost $60–$120 every 6–8 weeks. Women discover the same result at home for $40 once. The 'dupe economy' and 'salon savings' trend makes this a goldmine on TikTok.",
    emotionalTriggers: ["Financial savings", "Beauty confidence", "DIY empowerment", "Salon envy"],
    painPoints: ["Expensive salon visits", "Cancellation fees", "Scheduling hassle"],
    customer_avatar: {
      name: "Budget-Beauty Brianna", age: "26", occupation: "Nurse / Teacher",
      income: "$42,000–$65,000", lifestyle: "TikTok beauty addict, loves dupes",
      goals: "Salon results without leaving home",
      frustrations: "Spending $120/month on lash appointments",
      platforms: ["TikTok", "Instagram", "Pinterest"]
    },
    competition: { level: "Medium", saturation: "45%", sellers: "1,500 Amazon + ~300 Shopify", gap: "Premium branding + app QR guide" },
    hooks: [
      "I haven't worn mascara in 6 weeks and this is why...",
      "POV: You do your lash lift at home for $40 instead of paying $110 at the salon",
      "Salon: $110. This kit: $39. Same result? Watch 👀",
      "Day 1 vs. Day 7 lash transformation (no extensions, no mascara)"
    ],
    fbAd: { primary: "Tired of paying $110 every 6 weeks for a lash lift? Get salon-quality results at home — in under an hour. Our professional-grade kit lasts up to 8 weeks. Try it risk-free.", headline: "Skip the Salon. Keep the Lashes.", cta: "Shop Now" },
    tiktokAd: { hook: "I haven't worn mascara in 6 weeks and this is why...", script: "I used to spend $120 every month at the lash salon. My bank account was suffering. Then a friend showed me this at-home lash lift kit. I was skeptical. But I tried it — and literally no one can tell the difference. My lashes have been lifted and tinted for 6 weeks now. Zero mascara. Here's the kit — link in bio.", hashtags: "#lashlift #beautyhack #savingmoney #lashliftathome #beautytips" },
    pricing: { cost: 7.50, sell: 39.99, premium: 54.99, bundle: 64.99, anchor: "~~$69.99~~ Now $39.99" },
    finance: { grossMargin: "78%", netMargin: "32%", breakevenROAS: "1.9×", targetCPA: "$10–$15", expectedAOV: "$52" },
    scaling: { brand: true, multiSKU: true, subscription: "Refill kits $24.99/2mo", international: true },
    risks: [{ risk: "Chemical safety claims", level: "medium" }, { risk: "Return rate (technique learning curve)", level: "medium" }, { risk: "Allergic reactions liability", level: "medium" }],
    verdict: "YES", verdictReason: "Massive repeat purchase built in via refill kits. TikTok virality near-guaranteed with before/after content. Build a beauty brand, not just a product listing. Launch with a refill subscription model.",
    confidence: 91
  },
  {
    id: 2, rank: 2,
    name: "Magnetic Posture Corrector",
    category: "Health", subcategory: "Posture & Back Support",
    filter: "health",
    description: "Slim, under-shirt magnetic brace that passively realigns the spine, reduces back pain, and trains posture without conscious effort.",
    customer: "Remote workers & office professionals",
    gender: "Unisex (60F/40M)", age: "24–45",
    countries: ["USA", "UK", "Canada", "Australia"],
    sellPrice: 44.99, supplierCost: 10, margin: 72,
    shipping: "$3–$5", weight: "120g", delivery: "7–14 days",
    storeType: "Niche Branded / Single Product Store", single: true, branded: true,
    subscription: true, bundle: true,
    upsell: ["Lumbar Cushion", "Ergonomic Mouse Pad", "Posture App Premium"],
    scores: {
      overall: 84, trend: 82, demand: 88, virality: 79,
      competition: 41, profit: 85, branding: 91,
      repeat: 72, problemSolving: 93, impulse: 76,
      shipping: 95, evergreen: 88, gift: 68
    },
    whyBuy: "Remote work created a global posture crisis. Over 80% of desk workers report chronic neck/back pain. This product offers a passive, effortless solution — no exercises required.",
    emotionalTriggers: ["Health anxiety", "Instant relief", "Professional confidence", "Frustration with expensive physio"],
    painPoints: ["Chronic back/neck pain from 8+ hrs desk work", "Bad posture causing headaches", "Physio costs $200+/session"],
    customer_avatar: {
      name: "Remote Rachel", age: "29–38", occupation: "Marketing Manager / Software Dev",
      income: "$45,000–$90,000", lifestyle: "WFH, sedentary 6–10hrs daily, health-conscious",
      goals: "Feel less tired, look confident on video calls",
      frustrations: "Spent $200+ on physio with no lasting results",
      platforms: ["TikTok", "Pinterest", "Reddit r/workfromhome", "YouTube"]
    },
    competition: { level: "Medium", saturation: "45%", sellers: "800–2000 Amazon + ~400 Shopify", gap: "Smart-app integration at sub-$50 price point" },
    hooks: [
      "My back pain disappeared after 7 days of this...",
      "POV: Your coworkers ask why you look so confident suddenly",
      "The $40 gadget my physio hates",
      "8 hours at a desk shouldn't destroy your spine — here's the fix"
    ],
    fbAd: { primary: "8 hours at a desk shouldn't mean a lifetime of back pain. This magnetic posture corrector gently trains your spine — without thinking about it. Thousands of remote workers are wearing it daily. Try it risk-free for 30 days.", headline: "Stop Slouching — Start Healing.", cta: "Shop Now" },
    tiktokAd: { hook: "My back pain disappeared after 7 days of this...", script: "I used to wake up with back pain every single morning from sitting at my desk. I tried stretching, yoga, even physiotherapy — nothing stuck. Then I found this magnetic posture corrector. You wear it under your shirt. You forget it's there. Within a week, my posture was different. My neck tension? Gone. Link in bio — they have a 30-day trial.", hashtags: "#posturecheck #backpain #workfromhome #healthhack #posturecorrector" },
    pricing: { cost: 10, sell: 44.99, premium: 59.99, bundle: 79.99, anchor: "~~$69.99~~ Now $44.99" },
    finance: { grossMargin: "72%", netMargin: "28–35%", breakevenROAS: "2.1×", targetCPA: "$12–$18", expectedAOV: "$52" },
    scaling: { brand: true, multiSKU: true, subscription: "Replacement pads $9.99/mo", international: true },
    risks: [{ risk: "Medical claims compliance", level: "high" }, { risk: "Sizing issues / returns", level: "medium" }, { risk: "Upright brand patents", level: "medium" }],
    verdict: "YES", verdictReason: "Strong margin, massive addressable market (300M+ desk workers globally), evergreen demand, easy to brand, shippable in a poly mailer. Key differentiator: premium branding + app integration sub-$50.",
    confidence: 87
  },
  {
    id: 3, rank: 3,
    name: "Car Interior LED Ambient Kit",
    category: "Automotive", subcategory: "Car Accessories",
    filter: "auto",
    description: "RGB LED light strips with app control that sync to music, creating a showroom-quality interior glow for any car.",
    customer: "Young car enthusiasts", gender: "Male (70%)", age: "16–30",
    countries: ["USA", "Canada", "UK", "Germany"],
    sellPrice: 39.99, supplierCost: 9, margin: 74,
    shipping: "$3–$5", weight: "150g", delivery: "8–15 days",
    storeType: "Automotive Niche / General Store", single: false, branded: true,
    subscription: false, bundle: true,
    upsell: ["Car Diffuser", "LED Underglow Kit", "Dashboard Camera"],
    scores: {
      overall: 82, trend: 86, demand: 82, virality: 94,
      competition: 44, profit: 80, branding: 75,
      repeat: 55, problemSolving: 65, impulse: 92,
      shipping: 90, evergreen: 78, gift: 82
    },
    whyBuy: "Car glow-up content averages 2M+ views on TikTok. Young drivers want to personalize their cars affordably. Strong gift product and impulse buy — zero friction purchase.",
    emotionalTriggers: ["Status & identity", "Personalization", "Novelty", "Social media showing off"],
    painPoints: ["Boring stock car interior", "Expensive dealership accessories"],
    customer_avatar: {
      name: "Car-Proud Carlos", age: "19–28", occupation: "Student / Entry-level job",
      income: "$25,000–$50,000", lifestyle: "Car meet enthusiast, active on TikTok and Instagram",
      goals: "Cool-looking car without expensive mods",
      frustrations: "Can't afford dealership upgrades",
      platforms: ["TikTok", "Instagram", "YouTube car channels"]
    },
    competition: { level: "Medium", saturation: "50%", sellers: "2,000+ Amazon, ~500 Shopify", gap: "Premium packaging + installation video guide brand" },
    hooks: [
      "POV: You spent $40 and your car looks like a showroom",
      "Car transformation in 10 minutes 🔥",
      "My Uber passengers always ask what I installed...",
      "Watch this boring car turn into a vibe in 60 seconds"
    ],
    fbAd: { primary: "Give your car the upgrade it deserves — without the dealership price tag. Sync to music, control 16M colors from your phone. Install in 10 minutes. Loved by over 50,000 drivers.", headline: "Your Car Deserves This Glow-Up.", cta: "Get Yours" },
    tiktokAd: { hook: "Watch this boring car turn into a vibe in 60 seconds 🔥", script: "Okay so I just installed this LED kit in my car and I am OBSESSED. It syncs to whatever music I'm playing, I can control it from my phone, and it took literally 10 minutes to set up. Under $40. Link in bio.", hashtags: "#carled #caraccessories #cartok #carvibes #ledlights" },
    pricing: { cost: 9, sell: 39.99, premium: 49.99, bundle: 69.99, anchor: "~~$59.99~~ Now $39.99" },
    finance: { grossMargin: "74%", netMargin: "30%", breakevenROAS: "2.0×", targetCPA: "$10–$14", expectedAOV: "$45" },
    scaling: { brand: true, multiSKU: true, subscription: false, international: true },
    risks: [{ risk: "Electrical compatibility issues", level: "medium" }, { risk: "High return rate if install fails", level: "medium" }],
    verdict: "YES", verdictReason: "Near-guaranteed TikTok virality with car content. Strong impulse buy. Great gift item. Focus on premium packaging and a YouTube install guide to minimize returns.",
    confidence: 83
  },
  {
    id: 4, rank: 4,
    name: "Smart Pet Water Fountain",
    category: "Pets", subcategory: "Pet Health & Hydration",
    filter: "pet",
    description: "Auto-filtration smart pet fountain with silent pump, LED indicator, and replacement filter subscription — keeps pets hydrated with fresh, flowing water 24/7.",
    customer: "Cat & dog owners", gender: "Unisex (65% Female)", age: "22–45",
    countries: ["USA", "UK", "Canada", "Germany"],
    sellPrice: 49.99, supplierCost: 16, margin: 65,
    shipping: "$5–$8", weight: "400g", delivery: "8–15 days",
    storeType: "Pet Brand / Niche Store", single: false, branded: true,
    subscription: true, bundle: true,
    upsell: ["Replacement Filters (3-pack)", "Pet Food Mat", "Automatic Feeder"],
    scores: {
      overall: 78, trend: 79, demand: 85, virality: 82,
      competition: 52, profit: 74, branding: 83,
      repeat: 88, problemSolving: 86, impulse: 72,
      shipping: 78, evergreen: 90, gift: 85
    },
    whyBuy: "The pet industry is recession-proof. 'Pet humanization' drives premium product adoption. Replacement filters create automatic LTV machine. Pairs perfectly with TikTok pet content.",
    emotionalTriggers: ["Pet parent guilt", "Health concern for pet", "Convenience", "Love for animals"],
    painPoints: ["Stagnant water bowls breed bacteria", "Cats especially refuse stale water", "Forgetting to change water"],
    customer_avatar: {
      name: "Cat-Mom Cynthia", age: "28–42", occupation: "Professional / Remote worker",
      income: "$50,000–$85,000", lifestyle: "Treats pets like family, follows pet influencers",
      goals: "Keep pets healthy and happy effortlessly",
      frustrations: "Vet bills, pet anxiety about hydration",
      platforms: ["TikTok", "Instagram", "Facebook Pet Groups"]
    },
    competition: { level: "Medium-High", saturation: "55%", sellers: "3,000+ Amazon", gap: "Stylish design + seamless subscription model" },
    hooks: [
      "My cat refused to drink water for 3 years until I got this...",
      "Vet told me my cat was dehydrated — here's what fixed it",
      "POV: Your cat discovers flowing water for the first time 😻",
      "This is why your cat hates their water bowl"
    ],
    fbAd: { primary: "Cats naturally prefer flowing water — it's instinct. Stagnant bowls lead to dehydration and vet visits. Our smart fountain filters water continuously, keeping your pet healthy. 30-day money-back guarantee.", headline: "Your Cat Deserves Fresh Water — Always.", cta: "Shop Now" },
    tiktokAd: { hook: "My cat refused to drink water for 3 years until I got this 😭", script: "My vet told me my cat was chronically dehydrated and I had no idea. She just wouldn't drink from her bowl. I bought this smart fountain and she literally ran to it immediately. She drinks from it every hour now. The filter lasts 30 days. Link in bio.", hashtags: "#cattok #petcare #catwater #petfountain #catsoftiktok" },
    pricing: { cost: 16, sell: 49.99, premium: 64.99, bundle: 89.99, anchor: "~~$79.99~~ Now $49.99" },
    finance: { grossMargin: "65%", netMargin: "25%", breakevenROAS: "2.3×", targetCPA: "$14–$20", expectedAOV: "$65 with filter pack" },
    scaling: { brand: true, multiSKU: true, subscription: "Filters $12.99/mo", international: true },
    risks: [{ risk: "Pump failure complaints", level: "medium" }, { risk: "Higher return complexity (bulkier)", level: "medium" }],
    verdict: "YES", verdictReason: "Build as a full pet wellness brand with filter subscription. LTV potential is exceptional. Pet content goes viral organically — UGC is basically free.",
    confidence: 80
  },
  {
    id: 5, rank: 5,
    name: "Portable USB-C Espresso Maker",
    category: "Food & Beverage", subcategory: "Coffee / Kitchen",
    filter: "food",
    description: "Pocket-sized, USB-C charged espresso machine that makes real 9-bar espresso anywhere — camping, office, travel, or car.",
    customer: "Coffee enthusiasts, travelers, digital nomads", gender: "Unisex", age: "25–45",
    countries: ["USA", "UK", "Canada", "Australia"],
    sellPrice: 69.99, supplierCost: 21, margin: 65,
    shipping: "$6–$10", weight: "350g", delivery: "7–14 days",
    storeType: "Coffee Brand / Travel Niche", single: false, branded: true,
    subscription: false, bundle: true,
    upsell: ["Coffee Pod Sampler Pack", "Insulated Cup", "Carry Case"],
    scores: {
      overall: 79, trend: 83, demand: 86, virality: 78,
      competition: 47, profit: 77, branding: 84,
      repeat: 60, problemSolving: 82, impulse: 74,
      shipping: 75, evergreen: 85, gift: 91
    },
    whyBuy: "Coffee culture is massive and growing. Travelers hate bad hotel coffee. Campers and van-lifers are a booming demographic. This is the perfect premium gift for coffee snobs.",
    emotionalTriggers: ["Snobbery / status", "Quality obsession", "Adventure lifestyle", "Gift appeal"],
    painPoints: ["Terrible hotel/office coffee", "Expensive café habit while traveling", "No espresso while camping"],
    customer_avatar: {
      name: "Nomad Nathan", age: "28–40", occupation: "Freelancer / Remote consultant",
      income: "$60,000–$110,000", lifestyle: "Travels frequently, coffee-obsessed, gear collector",
      goals: "Perfect espresso everywhere without compromise",
      frustrations: "Paying $7 for mediocre airport espresso",
      platforms: ["Instagram", "YouTube", "Reddit r/espresso", "TikTok"]
    },
    competition: { level: "Medium", saturation: "40%", sellers: "~1,200 Amazon + ~200 Shopify", gap: "Lifestyle branding + coffee community targeting" },
    hooks: [
      "I make better espresso in my tent than Starbucks does in their store",
      "POV: Your camping trip now includes real espresso",
      "Coffee snob discovers this and their life changes forever",
      "The only travel gadget I never leave home without"
    ],
    fbAd: { primary: "Stop settling for terrible hotel coffee. This USB-C espresso maker brews real 9-bar espresso in under 3 minutes — anywhere on earth. Used by 40,000+ travelers. The perfect gift for coffee lovers.", headline: "Real Espresso. Anywhere. Always.", cta: "Shop Now" },
    tiktokAd: { hook: "I make better espresso in my tent than Starbucks does in their store ☕", script: "I've been camping for 3 weeks and haven't touched Starbucks once. This tiny USB-C espresso maker charges from a power bank and makes genuinely great espresso. 9 bars of pressure. Takes 3 minutes. I will never travel without this. Link in bio.", hashtags: "#espresso #coffeelovers #camping #travelhacks #coffeetok" },
    pricing: { cost: 21, sell: 69.99, premium: 89.99, bundle: 109.99, anchor: "~~$99.99~~ Now $69.99" },
    finance: { grossMargin: "65%", netMargin: "27%", breakevenROAS: "2.2×", targetCPA: "$18–$24", expectedAOV: "$85 with bundle" },
    scaling: { brand: true, multiSKU: true, subscription: "Monthly coffee pods", international: true },
    risks: [{ risk: "Quality control / pressure consistency", level: "medium" }, { risk: "Heavier shipping = higher cost", level: "low" }],
    verdict: "YES", verdictReason: "Strong gift play for Q4. High AOV with bundle. Excellent brand building potential. Target Q4 holiday season aggressively — it's the perfect gifting product.",
    confidence: 77
  }
];

const GEMS = [
  {
    name: "Mushroom Coffee Blend Sachets",
    emoji: "🍄",
    why: "Functional beverages are exploding but most Shopify stores haven't caught on. Chaga + Lion's Mane + Reishi blends positioned as 'the coffee upgrade' for biohackers and wellness-conscious consumers.",
    stats: { competition: "🟢 Low", margin: "75–85%", trend: "📈 Explosive", channel: "TikTok + Pinterest" },
    hook: "I replaced my morning coffee with this and my brain fog disappeared",
    confidence: 88
  },
  {
    name: "Electric Scalp Massage Brush",
    emoji: "💆",
    why: "Hair loss anxiety drives massive spending across all demographics. Electric scalp stimulators are hitting TikTok but haven't reached saturation. Extremely brandable into a full hair wellness line.",
    stats: { competition: "🟢 Low", margin: "74%", trend: "📈 Fast Growing", channel: "TikTok + Instagram" },
    hook: "My hair grew back after 3 months of this 10-minute daily routine",
    confidence: 86
  },
  {
    name: "Silicone Baby Feeding Mat",
    emoji: "👶",
    why: "New parents are a high-spend, low-price-sensitivity segment driven by safety concerns. Suction base prevents plate-throwing. Cute baby content is inherently viral and earns millions of organic views.",
    stats: { competition: "🟢 Low-Medium", margin: "72%", trend: "📈 Steady", channel: "TikTok + Pinterest + Facebook" },
    hook: "This mat literally saved my sanity at dinner time 😭",
    confidence: 82
  },
  {
    name: "Reusable Beeswax Food Wraps",
    emoji: "🌿",
    why: "Eco segment is massively growing but most sellers have terrible branding. Premium 'plastic-free kitchen' positioning with beautiful packaging achieves $45+ AOV easily.",
    stats: { competition: "🟢 Low", margin: "77%", trend: "🌿 Eco Evergreen", channel: "Pinterest + Instagram" },
    hook: "I haven't used plastic wrap in 8 months — here's how",
    confidence: 79
  },
  {
    name: "UV-C Phone Sanitizer Box",
    emoji: "🔬",
    why: "Post-pandemic hygiene awareness persists. Most sellers are generic. A premium sleek design with 'kills 99.9% of germs in 60 seconds' messaging at a $29.99 price point is compelling and viral.",
    stats: { competition: "🟢 Low-Medium", margin: "68%", trend: "📈 Growing", channel: "Facebook + Amazon" },
    hook: "Your phone has more bacteria than a toilet seat — here's the fix",
    confidence: 74
  }
];

const TRENDS = [
  {
    time: "30 Days",
    items: [
      { emoji: "💍", product: "Smart Sleep Tracking Rings", reason: "Sleep anxiety culture is at an all-time high. Oura Ring proved the market — now affordable alternatives are entering. $89–$149 price range with massive biohacker audience." },
      { emoji: "🧃", product: "Personalized Daily Vitamin Packs", reason: "The 'your daily pack' concept pioneered by Care/of is going mainstream. Print-on-demand personalization + subscription model = recurring revenue dream." }
    ]
  },
  {
    time: "60 Days",
    items: [
      { emoji: "💧", product: "Smart Hydration Tracking Bottles", reason: "Gen Z + fitness crossover. LED glow reminders and phone sync are making basic water bottles feel outdated. TikTok water-drinking challenges have 4B+ views." },
      { emoji: "🌱", product: "Self-Watering Desktop Plant Pots", reason: "WFH aesthetic is peaking. Office desk plants are trending heavily on Pinterest and Instagram. Self-watering = solves the #1 objection (forgetting to water)." }
    ]
  },
  {
    time: "90 Days",
    items: [
      { emoji: "🧊", product: "At-Home Cold Plunge Kits", reason: "Andrew Huberman + biohacker culture has mainstreamed cold exposure. Portable inflatable cold plunge tubs are entering the market at $299–$499 — huge margin opportunity." },
      { emoji: "🛏", product: "Temperature-Regulating Weighted Blankets", reason: "Weighted blankets are evergreen. The 2.0 version — cooling technology + weight — solves the #1 complaint (overheating). Winter prep buying begins in September." }
    ]
  },
  {
    time: "6 Months",
    items: [
      { emoji: "🪞", product: "AI Smart Fitness Mirrors", reason: "Home fitness investment continues. Smart mirror with AI coaching is moving from luxury ($1,500) to accessible ($300–$400). Massive brand-building opportunity." },
      { emoji: "👜", product: "Sustainable Fashion Accessories", reason: "Gen Z sustainability values are driving premiumization of recycled-material bags, wallets, and accessories. Brandable, high-margin, and globally scalable." }
    ]
  },
  {
    time: "12 Months",
    items: [
      { emoji: "🧠", product: "Neurofeedback Wellness Headbands", reason: "Brain stimulation wearables (focus, sleep, stress) are entering the consumer market. Early movers will capture massive market share before saturation." },
      { emoji: "🌬", product: "Indoor Air Quality Monitors", reason: "Global air pollution awareness + post-pandemic indoor health consciousness is building a massive market for smart AQI monitors with phone connectivity." }
    ]
  }
];

const SUMMARY_DATA = {
  topByScore: [
    { name: "Lash Lift & Tint Kit", score: 88 },
    { name: "Magnetic Posture Corrector", score: 84 },
    { name: "Car LED Ambient Kit", score: 82 },
    { name: "Portable Espresso Maker", score: 79 },
    { name: "Smart Pet Water Fountain", score: 78 }
  ],
  topByMargin: [
    { name: "Lash Lift & Tint Kit", score: "78%" },
    { name: "Car LED Ambient Kit", score: "74%" },
    { name: "Magnetic Posture Corrector", score: "72%" },
    { name: "Portable Espresso Maker", score: "65%" },
    { name: "Smart Pet Water Fountain", score: "65%" }
  ],
  topByVirality: [
    { name: "Lash Lift & Tint Kit", score: 95 },
    { name: "Car LED Ambient Kit", score: 94 },
    { name: "Smart Pet Water Fountain", score: 82 },
    { name: "Magnetic Posture Corrector", score: 79 },
    { name: "Portable Espresso Maker", score: 78 }
  ],
  topByLowComp: [
    { name: "Lash Lift & Tint Kit", score: "38% sat." },
    { name: "Magnetic Posture Corrector", score: "41% sat." },
    { name: "Car LED Ambient Kit", score: "44% sat." },
    { name: "Portable Espresso Maker", score: "40% sat." },
    { name: "Smart Pet Water Fountain", score: "55% sat." }
  ],
  winner: {
    name: "Lash Lift & Tint Kit",
    desc: "Highest overall score (88/100), strongest repeat purchase potential, near-guaranteed TikTok virality, 78% gross margin, and a clear path to a subscription-based beauty brand."
  }
};
