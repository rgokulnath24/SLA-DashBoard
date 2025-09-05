import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import Layout from "../Pages/Layout";

const Student_Form = () => {
  const today = new Date().toISOString().split("T")[0];

  const initial_data = {
    Name: "",
    Email: "",
    MobileNumber: "",
    EducationQualification: "",
    PassOut: "",
    Skill: "",
    TrainerName: "",
    AppliedDate: today,
    Resume: "",
    CandidateImage: "",
    CurrentLocation: "",
  };

  const [formData, setFormData] = useState(initial_data);
  const [entries, setEntries] = useState([]);
  const nameRef = useRef(null);

  // Auto-focus first field
  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, []);

  // Handle input change
 const handleChange = (e) => {
  const { name, type, files, value } = e.target;
  
  if (type === "file" && files.length > 0) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        [name]: reader.result, // Base64 string
      });
    };
    reader.readAsDataURL(files[0]);
  } else {
    setFormData({ ...formData, [name]: value });
  }
};


  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const new_data=JSON.parse(localStorage.getItem("StudentDetails")) || [];
    const newEntry = [...new_data, formData];
    setEntries(newEntry);
    localStorage.setItem("StudentDetails", JSON.stringify(newEntry));

    Swal.fire({
      icon: "success",
      title: "Saved",
      text: "Student details saved successfully",
      timer: 1500,
      showConfirmButton: false,
    });

    setFormData(initial_data);
  };

  return (
    <Layout>
      <div className="flex justify-center mt-6">
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-6xl">
          <h1 className="text-2xl font-semibold text-black mb-6 text-center">
            Student Registration Form
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Name:</label>
                <input
                  ref={nameRef}
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  type="text"
                  className="border border-gray-300 rounded-lg p-2"
                  placeholder="Enter name"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Email:</label>
                <input
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  type="email"
                  className="border border-gray-300 rounded-lg p-2"
                  placeholder="Enter email"
                  required
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Mobile Number:</label>
                <input
                  name="MobileNumber"
                  value={formData.MobileNumber}
                  onChange={handleChange}
                  type="text"
                  className="border border-gray-300 rounded-lg p-2"
                  placeholder="Enter mobile number"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Education Qualification:</label>
                <input
                  name="EducationQualification"
                  value={formData.EducationQualification}
                  onChange={handleChange}
                  type="text"
                  className="border border-gray-300 rounded-lg p-2"
                  placeholder="Enter qualification"
                  required
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Pass Out Year:</label>
                <input
                  name="PassOut"
                  value={formData.PassOut}
                  onChange={handleChange}
                  type="text"
                  className="border border-gray-300 rounded-lg p-2"
                  placeholder="Enter year"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Skills:</label>
                <input
                  name="Skill"
                  value={formData.Skill}
                  onChange={handleChange}
                  type="text"
                  className="border border-gray-300 rounded-lg p-2"
                  placeholder="Enter skills"
                  required
                />
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Trainer Name:</label>
                <input
                  name="TrainerName"
                  value={formData.TrainerName}
                  onChange={handleChange}
                  type="text"
                  className="border border-gray-300 rounded-lg p-2"
                  placeholder="Enter trainer name"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Applied Date:</label>
                <input
                  name="AppliedDate"
                  value={formData.AppliedDate}
                  onChange={handleChange}
                  type="date"
                  className="border border-gray-300 rounded-lg p-2"
                />
              </div>
            </div>

            {/* Row 5 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Resume:</label>
                <input
                  name="Resume"
                  // value={formData.Resume}
                  onChange={handleChange}
                  type="file"
                  className="border border-gray-300 rounded-lg p-2 bg-white"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Candidate Image:</label>
                <input
                  name="CandidateImage"
                  // value={formData.CandidateImage}
                  onChange={handleChange}
                  type="file"
                  className="border border-gray-300 rounded-lg p-2 bg-white"
                />
              </div>
            </div>

            {/* Row 6 */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Current Location:</label>
              <input
                name="CurrentLocation"
                value={formData.CurrentLocation}
                onChange={handleChange}
                type="text"
                className="border border-gray-300 rounded-lg p-2"
                placeholder="Enter city"
                required
              />
            </div>

            {/* Submit */}
            <div className="flex justify-center mt-6">
              <input
                type="submit"
                className="bg-blue-600 text-white p-3 rounded-lg w-1/2 hover:bg-blue-700 transition"
                value="Submit"
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Student_Form;
