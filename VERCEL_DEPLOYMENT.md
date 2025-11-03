# Data Enrich - Vercel Deployment Guide

This guide walks you through deploying Data Enrich to Vercel with all necessary security and configuration settings.

## Prerequisites

- A GitHub account with this repository
- A Vercel account (free tier works)
- API keys for Firecrawl and OpenAI
- (Optional) Upstash account for rate limiting

---

## Step 1: Get Your API Keys

### Required API Keys

| Service | Purpose | Where to Get It | Cost |
|---------|---------|----------------|------|
| **Firecrawl** | Web scraping and content aggregation | [firecrawl.dev/app/api-keys](https://www.firecrawl.dev/app/api-keys) | Pay-as-you-go |
| **OpenAI** | AI-powered data extraction (GPT-4/GPT-5) | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) | Pay-as-you-go |

### Optional (Recommended for Production)

| Service | Purpose | Where to Get It | Cost |
|---------|---------|----------------|------|
| **Upstash Redis** | Rate limiting protection | [console.upstash.com](https://console.upstash.com/) | Free tier available |

---

## Step 2: Deploy to Vercel

### Option A: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/data-enrich)

1. Click the "Deploy with Vercel" button above
2. Connect your GitHub account
3. Configure environment variables (see Step 3)
4. Click "Deploy"

### Option B: Manual Deployment

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository
3. Select the repository
4. Configure the project:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)
   - **Install Command:** `npm install` (default)

---

## Step 3: Configure Environment Variables

In your Vercel project dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add the following variables:

### Required Variables

```bash
# Firecrawl API Key
FIRECRAWL_API_KEY=fc-your_firecrawl_api_key_here

# OpenAI API Key
OPENAI_API_KEY=sk-your_openai_api_key_here

# Enable unlimited mode (removes demo limits)
FIRE_ENRICH_UNLIMITED=true
```

### Optional but Recommended

```bash
# Upstash Redis for rate limiting (recommended for production)
UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_token_here
```

**Important:**
- Select **"Production"**, **"Preview"**, and **"Development"** for all environment variables
- Click "Save" after adding each variable

---

## Step 4: Deploy & Verify

1. Click **"Deploy"** (or trigger a redeploy if already deployed)
2. Wait for deployment to complete (~2-3 minutes)
3. Visit your deployment URL (e.g., `https://your-app.vercel.app`)
4. Test the application:
   - Upload a sample CSV with emails
   - Select fields to enrich
   - Verify data enrichment works

---

## Security Best Practices

### ✅ What We've Implemented

- **Rate Limiting** - 50 requests per IP per day (requires Upstash)
- **Request Size Limits** - 50MB max in unlimited mode
- **Input Validation** - All inputs validated and sanitized
- **API Key Protection** - Keys never exposed to client
- **CORS Headers** - Proper cross-origin security
- **Session Management** - Secure abort/cancel handling
- **CSP Headers** - Content Security Policy enabled

### 🔒 Additional Recommendations

1. **Enable Vercel's Web Application Firewall (WAF)**
   - Go to Settings → Security → Vercel Firewall
   - Enable DDoS protection

2. **Add Custom Domain with HTTPS**
   - Go to Settings → Domains
   - Add your domain (HTTPS auto-enabled)

3. **Monitor API Usage**
   - Set up billing alerts in OpenAI and Firecrawl
   - Monitor Vercel function execution times

4. **Enable Vercel Analytics** (Optional)
   - Go to Analytics tab
   - Enable Web Analytics for usage insights

---

## Configuration Options

### Unlimited Mode

By default, when you set `FIRE_ENRICH_UNLIMITED=true`, you get:

| Feature | Demo Mode | Unlimited Mode |
|---------|-----------|----------------|
| Max CSV rows | 15 | ∞ |
| Max CSV columns | 5 | ∞ |
| Max file size | 5 MB | 50 MB |
| Max fields per enrichment | 10 | 50 |

### Rate Limiting

Without Upstash Redis:
- ⚠️ No rate limiting in production
- Anyone can abuse your API endpoints

With Upstash Redis:
- ✅ 50 requests per IP per day per endpoint
- ✅ Prevents API abuse
- ✅ Protects your API costs

**Setup Upstash:**
1. Create account at [upstash.com](https://upstash.com/)
2. Create a new Redis database (Global recommended)
3. Copy the REST URL and Token
4. Add to Vercel environment variables

---

## Troubleshooting

### Issue: "Missing API keys" error

**Solution:** Verify environment variables are set correctly in Vercel:
- Check Settings → Environment Variables
- Ensure variables are enabled for Production
- Redeploy after adding variables

### Issue: Rate limiting not working

**Solution:**
- Verify `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are set
- Check Upstash dashboard for connection errors
- Rate limiting is disabled in development mode

### Issue: Enrichment fails or times out

**Solution:**
- Check Vercel function logs (Deployments → View Function Logs)
- Verify API keys are valid and have sufficient credits
- Check Firecrawl and OpenAI API status pages

### Issue: Build fails during deployment

**Solution:**
- Check the build logs in Vercel
- Ensure `package.json` dependencies are correct
- Try clearing Vercel build cache (Settings → Advanced → Clear Build Cache)

---

## Cost Management

### Estimated Costs (per 100 enrichments with 5 fields each)

| Service | Estimated Cost |
|---------|---------------|
| Firecrawl | $5-15 (depends on search depth) |
| OpenAI GPT-4 | $2-5 (depends on data complexity) |
| Vercel | Free (within limits) |
| Upstash | Free (within 10k requests/day) |

**Tips to reduce costs:**
1. Process in smaller batches
2. Use fewer fields per enrichment
3. Avoid personal email providers (Gmail, Yahoo) - auto-skipped
4. Cache results when possible

---

## Support & Updates

- **Issues:** [GitHub Issues](https://github.com/YOUR_USERNAME/data-enrich/issues)
- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)

---

## Next Steps

After successful deployment:

1. ✅ Test with sample data
2. ✅ Set up billing alerts for APIs
3. ✅ Configure custom domain (optional)
4. ✅ Share with your team
5. ✅ Monitor usage and costs

---

**Need help?** Open an issue on GitHub or check the Vercel deployment logs for detailed error messages.
