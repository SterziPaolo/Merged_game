export default function ScoreIndicator({ score, label }) {
    let color = "#88B04B";
    if (score < 70) color = "#E74C3C";
    else if (score < 85) color = "#F39C12";
    
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl font-bold mb-1" style={{ color }}>{score}</div>
        <div className="w-16 bg-gray-200 rounded-full h-2 mb-1">
          <div 
            className="h-2 rounded-full" 
            style={{ width: `${score}%`, backgroundColor: color }}
          ></div>
        </div>
        <div className="text-xs text-[#4b5563]">{label}</div>
      </div>
    );
  };