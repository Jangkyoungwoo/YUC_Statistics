import * as Result from "../style/Result.style";
import * as Input from "../style/Input.style";
import axios from "axios";
import { useState } from "react";

function InputPage({ onSetSend, onSetSendTwo }) {
  const [list, setList] = useState({
    name: "",
    owner: "",
    address: "",
    headCount: "",
    claiment: "",
    width: 0,
    amount: 0,
    share: 0,
    permission: "",
    agreeDay: "",
    usage: "",
    moveInDate: "",
    note: "",
    settlementDate: "",
    inputOwner: "",
    inputNewer: "",
    inputDisagreeNewer: "",
    inputMovingDate: "",
  });
  const obj = {};
  const postRelocationSettleMent = async (amount, date, share) => {
    try {
      await axios
        .post("/relocationSettlement", {
          amount: `${amount}`,
          date: `${date}`,
          share: `${share}`,
        })
        .then((res) => {
          console.log(res);
          obj.amount = res.data.amount;
          obj.share = res.data.share;
          obj.rate = res.data.rate;
          obj.settlementRes = res.data.result;
        });
    } catch (error) {
      console.log(error);
    }
  };
  const postHousingTransferExpenses = async (headCount, owner) => {
    try {
      await axios
        .post("/housingTransferExpenses", {
          headCount: headCount,
          owner: owner,
        })
        .then((res) => {
          console.log(res);
          obj.headCount = res.data.headCount;
          obj.owner = res.data.owner;
          obj.housingTransferRes = res.data.result;
        });
    } catch (error) {
      console.log(error);
    }
  };
  const postMovingExpenses = async (width) => {
    try {
      await axios
        .post("/movingExpenses", {
          width: `${width}`,
        })
        .then((res) => {
          console.log(res);
          obj.width = res.data.width;
          obj.priceOfWage = res.data.priceOfWage;
          obj.vehicleCost = res.data.vehicleCost;
          obj.packagingFee = res.data.packagingFee;
          obj.sum = res.data.sum;
        });
    } catch (error) {
      console.log(error);
    }
  };
  const totalExpenses = (amount, date, share, headCount, owner, width) => {
    postRelocationSettleMent(amount, date, share);
    postHousingTransferExpenses(headCount, owner);
    postMovingExpenses(width);
    onSetSend(obj);
    onSetSendTwo(list);
  };

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
              <Result.th bgColor="#F0F3FA">사업명</Result.th>
              <Result.th>
                <Input.inputText
                  type="text"
                  onChange={(event) => {
                    setList((prevState) => {
                      return { ...prevState, name: event.target.value };
                    });
                  }}
                ></Input.inputText>
              </Result.th>
              <Result.th bgColor="#F0F3FA">소유자 구분</Result.th>
              <Result.th>
                <Input.selectBox
                  onChange={(event) => {
                    setList((prevState) => {
                      return { ...prevState, owner: event.target.value };
                    });
                  }}
                >
                  <option value="none">소유자 구분</option>
                  <option value="owner">소유자</option>
                  <option value="newer">세입자</option>
                </Input.selectBox>
              </Result.th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Result.td bgColor="#F0F3FA">가옥소재지</Result.td>
              <Result.td>
                <Input.inputText
                  type="text"
                  onChange={(event) => {
                    setList((prevState) => {
                      return { ...prevState, address: event.target.value };
                    });
                  }}
                ></Input.inputText>
              </Result.td>
              <Result.td bgColor="#F0F3FA">가구원수</Result.td>
              <Result.td>
                <Input.inputText
                  type="text"
                  minLength="1"
                  maxLength="1"
                  onChange={(event) => {
                    setList((prevState) => {
                      return { ...prevState, headCount: event.target.value };
                    });
                  }}
                  required
                ></Input.inputText>
              </Result.td>
            </tr>
            <tr>
              <Result.td bgColor="#F0F3FA">청구인</Result.td>
              <Result.td>
                <Input.inputText
                  type="text"
                  onChange={(event) => {
                    setList((prevState) => {
                      return { ...prevState, claiment: event.target.value };
                    });
                  }}
                ></Input.inputText>
              </Result.td>
              <Result.td bgColor="#F0F3FA">주택(연면적)</Result.td>
              <Result.td>
                <Input.inputText
                  type="text"
                  onChange={(event) => {
                    setList((prevState) => {
                      return { ...prevState, width: event.target.value };
                    });
                  }}
                ></Input.inputText>
              </Result.td>
            </tr>
            <tr>
              <Result.td bgColor="#F0F3FA">주거용 건축물 금액</Result.td>
              <Result.td>
                <Input.inputText
                  type="text"
                  onChange={(event) => {
                    setList((prevState) => {
                      return { ...prevState, amount: event.target.value };
                    });
                  }}
                ></Input.inputText>
              </Result.td>
              <Result.td bgColor="#F0F3FA">지분</Result.td>
              <Result.td>
                <Input.inputText
                  type="text"
                  onChange={(event) => {
                    setList((prevState) => {
                      return { ...prevState, share: event.target.value };
                    });
                  }}
                ></Input.inputText>
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
              <Result.th bgColor="#F0F3FA">허가여부</Result.th>
              <Result.th>
                <Input.selectBox
                  onChange={(event) => {
                    setList((prevState) => {
                      return { ...prevState, permission: event.target.value };
                    });
                  }}
                >
                  <option value="none">허가여부</option>
                  <option value="agree">허가</option>
                  <option value="disagree">비허가</option>
                </Input.selectBox>
              </Result.th>
              <Result.th bgColor="#F0F3FA">사용승인일</Result.th>
              <Result.th>
                <Input.inputDate
                  type="date"
                  onChange={(event) => {
                    setList((prevState) => {
                      return { ...prevState, agreeDay: event.target.value };
                    });
                  }}
                ></Input.inputDate>
              </Result.th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Result.td bgColor="#F0F3FA">용도</Result.td>
              <Result.td>
                <Input.selectBox
                  onChange={(event) => {
                    setList((prevState) => {
                      return { ...prevState, usage: event.target.value };
                    });
                  }}
                >
                  <option value="none">용도</option>
                  <option value="house">주택</option>
                  <option value="nonhouse">비주택</option>
                </Input.selectBox>
              </Result.td>
              <Result.td bgColor="#F0F3FA">전입일</Result.td>
              <Result.td>
                <Input.inputDate
                  type="text"
                  onChange={(event) => {
                    setList((prevState) => {
                      return { ...prevState, moveInDate: event.target.value };
                    });
                  }}
                ></Input.inputDate>
              </Result.td>
            </tr>
            <tr>
              <Result.td bgColor="#F0F3FA">비고</Result.td>
              <Result.td>
                {list.usage === "nonhouse" || list.permission === "disagree"
                  ? "무허가"
                  : "적법건축물"}
              </Result.td>
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
              <Result.th bgColor="#F0F3FA">구분</Result.th>
              <Result.th bgColor="#F0F3FA">소유자</Result.th>
              <Result.th bgColor="#F0F3FA">
                세입자
                <br />
                (적법건물)
              </Result.th>
              <Result.th bgColor="#F0F3FA">
                세입자
                <br />
                (무허가 불법건물)
              </Result.th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Result.td bgColor="#F0F3FA">이주정착금</Result.td>
              <Result.td>
                <Input.inputDate
                  type="date"
                  onChange={(event) => {
                    setList((prevState) => {
                      return {
                        ...prevState,
                        settlementDate: event.target.value,
                      };
                    });
                  }}
                ></Input.inputDate>
              </Result.td>
              <Result.td></Result.td>
              <Result.td></Result.td>
            </tr>
            <tr>
              <Result.td bgColor="#F0F3FA">주거이전비</Result.td>
              <Result.td>
                <Input.inputDate
                  type="date"
                  onChange={(event) => {
                    setList((prevState) => {
                      return { ...prevState, inputOwner: event.target.value };
                    });
                  }}
                ></Input.inputDate>
              </Result.td>
              <Result.td>
                <Input.inputDate
                  type="date"
                  onChange={(event) => {
                    setList((prevState) => {
                      return { ...prevState, inputNewer: event.target.value };
                    });
                  }}
                ></Input.inputDate>
              </Result.td>
              <Result.td>
                <Input.inputDate
                  type="date"
                  onChange={(event) => {
                    setList((prevState) => {
                      return {
                        ...prevState,
                        inputDisagreeNewer: event.target.value,
                      };
                    });
                  }}
                ></Input.inputDate>
              </Result.td>
            </tr>
            <tr>
              <Result.td bgColor="#F0F3FA">이사비</Result.td>
              <Result.td colspan="3">
                <Input.inputDate
                  type="date"
                  onChange={(event) => {
                    setList((prevState) => {
                      return {
                        ...prevState,
                        inputMovingDate: event.target.value,
                      };
                    });
                  }}
                ></Input.inputDate>
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
          <Input.btn
            onClick={() => {
              totalExpenses(
                list.amount,
                list.settlementDate,
                list.share,
                list.headCount,
                list.owner,
                list.width
              );
            }}
          >
            계산
          </Input.btn>
        </div>
      </Input.div>
    </div>
  );
}
export default InputPage;
