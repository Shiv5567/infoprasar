
type R2Bucket = any;
type PagesFunction<T = any> = any;

interface Env {
  Infoprasar_R2: R2Bucket;
  PUBLIC_URL: string; // The public URL pointing to the Infoprasar_R2 bucket (via Custom Domain or Worker)
}

export const onRequest: PagesFunction<Env> = async (context: any) => {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const authHeader = request.headers.get('Authorization');
  if (!authHeader) return new Response('Unauthorized', { status: 401 });

  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return new Response('No file uploaded', { status: 400 });
  }

  // Create a unique filename and store it in the media/ directory
  const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  await env.Infoprasar_R2.put(`media/${filename}`, file.stream(), {
    httpMetadata: { contentType: file.type }
  });

  // Construct the final public URL
  // Ensure PUBLIC_URL environment variable is set in Cloudflare Pages dashboard
  const baseUrl = env.PUBLIC_URL || '';
  const url = `${baseUrl}/media/${filename}`;

  return new Response(JSON.stringify({ url }), {
    headers: { 'Content-Type': 'application/json' }
  });
};
