import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Home = () => {
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white relative overflow-hidden">

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-400 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="relative z-10">
        <div className="container mx-auto px-4 md:px-8 py-12">

          <div className="max-w-4xl mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              DeepVision: Vision beneath the surface
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              AI-driven image enhancement to improve visibility<br />
              and detect underwater threats
            </p>
            <button className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white px-8 py-4 rounded-lg text-lg font-medium transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-teal-500/25">
              Enhance image
            </button>
          </div>


          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2">
              <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div>
                    <h3 className="text-lg font-semibold mb-4">BEFORE</h3>
                    <div className="bg-slate-700/50 rounded-lg h-64 flex items-center justify-center border border-slate-600/30">
                      {beforeImage ? (
                        <img src={beforeImage} alt="Before" className="max-w-full max-h-full rounded" />
                      ) : (
                        <span className="text-gray-400">Upload image</span>
                      )}
                    </div>
                  </div>
                  

                  <div>
                    <h3 className="text-lg font-semibold mb-4">AFTER</h3>
                    <div className="bg-gradient-to-br from-teal-800/60 to-cyan-800/60 rounded-lg h-64 flex items-center justify-center border border-teal-600/30 shadow-lg shadow-teal-500/20">
                      {afterImage ? (
                        <img src={afterImage} alt="After" className="max-w-full max-h-full rounded" />
                      ) : (
                        <div className="text-center text-teal-200">
                          <div className="mb-4 text-3xl animate-bounce">🐟</div>
                          <span>Enhanced image will appear here</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="space-y-6">
 
              <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50 hover:border-teal-500/30 transition-all duration-300">
                <h3 className="text-lg font-semibold mb-4 text-teal-300">ENHANCEMENT METRICS</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center group">
                    <span className="text-gray-300 group-hover:text-teal-300 transition-colors">PSNR</span>
                    <span className="text-2xl font-bold text-cyan-400">32.1</span>
                  </div>
                  <div className="flex justify-between items-center group">
                    <span className="text-gray-300 group-hover:text-teal-300 transition-colors">SSIM</span>
                    <span className="text-2xl font-bold text-cyan-400">0.91</span>
                  </div>
                  <div className="flex justify-between items-center group">
                    <span className="text-gray-300 group-hover:text-teal-300 transition-colors">UIQM</span>
                    <span className="text-2xl font-bold text-cyan-400">4.3</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50 hover:border-red-500/30 transition-all duration-300">
                <h3 className="text-lg font-semibold mb-4 text-red-300">THREAT DETECTION</h3>
                <div className="flex items-center gap-3">
                  <span className="bg-gradient-to-r from-red-600 to-red-500 text-white px-3 py-1 rounded text-sm font-medium animate-pulse shadow-lg shadow-red-500/30">
                    ALERT
                  </span>
                  <span className="text-gray-300">Mine detected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;