import goalsData from './goals.json';

/**
 * Get a functional goal by ID
 * @param {string} goalId - The goal ID to look up
 * @returns {Object} The functional goal object
 */
export const getFunctionalGoal = (goalId) => {
  const goal = goalsData.find(g => g.id === goalId);
  if (!goal) return goalsData[0];
  
  if (goal.functional) return goal;
  
  const mappedGoal = goalsData.find(g => g.id === goal.mapTo);
  return mappedGoal || goalsData[0];
};

export { goalsData as goals };

