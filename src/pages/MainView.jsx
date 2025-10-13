import React, { useState, useEffect } from 'react'

import ActionButton from '../components/core/ActionButton';
import { useNavigate, Outlet } from 'react-router-dom';

export default function MainView({ fullScreen }) {
    const [currSel, setCurrSel] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (currSel === 1) {
            navigate("/monopolygame");
        }
        else if (currSel === 2) {
            navigate("/matcho");
        }
        else if (currSel === 3) {
            navigate("/result")
        }
        else {
            navigate(`/iframes/${currSel}`)
        }
    }, [currSel])

    const onHandleAction = (actionType) => {
        if (actionType === 'prev') {
            setCurrSel(currSel === 0 ? 3 : currSel - 1);
        }
        else if (actionType === 'next') {
            setCurrSel(currSel === 3 ? 0 : currSel + 1);
        }
    }

    return (
        <div className={`flex flex-1 bg-[#f9fafb] ${!fullScreen ? 'px-4 py-4' : ''}`}>
            <ActionButton onHandleAction={onHandleAction} />
            <Outlet />
        </div>
    )
}