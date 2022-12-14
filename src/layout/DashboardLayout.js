import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import useSeller from "../hooks/useSeller";
import Navbar from "../pages/shared/Navbar";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);

  const { isAdmin } = useAdmin(user?.email);
  const { isSeller } = useSeller(user?.email);

  return (
    <div>
      <Navbar />
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content ">
          {/* <!-- Page content here --> */}
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 text-base-content">
            {/* <!-- Sidebar content here --> */}
            {isAdmin || isSeller || (
              <>
                <li>
                  <NavLink to="/dashboard/history">Purchased History</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/wishlist">Wishlist</NavLink>
                </li>
              </>
            )}
            {isAdmin && (
              <>
                <li>
                  <NavLink to="/dashboard/add-category">Add Category</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manage-category">
                    Manage Category
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manage-users">All Users</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manage-sellers">All Sellers</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manage-buyers">All Buyers</NavLink>
                </li>
              </>
            )}
            {isSeller && (
              <>
                <li>
                  <NavLink to="/dashboard/add-phones">Add Phones</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manage-phones">Manage Phones</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/ur-buyers">All Buyers</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
