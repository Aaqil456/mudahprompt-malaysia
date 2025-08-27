// Serverless API route compatible with Vercel (`/api/gemini-assist`)
// Expects env var GEMINI_API_KEY to be set in your deployment environment.

// Simple per-identity request spacer to avoid hammering the Gemini API.
// Note: In serverless, this is per-instance best-effort only.
const nextAvailableAtByIdentity: Map<string, number> = new Map();
const MIN_SPACING_MS = 900; // ~1s between requests per identity

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders(req) });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders(req) });
  }

  try {
    // Derive an identity key (per user/IP best-effort)
    const forwardedFor = req.headers.get('x-forwarded-for') || '';
    const ip = forwardedFor.split(',')[0]?.trim() || 'anonymous';
    const identity = ip;

    // Enforce minimal spacing between requests per identity
    const now = Date.now();
    const nextAt = nextAvailableAtByIdentity.get(identity) || 0;
    if (now < nextAt) {
      const waitMs = Math.min(nextAt - now, 2000);
      await new Promise(r => setTimeout(r, waitMs));
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'Missing GEMINI_API_KEY' }), {
        status: 500,
        headers: jsonHeaders(req),
      });
    }

    const { promptText, systemInstruction, model } = await req.json();

    const modelName = typeof model === 'string' && model.length > 0 ? model : 'gemini-1.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    const payload: any = {
      contents: [],
    };
    if (systemInstruction) {
      payload.contents.push({ role: 'user', parts: [{ text: String(systemInstruction) }] });
    }
    payload.contents.push({ role: 'user', parts: [{ text: String(promptText || '') }] });

    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const errText = await r.text();
      return new Response(JSON.stringify({ error: errText }), {
        status: r.status,
        headers: jsonHeaders(req),
      });
    }

    const data = await r.json();
    const answer =
      data?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text ?? '').join('') ?? '';

    // Update next available time for this identity
    nextAvailableAtByIdentity.set(identity, Date.now() + MIN_SPACING_MS);

    // Include both keys for compatibility with older clients
    return new Response(JSON.stringify({ answer, revisedPrompt: answer }), { status: 200, headers: jsonHeaders(req) });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: String(error?.message || error) }), {
      status: 500,
      headers: jsonHeaders(req),
    });
  }
}

function corsHeaders(req: Request): HeadersInit {
  const origin = req.headers.get('origin') || '*';
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

function jsonHeaders(req: Request): HeadersInit {
  return {
    'Content-Type': 'application/json',
    ...corsHeaders(req),
  };
}


