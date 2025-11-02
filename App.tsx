
import React, { useState, useCallback } from 'react';
import { generateGameTitleImage } from './services/geminiService';
import { RobotIcon } from './components/icons/RobotIcon';
import { Spinner } from './components/Spinner';

const App: React.FC = () => {
  const defaultPrompt = `The video game title 'Beyond Singularity'. The text should be stylized to look like it's constructed from intricate robotic parts, glowing wires, complex mechanical gears, and interwoven cables. The aesthetic should be high-tech, slightly gritty, with a futuristic sci-fi feel. Cinematic lighting, metallic textures, and a dark, atmospheric background.`;
  
  const [prompt, setPrompt] = useState<string>(defaultPrompt);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt || isLoading) return;

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageUrl = await generateGameTitleImage(prompt);
      setGeneratedImage(imageUrl);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to generate image. ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading]);

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-2">
            <RobotIcon className="w-10 h-10 text-cyan-400" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Beyond Singularity
            </h1>
          </div>
          <p className="text-lg text-slate-400">Game Title Art Generator</p>
        </header>

        <main className="bg-slate-800/50 rounded-xl shadow-2xl p-6 border border-slate-700">
          <div className="flex flex-col gap-6">
            <div>
              <label htmlFor="prompt" className="block text-sm font-medium text-slate-300 mb-2">
                Image Prompt
              </label>
              <textarea
                id="prompt"
                rows={5}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 placeholder-slate-500"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the game title art you want to create..."
                disabled={isLoading}
              />
            </div>
            
            <button
              onClick={handleGenerate}
              disabled={isLoading || !prompt}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <>
                  <Spinner />
                  Generating...
                </>
              ) : (
                'Generate Title Art'
              )}
            </button>
          </div>

          <div className="mt-8">
            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg text-center">
                <p className="font-semibold">Error</p>
                <p>{error}</p>
              </div>
            )}

            <div className="w-full aspect-video bg-slate-900/70 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-700 mt-4 overflow-hidden">
              {isLoading && (
                <div className="text-center text-slate-400">
                  <Spinner className="w-12 h-12" />
                  <p className="mt-4">Conjuring pixels from the singularity...</p>
                </div>
              )}
              {generatedImage && !isLoading && (
                 <img
                    src={generatedImage}
                    alt="Generated game title art"
                    className="object-contain w-full h-full"
                  />
              )}
              {!isLoading && !generatedImage && !error && (
                <div className="text-center text-slate-500 p-4">
                  <p>Your generated image will appear here.</p>
                  <p className="text-sm">Click "Generate Title Art" to begin.</p>
                </div>
              )}
            </div>
          </div>
        </main>
        
        <footer className="text-center mt-8 text-slate-500 text-sm">
            <p>Powered by Gemini API. Art for "Beyond Singularity".</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
