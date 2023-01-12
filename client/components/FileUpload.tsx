import React from "react";

interface FileUploadProps {
  file: any;
  setFile: Function;
  accept: string;
}

const FileUpload: React.FC<FileUploadProps> = ({file, setFile}) => {
  return (
    <>
      <input type='file' />
    </>
  )
}

export default FileUpload;