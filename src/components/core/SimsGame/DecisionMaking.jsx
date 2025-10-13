import { useState, useEffect } from 'react';
import { getRandomScenario } from '../../../data/scenarios';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { toast } from '../../../hooks/use-toast';

// Import vignette images
import stepUpLeader from '../../../assets/vignettes/step-up-leader.png';
import negotiateTimeline from '../../../assets/vignettes/negotiate-timeline.png';
import collaborateTeam from '../../../assets/vignettes/collaborate-team.png';
import presentBoldly from '../../../assets/vignettes/present-boldly.png';
import carefulApproach from '../../../assets/vignettes/careful-approach.png';
import learnDevelop from '../../../assets/vignettes/learn-develop.png';
import ethicalChoice from '../../../assets/vignettes/ethical-choice.png';
import financialDecision from '../../../assets/vignettes/financial-decision.png';
import strategicThinking from '../../../assets/vignettes/strategic-thinking.png';
import networking from '../../../assets/vignettes/networking.png';
import calculatedRisk from '../../../assets/vignettes/calculated-risk.png';
import selfCare from '../../../assets/vignettes/self-care.png';
import teamMeeting from '../../../assets/vignettes/team-meeting.png';
import deadlinePressure from '../../../assets/vignettes/deadline-pressure.png';
import careerChoice from '../../../assets/vignettes/career-choice.png';
import workBalance from '../../../assets/vignettes/work-balance.png';

const TRAIT_NAMES = {
  motivation: 'Motivation',
  dedication: 'Dedication', 
  adaptability: 'Adaptability',
  ethics: 'Ethics',
  risk: 'Risk Taking',
  strategic: 'Strategic Thinking',
  cognitive: 'Cognitive Agility',
  self: 'Self Interest'
};

const getVignetteImage = (iconKey, optionIndex, decisionId) => {
  // All available images
  const allImages = [
    stepUpLeader, negotiateTimeline, collaborateTeam, presentBoldly, 
    carefulApproach, learnDevelop, ethicalChoice, financialDecision, 
    strategicThinking, networking, calculatedRisk, selfCare,
    teamMeeting, deadlinePressure, careerChoice, workBalance
  ];
  
  // Create deterministic but varied selection based on icon and position
  const vignetteMap = {
    '👑': [stepUpLeader, presentBoldly, teamMeeting],
    '📅': [negotiateTimeline, deadlinePressure, carefulApproach],
    '🤝': [collaborateTeam, networking, ethicalChoice],
    '🎯': [presentBoldly, calculatedRisk, careerChoice],
    '🛡️': [carefulApproach, ethicalChoice, workBalance],
    '📈': [strategicThinking, financialDecision, calculatedRisk],
    '👥': [networking, collaborateTeam, teamMeeting],
    '💡': [learnDevelop, strategicThinking, presentBoldly],
    '💰': [financialDecision, calculatedRisk, strategicThinking],
    '⏰': [deadlinePressure, negotiateTimeline, carefulApproach],
    '📄': [carefulApproach, ethicalChoice, learnDevelop],
    '❤️': [selfCare, workBalance, ethicalChoice],
    '📚': [learnDevelop, strategicThinking, ethicalChoice],
    '⚙️': [strategicThinking, learnDevelop, calculatedRisk],
    '⚖️': [ethicalChoice, carefulApproach, strategicThinking],
    '🚀': [calculatedRisk, presentBoldly, stepUpLeader],
    '🌱': [learnDevelop, collaborateTeam, selfCare],
    '👋': [networking, collaborateTeam, carefulApproach],
    '🔄': [strategicThinking, learnDevelop, networking],
    '💪': [stepUpLeader, calculatedRisk, deadlinePressure],
    '🎤': [presentBoldly, teamMeeting, networking],
    '🚫': [carefulApproach, workBalance, ethicalChoice],
    '✂️': [strategicThinking, carefulApproach, deadlinePressure],
    '🗣️': [presentBoldly, networking, teamMeeting],
    '✋': [ethicalChoice, stepUpLeader, presentBoldly],
    '🤐': [carefulApproach, networking, ethicalChoice],
    '📢': [presentBoldly, ethicalChoice, stepUpLeader],
    '🔧': [learnDevelop, strategicThinking, carefulApproach],
    '🛑': [ethicalChoice, carefulApproach, strategicThinking],
    '⚠️': [carefulApproach, ethicalChoice, deadlinePressure]
  };
  
  // Use hash of decision ID and option index to ensure no repeats within same decision
  const baseImages = vignetteMap[iconKey] || [stepUpLeader, negotiateTimeline, collaborateTeam];
  const hash = (decisionId + optionIndex).split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0);
  const imageIndex = Math.abs(hash) % baseImages.length;
  
  return baseImages[imageIndex];
};

const SCENARIO_CATEGORIES = [
  'motivation', 'adaptability', 'ethics', 'strategic', 
  'interpersonal', 'risk', 'cognitive', 'personal'
];

export default function DecisionMaking({
  candidateState,
  onDecisionMade,
  onSimulationComplete
}) {
  const [currentDecision, setCurrentDecision] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const generateScenario = () => {
    setIsLoading(true);
    
    // Select category based on rules
    const goalInfluenceTraits = candidateState.mappedGoal.influence || [];
    const dominantTrait = Object.entries(candidateState.traits)
      .sort(([,a], [,b]) => b - a)[0][0];
    
    let selectedCategory;
    const random = Math.random();
    
    if (random < 0.3 && SCENARIO_CATEGORIES.includes(dominantTrait)) {
      selectedCategory = dominantTrait;
    } else if (random < 0.7) {
      const goalCategories = goalInfluenceTraits.filter(trait => 
        SCENARIO_CATEGORIES.includes(trait)
      );
      selectedCategory = goalCategories.length > 0 
        ? goalCategories[Math.floor(Math.random() * goalCategories.length)]
        : SCENARIO_CATEGORIES[Math.floor(Math.random() * SCENARIO_CATEGORIES.length)];
    } else {
      selectedCategory = SCENARIO_CATEGORIES[Math.floor(Math.random() * SCENARIO_CATEGORIES.length)];
    }

    // Get used scenarios to ensure uniqueness
    const usedScenarios = candidateState.decisions.map(d => 
      `${d.category}-${d.scenario.substring(0, 50)}`
    );

    const scenarioTemplate = getRandomScenario(selectedCategory, candidateState.currentAge, usedScenarios);
    
    if (!scenarioTemplate) {
      // Fallback if no unique scenarios available
      const fallbackScenario = getRandomScenario('strategic', candidateState.currentAge);
      if (!fallbackScenario) {
        console.error('No scenarios available');
        return;
      }
    }

    const scenario = scenarioTemplate || getRandomScenario('strategic', candidateState.currentAge);

    const decision = {
      age: candidateState.currentAge,
      category: selectedCategory,
      scenario: scenario.text,
      options: scenario.options.map((opt, index) => ({
        id: `${candidateState.currentAge}-${index}`,
        label: opt.label,
        description: opt.description,
        icon: opt.icon,
        effects: opt.effects
      }))
    };

    setCurrentDecision(decision);
    setIsLoading(false);
  };

  useEffect(() => {
    generateScenario();
  }, [candidateState.currentAge]);

  const handleOptionSelect = (optionIndex) => {
    if (!currentDecision || selectedOption !== null) return;
    
    setSelectedOption(optionIndex);
    const selectedOpt = currentDecision.options[optionIndex];
    
    // Update traits
    const newTraits = { ...candidateState.traits };
    Object.entries(selectedOpt.effects).forEach(([trait, delta]) => {
      newTraits[trait] = (newTraits[trait] || 0) + delta;
    });

    // Show immediate feedback
    const effectTexts = Object.entries(selectedOpt.effects)
      .filter(([_, delta]) => delta !== 0)
      .map(([trait, delta]) => {
        const sign = delta > 0 ? '+' : '';
        return `${sign}${delta} ${TRAIT_NAMES[trait]}`;
      });

    if (effectTexts.length > 0) {
      toast({
        title: "Decision Impact",
        description: effectTexts.join(', '),
        duration: 2000,
      });
    }

    setShowFeedback(true);

    // Complete decision after short delay
    setTimeout(() => {
      const completedDecision = {
        ...currentDecision,
        selectedOption: optionIndex,
        timestamp: new Date()
      };

      if (candidateState.currentAge >= 27) {
        onSimulationComplete();
      } else {
        onDecisionMade(completedDecision, newTraits);
      }
      
      setSelectedOption(null);
      setShowFeedback(false);
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-[#4a4fde] border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-[#6b7280]">Generating your next life scenario...</p>
        </div>
      </div>
    );
  }

  if (!currentDecision) {
    return <div>Error loading scenario</div>;
  }

  const progress = ((candidateState.currentAge - 18) / 9) * 100;
  const yearNumber = candidateState.currentAge - 17;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-6">
      {/* Progress Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Year {yearNumber} of 10</h2>
          <Badge variant="outline" className="text-sm border border-[#e5e7eb]">
            Age {candidateState.currentAge}
          </Badge>
        </div>
        <Progress value={progress} className="h-3 bg-[#3abff8]" />
        <div className="flex justify-between text-sm text-[#6b7280] mt-2">
          <span>Age 18</span>
          <span>Age 27</span>
        </div>
      </div>

      {/* Decision Card */}
      <Card className="decision-card border border-[#e5e7eb] p-[2rem] mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Age {candidateState.currentAge}</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed">{currentDecision.scenario}</p>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-center mb-6">What do you choose?</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentDecision.options.map((option, index) => (
              <Button
                key={option.id}
                variant="outline"
                className={`decision-option border border-[#e5e7eb] h-auto p-4 flex-col items-center text-center min-h-[220px] hover:bg-[#f3f4f6] ${
                  selectedOption === index ? 'border-[#4a4fde] bg-[#4a4fde]/5' : ''
                } ${selectedOption !== null && selectedOption !== index ? 'opacity-50' : ''}`}
                onClick={() => handleOptionSelect(index)}
                disabled={selectedOption !== null}
              >
                <div className="flex flex-col items-center space-y-3 w-full h-full">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#4a4fde1a] flex items-center justify-center">
                    <img 
                      src={getVignetteImage(option.icon, index, currentDecision.options[0].id)} 
                      alt={option.label}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </div>
                  <div className="space-y-2 flex-1 flex flex-col justify-center">
                    <div className="font-semibold text-sm leading-tight px-1">{option.label}</div>
                    <div className="text-[0.75rem] text-[#6b7280] leading-relaxed px-1 line-clamp-3">{option.description}</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {showFeedback && selectedOption !== null && (
          <div className="mt-8 p-4 bg-muted/50 rounded-lg text-center">
            <p className="text-sm text-[#6b7280]">
              Processing your decision and preparing next scenario...
            </p>
          </div>
        )}
      </Card>

      {/* Trait Preview */}
      <div className="max-w-4xl mx-auto mt-8">
        <Card className="p-4 border border-[#f3f4f6] bg-white">
          <h3 className="text-sm font-medium mb-3">Your Development Progress</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(TRAIT_NAMES).map(([key, name]) => {
              const value = candidateState.traits[key] || 0;
              const normalizedValue = Math.max(0, Math.min(100, ((value + 30) / 60) * 100));
              
              return (
                <div key={key} className="text-center">
                  <div className="text-[0.75rem] font-medium mb-1">{name}</div>
                  <div className="bg-[#f3f4f6] h-[0.5rem] rounded-full">
                    <div 
                      className="trait-fill h-[0.5rem] bg-gradient-to-r from-[#4a4fde] to-[#3abff8] rounded-l-full" 
                      style={{ width: `${normalizedValue}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
