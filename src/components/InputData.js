import * as Result from "../style/Result.style";
import * as Input from "../style/Input.style";

function InputPage({
  setInputName,
  setInputList,
  setInputAmountVal,
  setInputSelectVal,
  filterOwner,
  setInputPeople,
  filterPeople,
  housingTransferExpensesEligibility,
  setInputAreaVal,
  combinedArr,
  setInputShareVal,
  calAmount,
  setNote,
  setCDate,
  relocationSettlementEligibility,
  setInputOwner,
  setinputNewer,
  setinputDisagreeNewer,
  setInputMovingDate,
}) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "15px",
        padding: "25px",
        boxShadow: "3px 3px 3px 3px #E2E2EE",
      }}
    >
      <h1>사업정보</h1>
      <Input.div>
        <h3>기본정보</h3>
        <Result.table>
          <thead>
            <tr>
              <Result.th bgColor="#b7e1ff">사업명</Result.th>
              <Result.th>
                <Input.inputText
                  type="text"
                  onChange={(event) => {
                    const inputName = event.target.value;
                  }}
                ></Input.inputText>
              </Result.th>
              <Result.th bgColor="#b7e1ff">소유자 구분</Result.th>
              <Result.th>
                <Input.selectBox onChange={(event) => {}}>
                  <option value="none">소유자 구분</option>
                  <option value="owner">소유자</option>
                  <option value="newer">세입자</option>
                </Input.selectBox>
              </Result.th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Result.td bgColor="#b7e1ff">가옥소재지</Result.td>
              <Result.td>
                <Input.inputText
                  type="text"
                  onChange={(event) => {
                    const inputAdress = event.target.value;
                  }}
                ></Input.inputText>
              </Result.td>
              <Result.td bgColor="#b7e1ff">가구원수</Result.td>
              <Result.td>
                <Input.inputText
                  type="text"
                  minLength="1"
                  maxLength="1"
                  required
                ></Input.inputText>
              </Result.td>
            </tr>
            <tr>
              <Result.td bgColor="#b7e1ff">청구인</Result.td>
              <Result.td>
                <Input.inputText
                  type="text"
                  onChange={(event) => {
                    const inputClaimant = event.target.value;
                  }}
                ></Input.inputText>
              </Result.td>
              <Result.td bgColor="#b7e1ff">주택(연면적)</Result.td>
              <Result.td>
                <Input.inputText type="text"></Input.inputText>
              </Result.td>
            </tr>
            <tr>
              <Result.td bgColor="#b7e1ff">주거용 건축물 금액</Result.td>
              <Result.td>
                <Input.inputText
                  type="text"
                  onChange={(event) => {
                    const inputClaimant = event.target.value;
                  }}
                ></Input.inputText>
              </Result.td>
              <Result.td bgColor="#b7e1ff">지분</Result.td>
              <Result.td>
                <Input.inputText type="text"></Input.inputText>
              </Result.td>
            </tr>
          </tbody>
        </Result.table>
      </Input.div>
      <Input.div>
        <h3>대상적격</h3>
        <Result.table>
          <thead>
            <tr>
              <Result.th bgColor="#b7e1ff">허가여부</Result.th>
              <Result.th>
                <Input.selectBox>
                  <option value="none">허가여부</option>
                  <option value="agree">허가</option>
                  <option value="disagree">비허가</option>
                </Input.selectBox>
              </Result.th>
              <Result.th bgColor="#b7e1ff">사용승인일</Result.th>
              <Result.th>
                <Input.inputDate type="date"></Input.inputDate>
              </Result.th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Result.td bgColor="#b7e1ff">용도</Result.td>
              <Result.td>
                <Input.selectBox>
                  <option value="none">용도</option>
                  <option value="house">주택</option>
                  <option value="nonhouse">비주택</option>
                </Input.selectBox>
              </Result.td>
              <Result.td bgColor="#b7e1ff">전입일</Result.td>
              <Result.td>
                <Input.inputText
                  type="text"
                  onChange={(event) => {
                    const inputClaimant = event.target.value;
                  }}
                ></Input.inputText>
              </Result.td>
            </tr>
            <tr>
              <Result.td bgColor="#b7e1ff">비고</Result.td>
              <Result.td>적법건출물</Result.td>
              <Result.td></Result.td>
              <Result.td></Result.td>
            </tr>
          </tbody>
        </Result.table>
      </Input.div>
      <Input.div>
        <h3>기준일자</h3>
        <Result.table>
          <thead>
            <tr>
              <Result.th bgColor="#b7e1ff">구분</Result.th>
              <Result.th bgColor="#b7e1ff">소유자</Result.th>
              <Result.th bgColor="#b7e1ff">
                세입자
                <br />
                (적법건물)
              </Result.th>
              <Result.th bgColor="#b7e1ff">
                세입자
                <br />
                (무허가 불법건물)
              </Result.th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Result.td bgColor="#b7e1ff">이주정착금</Result.td>
              <Result.td>
                <Input.inputDate type="date"></Input.inputDate>
              </Result.td>
              <Result.td></Result.td>
              <Result.td></Result.td>
            </tr>
            <tr>
              <Result.td bgColor="#b7e1ff">주거이전비</Result.td>
              <Result.td>
                <Input.inputDate type="date"></Input.inputDate>
              </Result.td>
              <Result.td>
                <Input.inputDate type="date"></Input.inputDate>
              </Result.td>
              <Result.td>
                <Input.inputDate type="date"></Input.inputDate>
              </Result.td>
            </tr>
            <tr>
              <Result.td bgColor="#b7e1ff">이사비</Result.td>
              <Result.td colspan="3">
                <Input.inputDate type="date"></Input.inputDate>
              </Result.td>
            </tr>
          </tbody>
        </Result.table>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Input.btn>계산</Input.btn>
        </div>
      </Input.div>
    </div>
  );
}
export default InputPage;
