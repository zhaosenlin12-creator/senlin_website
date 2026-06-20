import { useState } from "react";

import { LEARNING_NODES } from "../data.js";

export default function LearningUniverse() {
  const [activeId, setActiveId] = useState(LEARNING_NODES[0].id);
  const activeNode = LEARNING_NODES.find((node) => node.id === activeId) ?? LEARNING_NODES[0];

  return (
    <section id="learning-universe" data-testid="learning-universe" className="learning-universe-section">
      <div className="section-shell learning-universe-shell">
        <div className="section-kicker">Interactive Map</div>
        <div className="learning-universe-head">
          <h2>学习宇宙控制台</h2>
          <p>
            这里借一点 Bruno Simon 式的探索感，但把它收进一个可读、可触摸的教育地图里。
            每个节点都是森林老师正在搭建的一条学习路径。
          </p>
        </div>

        <div className="learning-universe-grid">
          <div className="learning-orbit" aria-label="学习方向节点">
            {LEARNING_NODES.map((node, index) => (
              <button
                key={node.id}
                type="button"
                data-testid={`learning-node-${node.id}`}
                className={`learning-node ${node.id === activeId ? "is-active" : ""}`}
                style={{
                  "--node-index": index,
                  "--node-total": LEARNING_NODES.length,
                }}
                onClick={() => setActiveId(node.id)}
              >
                <span>{node.title}</span>
              </button>
            ))}
          </div>

          <article className="learning-node-panel">
            <p className="panel-index">Selected Path</p>
            <h3>{activeNode.title}</h3>
            <strong>{activeNode.subtitle}</strong>
            <p>{activeNode.description}</p>
            <div className="chip-row">
              {activeNode.chips.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
