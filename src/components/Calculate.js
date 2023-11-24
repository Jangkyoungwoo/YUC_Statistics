import * as CalculateStyle from "../style/Calculate.style";

function Calculate() {
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
              <span>#,###</span>
            </CalculateStyle.valueDiv>
            <CalculateStyle.valueDiv>
              <span>요율</span>
              <span>#,###</span>
            </CalculateStyle.valueDiv>
            <CalculateStyle.valueDiv>
              <span>지분</span>
              <span>#,###</span>
            </CalculateStyle.valueDiv>
          </CalculateStyle.marginRightDiv>
          <CalculateStyle.borderLeftDiv hasBorder>
            <CalculateStyle.valueDiv>
              <span>산출결과</span>
              <span>#,###</span>
            </CalculateStyle.valueDiv>
            <CalculateStyle.valueDiv>
              <span>이주정착금</span>
              <CalculateStyle.resultSpan>#,###</CalculateStyle.resultSpan>
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
              <span>#'###</span>
            </CalculateStyle.valueDiv>
            <CalculateStyle.valueDiv>
              <span>구분</span>
              <span>소유자</span>
            </CalculateStyle.valueDiv>
          </CalculateStyle.marginRightDiv>
          <CalculateStyle.borderLeftDiv hasBorder>
            <CalculateStyle.valueDiv>
              <span>주거이전비</span>
              <CalculateStyle.resultSpan>#,###</CalculateStyle.resultSpan>
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
              <span>#,##0</span>
            </CalculateStyle.valueDiv>
            <CalculateStyle.valueDiv>
              <span>노임</span>
              <span>#,##0</span>
            </CalculateStyle.valueDiv>
            <CalculateStyle.valueDiv>
              <span>차량운임</span>
              <span>#,##0</span>
            </CalculateStyle.valueDiv>
            <CalculateStyle.valueDiv>
              <span>포장비</span>
              <span>#,##0</span>
            </CalculateStyle.valueDiv>
          </CalculateStyle.marginRightDiv>
          <CalculateStyle.borderLeftDiv hasBorder>
            <CalculateStyle.valueDiv>
              <span>합계</span>
              <CalculateStyle.resultSpan>#,##0</CalculateStyle.resultSpan>
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
              <span>#,##0</span>
            </CalculateStyle.sumDiv>
            <CalculateStyle.sumDiv>
              <span>주거이전비</span>
              <span>#,##0</span>
            </CalculateStyle.sumDiv>
            <CalculateStyle.sumDiv>
              <span>이사비</span>
              <span>#,##0</span>
            </CalculateStyle.sumDiv>
            <CalculateStyle.sumDiv>
              <span>지급대상</span>
              <span>#,##0</span>
            </CalculateStyle.sumDiv>
            <CalculateStyle.sumDiv>
              <span>총지급액</span>
              <CalculateStyle.resultSpan>#,##0</CalculateStyle.resultSpan>
            </CalculateStyle.sumDiv>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculate;
