import { useState } from 'react';
import { Settings } from 'lucide-react';
import ProgressBar from '../components/core/Matcho/ProgressBar';
import TabBar from '../components/core/Matcho/TabBar';
import SetupContent from '../components/core/Matcho/SetupContent';
import ProfileContent from '../components/core/Matcho/ProfileContent';
import CandidateContent from '../components/core/Matcho/CandidateContent';
import ContentHeader from '../components/core/Matcho/ContentHeader';

const Matcho = () => {
    const [activeTab, setActiveTab] = useState('setup');
    const [aiTrained, setAiTrained] = useState(false);
    const [cultureLoaded, setCultureLoaded] = useState(false);
    const [jobProfileLoaded, setJobProfileLoaded] = useState(false);
    const [uploadedCandidates, setUploadedCandidates] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [selectedCultureModule, setSelectedCultureModule] = useState('custom');

    const handleAddCandidate = (name) => {
        setUploadedCandidates(prev => [...prev, name]);
    };

    const handleRemoveCandidate = (index) => {
        const updatedCandidates = [...uploadedCandidates];
        updatedCandidates.splice(index, 1);
        setUploadedCandidates(updatedCandidates);
    };

    const handleAITraining = () => {
        setTimeout(() => setAiTrained(true), 1000);
    };

    const handleCultureLoad = () => {
        setTimeout(() => setCultureLoaded(true), 800);
    };

    const handleJobProfileLoad = () => {
        setTimeout(() => setJobProfileLoaded(true), 800);
    };

    const handleSetActiveTab = (tab) => {
        setActiveTab(tab)
    }

    const handleAnalyzeClick = () => {
        // setShowResults(true);
        // setActiveTab('analisi');
    };
    return (
        <div className="min-h-screen w-full bg-[#f9fafb] text-gray-800 flex flex-col">
            {/* Header */}
            <ContentHeader />

            {/* Main Content */}
            <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
                <ProgressBar activeTab={activeTab} />

                {/* Tabs */}
                <TabBar activeTab={activeTab} setActiveTab={handleSetActiveTab} />

                {/* Tab Content */}
                <div>
                    {/* Setup AI */}
                    {activeTab === 'setup' && (<SetupContent selectedCultureModule={selectedCultureModule} handleCultureLoad={handleCultureLoad} aiTrained={aiTrained} handleAITraining={handleAITraining} setSelectedCultureModule={setSelectedCultureModule} cultureLoaded={cultureLoaded} setActiveTab={handleSetActiveTab} />)}

                    {/* Job Profile */}
                    {activeTab === 'jobProfile' && (<ProfileContent jobProfileLoaded={jobProfileLoaded} handleJobProfileLoad={handleJobProfileLoad} setActiveTab={handleSetActiveTab} />)}

                    {/* Candidati */}
                    {activeTab === 'candidati' && (
                        <CandidateContent uploadedCandidates={uploadedCandidates} handleAddCandidate={handleAddCandidate} handleRemoveCandidate={handleRemoveCandidate} handleAnalyzeClick={handleAnalyzeClick} />
                    )}

                    {/* Analisi AI */}

                </div>
            </main>
        </div>
    )
}

export default Matcho