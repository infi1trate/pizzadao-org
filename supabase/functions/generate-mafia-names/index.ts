import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SYSTEM_PROMPT = `You are a bizarre neighborhood alias generator for PizzaDAO. The TOPPING is the person — it leads or anchors every alias. The film is only a tone/mood reference (cadence, atmosphere, archetype) — never source material, never its characters' surnames.

Think wider than mob patriarchs. The underworld includes lounge singers, femme fatales, hustlers, bakers, nightclub owners, disco criminals, smugglers, card sharks, drifters, soft-spoken legends, neighborhood icons, chaotic gremlins, cooks, stylish eccentrics, black-market weirdos. Some names funny, some cool, some stylish, some mysterious, some absurd.

VARIETY IS THE POINT. Across the 3 names, USE DIFFERENT STRUCTURES — never return 3 of the same shape, never 3 male-coded "Tony/Paulie/Vinny/Vito/Sonny" names. Mix masculine, feminine, ambiguous, and pure-alias energy without ever asking the user about gender.

Valid structures (rotate — do not default to #1):
  1. [Topping] [Short Name]              — Pepperoni Paulie, Anchovy Tony, Mozzarella Mona, Ricotta Rose
  2. The [Topping] [Title/Noun]          — The Garlic Kid, The Mushroom Queen, The Red Slice, The Velvet Knife
  3. Big/Little/Old [Topping]            — Big Basil, Little Olive, Old Oregano
  4. [Color/Texture] [Topping]           — Black Olive Betty, Pink Pepper, Burnt Crust, Cherry Heat
  5. Pure alias / mononym                — Pepperflake, Sunday Sauce, Olive Oil, Chili Silk, Garlic Lips
  6. [Topping] [Body-part/Object]        — Garlic Knuckles, Anchovy Eyes, Truffle Tongue

Reference vibe (study the RANGE — gendered, neutral, surreal, stylish, funny):
Pepperoni Paulie · Mozzarella Mona · Big Basil · Ricotta Rose · Hot Honey Vinny · Sunday Sauce · The Red Slice · Black Olive Betty · The Mushroom Queen · Pepperflake · Garlic Lips · Cherry Heat · Olive Oil · Burnt Crust · Pink Pepper · The Velvet Knife · Chili Silk · The Garlic Kid · Anchovy Tony · Truffle Tony

INFER PERSONALITY from the topping and let it steer the archetype:
- Hot honey → flashy, seductive, chaotic, stylish
- Mushroom → earthy, strange, mysterious, soft-spoken
- Anchovy → slick, salty, suspicious, sharp
- Ricotta → elegant, soft, refined, understated
- Pepperoni → loud, spicy, charismatic
- Basil → cool, classic, green-thumb calm
- Burrata → indulgent, luxurious
- Garlic → pungent, blunt, beloved
- Truffle → rare, decadent, whispered-about
- Olive → old-world, sly, briny
Match cadence + mood to that personality. Don't force masculine mobster energy onto a soft or feminine-coded topping.

FORBIDDEN:
- All 3 names landing in the [Topping] [MaleFirstName] pattern.
- Famous movie character surnames (Corleone, Montana, Soprano, Gambino, Andolini, Rizzo, Brasco, etc.).
- The fan-fiction format: First "Topping" MovieSurname.
- Quoted middle nicknames.
- Three-word AI-salad phrases. Keep to 1–3 words, alliterative or rhythmic.
- Slurs, ethnic caricature, glorifying real criminals, gratuitous violence.

The film influences ONLY cadence, swagger, atmosphere (operatic, noir, brooklyn, sicilian, yakuza, miami-neon, etc.) — never names.

Output:
- EXACTLY 3 names as a JSON array. No prose, no markdown fences.
- Schema: [{"name": string, "explanation": string, "style_tags": string[]}]
- The 3 names MUST use 3 different structures from the list above.
- explanation: max 16 words. Lead with the topping's personality + the alias's archetype (singer, smuggler, baker, ghost, etc.). Deadpan, confident.
- style_tags: 2–4 lowercase single words (e.g. "spicy", "femme-fatale", "soft-spoken", "neo-noir", "lounge").
- The system stays straight-faced while the names get weird.`;


Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const { movie, topping, customNote, attempt: rawAttempt, previousNames } = body ?? {};

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

    const attempt = Math.max(1, Math.min(20, Number(rawAttempt) || 1));
    const prevList: string[] = Array.isArray(previousNames)
      ? previousNames.map((n: unknown) => String(n)).filter(Boolean).slice(-24)
      : [];

    // Escalating creative curve — each reroll digs deeper into the archive.
    const escalation =
      attempt <= 1
        ? `CREATIVE TIER 1 — GROUNDED. Names should feel believable, sayable, neighborhood-classic. Examples in spirit: Pepperoni Vito, Big Basil, Mozzarella Mike. Keep at least one [Topping] [Short Name] but vary the other two structures.`
        : attempt === 2
        ? `CREATIVE TIER 2 — STYLISH. The first roll was the obvious file. Dig deeper now. More personality, more flavor, more rhythm. Examples in spirit: Garlic Lips, Ricotta Rose, Cherry Heat, The Mushroom Queen. Avoid plain [Topping] [Tony/Paulie/Vinny/Vito/Mike] entirely.`
        : `CREATIVE TIER 3 — BIZARRE NEIGHBORHOOD LEGENDS. The archive is open. Pull the strange ones: mononyms, color+topping, texture+topping, body-part nicknames, eccentric titles. Examples in spirit: Velvet Knife, Burnt Crust, Sunday Sauce, Chili Silk, Black Olive Betty, The Red Mushroom, Pepperflake. NO [Topping] [MaleFirstName] patterns at all. Lean weird, specific, memorable.`;

    const avoidBlock = prevList.length
      ? `\nALREADY USED THIS SESSION (forbidden — do not return these, do not return obvious variations, do not mirror their cadence or structure):\n- ${prevList.join("\n- ")}`
      : "";

    const userPrompt = `Atmosphere film: ${movie.title}
Year: ${movie.year ?? "unknown"}
Country / region: ${movie.country ?? "unknown"}
Overview: ${movie.overview ?? "—"}
Tone / keywords: ${(movie.tone ?? []).join(", ") || "—"}
Initiate's topping (THE IDENTITY): ${topping}
${customNote ? `Custom user note: ${customNote}` : ""}

Reroll attempt number: ${attempt}
${escalation}
${avoidBlock}

Generate exactly 3 PizzaDAO neighborhood aliases as the JSON array described.
- "${topping}" anchors every alias — let its personality steer archetype, gender energy, and rhythm.
- "${movie.title}" only provides cadence and atmosphere. Do NOT use its character names or surnames.
- The 3 names MUST use 3 different structures from the allowed list. No 3 Tonys/Paulies/Vinnys.
- Mix masculine, feminine, ambiguous, and pure-alias energy. Some funny, some stylish, some mysterious.
- Zero repetition with the forbidden list above — no near-duplicates, no rhyming twins, no same-shape echoes.`;

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
        // Escalate temperature with each reroll so the archive gets stranger.
        temperature: Math.min(1.15, 0.85 + (attempt - 1) * 0.1),
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

    const prevNorm = new Set(prevList.map((n) => n.trim().toLowerCase()));
    names = names
      .filter((n) => n && typeof n.name === "string")
      .map((n) => ({
        name: String(n.name).slice(0, 120),
        explanation: String(n.explanation ?? "").slice(0, 240),
        style_tags: Array.isArray(n.style_tags) ? n.style_tags.slice(0, 5).map(String) : [],
      }))
      // Drop any exact repeats from previous rolls in this session.
      .filter((n) => !prevNorm.has(n.name.trim().toLowerCase()))
      .slice(0, 3);

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
