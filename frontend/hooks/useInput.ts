import React from "react";

export const useInput = (initialValue: any) => {
  const [value, setValue] = React.useState(initialValue);

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  return {
    value, onChange
  };
};