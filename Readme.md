# 🎖️ IMF Gadget API

Welcome, Agent. This repository contains the **IMF Gadget Inventory API**, built as part of the backend developer internship challenge for Upraised. Your mission: review this Node.js + PostgreSQL powered backend that manages high-tech espionage gadgets for the Impossible Missions Force.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (via Sequelize ORM)
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Render (Free Tier)
- **Documentation**: Postman

---

## 🎯 Mission Objectives (Features)

- ✅ **CRUD for Gadgets**
- ✅ **Random Codename Generation** (e.g. "The Kraken", "The Nightingale")
- ✅ **Success Probability** (shown on `GET /gadgets`)
- ✅ **Status-Based Gadget Filtering**
- ✅ **Soft Delete (Decommission Gadget)** with timestamp
- ✅ **Self-Destruct Endpoint** with confirmation code simulation
- ✅ **Authentication & Authorization** using JWT

---

## 📦 Installation & Setup

```bash
git clone https://github.com/Anshul-Sharma01/upraised-assignment.git
cd upraised-assignment
npm install
```

### Create a .env file in the root and configure as follows:


```bash
PORT=5000
JWT_SECRET=your_jwt_secret

DATABASE_URL=yourdburl
```

### Run the server : 
```bash
npm run dev
```



# 🔐 Authentication
Use the /api/v1/auth/register and /api/v1/auth/login endpoints to get access tokens. Include the token in the Authorization header as a Bearer token.

# 🚀 API Endpoints
Health Check
+ GET /
➤ Returns server health and available routes.

Auth
+ POST /api/v1/auth/register

+ POST /api/v1/auth/login

+ POST /api/v1/auth/logout

Gadgets
+ GET /api/v1/gadgets – List all gadgets (with success probability)

+ POST /api/v1/gadgets – Add new gadget (auto-generated codename)

+ PATCH /api/v1/gadgets/:id – Update gadget

+ DELETE /api/v1/gadgets/:id – Soft delete (status = "Decommissioned")

+ POST /api/v1/gadgets/:id/self-destruct – Trigger self-destruct

+ GET /api/v1/gadgets/get-by-status?status=Available – Filter by status


# 📌 Notes
Server may take a few seconds to respond due to free hosting tier.

Codenames and confirmation codes are randomly generated on creation.

No frontend is included — this is a backend-only assignment.






