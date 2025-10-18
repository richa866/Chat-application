
import { useThemeStore } from "../store/useThemeStore";


export default function ThemeToggleSwitch() {
  const { theme, setTheme } = useThemeStore();

  return (
    <label className="relative inline-block w-14 h-8 cursor-pointer">
      <input
        type="checkbox"
        checked={darkMode}
        onChange={toggleTheme}
        className="peer sr-only"
      />
      {/* Slider background */}
      <span className="absolute inset-0 rounded-full border border-gray-400 bg-gray-400 transition-colors peer-checked:bg-gray-900 peer-checked:border-gray-900"></span>

      {/* Circle knob */}
      <span className="absolute left-[-2px] bottom-[-2px] h-8 w-8 rounded-full bg-white border-2 border-gray-400 transition-transform peer-checked:translate-x-6 peer-checked:border-gray-900"></span>

      {/* Icon inside slider */}
      <Check className="absolute top-2 left-2 h-3 w-3 stroke-[3px] text-black opacity-0 transition-all peer-checked:opacity-100 peer-checked:left-7" />
    </label>
  );
}
