// Serverless API route compatible with Vercel (`/api/gemini-assist`)
// Expects env var GEMINI_API_KEY to be set in your deployment environment.

// Simple per-identity request spacer to avoid hammering the Gemini API.
// Note: In serverless, this is per-instance best-effort only.
const nextAvailableAtByIdentity: Map<string, number> = new Map();
const MIN_SPACING_MS = 900; // ~1s between requests per identity

const handler = async (req: any): Promise<Response> => {
  console.log(`[${new Date().toISOString()}] Function started.`);
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders(req) });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders(req) });
  }

  try {
    console.log(`[${new Date().toISOString()}] Processing request.`);
    // Derive an identity key (per user/IP best-effort)
    const forwardedFor = (req.headers['x-forwarded-for'] as string) || '';
    const ip = forwardedFor.split(',')[0]?.trim() || 'anonymous';
    const identity = ip;

    // Enforce minimal spacing between requests per identity
    const now = Date.now();
    const nextAt = nextAvailableAtByIdentity.get(identity) || 0;
    if (now < nextAt) {
      const waitMs = Math.min(nextAt - now, 2000);
      console.log(`[${new Date().toISOString()}] Rate limit hit, waiting for ${waitMs}ms.`);
      await new Promise(r => setTimeout(r, waitMs));
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error(`[${new Date().toISOString()}] GEMINI_API_KEY is not set in the environment.`);
      return new Response(JSON.stringify({ error: 'Server configuration error: GEMINI_API_KEY is missing.' }), {
        status: 500,
        headers: jsonHeaders(req),
      });
    }
    console.log(`[${new Date().toISOString()}] API Key checked.`);

    let requestBody;
    try {
      const chunks: Buffer[] = [];
      for await (const chunk of req) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
      }
      const rawBody = Buffer.concat(chunks).toString('utf8');
      requestBody = JSON.parse(rawBody);
    } catch (parseError: any) {
      console.error(`[${new Date().toISOString()}] Error parsing request body: ${String(parseError?.message || parseError)}`);
      return new Response(JSON.stringify({ error: 'Invalid JSON in request body.' }), {
        status: 400,
        headers: jsonHeaders(req),
      });
    }

    const { promptText, systemInstruction, model } = requestBody;
    console.log(`[${new Date().toISOString()}] Request body parsed. Prompt length: ${promptText?.length || 0}, System Instruction length: ${systemInstruction?.length || 0}.`);

    const modelName = typeof model === 'string' && model.length > 0 ? model : 'gemini-1.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
    console.log(`[${new Date().toISOString()}] Using model: ${modelName}, URL: ${url}`);

    const payload: any = {
      contents: [],
    };
    if (systemInstruction) {
      payload.contents.push({ role: 'user', parts: [{ text: String(systemInstruction) }] });
    }
    payload.contents.push({ role: 'user', parts: [{ text: String(promptText || '') }] });
    console.log(`[${new Date().toISOString()}] Payload prepared.`);

    console.log(`[${new Date().toISOString()}] Calling external Gemini API...`);
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    console.log(`[${new Date().toISOString()}] External Gemini API call returned with status: ${r.status}.`);

    if (!r.ok) {
      const errText = await r.text();
      console.error(`[${new Date().toISOString()}] Gemini API returned error: ${errText}`);
      let clientErrorMessage = errText;
      try {
        const parsedError = JSON.parse(errText);
        if (parsedError?.error?.message) {
          clientErrorMessage = parsedError.error.message;
        }
      } catch (parseError) {
        // If errText is not valid JSON, use it as is.
      }
      return new Response(JSON.stringify({ error: clientErrorMessage }), {
        status: r.status,
        headers: jsonHeaders(req),
      });
    }

    const data = await r.json();
    const answer =
      data?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text ?? '').join('') ?? '';
    console.log(`[${new Date().toISOString()}] Gemini response parsed. Answer length: ${answer.length}.`);

    // Update next available time for this identity
    nextAvailableAtByIdentity.set(identity, Date.now() + MIN_SPACING_MS);
    console.log(`[${new Date().toISOString()}] Rate limit updated.`);

    // Include both keys for compatibility with older clients
    return new Response(JSON.stringify({ answer, revisedPrompt: answer }), { status: 200, headers: jsonHeaders(req) });
  } catch (error: any) {
    console.error(`[${new Date().toISOString()}] Function caught an error: ${String(error?.message || error)}`);
    return new Response(JSON.stringify({ error: String(error?.message || error) }), {
      status: 500,
      headers: jsonHeaders(req),
    });
  } finally {
    console.log(`[${new Date().toISOString()}] Function finished.`);
  }
};

export default handler;

function corsHeaders(req: any): HeadersInit {
  const origin = (req.headers['origin'] as string) || '*';
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

