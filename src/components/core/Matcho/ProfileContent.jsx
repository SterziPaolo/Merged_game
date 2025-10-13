import { Check, Briefcase, Target } from 'lucide-react';

export default function ProfileContent({ jobProfileLoaded, handleJobProfileLoad, setActiveTab }) {
    return (
        <div>
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Job Profile</h2>
                <p className="text-[#4b5563] mb-6">
                    Carica la job description per definire il profilo del ruolo da coprire.
                </p>

                <div className="bg-white rounded-lg border border-[#e5e7eb] p-6">
                    {!jobProfileLoaded ? (
                        <div>
                            <h3 className="text-lg font-medium mb-4 flex items-center">
                                <Target size={20} className="mr-2 text-green-600" />
                                Carica Job Description
                            </h3>

                            <div className="border-2 border-dashed border-[#d1d5db] rounded-lg p-8 text-center">
                                <Briefcase size={40} className="mx-auto mb-4 text-gray-400" />
                                <h4 className="text-lg font-medium mb-2">Carica la Job Description</h4>
                                <p className="text-[#4b5563] mb-4">
                                    Incolla il testo da LinkedIn o carica un file PDF/TXT
                                </p>

                                <div className="space-y-4">
                                    <textarea
                                        className="w-full h-32 p-3 border border-[#d1d5db] rounded-md resize-none"
                                        placeholder="Incolla qui la job description da LinkedIn..."
                                    />

                                    <div className="text-center text-gray-400">oppure</div>

                                    <label className="cursor-pointer bg-green-300 hover:bg-green-700 text-white py-2 px-4 rounded-md transition inline-block">
                                        Carica File Job Description
                                        <input type="file" className="hidden" onChange={handleJobProfileLoad} accept=".pdf,.txt,.docx" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="flex items-center mb-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-700">
                                <Check size={20} className="mr-2" />
                                <span>Job Profile analizzato e processato dall'AI</span>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mt-6">
                                <div>
                                    <h4 className="font-medium text-sm text-[#4b5563] mb-2">COMPETENZE RICHIESTE</h4>
                                    <ul className="space-y-1">
                                        <li className="flex items-center">
                                            <div className="w-2 h-2 rounded-full bg-[#22c55e] mr-2"></div>
                                            <span>React.js e Node.js (3+ anni)</span>
                                        </li>
                                        <li className="flex items-center">
                                            <div className="w-2 h-2 rounded-full bg-[#22c55e] mr-2"></div>
                                            <span>Esperienza con API REST</span>
                                        </li>
                                        <li className="flex items-center">
                                            <div className="w-2 h-2 rounded-full bg-[#22c55e] mr-2"></div>
                                            <span>Database SQL e NoSQL</span>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-medium text-sm text-[#4b5563] mb-2">SOFT SKILLS</h4>
                                    <ul className="space-y-1">
                                        <li className="flex items-center">
                                            <div className="w-2 h-2 rounded-full bg-[#22c55e] mr-2"></div>
                                            <span>Lavoro in team distribuito</span>
                                        </li>
                                        <li className="flex items-center">
                                            <div className="w-2 h-2 rounded-full bg-[#22c55e] mr-2"></div>
                                            <span>Problem solving creativo</span>
                                        </li>
                                        <li className="flex items-center">
                                            <div className="w-2 h-2 rounded-full bg-[#22c55e] mr-2"></div>
                                            <span>Comunicazione efficace</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-6 text-center">
                                <button
                                    className="bg-green-300 hover:bg-green-700 text-white py-3 px-6 rounded-md transition"
                                    onClick={() => setActiveTab('candidati')}
                                >
                                    Procedi ai Candidati →
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}