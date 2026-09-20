# Hindu Dharma Digital Platform (सनातन धर्म डिजिटल मंच)

Built in accordance with the **Hindu Dharma Platform Antigravity Master Product & Development Plan**.

A scalable multilingual knowledge platform, scripture and book library, content CMS, Hindu calendar panchang, and e-commerce marketplace.

---

## 🏛️ Key Features Implemented

### 1. Multilingual System (English, Hindi, Sanskrit)
- **Centralized i18n Architecture**: Every user-facing UI string is strictly decoupled into key-value dictionaries for English (`en`), Hindi (`hi`), and Sanskrit (`sa`).
- **Zero Missing Key Guarantee**: CI test `npm run test:i18n` compares all 138 canonical UI strings across languages and fails if any translation key is missing or empty.
- **Persistent Preferences**: Language preference persists across sessions via client context, `localStorage`, and cookies for SSR synchronization.

### 2. Canonical Scripture Reader & Shloka System
- **Separate Recensions**: Sanskrit original in pristine Devanagari script is stored and displayed separately from translations.
- **Rich Verse Annotations**: Roman transliteration (IAST), Hindi translation, English translation, word-by-word padachheda mapping, and traditional acharya bhashya commentary (Shankara, Ramanuja).
- **Interactive Reader Controls**: Chapter selector, verse selector, dynamic font sizing (A, A+, A++), local bookmarking, and instant sharing.
- **Strict Provenance**: Validated source and copyright rights metadata (`PUBLIC_DOMAIN`, `LICENSED`, `ADMIN_OWNED`, `RESTRICTED`).

### 3. Astronomical Hindu Panchang & Calendar Engine
- **Surya Siddhanta & Drik Ganita Calculations**: Deterministic mathematical calculations for Tithi, Nakshatra, Yoga, Karana, Paksha (Shukla/Krishna), Ekadashi observances, Purnima, and Amavasya.
- **Muhurat Timing**: Accurate local sunrise, sunset, Brahma Muhurat, Abhijit Muhurat, and Rahu Kaal.
- **Zero Generative AI Hallucinations**: Panchang calculations are strictly astronomical and algorithmic.

### 4. Dharma Knowledge & Heritage Directory
- **Gods & Goddesses (Deities)**: Profiles with iconography, dhyana mantras, scriptural references, and sacred kathas.
- **Temples Directory**: Pilgrimage information, darshan timings, locations, state filters, and official Devasthanam portals.
- **Festivals & Vrat Guides**: Lunar timing, scriptural significance, and detailed puja vidhi instructions.

### 5. Content CMS (Draft → Review → Approved → Published)
- Full article CMS supporting multi-author contributions, multilingual titles and content, tag categorizations, and workflow status transitions enforced server-side.

### 6. E-Commerce Marketplace
- Sacred products catalog (canonical books, brass idols, puja samagri, certified Rudraksha malas).
- Cart system with quantity selectors, coupon discount codes (`SANATAN10`, `GITA20`), and subtotal calculation.
- Complete checkout flow with shipping address capture, UPI payment gateway integration simulation, and automatic database transaction decrementing product stock inventory upon order confirmation.

### 7. AI Dharma Guide (Anti-Hallucination RAG)
- Verified retrieval-augmented generation grounded strictly in platform scriptures and canonical texts.
- Displays verified source citations (exact Scripture, Chapter, and Verse).
- If an inquiry cannot be answered by platform verified canon, it refuses to hallucinate religious verses.

### 8. Enterprise RBAC & Security Audit Logs
- 6 Defined Roles: `SUPER_ADMIN`, `CONTENT_ADMIN`, `STORE_ADMIN`, `EDITOR`, `AUTHOR`, `USER`.
- Server-side permission enforcement on all API routes (`CREATE`, `READ`, `UPDATE`, `DELETE`, `PUBLISH`, `APPROVE`, `EXPORT`).
- Tamper-evident `AuditLog` table capturing admin activities, access attempts, and RAG requests.

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Database Setup & Seeding
```bash
# Push schema to SQLite database (dev.db)
npm run prisma:push

# Seed authentic scriptures, Gita verses, shlokas, deities, temples, festivals, products, and users
npm run prisma:seed
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Verification

Run the automated acceptance suite verifying all 25 checklist points:
```bash
# Run 100% translation key completeness check
npm run test:i18n

# Run comprehensive acceptance test suite
npm test
```

Production build verification:
```bash
npm run build
```

---

## 🔑 Default Seeded Accounts

| Role | Email | Password | Entitlements |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `superadmin@sanatan.org` | `Sanatan@108` | Full platform access, audit logs, user governance |
| **Content Admin** | `contentadmin@sanatan.org` | `Sanatan@108` | Scriptures, shlokas, and articles publishing |
| **Store Admin** | `storeadmin@sanatan.org` | `Sanatan@108` | Product catalog, inventory, orders management |
| **Senior Editor** | `editor@sanatan.org` | `Sanatan@108` | Create/edit content, review and approve drafts |
| **Dharma Author** | `author@sanatan.org` | `Sanatan@108` | Create and draft original philosophical essays |
| **Devotee Seeker** | `seeker@sanatan.org` | `Sanatan@108` | Personal bookmarks, reading history, cart & orders |

*(Note: You can also use the 1-click role buttons on `/login` to test any role instantly).*
