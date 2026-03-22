import { useState, useEffect } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function SkillGap() {
  const [careers, setCareers] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [userSkills, setUserSkills] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const res = await API.get('/careers/recommend');
        const all = [...res.data.best_matches, ...res.data.explore_more];
        setCareers(all);
      } catch {
        setError('Failed to load careers');
      }
    };
    fetchCareers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !userSkills.includes(trimmed)) {
      setUserSkills([...userSkills, trimmed]);
    }
    setSkillInput('');
  };

  const removeSkill = (skill) => {
    setUserSkills(userSkills.filter(s => s !== skill));
  };

  const handleAnalyze = async () => {
    if (!selectedCareer) return setError('Please select a career');
    if (userSkills.length === 0) return setError('Please add at least one skill');
    setError('');
    setLoading(true);
    try {
      const res = await API.post('/skillgap/analyze', {
        career_id: selectedCareer,
        user_skills: userSkills
      });
      setResult(res.data);
    } catch {
      setError('Analysis failed. Please try again.');
    }
    setLoading(false);
  };

  const getScoreColor = (percent) => {
    if (percent >= 70) return 'text-green-600 dark:text-green-400';
    if (percent >= 40) return 'text-yellow-500 dark:text-yellow-400';
    return 'text-red-500 dark:text-red-400';
  };

  const getBarColor = (percent) => {
    if (percent >= 70) return 'bg-green-500';
    if (percent >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white">
              🔍 Skill Gap Analyzer
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Find out what skills you need for your dream career
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Input Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 mb-6">

          {/* Career Selector */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Select Target Career
            </label>
            <select
              value={selectedCareer}
              onChange={e => setSelectedCareer(e.target.value)}
              className="w-full border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">-- Choose a career --</option>
              {careers.map(c => (
                <option key={c._id} value={c.title}>{c.title}</option>
              ))}
            </select>
          </div>

          {/* Skill Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Enter Your Current Skills
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addSkill()}
                placeholder="e.g. Python, SQL, React..."
                className="flex-1 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                onClick={addSkill}
                className="px-5 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
              >
                Add
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">Press Enter or click Add to add a skill</p>

            {/* Skill Tags */}
            {userSkills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {userSkills.map((skill, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="ml-1 text-indigo-400 hover:text-red-500 font-bold"
                    >×</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : '🔍 Analyze My Skills'}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">

            {/* Score Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                📊 Results for {result.career}
              </h2>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400 font-medium">Match Score</span>
                <span className={`text-3xl font-extrabold ${getScoreColor(result.match_percentage)}`}>
                  {result.match_percentage}%
                </span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-4 mb-4">
                <div
                  className={`h-4 rounded-full transition-all duration-700 ${getBarColor(result.match_percentage)}`}
                  style={{ width: `${result.match_percentage}%` }}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                You have {result.matched_skills.length} out of {result.total_required} required skills
              </p>
            </div>

            {/* Matched Skills */}
            {result.matched_skills.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
                <h3 className="font-bold text-gray-800 dark:text-white mb-4">
                  ✅ Skills You Already Have
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.matched_skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Missing Skills + Resources */}
            {result.recommendations.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
                <h3 className="font-bold text-gray-800 dark:text-white mb-4">
                  📚 Skills to Learn + Free Resources
                </h3>
                <div className="space-y-4">
                  {result.recommendations.map((rec, i) => (
                    <div
                      key={i}
                      className="border border-gray-100 dark:border-gray-700 rounded-xl p-4"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 px-3 py-1 rounded-full text-sm font-semibold">
                          ✗ {rec.skill}
                        </span>
                        <span className="text-xs text-gray-400">Missing skill</span>
                      </div>
                      <ul className="space-y-1">
                        {rec.resources.map((r, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                          >
                            <span className="text-indigo-400 mt-0.5">→</span>
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Perfect Match */}
            {result.missing_skills.length === 0 && (
              <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-2xl p-6 text-center">
                <p className="text-3xl mb-2">🎉</p>
                <p className="text-green-700 dark:text-green-300 font-bold text-lg">
                  Perfect Match! You have all the required skills for {result.career}!
                </p>
              </div>
            )}

            {/* Analyze Another */}
            <button
              onClick={() => { setResult(null); setUserSkills([]); setSelectedCareer(''); }}
              className="w-full py-3 border-2 border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 rounded-xl font-bold hover:bg-indigo-50 dark:hover:bg-indigo-900 transition"
            >
              🔄 Analyze Another Career
            </button>

          </div>
        )}
      </div>
    </div>
  );
}