## 🏆 AI Chat Automated Infrastructure Ledger

Technical blueprint of the resilient system:

- ⚡ The Edge Runtime Guard (chat.ts): By prioritizing export const config = { runtime: 'edge' }, your backend bypasses the 15-second serverless cold-start execution timeout on Vercel's free tier. Responses stream globally with ultra-low latency.
- 🛡️ The Sliding Context Token Guard: The slice(-4) optimization ceiling permanently protects your free-tier API allowances. Long recruiter deep-dives will never cause unexpected bills or hit severe Tokens-Per-Minute limits.
- 🎯 The FSD Single Source of Truth: Your AI natively feeds off your core profile entity records (@/entities/profile/data/profile). When you update your stack or timeline metrics, the AI inherits those updates instantly without any backend modifications.
- 🧬 The Cross-Platform Sanitizer: Implementing isomorphic-dompurify directly inside the computed markdown parser secures the application from Cross-Site Scripting (XSS) script injections while remaining fully compatible with Nuxt server pre-renders.
- 📐 The Bulletproof Layout Framework: Your min-w-0 parent constraint combined with break-all on the auto-expanding Textarea guarantees your widget is visually unbreakable, even under continuous character entries.
- 🔮 The Dynamic Scroll Tracker Loop: The deep-reactive { deep: true } template watcher pins the viewport exactly to the bottom floor as responses stream in token-by-token.
