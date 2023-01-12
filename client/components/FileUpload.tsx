import { Button } from "@mui/material";
import React from "react";

interface FileUploadProps {
  setFile: Function;
  accept: string;
}

const FileUpload: React.FC<FileUploadProps> = ({setFile, accept}) => {
  const fileInput = React.useRef<HTMLInputElement>(null)

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      setFile(evt.target.files[0])
    }
  }

  return (
    <div onClick={() => fileInput.current?.click()}>
      <input 
      type='file' 
      accept={accept}
      hidden
      ref={fileInput}
      onChange={onChange}
      />
      <Button>Загрузить</Button>
    </div>
  )
}

export default FileUpload;