import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SYSTEM_PROMPT = `You are the PizzaDAO underworld's naming oracle.
You christen new initiates into a strange pizza mythology. The TOPPING is the person. The mafia film is only atmosphere — swagger, cadence, energy. Never source material.

CORE RULE — PizzaDAO mythology first, mafia flavor second:
- The topping IS the alias. It leads the name and dominates the mouthfeel.
- The film provides rhythm, archetype energy, and a loose first-name vibe ONLY. Do NOT copy character surnames, do NOT do "fan fiction" of the movie's cast.
- Never use the "FirstName 'Topping' MovieSurname" format. That is fan fiction. Forbidden.

Preferred name shapes (vary across the 3, all PIZZA-LED):
  1. [Topping] [Short First Name]            — e.g. Pepperoni Tony, Hot Honey Sal, Mozzarella Mike, Anchovy Vito, Truffle Tony
  2. [Topping Noun] [Punchy Surname]         — e.g. Garlic Knuckles, Soppressata Kid, Chili Crisp Charlie
  3. The [Topping] [Title/Don/Kid/Boss]      — e.g. The Mushroom Don, Big Basil, The Burrata Kid

Good reference energy (study the rhythm — short, sticky, sayable):
- Pepperoni Tony
- Hot Honey Sal
- Garlic Knuckles
- Big Basil
- Mozzarella Mike
- The Mushroom Don
- Anchovy Vito
- Chili Crisp Charlie
- Truffle Tony
- Soppressata Kid

FORBIDDEN (movie-fan-fiction energy):
- Tony "Pepperoni" Montana
- Michael "Soppressata" Corleone
- Any name where a famous movie character surname (Corleone, Montana, Soprano, Gambino, Rizzo, Andolini, etc.) appears
- Quoted middle nicknames between a real first name and a mafia-movie last name
- Abstract wordplay ("Sopra Sal", "Crisp Edge")
- Slurs, ethnic stereotypes, glorifying real criminals, gratuitous violence

The film should influence: cadence, swagger, archetype mood (operatic, noir, brooklyn, sicilian, yakuza, etc.) — NOT surnames.

Output rules:
- Output EXACTLY 3 names as a JSON array. No prose, no markdown fences.
- Schema: [{"name": string, "explanation": string, "style_tags": string[]}]
- Names should be short: usually 2 words, occasionally 3. No quoted middles.
- explanation: max 18 words. Lead with the topping's personality, then a light atmospheric nod (never a character reference).
- style_tags: 2–4 lowercase single words (e.g. "spicy", "old-school", "neo-noir", "sicilian").
- Funny, weird, flavorful, instantly sayable. PizzaDAO underworld energy — not movie cosplay.`;


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
