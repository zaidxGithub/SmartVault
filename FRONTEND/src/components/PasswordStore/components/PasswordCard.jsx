import { useState } from 'react';
import { Eye, EyeOff, Copy, Share2, Trash2, ExternalLink, Calendar, Star, CalendarHeartIcon, StarHalfIcon, StarOff, StarsIcon, LoaderCircle } from 'lucide-react';
import { getStrengthColor, getStrengthBgColor } from '../utils/passwordStrength';
import { FaStar } from 'react-icons/fa';
// import{ ToastContainer,toast }from "react-toastify"

export default function PasswordCard({ password, onDelete, onCopy, onShare ,isDelete}) {
  const [showPassword, setShowPassword] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
const getCategoryColor = (category) => {
  switch (category) {
    case 'Social':
      return `
        bg-sky-100 text-sky-800 font-mono
        dark:bg-sky-900/40 dark:text-sky-300 
      `;
    case 'Work':
      return `
        bg-emerald-100 text-emerald-800 font-mono
        dark:bg-emerald-900/40 dark:text-emerald-300
      `;
    case 'Banking':
      return `
        bg-rose-200 text-rose-500 font-mono
        dark:bg-gray-800/70 dark:text-white/80 font-mono
      `;
    case 'Education':
      return `
        bg-violet-100 text-violet-800 font-mono
        dark:bg-violet-900/40 dark:text-violet-300
      `;
    default:
      return `
        bg-gray-100 text-gray-800 font-mono
        dark:bg-gray-800 dark:text-gray-300
      `;
  }
};




 

return (
  <div className="bg-[var(--card)] rounded-lg shadow-sm shadow-blue-500/30 border-l-3 border-[var(--card-border)] p-3 sm:p-5 
                  hover:shadow-[0_0_12px_var(--accent)] transition-all duration-300">
    <div className="flex items-start justify-between mb-4 border-b-2 border-[var(--card-border)] ">
      <div className="flex-1 overflow-auto ">
        <div className="flex items-center gap-2 mb-2 ">
          <h3 className="text-lg font-mono text-[var(--foreground)]">{password.title}</h3>
          {password.Important && (
            <FaStar className="w-3 h-3 text-white fill-[var(--important-star-bg)]" />
          )}
        </div>
        {password.url && (
          <a
            href={password.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-[var(--link)] hover:underline"
          >
            <ExternalLink className="w-3 h-3" />
            {password.url}
          </a>
        )}

        {password.notes && (
          <p className="mt-1 text-sm text-[var(-muted-forground)] leading-relaxed">
            {password.notes}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1 ">
        <span
          className={`px-2 sm:px-3 py-1  rounded-sm sm:rounded-md text-[9px] sm:text-xs font-medium ${getCategoryColor(password.category)}`}
        >
          {password.category.charAt(0).toUpperCase() + password.category.slice(1)}
        </span>
        <span
          className={`px-2 sm:px-3 py-1 rounded-sm sm:rounded-md  text-[9px] sm:text-xs font-medium ${getCategoryColor(password.category)}`}
        >
          {password.deviceUsed}
        </span>
      </div>
    </div>

    <div className="space-y-3 mb-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-[var(--card-t-secondary)] w-24">Username:</span>
        <span className="text-sm text-[var(--muted-foreground)] font-medium">{password.username}</span>
      </div>

      <div className="flex items-center gap-2 ">
        <span className="text-sm font-medium text-[var(--card-t-secondary)] w-24">Password:</span>
        <div className="flex items-center gap-2 flex-1">
          <span className="text-sm text-[var(--card-t-secondary)] font-mono  
                           px-3 py-1 rounded border border-[var(--border)]">
            {showPassword ? password.password : '••••••••••'}
          </span>

          <button
            onClick={() => setShowPassword(!showPassword)}
            className="p-1.5 hover:bg-[var(--hover)] rounded transition-colors"
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4 text-[var(--primary)]" />
            ) : (
              <Eye className="w-4 h-4 text-[var(--primary)]" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-[var(--card-t-secondary)] w-24">Strength:</span>
        <span
          className={`text-xs font-mono px-3 py-1 rounded-md 
                     ${getStrengthColor(password.strength.toLowerCase())} 
                     ${getStrengthBgColor(password.strength.toLowerCase())}`}
        >
          {password.strength.toUpperCase()}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-[var(--card-t-secondary)] w-24">Created:</span>
        <span className="text-sm text-[var(--muted-foreground)] flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          {formatDate(password.createdAt)}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-[var(--card-t-secondary))] w-24">Expiry:</span>
        <span className="text-sm text-[var(--muted-foreground)] flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />

        { password.expirationReminder ? (formatDate(password.expirationReminder)):(<p> Not set</p>)}
        </span>
      </div>

      {password.tags.length > 0 && (
        <div className="flex items-start gap-2">
          <span className="text-sm font-medium text-[var(--card-t-secondary)] w-24">Tags:</span>
          <div className="flex flex-wrap gap-1.5">
            {password.tags.map((tag) => (
              <span
                key={tag}
                className="bg-[var(--card)] text-[var(--muted-foreground)] px-2 py-0.5 
                           rounded-full text-xs font-medium border border-[var(--border)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>

    <div className="flex items-center gap-2 pt-4 border-t border-[var(--border)]">
      <button
        onClick={() => onCopy(password.password)}
        className="flex items-center gap-1.5 px-4 py-2 bg-[var(--copy-bg)]/90 text-white/70 
                   rounded-md hover:bg-[var(--copy-hover)] transition-all text-sm font-medium"
      >
        <Copy className="w-4 h-4" />
      </button>

      <button
        onClick={() => onShare(password)}
        className="flex items-center gap-1.5 px-4 py-2 bg-[var(--share-bg)]/90 text-white/70 
                   rounded-md hover:bg-[var(--share-hover)] transition-all text-sm font-medium"
      >
        <Share2 className="w-4 h-4" />
      </button>



      <button
        onClick={() => onDelete(password._id)}
        className="flex items-center gap-1.5 px-4 py-2 bg-[var(--delete-bg)] text-white/70 
                   rounded-md hover:bg-[var(--delete-hover)] transition-all text-sm font-medium ml-auto"
      >
     { isDelete ? ( <LoaderCircle className="w-4 h-4 animate-spin" />): ( <Trash2 className="w-4 h-4" />)}
      </button>


    </div>
  </div>
);


}
