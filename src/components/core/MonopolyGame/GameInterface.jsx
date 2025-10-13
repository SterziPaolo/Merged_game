
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Target, TrendingUp, User, Phone, Mail, AlertTriangle } from 'lucide-react';
import { gameScenes, characters } from '../data/gameData';

const GameInterface = () => {
  const [gameState, setGameState] = useState({
    currentScene: 'intro',
    stats: {
      teamMorale: 50,
      clientSatisfaction: 50,
      workQuality: 50,
      timeManagement: 50
    },
    characters: characters,
    decisionsHistory: []
  });

  const [showConsequence, setShowConsequence] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [animationState, setAnimationState] = useState('idle');

  const currentScene = gameScenes[gameState.currentScene];

  useEffect(() => {
    // Trigger animation when scene changes
    setAnimationState('entering');
    const timer = setTimeout(() => setAnimationState('active'), 500);
    return () => clearTimeout(timer);
  }, [gameState.currentScene]);

  const handleChoice = async (choice) => {
    setIsLoading(true);
    setAnimationState('choosing');
    setShowConsequence(choice.consequence);

    // Update stats with animation
    const newStats = { ...gameState.stats };
    Object.keys(choice.statsImpact).forEach(key => {
      const statKey = key as keyof typeof newStats;
      newStats[statKey] = Math.max(0, Math.min(100, 
        newStats[statKey] + choice.statsImpact[statKey]
      ));
    });

    const newGameState = {
      ...gameState,
      stats: newStats,
      decisionsHistory: [...gameState.decisionsHistory, choice.id]
    };

    setGameState(newGameState);

    setTimeout(() => {
      if (choice.nextScene) {
        setGameState(prev => ({ ...prev, currentScene: choice.nextScene }));
      }
      setShowConsequence(null);
      setIsLoading(false);
      setAnimationState('idle');
    }, 2000);
  };

  const getSceneAnimation = () => {
    const sceneId = gameState.currentScene;
    
    if (sceneId === 'intro') {
      return (
        <div className="relative h-48 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`transform transition-all duration-1000 ${animationState === 'active' ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
              <Phone className="w-16 h-16 text-white animate-bounce" />
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className={`bg-white/20 backdrop-blur rounded p-3 transform transition-all duration-700 delay-500 ${animationState === 'active' ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <p className="text-white font-semibold">📞 Chiamata urgente dal cliente...</p>
            </div>
          </div>
        </div>
      );
    }

    if (sceneId === 'urgent_meeting') {
      return (
        <div className="relative h-48 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center space-x-4">
            {[1, 2, 3, 4].map((person, index) => (
              <div 
                key={person}
                className={`w-12 h-12 bg-white/30 rounded-full flex items-center justify-center transform transition-all duration-500 ${animationState === 'active' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <User className="w-6 h-6 text-white" />
              </div>
            ))}
          </div>
          <div className="absolute top-4 right-4">
            <AlertTriangle className={`w-8 h-8 text-yellow-300 ${animationState === 'active' ? 'animate-pulse' : ''}`} />
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className={`bg-white/20 backdrop-blur rounded p-3 transform transition-all duration-700 delay-800 ${animationState === 'active' ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <p className="text-white font-semibold">⏰ Riunione d'emergenza in corso...</p>
            </div>
          </div>
        </div>
      );
    }

    // Default animation for other scenes
    return (
      <div className="relative h-48 bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`transform transition-all duration-1000 ${animationState === 'active' ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
            <Target className="w-16 h-16 text-white" />
          </div>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className={`bg-white/20 backdrop-blur rounded p-3 transform transition-all duration-700 delay-500 ${animationState === 'active' ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <p className="text-white font-semibold">🎯 {currentScene.title}</p>
          </div>
        </div>
      </div>
    );
  };

  const getStatColor = (value) => {
    if (value >= 70) return 'bg-[#22c55e]';
    if (value >= 40) return 'bg-[#eab308]';
    return 'bg-[#ef4444]';
  };

  const getStatIcon = (stat) => {
    switch (stat) {
      case 'teamMorale': return <Users className="w-4 h-4" />;
      case 'clientSatisfaction': return <Target className="w-4 h-4" />;
      case 'workQuality': return <TrendingUp className="w-4 h-4" />;
      case 'timeManagement': return <Clock className="w-4 h-4" />;
      default: return null;
    }
  };

  const getStatLabel = (stat) => {
    switch (stat) {
      case 'teamMorale': return 'Morale Team';
      case 'clientSatisfaction': return 'Soddisfazione Cliente';
      case 'workQuality': return 'Qualità Lavoro';
      case 'timeManagement': return 'Gestione Tempo';
      default: return stat;
    }
  };

  const restartGame = () => {
    setGameState({
      currentScene: 'intro',
      stats: {
        teamMorale: 50,
        clientSatisfaction: 50,
        workQuality: 50,
        timeManagement: 50
      },
      characters: characters,
      decisionsHistory: []
    });
    setAnimationState('idle');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">La Consegna Impossibile</h1>
          <p className="text-blue-200">Un test di competenze decisionali in ambiente lavorativo</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Game Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Animated Scene */}
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-6">
                {getSceneAnimation()}
              </CardContent>
            </Card>

            {/* Scene Description */}
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  {currentScene.character && (
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-300" />
                      <span className="text-blue-300 text-sm">
                        {characters.find(c => c.id === currentScene.character)?.name}
                      </span>
                    </div>
                  )}
                </CardTitle>
                <h2 className="text-2xl font-bold text-white">{currentScene.title}</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-200 whitespace-pre-line text-lg leading-relaxed">
                    {currentScene.description}
                  </p>
                </div>

                {/* Consequence Display */}
                {showConsequence && (
                  <div className="bg-[#3b82f6]/20 border border-blue-400/30 rounded-lg p-4 animate-fade-in">
                    <p className="text-blue-200 font-medium">{showConsequence}</p>
                  </div>
                )}

                {/* Choices */}
                {!currentScene.isEnding && !showConsequence && (
                  <div className="space-y-3">
                    <h3 className="text-white font-semibold mb-4">Cosa decidi di fare?</h3>
                    {currentScene.choices.map((choice, index) => (
                      <Button
                        key={choice.id}
                        onClick={() => handleChoice(choice)}
                        disabled={isLoading}
                        className={`w-full p-6 h-auto text-left justify-start bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all duration-200 transform hover:scale-[1.02] ${
                          animationState === 'active' ? 'animate-fade-in' : ''
                        }`}
                        variant="outline"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-start gap-3">
                          <span className="bg-[#3b82f6] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                            {index + 1}
                          </span>
                          <span className="text-white text-base leading-relaxed">
                            {choice.text}
                          </span>
                        </div>
                      </Button>
                    ))}
                  </div>
                )}

                {/* Ending Options */}
                {currentScene.isEnding && (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <Badge 
                        variant="outline" 
                        className={`text-lg px-4 py-2 animate-scale-in ${
                          currentScene.endingType === 'success' ? 'border-green-400 text-green-300' :
                          currentScene.endingType === 'creative' ? 'border-blue-400 text-blue-300' :
                          currentScene.endingType === 'burnout' ? 'border-red-400 text-red-300' :
                          'border-yellow-400 text-yellow-300'
                        }`}
                      >
                        {currentScene.endingType === 'success' ? '🎉 SUCCESSO' :
                         currentScene.endingType === 'creative' ? '🌟 SOLUZIONE CREATIVA' :
                         currentScene.endingType === 'burnout' ? '😰 BURNOUT' :
                         '⚠️ FALLIMENTO'}
                      </Badge>
                    </div>
                    <div className="flex justify-center">
                      <Button onClick={restartGame} className="bg-blue-600 hover:bg-blue-700 animate-fade-in">
                        Rigioca
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Panel */}
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Competenze</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(gameState.stats).map(([stat, value], index) => (
                  <div key={stat} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getStatIcon(stat)}
                        <span className="text-white text-sm">
                          {getStatLabel(stat)}
                        </span>
                      </div>
                      <span className="text-white font-semibold">{value}</span>
                    </div>
                    <Progress 
                      value={value} 
                      className={`h-2 transition-all duration-1000 ${animationState === 'active' ? 'animate-fade-in' : ''}`}
                      style={{ animationDelay: `${index * 200}ms` }}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Team Status */}
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Team</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {gameState.characters.map((character, index) => (
                  <div 
                    key={character.id} 
                    className={`flex items-center justify-between p-3 bg-white/5 rounded-lg transition-all duration-500 hover:bg-white/10 ${
                      animationState === 'active' ? 'animate-fade-in' : ''
                    }`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div>
                      <div className="text-white font-medium">{character.name}</div>
                      <div className="text-gray-300 text-sm">{character.role}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={character.availability ? "default" : "secondary"}
                        className={character.availability ? "bg-[#16a34a]" : "bg-gray-600"}
                      >
                        {character.availability ? "Disponibile" : "Non Disponibile"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Progress Indicator */}
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Progresso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className={`text-2xl font-bold text-white transition-all duration-700 ${animationState === 'active' ? 'animate-scale-in' : ''}`}>
                    {gameState.decisionsHistory.length}
                  </div>
                  <div className="text-gray-300 text-sm">
                    Decisioni prese
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameInterface;
