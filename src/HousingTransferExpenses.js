import axios from "axios";
import { useEffect, useState } from "react";

const API_KEY = process.env.REACT_APP_API_KEY + "=";
const houseHoldsTotalIncomeAndExpenditureUrl = `/openapi/statisticsData.do?method=getList&apiKey=${API_KEY}&format=json&jsonVD=Y&userStatsId=tpg42/101/DT_1L9U027/2/1/20231106103754&prdSe=Y&startPrdDe=2019&endPrdDe=2022`;
/*const data = [
  {
    가구원수: byYearCondtionVal.C1_NM,
    "월평균 가계지출비(1개월분)": byYearCondtionVal.DT,
    "주거용건축물소유자(2개월분)": byYearCondtionVal.DT * 2,
    "주거용건축물세입자(4개월분)": byYearCondtionVal.DT * 4,
  },
];*/
function HousingTransgerExpense() {
  const [initialVal, setInitialVal] = useState([]);
  const [byYearCondtionVal, setByYearConditionVal] = useState([]);
  const [totalVal, setTotalVal] = useState([]);
  const [inputVal, setInputVal] = useState("");
  let inputYear;

  //가구원수별 가구당 월평균 가계수지(도시 1인 이상) api불러오기
  const getStatisticsData = async () => {
    try {
      const res = await axios.get(houseHoldsTotalIncomeAndExpenditureUrl);
      setInitialVal(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //개월수별 필터링
  const filterMonth = (year) => {
    let conditionArr;
    // eslint-disable-next-line default-case
    switch (year) {
      case 2019:
        conditionArr = initialVal.filter((arr) => arr.PRD_DE === "2019");
        setByYearConditionVal(conditionArr);
        break;
      case 2020:
        conditionArr = initialVal.filter((arr) => arr.PRD_DE === "2020");
        setByYearConditionVal(conditionArr);
        break;
      case 2021:
        conditionArr = initialVal.filter((arr) => arr.PRD_DE === "2021");
        setByYearConditionVal(conditionArr);
        break;
      case 2022:
        conditionArr = initialVal.filter((arr) => arr.PRD_DE === "2022");
        setByYearConditionVal(conditionArr);
        break;
    }
  };
  //개월수별 계산
  const calMonth = (year) => {
    let newArr;
    // eslint-disable-next-line default-case
    switch (year) {
      case 2019:
        newArr = byYearCondtionVal.map((data) => ({
          people: data.C1_NM,
          oneMon: Math.round(data.DT),
          twoMon: Math.floor((Math.round(data.DT) * 2) / 10) * 10,
          fourMon: Math.floor((Math.round(data.DT) * 4) / 10) * 10,
        }));
        setTotalVal(newArr);
        break;
      case 2020:
        newArr = byYearCondtionVal.map((data) => ({
          people: data.C1_NM,
          oneMon: Math.round(data.DT),
          twoMon: Math.floor((Math.round(data.DT) * 2) / 10) * 10,
          fourMon: Math.floor((Math.round(data.DT) * 4) / 10) * 10,
        }));
        setTotalVal(newArr);
        break;
      case 2021:
        newArr = byYearCondtionVal.map((data) => ({
          people: data.C1_NM,
          oneMon: Math.round(data.DT),
          twoMon: Math.floor((Math.round(data.DT) * 2) / 10) * 10,
          fourMon: Math.floor((Math.round(data.DT) * 4) / 10) * 10,
        }));
        setTotalVal(newArr);
        break;
      case 2022:
        newArr = byYearCondtionVal.map((data) => ({
          people: data.C1_NM,
          oneMon: Math.round(data.DT),
          twoMon: Math.floor((Math.round(data.DT) * 2) / 10) * 10,
          fourMon: Math.floor((Math.round(data.DT) * 4) / 10) * 10,
        }));
        setTotalVal(newArr);
        break;
    }
  };

  useEffect(() => {
    getStatisticsData();
  }, [houseHoldsTotalIncomeAndExpenditureUrl]);
  return (
    <div>
      <div>
        <span>년도 입력: </span>
        <input
          type="text"
          onChange={(event) => {
            inputYear = Number(event.target.value);
            setInputVal(inputYear);
            console.log(inputVal);
            filterMonth(inputYear);
          }}
        ></input>
        <button
          onClick={() => {
            console.log(inputVal);
            calMonth(inputVal);
          }}
        >
          년도별 가계지출비 산정
        </button>
      </div>
      {byYearCondtionVal.map((initialVal, index) => (
        <div key={index}>
          <div>
            <span>{initialVal.C1_OBJ_NM}</span>
            <span>{initialVal.C1_NM}</span>
          </div>
          <div>
            <span>가계수지항목별: </span>
            <span>{initialVal.C2_NM}</span>
          </div>
          <div>
            <span>근로자가구 (원): </span>
            <span>{Math.round(initialVal.DT)}</span>
          </div>
        </div>
      ))}
      <h1>새로 만들어진 배열</h1>
      {totalVal.map((val, index) => (
        <div key={index}>
          <div>
            <span>{val.people}</span>
          </div>
          <div>
            <span>월평균 가계지출비(1개월분): </span>
            <span>{val.oneMon}</span>
          </div>
          <div>
            <span>월평균 가계지출비(2개월분): </span>
            <span>{val.twoMon}</span>
          </div>
          <div>
            <span>월평균 가계지출비(4개월분): </span>
            <span>{val.fourMon}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HousingTransgerExpense;
