import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import FilePresentIcon from "@mui/icons-material/FilePresent";

function ImportFile() {
  const onDrop = useCallback((acceptedFiles) => {
    // 파일이 드롭되면 실행되는 콜백
    console.log("Dropped files:", acceptedFiles);

    // 드롭된 파일에 대한 추가적인 로직을 수행할 수 있습니다.
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "15px",
        padding: "25px",
        boxShadow: "3px 3px 3px 3px #E2E2EE",
        width: "800px",
        height: "500px",
        marginTop: "50px",
      }}
    >
      <div>자료등록</div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FilePresentIcon fontSize="large" />
          <div>근거자료 등록</div>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", float: "right" }}
        >
          <div {...getRootProps()} style={dropzoneStyles}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>이미지를 여기에 드롭하세요</p>
            ) : (
              <div>
                <UploadFileIcon />
                <p>파일을 등록해 주세요</p>
              </div>
            )}
          </div>
          <div style={{ float: "right" }}>
            <input type="file"></input>
            <button>업로드</button>
          </div>
        </div>
      </div>
      <button>결과 파일 다운로드</button>
    </div>
  );
}

const dropzoneStyles = {
  width: "500px",
  border: "2px dashed #ccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
  float: "right",
};
export default ImportFile;
