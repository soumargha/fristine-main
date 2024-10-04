const TabelEmployee = ({ employeeDetails }) => {
  return (
    <div className="flex justify-center items-center p-4">
      <table className="table-auto border-collapse w-full shadow-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="px-4 py-2 border">ID's</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Department</th>
            <th className="px-4 py-2 border">Address</th>
          </tr>
        </thead>
        <tbody>
          {employeeDetails.map((row, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } hover:bg-gray-300 cursor-pointer transition duration-150 ease-in-out`}
            >
              <td className="px-4 py-2 border text-center">{row.dealer}</td>
              <td className="px-4 py-2 border text-center">{row.name}</td>
              <td className="px-4 py-2 border text-center">{row.email}</td>
              <td className="px-4 py-2 border text-center">{row.department}</td>
              <td className="px-4 py-2 border text-center">{row.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelEmployee;
