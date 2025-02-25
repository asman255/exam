import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const Tester = () => {
  const { search } = useLocation();
  const id = new URLSearchParams(search).get("id");
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    lastname: "",
    colorblind: 0,
    longsight: 0,
    astigmatic: 0,
    reflec: 0,
    sign: 0,
    line: 0,
    giveway: 0,
    practice: false,
  });

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5003/api/tester/${id}`
          );
          setFormData(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let score = 0;
    switch (name) {
      case "colorblind":
      case "longsight":
      case "astigmatic":
      case "reflec":
        score = 10;
        break;
      case "sign":
      case "line":
      case "giveway":
        score = 50;
        break;
      default:
        break;
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? (checked ? score : 0) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sendData = async () => {
      try {
        const response = await axios.post("http://localhost:5003/api/tester", {
          ...formData,
        });
        if (response.status === 201) {
          alert("Data saved successfully!");
          window.location.href = "/";
        }
      } catch (error) {
        console.error(error);
      }
    };
    sendData();
  };

  return (
    <>
    <Navbar/>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Tester Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block font-semibold">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label htmlFor="lastname" className="block font-semibold">
                Lastname
              </label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <h3 className="font-semibold mb-2">Physical Tests</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label htmlFor="colorblind" className="block">
                Color Blindness
              </label>
              <input
                type="checkbox"
                name="colorblind"
                checked={formData.colorblind > 0}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <label htmlFor="longsight" className="block">
                Long Sight
              </label>
              <input
                type="checkbox"
                name="longsight"
                checked={formData.longsight > 0}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <label htmlFor="astigmatic" className="block">
                Astigmatism
              </label>
              <input
                type="checkbox"
                name="astigmatic"
                checked={formData.astigmatic > 0}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <label htmlFor="reflec" className="block">
                Reflex
              </label>
              <input
                type="checkbox"
                name="reflec"
                checked={formData.reflec > 0}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
          </div>

          <h3 className="font-semibold mb-2">Theory Tests</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="sign" className="block">
                Traffic Signs
              </label>
              <input
                type="checkbox"
                name="sign"
                checked={formData.sign > 0}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <label htmlFor="line" className="block">
                Road Lines
              </label>
              <input
                type="checkbox"
                name="line"
                checked={formData.line > 0}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <label htmlFor="giveway" className="block">
                Give Way
              </label>
              <input
                type="checkbox"
                name="giveway"
                checked={formData.giveway > 0}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
          </div>

          <h3 className="font-semibold mb-2">Practical Test</h3>
          <div className="mb-4">
            <label htmlFor="practice" className="block">
              Passed Practical Test
            </label>
            <input
              type="checkbox"
              name="practice"
              checked={formData.practice}
              onChange={() =>
                setFormData((prevState) => ({
                  ...prevState,
                  practice: !prevState.practice,
                }))
              }
              className="mt-1"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Tester;
