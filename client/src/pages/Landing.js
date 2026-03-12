import { useNavigate } from 'react-router-dom';
import { useTheme } from '../utils/ThemeContext';
import DarkModeToggle from '../components/DarkModeToggle';

const features = [
  {
    icon: '🎯',
    title: 'Smart Recommendations',
    desc: 'Our scoring algorithm matches you to 40+ careers based on your stream, skills and interests'
  },
  {
    icon: '📊',
    title: 'Skill Gap Tracker',
    desc: 'See exactly which skills you have and which ones to learn for your dream career'
  },
  {
    icon: '💾',
    title: 'Compare Careers',
    desc: 'Save up to 3 careers and compare them side by side to make the best decision'
  },
  {
    icon: '📄',
    title: 'PDF Report',
    desc: 'Download a personalized career report with your top matches and skill gaps'
  },
  {
    icon: '🔍',
    title: 'Search & Filter',
    desc: 'Search across 40+ careers and filter by match percentage or salary range'
  },
  {
    icon: '👤',
    title: 'Profile Management',
    desc: 'Update your skills, interests and marks anytime to get fresh recommendations'
  }
];

const steps = [
  {
    number: '01',
    title: 'Create Your Account',
    desc: 'Sign up in seconds with just your name, email and password'
  },
  {
    number: '02',
    title: 'Fill Your Profile',
    desc: 'Tell us your stream, interests, skills and academic marks in 4 simple steps'
  },
  {
    number: '03',
    title: 'Get Recommendations',
    desc: 'Our algorithm instantly scores 40+ careers and shows your best matches'
  },
  {
    number: '04',
    title: 'Plan Your Future',
    desc: 'Explore skill gaps, compare careers and download your personalized report'
  }
];

const careers = [
  'Software Engineer', 'Data Scientist', 'Doctor', 'Lawyer',
  'CA', 'Product Manager', 'UI/UX Designer', 'Investment Banker',
  'AI/ML Engineer', 'Journalist', 'Architect', 'Civil Services'
];

export default function Landing() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">

      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
          🧭 CareerCompass
        </h1>
        <div className="flex items-center gap-4">
          <DarkModeToggle />
          <button
            onClick={() => navigate('/login')}
            className="text-sm px-4 py-2 text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="text-sm px-5 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Get Started Free
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-6 py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            🚀 Built for Indian Students
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            Find Your Perfect
            <span className="text-indigo-600 dark:text-indigo-400"> Career Path</span>
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            CareerCompass uses a smart recommendation engine to match you with the best careers based on your stream, skills, interests and marks. Get personalized guidance in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/register')}
              className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 dark:shadow-none"
            >
              🎯 Get My Career Recommendations
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 border-2 border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 rounded-xl font-bold text-lg hover:bg-indigo-50 dark:hover:bg-indigo-900 transition"
            >
              Login to My Account
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto">
            <div>
              <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">40+</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Career Paths</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">100%</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Personalized</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">Free</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Forever</p>
            </div>
          </div>
        </div>
      </section>

      {/* Career Tags Marquee */}
      <section className="bg-indigo-600 dark:bg-indigo-800 py-4 overflow-hidden">
        <div className="flex gap-4 animate-pulse">
          {[...careers, ...careers].map((career, i) => (
            <span
              key={i}
              className="whitespace-nowrap bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-300 px-4 py-2 rounded-full text-sm font-medium"
            >
              {career}
            </span>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-20 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Get your personalized career recommendations in 4 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-2">{step.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
              Everything You Need
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Powerful features to help you make the right career decision
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-600 hover:shadow-md transition"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-2">{f.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Is This For */}
      <section className="px-6 py-20 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
              Who Is CareerCompass For?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🎓',
                title: 'Class 12 Students',
                desc: 'Confused about which stream or college to choose? We help you find the right path after 12th.'
              },
              {
                icon: '🏫',
                title: 'College Students',
                desc: 'Not sure about your career after graduation? Discover roles that match your skills and interests.'
              },
              {
                icon: '🔄',
                title: 'Career Switchers',
                desc: 'Looking to change careers? Find new paths that use your existing skills and experience.'
              }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-indigo-50 dark:bg-indigo-900 rounded-2xl p-8 text-center border border-indigo-100 dark:border-indigo-700"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-3 text-lg">{item.title}</h3>
                <p className="text-gray-500 dark:text-indigo-300 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-indigo-600 dark:bg-indigo-800 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-extrabold text-white mb-6">
            Ready to Find Your Dream Career?
          </h2>
          <p className="text-indigo-200 text-lg mb-10">
            Join thousands of students who have discovered their perfect career path with CareerCompass. It's completely free.
          </p>
          <button
            onClick={() => navigate('/register')}
            className="px-10 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:bg-indigo-50 transition shadow-lg"
          >
            🧭 Start My Career Journey →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-gray-400 px-6 py-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-white font-bold text-lg mb-1">🧭 CareerCompass</h3>
            <p className="text-sm">Personalized Career Guide for Indian Students</p>
          </div>
          <div className="flex gap-6 text-sm">
            <button onClick={() => navigate('/login')} className="hover:text-white transition">Login</button>
            <button onClick={() => navigate('/register')} className="hover:text-white transition">Register</button>
          </div>
          <div className="text-sm">
            Built with ❤️ using React & FastAPI
          </div>
        </div>
        <div className="text-center text-xs mt-8 text-gray-600">
          © 2025 CareerCompass. All rights reserved.
        </div>
      </footer>

    </div>
  );
}