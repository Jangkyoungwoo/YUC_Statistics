import { useEffect, useState } from "react";
import axios from "axios";
import * as CalculateStyle from "../style/Calculate.style";

function Calculate({ send, sendTwo }) {
  const [data, setData] = useState({});
  const [dataTwo, setDataTwo] = useState({});
  const getData = () => {
    const obj = send;
    setData(obj);
    setDataTwo(sendTwo);
    console.log(sendTwo);
  };
  const relocationSettlementEligibility = () => {
    if (
      sendTwo.permission === "agree" &&
      sendTwo.agreeDay < settlementDate &&
      sendTwo.usage === "house" &&
      sendTwo.owner === "owner" &&
      sendTwo.moveInDate < settlementDate
    ) {
      {
        data.settlementRes;
      }
    } else {
      setAmountResult(0);
      totalSum();
    }
  };
  const housingTransferExpensesEligibility = () => {
    if (
      sendTwo.permission === "agree" &&
      sendTwo.agreeDay < sendTwo.inputOwner &&
      sendTwo.usage === "house" &&
      sendTwo.owner === "owner" &&
      sendTwo.moveInDate < sendTwo.inputOwner
    ) {
      filterOwner(inputPeople, inputSelectVal);
    } else {
      if (
        sendTwo.permission === "agree" &&
        sendTwo.agreeDay < sendTwo.inputNewer &&
        sendTwo.usage === "house" &&
        sendTwo.owner === "newer" &&
        sendTwo.moveInDate < sendTwo.inputNewer
      ) {
        filterOwner(inputPeople, inputSelectVal);
      } else {
        if (
          note === "무허가" &&
          sendTwo.moveInDate < sendTwo.inputDisagreeNewer
        ) {
          filterOwner(inputPeople, inputSelectVal);
        } else {
          setResult(0);
        }
      }
    }
  };
  const movingExpenseEligibility = () => {
    if (sendTwo.moveInDate < sendTwo.inputMovingDate) {
      selectArr();
      console.log(mselectVal.sum);
    } else {
      setmselectVal((prevState) => ({
        ...prevState,
        sum: 0,
      }));
      console.log(mselectVal.sum);
    }
  };
  useEffect(() => getData);
  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "15px",
        padding: "25px",
        boxShadow: "3px 3px 3px 3px #E2E2EE",
      }}
    >
      <h1>법적보상비 산정</h1>
      <div>
        <h3>이주정착금 </h3>
        <CalculateStyle.categoryDiv>
          <CalculateStyle.marginRightDiv>
            <CalculateStyle.valueDiv>
              <span>가옥평가액</span>
              <span>{data.amount}</span>
            </CalculateStyle.valueDiv>
            <CalculateStyle.valueDiv>
              <span>요율</span>
              <span>{data.rate}</span>
            </CalculateStyle.valueDiv>
            <CalculateStyle.valueDiv>
              <span>지분</span>
              <span>{data.share}</span>
            </CalculateStyle.valueDiv>
          </CalculateStyle.marginRightDiv>
          <CalculateStyle.borderLeftDiv hasBorder>
            <CalculateStyle.valueDiv>
              <span>산출결과</span>
              <span>{data.settlementRes}</span>
            </CalculateStyle.valueDiv>
            <CalculateStyle.valueDiv>
              <span>이주정착금</span>
              <CalculateStyle.resultSpan>
                {data.settlementRes}
              </CalculateStyle.resultSpan>
            </CalculateStyle.valueDiv>
          </CalculateStyle.borderLeftDiv>
        </CalculateStyle.categoryDiv>
      </div>
      <div>
        <h3>주거이전비</h3>
        <CalculateStyle.categoryDiv>
          <CalculateStyle.marginRightDiv>
            <CalculateStyle.valueDiv>
              <span>가구원수</span>
              <span>{data.headCount}</span>
            </CalculateStyle.valueDiv>
            <CalculateStyle.valueDiv>
              <span>구분</span>
              <span>{data.owner === "owner" ? "소유자" : "세입자"}</span>
            </CalculateStyle.valueDiv>
          </CalculateStyle.marginRightDiv>
          <CalculateStyle.borderLeftDiv hasBorder>
            <CalculateStyle.valueDiv>
              <span>주거이전비</span>
              <CalculateStyle.resultSpan>
                {data.housingTransferRes}
              </CalculateStyle.resultSpan>
            </CalculateStyle.valueDiv>
          </CalculateStyle.borderLeftDiv>
        </CalculateStyle.categoryDiv>
      </div>
      <div>
        <h3>이사비</h3>
        <CalculateStyle.categoryDiv>
          <CalculateStyle.marginRightDiv>
            <CalculateStyle.valueDiv>
              <span>면적</span>
              <span>{data.width}</span>
            </CalculateStyle.valueDiv>
            <CalculateStyle.valueDiv>
              <span>노임</span>
              <span>{data.priceOfWage}</span>
            </CalculateStyle.valueDiv>
            <CalculateStyle.valueDiv>
              <span>차량운임</span>
              <span>{data.vehicleCost}</span>
            </CalculateStyle.valueDiv>
            <CalculateStyle.valueDiv>
              <span>포장비</span>
              <span>{data.packagingFee}</span>
            </CalculateStyle.valueDiv>
          </CalculateStyle.marginRightDiv>
          <CalculateStyle.borderLeftDiv hasBorder>
            <CalculateStyle.valueDiv>
              <span>합계</span>
              <CalculateStyle.resultSpan>{data.sum}</CalculateStyle.resultSpan>
            </CalculateStyle.valueDiv>
          </CalculateStyle.borderLeftDiv>
        </CalculateStyle.categoryDiv>

        <div
          style={{
            float: "right",
            marginTop: "20px",
            marginRight: "50px",
          }}
        >
          <div style={{ width: "250px" }}>
            <CalculateStyle.sumDiv>
              <span>이주정착금</span>
              <span>{data.settlementRes}</span>
            </CalculateStyle.sumDiv>
            <CalculateStyle.sumDiv>
              <span>주거이전비</span>
              <span>{data.housingTransferRes}</span>
            </CalculateStyle.sumDiv>
            <CalculateStyle.sumDiv>
              <span>이사비</span>
              <span>{data.sum}</span>
            </CalculateStyle.sumDiv>
            <CalculateStyle.sumDiv>
              <span>지급대상</span>
              <span>#,##0</span>
            </CalculateStyle.sumDiv>
            <CalculateStyle.sumDiv>
              <span>총지급액</span>
              <CalculateStyle.resultSpan>
                {Number(data.settlementRes) +
                  Number(data.housingTransferRes) +
                  Number(data.sum)}
              </CalculateStyle.resultSpan>
            </CalculateStyle.sumDiv>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculate;
