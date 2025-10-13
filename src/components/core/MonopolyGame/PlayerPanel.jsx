
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { gameProperties } from '../../../data/monopolyData';

const PlayerPanel = ({ player, turn, assessmentData }) => {
  const getSkillLevel = (value) => {
    if (value >= 5) return { label: 'Eccellente', color: 'bg-[#22c55e]' };
    if (value >= 2) return { label: 'Buono', color: 'bg-[#3b82f6]' };
    if (value >= 0) return { label: 'Medio', color: 'bg-[#eab308]' };
    return { label: 'Da migliorare', color: 'bg-[#ef4444]' };
  };

    const normalizeScore = (value) => {
    return Math.max(0, Math.min(100, (value + 10) * 5));
  };

  return (
    <div className="space-y-4">
      {/* Info Giocatore */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Stato Giocatore</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#4b5563]">Denaro:</span>
              <Badge className={`${player.money > 1000 ? 'bg-[#22c55e]' : player.money > 500 ? 'bg-[#eab308]' : 'bg-[#ef4444]'}`}>
                €{player.money}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#4b5563]">Proprietà:</span>
              <Badge className="border border-[#e2e8f0]" variant="outline">
                {player.properties.length}
              </Badge>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-[#4b5563]">Progresso:</span>
              <Badge className="border border-[#e2e8f0]" variant="outline">
                {turn}/20 turni
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Proprietà possedute */}
      {player.properties.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Le Tue Proprietà</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {player.properties.map(propertyId => {
                const property = gameProperties.find(p => p.id === propertyId);
                return property ? (
                  <div key={propertyId} className="flex justify-between items-center text-sm">
                    <span>{property.name}</span>
                    <Badge variant="outline">€{property.rent}/turno</Badge>
                  </div>
                ) : null;
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Assessment in tempo reale */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Valutazione Competenze</CardTitle>
          <p className="text-[0.75rem] text-gray-500">Analisi in tempo reale delle tue decisioni</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Risk Taking</span>
                <Badge className={getSkillLevel(assessmentData.riskTaking).color}>
                  {getSkillLevel(assessmentData.riskTaking).label}
                </Badge>
              </div>
              <Progress value={normalizeScore(assessmentData.riskTaking)} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Pensiero Strategico</span>
                <Badge className={getSkillLevel(assessmentData.strategicThinking).color}>
                  {getSkillLevel(assessmentData.strategicThinking).label}
                </Badge>
              </div>
              <Progress value={normalizeScore(assessmentData.strategicThinking)} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Gestione Risorse</span>
                <Badge className={getSkillLevel(assessmentData.resourceManagement).color}>
                  {getSkillLevel(assessmentData.resourceManagement).label}
                </Badge>
              </div>
              <Progress value={normalizeScore(assessmentData.resourceManagement)} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Velocità Decisionale</span>
                <Badge className={getSkillLevel(assessmentData.decisionSpeed).color}>
                  {getSkillLevel(assessmentData.decisionSpeed).label}
                </Badge>
              </div>
              <Progress value={normalizeScore(assessmentData.decisionSpeed)} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlayerPanel;
