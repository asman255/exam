import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Report = () => {
  const [testers, setTesters] = useState([]);
  const [search, setSearch] = useState("");
  const [todayPass, setTodayPass] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5003/api/tester?search=${search}`
        );
        setTesters(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    const fetchTodayPass = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5003/api/tester/today-pass`
        );
        setTodayPass(response.data);
      } catch (error) {
        console.error("Error fetching today pass", error);
      }
    };

    fetchData();
    fetchTodayPass();
  }, [search]);

  const handleEdit = (id) => {
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

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center p-4 ">
        <p className="text-lg font-bold mb-4">
          จำนวนผู้ผ่านในวันนี้ {todayPass.pass}/{todayPass.pass + todayPass.notpass}
        </p>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search "
          className="border border-gray-300 px-4 py-2 rounded-lg w-3xl my-3"
        />
        <table className="rounded-lg p-4 border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">ชื่อ</th>
              <th className="border border-gray-300 px-4 py-2">นามสกุล</th>
              <th className="border border-gray-300 px-4 py-2">ทดสอบร่างกาย</th>
              <th className="border border-gray-300 px-4 py-2">
            สอบภาคทฤษฏี
              </th>
              <th className="border border-gray-300 px-4 py-2">สอบภาคปฏิบัติ</th>
              <th className="border border-gray-300 px-4 py-2">ผลการสอบ</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testers
              .filter((tester) => {
                const name = tester.name.toLowerCase();
                const lastname = tester.lastname.toLowerCase();
                const searchLowercase = search.toLowerCase();

                return (
                  name.includes(searchLowercase) ||
                  lastname.includes(searchLowercase)
                );
              })
              .map((tester) => (
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

