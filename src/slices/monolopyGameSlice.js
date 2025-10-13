import { createSlice } from "@reduxjs/toolkit"

import { gameProperties } from '../data/monopolyData';

const initialState = {
    gameState: {
        players: [
            { id: 'player1', name: 'Tu', money: 1500, position: 0, properties: [], isActive: true }
        ],
        currentPlayer: 0,
        properties: gameProperties.map(p => ({ ...p })),
        turn: 1,
        gamePhase: 'setup',
        assessmentData: {
            riskTaking: 0,
            strategicThinking: 0,
            negotiation: 0,
            resourceManagement: 0,
            decisionSpeed: 0
        }
    }
}

const monolopyGameSlice = createSlice({
    name: "monolopyGame",
    initialState,
    reducers: {
        setMonolopyGameState: (state, action) => {
            state.gameState = action.payload
        },
    },
})

export const {
    setMonolopyGameState,
} = monolopyGameSlice.actions

export default monolopyGameSlice.reducer