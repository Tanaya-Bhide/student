import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setdata] = useState([]);
  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/get");
    setdata(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);
  const deletestudent = (id) => {
    if (window.confirm("Are you sure you want to delete that student ? ")) {
      axios.delete(`http://localhost:5000/api/remove/${id}`);
      toast.success("Student deleted successfully");
      setTimeout(() => loadData(), 500);
    }
  };
  return (
    <div style={{ marginTop: "150px " }}>
      <Link to="/addstudent">
        <button className="btn btn-contact">Add student</button>
      </Link>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>id</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>dept_name</th>
            <th style={{ textAlign: "center" }}>total_cred</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.dept_name}</td>
                <td>{item.total_cred}</td>
                <td>
                  <Link to={`/update/${item.id}`}>
                    <button className="btn btn-edit">EDIT</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => deletestudent(item.id)}
                  >
                    DELETE
                  </button>
                  <Link to={`view/${item.id}`}>
                    <button className="btn btn-view">view</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Home;
