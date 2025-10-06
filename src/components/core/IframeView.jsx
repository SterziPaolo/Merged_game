import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import Loading from './Loading';
import ContentHeader from "./Matcho/ContentHeader";

const STATIC_URL = [
    'https://monopoly-skills.lovable.app/',
    'https://adaptive-lifetrack.lovable.app/',
    'https://claude.ai/public/artifacts/9f864fe0-66e5-416f-a777-149d47edb339?fullscreen=true',
]

const IframeView = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const iframeRef = useRef(null);
    const { id } = useParams();

    useEffect(() => {
        setIsLoaded(false)
    }, [])

    return (
        <div className="flex flex-col w-full h-full">
            {!isLoaded && <Loading />}
            <ContentHeader />
            <div className="w-full flex flex-1">
                <iframe
                    ref={iframeRef}
                    onLoad={() => setIsLoaded(true)}
                    className='w-full rounded-xl  min-w-[375px] h-[calc(100vh-177px)] overflow-hidden'
                    title='Advert'
                    src={STATIC_URL[id]}
                    allowFullScreen
                >
                </iframe>
            </div>
        </div>
    )
}

export default IframeView