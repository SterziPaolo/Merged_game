
export const gameProperties = [
  { id: 'start', name: 'Partenza', price: 0, rent: 0, color: 'special', position: 0 },
  { id: 'startup1', name: 'Startup Tech', price: 60, rent: 10, color: 'brown', position: 1 },
  { id: 'chance1', name: 'Imprevisto', price: 0, rent: 0, color: 'special', position: 2 },
  { id: 'startup2', name: 'E-commerce', price: 80, rent: 12, color: 'brown', position: 3 },
  { id: 'tax1', name: 'Tasse', price: 0, rent: -50, color: 'special', position: 4 },
  { id: 'consulting1', name: 'Consulting Firm', price: 120, rent: 20, color: 'lightblue', position: 5 },
  { id: 'agency1', name: 'Agenzia Marketing', price: 100, rent: 15, color: 'lightblue', position: 6 },
  { id: 'chance2', name: 'Opportunità', price: 0, rent: 0, color: 'special', position: 7 },
  { id: 'agency2', name: 'Agenzia Pubblicità', price: 120, rent: 18, color: 'lightblue', position: 8 },
  { id: 'parking', name: 'Parcheggio Gratis', price: 0, rent: 0, color: 'special', position: 9 },
  { id: 'corp1', name: 'Multinazionale A', price: 200, rent: 35, color: 'red', position: 10 },
  { id: 'corp2', name: 'Multinazionale B', price: 220, rent: 40, color: 'red', position: 11 },
  { id: 'bank', name: 'Banca', price: 0, rent: 0, color: 'special', position: 12 },
  { id: 'tech1', name: 'Big Tech Alpha', price: 300, rent: 50, color: 'green', position: 13 },
  { id: 'tech2', name: 'Big Tech Beta', price: 320, rent: 55, color: 'green', position: 14 },
  { id: 'jail', name: 'Fallimento', price: 0, rent: 0, color: 'special', position: 15 }
];

export const chanceCards = [
  { text: 'Il tuo progetto ha successo! Ricevi €100', effect: { money: 100 } },
  { text: 'Crisi economica. Perdi €50', effect: { money: -50 } },
  { text: 'Nuova partnership. Vai alla prossima proprietà', effect: { move: 1 } },
  { text: 'Audit fiscale. Paga €80', effect: { money: -80 } },
  { text: 'Brevetto approvato! Ricevi €150', effect: { money: 150 } },
  { text: 'Ristrutturazione. Torna indietro di 2 caselle', effect: { move: -2 } }
];

export const assessmentQuestions = [
  {
    situation: 'Puoi comprare questa proprietà ma ti rimangono pochi soldi',
    options: [
      { text: 'Compro subito - è un\'opportunità', points: { riskTaking: 2, strategicThinking: -1 } },
      { text: 'Aspetto un turno per vedere', points: { riskTaking: -1, strategicThinking: 2 } },
      { text: 'Non compro, troppo rischioso', points: { riskTaking: -2, resourceManagement: 2 } }
    ]
  },
  {
    situation: 'Un altro giocatore vuole scambiare proprietà con te',
    options: [
      { text: 'Accetto immediatamente', points: { negotiation: -1, decisionSpeed: 2 } },
      { text: 'Propongo condizioni diverse', points: { negotiation: 2, strategicThinking: 1 } },
      { text: 'Rifiuto categoricamente', points: { negotiation: -2, riskTaking: -1 } }
    ]
  }
];
