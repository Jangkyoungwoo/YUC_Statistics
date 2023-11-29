import { useEffect, useRef, useState } from "react";
import XLSX from "sheetjs-style";
import Total from "./Total";
import InputData from "./components/InputData";
import Level from "./components/Level";
import Calculate from "./components/Calculate";
import List from "./components/List";
import ImportFile from "./components/ImportFile";

function App() {
  const [send, setSend] = useState({});
  const [sendTwo, setSendTwo] = useState({});
  //스클롤 이동
  const scrollInput = useRef();
  const scrollCal = useRef();
  const scrollExport = useRef();
  const handleDataChange = (newData) => {
    setSend(newData);
  };
  const onMoveToInput = () => {
    scrollInput.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const onMoveToCal = () => {
    scrollCal.current.scrollIntoView({ behavior: "smooth" });
  };
  const onMoveToExport = () => {
    scrollExport.current.scrollIntoView({ behavior: "smooth" });
  };

  //액셀로 내보내기
  const exportdata = () => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet();
    XLSX.utils.book_append_sheet(wb, ws, "items");
    XLSX.writeFile(wb, "items.xlsx");
  };

  return (
    <div>
      <div
        style={{
          background: "#F1F5F8",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
        }}
        ref={scrollInput}
      >
        <InputData onSetSend={setSend} onSetSendTwo={setSendTwo} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Level
            onMoveToInput={onMoveToInput}
            onMoveToCal={onMoveToCal}
            onMoveToExport={onMoveToExport}
          ></Level>
          <div style={{ marginLeft: "20px", marginTop: "10px" }}>
            <List></List>
          </div>
        </div>
      </div>
      <div
        style={{
          background: "#E7EAF9",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
        }}
        ref={scrollCal}
      >
        <Calculate send={send} sendTwo={sendTwo} />
      </div>
      <div
        style={{
          background: "#E7EAF9",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
        }}
        ref={scrollExport}
      >
        <ImportFile></ImportFile>
      </div>
    </div>
  );
}

export default App;
