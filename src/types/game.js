
/**
 * @typedef {Object} Choice
 * @property {string} id
 * @property {string} text
 * @property {string} consequence
 * @property {string} [nextScene]
 * @property {Object} statsImpact
 * @property {number} statsImpact.teamMorale
 * @property {number} statsImpact.clientSatisfaction
 * @property {number} statsImpact.workQuality
 * @property {number} statsImpact.timeManagement
 */

/**
 * @typedef {Object} Character
 * @property {string} id
 * @property {string} name
 * @property {string} role
 * @property {string} personality
 * @property {number} stress
 * @property {boolean} availability
 */

/**
 * @typedef {Object} GameScene
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} [character]
 * @property {Choice[]} choices
 * @property {boolean} [isEnding]
 * @property {'success'|'failure'|'creative'|'burnout'} [endingType]
 */

/**
 * @typedef {Object} GameState
 * @property {string} currentScene
 * @property {Object} stats
 * @property {number} stats.teamMorale
 * @property {number} stats.clientSatisfaction
 * @property {number} stats.workQuality
 * @property {number} stats.timeManagement
 * @property {Character[]} characters
 * @property {string[]} decisionsHistory
 */
