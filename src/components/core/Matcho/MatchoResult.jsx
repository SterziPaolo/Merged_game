import { ChevronDown } from 'lucide-react';

import CandidateCard from './CandidateCard'
import candidates from '../../../data/candidates.json'

export default function MatchoResult() {
    return (
        <div className="my-6">
            <h2 className="text-lg font-semibold mb-2">Risultati Analisi AI</h2>
            <p className="text-[#4b5563] mb-6">
                Analisi completa dei candidati con punteggi separati per Job Fit, Team Fit e valutazione finale.
            </p>
            <div>
                <div className="mb-6 bg-white rounded-lg border border-[#e5e7eb] p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium">Analisi completata per {candidates.length} candidati</h3>
                            <p className="text-sm text-[#4b5563]">AI avanzata con protezione anti-bias attiva</p>
                        </div>
                        <button className="text-green-600 hover:text-green-800 font-medium text-sm flex items-center">
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
    )
}