import { useEffect, useState } from "react";
import axios from "axios";
import * as CalculateStyle from "../style/Calculate.style";

function Calculate({ send, sendTwo }) {
  const [data, setData] = useState({});
  const [dataTwo, setDataTwo] = useState({});

  const relocationSettlementEligibility = () => {
    if (
      sendTwo.permission === "agree" &&
      new Date(sendTwo.agreeDay) < new Date(sendTwo.settlementDate) &&
      sendTwo.usage === "house" &&
      sendTwo.owner === "owner" &&
      new Date(sendTwo.moveInDate) < new Date(sendTwo.settlementDate)
    ) {
      setDataTwo((prevState) => ({
        ...prevState,
        settlementRes: data.settlementRes,
      }));
    } else {
      setDataTwo((prevState) => ({
        ...prevState,
        settlementRes: 0,
      }));
    }
  };
  const housingTransferExpensesEligibility = () => {
    if (
      sendTwo.permission === "agree" &&
      new Date(sendTwo.agreeDay) < new Date(sendTwo.inputOwner) &&
      sendTwo.usage === "house" &&
      sendTwo.owner === "owner" &&
      new Date(sendTwo.moveInDate) < new Date(sendTwo.inputOwner)
    ) {
      setDataTwo((prevState) => ({
        ...prevState,
        housingTransferRes: data.housingTransferRes,
      }));
    } else {
      if (
        sendTwo.permission === "agree" &&
        new Date(sendTwo.agreeDay) < new Date(sendTwo.inputNewer) &&
        sendTwo.usage === "house" &&
        sendTwo.owner === "newer" &&
        new Date(sendTwo.moveInDate) < new Date(sendTwo.inputNewer)
      ) {
        setDataTwo((prevState) => ({
          ...prevState,
          housingTransferRes: data.housingTransferRes,
        }));
      } else {
        if (
          sendTwo.note === "무허가" &&
          new Date(sendTwo.moveInDate) < new Date(sendTwo.inputDisagreeNewer)
        ) {
          return data.housingTransferRes;
        } else {
          setDataTwo((prevState) => ({
            ...prevState,
            housingTransferRes: 0,
          }));
        }
      }
    }
  };
  const movingExpenseEligibility = () => {
    if (new Date(sendTwo.moveInDate) < new Date(sendTwo.inputMovingDate)) {
      return data.sum;
    } else {
      setData((prevState) => ({
        ...prevState,
        sum: 0,
      }));
      return "부적격";
    }
  };
  const getData = () => {
    const obj = send;
    setData(obj);
    setDataTwo(sendTwo);
    relocationSettlementEligibility();
    housingTransferExpensesEligibility();
    movingExpenseEligibility();
    console.log(sendTwo);
  };
  useEffect(() => {
    getData();
  }, [send, sendTwo]);
  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "15px",
        padding: "25px",
        boxShadow: "3px 3px 3px 3px #E2E2EE",
      }}
    >
      <h1>법정보상비 산정</h1>
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
          <div style={{ width: "300px" }}>
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
              <span>이주정착금 주거이전비 이사비</span>
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
