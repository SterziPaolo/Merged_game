import { useState } from 'react';
import GoalSelection from './GoalSelection';
import CompanyInput from './CompanyInput';
import DecisionMaking from './DecisionMaking';
import Report from './Report';

const SimsGame = () => {
  const [phase, setPhase] = useState('goals');
  const [candidateState, setCandidateState] = useState(null);

  const handleGoalSelected = (selectedGoal, mappedGoal) => {
    const initialState = {
      sessionId: `ls-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      selectedGoal,
      mappedGoal,
      traits: {
        motivation: 0,
        dedication: 0,
        adaptability: 0,
        ethics: 0,
        risk: 0,
        strategic: 0,
        cognitive: 0,
        self: 0
      },
      decisions: [],
      currentAge: 18,
      timestamp: new Date()
    };
    
    setCandidateState(initialState);
    setPhase('company');
  };

  const handleCompanyComplete = (description, requirements) => {
    if (candidateState) {
      setCandidateState({
        ...candidateState,
        companyDescription: description,
        jobRequirements: requirements
      });
    }
    setPhase('decisions');
  };

  const handleCompanySkip = () => {
    setPhase('decisions');
  };

  const handleDecisionMade = (decision, newTraits) => {
    if (candidateState) {
      const updatedState = {
        ...candidateState,
        traits: newTraits,
        decisions: [...candidateState.decisions, decision],
        currentAge: candidateState.currentAge + 1
      };
      setCandidateState(updatedState);
    }
  };

  const handleSimulationComplete = () => {
    setPhase('report');
  };

  const handleRestart = () => {
    setCandidateState(null);
    setPhase('goals');
  };

  if (phase === 'goals') {
    return <GoalSelection onGoalSelected={handleGoalSelected} />;
  }

  if (phase === 'company') {
    return (
      <CompanyInput 
        onComplete={handleCompanyComplete}
        onSkip={handleCompanySkip}
      />
    );
  }

  if (phase === 'decisions' && candidateState) {
    return (
      <DecisionMaking
        candidateState={candidateState}
        onDecisionMade={handleDecisionMade}
        onSimulationComplete={handleSimulationComplete}
      />
    );
  }

  if (phase === 'report' && candidateState) {
    return (
      <Report 
        candidateState={candidateState}
        onRestart={handleRestart}
      />
    );
  }

  return <div>Loading...</div>;
};

export default SimsGame;
