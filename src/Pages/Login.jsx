// LoginRegister.jsx
import { useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const initialState = {
  isRegister: false,
  userdetails: { name: "", password: "" },
  confirmPassword: "",
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_MODE":
      return { ...state, isRegister: !state.isRegister, error: "" };

    case "SET_FIELD":
      return {
        ...state,
        userdetails: { ...state.userdetails, [action.field]: action.value },
      };

    case "SET_CONFIRM_PASSWORD":
      return { ...state, confirmPassword: action.value };

    case "SET_ERROR":
      return { ...state, error: action.value };

    case "RESET_FORM":
      return {
        ...state,
        // userdetails: { name: "", password: "" },
        confirmPassword: "",
        error: "",
        isRegister: false,
      };

    default:
      return state;
  }
}

export default function LoginRegister() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (state.isRegister) {
      // Validation: check password match
      if (state.userdetails.password !== state.confirmPassword) {
        dispatch({ type: "SET_ERROR", value: "Passwords do not match!" });
        return;
      }

      const users_arr = JSON.parse(localStorage.getItem("users")) || [];

      // Check duplicate username true or false it returns
      if (users_arr.some((u) => u.name === state.userdetails.name)) {
        dispatch({ type: "SET_ERROR", value: "Username already exists!" });
        return;
      }

      const new_arr = [...users_arr, state.userdetails];
      localStorage.setItem("users", JSON.stringify(new_arr));

      alert("Registration successful! Please login now.");
      dispatch({ type: "RESET_FORM" });
    } else {
      // Login flow
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const found_user = users.find(
        (u) =>
          u.name === state.userdetails.name &&
          u.password === state.userdetails.password
      );

      if (found_user) {
        setUser({ name: state.userdetails.name });
        navigate("/dashboard");
      } else {
        alert("Invalid credentials. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          {state.isRegister ? "Register" : "Login"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block mb-1 font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              value={state.userdetails.name}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "name",
                  value: e.target.value,
                })
              }
              name="name"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Enter username"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              value={state.userdetails.password}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "password",
                  value: e.target.value,
                })
              }
              name="password"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Enter password"
              required
            />
          </div>

          {/* Confirm Password - only show in Register */}
          {state.isRegister && (
            <div>
              <label className="block mb-1 font-medium text-gray-600">
                Confirm Password
              </label>
              <input
                type="password"
                value={state.confirmPassword}
                onChange={(e) =>
                  dispatch({ type: "SET_CONFIRM_PASSWORD", value: e.target.value })
                }
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  state.error
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-400 focus:ring-blue-200"
                }`}
                placeholder="Confirm password"
                required
              />
              {state.error && (
                <p className="text-red-500 text-sm mt-1">{state.error}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {state.isRegister ? "Register" : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          {state.isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => dispatch({ type: "TOGGLE_MODE" })}
            className="text-blue-500 hover:underline"
          >
            {state.isRegister ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
}
