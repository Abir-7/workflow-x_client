import React from "react";

const UserDashboard = () => {
  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Dashboard Overview
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-950 text-white shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition">
          <h2 className="text-lg font-semibold mb-2">Completed Projects</h2>
          <p className="">24</p>
        </div>
        <div className="bg-blue-950 text-white  shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition">
          <h2 className="text-lg font-semibold mb-2">Running Projects</h2>
          <p className="">8</p>
        </div>
        <div className="bg-blue-950 text-white  shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition">
          <h2 className="text-lg font-semibold mb-2">Previous Month KPY</h2>
          <p className="">920</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
