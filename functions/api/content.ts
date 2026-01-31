
// Define Cloudflare specific types to resolve 'Cannot find name' errors
type R2Bucket = any;
type PagesFunction<T = any> = any;

interface Env {
  DATA_BUCKET: R2Bucket;
  AUTH_SECRET: string;
}

// Fixed 'PagesFunction' and 'R2Bucket' missing type errors
export const onRequest: PagesFunction<Env> = async (context: any) => {
  const { request, env } = context;
  const url = new URL(request.url);
  const type = url.searchParams.get('type') || 'blog';

  // GET: Fetch list or detail
  if (request.method === 'GET') {
    const path = url.pathname.split('/').pop();
    
    if (path === 'content') {
      // Fetch index list
      const obj = await env.DATA_BUCKET.get(`lists/${type}.json`);
      if (!obj) return new Response(JSON.stringify([]), { headers: { 'Content-Type': 'application/json' } });
      return new Response(obj.body, { headers: { 'Content-Type': 'application/json' } });
    } else {
      // Fetch detail by slug/id
      const obj = await env.DATA_BUCKET.get(`details/${type}/${path}.json`);
      if (!obj) return new Response('Not Found', { status: 404 });
      return new Response(obj.body, { headers: { 'Content-Type': 'application/json' } });
    }
  }

  // POST/PUT: Save content (Auth Required)
  if (request.method === 'POST' || request.method === 'PUT') {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) return new Response('Unauthorized', { status: 401 });

    const body = await request.json() as any;
    const { type, data, id } = body;
    const slug = data.slug;

    // 1. Save detail file
    await env.DATA_BUCKET.put(`details/${type}/${slug}.json`, JSON.stringify(data), {
      customMetadata: { contentType: 'application/json' }
    });

    // 2. Update list index
    const listObj = await env.DATA_BUCKET.get(`lists/${type}.json`);
    let list = listObj ? await listObj.json() : [];
    
    // Explicitly typed parameters for filter/map to avoid implicit any errors
    if (id || list.find((i: any) => i.slug === slug)) {
      list = list.map((item: any) => item.slug === slug ? { ...data, content: undefined } : item);
    } else {
      list.unshift({ ...data, content: undefined }); // Remove full content from index for performance
    }

    await env.DATA_BUCKET.put(`lists/${type}.json`, JSON.stringify(list));

    return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } });
  }

  return new Response('Method Not Allowed', { status: 405 });
};
