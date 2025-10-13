import React, { useState } from 'react'

import SimsGame from '../components/core/SimsGame/SimsGame'
import ContentHeader from '../components/common/ContentHeader'

export default function LifeTrack() {
    return (
        <div className='w-full mx-auto'>
            <ContentHeader />
            <SimsGame />
        </div>
    )
}