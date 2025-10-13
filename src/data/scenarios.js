import scenariosData from './scenarios.json';

/**
 * Simple text similarity function
 * @param {string} text1 - First text to compare
 * @param {string} text2 - Second text to compare
 * @returns {number} Similarity score between 0 and 1
 */
function calculateSimilarity(text1, text2) {
  const words1 = text1.toLowerCase().split(/\s+/);
  const words2 = text2.toLowerCase().split(/\s+/);
  
  const commonWords = words1.filter(word => words2.includes(word) && word.length > 3);
  const totalWords = Math.max(words1.length, words2.length);
  
  return commonWords.length / totalWords;
}

/**
 * Get a random scenario from a category
 * @param {string} category - The scenario category
 * @param {number} age - The candidate's age
 * @param {string[]} usedScenarios - Array of already used scenario IDs
 * @returns {Object|null} A random scenario template or null if none available
 */
export const getRandomScenario = (category, age, usedScenarios = []) => {
  const categoryTemplate = scenariosData.find(t => t.id === category);
  if (!categoryTemplate) return null;
  
  // Filter out used scenarios by checking against scenario text
  const availableTemplates = categoryTemplate.templates.filter(
    template => !usedScenarios.some(used => {
      const usedText = used.split('-').slice(1).join('-'); // Remove category prefix
      const similarity = calculateSimilarity(template.text, usedText);
      return similarity > 0.3; // More strict similarity threshold
    })
  );
  
  if (availableTemplates.length === 0) {
    console.warn(`No unique scenarios available for category: ${category}`);
    // Return a fallback scenario if none available
    return categoryTemplate.templates[Math.floor(Math.random() * categoryTemplate.templates.length)];
  }
  
  const randomTemplate = availableTemplates[Math.floor(Math.random() * availableTemplates.length)];
  
  // Contextualize based on age and add variation
  const contextIndex = (age + Math.floor(Math.random() * 2)) % randomTemplate.contexts.length;
  const context = randomTemplate.contexts[contextIndex];
  
  // Add age-appropriate variations to the scenario text
  let scenarioText = randomTemplate.text;
  
  // Age-based modifications
  if (age < 22) {
    scenarioText = scenarioText.replace(/your (team|company|department)/, `your ${context} internship team`);
    scenarioText = scenarioText.replace(/You've been/, `As an intern, you've been`);
  } else if (age < 25) {
    scenarioText = scenarioText.replace(/your (team|company|department)/, `your ${context} team`);
  } else {
    scenarioText = scenarioText.replace(/your (team|company|department)/, `your ${context} department`);
  }
  
  return {
    ...randomTemplate,
    text: scenarioText
  };
};

export { scenariosData as scenarioTemplates };
