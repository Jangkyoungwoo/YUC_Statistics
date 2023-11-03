import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";

function ExportExel(data) {
  const exportdata = (data) => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "items");
    XLSX.writeFile(wb, "items.xlsx");
  };

  return (
    <div>
      <button onClick={(data) => exportdata(data)}>Execl Export</button>
    </div>
  );
}

export default ExportExel;
