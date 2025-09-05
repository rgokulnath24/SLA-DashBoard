import { useEffect, useState } from "react";
import Layout from "../Pages/Layout";

export default function Placement_Details() {
  const [placements, setPlacements] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("Details");
    if (storedData) {
      try {
        setPlacements(JSON.parse(storedData));
      } catch (error) {
        console.error("Error parsing placement data:", error);
      }
    }
  }, []);

  const toggleDescription = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Placement Details</h1>

        <div className="overflow-x-auto shadow-md rounded-lg bg-white">
          <table className="w-full border-collapse">
            <thead className="bg-gray-200 text-gray-700 text-sm uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Company</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Contact</th>
                <th className="px-4 py-3 text-left">Job Title</th>
                <th className="px-4 py-3 text-left">Salary (LPA)</th>
                <th className="px-4 py-3 text-left">Job Description</th>
                <th className="px-4 py-3 text-left">Placement Officer</th>
                <th className="px-4 py-3 text-left">Interview Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {placements.map((placement, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {/* Company */}
                  <td className="px-4 py-3 font-bold text-gray-600">
                    {placement.company_name}
                  </td>

                  {/* Location */}
                  <td className="px-4 py-3 text-gray-600">
                    {placement.company_location}
                  </td>

                  {/* Contact Number */}
                  <td className="px-4 py-3 text-gray-600">
                    {placement.company_contact_number || "-"}
                  </td>

                  {/* Job Title */}
                  <td className="px-4 py-3">{placement.job_title}</td>

                  {/* Salary */}
                  <td className="px-4 py-3">{placement.salary_expected} LPA</td>

                  {/* Job Description with toggle */}
                  <td className="px-4 py-3 max-w-xs">
                    {expandedIndex === index
                      ? placement.job_description
                      : placement.job_description?.slice(0, 70) +
                        (placement.job_description?.length > 70 ? "..." : "")}
                    {placement.job_description?.length > 70 && (
                      <button
                        onClick={() => toggleDescription(index)}
                        className="ml-2 text-blue-500 text-xs hover:underline"
                      >
                        {expandedIndex === index ? "Show Less" : "Show More"}
                      </button>
                    )}
                  </td>

                  {/* Placement Officer */}
                  <td className="px-4 py-3">
                    {placement.placement_officer_name} <br />
                    <span className="text-gray-500 text-xs">
                      {placement.placement_officer_number}
                    </span>
                  </td>

                  {/* Interview Date */}
                  <td className="px-4 py-3">{placement.interview_date}</td>
                </tr>
              ))}

              {placements.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-6 text-gray-500 font-medium"
                  >
                    No placement details available.
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
