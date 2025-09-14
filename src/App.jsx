// import Form from "./Forms/Form"
import { Route, Routes } from "react-router-dom"
import Dashboard from "./Pages/Dashboard"
import Login from "./Pages/Login"
import Form from "./Forms/Placement_Form"
import Student_Form from "./Forms/Student_Form"
import Student_Details from "./Forms/Student_Details"
import Placement_Details from "./Forms/Placement_Details"
import Company_Info from "./Forms/Company_Info"



function App() {
 return(
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/Form" element={<Form />} />
      <Route path="/Student_Form" element={<Student_Form />} />
      <Route path="/Student_Details" element={<Student_Details />} />
      <Route path="/Placement_Details" element={<Placement_Details />} />
      <Route path="/Company_Info" element={<Company_Info />} />
    </Routes>
 )
}

export default App
