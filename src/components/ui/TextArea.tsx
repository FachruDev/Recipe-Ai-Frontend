import { TextareaHTMLAttributes, forwardRef, KeyboardEvent } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  onEnterPress?: () => void;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, fullWidth = false, className = '', onEnterPress, onKeyDown, ...props }, ref) => {
    const widthClass = fullWidth ? 'w-full' : '';
    const errorClass = error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-teal-500';

    // Handle key presses
    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      // If Enter is pressed without Shift, prevent default and call onEnterPress
      if (e.key === 'Enter' && !e.shiftKey && onEnterPress) {
        e.preventDefault();
        onEnterPress();
      }
      
      // Call the original onKeyDown if provided
      if (onKeyDown) {
        onKeyDown(e);
      }
    };

    return (
      <div className={widthClass}>
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`px-3 py-2 bg-white dark:bg-zinc-900 border ${errorClass} rounded-md shadow-sm focus:outline-none focus:ring-2 ${widthClass} ${className}`}
          rows={4}
          onKeyDown={handleKeyDown}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        
        {onEnterPress && (
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Press <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-zinc-800 rounded border border-gray-300 dark:border-gray-700 font-mono">Enter</kbd> to send, 
            <kbd className="ml-1 px-1 py-0.5 bg-gray-100 dark:bg-zinc-800 rounded border border-gray-300 dark:border-gray-700 font-mono">Shift+Enter</kbd> for new line
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';