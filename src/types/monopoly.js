
/**
 * @typedef {Object} Property
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {number} rent
 * @property {string} color
 * @property {string} [owner]
 * @property {number} position
 */

/**
 * @typedef {Object} Player
 * @property {string} id
 * @property {string} name
 * @property {number} money
 * @property {number} position
 * @property {string[]} properties
 * @property {boolean} isActive
 */

/**
 * @typedef {Object} AssessmentMetrics
 * @property {number} riskTaking
 * @property {number} strategicThinking
 * @property {number} negotiation
 * @property {number} resourceManagement
 * @property {number} decisionSpeed
 */

/**
 * @typedef {Object} GameState
 * @property {Player[]} players
 * @property {number} currentPlayer
 * @property {Property[]} properties
 * @property {number} turn
 * @property {'setup'|'playing'|'ended'} gamePhase
 * @property {AssessmentMetrics} assessmentData
 */

/**
 * @typedef {Object} Decision
 * @property {'buy'|'pass'|'trade'|'mortgage'} type
 * @property {string} [propertyId]
 * @property {number} timestamp
 * @property {string} [reasoning]
 */
