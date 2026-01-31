
# infoprasar Deployment Guide (Cloudflare + R2 + Firebase)

## 1. Cloudflare R2 Setup
1. Create one bucket in Cloudflare Dashboard -> R2.
2. In the bucket **Settings**, enable a **Custom Domain** (e.g., `cdn.infoprasar.com`) to access files publicly. This will be your `PUBLIC_URL`.

## 2. Cloudflare Pages Setup
1. Create a new project in Cloudflare Pages and link your repository.
2. In **Settings -> Functions -> R2 Bucket Bindings**:
   - Bind the variable name **`Infoprasar_R2`** to your R2 bucket.
3. In **Settings -> Environment Variables**, add:
   - `PUBLIC_URL`: https://cdn.infoprasar.com (your custom domain enabled in step 1.2).
   - `AUTH_SECRET`: A secret string (optional, used for additional API verification layers).

## 3. Firebase Auth Setup
1. Go to Firebase Console and enable **Email/Password** authentication.
2. Add your Cloudflare Pages production domain to the **Authorized Domains** list in the Firebase Auth settings.
3. Ensure the config in `firebase.ts` matches your project credentials.

## 4. Development & Build
1. Run `npm run build`.
2. The `functions/` folder handles the R2 interface. Data is stored in `data/` and media in `media/` within the bucket.
