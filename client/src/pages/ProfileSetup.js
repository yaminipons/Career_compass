import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

const INTERESTS = [
  'Coding', 'Design', 'Finance', 'Marketing', 'Healthcare',
  'Law', 'Media', 'Teaching', 'Business', 'Science',
  'Arts', 'Sports', 'Music', 'Writing', 'Social Work'
];

const SKILLS = [
  'Python', 'JavaScript', 'React', 'SQL', 'Excel',
  'Figma', 'Photoshop', 'Communication', 'DSA', 'Java',
  'Accounting', 'Tally', 'Statistics', 'Video Editing',
  'Content Writing', 'SEO', 'Linux', 'AWS', 'Machine Learning'
];

export default function ProfileSetup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    stream: '',
    interests: [],
    skills: [],
    tenth: '',
    twelfth: ''
  });

  // Toggle interest selection
  const toggleInterest = (item) => {
    setForm(prev => ({
      ...prev,
      interests: prev.interests.includes(item)
        ? prev.interests.filter(i => i !== item)
        : [...prev.interests, item]
    }));
  };

  // Toggle skill selection
  const toggleSkill = (item) => {
    setForm(prev => ({
      ...prev,
      skills: prev.skills.includes(item)
        ? prev.skills.filter(s => s !== item)
        : [...prev.skills, item]
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      await API.put('/profile/update', {
        stream: form.stream,
        interests: form.interests,
        skills: form.skills,
        tenth: parseFloat(form.tenth),
        twelfth: parseFloat(form.twelfth)
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to save profile. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg">

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Step {step} of 4</span>
            <span>{Math.round((step / 4) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1 — Stream Selection */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">What's your stream?</h2>
            <p className="text-gray-500 mb-6">This helps us find the most relevant careers for you</p>

            <div className="space-y-3">
              {['Science', 'Commerce', 'Arts'].map(s => (
                <button
                  key={s}
                  onClick={() => setForm({ ...form, stream: s })}
                  className={`w-full p-4 rounded-xl border-2 text-left font-medium transition ${
                    form.stream === s
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  {s === 'Science' && '🔬 '}{s === 'Commerce' && '💼 '}{s === 'Arts' && '🎨 '}
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 — Interests */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">What are your interests?</h2>
            <p className="text-gray-500 mb-6">Select all that apply</p>

            <div className="flex flex-wrap gap-3">
              {INTERESTS.map(item => (
                <button
                  key={item}
                  onClick={() => toggleInterest(item)}
                  className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition ${
                    form.interests.includes(item)
                      ? 'border-indigo-600 bg-indigo-600 text-white'
                      : 'border-gray-200 hover:border-indigo-300 text-gray-700'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3 — Skills */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">What are your skills?</h2>
            <p className="text-gray-500 mb-6">Select skills you already have</p>

            <div className="flex flex-wrap gap-3">
              {SKILLS.map(item => (
                <button
                  key={item}
                  onClick={() => toggleSkill(item)}
                  className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition ${
                    form.skills.includes(item)
                      ? 'border-indigo-600 bg-indigo-600 text-white'
                      : 'border-gray-200 hover:border-indigo-300 text-gray-700'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4 — Marks */}
        {step === 4 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your academic marks</h2>
            <p className="text-gray-500 mb-6">Enter your percentage scores</p>

            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">10th Percentage</label>
                <input
                  type="number"
                  placeholder="e.g. 85"
                  value={form.tenth}
                  onChange={e => setForm({ ...form, tenth: e.target.value })}
                  className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">12th Percentage</label>
                <input
                  type="number"
                  placeholder="e.g. 78"
                  value={form.twelfth}
                  onChange={e => setForm({ ...form, twelfth: e.target.value })}
                  className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 border-2 border-gray-200 rounded-lg font-medium text-gray-600 hover:border-indigo-300 transition"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={step === 1 && !form.stream}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? 'Saving...' : '🎯 Get My Recommendations'}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}