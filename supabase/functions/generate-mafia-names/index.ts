import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SYSTEM_PROMPT = `You name PizzaDAO members. The TOPPING is the person — it is the identity, it leads every name. The mafia film is only a tone reference (cadence, swagger, archetype mood). The film is NOT source material. Do not write fan fiction of its cast.

The goal: simple, sticky, sayable names that sound like neighborhood legends — the kind of nickname a real crew would shout across a sidewalk.

REQUIRED NAME SHAPES (pizza-led, vary across the 3):
  1. [Topping] [Short First Name]            — e.g. Pepperoni Paulie, Anchovy Tony, Mozzarella Mike, Hot Honey Vinny
  2. [Topping Noun] [Punchy Surname]         — e.g. Garlic Knuckles, Soppressata Kid, Chili Crisp Charlie
  3. Big [Topping]  /  The [Topping] [Title] — e.g. Big Basil, The Mushroom Don, The Burrata Kid

Reference names to study (notice: SHORT, alliterative, sayable, two words):
- Pepperoni Paulie
- Anchovy Tony
- Big Basil
- Garlic Knuckles
- Hot Honey Vinny
- Mozzarella Mike
- The Mushroom Don
- Soppressata Kid
- Chili Crisp Charlie
- Truffle Tony

FORBIDDEN:
- Fan-fiction format: First "Topping" MovieSurname (e.g. Tony "Pepperoni" Montana). Never.
- Reusing famous movie character surnames (Corleone, Montana, Soprano, Gambino, Andolini, Rizzo, etc.).
- Quoted middle nicknames between a real first name and a mafia-movie surname.
- Three-part overly-clever AI phrases. Keep it to 2 words, occasionally 3.
- Abstract wordplay, slurs, ethnic stereotypes, glorifying real criminals, gratuitous violence.

The film influences ONLY: cadence, swagger, archetype mood (operatic, noir, brooklyn, sicilian, yakuza). Not surnames.

Output:
- EXACTLY 3 names as a JSON array. No prose, no markdown fences.
- Schema: [{"name": string, "explanation": string, "style_tags": string[]}]
- Names: 2 words usually, 3 max. No quoted middles. Alliteration is good. Must be sayable out loud.
- explanation: max 16 words. Lead with the topping's personality. Light, confident, no over-explaining.
- style_tags: 2–4 lowercase single words (e.g. "spicy", "old-school", "neo-noir", "sicilian").
- Funny because deadpan. The system takes itself seriously while the names are absurd.`;


Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const { movie, topping, customNote } = body ?? {};

    if (!movie?.title || !topping) {
      return new Response(JSON.stringify({ error: "movie and topping required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userPrompt = `Atmosphere film: ${movie.title}
Year: ${movie.year ?? "unknown"}
Country / region: ${movie.country ?? "unknown"}
Overview: ${movie.overview ?? "—"}
Tone / keywords: ${(movie.tone ?? []).join(", ") || "—"}
Initiate's topping (THE IDENTITY): ${topping}
${customNote ? `Custom user note: ${customNote}` : ""}

Generate exactly 3 PizzaDAO underworld aliases as the JSON array described.
- The topping "${topping}" IS the person — it must lead every name.
- "${movie.title}" only provides cadence, swagger, and mood. Do NOT use its character names or surnames. No "fan fiction" of the cast.
- Keep names short and sayable: PizzaDAO mythology first, mafia film flavor second.`;

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (aiRes.status === 429) {
      return new Response(JSON.stringify({ error: "Rate limited. Try again in a moment." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (aiRes.status === 402) {
      return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
        status: 402,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!aiRes.ok) {
      const text = await aiRes.text();
      return new Response(JSON.stringify({ error: "AI error", detail: text }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await aiRes.json();
    const raw = data.choices?.[0]?.message?.content ?? "[]";

    let names: Array<{ name: string; explanation: string; style_tags: string[] }> = [];
    try {
      const parsed = JSON.parse(raw);
      names = Array.isArray(parsed) ? parsed : parsed.names ?? parsed.results ?? [];
    } catch {
      const match = raw.match(/\[[\s\S]*\]/);
      if (match) names = JSON.parse(match[0]);
    }

    names = names
      .filter((n) => n && typeof n.name === "string")
      .slice(0, 3)
      .map((n) => ({
        name: String(n.name).slice(0, 120),
        explanation: String(n.explanation ?? "").slice(0, 240),
        style_tags: Array.isArray(n.style_tags) ? n.style_tags.slice(0, 5).map(String) : [],
      }));

    if (names.length === 0) {
      return new Response(JSON.stringify({ error: "Could not generate names." }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ names }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
