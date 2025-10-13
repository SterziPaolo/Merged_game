import { useState } from 'react';
import { goals, getFunctionalGoal } from '../../../data/goals';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

export default function GoalSelection({ onGoalSelected }) {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showMappingDialog, setShowMappingDialog] = useState(false);
  const [mappingOptions, setMappingOptions] = useState([]);

  const handleGoalClick = (goal) => {
    setSelectedGoal(goal);

    if (goal.functional) {
      // Functional goal - proceed directly
      onGoalSelected(goal, goal);
    } else {
      // Cosmetic goal - show mapping dialog
      const functionalGoals = goals.filter(g => g.functional);
      const suggestedGoal = getFunctionalGoal(goal.id);

      setMappingOptions(functionalGoals);
      setShowMappingDialog(true);
    }
  };
  console.log(goals);

  const handleMappingConfirm = (mappedGoal) => {
    if (selectedGoal) {
      onGoalSelected(selectedGoal, mappedGoal);
    }
    setShowMappingDialog(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#485ee1] to-[#3cb1f5] bg-clip-text text-transparent">
            Choose the life goal that most resonates with you
          </h1>
          <p className="text-[1.125rem] font-semibold text-[#6b728c] max-w-2xl mx-auto">
            You'll make 10 life choices over the next decade. Each choice helps us understand how you make decisions under pressure and change.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="text-sm text-[#6b728c] font-semibold">Progress Preview:</div>
            <div className="flex gap-1">
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className="w-6 h-2 bg-[#f3f4f6] rounded-full" />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {goals.map((goal, index) => (
            <Card
              key={goal.id}
              className={`goal-card p-[1rem] border-[1px] border-[#4a4fde33] transform hover:shadow-lg hover:translate-y-[-2px] ${goal.functional ? 'functional' : ''} ${selectedGoal?.id === goal.id ? 'selected' : ''
                }`}
              onClick={() => handleGoalClick(goal)}
            >
              <div className="text-center space-y-3">
                <div className="relative">
                  <img
                    src={goal.image}
                    alt={goal.title}
                    className="w-16 h-16 mx-auto object-contain"
                  />
                  {goal.functional && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#4a4fde] rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-sm leading-tight mb-1">
                    {goal.title}
                  </h3>
                  <p className="text-[0.75rem] text-[#6b7280]">
                    {goal.description}
                  </p>
                </div>

                {!goal.functional && goal.mapTo && (
                  <Badge variant="secondary" className="text-[0.75rem] bg-[#3abff8]">
                    maps to → {goals.find(g => g.id === goal.mapTo)?.title.split(' ')[0]}
                  </Badge>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={showMappingDialog} onOpenChange={setShowMappingDialog}>
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle>Confirm Goal Mapping</DialogTitle>
            <DialogDescription>
              We'll align "{selectedGoal?.title}" to one of our core assessment categories for meaningful scenario outcomes.
              You can confirm our suggestion or choose a different mapping.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="text-sm font-medium">Choose mapping for assessment:</div>
            <div className="grid grid-cols-2 gap-3">
              {mappingOptions.map((mappedGoal) => {
                const isRecommended = mappedGoal.id === getFunctionalGoal(selectedGoal?.id || '').id;
                return (
                  <Button
                    key={mappedGoal.id}
                    variant={isRecommended ? "default" : "outline"}
                    className="h-auto p-4 flex flex-col items-start gap-2 border border-[#e5e7eb]"
                    onClick={() => handleMappingConfirm(mappedGoal)}
                  >
                    <div className="">
                      <div className='flex items-center gap-2 wrap-anywhere'>
                        <img src={mappedGoal.image} alt="" className="w-6 h-6" />
                        <p className="font-medium text-sm">{mappedGoal.title}</p>
                      </div>
                      {isRecommended && <Badge className="text-[0.75rem]">Recommended</Badge>}
                    </div>
                    <p className="text-[0.75rem] text-left opacity-75">{mappedGoal.description}</p>
                  </Button>
                );
              })}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
