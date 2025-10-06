import { FileText, X } from 'lucide-react';

export default function CandidateContent({ uploadedCandidates, handleAddCandidate, handleRemoveCandidate, handleAnalyzeClick }) {
    return (
        <div>
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Analisi Candidati</h2>
                <p className="text-[#4b5563] mb-6">
                    Carica i CV dei candidati. L'AI analizzerà ogni profilo evitando bias e valutando il candidato nel suo complesso.
                </p>

                <div className="bg-white rounded-lg border border-[#d1d5db] p-6 mb-6">
                    <div className="border-2 border-dashed border-[#d1d5db] rounded-lg p-8 text-center">
                        <FileText size={40} className="mx-auto mb-4 text-gray-400" />
                        <h3 className="text-lg font-medium mb-2">Carica CV Candidati</h3>
                        <p className="text-[#4b5563] mb-4">
                            Formato PDF, TXT o DOC. L'AI ignora foto, età e si concentra su competenze e potenziale.
                        </p>
                        <div className="flex justify-center">
                            <label className="cursor-pointer bg-green-300 hover:bg-green-700 text-white py-2 px-4 rounded-md transition">
                                Seleziona File CV
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={() => handleAddCandidate('Nuovo_CV_' + (uploadedCandidates.length + 1) + '.pdf')}
                                    accept=".pdf,.txt,.doc,.docx"
                                    multiple
                                />
                            </label>
                        </div>
                    </div>
                </div>

                {uploadedCandidates.length > 0 && (
                    <div className="bg-white rounded-lg border border-[#e5e7eb] p-6">
                        <h3 className="font-medium mb-4">CV Caricati ({uploadedCandidates.length})</h3>
                        <ul className="space-y-2 mb-6">
                            {uploadedCandidates.map((candidate, index) => (
                                <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                    <div className="flex items-center">
                                        <FileText size={18} className="mr-2 text-[#4b5563]" />
                                        <span>{candidate}</span>
                                        <span className="ml-2 text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                                            Analisi AI completata
                                        </span>
                                    </div>
                                    <button
                                        className="text-gray-400 hover:text-red-500"
                                        onClick={() => handleRemoveCandidate(index)}
                                    >
                                        <X size={18} />
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="border-t pt-4">
                            <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
                                <h4 className="font-medium text-blue-800 mb-2">AI Anti-Bias Attiva</h4>
                                <ul className="text-sm text-blue-700 space-y-1">
                                    <li>• Ignora età, foto e informazioni demografiche</li>
                                    <li>• Valuta competenze e potenziale nel contesto</li>
                                    <li>• Analizza soft skills da progetti e esperienze</li>
                                    <li>• Focus su fit culturale e crescita professionale</li>
                                </ul>
                            </div>

                            <button
                                className="bg-green-300 hover:bg-green-700 text-white py-3 px-4 rounded-md transition w-full"
                                onClick={handleAnalyzeClick}
                            >
                                Analizza Match con Team →
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}