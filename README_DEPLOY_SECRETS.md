Secrets & steps to enable CI deploys (GitHub)

Required repository secrets (GitHub Settings -> Secrets -> Actions):

- RENDER_API_KEY: API key from Render (Account -> API Keys -> Create)
- RENDER_SERVICE_ID: Service ID (Render dashboard -> Service -> Settings -> Service ID)

- VERCEL_TOKEN: Personal token from Vercel (Account -> Tokens -> Create)
- VERCEL_ORG_ID: Vercel organization ID (from Vercel project settings or `vercel projects ls`)
- VERCEL_PROJECT_ID: Vercel project ID (Project Settings -> General -> Project ID)

How to use:
1. Add the secrets above in the GitHub repository `Settings > Secrets & variables > Actions`.
2. Push to `main` branch: the workflows `.github/workflows/deploy-backend-render.yml` and `.github/workflows/deploy-frontend-vercel.yml` will trigger and attempt to deploy.

Notes:
- The Render workflow triggers a deploy via the Render Deploys API. It requires `RENDER_API_KEY` and `RENDER_SERVICE_ID`.
- The Vercel workflow uses `amondnet/vercel-action` which requires Vercel secrets.
- You still need to set `NEXT_PUBLIC_API_URL` in the frontend's Vercel Environment Variables to point to the backend production URL.
- Ensure both Render and Vercel projects are configured with public visibility (not protected) so end users can access the sites without requesting access.

If you want, I can prepare a `render.yaml` more customized with repo details (requires repo name) or help you set the GitHub secrets by guiding through the dashboard steps.