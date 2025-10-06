import ScoreIndicator from "./ScoreIndicator";

export default function CandidateCard({ candidate }) {
  return (
    <div className="bg-white rounded-lg border border-[#e5e7eb] p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">{candidate.name}</h3>
        <div className="flex space-x-6">
          <ScoreIndicator score={candidate.jobFit} label="Job Fit" />
          <ScoreIndicator score={candidate.teamFit} label="Team Fit" />
          <ScoreIndicator score={candidate.finalScore} label="Final Score" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="border-l-4 border-[#60a5fa] pl-4">
          <h4 className="font-medium text-sm text-gray-700 mb-1">Job Compatibility</h4>
          <p className="text-sm text-[#4b5563]">{candidate.jobReason}</p>
        </div>

        <div className="border-l-4 border-[#4ade80] pl-4">
          <h4 className="font-medium text-sm text-gray-700 mb-1">Team Compatibility</h4>
          <p className="text-sm text-[#4b5563]">{candidate.teamReason}</p>
        </div>

        <div className="border-l-4 border-[#c084fc] pl-4">
          <h4 className="font-medium text-sm text-gray-700 mb-1">Valutazione Finale</h4>
          <p className="text-sm text-[#4b5563]">{candidate.finalReason}</p>
        </div>
      </div>
    </div>
  )
} 