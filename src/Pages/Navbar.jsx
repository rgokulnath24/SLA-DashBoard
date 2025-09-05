import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function Navbar() {
  const { user } = useContext(UserContext);

  return (
    <nav className="bg-gray-50 p-4.5 flex justify-between items-center w-full border border-none">
      <h1 className="text-xl font-bold">Welcome {user.name}</h1>

      {user && ( 
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full text-lg font-semibold">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>
      )}
    </nav>
  );
}
