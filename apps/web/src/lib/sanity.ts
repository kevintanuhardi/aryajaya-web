/**
 * Minimal Sanity read client for build time (no extra dependency).
 * Returns null when Sanity is not configured or the request fails, so the
 * build can fall back to the local content in src/data/.
 */
const env = { ...process.env, ...import.meta.env } as Record<string, string | undefined>;

const projectId = env.SANITY_PROJECT_ID || env.SANITY_STUDIO_PROJECT_ID;
const dataset = env.SANITY_DATASET || env.SANITY_STUDIO_DATASET || 'production';
const token = env.SANITY_READ_TOKEN;
const apiVersion = '2024-01-01';

export const isSanityConfigured = Boolean(projectId);

let warned = false;

export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!projectId) return null;

  // Always the live API, never the apicdn cache: the publish webhook starts a
  // build within seconds, before the CDN has caught up, so cached reads could
  // miss the document that was just published. Builds are rare, so the cost is low.
  const host = 'api.sanity.io';
  const url = new URL(`https://${projectId}.${host}/v${apiVersion}/data/query/${dataset}`);
  url.searchParams.set('query', query);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(`$${key}`, JSON.stringify(value));
  }
  // Only published documents (drafts are never shown on the public site).
  url.searchParams.set('perspective', 'published');

  try {
    const response = await fetch(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    const body = (await response.json()) as { result: T };
    return body.result;
  } catch (error) {
    if (!warned) {
      warned = true;
      console.warn(`[sanity] Falling back to local content: ${(error as Error).message}`);
    }
    return null;
  }
}

type PortableTextBlock = { _type: string; children?: { text?: string }[] };

/** Flattens Portable Text into plain paragraphs. */
export const toParagraphs = (blocks: PortableTextBlock[] | null | undefined): string[] =>
  (blocks ?? [])
    .filter((block) => block._type === 'block')
    .map((block) => (block.children ?? []).map((child) => child.text ?? '').join(''))
    .filter((text) => text.trim().length > 0);
