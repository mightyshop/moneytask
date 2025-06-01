import React, { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import { getRandomTask, getDeviceType } from '../utils/tasks';
import PrizeWheel from './PrizeWheel';
import RewardForm from './RewardForm';

interface TaskStepProps {
  username: string;
}

const TaskStep: React.FC<TaskStepProps> = ({ username }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [task, setTask] = useState(getRandomTask());
  const [currentStep, setCurrentStep] = useState<'task' | 'verifying' | 'wheel' | 'claim'>('task');
  const [selectedPrize, setSelectedPrize] = useState<{ value: number; type: 'airtime' | 'cash' } | null>(null);
  const deviceType = getDeviceType();

  const getTaskInstructions = (taskType: string) => {
    switch (taskType) {
      case 'app':
        return 'Install the app and use it for 1 minute. Record your screen while using the app and upload the recording below.';
      case 'youtube':
        return 'Watch the video for at least 1 minute. Record your screen while watching and upload the recording below.';
      case 'website':
        return 'Visit the website and read for 1 minute. Record your screen while reading and upload the recording below.';
      case 'subscribe':
        return 'Subscribe to the YouTube channel. Take a screenshot of your subscription confirmation and upload it below.';
      default:
        return 'Record your screen while completing the task and upload the proof below.';
    }
  };

  const getAcceptedFileTypes = (taskType: string) => {
    return taskType === 'subscribe' ? 'image/*' : 'video/*';
  };

  const getUploadText = (taskType: string) => {
    return taskType === 'subscribe' 
      ? 'Click to upload your subscription screenshot'
      : 'Click to upload your screen recording';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    setIsVerifying(true);
    
    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);
      setCurrentStep('wheel');
    }, 10000);
  };

  const handlePrizeSelected = (prize: { value: number; type: 'airtime' | 'cash' }) => {
    setSelectedPrize(prize);
    setCurrentStep('claim');
  };

  const handleClaimSubmit = (formData: any) => {
    alert('Thank you! Your reward claim has been submitted and will be processed shortly.');
  };

  const handleTaskClick = () => {
    window.open(task?.url, '_blank');
  };

  if (!task || deviceType === 'ios') {
    return (
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h2 className="text-xl font-semibold text-yellow-800 mb-4">
          {deviceType === 'ios' 
            ? 'iOS devices are currently not supported'
            : 'No tasks available at the moment'}
        </h2>
        <p className="text-gray-700">
          {deviceType === 'ios'
            ? 'Please try again using an Android device or desktop computer.'
            : 'Please check back later for new tasks.'}
        </p>
      </div>
    );
  }

  if (currentStep === 'wheel') {
    return <PrizeWheel onPrizeSelected={handlePrizeSelected} />;
  }

  if (currentStep === 'claim' && selectedPrize) {
    return (
      <RewardForm
        type={selectedPrize.type}
        amount={selectedPrize.value}
        onSubmit={handleClaimSubmit}
      />
    );
  }

  return (
    <div className="space-y-6">
      {isVerifying ? (
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="text-lg font-medium text-gray-700">Verifying your submission...</p>
          <p className="text-sm text-gray-600">Please wait while we process your proof.</p>
        </div>
      ) : (
        <>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Final Step</h2>
            <div className="space-y-4">
              <p className="text-gray-700">Complete this task to receive your reward:</p>
              
              <div 
                onClick={handleTaskClick}
                className="bg-white p-4 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-800 mb-2">{task.title}</h3>
                <p className="text-gray-600">{task.description}</p>
              </div>

              <p className="text-gray-700 font-medium mt-4">
                {getTaskInstructions(task.type)}
              </p>
            </div>
          </div>

          <form onSubmit={handleUpload} className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                accept={getAcceptedFileTypes(task.type)}
                onChange={handleFileChange}
                className="hidden"
                id="proof-upload"
              />
              <label
                htmlFor="proof-upload"
                className="cursor-pointer flex flex-col items-center space-y-2"
              >
                <Upload className="w-8 h-8 text-gray-400" />
                <span className="text-gray-600">
                  {file ? file.name : getUploadText(task.type)}
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={!file || isUploading}
              className={`
                w-full py-3 px-4 rounded-lg text-white
                ${file && !isUploading
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-gray-400 cursor-not-allowed'
                }
                transition-all duration-200
              `}
            >
              {isUploading ? 'Uploading...' : 'Submit Proof'}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default TaskStep;