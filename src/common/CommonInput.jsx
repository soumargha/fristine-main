import React from "react";

const CommonInput = ({
  inputPlaceholder,
  monitorState,
  inputValue,
  inputLabel,
}) => {
  return (
    <>
      <label>{inputLabel}</label>
      <input
        type="text"
        placeholder={inputPlaceholder}
        onChange={monitorState}
        value={inputValue}
        className="rounded-md w-auto h-[30px] border border-black pl-10 pr-5 font-poppins m-2"
      />
    </>
  );
};

export default CommonInput;
