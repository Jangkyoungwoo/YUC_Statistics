import axios from "axios";
import { useEffect, useState } from "react";
import * as MEStyle from "../style/MovingExpenses.style";

const API_KEY = process.env.REACT_APP_API_KEY + "=";
const priceOfWageUrl = `/openapi/statisticsData.do?method=getList&apiKey=${API_KEY}&format=json&jsonVD=Y&userStatsId=tpg42/365/TX_36504_A001_1/2/1/20231106140112&prdSe=H&newEstPrdCnt=1`;

function MovingExpense() {
  const [initialVal, setInitialVal] = useState([]);
  const [priceOfWage, setPriceOfWage] = useState([]);
  const [vehicleCost, setVehicleCost] = useState([]);
  const [totalVal, setTotalVal] = useState([]);
  const [selectVal, setSelectVal] = useState([]);
  const [inputAreaVal, setInputAreaVal] = useState("");
  const [inputCostVal, setInputCostVal] = useState("");
  const [dataToSend, setDataToSend] = useState("");
  let areaVal;
  let vehicleCostVal = 222000; //차량운임비
  //노임단가 API 호출
  const getStatisticsData = async () => {
    const updatedPriceOfWage = [];
    try {
      const res = await axios.get(priceOfWageUrl);
      setInitialVal(res.data);
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
    setTotalVal(combinedArray);
  };

  //면적 기준에 따른 해당 값 출력
  const selectArr = () => {
    if (inputAreaVal < 33) {
      setSelectVal(totalVal[0]);
    } else if (inputAreaVal >= 33 && inputAreaVal < 49.5) {
      setSelectVal(totalVal[1]);
    } else if (inputAreaVal >= 49.5 && inputAreaVal < 66) {
      setSelectVal(totalVal[2]);
    } else if (inputAreaVal >= 66 && inputAreaVal < 99) {
      setSelectVal(totalVal[3]);
    } else {
      setSelectVal(totalVal[4]);
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

  useEffect(() => {
    getStatisticsData();
  }, []);

  useEffect(() => {
    combinedArr();
  }, []);

  return (
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
      {/*<span>차량운임비: </span>
      <input
        type="text"
        value={inputCostVal}
        onChange={(event) => {
          costVal = Number(event.target.value);
          setInputCostVal(costVal);
        }}
      ></input>
      <button
        onClick={() => {
          calVehicleCost();
          //selectArr();
        }}
      >
        차량운임비 산정
      </button>*/}
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
            <MEStyle.Td>{selectVal.priceOfWage}</MEStyle.Td>
            <MEStyle.Td>{selectVal.vehicleCost}</MEStyle.Td>
            <MEStyle.Td>{selectVal.packagingFee}</MEStyle.Td>
            <MEStyle.Td>{selectVal.sum}</MEStyle.Td>
          </tr>
        </tbody>
      </MEStyle.Table>
      <div>{selectVal.sum}</div>
    </div>
  );
}
export default MovingExpense;
