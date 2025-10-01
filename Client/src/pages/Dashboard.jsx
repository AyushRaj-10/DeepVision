import React from 'react';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-900 text-white p-8">
        <div className="container mx-auto max-w-4xl pt-10">
          <h2 className="text-4xl font-bold text-teal-400 mb-6">
            Historical Analysis Dashboard
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            This page will display past mission logs, long-term threat detection metrics, and PSNR/SSIM trends.
          </p>
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-xl font-semibold mb-3">Work in Progress</h3>
            <p className="text-gray-500">
              Data visualizations (charts, maps) for historical threat data will be integrated here in the next phase.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;