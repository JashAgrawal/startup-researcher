import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, ArrowRight } from 'lucide-react';
import { generateStartupInsights } from '../utils/gemini';

export default function IdeaInput() {
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const insights = await generateStartupInsights(idea);
      // Store insights in localStorage or state management
      localStorage.setItem('idea', idea);
      localStorage.setItem('startupInsights', JSON.stringify(insights));
      navigate('/dashboard');
    } catch (error) {
      console.error('Error generating insights:', error);
      // Handle error appropriately
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb className="w-8 h-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900">Share Your Startup Idea</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="idea" className="block text-sm font-medium text-gray-700 mb-2">
              Describe your business idea in detail
            </label>
            <textarea
              id="idea"
              rows={6}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-4"
              placeholder="Tell us about your startup idea, target market, and what problem you're solving..."
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading || !idea.trim()}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              'Analyzing your idea...'
            ) : (
              <>
                Generate Startup Plan
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}