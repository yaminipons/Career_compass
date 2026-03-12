import { useTheme } from '../utils/ThemeContext';

export default function DarkModeToggle() {
  const { darkMode, toggleDark } = useTheme();

  return (
    <button
      onClick={toggleDark}
      className="relative inline-flex items-center w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none
        bg-gray-200 dark:bg-indigo-600"
    >
      <span
        className={`inline-block w-5 h-5 transform transition-transform duration-300 rounded-full shadow-md
          bg-white
          ${darkMode ? 'translate-x-8' : 'translate-x-1'}`}
      />
      <span className="absolute left-1.5 text-xs">
        {darkMode ? '' : '☀️'}
      </span>
      <span className="absolute right-1.5 text-xs">
        {darkMode ? '🌙' : ''}
      </span>
    </button>
  );
}