import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SYSTEM_PROMPT = `You are PizzaDAO's official mafia-name oracle.
You write playful, cinematic mob-style aliases where the PIZZA TOPPING is the defining identity and the mafia film provides only the surrounding family/world.

CORE RULE — Pizza first, mafia mythology second:
- The topping/ingredient MUST be the central nickname — the sticky, memorable, iconic part.
- The mafia movie influences only the surname, cadence, and cultural rhythm.
- Never let the movie character lead. Never bury the topping. The topping IS the alias.

Preferred name structures (use one per name; vary across the 3):
  1. [First Name] "[Ingredient Nickname]" [Mafia Surname]   — e.g. Tony "Pepperoni" Montana
  2. [Ingredient Nickname] [Mafia Surname]                  — e.g. The Basil Don, Soppressata Corleone
  3. [First Name] "The [Ingredient]" [Mafia Surname]        — e.g. Michael "The Mushroom" Corleone

Good reference examples (study the cadence):
- Tony "Pepperoni" Montana
- Michael "The Mushroom" Corleone
- Sonny "Soppressata" Corleone
- Vito "Hot Honey" Andolini
- Frankie "Anchovy" Rizzo
- Joey "The Basil" Costello
- Carmine "Ricotta" Soprano
- Sal "The Meatball" Gambino
- Paulie "Garlic Knuckles" Romano

Avoid (these feel AI-generated):
- Ingredient demoted to surname or filler ("Manny 'Grease' Ribera", "Elvira 'Crisp Edge' Hancock")
- Abstract wordplay leading the name ("Sopra Sal", "Crisp Edge")
- Double metaphors, fantasy names, random compound phrases
- Slurs, ethnic stereotypes, glorifying real criminals, gratuitous violence

Output rules:
- Output EXACTLY 3 names as a JSON array. No prose, no markdown fences.
- Schema: [{"name": string, "explanation": string, "style_tags": string[]}]
- explanation: max 18 words. Mention the topping first, then a light nod to the film's world.
- style_tags: 2–4 lowercase single words (e.g. "spicy", "old-school", "italian", "neo-noir").
- Be funny, flavorful, mysterious, and instantly sayable out loud.`;


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

    const userPrompt = `Movie title: ${movie.title}
Movie year: ${movie.year ?? "unknown"}
Country / region: ${movie.country ?? "unknown"}
Overview: ${movie.overview ?? "—"}
Key characters: ${(movie.characters ?? []).join(", ") || "—"}
Tone / keywords: ${(movie.tone ?? []).join(", ") || "—"}
Selected topping: ${topping}
${customNote ? `Custom user note: ${customNote}` : ""}

Generate exactly 3 PizzaDAO mafia aliases as the JSON array described. Remember: the topping "${topping}" is the defining nickname — make it sticky and iconic. The movie shapes only the surname and cadence.`;

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
