import axios from "axios";
import { useEffect, useState } from "react";

const API_KEY = process.env.REACT_APP_API_KEY + "=";
const priceOfWageUrl = `/openapi/statisticsData.do?method=getList&apiKey=${API_KEY}&format=json&jsonVD=Y&userStatsId=tpg42/365/TX_36504_A001_1/2/1/20231106140112&prdSe=H&newEstPrdCnt=1`;

function MovingExpense() {
  const [initialVal, setInitialVal] = useState([]);
  const [priceOfWage, setPriceOfWage] = useState([]);
  const [vehicleCost, setVehicleCost] = useState([]);
  const [totalVal, setTotalVar] = useState([]);
  const [selectVal, setSelectVal] = useState([]);
  const [inputAreaVal, setInputAreaVal] = useState("");
  const [inputCostVal, setInputCostVal] = useState("");
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
    } catch (error) {
      console.log(error);
    }
  };
  // 차량운임비 계산 후 배열에 입력
  const calVehicleCost = () => {
    const updatedVehicleCost = [];
    for (let i = 1; i < 3; i++) {
      updatedVehicleCost.push(Number(inputCostVal) * i);
    }
    updatedVehicleCost.push(Number(inputCostVal) * 2.5);
    for (let i = 3; i < 5; i++) {
      updatedVehicleCost.push(Number(inputCostVal) * i);
    }
    setVehicleCost(updatedVehicleCost);
    console.log(vehicleCost);
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
    setTotalVar(combinedArray);
    console.log(totalVal);
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

  useEffect(() => {
    getStatisticsData();
  }, [priceOfWageUrl]);
  return (
    <div>
      <div>
        <span>주택(연면적):</span>
        <input
          type="text"
          value={inputAreaVal}
          onChange={(event) => {
            setInputAreaVal(Number(event.target.value));
          }}
        ></input>
      </div>
      <span>차량운임비: </span>
      <input
        type="text"
        value={inputCostVal}
        onChange={(event) => {
          setInputCostVal(Number(event.target.value));
        }}
      ></input>
      <button
        onClick={() => {
          calVehicleCost();
          combinedArr();
          selectArr();
        }}
      >
        차량운임비 산정
      </button>
      {initialVal.map((initialVal, index) => (
        <div key={index}>
          <div>
            <span>{initialVal.TBL_NM}</span>
            <span>(</span>
            <span>{initialVal.PRD_DE}</span>
            <span>)</span>
          </div>
          <div>
            <span>{initialVal.C1_OBJ_NM}: </span>
            <span>{initialVal.C1_NM}</span>
          </div>
          <div>
            <span>{initialVal.ITM_NM}: </span>
            <span>{initialVal.DT}</span>
          </div>
        </div>
      ))}
      <h2>임금</h2>
      {priceOfWage.map((data, index) => (
        <div key={index}>{data}</div>
      ))}
      <h2>차량운임</h2>
      {vehicleCost.map((data, index) => (
        <div key={index}>{data}</div>
      ))}
      <h2>이사비</h2>
      <div>
        <span>노임: </span>
        {selectVal.priceOfWage}
      </div>
      <div>
        <span>차량운임: </span>
        {selectVal.vehicleCost}
      </div>
      <div>
        <span>포장비: </span>
        {selectVal.packagingFee}
      </div>
      <span>계: </span>
      {selectVal.sum}
    </div>
  );
}
export default MovingExpense;
