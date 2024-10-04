import React, { useEffect, useState } from "react";
import Department from "./Department";
import { useNavigate } from "react-router-dom";

const MainComponent = () => {
  const [departmentList, setDepartmentList] = useState([]);
  const history = useNavigate();

  const navigateEmployee = () => {
    history("/employee");
  };

  useEffect(() => {
    localStorage.setItem("departmentListFinal", JSON.stringify(departmentList));
  }, [departmentList]);

  return (
    <div className=" mt-7">
      <Department
        setDepartmentList={setDepartmentList}
        navigateEmployee={navigateEmployee}
      />
    </div>
  );
};

export default MainComponent;
