function InputData() {
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
    </div>
  );
}
export default InputData;