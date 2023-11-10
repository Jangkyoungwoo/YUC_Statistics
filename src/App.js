import axios from "axios";
import { useEffect, useState } from "react";
import XLSX from "sheetjs-style";
import RelocationSettlementFee from "./RelocationSettlementFee";
import HousingTransgerExpense from "./HousingTransferExpenses";
import MovingExpense from "./MovingExpenses";
import InputData from "./components/InputData";
import Total from "./Total";

const API_KEY = process.env.REACT_APP_API_KEY + "=";
const houseHoldsTotalIncomeAndExpenditureUrl = `/openapi/statisticsData.do?method=getList&apiKey=${API_KEY}&format=json&jsonVD=Y&userStatsId=tpg42/101/DT_1L9U001/2/1/20231101103458&prdSe=Q&newEstPrdCnt=3`;

function App({}) {
  //가구원수별 가구당 월평균 가계수지(도시 1인 이상) 불러오기

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
