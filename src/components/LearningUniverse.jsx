import { useState } from "react";

import { LEARNING_NODES } from "../data.js";

const proofByFocus = {
  "python-adventure": "/media/learning-scenes/python-path.webp",
  "competition-floor": "/media/learning-scenes/cpp-noi-path.webp",
  "ai-classroom": "/media/learning-scenes/ai-classroom-path.webp",
  "robot-competition-team": "/media/learning-scenes/robotics-path.webp",
  "code-research": "/media/learning-scenes/project-release-path.webp",
  "class-system": "/media/learning-scenes/service-loop-path.webp",
};

export default function LearningUniverse({ sectionId = "learning-universe" }) {
  const [activeId, setActiveId] = useState(LEARNING_NODES[0].id);
  const activeNode = LEARNING_NODES.find((node) => node.id === activeId) ?? LEARNING_NODES[0];

  return (
    <section id={sectionId} data-testid="learning-universe" className="learning-universe-section">
      <div className="section-shell learning-universe-shell">
        <div className="section-kicker">Interactive Map</div>
        <div className="learning-universe-head">
          <h2>学习宇宙控制台</h2>
          <p>把课程、项目和竞赛整理成 6 条清晰路径，点击节点就能看到对应的学习现场。</p>
        </div>

        <div className="learning-universe-grid">
          <div className="learning-orbit" aria-label="学习方向节点">
            <div className="learning-starfield" aria-hidden="true">
              {Array.from({ length: 16 }, (_, index) => (
                <span
                  key={index}
                  style={{
                    "--star-index": index,
                    "--star-x": `${10 + ((index * 37) % 80)}%`,
                    "--star-y": `${9 + ((index * 53) % 78)}%`,
                  }}
                />
              ))}
            </div>
            <div className="learning-orbit-ring learning-orbit-ring-1" aria-hidden="true" />
            <div className="learning-orbit-ring learning-orbit-ring-2" aria-hidden="true" />
            <div className="learning-orbit-ring learning-orbit-ring-3" aria-hidden="true" />
            <div className="learning-comet" aria-hidden="true" />
            <div className="learning-orbit-core" aria-hidden="true">
              <strong>学习路径</strong>
              <span>PATH MAP</span>
            </div>
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
                <i aria-hidden="true" />
                <span>{node.title}</span>
              </button>
            ))}
          </div>

          <article className="learning-node-panel interactive-surface">
            <div className="learning-proof-visual" data-testid="learning-proof-visual">
              <img
                key={activeNode.id}
                src={proofByFocus[activeNode.focus]}
                alt={`${activeNode.title} 学习现场`}
                data-testid="learning-proof-image"
                loading="lazy"
                decoding="async"
              />
              <div className="learning-proof-scan" aria-hidden="true" />
              <div className="learning-proof-caption">
                <p className="panel-index">Selected Path</p>
                <h3>{activeNode.title}</h3>
                <strong>{activeNode.subtitle}</strong>
              </div>
            </div>
            <div className="learning-node-copy">
              <p>{activeNode.description}</p>
              <div className="chip-row">
                {activeNode.chips.map((chip) => (
                  <span key={chip}>{chip}</span>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
