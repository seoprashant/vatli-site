# Vatli — Marketing Website

Static marketing site for **Vatli** (a WhatsApp Business platform), a product of **Ixoric Technologies LLC**.

- **Live at:** https://vatli.co
- **App (separate repo):** https://app.vatli.co · `ixoric-saas-waapi`

## Pages
| File | Page |
|------|------|
| `index.html` | Landing page (features, product preview, pricing, CTA) |
| `about.html` | About Us |
| `contact.html` | Contact Us |
| `privacy.html` | Privacy Policy (GDPR + CCPA) |
| `terms.html` | Terms of Service |
| `do-not-sell.html` | Do Not Sell My Personal Information (CCPA) |
| `styles.css` | Shared styles for all pages |

Pure static HTML + CSS — no build step, no dependencies.

## Status
- [x] US registered address added — Ixoric Technologies LLC, 30 N Gould St, Ste R, Sheridan, WY 82801, USA.

## Deploy (Oracle VM + Nginx)
Hosted on the same VM as the app, served by Nginx from `/var/www/vatli`.

```bash
# 1. Get the latest code onto the VM
cd /var/www/vatli && sudo git pull        # (if cloned here) — or scp the files

# 2. Nginx (one-time) — /etc/nginx/sites-available/vatli-landing
#    server_name vatli.co www.vatli.co; root /var/www/vatli; index index.html;
#    location / { try_files $uri $uri.html $uri/ =404; }

# 3. SSL (one-time)
sudo certbot --nginx -d vatli.co
```

To update the site later: edit files → commit → push → on the VM `git pull` (or re-upload).

---
© Ixoric Technologies LLC. WhatsApp is a trademark of Meta Platforms, Inc. Vatli is not affiliated with or endorsed by Meta.
