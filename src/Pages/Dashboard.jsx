import Layout from "./Layout";
import { Code, Database, Globe, Server, Smartphone, Brain } from "lucide-react";

const courses = [
  { title: "Full Stack Development", icon: <Code className="w-8 h-8 text-blue-500" /> },
  { title: "Python & Data Science", icon: <Database className="w-8 h-8 text-purple-500" /> },
  { title: "Artificial Intelligence (AI & ML)", icon: <Brain className="w-8 h-8 text-pink-500" /> },
  { title: "Web Development", icon: <Globe className="w-8 h-8 text-green-500" /> },
  { title: "Cloud Computing & AWS", icon: <Server className="w-8 h-8 text-indigo-500" /> },
  { title: "Mobile App Development", icon: <Smartphone className="w-8 h-8 text-yellow-500" /> },
];

export default function Dashboard() {
  return (
    <Layout>
       <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
           Most Popular Training/Courses
        </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {courses.map((course, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="mb-4">{course.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 text-center">
              {course.title}
            </h3>
          </div>
        ))}
      </div>
    </Layout>
  );
}
