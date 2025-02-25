import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Report = () => {
  const [testers, setTesters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5003/api/tester");
        setTesters(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id) => {
    // Send id data to page tester.jsx so i can use its form to edit
    window.location.href = `/tester?id=${id}`;
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5003/api/tester/${id}`);
      setTesters(testers.filter((tester) => tester.id !== id));
    } catch (error) {
      console.error("Error deleting tester", error);
    }
  };

  return (
    <>
    <Navbar/>
      <div className="flex items-center justify-center p-4 ">
        <table className="rounded-lg p-4 border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Last Name</th>
              <th className="border border-gray-300 px-4 py-2">Body Result</th>
              <th className="border border-gray-300 px-4 py-2">
                Theory Result
              </th>
              <th className="border border-gray-300 px-4 py-2">Practice</th>
              <th className="border border-gray-300 px-4 py-2">Final</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testers.map((tester) => (
              <tr key={tester.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {tester.id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {tester.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {tester.lastname}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {tester.bodyresult ? "Pass" : "Fail"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {tester.theoryresult ? "Pass" : "Fail"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {tester.practice ? "Yes" : "No"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {tester.final}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
                    onClick={() => handleEdit(tester.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2"
                    onClick={() => handleDelete(tester.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Report;
