import React, { useState, useEffect } from "react";
import CommonInput from "../common/CommonInput";
import CommonBtn from "../common/CommonBtn";
import Tabel from "./Table";

const Department = ({ setDepartmentList, navigateEmployee }) => {
  const [deptCode, setDepCode] = useState("");
  const [deptName, setDeptName] = useState("");

  const [departmentTableList, setDepartmentTableList] = useState(
    JSON.parse(localStorage.getItem("departmentTableList")) || []
  );

  useEffect(() => {
    localStorage.setItem(
      "departmentTableList",
      JSON.stringify(departmentTableList)
    );
    setDepartmentList(departmentTableList.map((dept) => dept.departmentName));
  }, [departmentTableList, setDepartmentList]);

  const addDepartment = (e) => {
    e.preventDefault();
    if (validation()) {
      const newDepartment = {
        departmentCode: deptCode,
        departmentName: deptName,
      };
      setDepartmentTableList((prevData) => [...prevData, newDepartment]);
      setDeptName("");
      setDepCode("");
    }
  };

  const validation = () => {
    if (!deptCode) {
      alert("Department Code cannot be empty");
      return false;
    } else if (!/^\d+$/.test(deptCode)) {
      alert("Department Code should contain only numbers");
      return false;
    }

    if (!deptName) {
      alert("Department Name cannot be empty");
      return false;
    }

    const normalizedDeptCode = deptCode.toLowerCase();
    const isDuplicate = departmentTableList.some(
      (dept) =>
        dept.departmentCode.toLowerCase() === normalizedDeptCode ||
        dept.departmentName === deptName
    );
    if (isDuplicate) {
      alert("Duplicate department entry is not allowed");
      return false;
    }

    return true;
  };

  return (
    <div className="-mt-7 h-screen bg-gradient-to-r from-blue-50 to-blue-200 flex justify-center items-center p-6">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-700 bg-blue-100 px-4 py-2 rounded-md inline-block">Department Details
          </h1>
        </div>
        <form onSubmit={addDepartment} className="space-y-4">
          <div className="flex justify-between">
            <CommonInput
              inputPlaceholder="Department Code"
              inputValue={deptCode}
              monitorState={(e) => setDepCode(e.target.value)}
              className="w-1/2 mr-4 shadow-sm rounded-md"
            />
            <CommonInput
              inputPlaceholder="Department Name"
              inputValue={deptName}
              monitorState={(e) => setDeptName(e.target.value)}
              className="w-1/2 shadow-sm rounded-md"
            />
          </div>
          <div className="flex justify-center mt-6">
            <CommonBtn
              btnName="Add Details"
              btnClick={addDepartment}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-md"
            />
          </div>
        </form>

        <div className="mt-8">
          <Tabel departmentTableList={departmentTableList} />
        </div>

        <div className="flex justify-center mt-8">
          <CommonBtn
            btnName="Employee Details"
            btnClick={navigateEmployee}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Department;
