
import React from 'react';
import { WORKING_HOURS } from '../constants';

const WorkingTimes: React.FC = () => {
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black uppercase italic tracking-tighter text-slate-900 mb-4">
          Visit Our <span className="text-orange-600">Training Grounds</span>
        </h2>
        <p className="text-slate-500 font-medium">Check our physical store hours and come test the latest gear in person.</p>
      </div>

      <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100">
        <div className="grid md:grid-cols-2">
          <div className="bg-slate-900 p-12 text-white flex flex-col justify-between">
            <div>
              <div className="inline-block p-4 bg-orange-600 rounded-2xl mb-8">
                <i className="fa-solid fa-clock text-3xl"></i>
              </div>
              <h3 className="text-3xl font-bold mb-4">Always Ready for Tip-off</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Our main flagship store features a half-court where you can try out shoes before you buy. Come experience the difference of elite equipment.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-slate-300">
                <i className="fa-solid fa-location-dot text-orange-500"></i>
                <span>123 Jump Street, Baller Avenue, NY 10001</span>
              </div>
              <div className="flex items-center gap-4 text-slate-300">
                <i className="fa-solid fa-phone text-orange-500"></i>
                <span>+1 (800) HOOP-NEXUS</span>
              </div>
            </div>
          </div>
          <div className="p-12">
            <h4 className="text-xl font-bold mb-8 flex items-center gap-3 text-slate-900">
              <span className="w-2 h-8 bg-orange-600 rounded-full"></span>
              Weekly Schedule
            </h4>
            <div className="space-y-4">
              {WORKING_HOURS.map((item) => (
                <div 
                  key={item.day} 
                  className={`flex justify-between items-center p-4 rounded-2xl transition-all ${
                    item.day === currentDay 
                      ? 'bg-orange-50 border border-orange-200 ring-2 ring-orange-100' 
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-bold ${item.day === currentDay ? 'text-orange-600' : 'text-slate-700'}`}>
                      {item.day}
                    </span>
                    {item.day === currentDay && (
                      <span className="text-[10px] bg-green-500 text-white px-2 py-0.5 rounded-full font-black animate-pulse">
                        CURRENTLY OPEN
                      </span>
                    )}
                  </div>
                  <span className={`text-sm ${item.day === currentDay ? 'text-orange-900 font-bold' : 'text-slate-500'}`}>
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingTimes;
