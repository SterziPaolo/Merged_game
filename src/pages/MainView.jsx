import React, { useState, useRef } from 'react'

import ActionButton from '../components/core/ActionButton';
import Loading from '../components/core/Loading';
import { STATIC_URL } from '../utils/constants';
import IframeHeader from '../components/core/IframeHeader';

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
        <div className={` ${!fullScreen ? 'px-4 py-4' : ''}`}>
            {!isLoaded && <Loading />}
            {currSel !== 0 ? <IframeHeader /> : <></>}
            <div className='h-[calc(100vh-110px)] flex flex-1'>
                <iframe
                    ref={iframeRef}
                    onLoad={() => setIsLoaded(true)}
                    className={`w-full min-w-[375px] overflow-hidden ${currSel === 0 ? 'rounded-xl' : ''}`}
                    title='Advert'
                    src={STATIC_URL[currSel]}
                    allowFullScreen
                >
                </iframe>
            </div>

            <ActionButton onHandleAction={onHandleAction} />
        </div>
    )
}