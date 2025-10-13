
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';
import { gameProperties } from '../../../data/monopolyData';

const GameBoard = ({
  gameState,
  onRollDice,
  diceResult,
  currentDecision,
  onBuyProperty,
  onPassProperty
}) => {
  const getDiceIcon = (value) => {
    switch (value) {
      case 1: return <Dice1 className="w-8 h-8" />;
      case 2: return <Dice2 className="w-8 h-8" />;
      case 3: return <Dice3 className="w-8 h-8" />;
      case 4: return <Dice4 className="w-8 h-8" />;
      case 5: return <Dice5 className="w-8 h-8" />;
      case 6: return <Dice6 className="w-8 h-8" />;
      default: return <Dice1 className="w-8 h-8" />;
    }
  };

    const getPropertyColor = (color) => {
    switch (color) {
      case 'brown': return 'bg-[#d97706]';
      case 'lightblue': return 'bg-[#38bdf8]';
      case 'red': return 'bg-[#ef4444]';
      case 'green': return 'bg-[#22c55e]';
      case 'special': return 'bg-[#d1d5db]';
      default: return 'bg-gray-200';
    }
  };

  const currentPlayer = gameState.players[gameState.currentPlayer];
  const currentProperty = gameProperties[currentPlayer.position];

  return (
    <div className="space-y-4">
      {/* Tabellone semplificato */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Tabellone di Gioco</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2">
            {gameProperties.map((property, index) => (
              <div
                key={property.id}
                className={`relative p-3 rounded border-2 transition-all ${
                  currentPlayer.position === index 
                    ? 'bg-blue-50 border-[#3b82f6] shadow-lg' 
                    : 'border-[#e5e7eb]'
                } ${getPropertyColor(property.color)}`}
              >
                <div className="text-center">
                  <div className={`text-[0.75rem] font-bold ${
                    property.color === 'special' ? 'text-[#1f2937]' : 'text-white'
                  }`}>
                    {property.name}
                  </div>
                  {property.price > 0 && (
                    <div className={`text-[0.75rem] ${
                      property.color === 'special' ? 'text-[#4b5563]' : 'text-white'
                    }`}>
                      €{property.price}
                    </div>
                  )}
                  {property.owner && (
                    <Badge className="mt-1 text-[0.75rem] bg-[#eab308]">
                      Posseduta
                    </Badge>
                  )}
                  {currentPlayer.position === index && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#3b82f6] rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Controlli di gioco */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-sm text-[#4b5563] mb-2">Posizione attuale:</p>
              <p className="font-bold">{currentProperty.name}</p>
            </div>
            
            <div className="text-center">
              {diceResult > 0 && (
                <div className="mb-2">
                  {getDiceIcon(diceResult)}
                </div>
              )}
              <Button 
                onClick={onRollDice} 
                disabled={currentDecision !== null}
                className="bg-[#16a34a] hover:bg-green-700"
              >
                Lancia Dadi
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-[#4b5563] mb-2">Turno:</p>
              <p className="font-bold">{gameState.turn}/20</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Decisione di acquisto */}
      {currentDecision && currentDecision.type === 'buy' && (
        <Card className="border-[#fed7aa] bg-[#fff7ed]">
          <CardHeader>
            <CardTitle className="text-lg text-[#9a3412]">
              Decisione di Investimento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold">{currentDecision.property.name}</h3>
                <p className="text-sm text-[#4b5563]">
                  Prezzo: €{currentDecision.property.price} | 
                  Affitto: €{currentDecision.property.rent}
                </p>
                <p className="text-sm text-[#4b5563]">
                  Denaro rimasto dopo l'acquisto: €{currentPlayer.money - currentDecision.property.price}
                </p>
              </div>
              
              {currentDecision.question && (
                <div className="bg-white p-4 rounded border border-[#e2e8f0]">
                  <p className="font-medium mb-3">{currentDecision.question.situation}</p>
                  <div className="grid gap-2">
                    {currentDecision.question.options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="text-left justify-start h-auto p-3 border border-[#e2e8f0]"
                        onClick={() => {
                          if (index === 0) onBuyProperty(option.text);
                          else onPassProperty(option.text);
                        }}
                      >
                        {option.text}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => onBuyProperty()} 
                  className="bg-[#16a34a] hover:bg-[#15803d]"
                  disabled={currentPlayer.money < currentDecision.property.price}
                >
                  Compra (€{currentDecision.property.price})
                </Button>
                <Button 
                  onClick={() => onPassProperty()} 
                  variant="outline"
                  className="border border-[#e2e8f0]"
                >
                  Passa
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GameBoard;
