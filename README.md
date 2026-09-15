# Vatli — Marketing Website

Static marketing site for **Vatli** (a WhatsApp Business platform), a product of **IXORIC TECHNOLOGIES LLP** (India).

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
| `data-deletion.html` | Data deletion instructions (Meta app setting) |
| `do-not-sell.html` | Do Not Sell My Personal Information (CCPA) |
| `styles.css` | Shared styles for all pages |

Pure static HTML + CSS — no build step, no dependencies.

## Status
- [x] Operator: IXORIC TECHNOLOGIES LLP (India, GSTIN 10AAKFI2351Q1ZA), the business verified with Meta. Address: Ground, Madan Mahal-22, Hajipur, Village Purwa, Bishnupur Bala Dhari urf Balwa, Purwa Shiv Mandir, Chandralay, Vaishali, Bihar 844102, India.
- [x] Subscription payments: Stripe account of the US affiliate, Ixoric Technologies LLC.

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
© IXORIC TECHNOLOGIES LLP. WhatsApp is a trademark of Meta Platforms, Inc. Vatli is not affiliated with or endorsed by Meta.
