import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GoalSelection from './GoalSelection';
import CompanyInput from './CompanyInput';
import DecisionMaking from './DecisionMaking';
import Report from './Report';
import { setSimsGameState } from '../../../slices/simsGameSlice'

const SimsGame = () => {
  const [phase, setPhase] = useState('goals');
  const { candidateState } = useSelector((state) => state.simsGame);
  const [candidateStates, setCandidateState] = useState(candidateState);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSimsGameState(candidateStates))
  }, [candidateStates])

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
    if (candidateStates) {
      setCandidateState({
        ...candidateStates,
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
    if (candidateStates) {
      const updatedState = {
        ...candidateStates,
        traits: newTraits,
        decisions: [...candidateStates.decisions, decision],
        currentAge: candidateStates.currentAge + 1
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

  if (phase === 'decisions' && candidateStates) {
    return (
      <DecisionMaking
        candidateState={candidateStates}
        onDecisionMade={handleDecisionMade}
        onSimulationComplete={handleSimulationComplete}
      />
    );
  }

  if (phase === 'report' && candidateStates) {
    return (
      <Report
        onRestart={handleRestart}
      />
    );
  }

  return <div>Loading...</div>;
};

export default SimsGame;
