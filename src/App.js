import React, { useMemo, useState } from "react";
import "./styles.css";

const App = () => {
  const [userList, setUserList] = useState([
    {
      user_id: "U001",
      name: "Alice Johnson",
      role_name: "Admin",
      user_type: "Employee",
      creation_by: "Manager1",
      level_name: "Level 1",
      department_name: "HR",
    },
    {
      user_id: "U002",
      name: "Bob Smith",
      role_name: "User",
      user_type: "Contractor",
      creation_by: "Manager2",
      level_name: "Level 2",
      department_name: "Finance",
    },
    {
      user_id: "U003",
      name: "Charlie Brown",
      role_name: "User",
      user_type: "Employee",
      creation_by: "Manager1",
      level_name: "Level 1",
      department_name: "HR",
    },
  ]);

  const [filters, setFilters] = useState({
    global: "",
    name: "",
    user_id: "",
    role_name: "",
    user_type: "",
    creation_by: "",
    level_name: "",
    department_name: "",
  });

  const filterUsers = (userList, filters) => {
    return userList?.filter((user) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true; // Skip if no filter value

        if (key === "global") {
          return Object.values(user).some(
            (fieldValue) =>
              fieldValue != null &&
              fieldValue.toString().toLowerCase().includes(value.toLowerCase())
          );
        }

        if (typeof value === "string") {
          return user[key]?.toLowerCase().startsWith(value.toLowerCase());
        }

        return user[key] === value; // Exact match for other types
      });
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredUserList = useMemo(
    () => filterUsers(userList, filters),
    [userList, filters]
  );

  return (
    <div>
      <h1>User Search</h1>
      <input
        type="text"
        name="global"
        placeholder="Search all fields..."
        value={filters.global}
        onChange={handleInputChange}
      />
      <br />
      <input
        type="text"
        name="name"
        placeholder="Search by name..."
        value={filters.name}
        onChange={handleInputChange}
      />
      <br />
      <input
        type="text"
        name="role_name"
        placeholder="Search by Role name..."
        value={filters.role_name}
        onChange={handleInputChange}
      />
      <br />
      <input
        type="text"
        name="user_id"
        placeholder="Search by user ID..."
        value={filters.user_id}
        onChange={handleInputChange}
      />
      <br />
      <input
        type="text"
        name="level_name"
        placeholder="Search by level_name..."
        value={filters.level_name}
        onChange={handleInputChange}
      />
      <br />
      <input
        type="text"
        name="user_type"
        placeholder="Search by user_type..."
        value={filters.user_type}
        onChange={handleInputChange}
      />
      <br />
      <h2>Filtered Users:</h2>

      {filteredUserList.map((user) => (
        <div className="box">
          <li> NAME : {user.name}</li>
          <li> ROLE NAME : {user.role_name}</li>
          <li> USER ID :{user.user_id}</li>

          <li>LEVEL NAME: {user.level_name} </li>
          <li> USER TYPE : {user.user_type}</li>
        </div>
      ))}
    </div>
  );
};

export default App;
