import { Brain, Briefcase, UserPlus, BarChart2 } from "lucide-react"

export default function TabBar({activeTab, setActiveTab}) {
    return (
        <div className="flex mb-8 border-b border-[#e5e7eb]">
          <button 
            className={`py-3 px-5 font-medium text-sm flex items-center ${activeTab === 'setup' ? 'border-b-2 border-[#16a34a] text-green-600' : 'text-[#4b5563]'}`}
            onClick={() => setActiveTab('setup')}
          >
            <Brain size={18} className="mr-2" />
            Setup AI
          </button>
          <button 
            className={`py-3 px-5 font-medium text-sm flex items-center ${activeTab === 'jobProfile' ? 'border-b-2 border-[#16a34a] text-green-600' : 'text-[#4b5563]'}`}
            onClick={() => setActiveTab('jobProfile')}
          >
            <Briefcase size={18} className="mr-2" />
            Job Profile
          </button>
          <button 
            className={`py-3 px-5 font-medium text-sm flex items-center ${activeTab === 'candidati' ? 'border-b-2 border-[#16a34a] text-green-600' : 'text-[#4b5563]'}`}
            onClick={() => setActiveTab('candidati')}
          >
            <UserPlus size={18} className="mr-2" />
            Candidati
          </button>
          {/* <button 
            className={`py-3 px-5 font-medium text-sm flex items-center ${activeTab === 'analisi' ? 'border-b-2 border-[#16a34a] text-green-600' : 'text-[#4b5563]'}`}
            onClick={() => setActiveTab('analisi')}
          >
            <BarChart2 size={18} className="mr-2" />
            Analisi AI
          </button> */}
        </div>
    )
}