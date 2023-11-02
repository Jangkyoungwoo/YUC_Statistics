import axios from "axios";
import { useEffect, useState } from "react";

const API_KEY = process.env.REACT_APP_API_KEY + "=";
const reqUrl = `/openapi/statisticsData.do?method=getList&apiKey=MmZiNjcyYzU4MjlhNzI4MTljMjMyYTQ1MjBiNzU2YTk=&format=json&jsonVD=Y&userStatsId=tpg42/101/DT_1L9U001/2/1/20231101103458&prdSe=Q&newEstPrdCnt=3`;

function App() {
  const [statisticsData, setStatisticsData] = useState([]);
  const getStatisticsData = async () => {
    try {
      const res = await axios.get(reqUrl);
      setStatisticsData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getStatisticsData();
  }, [reqUrl]);
  return (
    <div>
      {statisticsData.map((statisticsData) => (
        <div key={Number(statisticsData.DT)}>
          <div>{statisticsData.TBL_NM}</div>
          <div>{statisticsData.PRD_DE}</div>
          <div>{statisticsData.DT}</div>
          <div>{statisticsData.c1_NM}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
