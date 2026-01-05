'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { WeeklyRoutine, Profile } from '@/types'

export default function DashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'profile' | 'routine'>('profile')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Profile state
  const [profile, setProfile] = useState<Profile | null>(null)
  const [age, setAge] = useState(25)
  const [weight, setWeight] = useState(70)
  const [height, setHeight] = useState(170)
  const [level, setLevel] = useState<'Beginner' | 'Regular' | 'Expert'>('Beginner')
  const [tenure, setTenure] = useState('Just started')
  
  // Routine state
  const [routine, setRoutine] = useState<WeeklyRoutine | null>(null)
  const [modelProvider, setModelProvider] = useState<'Anthropic' | 'OpenAI'>('Anthropic')
  const [apiKey, setApiKey] = useState('')
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profile')
      if (response.status === 401) {
        router.push('/login')
        return
      }
      const data = await response.json()
      if (data.profile) {
        setProfile(data.profile)
        setAge(data.profile.age)
        setWeight(data.profile.weight)
        setHeight(data.profile.height)
        setLevel(data.profile.level)
        setTenure(data.profile.tenure)
      }
    } catch (err) {
      console.error('Error fetching profile:', err)
    }
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ age, weight, height, level, tenure }),
      })

      if (!response.ok) {
        throw new Error('Failed to save profile')
      }

      alert('Profile saved successfully!')
      await fetchProfile()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateRoutine = async () => {
    if (!apiKey) {
      alert('Please enter your API key')
      return
    }

    if (!profile) {
      alert('Please complete your profile first')
      return
    }

    setGenerating(true)
    setError('')

    try {
      const response = await fetch('/api/routine/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age: profile.age,
          weight: profile.weight,
          height: profile.height,
          level: profile.level,
          tenure: profile.tenure,
          model_provider: modelProvider,
          api_key: apiKey,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate routine')
      }

      setRoutine(data.routine)
      alert('Routine generated successfully!')
    } catch (err: any) {
      setError(err.message)
      alert(err.message)
    } finally {
      setGenerating(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-cyan-400">💪 GymBro AI</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg border border-red-500/50 transition"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'profile'
                ? 'bg-cyan-500 text-white shadow-lg'
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
            }`}
          >
            My Profile
          </button>
          <button
            onClick={() => setActiveTab('routine')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'routine'
                ? 'bg-cyan-500 text-white shadow-lg'
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
            }`}
          >
            My Routine
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-gray-100 mb-6">Update Your Stats</h2>
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    min="16"
                    max="100"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    min="30"
                    max="300"
                    step="0.1"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Height (cm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    min="100"
                    max="250"
                    step="0.1"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Experience Level</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as any)}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Regular">Regular</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Training Duration</label>
                  <input
                    type="text"
                    value={tenure}
                    onChange={(e) => setTenure(e.target.value)}
                    placeholder="e.g., '6 months' or 'Just started'"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {loading ? 'Saving...' : 'Save Profile'}
              </button>
            </form>
          </div>
        )}

        {/* Routine Tab */}
        {activeTab === 'routine' && (
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-gray-100 mb-6">Generate Workout Routine</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">AI Provider</label>
                  <select
                    value={modelProvider}
                    onChange={(e) => setModelProvider(e.target.value as any)}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  >
                    <option value="Anthropic">Anthropic (Claude)</option>
                    <option value="OpenAI">OpenAI (GPT-4)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {modelProvider} API Key
                  </label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder={`Enter your ${modelProvider} API key`}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  />
                </div>
              </div>

              <button
                onClick={handleGenerateRoutine}
                disabled={generating || !profile}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {generating ? 'Generating... ⏳' : 'Generate New Routine ✨'}
              </button>

              {!profile && (
                <p className="text-yellow-300 text-sm mt-3">⚠️ Please complete your profile first!</p>
              )}
            </div>

            {/* Routine Display */}
            {routine && (
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700">
                <h3 className="text-2xl font-bold text-cyan-400 mb-6">Your Weekly Routine</h3>
                <div className="space-y-6">
                  {routine.days.map((day, dayIndex) => (
                    <div key={dayIndex} className="border-l-4 border-cyan-500 pl-6">
                      <h4 className="text-xl font-bold text-gray-100 mb-4">{day.day}</h4>
                      <div className="space-y-4">
                        {day.exercises.map((exercise, exIndex) => (
                          <div
                            key={exIndex}
                            className="bg-gray-700/30 rounded-lg p-4 border border-gray-600 hover:border-cyan-500 transition"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="text-lg font-semibold text-cyan-400">{exercise.name}</h5>
                              <a
                                href={exercise.youtube_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm px-3 py-1 bg-red-600 hover:bg-red-700 rounded-full transition"
                              >
                                📺 Watch
                              </a>
                            </div>
                            <p className="text-gray-300 mb-2">{exercise.sets_reps}</p>
                            <details className="text-sm text-gray-400">
                              <summary className="cursor-pointer hover:text-cyan-400 transition">
                                📖 Form Guide
                              </summary>
                              <p className="mt-2 pl-4 border-l-2 border-gray-600">{exercise.form_tip}</p>
                            </details>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
