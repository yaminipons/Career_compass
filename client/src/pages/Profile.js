import { useState, useEffect } from 'react';
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

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    stream: '',
    interests: [],
    skills: [],
    tenth: '',
    twelfth: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get('/profile/me');
      setProfile(res.data);
      setForm({
        stream: res.data.stream || '',
        interests: res.data.interests || [],
        skills: res.data.skills || [],
        tenth: res.data.marks?.tenth || '',
        twelfth: res.data.marks?.twelfth || ''
      });
    } catch (err) {
      setError('Failed to load profile.');
    }
    setLoading(false);
  };

  const toggleInterest = (item) => {
    setForm(prev => ({
      ...prev,
      interests: prev.interests.includes(item)
        ? prev.interests.filter(i => i !== item)
        : [...prev.interests, item]
    }));
  };

  const toggleSkill = (item) => {
    setForm(prev => ({
      ...prev,
      skills: prev.skills.includes(item)
        ? prev.skills.filter(s => s !== item)
        : [...prev.skills, item]
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      await API.put('/profile/update', {
        stream: form.stream,
        interests: form.interests,
        skills: form.skills,
        tenth: parseFloat(form.tenth) || 0,
        twelfth: parseFloat(form.twelfth) || 0
      });
      setSuccess('Profile updated successfully!');
      setEditMode(false);
      fetchProfile();
    } catch (err) {
      setError('Failed to save profile. Please try again.');
    }
    setSaving(false);
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
          <p className="text-gray-500">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600">🧭 CareerCompass</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-sm px-4 py-2 border-2 border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-50 transition"
          >
            ← Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="text-sm px-4 py-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              👤 {profile?.name}
            </h2>
            <p className="text-gray-500 mt-1">{profile?.email}</p>
          </div>
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              ✏️ Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setEditMode(false);
                  setError('');
                  fetchProfile();
                }}
                className="px-5 py-2 border-2 border-gray-200 text-gray-600 rounded-lg font-semibold hover:border-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
              >
                {saving ? 'Saving...' : '💾 Save Changes'}
              </button>
            </div>
          )}
        </div>

        {/* Success / Error messages */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl">
            ✅ {success}
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl">
            ❌ {error}
          </div>
        )}

        {/* Stream */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">🎓 Stream</h3>
          {editMode ? (
            <div className="flex gap-3">
              {['Science', 'Commerce', 'Arts'].map(s => (
                <button
                  key={s}
                  onClick={() => setForm({ ...form, stream: s })}
                  className={`px-5 py-2 rounded-xl border-2 font-medium transition ${
                    form.stream === s
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 hover:border-indigo-300 text-gray-600'
                  }`}
                >
                  {s === 'Science' && '🔬 '}
                  {s === 'Commerce' && '💼 '}
                  {s === 'Arts' && '🎨 '}
                  {s}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-700 font-medium">
              {form.stream === 'Science' && '🔬 '}
              {form.stream === 'Commerce' && '💼 '}
              {form.stream === 'Arts' && '🎨 '}
              {form.stream || 'Not set'}
            </p>
          )}
        </div>

        {/* Interests */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">❤️ Interests</h3>
          {editMode ? (
            <div className="flex flex-wrap gap-2">
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
          ) : (
            <div className="flex flex-wrap gap-2">
              {form.interests.length > 0 ? form.interests.map(item => (
                <span key={item} className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium">
                  {item}
                </span>
              )) : (
                <p className="text-gray-400">No interests added yet</p>
              )}
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">🛠️ Skills</h3>
          {editMode ? (
            <div className="flex flex-wrap gap-2">
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
          ) : (
            <div className="flex flex-wrap gap-2">
              {form.skills.length > 0 ? form.skills.map(item => (
                <span key={item} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  {item}
                </span>
              )) : (
                <p className="text-gray-400">No skills added yet</p>
              )}
            </div>
          )}
        </div>

        {/* Marks */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📊 Academic Marks</h3>
          {editMode ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">10th Percentage</label>
                <input
                  type="number"
                  value={form.tenth}
                  onChange={e => setForm({ ...form, tenth: e.target.value })}
                  className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">12th Percentage</label>
                <input
                  type="number"
                  value={form.twelfth}
                  onChange={e => setForm({ ...form, twelfth: e.target.value })}
                  className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-500">10th Percentage</p>
                <p className="text-2xl font-bold text-indigo-600 mt-1">
                  {form.tenth ? `${form.tenth}%` : 'Not set'}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-500">12th Percentage</p>
                <p className="text-2xl font-bold text-indigo-600 mt-1">
                  {form.twelfth ? `${form.twelfth}%` : 'Not set'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Stats Summary */}
        <div className="bg-indigo-50 rounded-2xl border border-indigo-100 p-6">
          <h3 className="text-lg font-bold text-indigo-800 mb-4">📈 Profile Summary</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-indigo-600">{form.skills.length}</p>
              <p className="text-sm text-indigo-500 mt-1">Skills</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-indigo-600">{form.interests.length}</p>
              <p className="text-sm text-indigo-500 mt-1">Interests</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-indigo-600">{form.stream || '—'}</p>
              <p className="text-sm text-indigo-500 mt-1">Stream</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}