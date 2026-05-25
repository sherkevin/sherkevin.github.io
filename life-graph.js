(() => {
  const root = document.querySelector("[data-life-graph]");
  if (!root) return;

  const svg = root.querySelector("[data-graph-svg]");
  const detail = root.querySelector("[data-node-detail]");
  const resetButton = root.querySelector("[data-reset-graph]");

  const nodes = [
    {
      id: "north-star",
      label: "北极星",
      type: "north",
      detail: "AI 技术底座 + 问题定义 + 系统落地 + 解释权。长期目标不是单一职业标签，而是能解释系统边界的人。",
    },
    {
      id: "self",
      label: "稳定画像",
      type: "self",
      detail: "强自证驱动、高自主需求、深度表达需求、教育影响欲望、身体边界、身份未锁死。",
    },
    {
      id: "agent",
      label: "Agent主线",
      type: "core",
      detail: "持续探索 Agent 在 RAG、Tool Use、推荐、专业任务、教育工具中的落地方式。",
    },
    {
      id: "explain",
      label: "解释权",
      type: "value",
      detail: "能否参与定义问题、指标、方案和边界，是长期选择的最高优先级。",
    },
    {
      id: "transfer",
      label: "迁移能力",
      type: "value",
      detail: "经历是否能跨互联网、科研、教育、产品继续复用。",
    },
    {
      id: "people",
      label: "高质量人群",
      type: "value",
      detail: "周围是否有专业能力、好奇心和长期主义。",
    },
    {
      id: "output",
      label: "可展示产出",
      type: "value",
      detail: "是否沉淀论文、开源、benchmark、技术报告、系统模块、指标或推荐。",
    },
    {
      id: "health",
      label: "身体可持续",
      type: "value",
      detail: "睡眠、恢复、长期学习空间是硬边界，不把持续硬扛当成默认策略。",
    },
    {
      id: "short-term",
      label: "短期收益",
      type: "value",
      detail: "薪资、title 和短期机会重要，但不压倒解释权、迁移能力、产出和身体边界。",
    },
    {
      id: "agent-assets",
      label: "Agent资产",
      type: "asset",
      detail: "Agent Infra、RAG、多智能体、工具调用、失败恢复和评测闭环。",
    },
    {
      id: "rec-assets",
      label: "推荐评测资产",
      type: "asset",
      detail: "MiniMax、RecSys、LLM4Rec、多模态召回、固定预算评测和业务闭环。",
    },
    {
      id: "research-assets",
      label: "研究写作资产",
      type: "asset",
      detail: "论文、技术报告、实验复盘、方法边界和可验证表达。",
    },
    {
      id: "education-assets",
      label: "教育表达资产",
      type: "asset",
      detail: "县城突围叙事、竞赛训练、AI 教育作品、课程化表达和学生可运行实验。",
    },
    {
      id: "internet",
      label: "互联网AI",
      type: "route",
      detail: "强化推荐、搜索、评测、业务指标和工程落地信号。",
    },
    {
      id: "research-agent",
      label: "科研Agent",
      type: "route",
      detail: "强化专业任务中的工具链、数据结构、评测标准和专家反馈。",
    },
    {
      id: "tech-product",
      label: "技术产品",
      type: "route",
      detail: "连接技术方案、场景判断、表达输出和系统方法。",
    },
    {
      id: "teacher",
      label: "科创教育",
      type: "route",
      detail: "把技术理解转化为课程、竞赛、社团和长期影响。",
    },
    {
      id: "stable",
      label: "稳定路线",
      type: "route",
      detail: "作为备选路径管理，需要单独验证自主度、技术密度、城市和制度边界。",
    },
    {
      id: "gate",
      label: "决策门槛",
      type: "gate",
      detail: "短期机会要检查 owner 模块、反馈闭环、可展示产出、解释权和身体可持续。",
    },
    {
      id: "maintain",
      label: "维护闭环",
      type: "maintain",
      detail: "新的问题先进入本地知识库；只把稳定、可公开、长期有效的结构同步到主页。",
    },
  ];

  nodes.push(
    {
      id: "self-proof",
      label: "自证驱动",
      type: "self",
      detail: "从资源有限环境一路进入更高平台，长期动力来自自我塑造和证明自己。",
    },
    {
      id: "autonomy",
      label: "高自主需求",
      type: "self",
      detail: "不适合长期只执行、被切碎、无解释权的位置。",
    },
    {
      id: "deep-expression",
      label: "深度表达",
      type: "self",
      detail: "适合有内容、有准备、有专业身份的表达，不适合浅层社交消耗。",
    },
    {
      id: "education-impact",
      label: "教育影响",
      type: "self",
      detail: "长期存在影响他人、组织知识和教育启蒙的动机。",
    },
    {
      id: "body-boundary",
      label: "身体边界",
      type: "self",
      detail: "睡眠和恢复不是软约束，不能把持续硬扛当作职业策略。",
    },
    {
      id: "identity-open",
      label: "身份开放",
      type: "self",
      detail: "互联网、科研、教育和稳定路线都保留可能，但不急于锁死标签。",
    },
    {
      id: "county-origin",
      label: "县城突围",
      type: "self",
      detail: "早期信息和资源约束强化了对解释权、上升通道和教育公平的敏感度。",
    },
    {
      id: "competition-drive",
      label: "竞赛训练",
      type: "self",
      detail: "竞赛和算法训练带来结构化拆题、快速反馈和强目标感。",
    },
    {
      id: "definition-right",
      label: "定义问题",
      type: "value",
      detail: "能否参与定义任务、目标、输入输出和约束，是解释权的第一层。",
    },
    {
      id: "metric-right",
      label: "定义评测",
      type: "value",
      detail: "能否参与指标、benchmark、验收标准和失败边界的制定。",
    },
    {
      id: "transfer-scope",
      label: "跨域复用",
      type: "value",
      detail: "一段经历能否迁移到 Agent、推荐、科研、教育和产品多个方向。",
    },
    {
      id: "artifact-power",
      label: "作品沉淀",
      type: "value",
      detail: "能否沉淀外部可理解、可验证、可复盘的成果。",
    },
    {
      id: "people-quality",
      label: "人群质量",
      type: "value",
      detail: "是否能进入高密度讨论环境，接触专业、好奇、长期主义的人。",
    },
    {
      id: "recovery-space",
      label: "恢复空间",
      type: "value",
      detail: "是否保留睡眠、恢复、学习、准备下一步的空间。",
    },
    {
      id: "option-value",
      label: "选择权",
      type: "value",
      detail: "主线不完全确定时，优先选择能保留高质量分叉的经历。",
    },
    {
      id: "api-contracts",
      label: "API契约",
      type: "asset",
      detail: "企业 API 工具化、tool schema、错误码、调用示例和工具可发现性。",
    },
    {
      id: "schema-permission",
      label: "权限边界",
      type: "asset",
      detail: "Agent 工具调用中的 role、permission、risk gate 和失败恢复边界。",
    },
    {
      id: "rag-citation",
      label: "RAG证据链",
      type: "asset",
      detail: "检索、引用、拒答、证据强度和人工升级机制。",
    },
    {
      id: "diagnosis-agent",
      label: "诊断Agent",
      type: "asset",
      detail: "面向专业任务的 parser、retrieval、diagnosis、SOP、verification 工作流。",
    },
    {
      id: "multimodal-recall",
      label: "多模态召回",
      type: "asset",
      detail: "图像语义、文本相似度、音色 embedding 和多路召回融合。",
    },
    {
      id: "recsys-eval",
      label: "推荐评测",
      type: "asset",
      detail: "固定候选预算、Recall@K、HitRate@K、长尾覆盖和离线消融。",
    },
    {
      id: "recsys-papers",
      label: "RecSys论文",
      type: "asset",
      detail: "推荐关系纠偏、Top-K 停止策略和面向排序/停止决策的研究表达。",
    },
    {
      id: "research-writing",
      label: "研究写作",
      type: "asset",
      detail: "问题定义、实验边界、反证、消融和论文叙事能力。",
    },
    {
      id: "ai-education-labs",
      label: "AI课程实验",
      type: "asset",
      detail: "证据问答、图像检索、可运行实验室和过程性评价。",
    },
    {
      id: "teaching-narrative",
      label: "教师叙事",
      type: "asset",
      detail: "县城突围、竞赛经历、AI 素养课程和科创教育的组合叙事。",
    },
    {
      id: "llm-app-algo",
      label: "LLM应用算法",
      type: "route",
      detail: "面向真实任务的 RAG、Tool Use、Agent workflow 和评测闭环。",
    },
    {
      id: "llm4rec-route",
      label: "LLM4Rec",
      type: "route",
      detail: "大模型推荐、生成式召回、多模态内容理解和业务指标闭环。",
    },
    {
      id: "agent-platform",
      label: "Agent平台",
      type: "route",
      detail: "工具注册、权限边界、执行轨迹、失败恢复和观测性。",
    },
    {
      id: "scientific-agent",
      label: "科学Agent",
      type: "route",
      detail: "专业工具链、结构化数据、评测标准和专家反馈之间的接口。",
    },
    {
      id: "education-product",
      label: "教育科技",
      type: "route",
      detail: "把 AI 系统、课程内容、学习反馈和可运行实验连接起来。",
    },
    {
      id: "high-school-cs",
      label: "高中计算机",
      type: "route",
      detail: "计算机教师、信息技术课程、科创社团和竞赛启蒙。",
    },
    {
      id: "state-owned",
      label: "稳定机构",
      type: "route",
      detail: "稳定路线可保留，但要验证自主度、技术密度、城市和制度边界。",
    },
    {
      id: "low-autonomy",
      label: "低自主",
      type: "risk",
      detail: "只执行、无定义权、无反馈权，会持续消耗主线能量。",
    },
    {
      id: "no-feedback",
      label: "低反馈",
      type: "risk",
      detail: "任务没有清晰评价和反馈，容易变成长期低效消耗。",
    },
    {
      id: "no-artifact",
      label: "无产出",
      type: "risk",
      detail: "没有论文、报告、系统模块、指标或公开作品，经历难以迁移。",
    },
    {
      id: "body-overdraft",
      label: "身体透支",
      type: "risk",
      detail: "高强度如果长期不可恢复，会破坏后续选择权。",
    },
    {
      id: "premature-lockin",
      label: "过早锁死",
      type: "risk",
      detail: "在主线尚未完全确定时，不宜过早关闭科研、教育或产品分叉。",
    },
    {
      id: "stable-stifled",
      label: "稳定但压抑",
      type: "risk",
      detail: "稳定路线如果技术密度低、层级重、表达权弱，会带来长期压抑。",
    },
    {
      id: "demo-only",
      label: "Demo陷阱",
      type: "risk",
      detail: "名义 AI 但没有真实任务、评测、数据和反馈，价值会快速下降。",
    },
    {
      id: "mentor-gate",
      label: "导师机制",
      type: "decision",
      detail: "是否有直接指导人、反馈频率和可对齐的技术边界。",
    },
    {
      id: "owner-gate",
      label: "Owner模块",
      type: "decision",
      detail: "是否有明确负责模块，而不是长期边缘支持。",
    },
    {
      id: "feedback-gate",
      label: "反馈闭环",
      type: "decision",
      detail: "是否有评测、指标、专家反馈、用户反馈或实验验证。",
    },
    {
      id: "artifact-gate",
      label: "产出门槛",
      type: "decision",
      detail: "是否能沉淀非敏感的报告、benchmark、系统设计、论文或开源。",
    },
    {
      id: "public-safe-gate",
      label: "可公开边界",
      type: "decision",
      detail: "公开表达必须只呈现稳定结构，不暴露未公开机会和私人复盘。",
    },
    {
      id: "cadence-gate",
      label: "节奏边界",
      type: "decision",
      detail: "能接受阶段性冲刺，但需要目标和节奏清晰，避免长期失控。",
    },
    {
      id: "two-week-review",
      label: "两周复盘",
      type: "decision",
      detail: "进入新环境两周后检查 mentor、任务、节奏和反馈是否清晰。",
    },
    {
      id: "one-month-review",
      label: "一月复盘",
      type: "decision",
      detail: "一个月后检查是否已有可展示模块、评测或产出方向。",
    },
    {
      id: "autumn-story",
      label: "秋招叙事",
      type: "decision",
      detail: "秋招前检查经历能否讲成可验证、可复盘、可迁移的 Agent 系统。",
    },
    {
      id: "local-knowledge",
      label: "本地图谱",
      type: "maintain",
      detail: "完整人生知识图谱、决策账本和私人复盘保留在本地仓库。",
    },
    {
      id: "public-graph",
      label: "公开主页",
      type: "maintain",
      detail: "GitHub 主页只展示稳定、可公开、长期有效的结构。",
    },
    {
      id: "decision-ledger",
      label: "决策账本",
      type: "maintain",
      detail: "重大选择记录背景、证据、反证、结论、边界和复盘点。",
    },
    {
      id: "qa-log",
      label: "问答日志",
      type: "maintain",
      detail: "每次职业、价值、路径、面试相关问答都沉淀摘要和稳定洞察。",
    },
    {
      id: "update-loop",
      label: "更新闭环",
      type: "maintain",
      detail: "新洞察先进入本地，再判断是否同步到公开图谱。",
    },
  );

  const links = [
    ["self", "north-star", "约束"],
    ["agent", "north-star", "主线"],
    ["explain", "gate", "价值"],
    ["transfer", "gate", "价值"],
    ["people", "gate", "价值"],
    ["output", "gate", "价值"],
    ["health", "gate", "硬边界"],
    ["short-term", "gate", "次级收益"],
    ["gate", "north-star", "筛选"],
    ["agent-assets", "agent", "支撑"],
    ["rec-assets", "agent", "支撑"],
    ["research-assets", "agent", "支撑"],
    ["education-assets", "north-star", "支撑"],
    ["agent-assets", "internet", "迁移"],
    ["rec-assets", "internet", "迁移"],
    ["agent-assets", "research-agent", "迁移"],
    ["research-assets", "research-agent", "迁移"],
    ["agent-assets", "tech-product", "迁移"],
    ["education-assets", "tech-product", "迁移"],
    ["education-assets", "teacher", "迁移"],
    ["research-assets", "teacher", "迁移"],
    ["self", "teacher", "影响"],
    ["self", "stable", "边界"],
    ["internet", "north-star", "路径"],
    ["research-agent", "north-star", "路径"],
    ["tech-product", "north-star", "路径"],
    ["teacher", "north-star", "路径"],
    ["stable", "north-star", "备选"],
    ["maintain", "self", "更新"],
    ["maintain", "gate", "复盘"],
    ["maintain", "north-star", "校准"],
  ].map(([source, target, label]) => ({ source, target, label }));

  links.push(
    ...[
      ["self-proof", "self", "细分"],
      ["autonomy", "self", "细分"],
      ["deep-expression", "self", "细分"],
      ["education-impact", "self", "细分"],
      ["body-boundary", "self", "细分"],
      ["identity-open", "self", "细分"],
      ["county-origin", "self", "来源"],
      ["competition-drive", "self", "来源"],
      ["self-proof", "north-star", "驱动"],
      ["autonomy", "explain", "需求"],
      ["deep-expression", "tech-product", "适配"],
      ["education-impact", "teacher", "适配"],
      ["body-boundary", "health", "约束"],
      ["identity-open", "option-value", "保留"],
      ["county-origin", "education-impact", "影响"],
      ["competition-drive", "research-writing", "支撑"],
      ["definition-right", "explain", "细分"],
      ["metric-right", "explain", "细分"],
      ["transfer-scope", "transfer", "细分"],
      ["artifact-power", "output", "细分"],
      ["people-quality", "people", "细分"],
      ["recovery-space", "health", "细分"],
      ["option-value", "transfer", "细分"],
      ["definition-right", "gate", "筛选"],
      ["metric-right", "gate", "筛选"],
      ["artifact-power", "artifact-gate", "筛选"],
      ["recovery-space", "cadence-gate", "筛选"],
      ["api-contracts", "agent-assets", "细分"],
      ["schema-permission", "agent-assets", "细分"],
      ["rag-citation", "agent-assets", "细分"],
      ["diagnosis-agent", "agent-assets", "细分"],
      ["multimodal-recall", "rec-assets", "细分"],
      ["recsys-eval", "rec-assets", "细分"],
      ["recsys-papers", "research-assets", "细分"],
      ["research-writing", "research-assets", "细分"],
      ["ai-education-labs", "education-assets", "细分"],
      ["teaching-narrative", "education-assets", "细分"],
      ["api-contracts", "agent-platform", "支撑"],
      ["schema-permission", "agent-platform", "支撑"],
      ["rag-citation", "llm-app-algo", "支撑"],
      ["diagnosis-agent", "scientific-agent", "支撑"],
      ["multimodal-recall", "llm4rec-route", "支撑"],
      ["recsys-eval", "llm4rec-route", "支撑"],
      ["recsys-papers", "internet", "信号"],
      ["research-writing", "research-agent", "支撑"],
      ["ai-education-labs", "education-product", "支撑"],
      ["teaching-narrative", "high-school-cs", "支撑"],
      ["llm-app-algo", "agent", "路径"],
      ["llm4rec-route", "internet", "路径"],
      ["agent-platform", "tech-product", "路径"],
      ["scientific-agent", "research-agent", "路径"],
      ["education-product", "tech-product", "路径"],
      ["high-school-cs", "teacher", "路径"],
      ["state-owned", "stable", "路径"],
      ["low-autonomy", "gate", "规避"],
      ["no-feedback", "feedback-gate", "规避"],
      ["no-artifact", "artifact-gate", "规避"],
      ["body-overdraft", "cadence-gate", "规避"],
      ["premature-lockin", "option-value", "规避"],
      ["stable-stifled", "stable", "警惕"],
      ["demo-only", "owner-gate", "规避"],
      ["demo-only", "feedback-gate", "规避"],
      ["mentor-gate", "gate", "门槛"],
      ["owner-gate", "gate", "门槛"],
      ["feedback-gate", "gate", "门槛"],
      ["artifact-gate", "gate", "门槛"],
      ["public-safe-gate", "gate", "门槛"],
      ["cadence-gate", "gate", "门槛"],
      ["two-week-review", "maintain", "复盘"],
      ["one-month-review", "maintain", "复盘"],
      ["autumn-story", "maintain", "复盘"],
      ["local-knowledge", "maintain", "管理"],
      ["public-graph", "maintain", "管理"],
      ["decision-ledger", "maintain", "管理"],
      ["qa-log", "maintain", "管理"],
      ["update-loop", "maintain", "管理"],
      ["decision-ledger", "gate", "记录"],
      ["qa-log", "self", "沉淀"],
      ["local-knowledge", "public-graph", "筛选"],
      ["update-loop", "public-graph", "同步"],
    ].map(([source, target, label]) => ({ source, target, label }))
  );

  const nodeById = new Map(nodes.map((node) => [node.id, node]));
  for (const link of links) {
    link.sourceNode = nodeById.get(link.source);
    link.targetNode = nodeById.get(link.target);
  }

  const typeMeta = {
    north: { radius: 34, color: "#1f4e79" },
    self: { radius: 20, color: "#6b7280" },
    core: { radius: 26, color: "#2f6f5e" },
    value: { radius: 18, color: "#7a5b2e" },
    asset: { radius: 18, color: "#4b6584" },
    route: { radius: 19, color: "#735c8f" },
    risk: { radius: 18, color: "#8a3f3f" },
    decision: { radius: 18, color: "#0f766e" },
    gate: { radius: 26, color: "#0f766e" },
    maintain: { radius: 19, color: "#5b6f2f" },
  };

  const state = {
    width: 760,
    height: 520,
    scale: 1,
    offsetX: 0,
    offsetY: 0,
    selected: "north-star",
    alpha: 1,
    draggingNode: null,
    panning: null,
    pointerId: null,
    raf: null,
  };

  const ns = "http://www.w3.org/2000/svg";
  const viewport = document.createElementNS(ns, "g");
  const linkLayer = document.createElementNS(ns, "g");
  const nodeLayer = document.createElementNS(ns, "g");
  viewport.append(linkLayer, nodeLayer);
  svg.append(viewport);

  function createSvgElement(name, attrs = {}) {
    const element = document.createElementNS(ns, name);
    for (const [key, value] of Object.entries(attrs)) {
      element.setAttribute(key, value);
    }
    return element;
  }

  for (const link of links) {
    link.element = createSvgElement("line", { class: "graph-link" });
    linkLayer.append(link.element);
  }

  for (const node of nodes) {
    const meta = typeMeta[node.type];
    const labelLines = splitLabel(node.label);
    node.radius = meta.radius;
    node.x = state.width / 2 + (Math.random() - 0.5) * 360;
    node.y = state.height / 2 + (Math.random() - 0.5) * 260;
    node.vx = 0;
    node.vy = 0;
    node.group = createSvgElement("g", {
      class: `graph-node graph-node-${node.type}`,
      tabindex: "0",
      role: "button",
      "aria-label": node.label,
    });
    node.circle = createSvgElement("circle", {
      r: node.radius,
      fill: meta.color,
    });
    node.text = createSvgElement("text", {
      "text-anchor": "middle",
      "dominant-baseline": "middle",
    });
    for (const [index, line] of labelLines.entries()) {
      const tspan = createSvgElement("tspan", {
        x: 0,
        dy: index === 0 ? `${-(labelLines.length - 1) * 0.55}em` : "1.1em",
      });
      tspan.textContent = line;
      node.text.append(tspan);
    }
    node.group.append(node.circle, node.text);
    nodeLayer.append(node.group);
  }

  resetLayout();
  setSelected("north-star");
  attachEvents();
  resize();

  function splitLabel(label) {
    if (label.length <= 5) return [label];
    if (label.includes("/")) return label.split("/").map((part) => part.trim());
    const lines = [];
    for (let i = 0; i < label.length; i += 5) {
      lines.push(label.slice(i, i + 5));
    }
    return lines.slice(0, 3);
  }

  function resetLayout() {
    const positions = {
      "north-star": [0.5, 0.48],
      self: [0.18, 0.2],
      agent: [0.2, 0.48],
      gate: [0.5, 0.78],
      maintain: [0.82, 0.78],
      explain: [0.42, 0.16],
      transfer: [0.56, 0.16],
      people: [0.7, 0.24],
      output: [0.78, 0.45],
      health: [0.68, 0.65],
      "short-term": [0.33, 0.7],
      "agent-assets": [0.13, 0.7],
      "rec-assets": [0.12, 0.36],
      "research-assets": [0.33, 0.86],
      "education-assets": [0.62, 0.9],
      internet: [0.08, 0.52],
      "research-agent": [0.5, 0.28],
      "tech-product": [0.88, 0.55],
      teacher: [0.84, 0.3],
      stable: [0.92, 0.72],
    };
    const centers = {
      north: [0.5, 0.46],
      self: [0.16, 0.22],
      core: [0.22, 0.5],
      value: [0.48, 0.16],
      asset: [0.18, 0.72],
      route: [0.82, 0.54],
      risk: [0.82, 0.22],
      decision: [0.52, 0.82],
      gate: [0.5, 0.74],
      maintain: [0.78, 0.84],
    };
    const clusterRadius = {
      self: [0.11, 0.14],
      value: [0.18, 0.09],
      asset: [0.14, 0.16],
      route: [0.13, 0.17],
      risk: [0.11, 0.13],
      decision: [0.18, 0.08],
      maintain: [0.12, 0.08],
    };
    const grouped = nodes.reduce((groups, node) => {
      if (!groups.has(node.type)) groups.set(node.type, []);
      groups.get(node.type).push(node);
      return groups;
    }, new Map());
    for (const node of nodes) {
      let px;
      let py;
      if (positions[node.id]) {
        [px, py] = positions[node.id];
      } else {
        const group = grouped.get(node.type) || [node];
        const index = group.indexOf(node);
        const count = Math.max(group.length, 1);
        const [cx, cy] = centers[node.type] || [0.5, 0.5];
        const [rx, ry] = clusterRadius[node.type] || [0.08, 0.08];
        const angle = -Math.PI / 2 + (Math.PI * 2 * index) / count;
        px = clamp(cx + Math.cos(angle) * rx, 0.06, 0.94);
        py = clamp(cy + Math.sin(angle) * ry, 0.08, 0.92);
      }
      node.x = state.width * px;
      node.y = state.height * py;
      node.vx = 0;
      node.vy = 0;
      node.fx = null;
      node.fy = null;
    }
    state.scale = 1;
    state.offsetX = 0;
    state.offsetY = 0;
    heat(0.8);
    render();
  }

  function attachEvents() {
    window.addEventListener("resize", resize);
    resetButton.addEventListener("click", resetLayout);

    svg.addEventListener("wheel", (event) => {
      event.preventDefault();
      const rect = svg.getBoundingClientRect();
      const pointerX = event.clientX - rect.left;
      const pointerY = event.clientY - rect.top;
      const graphPoint = screenToGraph(pointerX, pointerY);
      const factor = event.deltaY < 0 ? 1.08 : 0.92;
      state.scale = clamp(state.scale * factor, 0.6, 2.4);
      state.offsetX = pointerX - graphPoint.x * state.scale;
      state.offsetY = pointerY - graphPoint.y * state.scale;
      render();
    }, { passive: false });

    svg.addEventListener("pointerdown", (event) => {
      const targetNode = nodes.find((node) => node.group === event.target.closest(".graph-node"));
      try {
        svg.setPointerCapture(event.pointerId);
      } catch {
        // Synthetic test events do not always create an active pointer.
      }
      state.pointerId = event.pointerId;
      if (targetNode) {
        state.draggingNode = targetNode;
        const point = eventToGraph(event);
        targetNode.fx = point.x;
        targetNode.fy = point.y;
        setSelected(targetNode.id);
        heat(0.35);
      } else {
        state.panning = {
          startX: event.clientX,
          startY: event.clientY,
          offsetX: state.offsetX,
          offsetY: state.offsetY,
        };
      }
    });

    svg.addEventListener("pointermove", (event) => {
      if (state.pointerId !== event.pointerId) return;
      if (state.draggingNode) {
        const point = eventToGraph(event);
        state.draggingNode.fx = point.x;
        state.draggingNode.fy = point.y;
        heat(0.25);
      } else if (state.panning) {
        state.offsetX = state.panning.offsetX + event.clientX - state.panning.startX;
        state.offsetY = state.panning.offsetY + event.clientY - state.panning.startY;
        render();
      }
    });

    svg.addEventListener("pointerup", releasePointer);
    svg.addEventListener("pointercancel", releasePointer);

    for (const node of nodes) {
      node.group.addEventListener("click", () => setSelected(node.id));
      node.group.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setSelected(node.id);
        }
      });
    }
  }

  function releasePointer(event) {
    if (state.pointerId !== event.pointerId) return;
    if (state.draggingNode) {
      state.draggingNode.x = state.draggingNode.fx;
      state.draggingNode.y = state.draggingNode.fy;
      state.draggingNode.fx = null;
      state.draggingNode.fy = null;
    }
    state.draggingNode = null;
    state.panning = null;
    state.pointerId = null;
  }

  function resize() {
    const rect = svg.getBoundingClientRect();
    state.width = Math.max(rect.width || 760, 320);
    state.height = Math.max(rect.height || 520, 420);
    svg.setAttribute("viewBox", `0 0 ${state.width} ${state.height}`);
    render();
  }

  function heat(alpha) {
    state.alpha = Math.max(state.alpha, alpha);
    if (!state.raf) {
      state.raf = requestAnimationFrame(tick);
    }
  }

  function tick() {
    state.raf = null;
    if (state.alpha < 0.003) {
      state.alpha = 0;
      render();
      return;
    }
    simulate(state.alpha);
    state.alpha *= 0.94;
    render();
    state.raf = requestAnimationFrame(tick);
  }

  function simulate(alpha) {
    const centerX = state.width / 2;
    const centerY = state.height / 2;

    for (const link of links) {
      const source = link.sourceNode;
      const target = link.targetNode;
      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const distance = Math.max(Math.hypot(dx, dy), 1);
      const ideal = source.type === "north" || target.type === "north" ? 150 : 118;
      const strength = 0.035 * alpha;
      const force = (distance - ideal) * strength;
      const fx = (dx / distance) * force;
      const fy = (dy / distance) * force;
      if (source.fx == null) {
        source.vx += fx;
        source.vy += fy;
      }
      if (target.fx == null) {
        target.vx -= fx;
        target.vy -= fy;
      }
    }

    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const distance = Math.max(Math.hypot(dx, dy), 1);
        const minDistance = a.radius + b.radius + 24;
        const charge = distance < minDistance ? (minDistance - distance) * 0.09 : 260 / (distance * distance);
        const fx = (dx / distance) * charge * alpha;
        const fy = (dy / distance) * charge * alpha;
        if (a.fx == null) {
          a.vx -= fx;
          a.vy -= fy;
        }
        if (b.fx == null) {
          b.vx += fx;
          b.vy += fy;
        }
      }
    }

    for (const node of nodes) {
      if (node.fx != null && node.fy != null) {
        node.x = node.fx;
        node.y = node.fy;
        node.vx = 0;
        node.vy = 0;
      } else {
        node.vx += (centerX - node.x) * 0.006 * alpha;
        node.vy += (centerY - node.y) * 0.006 * alpha;
        node.vx *= 0.82;
        node.vy *= 0.82;
        node.x += node.vx;
        node.y += node.vy;
        node.x = clamp(node.x, node.radius + 8, state.width - node.radius - 8);
        node.y = clamp(node.y, node.radius + 8, state.height - node.radius - 8);
      }
    }
  }

  function render() {
    viewport.setAttribute("transform", `translate(${state.offsetX},${state.offsetY}) scale(${state.scale})`);
    const selected = nodeById.get(state.selected);
    const neighbors = new Set([selected?.id]);
    for (const link of links) {
      if (link.source === state.selected) neighbors.add(link.target);
      if (link.target === state.selected) neighbors.add(link.source);
    }

    for (const link of links) {
      const source = link.sourceNode;
      const target = link.targetNode;
      link.element.setAttribute("x1", source.x);
      link.element.setAttribute("y1", source.y);
      link.element.setAttribute("x2", target.x);
      link.element.setAttribute("y2", target.y);
      link.element.classList.toggle("is-active", link.source === state.selected || link.target === state.selected);
    }

    for (const node of nodes) {
      node.group.setAttribute("transform", `translate(${node.x},${node.y})`);
      node.group.classList.toggle("is-selected", node.id === state.selected);
      node.group.classList.toggle("is-dimmed", selected && !neighbors.has(node.id));
    }
  }

  function setSelected(id) {
    const node = nodeById.get(id);
    if (!node) return;
    state.selected = id;
    detail.querySelector("span").textContent = typeLabel(node.type);
    detail.querySelector("h3").textContent = node.label;
    detail.querySelector("p").textContent = node.detail;
    render();
  }

  function typeLabel(type) {
    return {
      north: "北极星",
      self: "自我画像",
      core: "技术主线",
      value: "价值节点",
      asset: "资产节点",
      route: "路径节点",
      risk: "风险节点",
      decision: "决策节点",
      gate: "决策节点",
      maintain: "维护节点",
    }[type] || "节点";
  }

  function screenToGraph(x, y) {
    return {
      x: (x - state.offsetX) / state.scale,
      y: (y - state.offsetY) / state.scale,
    };
  }

  function eventToGraph(event) {
    const rect = svg.getBoundingClientRect();
    return screenToGraph(event.clientX - rect.left, event.clientY - rect.top);
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
})();
