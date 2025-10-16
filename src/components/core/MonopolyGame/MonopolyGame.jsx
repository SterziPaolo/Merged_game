
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { gameProperties, chanceCards, assessmentQuestions } from '../../../data/monopolyData';
import GameBoard from './GameBoard';
import PlayerPanel from './PlayerPanel';
import AssessmentPanel from './AssessmentPanel';
import { setMonolopyGameState } from '../../../slices/monolopyGameSlice';

const MonopolyGame = () => {
  const [gameState, setGameState] = useState({
    players: [
      { id: 'player1', name: 'Tu', money: 1500, position: 0, properties: [], isActive: true }
    ],
    currentPlayer: 0,
    properties: gameProperties.map(p => ({ ...p })),
    turn: 1,
    gamePhase: 'setup',
    assessmentData: {
      riskTaking: 0,
      strategicThinking: 0,
      negotiation: 0,
      resourceManagement: 0,
      decisionSpeed: 0
    }
  });

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setMonolopyGameState(gameState))
  }, [gameState])

  const [diceResult, setDiceResult] = useState(0);
  const [currentDecision, setCurrentDecision] = useState(null);
  const [gameLog, setGameLog] = useState([]);
  const [decisionStartTime, setDecisionStartTime] = useState(0);

  const rollDice = () => {
    const result = Math.floor(Math.random() * 6) + 1;
    setDiceResult(result);
    movePlayer(result);
  };

  const movePlayer = (steps) => {
    const currentPlayerData = gameState.players[gameState.currentPlayer];
    const newPosition = (currentPlayerData.position + steps) % gameProperties.length;
    
    setGameState(prev => ({
      ...prev,
      players: prev.players.map((player, index) => 
        index === prev.currentPlayer 
          ? { ...player, position: newPosition }
          : player
      )
    }));

    handleLanding(newPosition);
  };

  const handleLanding = (position) => {
    const property = gameProperties[position];
    const currentPlayerData = gameState.players[gameState.currentPlayer];

    setGameLog(prev => [...prev, `${currentPlayerData.name} è arrivato su ${property.name}`]);

    if (property.color === 'special') {
      handleSpecialSpace(property);
    } else if (!property.owner && property.price > 0) {
      // Proprietà disponibile per l'acquisto
      setCurrentDecision({
        type: 'buy',
        property: property,
        question: assessmentQuestions[Math.floor(Math.random() * assessmentQuestions.length)]
      });
      setDecisionStartTime(Date.now());
    } else if (property.owner && property.owner !== currentPlayerData.id) {
      // Paga affitto
      payRent(property);
    }
  };

  const handleSpecialSpace = (property) => {
    const currentPlayerData = gameState.players[gameState.currentPlayer];
    
    if (property.id.includes('chance')) {
      const card = chanceCards[Math.floor(Math.random() * chanceCards.length)];
      setGameLog(prev => [...prev, card.text]);
      
      if (card.effect.money) {
        updatePlayerMoney(currentPlayerData.id, card.effect.money);
      }
    } else if (property.id === 'tax1') {
      updatePlayerMoney(currentPlayerData.id, -50);
      setGameLog(prev => [...prev, `${currentPlayerData.name} paga €50 di tasse`]);
    }
  };

  const payRent = (property) => {
    const currentPlayerData = gameState.players[gameState.currentPlayer];
    updatePlayerMoney(currentPlayerData.id, -property.rent);
    setGameLog(prev => [...prev, `${currentPlayerData.name} paga €${property.rent} di affitto`]);
  };

  const updatePlayerMoney = (playerId, amount) => {
    setGameState(prev => ({
      ...prev,
      players: prev.players.map(player => 
        player.id === playerId 
          ? { ...player, money: player.money + amount }
          : player
      )
    }));
  };

  const buyProperty = (reasoning) => {
    if (!currentDecision) return;
    
    const property = currentDecision.property;
    const currentPlayerData = gameState.players[gameState.currentPlayer];
    const decisionTime = Date.now() - decisionStartTime;

    // Aggiorna assessment basato sulla decisione
    updateAssessment('buy', decisionTime, reasoning);

    setGameState(prev => ({
      ...prev,
      players: prev.players.map((player, index) => 
        index === prev.currentPlayer 
          ? { 
              ...player, 
              money: player.money - property.price,
              properties: [...player.properties, property.id]
            }
          : player
      ),
      properties: prev.properties.map(p => 
        p.id === property.id ? { ...p, owner: currentPlayerData.id } : p
      )
    }));

    setGameLog(prev => [...prev, `${currentPlayerData.name} ha comprato ${property.name} per €${property.price}`]);
    setCurrentDecision(null);
    nextTurn();
  };

  const passProperty = (reasoning) => {
    if (!currentDecision) return;
    
    const decisionTime = Date.now() - decisionStartTime;
    updateAssessment('pass', decisionTime, reasoning);
    
    setGameLog(prev => [...prev, `${gameState.players[gameState.currentPlayer].name} ha rinunciato all'acquisto`]);
    setCurrentDecision(null);
    nextTurn();
  };

  const updateAssessment = (decision, time, reasoning) => {
    const speedBonus = time < 10000 ? 1 : time < 20000 ? 0 : -1;
    
    setGameState(prev => ({
      ...prev,
      assessmentData: {
        ...prev.assessmentData,
        decisionSpeed: prev.assessmentData.decisionSpeed + speedBonus,
        riskTaking: prev.assessmentData.riskTaking + (decision === 'buy' ? 1 : -1),
        strategicThinking: prev.assessmentData.strategicThinking + (reasoning ? 1 : 0),
        resourceManagement: prev.assessmentData.resourceManagement + (decision === 'pass' ? 1 : 0)
      }
    }));
  };

  const nextTurn = () => {
    setGameState(prev => ({
      ...prev,
      turn: prev.turn + 1
    }));
    
    if (gameState.turn >= 20) {
      endGame();
    }
  };

  const endGame = () => {
    setGameState(prev => ({ ...prev, gamePhase: 'ended' }));
  };

  const startGame = () => {
    setGameState(prev => ({ ...prev, gamePhase: 'playing' }));
  };

  if (gameState.gamePhase === 'setup') {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto bg-[#eff6ff]">
          <Card className="text-center border border-[#e2e8f0] bg-white">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-[#166534]">
                Monopoly Assessment
              </CardTitle>
              <p className="text-[#4b5563] mt-4">
                Un gioco di strategia per valutare le tue competenze decisionali
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-left">
                  <strong>Obiettivo:</strong> Dimostra le tue abilità di gestione delle risorse, 
                  risk management e pensiero strategico attraverso decisioni di investimento immobiliare.
                </p>
                <p className="text-left">
                  <strong>Durata:</strong> 10-15 minuti (20 turni)
                </p>
                <p className="text-left">
                  <strong>Valutazione:</strong> Le tue scelte verranno analizzate per misurare:
                  risk taking, pensiero strategico, gestione risorse, velocità decisionale
                </p>
                <Button onClick={startGame} className="mt-6 bg-[#16a34a] hover:bg-[#15803d]">
                  Inizia il Gioco
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Game Board */}
          <div className="lg:col-span-2">
            <GameBoard 
              gameState={gameState} 
              onRollDice={rollDice}
              diceResult={diceResult}
              currentDecision={currentDecision}
              onBuyProperty={buyProperty}
              onPassProperty={passProperty}
            />
          </div>
          
          {/* Side Panel */}
          <div className="space-y-4">
            <PlayerPanel 
              player={gameState.players[gameState.currentPlayer]} 
              turn={gameState.turn}
              assessmentData={gameState.assessmentData}
            />
            
            {/* Game Log */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Log di Gioco</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {gameLog.slice(-10).map((log, index) => (
                    <p key={index} className="text-sm text-[#4b5563] border-b pb-1">
                      {log}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonopolyGame;
