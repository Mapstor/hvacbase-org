import { AlertTriangle, Lightbulb, Star, Info, Zap, BookOpen } from 'lucide-react';
import { ReactNode } from 'react';

type CalloutType = 'tip' | 'warning' | 'takeaway' | 'info' | 'example' | 'important';

interface CalloutProps {
  type: CalloutType;
  title?: string;
  children: ReactNode;
}

const config: Record<CalloutType, { icon: typeof Star; bg: string; border: string; titleColor: string; defaultTitle: string }> = {
  tip: {
    icon: Lightbulb,
    bg: 'bg-green-50',
    border: 'border-green-500',
    titleColor: 'text-green-800',
    defaultTitle: 'Pro Tip',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-red-50',
    border: 'border-red-500',
    titleColor: 'text-red-800',
    defaultTitle: 'Warning',
  },
  takeaway: {
    icon: Star,
    bg: 'bg-amber-50',
    border: 'border-amber-400',
    titleColor: 'text-amber-800',
    defaultTitle: 'Key Takeaway',
  },
  info: {
    icon: Info,
    bg: 'bg-blue-50',
    border: 'border-blue-400',
    titleColor: 'text-blue-800',
    defaultTitle: 'Good to Know',
  },
  example: {
    icon: BookOpen,
    bg: 'bg-purple-50',
    border: 'border-purple-400',
    titleColor: 'text-purple-800',
    defaultTitle: 'Real-World Example',
  },
  important: {
    icon: Zap,
    bg: 'bg-orange-50',
    border: 'border-orange-500',
    titleColor: 'text-orange-800',
    defaultTitle: 'Important',
  },
};

export default function Callout({ type, title, children }: CalloutProps) {
  const c = config[type];
  const Icon = c.icon;

  return (
    <div className={`${c.bg} border-l-4 ${c.border} rounded-r-lg px-5 py-4 my-6`}>
      <div className={`flex items-center gap-2 font-semibold ${c.titleColor} mb-2`}>
        <Icon size={18} />
        {title || c.defaultTitle}
      </div>
      <div className="text-gray-700 leading-7 text-[15px]">{children}</div>
    </div>
  );
}
