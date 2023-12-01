import { useRef } from "react";
import * as LevelStyle from "../style/Level.style";
function Level({ onMoveToInput, onMoveToCal, onMoveToExport }) {
  return (
    <div style={{ background: "#FFFFFF" }}>
      <div
        style={{
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          right: "280px",
          top: "10px",
          background: "#FFFFFF",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "3px 3px 3px 3px #E2E2EE",
        }}
      >
        <h4>절차</h4>
        <LevelStyle.button onClick={onMoveToInput}>입력</LevelStyle.button>
        <LevelStyle.button onClick={onMoveToCal}>
          법정보상비 산정
        </LevelStyle.button>
        <LevelStyle.button onClick={onMoveToExport}>내보내기</LevelStyle.button>
      </div>
    </div>
  );
}
export default Level;
