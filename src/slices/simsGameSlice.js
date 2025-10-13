import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    candidateState: {
        sessionId: `ls-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        selectedGoal: true,
        mappedGoal: [],
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
        timestamp: Date.now()
    }
}

const simsGameSlice = createSlice({
    name: "simsGame",
    initialState,
    reducers: {
        setSimsGameState: (state, action) => {
            state.candidateState = action.payload
        },
    },
})

export const {
    setSimsGameState,
} = simsGameSlice.actions

export default simsGameSlice.reducer