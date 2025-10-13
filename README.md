<h1 align="center">🏠 Dinivrey Home System Deployment Guide</h1>

<p align="center">
  <b>Instructions for deploying the Dinivrey system on a home Unraid server with web (frontend + backend) and mobile apps.</b>
</p>

---

## 🧩 Overview

Dinivrey Home System consists of:

* **Frontend** — React web interface (port `3000`)
* **Backend** — FastAPI service (port `8000`)
* **Mobile App** — React Native (Expo) for Android & iOS

Frontend and backend are distributed as Docker images on **GitHub Container Registry (GHCR)**.
They are launched on the Unraid server via **Docker Compose** along with **Nginx Proxy Manager (NPM)** and **Cloudflare Tunnel** for secure remote access.

---

## 🖥️ Requirements on Unraid

Make sure your Unraid server has:

1. 🐳 **Docker & Docker Compose** (preinstalled on Unraid)
2. 🌐 **Nginx Proxy Manager (NPM)** — for domain & SSL management
3. ☁️ **Cloudflare Tunnel** — for secure Internet access
4. 📁 A persistent data folder, e.g.:

   ```
   /mnt/user/dinivrey/
   ```

   Place `docker-compose.yml`, `.env`, and secrets there.

---

## ⚙️ Environment Setup

Create a `.env` file in the same directory as your `docker-compose.yml`:

```bash
FIREBASE_KEY_PATH=/secrets/firebase-key.json
```

Ensure the key exists:

```
/mnt/user/dinivrey/secrets/firebase-key.json
```

This is used by the backend for authentication and notifications.

---

## 🚀 Deployment

1. **Log in to GitHub Container Registry (GHCR):**

   ```bash
   docker login ghcr.io
   ```

   Use your GitHub username and a PAT with `read:packages` permission.

2. **Prepare `docker-compose.yml`:**
   Reference GHCR images for frontend, backend, and include Cloudflare Tunnel.

3. **Start the system:**

   ```bash
   docker compose up -d
   ```

   * Backend → [http://192.168.0.95:8000](http://192.168.0.95:8000)
   * Frontend → [http://192.168.0.95:3000](http://192.168.0.95:3000)
   * Public access via Cloudflare domain → e.g. [https://dinivrey.yourdomain.com](https://dinivrey.yourdomain.com)

   To stop:

   ```bash
   docker compose down
   ```

4. **Configure NPM:**

   * Open NPM at `http://192.168.0.95:81`
   * Add Proxy Host → `dinivrey.yourdomain.com`
   * Forward Host: `frontend`, Port: `3000`
   * Enable SSL via Let's Encrypt

---

## 📱 Mobile App (Expo)

Located in `/mobile` folder.

### Android

```bash
npm install -g eas-cli
eas login
eas build -p android --profile production
```

Upload the `.apk` to Google Play Console.

### iOS

```bash
eas login
eas build -p ios --profile production
```

Upload the `.ipa` to App Store Connect via Transporter or Expo.

---

## 🌍 Mobile App Configuration

Default values in `.env.production`:

```bash
API_BASE_URL=http://192.168.0.95/api
BACKEND_IMAGES_URL=http://192.168.0.95/media
```

Replace with your domain if using Cloudflare or NPM:

```bash
API_BASE_URL=https://dinivrey.yourdomain.com/api
BACKEND_IMAGES_URL=https://dinivrey.yourdomain.com/media
```

---

## ✅ Verification

1. Open frontend (`http://192.168.0.95:3000` or your domain)
2. Confirm `/media` serves uploaded files
3. Check API at `/api/docs`
4. Test mobile app connection to backend

---

<p align="center"><b>© Dinivrey Systems — Secure and connected home infrastructure.</b></p>
