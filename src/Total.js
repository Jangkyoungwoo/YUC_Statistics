import MovingExpense from "./MovingExpenses";
import axios from "axios";
import { useEffect, useState } from "react";
import * as MEStyle from "./style/MovingExpenses.style";
import * as HTEStyle from "./style/HousingTransferExpenses.style";

const API_KEY = process.env.REACT_APP_API_KEY + "=";
const priceOfWageUrl = `/openapi/statisticsData.do?method=getList&apiKey=${API_KEY}&format=json&jsonVD=Y&userStatsId=tpg42/365/TX_36504_A001_1/2/1/20231106140112&prdSe=H&newEstPrdCnt=1`;
const houseHoldsTotalIncomeAndExpenditureUrl = `/openapi/statisticsData.do?method=getList&apiKey=${API_KEY}&format=json&jsonVD=Y&userStatsId=tpg42/101/DT_1L9U027/2/1/20231106103754&prdSe=Y&startPrdDe=2022&endPrdDe=2022`;

function Total() {
  const [getSum, setGetSum] = useState();
  //이주정착금
  const [inputAmountVal, setInputAmountVal] = useState("");
  const [inputShareVal, setInputShareVal] = useState("");
  const [amountResult, setAmountResult] = useState("");
  const [cDate, setCDate] = useState("");
  let inputAmount, inputShare, date;
  const calAmount = (inputAmountVal, cDate) => {
    let amount;
    let result = 0;
    let currentDate = cDate;
    const standardDate = new Date("2020-12-11");
    amount =
      Math.floor(Math.round(inputAmountVal * 0.3) / 10) * 10 * inputShareVal;
    if (currentDate > standardDate) {
      if (amount < 12000000) {
        result = 12000000;
        setAmountResult(result);
        console.log(result);
      } else if (amount > 24000000) {
        result = 24000000;
        setAmountResult(result);
        console.log(result);
      } else {
        result = amount;
        setAmountResult(result);
        console.log(result);
      }
    } else {
      if (amount < 6000000) {
        result = 6000000;
        setAmountResult(result);
        console.log(result);
      } else if (amount > 12000000) {
        result = 12000000;
        setAmountResult(result);
      } else {
        result = amount;
        setAmountResult(result);
        console.log(result);
      }
    }
  };
  //주거이전비
  const [tinitialVal, settInitialVal] = useState([]);
  const [ttotalVal, settTotalVal] = useState([]);
  const [peopletTotalVal, setPeopletTotalVal] = useState([]);
  const [inputSelectVal, setInputSelectVal] = useState("");
  const [inputPeople, setInputPeople] = useState("");
  const [result, setResult] = useState("");
  let inputpVal, selectVal;

  //가구원수별 가구당 월평균 가계수지(도시 1인 이상) api불러오기
  const getStatisticsData = async () => {
    try {
      const res = await axios.get(houseHoldsTotalIncomeAndExpenditureUrl);
      settInitialVal(res.data);
      calMonth(res.data);
    } catch (error) {
      console.log(error);
    }
  };

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
    settTotalVal(newArr);
  };
  //인구별 필터링
  const filterPeople = (people) => {
    if (people === 1) {
      setPeopletTotalVal(ttotalVal.filter((arr) => arr.people === "1인"));
    } else if (people === 2) {
      setPeopletTotalVal(ttotalVal.filter((arr) => arr.people === "2인"));
    } else if (people === 3) {
      setPeopletTotalVal(ttotalVal.filter((arr) => arr.people === "3인"));
    } else if (people === 4) {
      setPeopletTotalVal(ttotalVal.filter((arr) => arr.people === "4인"));
    } else if (people >= 5) {
      setPeopletTotalVal(ttotalVal.filter((arr) => arr.people === "5인이상"));
    }
  };
  //소유구분별 필터링
  const filterOwner = (people, owner) => {
    let res;
    switch (owner) {
      case "owner":
        res = ttotalVal.map((data) => data.twoMon);
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
        res = ttotalVal.map((data) => data.fourMon);
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
    filterOwner();
  }, [inputPeople]);
  //이사비
  const [minitialVal, setMInitialVal] = useState([]);
  const [priceOfWage, setPriceOfWage] = useState([]);
  const [vehicleCost, setVehicleCost] = useState([]);
  const [mtotalVal, setmTotalVal] = useState([]);
  const [mselectVal, setmselectVal] = useState([]);
  const [inputAreaVal, setInputAreaVal] = useState("");
  let areaVal;
  let vehicleCostVal = 222000; //차량운임비
  //노임단가 API 호출
  const getMovingStatisticsData = async () => {
    const updatedPriceOfWage = [];
    try {
      const res = await axios.get(priceOfWageUrl);
      setMInitialVal(res.data);
      //인원별 임금 계산
      for (let i = 3; i < 7; i++) {
        updatedPriceOfWage.push(Number(res.data[0].DT) * i);
      }
      updatedPriceOfWage.push(Number(res.data[0].DT) * 8);
      setPriceOfWage(updatedPriceOfWage);
      calVehicleCost(vehicleCostVal);
    } catch (error) {
      console.log(error);
    }
  };
  // 차량운임비 계산 후 배열에 입력
  const calVehicleCost = (vehicleCostVal) => {
    const updatedVehicleCost = [];
    for (let i = 1; i < 3; i++) {
      updatedVehicleCost.push(Number(vehicleCostVal) * i);
    }
    updatedVehicleCost.push(Number(vehicleCostVal) * 2.5);
    for (let i = 3; i < 5; i++) {
      updatedVehicleCost.push(Number(vehicleCostVal) * i);
    }
    setVehicleCost(updatedVehicleCost);
  };

  //노임비 배열, 차량운임 배열 합치기 및 포장비 계산
  const combinedArr = () => {
    const combinedArray = priceOfWage.map((element, index) => ({
      priceOfWage: element,
      vehicleCost: vehicleCost[index],
      packagingFee: Math.floor((element + vehicleCost[index]) * 0.15),
      sum:
        Math.floor(
          (element +
            vehicleCost[index] +
            Math.floor((element + vehicleCost[index]) * 0.15)) /
            10
        ) * 10,
    }));
    setmTotalVal(combinedArray);
  };

  //면적 기준에 따른 해당 값 출력
  const selectArr = () => {
    if (inputAreaVal < 33) {
      setmselectVal(mtotalVal[0]);
    } else if (inputAreaVal >= 33 && inputAreaVal < 49.5) {
      setmselectVal(mtotalVal[1]);
    } else if (inputAreaVal >= 49.5 && inputAreaVal < 66) {
      setmselectVal(mtotalVal[2]);
    } else if (inputAreaVal >= 66 && inputAreaVal < 99) {
      setmselectVal(mtotalVal[3]);
    } else {
      setmselectVal(mtotalVal[4]);
    }
  };
  //입력한 면적에 따른 면적 기준
  const standardArea = () => {
    if (inputAreaVal < 33) {
      return "33m² 미만";
    } else if (inputAreaVal >= 33 && inputAreaVal < 49.5) {
      return "33m² ~ 49.5m";
    } else if (inputAreaVal >= 49.5 && inputAreaVal < 66) {
      return "49.5m ~ 66m";
    } else if (inputAreaVal >= 66 && inputAreaVal < 99) {
      return "66m² ~ 99m";
    } else {
      return "99m² 이상";
    }
  };

  //총지급액 계산
  const totalSum = () => {
    const sum = amountResult + result + mselectVal.sum;
    setGetSum(sum);
  };

  useEffect(() => {
    getMovingStatisticsData();
    getStatisticsData();
  }, []);

  useEffect(() => {
    combinedArr();
  }, []);

  return (
    <div>
      <div>
        <span>가옥소재지</span>
        <input
          type="text"
          onChange={(event) => {
            //inputShare = Number(event.target.value);
          }}
        ></input>
        <span>청구인</span>
        <input
          type="text"
          onChange={(event) => {
            //inputShare = Number(event.target.value);
          }}
        ></input>
      </div>
      <div>
        <h3>대상적격</h3>
        <select
          onChange={(event) => {
            //selectVal = event.target.value;
          }}
        >
          <option value="none">허가여부</option>
          <option value="agree">허가</option>
          <option value="disagree">비허가</option>
        </select>
        <span>사용승인일</span>
        <input
          type="date"
          onChange={(event) => {
            //date = event.target.value;
          }}
        ></input>
        <select
          onChange={(event) => {
            //selectVal = event.target.value;
          }}
        >
          <option value="none">용도</option>
          <option value="house">주택</option>
          <option value="nonhouse">비주택</option>
        </select>
        <span>전입일</span>
        <input
          type="date"
          onChange={(event) => {
            //date = event.target.value;
          }}
        ></input>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h1>이주정착금</h1>
          <span>주거용 건축물 금액</span>
          <input
            type="text"
            onChange={(event) => {
              inputAmount = Number(event.target.value);
              setInputAmountVal(inputAmount);
            }}
          ></input>
          <div>
            <span>지분</span>
            <input
              type="text"
              onChange={(event) => {
                inputShare = Number(event.target.value);
                setInputShareVal(inputShare);
              }}
            ></input>
          </div>
          <div>
            <input
              type="date"
              onChange={(event) => {
                date = event.target.value;
                setCDate(new Date(date));
              }}
            ></input>
            <button
              onClick={() => {
                calAmount(inputAmountVal, cDate);
              }}
            >
              이주정착금 산정
            </button>
          </div>

          <div>
            <span>이주정착금: </span>
            {amountResult}
          </div>
        </div>
        <div>
          <h1>주거이전비</h1>
          <div>
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
              {ttotalVal.map((val, index) => (
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
              {peopletTotalVal.map((val, index) => (
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
        <div>
          <h1>이사비</h1>
          <div>
            <span>주택(연면적):</span>
            <input
              type="text"
              value={inputAreaVal}
              onChange={(event) => {
                areaVal = Number(event.target.value);
                setInputAreaVal(areaVal);
                combinedArr();
              }}
            ></input>
          </div>
          <button
            onClick={() => {
              selectArr();
            }}
          >
            산정
          </button>
          <h2>임금</h2>
          {priceOfWage.map((data, index) => (
            <div key={index}>{data}</div>
          ))}
          <h2>차량운임</h2>
          {vehicleCost.map((data, index) => (
            <div key={index}>{data}</div>
          ))}
          <h2>이사비</h2>
          <MEStyle.Table>
            <thead>
              <tr>
                <MEStyle.Th>면적</MEStyle.Th>
                <MEStyle.Th>노임</MEStyle.Th>
                <MEStyle.Th>차량운임</MEStyle.Th>
                <MEStyle.Th>포장비</MEStyle.Th>
                <MEStyle.Th>합계</MEStyle.Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <MEStyle.Td>{standardArea(inputAreaVal)}</MEStyle.Td>
                <MEStyle.Td>{mselectVal.priceOfWage}</MEStyle.Td>
                <MEStyle.Td>{mselectVal.vehicleCost}</MEStyle.Td>
                <MEStyle.Td>{mselectVal.packagingFee}</MEStyle.Td>
                <MEStyle.Td>{mselectVal.sum}</MEStyle.Td>
              </tr>
            </tbody>
          </MEStyle.Table>
          <div>{mselectVal.sum}</div>
        </div>
        <button onClick={totalSum}>합계 출력</button>
        <span>합계: </span>
        <div>{getSum}</div>
      </div>
    </div>
  );
}
export default Total;
