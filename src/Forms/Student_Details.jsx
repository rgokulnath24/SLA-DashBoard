import { useEffect, useState } from "react";
import Layout from "../Pages/Layout";

export default function StudentTableGrid() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("StudentDetails");
    if (storedData) {
      try {
        setStudents(JSON.parse(storedData));
      } catch (error) {
        console.error("Error parsing student data:", error);
      }
    }
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Student Details</h1>

        <div className="overflow-x-auto shadow-md rounded-lg bg-white">
          <table className="w-full border-collapse">
            <thead className="bg-gray-200 text-gray-700 text-sm uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Photo</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Mobile</th>
                <th className="px-4 py-3 text-left">Education</th>
                <th className="px-4 py-3 text-left">Pass Out</th>
                <th className="px-4 py-3 text-left">Skill</th>
                <th className="px-4 py-3 text-left">Trainer</th>
                <th className="px-4 py-3 text-left">Applied Date</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-center">Resume</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {students.map((student, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {/* Candidate Image */}
                  <td className="px-4 py-3">
                    {student.CandidateImage ? (
                      <img
                        src={student.CandidateImage}
                        alt={student.Name}
                        className="w-14 h-14 object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-14 h-14 flex items-center justify-center bg-gray-200 text-sm font-bold text-gray-700 rounded-full">
                        {student.Name ? student.Name.charAt(0).toUpperCase() : "?"}
                      </div>
                    )}
                  </td>

                  {/* Name */}
                  <td className="px-4 py-3 font-bold text-blue-700">
                    {student.Name.toUpperCase()}
                  </td>

                  {/* Email */}
                  <td className="px-4 py-3">{student.Email}</td>

                  {/* Mobile */}
                  <td className="px-4 py-3">{student.MobileNumber}</td>

                  {/* Education */}
                  <td className="px-4 py-3">{student.EducationQualification}</td>

                  {/* Pass Out */}
                  <td className="px-4 py-3">{student.PassOut}</td>

                  {/* Skill */}
                  <td className="px-4 py-3">{student.Skill}</td>

                  {/* Trainer */}
                  <td className="px-4 py-3">{student.TrainerName}</td>

                  {/* Applied Date */}
                  <td className="px-4 py-3">{student.AppliedDate}</td>

                  {/* Location */}
                  <td className="px-4 py-3">{student.CurrentLocation}</td>

                  {/* Resume Link */}
                  <td className="px-4 py-3 text-center">
                    {student.Resume ? (
                      <a
                        href={student.Resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-blue-600 text-white rounded-md text-xs hover:bg-blue-700 transition"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                </tr>
              ))}

              {students.length === 0 && (
                <tr>
                  <td
                    colSpan="11"
                    className="text-center py-6 text-gray-500 font-medium"
                  >
                    No student details available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
