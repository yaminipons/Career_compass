import { useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

function ScoreCircle({ score }) {
  const color = score >= 70 ? '#22c55e' : score >= 40 ? '#f59e0b' : '#ef4444';
  const label = score >= 70 ? 'Great' : score >= 40 ? 'Average' : 'Needs Work';
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-32 h-32 rounded-full flex flex-col items-center justify-center border-8"
        style={{ borderColor: color }}
      >
        <span className="text-4xl font-extrabold" style={{ color }}>{score}</span>
        <span className="text-xs font-semibold" style={{ color }}>{label}</span>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Resume Score</p>
    </div>
  );
}

function ScoreBar({ label, value, max = 25 }) {
  const percent = (value / max) * 100;
  const color = percent >= 70 ? 'bg-green-500' : percent >= 40 ? 'bg-yellow-500' : 'bg-red-500';
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600 dark:text-gray-400 font-medium">{label}</span>
        <span className="font-bold text-gray-800 dark:text-white">{value}/{max}</span>
      </div>
      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFile = (f) => {
    if (!f) return;
    if (!f.name.endsWith('.pdf') && !f.name.endsWith('.docx')) {
      setError('Only PDF and DOCX files are supported');
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }
    setFile(f);
    setError('');
    setResult(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleAnalyze = async () => {
    if (!file) return setError('Please upload a resume first');
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await API.post('/resume/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Analysis failed. Please try again.');
    }
    setLoading(false);
  };

  const levelColor = {
    'Fresher': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    'Junior': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    'Mid-Level': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
    'Senior': 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white">
              📄 Resume Analyzer
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Upload your resume and get AI-powered feedback instantly
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Upload Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 mb-6">
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-10 text-center transition cursor-pointer ${
              dragging
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900'
                : file
                ? 'border-green-400 bg-green-50 dark:bg-green-900'
                : 'border-gray-200 dark:border-gray-600 hover:border-indigo-400'
            }`}
            onClick={() => document.getElementById('resume-input').click()}
          >
            <input
              id="resume-input"
              type="file"
              accept=".pdf,.docx"
              className="hidden"
              onChange={e => handleFile(e.target.files[0])}
            />
            {file ? (
              <>
                <p className="text-4xl mb-3">✅</p>
                <p className="font-bold text-green-600 dark:text-green-400">{file.name}</p>
                <p className="text-sm text-gray-400 mt-1">
                  {(file.size / 1024).toFixed(1)} KB — Click to change
                </p>
              </>
            ) : (
              <>
                <p className="text-5xl mb-4">📄</p>
                <p className="font-bold text-gray-700 dark:text-gray-200 text-lg mb-1">
                  Drop your resume here
                </p>
                <p className="text-gray-400 text-sm">or click to browse</p>
                <p className="text-xs text-gray-300 dark:text-gray-500 mt-3">
                  Supports PDF and DOCX — Max 5MB
                </p>
              </>
            )}
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
          )}

          <button
            onClick={handleAnalyze}
            disabled={!file || loading}
            className="w-full mt-4 py-3 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
                Analyzing your resume...
              </span>
            ) : '🔍 Analyze My Resume'}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">

            {/* Score + Level */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <ScoreCircle score={result.score} />
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="font-bold text-gray-800 dark:text-white text-lg">Score Breakdown</h2>
                    {result.experience_level && (
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${levelColor[result.experience_level] || 'bg-gray-100 text-gray-700'}`}>
                        {result.experience_level}
                      </span>
                    )}
                  </div>
                  <ScoreBar label="Content Quality" value={result.score_breakdown?.content || 0} />
                  <ScoreBar label="Skills Coverage" value={result.score_breakdown?.skills || 0} />
                  <ScoreBar label="Structure & Format" value={result.score_breakdown?.structure || 0} />
                  <ScoreBar label="Impact & Achievement" value={result.score_breakdown?.impact || 0} />
                </div>
              </div>
            </div>

            {/* Target Roles */}
            {result.target_roles?.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
                <h3 className="font-bold text-gray-800 dark:text-white mb-4">🎯 Suitable Roles</h3>
                <div className="flex flex-wrap gap-2">
                  {result.target_roles.map((role, i) => (
                    <span key={i} className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-sm font-medium">
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
                <h3 className="font-bold text-gray-800 dark:text-white mb-4">✅ Strengths</h3>
                <ul className="space-y-2">
                  {result.strengths?.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>{s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
                <h3 className="font-bold text-gray-800 dark:text-white mb-4">⚠️ Weaknesses</h3>
                <ul className="space-y-2">
                  {result.weaknesses?.map((w, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <span className="text-red-500 mt-0.5 flex-shrink-0">✗</span>{w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Detected Skills */}
            {result.detected_skills?.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
                <h3 className="font-bold text-gray-800 dark:text-white mb-4">🛠 Skills Detected in Resume</h3>
                <div className="flex flex-wrap gap-2">
                  {result.detected_skills.map((skill, i) => (
                    <span key={i} className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Missing Keywords */}
            {result.missing_keywords?.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
                <h3 className="font-bold text-gray-800 dark:text-white mb-4">🔑 Missing Keywords</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  Add these keywords to your resume to pass ATS filters
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.missing_keywords.map((kw, i) => (
                    <span key={i} className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 px-3 py-1 rounded-full text-sm font-medium">
                      + {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Wins */}
            {result.quick_wins?.length > 0 && (
              <div className="bg-yellow-50 dark:bg-yellow-900 rounded-2xl shadow p-6 border border-yellow-200 dark:border-yellow-700">
                <h3 className="font-bold text-yellow-800 dark:text-yellow-200 mb-4">⚡ Quick Wins — Fix These First!</h3>
                <ul className="space-y-2">
                  {result.quick_wins.map((qw, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-yellow-700 dark:text-yellow-300">
                      <span className="font-bold flex-shrink-0">{i + 1}.</span>{qw}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Improvement Suggestions */}
            {result.improvement_suggestions?.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
                <h3 className="font-bold text-gray-800 dark:text-white mb-4">💡 Improvement Suggestions</h3>
                <ul className="space-y-3">
                  {result.improvement_suggestions.map((s, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-50 dark:border-gray-700 pb-3 last:border-0 last:pb-0">
                      <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold flex-shrink-0 text-xs">
                        {i + 1}
                      </span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Analyze Another */}
            <button
              onClick={() => { setResult(null); setFile(null); }}
              className="w-full py-3 border-2 border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 rounded-xl font-bold hover:bg-indigo-50 dark:hover:bg-indigo-900 transition"
            >
              📄 Analyze Another Resume
            </button>

          </div>
        )}
      </div>
    </div>
  );
}