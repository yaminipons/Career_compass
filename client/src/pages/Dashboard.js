import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import jsPDF from 'jspdf';

function ScoreBadge({ score }) {
  const color =
    score >= 70 ? 'bg-green-100 text-green-700' :
    score >= 40 ? 'bg-yellow-100 text-yellow-700' :
    'bg-red-100 text-red-700';
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-bold ${color}`}>
      {score}% Match
    </span>
  );
}

function CareerCard({ career, onClick, onSave, isSaved }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:border-indigo-200 transition">
      <div className="flex justify-between items-start mb-3">
        <h3
          onClick={onClick}
          className="font-bold text-gray-800 text-lg cursor-pointer hover:text-indigo-600"
        >
          {career.title}
        </h3>
        <ScoreBadge score={career.match_score} />
      </div>

      <p
        onClick={onClick}
        className="text-indigo-600 font-semibold text-sm mb-3 cursor-pointer"
      >
        💰 {career.avg_salary}
      </p>

      <div className="flex flex-wrap gap-2 mb-3">
        {career.required_skills.slice(0, 3).map(skill => (
          <span key={skill} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
            {skill}
          </span>
        ))}
        {career.required_skills.length > 3 && (
          <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs">
            +{career.required_skills.length - 3} more
          </span>
        )}
      </div>

      <div className="flex justify-between items-center mt-3">
        <p className="text-xs text-gray-400 flex-1 mr-2">{career.job_outlook}</p>
        <button
          onClick={() => onSave(career)}
          className={`text-xs px-3 py-1 rounded-full border transition ${
            isSaved
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'border-gray-300 text-gray-500 hover:border-indigo-400'
          }`}
        >
          {isSaved ? '✅ Saved' : '+ Save'}
        </button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('match');
  const [saved, setSaved] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const name = localStorage.getItem('name');

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const res = await API.get('/careers/recommend');
      setData(res.data);
    } catch (err) {
      setError('Failed to load recommendations. Please complete your profile first.');
    }
    setLoading(false);
  };

  const filterCareers = (careers) => {
    let filtered = [...careers];

    if (search.trim()) {
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
      );
    }

    if (sortBy === 'match') {
      filtered.sort((a, b) => b.match_score - a.match_score);
    } else if (sortBy === 'salary') {
      filtered.sort((a, b) => a.avg_salary.localeCompare(b.avg_salary));
    }

    return filtered;
  };

  const toggleSave = (career) => {
    setSaved(prev => {
      const exists = prev.find(c => c.id === career.id);
      if (exists) return prev.filter(c => c.id !== career.id);
      if (prev.length >= 3) {
        alert('You can only compare up to 3 careers!');
        return prev;
      }
      return [...prev, career];
    });
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(22);
    doc.setTextColor(79, 70, 229);
    doc.text('Career Advisor Report', 20, 25);

    // Subtitle
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated for: ${name}`, 20, 35);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 42);

    // Divider
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 47, 190, 47);

    // Best Matches
    doc.setFontSize(16);
    doc.setTextColor(30, 30, 30);
    doc.text('Your Top Career Matches', 20, 58);

    let y = 68;
    data?.best_matches?.slice(0, 5).forEach((career, i) => {
      doc.setFontSize(13);
      doc.setTextColor(79, 70, 229);
      doc.text(`${i + 1}. ${career.title}`, 20, y);

      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.text(`Match Score: ${career.match_score}%`, 30, y + 7);
      doc.text(`Salary: ${career.avg_salary}`, 30, y + 14);
      doc.text(`Skills needed: ${career.required_skills.slice(0, 3).join(', ')}`, 30, y + 21);

      y += 32;
    });

    doc.save(`career-report-${name}.pdf`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-500">Loading your recommendations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600">🎯 Career Advisor</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600 text-sm">👋 Hello, {name}!</span>
          <button
            onClick={downloadPDF}
            className="text-sm px-4 py-2 bg-green-50 text-green-600 border-2 border-green-200 rounded-lg hover:bg-green-100 transition"
          >
            📄 Download Report
          </button>
          <button
            onClick={() => navigate('/setup')}
            className="text-sm px-4 py-2 border-2 border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-50 transition"
          >
            Update Profile
          </button>
          <button
            onClick={handleLogout}
            className="text-sm px-4 py-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {error && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-xl mb-6 flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={() => navigate('/setup')}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-600"
            >
              Complete Profile
            </button>
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="🔍 Search careers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 min-w-48 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
          />
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="match">Sort by Match %</option>
            <option value="salary">Sort by Salary</option>
          </select>
        </div>

        {data && (
          <>
            {/* Best Matches */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                🌟 Your Best Matches
              </h2>
              <p className="text-gray-500 mb-5">
                Careers that align most with your profile
              </p>

              {filterCareers(data.best_matches).length === 0 ? (
                <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
                  <p className="text-gray-500">No matches found.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filterCareers(data.best_matches).map(career => (
                    <CareerCard
                      key={career.id}
                      career={career}
                      onClick={() => navigate(`/career/${career.id}`)}
                      onSave={toggleSave}
                      isSaved={!!saved.find(c => c.id === career.id)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Explore More */}
            {filterCareers(data.explore_more).length > 0 && (
              <div className="mb-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  🔍 Explore More Careers
                </h2>
                <p className="text-gray-500 mb-5">
                  Other careers you might find interesting
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filterCareers(data.explore_more).map(career => (
                    <CareerCard
                      key={career.id}
                      career={career}
                      onClick={() => navigate(`/career/${career.id}`)}
                      onSave={toggleSave}
                      isSaved={!!saved.find(c => c.id === career.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Compare Bar */}
      {saved.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-700">
                Compare ({saved.length}/3):
              </span>
              {saved.map(c => (
                <span key={c.id} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                  {c.title}
                  <button
                    onClick={() => toggleSave(c)}
                    className="ml-2 text-indigo-400 hover:text-indigo-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <button
              onClick={() => setShowCompare(true)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Compare Now →
            </button>
          </div>
        </div>
      )}

      {/* Compare Modal */}
      {showCompare && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-screen overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Career Comparison</h2>
              <button
                onClick={() => setShowCompare(false)}
                className="text-gray-400 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <td className="py-3 font-semibold text-gray-500 w-32">Field</td>
                    {saved.map(c => (
                      <th key={c.id} className="py-3 px-4 text-indigo-600 font-bold text-left">
                        {c.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b bg-gray-50">
                    <td className="py-3 font-medium text-gray-600">Match %</td>
                    {saved.map(c => (
                      <td key={c.id} className="py-3 px-4 font-bold text-indigo-600">
                        {c.match_score}%
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium text-gray-600">Salary</td>
                    {saved.map(c => (
                      <td key={c.id} className="py-3 px-4">{c.avg_salary}</td>
                    ))}
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="py-3 font-medium text-gray-600">Top Skills</td>
                    {saved.map(c => (
                      <td key={c.id} className="py-3 px-4">
                        {c.required_skills.slice(0, 3).join(', ')}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium text-gray-600">Top Course</td>
                    {saved.map(c => (
                      <td key={c.id} className="py-3 px-4">
                        {c.top_courses?.[0]}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}