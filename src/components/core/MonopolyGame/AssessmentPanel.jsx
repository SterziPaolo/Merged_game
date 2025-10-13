
import React from 'react';
import { useSelector } from 'react-redux';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

const AssessmentPanel = () => {
  const { gameState } = useSelector((state) => state.monolopyGame)
  const player = gameState.players[0];
  const assessment = gameState.assessmentData;

  const getOverallScore = () => {
    const total = assessment.riskTaking + assessment.strategicThinking +
      assessment.resourceManagement + assessment.decisionSpeed;
    return Math.max(0, Math.min(100, (total + 20) * 2));
  };

  const getScoreLevel = (score) => {
    if (score >= 80) return { label: 'Eccellente', color: 'bg-[#22c55e]', description: 'Competenze manageriali di alto livello' };
    if (score >= 60) return { label: 'Buono', color: 'bg-[#3b82f6]', description: 'Solide competenze con margini di crescita' };
    if (score >= 40) return { label: 'Sufficiente', color: 'bg-[#eab308]', description: 'Competenze di base, necessario sviluppo' };
    return { label: 'Da sviluppare', color: 'bg-[#ef4444]', description: 'Richiesto training specifico' };
  };

  const getSkillFeedback = (skill, value) => {
    const feedback = {
      riskTaking: {
        high: 'Propensione elevata al rischio. Ottimo per ruoli innovativi e startup.',
        medium: 'Equilibrio tra prudenza e audacia. Adatto per gestione progetti.',
        low: 'Approccio prudente. Ideale per ruoli che richiedono stabilità.'
      },
      strategicThinking: {
        high: 'Eccellente capacità di pianificazione a lungo termine.',
        medium: 'Buona visione strategica con spazio per miglioramenti.',
        low: 'Focus sul breve termine. Consigliato training strategico.'
      },
      resourceManagement: {
        high: 'Gestione ottimale delle risorse disponibili.',
        medium: 'Buona gestione con occasionali sprechi.',
        low: 'Necessario migliorare l\'efficienza nell\'uso delle risorse.'
      },
      decisionSpeed: {
        high: 'Decisioni rapide ed efficaci. Ideale per ambienti dinamici.',
        medium: 'Tempo di decisione adeguato per la maggior parte dei contesti.',
        low: 'Processo decisionale lento. Potrebbe beneficiare di training specifico.'
      }
    };

    const level = value >= 3 ? 'high' : value >= 0 ? 'medium' : 'low';
    return feedback[skill][level];
  };

  const overallScore = getOverallScore();
  const scoreInfo = getScoreLevel(overallScore);

  const restartGame = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen my-10 pt-10">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header del risultato */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-blue-800">
              Assessment Completato
            </CardTitle>
            <p className="text-[#4b5563]">Ecco la valutazione delle tue competenze manageriali</p>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-6">
              <div className={`inline-flex items-center px-6 py-3 rounded-full text-white ${scoreInfo.color}`}>
                <span className="text-2xl font-bold mr-2">{overallScore}/100</span>
                <span className="text-lg">{scoreInfo.label}</span>
              </div>
              <p className="text-[#4b5563] mt-2">{scoreInfo.description}</p>
            </div>
          </CardContent>
        </Card>

        {/* Risultati finali */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Risultati di Gioco</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Denaro finale:</span>
                  <Badge className={player.money > 1500 ? 'bg-[#22c55e]' : 'bg-[#eab308]'}>
                    €{player.money}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Proprietà acquisite:</span>
                  <Badge variant="outline">{player.properties.length}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Turni completati:</span>
                  <Badge variant="outline">{gameState.turn}/20</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Analisi Competenze</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Risk Taking</span>
                    <span className="text-sm font-bold">{assessment.riskTaking > 0 ? '+' : ''}{assessment.riskTaking}</span>
                  </div>
                  <Progress value={Math.max(0, Math.min(100, (assessment.riskTaking + 10) * 5))} className="h-2" />
                  <p className="text-[0.75rem] text-[#4b5563] mt-1">
                    {getSkillFeedback('riskTaking', assessment.riskTaking)}
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Pensiero Strategico</span>
                    <span className="text-sm font-bold">{assessment.strategicThinking > 0 ? '+' : ''}{assessment.strategicThinking}</span>
                  </div>
                  <Progress value={Math.max(0, Math.min(100, (assessment.strategicThinking + 10) * 5))} className="h-2" />
                  <p className="text-[0.75rem] text-[#4b5563] mt-1">
                    {getSkillFeedback('strategicThinking', assessment.strategicThinking)}
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Gestione Risorse</span>
                    <span className="text-sm font-bold">{assessment.resourceManagement > 0 ? '+' : ''}{assessment.resourceManagement}</span>
                  </div>
                  <Progress value={Math.max(0, Math.min(100, (assessment.resourceManagement + 10) * 5))} className="h-2" />
                  <p className="text-[0.75rem] text-[#4b5563] mt-1">
                    {getSkillFeedback('resourceManagement', assessment.resourceManagement)}
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Velocità Decisionale</span>
                    <span className="text-sm font-bold">{assessment.decisionSpeed > 0 ? '+' : ''}{assessment.decisionSpeed}</span>
                  </div>
                  <Progress value={Math.max(0, Math.min(100, (assessment.decisionSpeed + 10) * 5))} className="h-2" />
                  <p className="text-[0.75rem] text-[#4b5563] mt-1">
                    {getSkillFeedback('decisionSpeed', assessment.decisionSpeed)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report dettagliato */}
        <Card>
          <CardHeader>
            <CardTitle>Report Dettagliato</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold mb-2">Punti di Forza:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {assessment.riskTaking >= 2 && <li>Buona propensione all'innovazione e al rischio calcolato</li>}
                  {assessment.strategicThinking >= 2 && <li>Capacità di pianificazione e visione a lungo termine</li>}
                  {assessment.resourceManagement >= 2 && <li>Gestione efficiente delle risorse disponibili</li>}
                  {assessment.decisionSpeed >= 2 && <li>Rapidità e sicurezza nel processo decisionale</li>}
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-2">Aree di Miglioramento:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {assessment.riskTaking < 0 && <li>Sviluppare maggiore propensione all'innovazione</li>}
                  {assessment.strategicThinking < 0 && <li>Migliorare la pianificazione strategica</li>}
                  {assessment.resourceManagement < 0 && <li>Ottimizzare l'uso delle risorse</li>}
                  {assessment.decisionSpeed < 0 && <li>Accelerare il processo decisionale</li>}
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-2">Raccomandazioni:</h4>
                <p className="text-sm text-gray-700">
                  Basandosi sui risultati, si consiglia di focalizzarsi su training specifici per le aree
                  con punteggio più basso e di valorizzare i punti di forza emersi in contesti lavorativi appropriati.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button onClick={restartGame} className="bg-blue-600 hover:bg-blue-700">
            Ricomincia Assessment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPanel;
