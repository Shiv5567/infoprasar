
type R2Bucket = any;
type PagesFunction<T = any> = any;

interface Env {
  Infoprasar_R2: R2Bucket;
}

export const onRequest: PagesFunction<Env> = async (context: any) => {
  const { request, env } = context;
  const url = new URL(request.url);
  const type = url.searchParams.get('type') || 'blog';

  // GET: Fetch list or detail from R2
  if (request.method === 'GET') {
    const path = url.pathname.split('/').pop();
    
    if (path === 'content') {
      // Fetch index list from data/lists/
      const obj = await env.Infoprasar_R2.get(`data/lists/${type}.json`);
      if (!obj) return new Response(JSON.stringify([]), { headers: { 'Content-Type': 'application/json' } });
      return new Response(obj.body, { headers: { 'Content-Type': 'application/json' } });
    } else {
      // Fetch detail by slug/id from data/details/
      const obj = await env.Infoprasar_R2.get(`data/details/${type}/${path}.json`);
      if (!obj) return new Response('Not Found', { status: 404 });
      return new Response(obj.body, { headers: { 'Content-Type': 'application/json' } });
    }
  }

  // POST/PUT: Save content (Auth Required)
  if (request.method === 'POST' || request.method === 'PUT') {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) return new Response('Unauthorized', { status: 401 });

    const body = await request.json() as any;
    const { type: contentType, data, id } = body;
    const slug = data.slug;

    // 1. Save detail file to R2
    await env.Infoprasar_R2.put(`data/details/${contentType}/${slug}.json`, JSON.stringify(data), {
      customMetadata: { contentType: 'application/json' }
    });

    // 2. Update list index in R2
    const listObj = await env.Infoprasar_R2.get(`data/lists/${contentType}.json`);
    let list = listObj ? await listObj.json() : [];
    
    const index = list.findIndex((item: any) => item.slug === slug);
    const listItem = { ...data, content: undefined }; // Optimize list size

    if (index !== -1) {
      list[index] = listItem;
    } else {
      list.unshift(listItem);
    }

    await env.Infoprasar_R2.put(`data/lists/${contentType}.json`, JSON.stringify(list));

    return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } });
  }

  return new Response('Method Not Allowed', { status: 405 });
};
