import axios from "axios";
import { useEffect, useState } from "react";
import XLSX from "sheetjs-style";
import RelocationSettlementFee from "./RelocationSettlementFee";
import HousingTransgerExpense from "./HousingTransferExpenses";
import MovingExpense from "./MovingExpenses";
import InputData from "./components/InputData";
import Total from "./Total";

function App({}) {
  //기존 액셀 파일 열기

  //액셀로 내보내기
  const exportdata = () => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet();
    XLSX.utils.book_append_sheet(wb, ws, "items");
    XLSX.writeFile(wb, "items.xlsx");
  };

  return (
    <div>
      <Total></Total>
      <h1>Execl Export</h1>
      <button>산출</button>
    </div>
  );
}

export default App;
