const Tabel = ({ departmentTableList }) => {
  return (
    <div className="flex justify-center items-center p-4">
      <table className="table-auto border-collapse w-full shadow-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="px-4 py-2 border">Code</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {departmentTableList.map((row, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } hover:bg-gray-300 cursor-pointer transition duration-150 ease-in-out`}
            >
              <td className="px-4 py-2 border text-center">
                {row.departmentCode}
              </td>
              <td className="px-4 py-2 border text-center">
                {row.departmentName}
              </td>
              <td className="px-4 py-2 border text-center">Active</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tabel;
