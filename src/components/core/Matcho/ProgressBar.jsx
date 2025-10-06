export default function ProgressBar({ activeTab }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-[#4b5563]">Progresso del Workflow</span>
        <span className="text-sm text-[#4b5563]">
          {activeTab === 'setup' ? '1' : activeTab === 'jobProfile' ? '2' : activeTab === 'candidati' ? '3' : '4'} di 4
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-green-300 h-2 rounded-full transition-all duration-300"
          style={{
            width: activeTab === 'setup' ? '25%' :
              activeTab === 'jobProfile' ? '50%' :
                activeTab === 'candidati' ? '75%' : '100%'
          }}
        ></div>
      </div>
    </div>
  )
}