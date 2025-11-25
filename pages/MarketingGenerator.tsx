import React, { useState } from 'react';
import { Button } from '../components/Button';
import { generateMarketingImage, checkAndRequestApiKey } from '../services/geminiService';
import { Sparkles, Image as ImageIcon, Download, AlertTriangle } from 'lucide-react';

export const MarketingGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);

    // Mandate API Key Selection
    const hasKey = await checkAndRequestApiKey();
    if (!hasKey) {
        setError("API Key is required to use the high-quality image model. Please select a paid key.");
        setIsGenerating(false);
        return;
    }

    const result = await generateMarketingImage(prompt, size);

    if (result.error) {
      setError(result.error);
    } else {
      setGeneratedImage(result.imageUrl);
    }
    setIsGenerating(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Sparkles className="text-teal-500" />
          Marketing Studio
        </h2>
        <p className="text-gray-500">
          Generate high-fidelity marketing visuals for your pharmacy using our advanced AI. 
          Powered by Gemini 3 Pro.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image Description
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., A clean, modern pharmacy counter with vitamins and green plants in soft lighting..."
                className="w-full h-32 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Resolution Quality
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['1K', '2K', '4K'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-2 py-2 text-sm font-medium rounded-md border transition-all ${
                      size === s
                        ? 'bg-teal-50 border-teal-500 text-teal-700 ring-1 ring-teal-500'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-1">Higher resolutions may take longer.</p>
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating || !prompt}
              className="w-full"
            >
              {isGenerating ? 'Dreaming...' : 'Generate Visual'}
            </Button>
            
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3 flex gap-2 items-start">
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-red-700">{error}</p>
                </div>
            )}
          </div>
          
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
            <h4 className="font-semibold text-blue-800 text-sm mb-1">Billing Info</h4>
            <p className="text-xs text-blue-600 leading-relaxed">
              This feature uses the premium Gemini 3 Pro Image model. 
              You will be asked to select a billing-enabled Google Cloud Project API Key. 
              <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="underline font-medium ml-1">Learn more</a>.
            </p>
          </div>
        </div>

        {/* Preview Area */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-full min-h-[400px] flex items-center justify-center p-4 relative overflow-hidden bg-gray-50/50">
            {isGenerating ? (
               <div className="text-center space-y-3">
                 <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto"></div>
                 <p className="text-gray-500 font-medium animate-pulse">Creating masterpiece...</p>
               </div>
            ) : generatedImage ? (
              <div className="relative group w-full h-full flex items-center justify-center">
                <img 
                  src={generatedImage} 
                  alt="Generated marketing material" 
                  className="max-w-full max-h-[600px] rounded-lg shadow-lg object-contain"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                  <a 
                    href={generatedImage} 
                    download={`marketing-${Date.now()}.png`}
                    className="bg-white text-gray-900 px-4 py-2 rounded-full font-medium flex items-center gap-2 hover:scale-105 transition-transform"
                  >
                    <Download className="w-4 h-4" /> Download
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <div className="bg-gray-100 p-4 rounded-full inline-block mb-3">
                    <ImageIcon className="w-8 h-8" />
                </div>
                <p>Enter a prompt to preview your image here.</p>
              </div>
            )}
            
            {/* Resolution Badge */}
            {generatedImage && (
                <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-xs font-mono backdrop-blur-sm">
                    {size} Generated
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};