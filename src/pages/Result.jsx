import ContentHeader from '../components/common/ContentHeader';
import MatchoResult from '../components/core/Matcho/MatchoResult';
import AssessmentPanel from '../components/core/MonopolyGame/AssessmentPanel';
import Report from '../components/core/SimsGame/Report';

const Result = () => {
    return (
        <div className='w-full'>
            <ContentHeader />
            <div className='px-10 my-10'>
                <MatchoResult />
                <AssessmentPanel />
                <Report />
            </div>
        </div>
    )
}

export default Result;