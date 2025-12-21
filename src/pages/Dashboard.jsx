import React, { useState, useMemo } from 'react';

const Dashboard = () => {
  // 1. Working State: Use state so the UI updates when you "Delete" or "Add"
  const [projectList, setProjectList] = useState([
    { id: 1, name: "E-commerce Platform", client: "Nexus Retail", progress: 75, status: "Active", date: "2024-05-01" },
    { id: 2, name: "Brand Identity", client: "Solaris Co.", progress: 100, status: "Completed", date: "2024-04-15" },
    { id: 3, name: "Portfolio Website", client: "Dr. Aris", progress: 30, status: "Active", date: "2024-05-10" },
    { id: 4, name: "Mobile App", client: "TechFlow", progress: 10, status: "Active", date: "2024-05-12" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  
  // 2. Functional Toggles State
  const [settings, setSettings] = useState({
    maintenance: false,
    registration: true,
    apiAccess: true,
  });

  // 3. Filter Logic (Search functionality)
  const filteredProjects = useMemo(() => {
    return projectList.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.client.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, projectList]);

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const deleteProject = (id) => {
    if(window.confirm("Are you sure you want to remove this project?")) {
      setProjectList(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen font-sans">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Dashboard</h1>
          <p className="text-gray-500 font-medium">Real-time project tracking & site control.</p>
        </div>
        
        <div className="flex items-center gap-3">
            {/* Search Input - Makes the dashboard functional */}
            <div className="relative">
                <input 
                    type="text" 
                    placeholder="Search projects..."
                    className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#31b8c6] focus:outline-none w-64 transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg className="w-5 h-5 absolute left-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <button className="bg-[#31b8c6] hover:bg-[#28a1ad] text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-[#31b8c6]/20 transition-all active:scale-95 whitespace-nowrap">
            + New Project
            </button>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard label="Live Projects" value={projectList.length} color="bg-[#31b8c6]" />
        <StatCard label="Completed" value={projectList.filter(p => p.progress === 100).length} color="bg-green-500" />
        <StatCard label="Avg. Progress" value={Math.round(projectList.reduce((acc, curr) => acc + curr.progress, 0) / projectList.length) + "%"} color="bg-purple-500" />
        <StatCard label="System Status" value="Optimal" color="bg-blue-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* PROJECTS TABLE */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Project Registry</h2>
            <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded uppercase tracking-widest">
                {filteredProjects.length} Entries
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Information</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Progress</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="font-bold text-gray-800 group-hover:text-[#31b8c6] transition-colors">{project.name}</div>
                      <div className="text-xs text-gray-400 font-medium italic">{project.client}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-full bg-gray-100 h-2 rounded-full max-w-[120px]">
                          <div 
                            className="bg-[#31b8c6] h-2 rounded-full transition-all duration-700" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-bold text-gray-600">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right space-x-3">
                      <button className="text-[#31b8c6] font-bold text-sm hover:underline">Edit</button>
                      <button 
                        onClick={() => deleteProject(project.id)}
                        className="text-red-400 font-bold text-sm hover:text-red-600">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredProjects.length === 0 && (
                <div className="p-10 text-center text-gray-400">No projects found matching your search.</div>
            )}
          </div>
        </div>

        {/* CONTROLS SIDEBAR */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 text-lg mb-4">Site Controls</h3>
            <div className="space-y-4">
              <ControlToggle 
                label="Maintenance Mode" 
                active={settings.maintenance} 
                onToggle={() => toggleSetting('maintenance')}
              />
              <ControlToggle 
                label="Allow New Clients" 
                active={settings.registration} 
                onToggle={() => toggleSetting('registration')}
              />
              <ControlToggle 
                label="API Public Access" 
                active={settings.apiAccess} 
                onToggle={() => toggleSetting('apiAccess')}
              />
              <button className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-colors shadow-lg shadow-gray-200">
                Deploy Changes
              </button>
            </div>
          </div>

          {/* HEALTH INDICATOR */}
          <div className="bg-[#31b8c6]/5 p-6 rounded-2xl border border-[#31b8c6]/20 relative overflow-hidden">
            <div className="relative z-10">
                <h3 className="font-bold text-[#31b8c6] text-lg">Infrastructure</h3>
                <p className="text-sm text-[#31b8c6]/70 mt-1 font-medium italic">Latency: 24ms (Excellent)</p>
                <div className="mt-4 flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#31b8c6] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#31b8c6]"></span>
                    </span>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Live Database Sync</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const StatCard = ({ label, value, color }) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-[#31b8c6]/30 transition-all cursor-default group">
        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider group-hover:text-[#31b8c6]">{label}</p>
        <h3 className="text-3xl font-black text-gray-800 mt-2">{value}</h3>
        <div className={`h-1 w-12 mt-4 rounded-full ${color}`}></div>
    </div>
);

const ControlToggle = ({ label, active, onToggle }) => (
  <div className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 border border-gray-100 group">
    <span className="text-sm font-bold text-gray-600">{label}</span>
    <div 
      onClick={onToggle}
      className={`w-11 h-6 rounded-full relative cursor-pointer transition-all duration-300 shadow-inner ${active ? 'bg-[#31b8c6]' : 'bg-gray-300'}`}
    >
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-md ${active ? 'right-1' : 'left-1'}`}></div>
    </div>
  </div>
);

export default Dashboard;