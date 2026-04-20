'use client';

import { useState } from 'react';
import { Copy, Code, ExternalLink, Check } from 'lucide-react';

interface EmbedCodeProps {
  calculatorType: string;
  title: string;
}

export default function EmbedCode({ calculatorType, title }: EmbedCodeProps) {
  const [copied, setCopied] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);

  const embedCode = `<iframe
  src="https://www.hvacbase.org/embed/${calculatorType}"
  width="100%"
  height="600"
  frameborder="0"
  title="${title} - HVAC Base Calculator"
  style="border: 1px solid #e5e7eb; border-radius: 8px;">
</iframe>

<!-- Powered by HVAC Base -->
<p style="text-align: center; margin-top: 8px; font-size: 12px; color: #6b7280;">
  <a href="https://www.hvacbase.org/${calculatorType.replace('-', '/')}" 
     target="_blank" 
     rel="noopener noreferrer"
     style="color: #2563eb; text-decoration: none;">
    ${title} Calculator by HVAC Base
  </a>
</p>`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = embedCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mt-6">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-800 flex items-center gap-2">
          <Code className="w-4 h-4 text-blue-600" />
          Embed This Calculator
        </h4>
        <button
          onClick={() => setShowEmbed(!showEmbed)}
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          {showEmbed ? 'Hide' : 'Show'} Code
        </button>
      </div>
      
      <p className="text-sm text-gray-600 mb-3">
        Add this calculator to your website, blog, or social media. Free to use with attribution.
      </p>

      {showEmbed && (
        <div className="space-y-3">
          <div className="bg-white rounded-md border border-gray-200 p-3">
            <pre className="text-xs text-gray-800 overflow-x-auto whitespace-pre-wrap">
              {embedCode}
            </pre>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Code
                </>
              )}
            </button>
            
            <a
              href={`https://www.hvacbase.org/${calculatorType.replace('-', '/')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View Full Page
            </a>
          </div>

          <div className="bg-blue-50 rounded-md p-3 border border-blue-200">
            <h5 className="text-sm font-medium text-blue-800 mb-2">Embed Guidelines:</h5>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Free to use on any website or blog</li>
              <li>• Please keep the attribution link</li>
              <li>• Responsive design works on all devices</li>
              <li>• Updates automatically with our latest features</li>
              <li>• No registration required</li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-md p-3 border border-green-200">
            <h5 className="text-sm font-medium text-green-800 mb-2">Benefits for Your Site:</h5>
            <ul className="text-xs text-green-700 space-y-1">
              <li>• Increase user engagement and time on site</li>
              <li>• Provide valuable HVAC calculations to visitors</li>
              <li>• Professional, mobile-friendly calculator design</li>
              <li>• Build authority in home improvement content</li>
              <li>• No maintenance required - always up to date</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}