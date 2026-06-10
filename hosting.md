# AWS Portfolio Hosting Guide & Setup Plan

This document contains step-by-step instructions for hosting your Next.js portfolio website on **Amazon Web Services (AWS)** using either **AWS Amplify** (recommended/serverless) or an **AWS EC2** instance, and connecting your custom domain `chaitanya.qzz.io`.

---

## ⚡ Computational Power Requirements

Since this website is built with Next.js (utilizing pre-rendered static generation for blog/project content and lightweight API routes for contact forms and the AI chatbot):
- **Resource Footprint**: Very small. Memory usage is **less than 512MB RAM**, and CPU utilization is negligible.
- **Recommended Tier**: A single **t3.micro** or **t2.micro** virtual server instance (1 vCPU, 1 GB RAM). Both fit entirely into the **AWS Free Tier** (free for 12 months) and will cost **$0/month** under standard free tier bounds.

---

## 🚀 Option A: Hosting via AWS Amplify (Recommended & Serverless)

AWS Amplify is the easiest way to host Next.js apps. It acts like Vercel—building directly from GitHub and deploying serverless functions for Next.js APIs.

### Step 1: Connect your GitHub Repository
1. Log into your [AWS Management Console](https://aws.amazon.com/console/).
2. Search for **AWS Amplify** in the top services search bar.
3. In the AWS Amplify console, click **Create new app** (or **Host web app**).
4. Select **GitHub** as the source repository provider and click **Next**.
5. Log into GitHub to authorize AWS Amplify.
6. Choose the repository `Portofolio` and set the branch to `main`, then click **Next**.

### Step 2: Configure Environment Variables & Build Settings
1. Amplify will auto-detect Next.js build specifications.
2. Under the **Environment variables** section, add your production API keys:
   - Key: `HUGGINGFACE_API_KEY`, Value: `your_huggingface_api_key`
   - Key: `CONTACT_EMAIL`, Value: `me@chaitanya.qzz.io`
   - Key: `RESEND_API_KEY`, Value: *(your Resend key, optional — falls back to FormSubmit if empty)*
3. Click **Next**, review the settings, and click **Save and Deploy**.
4. Amplify will pull your code, compile it, and generate a live link (e.g., `https://main.d12345abcdef.amplifyapp.com`).

### Step 3: Map your Custom Domain (`chaitanya.qzz.io`)
1. In the Amplify App sidebar, click **Domain management**.
2. Click **Add domain**.
3. Type in your domain name (e.g. `chaitanya.qzz.io` or `yourdomain.com`).
4. Click **Configure domain**.
5. Amplify will automatically verify ownership, set up DNS routing, and generate a free **SSL certificate** (HTTPS) for you.
6. *If your domain is managed outside Route 53 (e.g., Cloudflare, GoDaddy, Hostinger)*:
   - AWS will display verification **CNAME** records.
   - Copy the CNAME records and add them in your domain registrar's DNS panel (like Cloudflare or GoDaddy dashboard) pointing to the CloudFront URL AWS provides.

---

## 🐧 Option B: Hosting via AWS EC2 (Virtual Linux Instance)

If you prefer deploying on an OS-level Linux virtual server:

### Step 1: Spin up the Virtual Server
1. Go to the **EC2 Dashboard** on AWS.
2. Click **Launch Instance**.
3. **Instance Details**:
   - **Name**: `portfolio-prod`
   - **OS**: `Ubuntu Server 24.04 LTS` (free-tier eligible).
   - **Instance Type**: `t3.micro` (or `t2.micro`).
   - **Key Pair**: Create or select an SSH `.pem` key pair to access the server.
   - **Security Group (Firewall)**: Check boxes to **Allow SSH traffic (Port 22)**, **Allow HTTP (Port 80)**, and **Allow HTTPS (Port 443)**.
4. Click **Launch Instance**.

### Step 2: Install Node.js, PM2, and PM2 Daemon
1. Log into your Ubuntu server using your SSH key:
   ```bash
   ssh -i /path/to/your-key.pem ubuntu@your-ec2-ip
   ```
2. Run system updates and install Git, Node.js v20, and `pnpm`:
   ```bash
   sudo apt-get update
   sudo apt-get upgrade -y
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs git
   sudo npm install --global pm2 pnpm
   ```

### Step 3: Clone, Setup Environment, and Build
1. Clone your GitHub repository to the server:
   ```bash
   git clone https://github.com/karnamvenkatachaitanya/Portofolio.git portfolio
   cd portfolio
   ```
2. Create your server environment configuration file:
   ```bash
   nano .env.local
   ```
   Add your keys into the editor:
   ```env
   HUGGINGFACE_API_KEY=your_huggingface_api_key
   CONTACT_EMAIL=me@chaitanya.qzz.io
   ```
   *Press `Ctrl+O` then `Enter` to save, and `Ctrl+X` to exit.*
3. Install dependencies and compile the production build:
   ```bash
   pnpm install
   pnpm build
   ```

### Step 4: Configure Daemon Run with PM2
To keep the Next.js process running in the background after you close SSH:
```bash
pm2 start npm --name "portfolio" -- start -- -p 3000
pm2 startup
# (Run the systemd command outputted by pm2 startup to configure auto-start on reboot)
pm2 save
```

### Step 5: Configure Nginx Reverse Proxy & SSL (HTTPS)
1. Install Nginx:
   ```bash
   sudo apt-get install -y nginx
   ```
2. Configure Nginx to forward port 80 traffic to Next.js on port 3000:
   ```bash
   sudo nano /etc/nginx/sites-available/default
   ```
   Replace the `location /` block inside the file with:
   ```nginx
   location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
   }
   ```
   Restart Nginx:
   ```bash
   sudo systemctl restart nginx
   ```
3. Secure your custom domain with free SSL using Certbot:
   ```bash
   sudo apt-get install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```
