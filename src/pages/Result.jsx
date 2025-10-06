import { ChevronDown } from 'lucide-react';

import CandidateCard from '../components/core/Matcho/CandidateCard'
import candidates from '../data/candidates.json'
import ContentHeader from '../components/core/Matcho/ContentHeader';

const Result = () => {
    return (
        <div>
            <ContentHeader />
            <div className="mb-6 mt-10 px-5 mx-auto">
                <h2 className="text-lg font-semibold mb-2">Risultati Analisi AI</h2>
                <p className="text-gray-600 mb-6">
                    Analisi completa dei candidati con punteggi separati per Job Fit, Team Fit e valutazione finale.
                </p>

                <div>
                    <div className="mb-6 bg-white rounded-lg border border-[#e5e7eb] border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium">Analisi completata per {candidates.length} candidati</h3>
                                <p className="text-sm text-gray-500">AI avanzata con protezione anti-bias attiva</p>
                            </div>
                            <button className="text-[#16a34a] hover:text-green-800 font-medium text-sm flex items-center">
                                Esporta Report
                                <ChevronDown size={16} className="ml-1" />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {candidates.map((candidate) => (
                            <CandidateCard key={candidate.id} candidate={candidate} />
                        ))}
                    </div>

                    <div className="mt-6 bg-gray-100 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Riepilogo Raccomandazioni</h4>
                        <p className="text-sm text-[#4b5563]">
                            <strong>Marco Bianchi</strong> emerge come candidato ideale con il miglior equilibrio tra competenze tecniche e fit culturale.
                            <strong>Giulia Rossi</strong> eccelle tecnicamente ma potrebbe necessitare di supporto nell'integrazione team.
                            <strong>Andrea Verdi</strong> mostra ottimo potenziale culturale con spazio di crescita tecnica.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Result;