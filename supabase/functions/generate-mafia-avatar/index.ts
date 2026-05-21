import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const STYLE = `Vintage rubber-hose cartoon mafia portrait, circular crop on warm cream background with a thick dark navy border ring. Thick black outlines, flat shading, warm muted vintage palette (cream, mustard, oxblood, charcoal). Expressive mischievous face, pinstripe suit with tie, fedora with feather. Slight wear, hand-drawn imperfections. No text, no logos, no watermarks. Single character, head-and-shoulders, centered, square 1:1 composition. Style references: classic Fleischer cartoons, Looney Tunes mobsters, vintage pizza mascots.`;

const TOPPING_MOTIF: Record<string, string> = {
  Pepperoni: "red pepperoni pin on lapel, spicy hot-headed expression, red accents",
  Mushroom: "earthy brown palette, a small mushroom in hatband, suspicious squint",
  Basil: "fresh basil sprig in lapel, green accents, calm honest face",
  Mozzarella: "soft cream tones, melted cheese drip on tie, loyal soft smile",
  Anchovy: "slick-back hair, tiny anchovy charm on chain, smug salty grin",
  Sausage: "fat sausage in mouth like a cigar with curling smoke, heavy proud face",
  "Hot honey": "honey drip on lapel, golden chain, sweet chaotic smirk",
  Ricotta: "soft creamy palette, gentle holy expression",
  Garlic: "garlic clove pin, sharp focused stare",
  Onion: "watery determined eyes, onion brooch",
  Olives: "olive pinned to fedora, bitter patient stare",
  Prosciutto: "elegant cured tones, prosciutto-pink pocket square",
  Pineapple: "tiny pineapple charm, controversial sunny grin",
  "Jalapeño": "green jalapeño pin, quick unpredictable smirk, beads of sweat",
  "Banana peppers": "yellow pepper accents, cheerful sneaky grin",
  Soppressata: "spicy red salami slice as boutonnière, feared scowl",
  Meatball: "round face, meatball brooch, familiar violent smile",
  "Roasted red pepper": "smoky red tones, charming smoky smile",
  Truffle: "rare dark truffle in lapel, whispering pose, expensive aura",
  Artichoke: "armored artichoke pin, roman stubborn stare",
  Eggplant: "deep purple velvet tones, sicilian calm",
  "Broccoli rabe": "bitter green sprig in lapel, honest weathered face",
  "Chili crisp": "oily red drips on tie, loud modern energy",
  Burrata: "soft luxurious cream tones, creamy soft smile",
  Oregano: "dried oregano sprinkled on shoulders, grandmotherly sicilian aura",
  Parmesan: "aged sharp expression, parmesan rind pin",
  Tomato: "ripe red tomato boutonnière, the boss of all toppings",
  "Spicy salami": "hot red salami slice on lapel, dangerous cured grin",
};

const FILM_MOOD: Record<string, string> = {
  operatic: "cinematic operatic gravitas",
  sicilian: "old-country sicilian warmth",
  brooklyn: "brooklyn wiseguy swagger",
  noir: "moody noir shadows",
  yakuza: "stoic yakuza poise",
  triad: "neon-tinted hong kong cool",
  prohibition: "1920s prohibition era",
  miami: "80s miami pastel heat",
  irish: "irish mob grit",
  french: "smoky french-noir cool",
  napoli: "naples camorra grit",
  rio: "rio favela heat",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { topping, filmTone, filmTitle, name } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const motif = TOPPING_MOTIF[topping] ?? "a small pizza slice pin on lapel";
    const toneKey = (Array.isArray(filmTone) ? filmTone : [filmTone]).find((t: string) => t && FILM_MOOD[t?.toLowerCase?.()]) ?? "";
    const mood = FILM_MOOD[String(toneKey).toLowerCase()] ?? "classic mafia gravitas";

    const prompt = `${STYLE}\n\nTOPPING DETAILS: ${motif}.\nMOOD: ${mood}.\nINSPIRATION: feel of the film "${filmTitle ?? "—"}" but DO NOT depict any real actor or copyrighted character — invent an original cartoon character that channels the vibe of the alias "${name ?? "—"}".`;

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${LOVABLE_API_KEY}` },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image",
        messages: [{ role: "user", content: prompt }],
        modalities: ["image", "text"],
      }),
    });

    if (aiRes.status === 429) {
      return new Response(JSON.stringify({ error: "Rate limited. Try again in a moment." }), {
        status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (aiRes.status === 402) {
      return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
        status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!aiRes.ok) {
      const text = await aiRes.text();
      return new Response(JSON.stringify({ error: "AI error", detail: text }), {
        status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await aiRes.json();
    const imageUrl: string | undefined =
      data.choices?.[0]?.message?.images?.[0]?.image_url?.url ??
      data.choices?.[0]?.message?.images?.[0]?.url;

    if (!imageUrl) {
      return new Response(JSON.stringify({ error: "No image returned", raw: data }), {
        status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ image: imageUrl }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
