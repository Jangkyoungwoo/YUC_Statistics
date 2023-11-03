import axios from "axios";
import { useEffect, useState } from "react";
import XLSX from "sheetjs-style";

const API_KEY = process.env.REACT_APP_API_KEY + "=";
const reqUrl = `/openapi/statisticsData.do?method=getList&apiKey=${API_KEY}&format=json&jsonVD=Y&userStatsId=tpg42/101/DT_1L9U001/2/1/20231101103458&prdSe=Q&newEstPrdCnt=3`;

function App() {
  const [statisticsData, setStatisticsData] = useState([]);

  //가구원수별 가구당 월평균 가계수지(도시 1인 이상) api불러오기
  const getStatisticsData = async () => {
    try {
      const res = await axios.get(reqUrl);
      setStatisticsData(res.data);
      console.log(res.data);
      console.log(Array.isArray(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  //액셀로 내보내기
  const exportdata = (data) => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "items");
    XLSX.writeFile(wb, "items.xlsx");
  };
  useEffect(() => {
    getStatisticsData();
  }, [reqUrl]);
  return (
    <div>
      {statisticsData.map((statisticsData) => (
        <div key={Number(statisticsData.DT)}>
          <div>
            <span>가계수지항목별: </span>
            <span>{statisticsData.C1_NM}</span>
          </div>
          <div>
            <span>가구 (원): </span>
            <span>{statisticsData.DT}</span>
          </div>
        </div>
      ))}
      <h1>Execl Export</h1>
      <button onClick={() => exportdata(statisticsData)}>산출</button>
    </div>
  );
}

export default App;
