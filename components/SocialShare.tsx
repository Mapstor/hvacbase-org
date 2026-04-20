'use client';

import { useState } from 'react';
import { Share2, Link, MessageCircle, Send, Bookmark } from 'lucide-react';

interface SocialShareProps {
  title: string;
  url?: string;
  description?: string;
}

export default function SocialShare({ title, url, description }: SocialShareProps) {
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const shareText = description || `Check out this ${title} - free HVAC calculator tool`;

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    reddit: `https://reddit.com/submit?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(title)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText + ' ' + currentUrl)}`
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = currentUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = (platform: string) => {
    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400');
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mt-6">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-800 flex items-center gap-2">
          <Share2 className="w-4 h-4 text-blue-600" />
          Share This Calculator
        </h4>
        <button
          onClick={() => setShowShare(!showShare)}
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          {showShare ? 'Hide' : 'Show'} Options
        </button>
      </div>
      
      <p className="text-sm text-gray-600 mb-3">
        Help others save money on HVAC costs by sharing this free calculator tool.
      </p>

      {showShare && (
        <div className="space-y-4">
          {/* Social Media Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <button
              onClick={() => handleShare('twitter')}
              className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Twitter
            </button>
            
            <button
              onClick={() => handleShare('linkedin')}
              className="flex items-center gap-2 px-3 py-2 bg-blue-700 text-white text-sm font-medium rounded-md hover:bg-blue-800 transition-colors"
            >
              <Send className="w-4 h-4" />
              LinkedIn
            </button>
            
            <button
              onClick={() => handleShare('facebook')}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              <Bookmark className="w-4 h-4" />
              Facebook
            </button>
            
            <button
              onClick={() => handleShare('reddit')}
              className="flex items-center gap-2 px-3 py-2 bg-orange-500 text-white text-sm font-medium rounded-md hover:bg-orange-600 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Reddit
            </button>
            
            <button
              onClick={() => handleShare('email')}
              className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition-colors"
            >
              <Send className="w-4 h-4" />
              Email
            </button>
            
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
            >
              <Link className="w-4 h-4" />
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>

          {/* Link Building Tips */}
          <div className="bg-green-50 rounded-md p-3 border border-green-200">
            <h5 className="text-sm font-medium text-green-800 mb-2">Perfect for:</h5>
            <ul className="text-xs text-green-700 space-y-1">
              <li>• Home improvement blogs and websites</li>
              <li>• HVAC contractor social media</li>
              <li>• Real estate professional resources</li>
              <li>• Energy efficiency forums and communities</li>
              <li>• Personal finance and savings content</li>
            </ul>
          </div>

          {/* SEO Benefits */}
          <div className="bg-blue-50 rounded-md p-3 border border-blue-200">
            <h5 className="text-sm font-medium text-blue-800 mb-2">Sharing Benefits:</h5>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Help homeowners save money on HVAC costs</li>
              <li>• Build authority in home improvement content</li>
              <li>• Drive engagement with practical tools</li>
              <li>• Provide value to your audience</li>
              <li>• Generate natural backlinks and citations</li>
            </ul>
          </div>

          {/* Suggested Content */}
          <div className="bg-gray-50 rounded-md p-3 border border-gray-200">
            <h5 className="text-sm font-medium text-gray-800 mb-2">Suggested Share Text:</h5>
            <p className="text-xs text-gray-600 italic">
              "Just used this {title.toLowerCase()} to plan my HVAC upgrade. 
              Shows exactly how much you can save with different efficiency ratings. 
              Free tool that every homeowner should bookmark! 🏠💰"
            </p>
          </div>
        </div>
      )}
    </div>
  );
}