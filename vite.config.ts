import 'dotenv/config';
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client for Vite plugin
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

let supabase: ReturnType<typeof createClient>;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.error('Missing Supabase environment variables for Vite plugin.');
}

// https://vitejs.dev/config/
function localGeminiApi(): Plugin {
  return {
    name: 'local-gemini-api',
    configureServer(server) {
      server.middlewares.use('/api/gemini-assist', async (req, res) => {
        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.end();
          return;
        }
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('Method not allowed');
          return;
        }

        try {
          const apiKey = process.env.GEMINI_API_KEY;
          if (!apiKey) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Missing GEMINI_API_KEY' }));
            return;
          }

          const chunks: Buffer[] = [];
          await new Promise<void>((resolve) => {
            req.on('data', (c) => chunks.push(c));
            req.on('end', () => resolve());
          });
          const bodyRaw = Buffer.concat(chunks).toString('utf8');
          const { promptText, systemInstruction, model } = bodyRaw ? JSON.parse(bodyRaw) : {};

          const modelName = typeof model === 'string' && model.length > 0 ? model : 'gemini-1.5-flash';
          const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

          const payload: any = { contents: [] };
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
            res.statusCode = r.status;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: errText }));
            return;
          }

          const data = (await r.json()) as any;
          const answer = data?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text ?? '').join('') ?? '';

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ answer, revisedPrompt: answer }));
        } catch (err: any) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: String(err?.message || err) }));
        }
      });
    },
  };
}

function localFeedbackApi(): Plugin {
  return {
    name: 'local-feedback-api',
    configureServer(server) {
      server.middlewares.use('/api/submit-feedback', async (req, res) => {
        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.end();
          return;
        }
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('Method not allowed');
          return;
        }

        if (!supabase) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Supabase client not initialized.' }));
          return;
        }

        try {
          const chunks: Buffer[] = [];
          await new Promise<void>((resolve) => {
            req.on('data', (c) => chunks.push(c));
            req.on('end', () => resolve());
          });
          const bodyRaw = Buffer.concat(chunks).toString('utf8');
          const { subject, message, userId } = bodyRaw ? JSON.parse(bodyRaw) : {};

          if (!subject || !message) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Subject and message are required.' }));
            return;
          }

          const { data, error } = await supabase
            .from('feedback_submissions')
            .insert([{ subject, message, user_id: userId }]);

          if (error) {
            console.error('Supabase insert error:', error);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: error.message }));
            return;
          }

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: 'Feedback submitted successfully', data }));
        } catch (error: any) {
          console.error('Server error:', error);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: String(error?.message || error) }));
        }
      });
    },
  };
}

function localIncrementTrendingApi(supabaseUrl: string, supabaseAnonKey: string): Plugin {
  let supabase: ReturnType<typeof createClient>;

  if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } else {
    console.error('Missing Supabase environment variables for Vite plugin (trending).');
  }

  return {
    name: 'local-increment-trending-api',
    configureServer(server) {
      server.middlewares.use('/api/increment-trending', async (req, res) => {
        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.end();
          return;
        }
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('Method not allowed');
          return;
        }

        if (!supabase) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Supabase client not initialized for trending.' }));
          return;
        }

        try {
          const chunks: Buffer[] = [];
          await new Promise<void>((resolve) => {
            req.on('data', (c) => chunks.push(c));
            req.on('end', () => resolve());
          });
          const bodyRaw = Buffer.concat(chunks).toString('utf8');
          const { assistantId } = bodyRaw ? JSON.parse(bodyRaw) : {};

          if (!assistantId) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Assistant ID is required.' }));
            return;
          }

          const { data, error } = await supabase
            .rpc('increment_trending_score', { assistant_id_param: assistantId });

          if (error) {
            console.error('Supabase trending score update error:', error);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: error.message }));
            return;
          }

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: 'Trending score updated successfully', data }));
        } catch (error: any) {
          console.error('Server error (trending):', error);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: String(error?.message || error) }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    mode === 'development' && localGeminiApi(),
    mode === 'development' && localFeedbackApi(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!),
    mode === 'development' && localIncrementTrendingApi(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
