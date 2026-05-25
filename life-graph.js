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

  const nodeById = new Map(nodes.map((node) => [node.id, node]));
  for (const link of links) {
    link.sourceNode = nodeById.get(link.source);
    link.targetNode = nodeById.get(link.target);
  }

  const typeMeta = {
    north: { radius: 34, color: "#1f4e79" },
    self: { radius: 25, color: "#6b7280" },
    core: { radius: 29, color: "#2f6f5e" },
    value: { radius: 22, color: "#7a5b2e" },
    asset: { radius: 22, color: "#4b6584" },
    route: { radius: 24, color: "#735c8f" },
    gate: { radius: 26, color: "#8a3f3f" },
    maintain: { radius: 24, color: "#5b6f2f" },
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
    for (const node of nodes) {
      const [px, py] = positions[node.id] || [0.5, 0.5];
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
