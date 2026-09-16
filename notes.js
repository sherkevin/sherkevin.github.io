/* Notes page: paper reading reports and study records.
   Cards are fixed-size previews; clicking a card opens a dialog with the full record.
   Add a note by appending one object to NOTES. No external dependencies. */

const NOTES = [
  {
    topic: "工程",
    title: "MoE 架构的 Post-Training 难点与经验分享",
    venue: "知乎工程经验帖",
    date: "2026-07",
    link: "https://zhuanlan.zhihu.com/p/2018018879109091590",
    summary:
      "一线避坑手册：MoE post-training 的坑都源自 gating 这个派单员。训练时派单不均产生僵尸专家，RL 时派单不稳导致奖励与梯度错配、训练发散。",
    points: [
      "路由不一致链条：推理引擎（FP8）与训练引擎（BF16）的数值微差，使同一输入选中的专家不同；奖励基于专家 7 的输出计算，梯度却更新到专家 12 的路径上，训练发散。",
      "对策 R3：训练引擎强制重放推理引擎当时的路由选择，保证赏罚同人。",
      "训练时派单不均会让少数专家垄断训练机会，其余变成僵尸专家，参数容量白白浪费。",
    ],
    method: [
      "aux_loss 权重必须扫参，作者实验落在 0.001。",
      "RL 不稳定使用 Routing Replay（R2/R3）系列对策。",
      "专家并行选型按「专家大调 ETP、专家多调 EP」。",
    ],
    findings: [
      "三个可操作结论：aux_loss 权重扫参、RL 不稳定用 Routing Replay、专家并行按专家规模与数量选型。",
      "思想可直接借鉴到 MoE 模型的 SFT / RL 阶段设计。",
    ],
    limits:
      "工程经验帖而非论文；超参结论（aux_loss=0.001）来自作者单方实验，未跨模型规模验证。",
  },
  {
    topic: "安全评测",
    title: "Claude Sonnet 4.6 System Card 阅读报告",
    venue: "Anthropic 官方",
    date: "2026-02",
    link: "",
    summary:
      "系统卡的核心价值是一整套分层安全与对齐评测方法论：多快照评测、保守聚合、去污染、自适应红队，以及 RSP / ASL-3 分级下的风险评估流程。",
    points: [
      "多快照评测：对训练过程中多个 snapshot 做评测，包括多个 HHH 快照与一个 helpful-only 快照；agentic 评测每个快照多次采样。",
      "保守聚合：危险能力评测取「任一快照的最高分」进入最终能力评估，取能力上限而非平均。",
      "单轮行为安全覆盖 Usage Policy 的 15 个主题，在 7 种语言下运行，默认模式与扩展思考模式分别度量。",
    ],
    method: [
      "高难度实验版用合成 prompt 在 14 个政策领域做风格变换加难：违规请求写得更隐晦，良性请求套上冗长学术化的正当理由外壳，测试模型是否被表述框架误导。",
      "去污染沿用上一代方法，如对 HLE 使用 URL 黑名单加转录审查。",
      "发布决策走 RSP 初步评估流程，判定未跨越 AI R&D-4 与 CBRN-4 阈值，按 ASL-3 标准部署。",
    ],
    findings: [
      "文档约 134 页，以能力评测加安全评测为主，几乎不含架构与训练细节。",
      "评测组织方法学本身（快照选择、聚合口径、去污染）比单个分数更值得复用。",
    ],
    limits: "阅读只转述评测与测试如何设计，不转述具体分数与表格数值。",
  },
  {
    topic: "多模态",
    title: "Qwen3-VL 技术报告阅读报告",
    venue: "arXiv:2511.21631",
    date: "2025-12",
    link: "https://arxiv.org/abs/2511.21631",
    summary:
      "原生支持 256K 图文视频交错上下文；三项架构升级（Interleaved-MRoPE、DeepStack 跨层视觉融合、文本化视频时间戳）加四阶段预训练与三阶段后训练。",
    points: [
      "视觉编码器采用 SigLIP-2，从官方 checkpoint 初始化并以动态分辨率继续训练；merger 用两层 MLP 把 2x2 视觉特征压成 1 个视觉 token。",
      "Interleaved-MRoPE 解决上一代 MRoPE 频谱不均衡影响长视频的问题；文本化时间戳替代绝对时间对齐，避免稀疏时间位置 id。",
      "DeepStack 把视觉特征融合进 LLM 的多个层，收紧视觉与语言的对齐。",
    ],
    method: [
      "沿用视觉编码器加 MLP merger 加 LLM 主干的三模块结构；对小模型（2B/4B）改用 SigLIP2-Large。",
      "模型规格覆盖 Dense 2B/4B/8B/32B 与 MoE 30B-A3B、235B-A22B，同时发布 non-thinking 与 thinking 两种变体。",
    ],
    findings: [
      "多模态能力增强的同时保持甚至超越同级纯文本主干的语言能力，是报告给出的核心主张。",
      "针对 Qwen2.5-VL 暴露的三个问题（长视频频谱、时间对齐、视觉语言对齐）逐条给出改进。",
    ],
    limits: "阅读遵循原始约定，不转述 benchmark 具体分数与消融表格数字，能力判断需参考第三方评测。",
  },
  {
    topic: "安全评测",
    title: "GPT-5 System Card 阅读报告",
    venue: "OpenAI 官方",
    date: "2025-08",
    link: "https://arxiv.org/abs/2601.03267",
    summary:
      "GPT-5 是快模型、深度推理模型与实时路由器组成的统一系统；系统卡的贡献在于 safe-completions 训练、多层防御、内外部红队与 Preparedness 分级的安全评测设计方法论。",
    points: [
      "三类角色：gpt-5-main 高吞吐处理大多数问题；gpt-5-thinking 对更难问题生成长链内部思维；实时路由器按对话类型、复杂度、工具需求与显式意图决定调用哪个模型。",
      "额度耗尽后由各模型的 mini 版本处理剩余查询；未来方向是把这些能力整合进单一模型。",
      "安全对比采用新旧同代对照：gpt-5-thinking 对比 o3，gpt-5-main 对比 GPT-4o。",
    ],
    method: [
      "以输出为中心的安全训练（safe-completions）加多层防御，配合内外部红队与 Preparedness 框架分级。",
      "首次将一个 API 模型按生化领域高能力（High）处理并激活对应保障。",
    ],
    findings: [
      "文档约 63 页，聚焦能力评测与安全，几乎不披露架构与训练细节。",
      "系统卡展示的是评测与缓解的设计流程，而非单个模型分数。",
    ],
    limits: "阅读只说明评测与安全测试如何设计，不转述任何分数、表格数值与排名。",
  },
  {
    topic: "智能体",
    title: "How Memory Management Impacts LLM Agents",
    venue: "arXiv:2505.16067",
    date: "2025-05",
    link: "https://arxiv.org/abs/2505.16067",
    summary:
      "实证研究：LLM agent 具有 experience-following 性质，输入与检索到的记忆高度相似时输出也高度相似；无限制累积记忆反而严格更差。",
    points: [
      "量化 experience-following：以 input 相似度为自变量、output 相似度为因变量，聚焦 memory addition 与 deletion 两个基本操作。",
      "Error propagation：一次失败进入 memory，下次相似 input 被检索，输出重复错误，失败复合放大。",
      "Misaligned replay：当时成功但出于错误原因（lucky bypass）的执行，作为 experience 误导后续任务。",
    ],
    method: [
      "Controlled 实验比较 add-all、fixed-memory baseline 与 strict / coarse 过滤 evaluator，跨 4 个 agent benchmark。",
      "主张用未来任务的评测信号回溯标注 stored memory 质量，无需新标注成本。",
    ],
    findings: [
      "add-all 严格差于 fixed-memory baseline：RegAgent 67 到 55、EHRAgent 17 到 13、AgentDriver 40 到 32、CIC-IoT 72 到 60。",
      "未来 task 评测可作为 stored memory 的免费 quality label，为 memory management 提供闭环质量控制。",
    ],
    limits: "结论来自 4 个 benchmark 的受控实验；experience-following 强度在不同任务与模型间的泛化边界待验证。",
  },
  {
    topic: "训练与对齐",
    title: "Does RL Really Incentivize Reasoning Capacity Beyond the Base Model?",
    venue: "NeurIPS 2025",
    date: "2025",
    link: "https://openreview.net/pdf/c3957c2dc397dd6f7bf1e3da21cebaeca53844af.pdf",
    summary:
      "用 pass@k 度量推理能力边界：RLVR 并未产生 base model 之外的新推理模式，训后模型的推理路径已包含在 base model 采样分布中，训练反而缩小边界。",
    points: [
      "摒弃反映平均情况的 pass@1 与贪心解码，采用 pass@k：k 次采样中至少一次通过验证即视为可解，以此度量推理能力边界。",
      "零样本与少样本控制：base model 仅使用与 RLVR 训练相同的 zero-shot prompt 评估，消除上下文示例的混淆效应。",
      "采样设定为温度 0.6、top-p 0.95、最大生成 16384 tokens，部分代码任务 32k。",
    ],
    method: [
      "结合准确率分布分析、可解问题集合覆盖分析与困惑度分析，对比 base model 与多种 RLVR 算法训后模型。",
      "覆盖数学、代码与视觉推理三类任务。",
    ],
    findings: [
      "RLVR 模型可解问题集合被 base model 的 pass@k 集合覆盖；随训练推进能力边界收缩。",
      "蒸馏能真正扩展推理能力；主流 RLVR 算法在利用 base model 潜力上表现相似且远未达到最优。",
    ],
    limits: "结论基于数学、代码与视觉推理任务；多轮智能体环境交互等新 RL 范式下是否成立仍开放。",
  },
  {
    topic: "训练与对齐",
    title: "Is DPO Superior to PPO for LLM Alignment?",
    venue: "ICML 2024",
    date: "2024-04",
    link: "https://arxiv.org/abs/2404.10719",
    summary:
      "首个系统化的 DPO 与 PPO 理论和实证对比：DPO 的隐式奖励被策略自身参数化、缺乏 exploration；精心优化的 PPO 在多个维度超越 DPO。",
    points: [
      "DPO 隐式奖励 r 等于 beta 乘 log(pi_theta / pi_ref)，被策略本身参数化，导致奖励估计有偏，只能优化离线偏好数据覆盖的策略空间。",
      "DPO 无法探索偏好数据之外的策略空间，且过度优化偏好对中的胜出项而非全局最优。",
      "论文给出一组 PPO 优化技巧：reward normalization、KL penalty 调度、advantage estimation 改进与超参系统调优。",
    ],
    method: [
      "在多个 alignment benchmark 上对比 helpfulness、harmlessness、instruction following 与 reward model score。",
      "区分数据充分与数据有限两种条件观察方法鲁棒性。",
    ],
    findings: [
      "优化后的 PPO 在 helpfulness 与 instruction following 上超越 DPO，harmlessness 上相当；reward model 质量好时 PPO 的 RM score 也领先。",
      "DPO 在数据充分且质量高时表现好，PPO 在数据有限或噪声较大时更鲁棒；reward model 质量是 PPO 的关键变量。",
    ],
    limits: "实验主要在中等规模模型上进行；未覆盖 GRPO 等更新方法；reward model 训练质量本身是 confounding factor。",
  },
  {
    topic: "智能体",
    title: "Cognitive Architectures for Language Agents (CoALA)",
    venue: "TMLR 2024",
    date: "2023-09",
    link: "https://arxiv.org/abs/2309.02427",
    summary:
      "借 Soar / ACT-R 等认知架构的 memory、action、decision cycle 三件套，给 LLM agent 一套统一蓝图，统一 30 余个工作的术语与模块切分。",
    points: [
      "把 LLM 视为概率版 production system：prompt X 经 LLM 采样出补全 Y，生成的是字符串上的概率分布而非手写规则。",
      "agent 拆三个维度：memory（working / episodic / semantic / procedural）、action space（外部与内部动作）、decision-making procedure。",
      "decision cycle 区分 reasoning、retrieval 与 learning 三类过程，分别对应不同的记忆读写路径。",
    ],
    method: [
      "以 Newell & Simon 1972 的 production system 为理论底座：production 等于 (precondition, action)，由认知架构提供控制流挑选与执行。",
      "在统一框架下重述 ReAct、Reflexion、Voyager、Generative Agents 等 30 余个工作，标出各自用到的记忆与决策过程。",
    ],
    findings: [
      "指出现有工作的共同缺口：多数 agent 只用 episodic memory，缺 semantic 与 procedural memory 的沉淀；decision cycle 普遍缺 learning 过程。",
      "给出可操作设计建议：引入分层记忆与显式 decision cycle，让 agent 从经验中积累可复用知识。",
    ],
    limits: "框架是概念蓝图，本身不提供新算法；指导力取决于认知架构类比的准确程度。",
  },
  {
    topic: "多模态",
    title: "LLaVA：Visual Instruction Tuning 与 Improved Baselines",
    venue: "NeurIPS 2023 Oral / CVPR 2024",
    date: "2023-04",
    link: "https://arxiv.org/abs/2304.08485",
    summary:
      "复现开源 VLM 的必读书：冻结 CLIP 视觉塔加两层 MLP 投影器加视觉指令微调；LLaVA-1.5 仅靠数据配方改进即在 11 项基准 SOTA。",
    points: [
      "极简三件套：CLIP ViT-L/14 冻结取倒数第二层 patch 特征，两层 MLP 投影器把 576 个视觉 token 映射进 LLM 隐藏维度。",
      "Too Long to See：视觉指令微调后模型不会短答，单词作答的学术 VQA 崩溃；归因于 prompt 歧义与桥梁容量。",
      "修法是在问句尾加格式 prompt 并全量微调 LLM，用一句 prompt 替代重写数据。",
    ],
    method: [
      "LLaVA-1.5 的改进集中在数据配方：学术 VQA 与纯文本 VQA 混合、图像分辨率提升到 336。",
      "消融显示数据配方的贡献大于架构改动。",
    ],
    findings: [
      "MME 由 809.6 提升到 1469.2（7B），11 项基准 SOTA。",
      "投影器是全文最值得读代码的部分，视觉塔保持冻结。",
    ],
    limits: "表 2 的 GQA 62.0 训练图已见过（论文 2 表 2 星注），学术分数虚高。",
  },
  {
    topic: "推荐",
    title: "Semantic IDs for Music Recommendation",
    venue: "SiriusXM 工程报告",
    date: "",
    link: "",
    summary:
      "把 item 表示为 codeword 的 n 元组：相似 item 共享前段 codeword，替代庞大的 item embedding 表；对低反馈用户的准确率与多样性提升最明显。",
    points: [
      "动机：item embedding 耗时耗空间；hashing 会降低准确度；训练后矩阵分解无法覆盖新 item，且相对线上 full embedding 有更新延迟。",
      "semantic ID 把 item 表示为 n 元组 codeword（如 n=4、k=64），相似 item（同艺术家、同流派）共享前段 codeword。",
      "末位 code 用随机或递增方式分配，区分同 slot 下的不同歌曲。",
    ],
    method: [
      "对照实验：trained semantic IDs 与 randomly-generated IDs 分别替换 song embedding。",
      "比较是否额外加入 song metadata 两种条件。",
    ],
    findings: [
      "trained semantic IDs 替换 song embeddings 时优于 random IDs；但额外加入 metadata 后优势消失。",
      "论文建议：与其增加 hidden 维度，不如增大 semantic codebook 尺寸；semantic IDs 对 low-feedback users 的准确率与多样性提升最大。",
    ],
    limits: "code group 数量如何选、每组 code 代表什么含义域仍是开放问题；结论来自音乐场景。",
  },
];

const TOPIC_ORDER = ["智能体", "训练与对齐", "多模态", "安全评测", "推荐", "工程"];

const grid = document.getElementById("notes-grid");
const countEl = document.getElementById("notes-count");
const filterBar = document.getElementById("notes-filters");
const searchInput = document.getElementById("notes-search");
const dialog = document.getElementById("note-dialog");
const dialogInner = document.getElementById("note-dialog-inner");

let activeTopic = "全部";
let activeQuery = "";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function highlight(text, query) {
  const safe = escapeHtml(text);
  if (!query) return safe;
  const needle = escapeHtml(query).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return safe.replace(new RegExp(needle, "gi"), (match) => `<mark>${match}</mark>`);
}

function noteMatches(note, query) {
  if (!query) return true;
  const haystack = [
    note.topic,
    note.title,
    note.venue,
    note.summary,
    ...note.points,
    ...note.method,
    ...note.findings,
    note.limits,
  ]
    .join("\n")
    .toLowerCase();
  return haystack.includes(query.toLowerCase());
}

function visibleNotes() {
  return NOTES.filter(
    (note) =>
      (activeTopic === "全部" || note.topic === activeTopic) &&
      noteMatches(note, activeQuery)
  );
}

function renderFilters() {
  const counts = { 全部: NOTES.length };
  for (const topic of TOPIC_ORDER) {
    counts[topic] = NOTES.filter((note) => note.topic === topic).length;
  }
  filterBar.innerHTML = ["全部", ...TOPIC_ORDER]
    .map((topic) => {
      const active = topic === activeTopic ? " is-active" : "";
      return (
        `<button type="button" class="filter-chip${active}" data-topic="${escapeHtml(topic)}">` +
        `${escapeHtml(topic)}<span class="chip-count">${counts[topic]}</span>` +
        `</button>`
      );
    })
    .join("");
}

function renderCards() {
  const visible = visibleNotes();
  countEl.textContent = `${visible.length} / ${NOTES.length} 篇`;

  if (visible.length === 0) {
    grid.innerHTML = `<p class="notes-empty">没有匹配的笔记。</p>`;
    return;
  }

  grid.innerHTML = visible
    .map((note) => {
      const id = NOTES.indexOf(note);
      const dateBlock = note.date
        ? `<span class="note-date">${escapeHtml(note.date)}</span>`
        : "";
      return (
        `<article class="note-card" data-id="${id}" tabindex="0" role="button" ` +
        `aria-haspopup="dialog" aria-label="打开笔记：${escapeHtml(note.title)}">` +
        `<div class="note-rail">` +
        `<span class="note-tag">${highlight(note.topic, activeQuery)}</span>` +
        dateBlock +
        `</div>` +
        `<div class="note-body">` +
        `<h3 class="note-title">${highlight(note.title, activeQuery)}</h3>` +
        `<p class="note-summary">${highlight(note.summary, activeQuery)}</p>` +
        `<ul class="note-preview">` +
        note.points
          .slice(0, 2)
          .map((item) => `<li>${highlight(item, activeQuery)}</li>`)
          .join("") +
        `</ul>` +
        `<div class="note-foot">` +
        `<span class="note-venue">${highlight(note.venue, activeQuery)}</span>` +
        `<span class="note-open-hint">详情</span>` +
        `</div>` +
        `</div>` +
        `</article>`
      );
    })
    .join("");
}

function pointList(items, query) {
  return `<ul class="note-points">${items
    .map((item) => `<li>${highlight(item, query)}</li>`)
    .join("")}</ul>`;
}

function openDialog(note) {
  const dateText = note.date ? ` · ${escapeHtml(note.date)}` : "";
  const linkBlock = note.link
    ? `<p class="dialog-link"><a href="${escapeHtml(note.link)}" target="_blank" rel="noopener">原文与来源</a></p>`
    : "";
  dialogInner.innerHTML =
    `<div class="dialog-head">` +
    `<div class="dialog-meta">` +
    `<span class="note-tag">${escapeHtml(note.topic)}</span>` +
    `<span class="note-venue">${escapeHtml(note.venue)}${dateText}</span>` +
    `</div>` +
    `<button type="button" class="dialog-close">关闭</button>` +
    `</div>` +
    `<h3 class="note-title dialog-title">${escapeHtml(note.title)}</h3>` +
    `<p class="dialog-summary">${escapeHtml(note.summary)}</p>` +
    `<div class="dialog-section"><h4>要点</h4>${pointList(note.points, "")}</div>` +
    `<div class="dialog-section"><h4>方法与设计</h4>${pointList(note.method, "")}</div>` +
    `<div class="dialog-section"><h4>结果与结论</h4>${pointList(note.findings, "")}</div>` +
    `<div class="dialog-section"><h4>边界</h4><p class="note">${escapeHtml(note.limits)}</p></div>` +
    linkBlock;
  dialog.showModal();
}

function render() {
  renderFilters();
  renderCards();
}

filterBar.addEventListener("click", (event) => {
  const chip = event.target.closest(".filter-chip");
  if (!chip) return;
  activeTopic = chip.dataset.topic;
  render();
});

grid.addEventListener("click", (event) => {
  const card = event.target.closest(".note-card");
  if (!card) return;
  openDialog(NOTES[Number(card.dataset.id)]);
});

grid.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const card = event.target.closest(".note-card");
  if (!card) return;
  event.preventDefault();
  openDialog(NOTES[Number(card.dataset.id)]);
});

dialog.addEventListener("click", (event) => {
  // click on the backdrop (the dialog element itself) closes it
  if (event.target === dialog) dialog.close();
  if (event.target.closest(".dialog-close")) dialog.close();
});

let searchTimer = null;
searchInput.addEventListener("input", () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    activeQuery = searchInput.value.trim();
    renderCards();
  }, 120);
});

render();
