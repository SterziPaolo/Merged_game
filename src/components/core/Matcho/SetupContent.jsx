import { Users, Upload, Building2, Check } from 'lucide-react'

import cultureModules from '../../../data/cultureModules.json'

export default function SetupContent({ aiTrained, selectedCultureModule, handleAITraining, setSelectedCultureModule, handleCultureLoad, cultureLoaded, setActiveTab }) {
    return (
        <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Training dell'AI</h2>
            <p className="text-[#4b5563] mb-6">
                Configura l'intelligenza artificiale caricando i dati dei team esistenti e definendo la cultura aziendale.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Training AI sui Team */}
                <div className="bg-white rounded-lg border border-[#e5e7eb] p-6">
                    <h3 className="text-lg font-medium mb-4 flex items-center">
                        <Users size={20} className="mr-2 text-green-600" />
                        Training sui Team
                    </h3>

                    {!aiTrained ? (
                        <div>
                            <p className="text-[#4b5563] mb-4">
                                Carica i dati dei team esistenti per addestrare l'AI sui pattern di successo.
                            </p>
                            <div className="border-2 border-dashed border-[#d1d5db] rounded-lg p-6 text-center">
                                <Upload size={32} className="mx-auto mb-3 text-gray-400" />
                                <p className="text-sm text-[#4b5563] mb-3">File .csv o .json con dati team</p>
                                <label className="cursor-pointer bg-green-300 hover:bg-green-700 text-white py-2 px-4 rounded-md transition text-sm">
                                    Carica Dati Team
                                    <input type="file" className="hidden" onChange={handleAITraining} accept=".csv,.json" />
                                </label>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="flex items-center mb-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-700">
                                <Check size={20} className="mr-2" />
                                <span>AI addestrata su 247 team e 1,847 candidati</span>
                            </div>
                            <div className="text-sm text-[#4b5563]">
                                <p>• Pattern di successo identificati</p>
                                <p>• Modelli anti-bias attivati</p>
                                <p>• Analisi comportamentale calibrata</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Cultura Aziendale */}
                <div className="bg-white rounded-lg border border-[#e5e7eb] p-6">
                    <h3 className="text-lg font-medium mb-4 flex items-center">
                        <Building2 size={20} className="mr-2 text-green-600" />
                        Cultura Aziendale
                    </h3>

                    <div className="mb-4">
                        <p className="text-[#4b5563] mb-4">
                            Definisci i valori e la cultura della tua azienda.
                        </p>

                        <div className="space-y-3">
                            {cultureModules.map((module) => (
                                <label key={module.id} className="flex items-start p-3 border border-[#e5e7eb] rounded-lg cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        name="culture"
                                        value={module.id}
                                        checked={selectedCultureModule === module.id}
                                        onChange={(e) => setSelectedCultureModule(e.target.value)}
                                        className="mt-1 mr-3"
                                    />
                                    <div>
                                        <div className="font-medium text-sm">{module.name}</div>
                                        <div className="text-xs text-[#4b5563]">{module.description}</div>
                                    </div>
                                </label>
                            ))}
                        </div>

                        {selectedCultureModule === 'custom' && !cultureLoaded && (
                            <div className="mt-4 border-2 border-dashed border-[#d1d5db] rounded-lg p-4 text-center">
                                <Upload size={24} className="mx-auto mb-2 text-gray-400" />
                                <p className="text-xs text-[#4b5563] mb-2">Carica documento valori aziendali</p>
                                <label className="cursor-pointer bg-green-300 hover:bg-green-700 text-white py-1 px-3 rounded text-xs">
                                    Carica Valori
                                    <input type="file" className="hidden" onChange={handleCultureLoad} accept=".pdf,.txt,.docx" />
                                </label>
                            </div>
                        )}

                        {(cultureLoaded || selectedCultureModule !== 'custom') && (
                            <div className="mt-4 flex items-center p-2 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
                                <Check size={16} className="mr-2" />
                                <span>Cultura aziendale configurata</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {aiTrained && (cultureLoaded || selectedCultureModule !== 'custom') && (
                <div className="mt-6 text-center">
                    <button
                        className="bg-green-300 hover:bg-green-700 text-white py-3 px-6 rounded-md transition"
                        onClick={() => setActiveTab('jobProfile')}
                    >
                        Procedi al Job Profile →
                    </button>
                </div>
            )}
        </div>
    )
}