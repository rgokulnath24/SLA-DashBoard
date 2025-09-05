import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
// import Navbar from "../Pages/Navbar";
// import Sidebar from "../Pages/SideNavbar";
import Layout from "../Pages/Layout";


export default function Form() {
  const today = new Date().toISOString().split("T")[0];
  // allows only alphabets and spaces
  const onlyLettersAndSpaces = (value) => {
    return /^[A-Za-z\s]{0,20}$/.test(value);
  };
  const onlyTenDigits = (value) => {
    return /^[0-9]{0,10}$/.test(value);
  };


  const initial_data = {
    company_name: "",
    company_location: "",
    // company_logo: "",
    company_contact_number: "",
    job_title: "",
    salary_expected: "",
    job_description: "",
    placement_officer_name: "",
    placement_officer_number: "",
    interview_date: today,
    conditions: "",
    required_candidates: "",
  };

  const [details, setDetails] = useState(initial_data);
  const [detailed_entries, setDetailed_entries] = useState([]);
  const company_name_ref = useRef(null);

  useEffect(() => {
    if (company_name_ref.current) {
      company_name_ref.current.focus();
    }

  }, [])

  const submit_data = (e) => {
    e.preventDefault();
    // if(Object.values(details).some((value)=>value===""))
    // {
    //     alert("Form Field should not be Empty");
    //     return ;
    // }
    const get_exs_data=JSON.parse(localStorage.getItem("Details")) || [];
    const newEntry = [...get_exs_data, details];
    setDetailed_entries(newEntry);
    localStorage.setItem("Details", JSON.stringify(newEntry));
    // alert("Data saved Locally");
    Swal.fire({ icon: "success", title: "Saved", text: "Data Saved Successfully", showConfirmButton: "false", timer: 1500 });
    setDetails(initial_data);
  };

  return (
    <Layout>
      <div className="flex justify-center mt-6">
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-6xl">
          <h1 className="text-2xl font-semibold text-black mb-6 text-center">
            Placement Form
          </h1>
          <form onSubmit={submit_data} className="space-y-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Company Name:</label>
                <input
                  type="text"
                  value={details.company_name} ref={company_name_ref}
                  onChange={(e) => {
                    if (onlyLettersAndSpaces(e.target.value)) {
                      setDetails({ ...details, company_name: e.target.value })
                    }
                  }}
                  className="border border-gray-300 rounded-lg p-2"
                  placeholder="Enter company name" required
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Company Location:</label>
                <input
                  type="text"
                  value={details.company_location}
                  onChange={(e) => {
                    if (onlyLettersAndSpaces(e.target.value)) {
                      setDetails({ ...details, company_location: e.target.value })
                    }
                  }
                  }
                  className="border border-gray-300 rounded-lg p-2"
                  placeholder="Enter company location" required
                />
              </div>

              {/* <div>
                <label className="mb-1 font-medium">Company Logo:</label>
                <input
                  type="file" value={details.company_logo}
                  onChange={(e) => {
                    if (onlyTenDigits(e.target.value)) {
                      setDetails({ ...details, company_logo: e.target.value })
                    }
                  }
                  }
                  className="border border-gray-300 rounded-lg p-2" required
                />
              </div> */}

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Company Phone(Optional):</label>
                <input
                  type="tel"
                  value={details.company_contact_number}
                  onChange={(e) => {
                    if (onlyTenDigits(e.target.value)) {
                      setDetails({
                        ...details,
                        company_contact_number: e.target.value,
                      })
                    }
                  }}
                  className="border border-gray-300 rounded-lg p-2"
                  placeholder="Enter company contact number"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Salary Expected(LPA):</label>
                <input
                  type="text"
                  value={details.salary_expected}
                  onChange={(e) => {
                    if (onlyTenDigits(e.target.value)) {
                      setDetails({ ...details, salary_expected: e.target.value })
                    }
                  }}
                  className="border border-gray-300 rounded-lg p-2"
                  placeholder="Enter salary expected" required
                />
              </div>
            </div>




            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Interview Date:</label>
                <input
                  type="date"
                  value={details.interview_date}
                  onChange={(e) =>
                    setDetails({ ...details, interview_date: e.target.value })
                  }
                  className="border border-gray-300 rounded-lg p-2"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Required Candidate:</label>
                <input
                  type="text"
                  value={details.required_candidates}
                  onChange={(e) => {
                    if (onlyTenDigits(e.target.value)) {
                      setDetails({
                        ...details,
                        required_candidates: e.target.value,
                      })
                    }
                  }}
                  className="border border-gray-300 rounded-lg p-2"
                  placeholder="Enter required candidates" required
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Placement Officer Name:</label>
                <input
                  type="text"
                  value={details.placement_officer_name}
                  onChange={(e) => {
                    if (onlyLettersAndSpaces(e.target.value)) {
                      setDetails({
                        ...details,
                        placement_officer_name: e.target.value,
                      })
                    }
                  }}
                  className="border border-gray-300 rounded-lg p-2"
                  placeholder="Enter placement officer name" required
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Placement Officer Phone:</label>
                <input
                  type="tel"
                  value={details.placement_officer_number}
                  onChange={(e) => {
                    if (onlyTenDigits(e.target.value)) {
                      setDetails({
                        ...details,
                        placement_officer_number: e.target.value,
                      })
                    }
                  }}
                  className="border border-gray-300 rounded-lg p-2"
                  placeholder="Enter placement officer number" required
                />
              </div>


            </div>
            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Job Title:</label>
                <textarea
                  value={details.job_title}
                  onChange={(e) =>
                    setDetails({ ...details, job_title: e.target.value })
                  }
                  className="border border-gray-300 rounded-lg p-2"
                  placeholder="Enter job title" required rows="4" maxLength={400}
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Job Description:</label>
                <textarea
                  value={details.job_description}
                  onChange={(e) =>
                    setDetails({ ...details, job_description: e.target.value })
                  }
                  className="border border-gray-300 rounded-lg p-2"
                  rows="4"
                  placeholder="Enter job description" required maxLength={400}
                />
              </div>


              <div className="flex flex-col">
                <label className="mb-1 font-medium">Conditions:</label>
                <textarea
                  value={details.conditions}
                  onChange={(e) =>
                    setDetails({ ...details, conditions: e.target.value })
                  }
                  className="border border-gray-300 rounded-lg p-2"
                  rows="4"
                  placeholder="Enter conditions" required maxLength={400}
                />
              </div>
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
}
