import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../utils/api';

export default function CareerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [career, setCareer] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      const [careerRes, profileRes] = await Promise.all([
        API.get(`/careers/${id}`),
        API.get('/profile/me')
      ]);
      setCareer(careerRes.data);
      setProfile(profileRes.data);
    } catch (err) {
      console.error('Failed to load career details');
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-500">Loading career details...</p>
        </div>
      </div>
    );
  }

  if (!career) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Career not found.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Calculate skill gap
  const userSkills = profile?.skills?.map(s => s.toLowerCase()) || [];
  const requiredSkills = career.required_skills || [];
  const matchedSkills = requiredSkills.filter(s =>
    userSkills.includes(s.toLowerCase())
  );
  const missingSkills = requiredSkills.filter(s =>
    !userSkills.includes(s.toLowerCase())
  );
  const skillScore = requiredSkills.length > 0
    ? Math.round((matchedSkills.length / requiredSkills.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600">🎯 Career Advisor</h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="text-sm px-4 py-2 border-2 border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-50 transition"
        >
          ← Back to Dashboard
        </button>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">

        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{career.title}</h1>
          <p className="text-indigo-600 font-semibold text-lg mb-4">
            💰 Average Salary: {career.avg_salary}
          </p>
          <p className="text-gray-500">{career.job_outlook}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {career.tags?.map(tag => (
              <span key={tag} className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Skill Gap Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📊 Your Skill Gap</h2>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Skills matched: {matchedSkills.length} of {requiredSkills.length}</span>
              <span className="font-bold">{skillScore}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`h-4 rounded-full transition-all duration-500 ${
                  skillScore >= 70 ? 'bg-green-500' :
                  skillScore >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${skillScore}%` }}
              />
            </div>
          </div>

          {/* Matched Skills */}
          {matchedSkills.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-semibold text-green-700 mb-2">✅ Skills you have</p>
              <div className="flex flex-wrap gap-2">
                {matchedSkills.map(skill => (
                  <span key={skill} className="bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Missing Skills */}
          {missingSkills.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-red-600 mb-2">❌ Skills to learn</p>
              <div className="flex flex-wrap gap-2">
                {missingSkills.map(skill => (
                  <span key={skill} className="bg-red-50 text-red-600 border border-red-200 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Courses & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Top Courses */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">🎓 Top Courses</h2>
            <ul className="space-y-2">
              {career.top_courses?.map(course => (
                <li key={course} className="flex items-center gap-2 text-gray-600">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                  {course}
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">📜 Certifications</h2>
            <ul className="space-y-2">
              {career.certifications?.map(cert => (
                <li key={cert} className="flex items-center gap-2 text-gray-600">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Top Colleges */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">🏛️ Top Colleges</h2>
          <div className="flex flex-wrap gap-3">
            {career.top_colleges?.map((college, i) => (
              <div key={college} className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                <span className="text-indigo-600 font-bold text-sm">#{i + 1}</span>
                <span className="text-gray-700 text-sm">{college}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex-1 py-3 border-2 border-indigo-200 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition"
          >
            ← Back to Dashboard
          </button>
          <button
            onClick={() => navigate('/setup')}
            className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            Update My Skills →
          </button>
        </div>

      </div>
    </div>
  );
}