const CommonBtn = ({ btnName, btnClick }) => {
  return (
    <button
      onClick={btnClick}
      className="bg-[#45718e] text-white py-2 px-8 rounded-md shadow-lg transform transition-transform duration-200 ease-in-out active:scale-95 w-auto font-medium flex items-center mr-2"
    >
      {btnName}
    </button>
  );
};

export default CommonBtn;
