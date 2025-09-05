import { useEffect, useState } from "react";
import Layout from "../Pages/Layout";

export default function Company_Info() {
  const [placements, setPlacements] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null); // track which job desc is expanded

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

  // toggle job description expansion
  const toggleDescription = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // handle apply click
  const handleApply = (company) => {
    alert(`Applied to ${company}!`);
    // You can also navigate to apply page or save applied jobs in localStorage
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Latest Job Openings</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {placements.map((placement, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between hover:shadow-2xl transition duration-300 text-left"
            >
              {/* Header with Company Logo & Name */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gray-200 text-xl font-bold text-gray-700">
                  {placement.company_name
                    ? placement.company_name.charAt(0).toUpperCase()
                    : "?"}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {placement.company_name}
                  </h2>
                  <p className="text-gray-500 text-sm">{placement.company_location}</p>
                </div>
              </div>

              {/* Job Details */}
              <div className="space-y-2 text-sm text-gray-700 flex-1">
                <p>
                  <strong>Job Title:</strong> {placement.job_title}
                </p>
                <p>
                  <strong>Salary:</strong> {placement.salary_expected} LPA
                </p>

                {/* Job Description with toggle */}
                <p>
                  <strong>Job Description:</strong>{" "}
                  {expandedIndex === index
                    ? placement.job_description
                    : placement.job_description?.slice(0, 70) +
                      (placement.job_description?.length > 70 ? "..." : "")}
                </p>
                {placement.job_description?.length > 70 && (
                  <button
                    onClick={() => toggleDescription(index)}
                    className="text-blue-500 text-sm hover:underline"
                  >
                    {expandedIndex === index ? "Show Less" : "Show More"}
                  </button>
                )}
              </div>

              {/* Apply Button */}
              <div className="mt-4">
                <button
                  onClick={() => handleApply(placement.company_name)}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
