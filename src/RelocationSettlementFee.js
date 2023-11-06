import { useState } from "react";

function RelocationSettlementFee() {
  const [inputVal, setInputVal] = useState();
  const [amountResult, setAmountResult] = useState("");
  const [cDate, setCDate] = useState("");
  let inputAmount;
  let date;
  const calAmount = (inputVal, cDate) => {
    let amount;
    let result = 0;
    let currentDate = cDate;
    const standardDate = new Date("2020-12-11");
    amount = Math.floor(Math.round(inputVal * 0.3) / 10) * 10;
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
      <span>주거용 건축물 금액</span>
      <input
        type="text"
        onChange={(event) => {
          inputAmount = Number(event.target.value);
          setInputVal(inputAmount);
        }}
      ></input>
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
            calAmount(inputVal, cDate);
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
