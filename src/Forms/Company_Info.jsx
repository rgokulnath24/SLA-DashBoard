import { useEffect, useState } from "react";
import Layout from "../Pages/Layout";
import { motion } from "framer-motion"; // ✅ animations

export default function Company_Info() {
  const [placements, setPlacements] = useState([]);
  const [selectedPlacement, setSelectedPlacement] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleView = (placement) => {
    setSelectedPlacement(placement);
    setIsModalOpen(true);
  };

  const handleApply = (company) => {
    alert(`Applied to ${company}!`);
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">
          🔍 Explore the Latest Job Openings
        </h1>

        {/* Job Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {placements.map((placement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col justify-between relative"
            >
              {/* Badge */}
              <span className="absolute top-3 right-3 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                Recently Posted
              </span>

              {/* Company + Location */}
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  {placement.job_title}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {placement.company_name} • {placement.company_location}
                </p>
              </div>

              {/* Salary */}
              <p className="mt-3 text-sm text-green-600 font-semibold">
                💰 {placement.salary_expected} LPA
              </p>

              {/* Job Description Preview */}
              <p className="mt-2 text-gray-600 text-sm line-clamp-3">
                {placement.job_description}
              </p>

              {/* Posted Date (Fake for demo) */}
              <p className="mt-2 text-xs text-gray-400">
                📅 Posted {Math.floor(Math.random() * 10) + 1} days ago
              </p>

              {/* Action Buttons */}
              <div className="mt-4 flex justify-between">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleView(placement)}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                >
                  View Details
                </motion.button>
                {/* <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleApply(placement.company_name)}
                  className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition"
                >
                  Apply
                </motion.button> */}
              </div>
            </motion.div>
          ))}

          {placements.length === 0 && (
            <p className="col-span-full text-center text-gray-500 font-medium">
              🚀 No job openings available right now. Check back soon!
            </p>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && selectedPlacement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative"
            >
              <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
                {selectedPlacement.job_title}
              </h2>
              <div className="space-y-3 text-gray-700 text-sm">
                <p>
                  <strong>🏢 Company:</strong> {selectedPlacement.company_name}
                </p>
                <p>
                  <strong>📍 Location:</strong>{" "}
                  {selectedPlacement.company_location}
                </p>
                <p>
                  <strong>💰 Salary:</strong>{" "}
                  {selectedPlacement.salary_expected} LPA
                </p>
                <p>
                  <strong>📝 Job Description:</strong>{" "}
                  {selectedPlacement.job_description}
                </p>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex justify-end gap-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
                >
                  Close
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleApply(selectedPlacement.company_name)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Apply Now
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
