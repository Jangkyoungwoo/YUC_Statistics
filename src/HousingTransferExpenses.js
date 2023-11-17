import axios from "axios";
import { useEffect, useState } from "react";
import * as HTEStyle from "./style/HousingTransferExpenses.style";

const API_KEY = process.env.REACT_APP_API_KEY + "=";
const houseHoldsTotalIncomeAndExpenditureUrl = `/openapi/statisticsData.do?method=getList&apiKey=${API_KEY}&format=json&jsonVD=Y&userStatsId=tpg42/101/DT_1L9U027/2/1/20231106103754&prdSe=Y&startPrdDe=2022&endPrdDe=2022`;
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
  const [totalVal, setTotalVal] = useState([]);
  const [peopleTotalVal, setPeopleTotalVal] = useState([]);
  const [inputSelectVal, setInputSelectVal] = useState("");
  const [inputPeople, setInputPeople] = useState("");
  const [result, setResult] = useState("");
  let inputYear, inputpVal, selectVal;

  //가구원수별 가구당 월평균 가계수지(도시 1인 이상) api불러오기
  const getStatisticsData = async () => {
    try {
      const res = await axios.get(houseHoldsTotalIncomeAndExpenditureUrl);
      setInitialVal(res.data);
      console.log(res.data);
      calMonth(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //년도별 필터링
  /*const filterMonth = (year) => {
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
  };*/
  //개월수별 계산
  const calMonth = (val) => {
    //연도별일 때 parameter year
    let newArr;
    newArr = val.map((data) => ({
      people: data.C1_NM,
      oneMon: Math.round(data.DT),
      twoMon: Math.floor((Math.round(data.DT) * 2) / 10) * 10,
      fourMon: Math.floor((Math.round(data.DT) * 4) / 10) * 10,
    }));
    setTotalVal(newArr);
    // eslint-disable-next-line default-case
    /*
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
    }*/
  };
  //인구별 필터링
  const filterPeople = (people) => {
    if (people === 1) {
      setPeopleTotalVal(totalVal.filter((arr) => arr.people === "1인"));
    } else if (people === 2) {
      setPeopleTotalVal(totalVal.filter((arr) => arr.people === "2인"));
    } else if (people === 3) {
      setPeopleTotalVal(totalVal.filter((arr) => arr.people === "3인"));
    } else if (people === 4) {
      setPeopleTotalVal(totalVal.filter((arr) => arr.people === "4인"));
    } else if (people >= 5) {
      setPeopleTotalVal(totalVal.filter((arr) => arr.people === "5인이상"));
    }
  };
  const filterOwner = (people, owner) => {
    let res;
    switch (owner) {
      case "owner":
        res = totalVal.map((data) => data.twoMon);
        if (res.length > 0) {
          switch (people) {
            case 1:
              setResult(res[0]);
              break;
            case 2:
              setResult(res[1]);
              break;
            case 3:
              setResult(res[2]);
              break;
            case 4:
              setResult(res[3]);
              break;
            case 5:
              setResult(res[4]);
              break;
          }
        }
        break;
      case "newer":
        res = totalVal.map((data) => data.fourMon);
        if (res.length > 0) {
          // eslint-disable-next-line default-case
          switch (people) {
            case 1:
              setResult(res[0]);
              break;
            case 2:
              setResult(res[1]);
              break;
            case 3:
              setResult(res[2]);
              break;
            case 4:
              setResult(res[3]);
              break;
            case 5:
              setResult(res[4]);
              break;
          }
        }
        break;
    }
  };
  useEffect(() => {
    getStatisticsData();
  }, []);
  useEffect(() => {
    filterOwner();
  }, [inputPeople]);

  return (
    <div>
      <h1>주거이전비</h1>
      <div>
        {/*<span>년도 입력: </span>
        <input
          type="text"
          minLength="4"
          maxLength="4"
          required
          onChange={(event) => {
            inputYear = Number(event.target.value);
            setInputVal(inputYear);
            filterMonth(inputYear);
          }}
        ></input>*/}
        <span>가구원수 입력: </span>
        <input
          type="text"
          minLength="1"
          maxLength="1"
          required
          onChange={(event) => {
            inputpVal = Number(event.target.value);
            setInputPeople(inputpVal);
            filterPeople(inputpVal);
            filterOwner(inputpVal, inputSelectVal);
          }}
        ></input>
        <select
          onChange={(event) => {
            selectVal = event.target.value;
            setInputSelectVal(selectVal);
            filterOwner(inputPeople, selectVal);
          }}
        >
          <option value="none">소유자 구분</option>
          <option value="owner">소유자</option>
          <option value="newer">세입자</option>
        </select>
        {/*<button
          onClick={() => {
            //calMonth(inputVal);
            filterPeople(inputPeople);
            //calPeople(inputPeople);
          }}
        >
          년도별 가계지출비 산정
        </button>*/}
        <button
          onClick={() => {
            filterPeople(inputPeople);
            filterOwner(inputSelectVal);
            //calPeople(inputPeople);
            console.log(result);
          }}
        >
          주거이전비산정
        </button>
      </div>
      <h1>개월별 가계지출비</h1>
      <HTEStyle.Table>
        <thead>
          <tr>
            <HTEStyle.Th>가구원수</HTEStyle.Th>
            <HTEStyle.Th>가계지출(월)</HTEStyle.Th>
            <HTEStyle.Th>소유자(2개월분)</HTEStyle.Th>
            <HTEStyle.Th>세입자(4개월분)</HTEStyle.Th>
          </tr>
        </thead>
        <tbody>
          {totalVal.map((val, index) => (
            <tr key={index}>
              <HTEStyle.Td>{val.people}</HTEStyle.Td>
              <HTEStyle.Td>{val.oneMon}</HTEStyle.Td>
              <HTEStyle.Td>{val.twoMon}</HTEStyle.Td>
              <HTEStyle.Td>{val.fourMon}</HTEStyle.Td>
            </tr>
          ))}
        </tbody>
      </HTEStyle.Table>
      <HTEStyle.Table>
        <thead>
          <tr>
            <HTEStyle.Th>가구원수</HTEStyle.Th>
            <HTEStyle.Th>가계지출(월)</HTEStyle.Th>
            <HTEStyle.Th>소유자(2개월분)</HTEStyle.Th>
            <HTEStyle.Th>세입자(4개월분)</HTEStyle.Th>
          </tr>
        </thead>
        <tbody>
          {peopleTotalVal.map((val, index) => (
            <tr key={index}>
              <HTEStyle.Td>{val.people}</HTEStyle.Td>
              <HTEStyle.Td>{val.oneMon}</HTEStyle.Td>
              <HTEStyle.Td>{val.twoMon}</HTEStyle.Td>
              <HTEStyle.Td>{val.fourMon}</HTEStyle.Td>
            </tr>
          ))}
        </tbody>
      </HTEStyle.Table>
      <div>
        <span>주거이전비</span>
        <span>{result}</span>
      </div>
    </div>
  );
}

export default HousingTransgerExpense;
