import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SYSTEM_PROMPT = `You are PizzaDAO's official mafia-name oracle.
You write playful, cinematic, warm mob-style nicknames inspired by mafia movies and pizza.

Rules:
- Output EXACTLY 3 names as JSON. No prose, no markdown fences.
- Schema: [{"name": string, "explanation": string, "style_tags": string[]}]
- Names should sound like real mob nicknames: a first name, an optional middle nickname in quotes, and a surname. Mix in the chosen topping's flavor, texture, or character.
- Examples of tone: "Brandon 'Hot Honey' Belladonna", "Vinny Two Slices", "The Basil Don", "Sal 'The Crisp' Marinara".
- One short explanation per name (max 18 words). Reference the film + topping.
- 2-4 style_tags per name (lowercase, single words like "italian", "spicy", "old-school").
- Avoid: slurs, ethnic stereotypes, glorifying real criminals, gratuitous violence, generic fantasy names, AI cliches.
- Be funny, flavorful, mysterious, and memorable.`;

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

Generate exactly 3 PizzaDAO mafia names as the JSON array described.`;

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
