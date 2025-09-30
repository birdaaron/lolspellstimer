import Spells from "./spells";
import { useState } from "react";
import "./App.css";
import { spellsIcons } from "./spellsData";

function ChangePanel({ onSelect }) {
  return (
    <div className="setting-panel">
      {Object.entries(spellsIcons).map(([key, value]) => (
        <button
          className="setting-panel-spell-btn"
          key={key}
          onClick={() => onSelect(key)}
        >
          <img src={value.icon} />
        </button>
      ))}
    </div>
  );
}
function CdOption({ icon, enabled, onToggle }) {
  return (
    <div
      className={`cd-option ${enabled ? "enabled" : "disabled"}`}
      onClick={onToggle}
    >
      <img src={icon} alt="" />
      <div className="overlay"></div>
    </div>
  );
}

function CdWrapper({
  bootsEnabled,
  cosmicEnabled,
  setBootsEnabled,
  setCosmicEnabled,
}) {
  return (
    <div className="cd-wrapper">
      <CdOption
        icon="/assets/boots.png"
        enabled={bootsEnabled}
        onToggle={() => setBootsEnabled(!bootsEnabled)}
      />
      <CdOption
        icon="/assets/CosmicInsight.png"
        enabled={cosmicEnabled}
        onToggle={() => setCosmicEnabled(!cosmicEnabled)}
      />
    </div>
  );
}

function App() {
  const defaultSettings = {
    top: ["flash", "teleport"],
    jug: ["flash", "smite"],
    mid: ["flash", "ignite"],
    bot: ["flash", "barrier"],
    sup: ["flash", "ignite"],
  };
  const defaultCDSettings = {
    top: { boots: false, cosmic: false },
    jug: { boots: false, cosmic: false },
    mid: { boots: false, cosmic: false },
    bot: { boots: false, cosmic: false },
    sup: { boots: false, cosmic: false },
  };
  const positions = ["top", "jug", "mid", "bot", "sup"];
  const pos_icon = [
    "/assets/pos_top.png",
    "/assets/pos_jug.png",
    "/assets/pos_mid.png",
    "/assets/pos_bot.png",
    "/assets/pos_sup.png",
  ];
  const [showPanel, setShowPanel] = useState(null);
  const [skills, setSkills] = useState(defaultSettings);
  const [cdSettings, setCdSettings] = useState(defaultCDSettings);
  const handleSelectSkill = (newSkill) => {
    if (!showPanel) return;

    const { pos, index } = showPanel;

    setSkills((prev) => {
      const newPosSkills = [...prev[pos]];
      newPosSkills[index] = newSkill;
      return { ...prev, [pos]: newPosSkills };
    });

    setShowPanel(null); // 关闭面板
  };
  return (
    <div className="app">
      <div className="app-title"></div>
      <div className="spells-container">
        {positions.map((pos, rowId) => (
          <div className="container-column" key={pos}>
            <img src={pos_icon[rowId]} />

            <CdWrapper
              bootsEnabled={cdSettings[pos].boots}
              cosmicEnabled={cdSettings[pos].cosmic}
              setBootsEnabled={() =>
                setCdSettings((prev) => ({
                  ...prev,
                  [pos]: { ...prev[pos], boots: !prev[pos].boots },
                }))
              }
              setCosmicEnabled={() =>
                setCdSettings((prev) => ({
                  ...prev,
                  [pos]: { ...prev[pos], cosmic: !prev[pos].cosmic },
                }))
              }
            />
            <div className="spells-wrapper">
              <Spells
                spell={skills[pos][0]}
                bootsEnabled={cdSettings[pos].boots}
                cosmicEnabled={cdSettings[pos].cosmic}
                onSettingClick={() => {
                  console.log("click setting2");
                  showPanel === null
                    ? setShowPanel({ pos, index: 0 })
                    : setShowPanel(null);
                }}
              />
            </div>
            <div className="spells-wrapper">
              <Spells
                spell={skills[pos][1]}
                bootsEnabled={cdSettings[pos].boots}
                cosmicEnabled={cdSettings[pos].cosmic}
                onSettingClick={() => {
                  showPanel === null
                    ? setShowPanel({ pos, index: 1 })
                    : setShowPanel(null);
                }}
              />
            </div>
          </div>
        ))}
      </div>
      {showPanel && <ChangePanel onSelect={handleSelectSkill} />}
    </div>
  );
}

export default App;
