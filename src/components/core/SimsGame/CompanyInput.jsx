import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

const COMPETENCIES = [
  'Leadership',
  'Communication',
  'Problem Solving', 
  'Adaptability',
  'Teamwork',
  'Strategic Thinking',
  'Innovation',
  'Decision Making',
  'Risk Management',
  'Emotional Intelligence',
  'Time Management',
  'Analytical Skills'
];

export default function CompanyInput({ onComplete, onSkip }) {
  const [description, setDescription] = useState('');
  const [selectedRequirements, setSelectedRequirements] = useState([]);

  const handleRequirementChange = (competency, checked) => {
    if (checked) {
      setSelectedRequirements(prev => [...prev, competency]);
    } else {
      setSelectedRequirements(prev => prev.filter(req => req !== competency));
    }
  };

  const handleSubmit = () => {
    if (selectedRequirements.length < 3) {
      alert('Please select at least 3 competencies');
      return;
    }
    onComplete(description, selectedRequirements);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl p-8 border border-[#e5e7eb]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Company Requirements</h1>
          <p className="text-[#6b7280]">
            Help us tailor the assessment to your specific role requirements (optional)
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="description" className="text-base font-medium">
              Job Description
            </Label>
            <p className="text-sm text-[#6b7280] mb-3">
              Paste the job description or role requirements
            </p>
            <Textarea
              id="description"
              placeholder="Paste job description here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="resize-none  border border-[#e5e7eb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          <div>
            <Label className="text-base font-medium">
              Key Competencies Required
            </Label>
            <p className="text-sm text-[#6b7280] mb-4">
              Select 3-5 most important competencies for this role
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {COMPETENCIES.map((competency) => (
                <div key={competency} className="flex items-center space-x-2">
                  <Checkbox
                    id={competency}
                    checked={selectedRequirements.includes(competency)}
                    onCheckedChange={(checked) => 
                      handleRequirementChange(competency, checked)
                    }
                  />
                  <Label 
                    htmlFor={competency}
                    className="text-sm cursor-pointer"
                  >
                    {competency}
                  </Label>
                </div>
              ))}
            </div>
            
            <p className="text-[0.75rem] text-[#6b7280] mt-2">
              Selected: {selectedRequirements.length} / 5 max
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <Button 
              onClick={handleSubmit}
              disabled={selectedRequirements.length < 3}
              className="flex-1 text-white"
            >
              Continue with Company Context
            </Button>
            <Button 
              onClick={onSkip}
              variant="outline"
              className="flex-1 border border-[#e5e7eb]"
            >
              Skip & Use Standard Assessment
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
