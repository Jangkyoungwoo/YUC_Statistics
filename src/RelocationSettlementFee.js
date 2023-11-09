import { useState } from "react";

function RelocationSettlementFee() {
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

  return (
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
  );
}

export default RelocationSettlementFee;
