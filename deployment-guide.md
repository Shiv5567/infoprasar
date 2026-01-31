
# infoprasar Deployment Guide (Cloudflare + R2 + Firebase)

## 1. Cloudflare R2 Setup
1. Create two buckets in Cloudflare Dashboard -> R2:
   - `infoprasar-data`: For JSON database files.
   - `infoprasar-media`: For images and PDFs.
2. In the `infoprasar-media` bucket, go to **Settings** and enable a **Custom Domain** (e.g., `media.infoprasar.com`) or a managed subdomain to access files publicly.

## 2. Cloudflare Pages Setup
1. Create a new project in Cloudflare Pages.
2. Link your repository.
3. In **Settings -> Functions -> R2 Bucket Bindings**:
   - Bind `DATA_BUCKET` to the `infoprasar-data` bucket.
   - Bind `MEDIA_BUCKET` to the `infoprasar-media` bucket.
4. In **Settings -> Environment Variables**, add:
   - `PUBLIC_URL`: Your media bucket's public URL.
   - `AUTH_SECRET`: A secret string for basic API validation (or use Firebase Token verification).

## 3. Firebase Auth Setup
1. Go to Firebase Console.
2. Enable **Email/Password** authentication.
3. Add your Cloudflare Pages domain to the **Authorized Domains** list.
4. Copy your Firebase Config to `App.tsx`.

## 4. Building
1. Run `npm run build`.
2. Ensure the `functions/` folder is in your project root; Cloudflare Pages will automatically detect and deploy these as API routes.
