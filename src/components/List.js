import * as ListStyle from "../style/List.style";

function List() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          background: "#5B6ABF",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "3px 3px 3px 3px #E2E2EE",
          color: "white",
        }}
      >
        <h4>산정 기초</h4>
        <ListStyle.button>이주정착금</ListStyle.button>
        <ListStyle.button>주거이전비</ListStyle.button>
        <ListStyle.button>이사비</ListStyle.button>
      </div>
    </div>
  );
}

export default List;
