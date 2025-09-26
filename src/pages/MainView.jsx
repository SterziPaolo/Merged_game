import { useState, useRef, useEffect } from 'react'

import ActionButton from '../components/core/ActionButton';
import Loading from '../components/core/Loading';
import IframeHeader from '../components/core/IframeHeader';
import { STATIC_URL } from '../utils/constants';

export default function MainView({ fullScreen, dispSelChange }) {
    const [currSel, setCurrSel] = useState(0);
    const [isLoaded, setIsLoaded] = useState(true);

    const iframeRef = useRef(null);

    useEffect(() => (
        dispSelChange(currSel)
    ), [currSel])

    const onHandleAction = (actionType) => {
        setIsLoaded(false);

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
            <div className='flex flex-1'>
                <iframe
                    ref={iframeRef}
                    onLoad={() => setIsLoaded(true)}
                    className={`w-full ${fullScreen ? 'h-[100vh]' : 'min-w-[375px] h-[calc(100vh-110px)]'} overflow-hidden ${currSel === 0 ? 'rounded-xl' : ''}`}
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