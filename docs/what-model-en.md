#### 🛠️ Deployment Guide: Which Model to Pick? (Model Landscape)

OpenClaw is model-agnostic, but the community's "heart" is quite vocal. Here is the deployment landscape for early 2026:

1 🥇 **Claude (Anthropic) — The "Soulmate"**: 
  - **Popular Choice**: Claude Sonnet 4 / 4.5.
  - **Why**: Widely considered the most stable for tool-calling logic and following Lobster-specific instructions. Despite the recent legal drama, its coding capability remains the heart of choice for most.

2 🥈 **GPT (OpenAI) — The "Veteran"**: 
  - **Popular Choice**: GPT-4o / GPT-5.4 (Thinking).
  - **Why**: Even with Peter moving to OpenAI, GPT's rigor in code generation and community support remain top-tier. The o1-series' reasoning shines in complex automation tasks.

3 🥉 **Gemini (Google) — The "King of Context & Value"**: 
  - **Popular Choice**: Gemini 1.5 Pro / 3 Flash.
  - **Why**: With **1M+ long context**, it has an unmatched advantage when dealing with massive log files. Gemini 3 Flash hit a staggering **95.1%** success rate in recent OpenClaw task benchmarks.

4 🏅 **DeepSeek / Kimi / MiniMax — The "Rising Stars"**:
  - **Why**: Extremely fast deployment in the APAC region and aggressive pricing (often with free tier events). The savior of low-budget "Cloud Lobster Farming."

5 🏠 **Ollama (Local) — The "Privacy Guard"**:
  - **Why**: The latest version now supports **MiniMax**, **Kimi**, **GLM**, and **Qwen3**. Perfect for privacy-conscious developers wanting to explore the latest model ecosystem locally.

#### 🧠 Local Players: Suggested models by GPU memory

| GPU memory | Suggested model | Model size | Notes |
| :--- | :--- | :--- | :--- |
| **8–12 GB** | qwen3-4B-Thinking-2507 | ~5GB | — |
| **16 GB** | gpt-oss-20b | ~12GB | Lower latency, good for interactive use |
| **24–48 GB** | Nemotron-3-Nano-30B-A3B | ~20GB | — |
| **128 GB** | gpt-oss-120b | ~65GB | Best quality on DGX Spark (quantized); leaves ~63GB for context window and other processes; use 20B/30B if you prefer faster responses |

**Quality vs. latency**: The 120B model gives the best accuracy and capability but has higher per-token latency. If you prefer snappier replies, use **gpt-oss-20b** (or a 30B model) instead; both run comfortably on DGX Spark with plenty of memory headroom.

**Lobster Insight**: Local is for privacy and thrift; Cloud is for true "Agentic Freedom." Unless you have 128GB+ RAM at home, leave the heavy lifting to the cloud brains. 🦞💡

**Quick Tip**: 

1. For beginners, start with **Claude Sonnet** for maximum stability. When handling massive project repos, switching to **Gemini 1.5 Pro** will feel like a different dimension.

2. **⚠️ Security Warning**: If you're using cloud models, guard your **API Keys** with your life! The recent $82,000 hijacking incident is a brutal wake-up call (see [Latest Crisis](../murmur-en.md#-2026-03-12-300k-stars-achieved-nvidias-growth-pill--the-api-hijacking-crisis-🚀🦞)); always set strict usage quotas.

3. **Local Players**: The latest **Ollama** now supports the **MiniMax**, **Kimi**, **GLM**, and **Qwen3** families. This is ideal for users with **Mac mini (64GB+ RAM suggested)** or **DGX Spark (128GB)**, allowing you to forget about API bills entirely while ensuring maximum privacy. Even if you don't run them locally, their cloud APIs are extremely budget-friendly. It's the best option for Lobster Farmers to avoid bill shock. 🦞✨

4. **Context Size**: Regardless of the model, it is recommended to set the Context Size to **at least 64K** to ensure the Lobster maintains its "memory" during long sessions. 🦞🧠

---

## 📚 Related Links

- [🏠 Back to Main Guide (README-en.md)](../README-en.md)
- [🦞 OpenClaw Universe Battlefield Observation Log (murmur-en.md)](../murmur-en.md)
- [👍 Complete WSL2 Installation Guide](wsl2-guide-en.md)
- [🦙 Ollama Website](https://ollama.com/)
- [🦞 OpenClaw Website](https://openclaw.ai/)
