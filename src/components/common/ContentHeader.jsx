import { Settings } from "lucide-react"

export default function ContentHeader() {
    return (
        <header className="bg-white border-b border-[#e5e7eb] py-4 px-6 flex items-center justify-between">
            <div className="flex items-center">
                {/* Logo */}
                <div className="mr-2">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <rect x="2" y="2" width="12" height="12" rx="2" fill="#FF8C00" stroke="white" strokeWidth="1" />
                        <rect x="18" y="2" width="12" height="12" rx="2" fill="#DC143C" stroke="white" strokeWidth="1" />
                        <rect x="2" y="18" width="12" height="12" rx="2" fill="#00BFFF" stroke="white" strokeWidth="1" />
                        <rect x="18" y="18" width="12" height="12" rx="2" fill="#1E3A8A" stroke="white" strokeWidth="1" />
                    </svg>
                </div>
                <h1 className="text-xl font-semibold">Artemis</h1>
                <div className="ml-4 px-2 py-1 bg-green-100 text-green-700 text-[0.75rem] rounded-full">
                    AI-Powered Hiring
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <button className="text-gray-500 hover:text-gray-700">
                    <Settings size={20} />
                </button>
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                    AP
                </div>
            </div>
        </header>
    )
}