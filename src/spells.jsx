import { useState, useEffect } from "react";
import "./spells.css";
import { spellsIcons } from "./spellsData";
import arrowDown from "./assets/arrow_down.svg";
function Spells({ spell, onSettingClick, bootsEnabled, cosmicEnabled }) {
  const spellData = spellsIcons[spell] || spellsIcons["flash"];
  const modifiedCD = Math.round(
    spellData.cd / (1 + (bootsEnabled ? 0.1 : 0) + (cosmicEnabled ? 0.18 : 0))
  );
  const [isInCD, setIsInCD] = useState(false);
  const [remainingCD, setRemainingCD] = useState(modifiedCD);

  const handleSettingClick = (e) => {
    console.log("click setting");
    e.stopPropagation();
    if (onSettingClick) {
      onSettingClick();
    }
  };

  useEffect(() => {
    if (!isInCD) return;
    const interval = setInterval(() => {
      setRemainingCD((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsInCD(false);
          return modifiedCD;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isInCD, modifiedCD]);
  return (
    <div>
      {isInCD ? (
        <div
          className="cd-overlay"
          onClick={() => {
            setRemainingCD(modifiedCD);
            setIsInCD(false);
          }}
        >
          <span>{remainingCD}s</span>
        </div>
      ) : (
        <div
          className="spell-btn"
          onClick={() => {
            setRemainingCD(modifiedCD);
            setIsInCD(true);
          }}
        >
          <img src={spellData.icon} />
          <button className="btn-spell-setting" onClick={handleSettingClick}>
            <img src={arrowDown}></img>
          </button>
        </div>
      )}
    </div>
  );
}
export default Spells;
