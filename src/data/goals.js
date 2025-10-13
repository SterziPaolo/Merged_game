import {
  goalAcademic,
  goalBusiness,
  goalCreative,
  goalFamily,
  goalFreedom,
  goalHealth,
  goalImpact,
  goalNonprofit,
  goalPublic,
  goalSocial,
  goalTechnical,
  goalTraveler,
} from '../assets/images.js'

const goalsData = [
  {
    "id": "business",
    "title": "Build a Successful Business",
    "description": "Create and scale a profitable company",
    "functional": true,
    "influence": ["motivation", "risk", "strategic"],
    "image": goalBusiness
  },
  {
    "id": "creative",
    "title": "Become a Renowned Creative Professional",
    "description": "Create notable work in arts & design",
    "functional": true,
    "influence": ["adaptability", "cognitive", "self"],
    "image": goalCreative
  },
  {
    "id": "impact",
    "title": "Create Positive Social/Environmental Impact",
    "description": "Lead initiatives that change communities",
    "functional": true,
    "influence": ["ethics", "motivation", "dedication"],
    "image": goalImpact
  },
  {
    "id": "freedom",
    "title": "Achieve Financial Freedom & Personal Stability",
    "description": "Build financial independence and balance",
    "functional": true,
    "influence": ["strategic", "risk", "dedication"],
    "image": goalFreedom
  },
  {
    "id": "academic",
    "title": "Academic Excellence",
    "description": "Pursue high-level research or education",
    "functional": false,
    "mapTo": "creative",
    "image": goalAcademic
  },
  {
    "id": "family",
    "title": "Family-focused Life",
    "description": "Prioritize family & relationships",
    "functional": false,
    "mapTo": "freedom",
    "image": goalFamily
  },
  {
    "id": "traveler",
    "title": "Global Traveler",
    "description": "Explore the world & cultures",
    "functional": false,
    "mapTo": "creative",
    "image": goalTraveler
  },
  {
    "id": "public",
    "title": "Public Office",
    "description": "Make policy-level impact",
    "functional": false,
    "mapTo": "impact",
    "image": goalPublic
  },
  {
    "id": "health",
    "title": "Health & Wellness Leader",
    "description": "Promote wellbeing and fitness",
    "functional": false,
    "mapTo": "business",
    "image": goalHealth
  },
  {
    "id": "technical",
    "title": "Technical Mastery",
    "description": "Become a high-level technical expert",
    "functional": false,
    "mapTo": "freedom",
    "image": goalTechnical
  },
  {
    "id": "social",
    "title": "Social Media Creator",
    "description": "Build a personal brand online",
    "functional": false,
    "mapTo": "creative",
    "image": goalSocial
  },
  {
    "id": "nonprofit",
    "title": "Non-profit Founder",
    "description": "Serve communities through an NGO",
    "functional": false,
    "mapTo": "impact",
    "image": goalNonprofit
  },
  {
    "id": "luxury",
    "title": "Luxury Lifestyle",
    "description": "Attain a premium lifestyle",
    "functional": false,
    "mapTo": "freedom",
    "image": goalFreedom
  },
  {
    "id": "crafts",
    "title": "Crafts & Artisan Life",
    "description": "Create handmade works & small biz",
    "functional": false,
    "mapTo": "creative",
    "image": goalCreative
  },
  {
    "id": "education",
    "title": "Educational Influencer",
    "description": "Teach & influence learning",
    "functional": false,
    "mapTo": "impact",
    "image": goalImpact
  }
]

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

