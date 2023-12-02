import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";

import axios from "axios";
import AccountNav from "../AccountNav";

export default function ProfilePage() {
  const { user, ready, setUser } = useContext(UserContext);
  const [redirect, setRediret] = useState(null);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");

    setRediret("/");
    setUser(null);
  }

  if (!ready) return "loading....";

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  function linkClasses(type = null) {
    let classes = "py-2 px-4 flex rounded-full bg-gray-200";

    if (type === subpage) {
      classes =
        "py-2 px-4 flex rounded-full bg-primary text-white shadow-primary shadow-sm";
    }

    return classes;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />

      {subpage === "profile" && (
        <div className="text-center text-sm font-semibold mt-8 max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button
            onClick={logout}
            className="bg-primary mt-8 text-lg font-normal shadow-primary shadow-sm text-white rounded-full w-3/5 py-1"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
