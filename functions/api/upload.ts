
// Define Cloudflare specific types to resolve 'Cannot find name' errors
type R2Bucket = any;
type PagesFunction<T = any> = any;

interface Env {
  MEDIA_BUCKET: R2Bucket;
  PUBLIC_URL: string;
}

// Fixed 'PagesFunction' and 'R2Bucket' missing type errors
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

  const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  await env.MEDIA_BUCKET.put(`uploads/${filename}`, file.stream(), {
    httpMetadata: { contentType: file.type }
  });

  const url = `${env.PUBLIC_URL}/uploads/${filename}`;

  return new Response(JSON.stringify({ url }), {
    headers: { 'Content-Type': 'application/json' }
  });
};
