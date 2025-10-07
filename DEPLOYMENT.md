# Deployment Guide

This guide provides comprehensive instructions for deploying the Vendoora Smart Hotel Experience Platform.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Vercel account (recommended)
- Supabase account
- Stripe account

### 1. Environment Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/vendoora.git
   cd vendoora
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

### 2. Required Services

#### Supabase Setup
1. Create a new Supabase project
2. Get your project URL and anon key
3. Set up the database schema (see `supabase/schema.sql`)

#### Stripe Setup
1. Create a Stripe account
2. Get your publishable and secret keys
3. Set up webhooks for payment processing

### 3. Local Development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🌐 Production Deployment

### Vercel Deployment (Recommended)

#### Option 1: Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

#### Option 2: GitHub Integration
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

#### Option 3: Deployment Script
```bash
./deploy.sh
```

### Environment Variables for Production

Set these in your Vercel dashboard:

```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your_nextauth_secret
```

## 🔧 Configuration

### Vercel Configuration

The `vercel.json` file includes:
- Security headers
- CORS configuration
- Function timeouts
- Redirects and rewrites

### Custom Domain Setup

1. Add your domain in Vercel dashboard
2. Configure DNS records
3. Enable SSL certificate

### Database Setup

1. Run the Supabase migration scripts
2. Set up Row Level Security (RLS) policies
3. Configure authentication providers

## 🧪 Staging Deployment

### Staging Environment
```bash
npm run deploy:staging
```

### Staging URL
Your staging deployment will be available at:
`https://your-project-name-git-develop-team.vercel.app`

## 🔍 Monitoring & Analytics

### Performance Monitoring
- Vercel Analytics (built-in)
- Web Vitals tracking
- Error monitoring with Sentry

### Business Analytics
- Google Analytics integration
- Custom event tracking
- Conversion funnel analysis

## 🔒 Security Configuration

### Security Headers
The application includes comprehensive security headers:
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy

### Environment Security
- Never commit `.env` files
- Use Vercel's environment variable encryption
- Rotate secrets regularly

## 📊 CI/CD Pipeline

### GitHub Actions Workflows

#### Test Suite (`test.yml`)
- Runs on every push and PR
- Tests multiple Node.js versions
- Generates coverage reports
- Builds the application

#### Deployment (`deploy.yml`)
- Deploys to staging on `develop` branch
- Deploys to production on `main` branch
- Includes Slack notifications

### Required GitHub Secrets

```env
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_vercel_org_id
VERCEL_PROJECT_ID=your_vercel_project_id
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
SLACK_WEBHOOK_URL=your_slack_webhook_url
```

## 🚨 Troubleshooting

### Common Issues

#### Build Failures
```bash
npm run clean
npm install
npm run build
```

#### Environment Variable Issues
- Check all required variables are set
- Verify variable names match exactly
- Ensure no trailing spaces

#### Database Connection Issues
- Verify Supabase URL and keys
- Check network connectivity
- Review RLS policies

### Debug Mode
```bash
NEXT_PUBLIC_ENABLE_DEBUG=true npm run dev
```

## 📈 Performance Optimization

### Build Optimization
- Code splitting enabled
- Image optimization
- Tree shaking
- Minification

### Runtime Optimization
- Edge functions for API routes
- CDN for static assets
- Compression enabled
- Caching strategies

## 🔄 Rollback Strategy

### Vercel Rollback
1. Go to Vercel dashboard
2. Navigate to deployments
3. Click "Promote to Production" on previous deployment

### Database Rollback
1. Use Supabase point-in-time recovery
2. Restore from backup
3. Run migration rollback scripts

## 📞 Support

For deployment issues:
- Check Vercel logs
- Review GitHub Actions logs
- Contact support@vendoora.com

## 🎯 Best Practices

### Deployment Checklist
- [ ] All environment variables configured
- [ ] Database migrations applied
- [ ] Tests passing
- [ ] Build successful
- [ ] Security headers configured
- [ ] Monitoring enabled
- [ ] Backup strategy in place

### Post-Deployment
- [ ] Verify all pages load correctly
- [ ] Test payment flow
- [ ] Check admin dashboard
- [ ] Monitor error rates
- [ ] Verify analytics tracking

---

For more detailed information, see the [README.md](README.md) file.
