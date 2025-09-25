import React, { useState, useRef } from 'react'

import ActionButton from '../components/core/ActionButton';
import Loading from '../components/core/Loading';

const STATIC_URL = [
    'https://monopoly-skills.lovable.app/',
    'https://adaptive-lifetrack.lovable.app/',
    'https://matcho.vercel.app/',
]

export default function MainView({ fullScreen }) {
    const [currSel, setCurrSel] = useState(0);
    const [isLoaded, setIsLoaded] = useState(true);

    const iframeRef = useRef(null);

    const onHandleAction = (actionType) => {
        setIsLoaded(false);

        console.log(actionType)

        if (actionType === 'prev') {
            setCurrSel(currSel === 0 ? STATIC_URL.length - 1 : currSel - 1);
        }
        else if (actionType === 'next') {
            setCurrSel(currSel === STATIC_URL.length - 1 ? 0 : currSel + 1);
        }
    }

    return (
        <div className={`flex flex-1 ${!fullScreen ? 'px-4 py-4' : ''}`}>
            {!isLoaded && <Loading />}
            <iframe
                ref={iframeRef}
                onLoad={() => setIsLoaded(true)}
                className='w-full rounded-xl  min-w-[375px] overflow-hidden'
                title='Advert'
                src={STATIC_URL[currSel]}
                allowFullScreen
            >
            </iframe>

            <ActionButton onHandleAction={onHandleAction} />
        </div>
    )
}