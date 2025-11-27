import React, { useState, useEffect } from 'react';
import { User, DollarSign, Briefcase, Rocket, Zap, Trophy, ArrowRight, CheckCircle, Mail, Star, Gift, Lock, Unlock, Sparkles } from 'lucide-react';

export default function Home() {
  const [screen, setScreen] = useState('hook');
  const [answers, setAnswers] = useState({});
  const [recommendedLevel, setRecommendedLevel] = useState(null);
  const [email, setEmail] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [unlockedReward, setUnlockedReward] = useState(false);

  // LedgerLift Studio Brand Colors
  const colors = {
    primary: '#1e3a5f',      // Navy Blue (main brand color)
    secondary: '#4a90e2',    // Light Blue (accents)
    accent: '#f4b942',       // Gold (highlights)
    text: '#2C3E50',         // Dark text
    lightText: '#5a5a5a',    // Gray text
    light: '#F8F9FA',        // Off white background
    lightGray: '#e8e8e8',    // Subtle backgrounds
    success: '#81B29A',      // Keep for positive actions
    gold: '#f4b942',         // Gold for premium elements
  };

  const levels = [
    {
      id: 'level1',
      number: 1,
      icon: User,
      title: 'Build Yourself First',
      subtitle: 'Personal Foundations',
      color: '#E8B4B8',
      description: 'Master personal foundations before building your business',
      transformation: 'From stuck and uncertain → Clarity and confidence',
      includes: [
        'Clarify your values & vision',
        'Build sustainable habits',
        'Create your action plan',
        '5 digital resources included'
      ],
      price: '$29',
      status: 'Available Now',
      outcome: 'A clear vision and the personal foundation to build upon',
      forYouIf: [
        'You\'re feeling stuck or ready for a change',
        'You want to get clear on your direction',
        'You need to build better habits and routines',
        'You\'re starting from scratch'
      ],
      quickWin: 'Get instant access to the Values Clarity Workbook'
    },
    {
      id: 'level2',
      number: 2,
      icon: DollarSign,
      title: 'Monthly Close Command Center',
      subtitle: 'Financial Foundation',
      color: '#81B29A',
      description: 'Build your financial operations foundation',
      transformation: 'From 12-day chaos → 5-day system',
      includes: [
        'Master month-end close process',
        'Reduce close time by 50%+',
        'Gain financial confidence',
        'Complete close system included'
      ],
      price: '$29',
      status: 'Available Now',
      outcome: 'Stress-free month-end close and financial clarity',
      forYouIf: [
        'Month-end close is stressful and chaotic',
        'You spend 10+ days closing your books',
        'You need financial systems in place',
        'You\'re ready to professionalize your finances'
      ],
      quickWin: 'Get the 5-Day Close Checklist immediately'
    },
    {
      id: 'level3',
      number: 3,
      icon: Briefcase,
      title: 'Build Your Business Systems',
      subtitle: 'Operations & Systems',
      color: '#B8D4E8',
      description: 'Systemize your operations for scalable growth',
      transformation: 'From scattered → Systematized',
      includes: [
        'Automate repetitive tasks',
        'Document key processes',
        'Scale without chaos',
        'Business operations framework'
      ],
      price: 'Coming Soon',
      status: 'Q1 2026',
      outcome: 'Documented, repeatable systems that run without you',
      forYouIf: [
        'You\'re too reliant on your own memory',
        'Everything breaks when you\'re away',
        'You want to scale beyond yourself',
        'You need documented processes'
      ],
      quickWin: 'Join the waitlist for early access + bonuses'
    },
    {
      id: 'level4',
      number: 4,
      icon: Rocket,
      title: 'Build Your Growth Strategy',
      subtitle: 'Marketing & Scale',
      color: '#B8A9D4',
      description: 'Scale your impact with strategic growth systems',
      transformation: 'From stagnant → Growing consistently',
      includes: [
        'Marketing systems that work',
        'Customer acquisition strategies',
        'Revenue growth frameworks',
        'Scaling playbook'
      ],
      price: 'Coming Soon',
      status: 'Q2 2026',
      outcome: 'Predictable, sustainable business growth',
      forYouIf: [
        'You\'ve hit a revenue plateau',
        'Marketing feels random and inconsistent',
        'You want predictable customer acquisition',
        'You\'re ready to scale strategically'
      ],
      quickWin: 'Get notified first when this launches'
    },
    {
      id: 'level5',
      number: 5,
      icon: Zap,
      title: 'Build Your Scale & Automation',
      subtitle: 'Mastery & Freedom',
      color: '#F4C95D',
      description: 'Automate and multiply your impact',
      transformation: 'From working IN it → Working ON it',
      includes: [
        'Full business automation',
        'Team building & delegation',
        'Exit-ready systems',
        'Optimization frameworks'
      ],
      price: 'Coming Soon',
      status: 'Q3 2026',
      outcome: 'A business that runs and grows without you',
      forYouIf: [
        'You want to work ON not IN your business',
        'You\'re ready to build a team',
        'You want to create enterprise value',
        'You\'re planning for exit or legacy'
      ],
      quickWin: 'Reserve your spot for the ultimate level'
    }
  ];

  const questions = [
    {
      id: 'foundation',
      question: 'How would you describe your current personal foundation?',
      subtitle: 'Be honest - this is just for you',
      options: [
        { text: '😓 I feel stuck and unclear about my direction', emoji: '😓', points: { level1: 5 } },
        { text: '🤔 I have some clarity but need to strengthen my habits', emoji: '🤔', points: { level1: 3, level2: 1 } },
        { text: '😊 I have solid personal foundations', emoji: '😊', points: { level2: 3, level3: 2 } },
        { text: '🎯 I\'m very clear and disciplined in my personal life', emoji: '🎯', points: { level3: 3, level4: 2 } }
      ]
    },
    {
      id: 'business_stage',
      question: 'What stage is your business in?',
      subtitle: 'Where are you RIGHT NOW?',
      options: [
        { text: '💡 I haven\'t started yet / Just an idea', emoji: '💡', points: { level1: 5 } },
        { text: '🌱 Early stage with revenue but no systems', emoji: '🌱', points: { level2: 5 } },
        { text: '🔥 Established but chaotic and hard to manage', emoji: '🔥', points: { level3: 5 } },
        { text: '📈 Growing but hit a plateau', emoji: '📈', points: { level4: 5 } },
        { text: '🚀 Successful but I want more freedom', emoji: '🚀', points: { level5: 5 } }
      ]
    },
    {
      id: 'financial_chaos',
      question: 'How do you feel about your financial processes?',
      subtitle: 'Month-end close vibes check',
      options: [
        { text: '😱 What financial processes? It\'s chaos', emoji: '😱', points: { level2: 5 } },
        { text: '😰 I have basic tracking but month-end is stressful', emoji: '😰', points: { level2: 4 } },
        { text: '😌 My finances are organized and under control', emoji: '😌', points: { level3: 3, level4: 2 } },
        { text: '🎓 I have sophisticated financial systems', emoji: '🎓', points: { level4: 2, level5: 3 } }
      ]
    },
    {
      id: 'biggest_challenge',
      question: 'What\'s keeping you up at night?',
      subtitle: 'Your biggest challenge RIGHT NOW',
      options: [
        { text: '🧭 Getting clarity and direction', emoji: '🧭', points: { level1: 5 } },
        { text: '💸 Building financial confidence and systems', emoji: '💸', points: { level2: 5 } },
        { text: '⚙️ Creating systems so I\'m not doing everything', emoji: '⚙️', points: { level3: 5 } },
        { text: '📊 Growing revenue consistently', emoji: '📊', points: { level4: 5 } },
        { text: '🏖️ Scaling without sacrificing my life', emoji: '🏖️', points: { level5: 5 } }
      ]
    },
    {
      id: 'time_focus',
      question: 'Where do you spend most of your time?',
      subtitle: 'Last question - you\'re almost there!',
      options: [
        { text: '🤷 Trying to figure out what to do next', emoji: '🤷', points: { level1: 4 } },
        { text: '📋 Managing finances and daily operations', emoji: '📋', points: { level2: 4 } },
        { text: '🔥 Firefighting and doing everything myself', emoji: '🔥', points: { level3: 4 } },
        { text: '💡 Working ON strategy and growth', emoji: '💡', points: { level4: 3, level5: 2 } },
        { text: '👥 Leading a team and optimizing systems', emoji: '👥', points: { level5: 4 } }
      ]
    }
  ];

  const calculateRecommendation = () => {
    const scores = { level1: 0, level2: 0, level3: 0, level4: 0, level5: 0 };
    
    Object.values(answers).forEach(answer => {
      Object.entries(answer.points).forEach(([level, points]) => {
        scores[level] = (scores[level] || 0) + points;
      });
    });

    const maxScore = Math.max(...Object.values(scores));
    const recommended = Object.keys(scores).find(level => scores[level] === maxScore);
    
    const levelNumber = parseInt(recommended.replace('level', ''));
    setRecommendedLevel(levels[levelNumber - 1]);
    setScreen('email-capture');
  };

  // Hook Screen - Attention grabber
  const HookScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 relative overflow-hidden" style={{ backgroundColor: colors.light }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full" style={{ backgroundColor: colors.primary }} />
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full" style={{ backgroundColor: colors.secondary }} />
        <div className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full" style={{ backgroundColor: colors.success }} />
      </div>

      <div className="max-w-3xl text-center space-y-6 relative z-10">
        <div className="inline-block animate-bounce">
          <Sparkles size={64} style={{ color: colors.gold }} />
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight" style={{ color: colors.text }}>
          Feeling Stuck?<br />
          <span style={{ color: colors.primary }}>Ready for Change?</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-6" style={{ color: colors.text, opacity: 0.8 }}>
          Take our <span className="font-bold" style={{ color: colors.primary }}>FREE 5-Question Assessment</span>
        </p>
        
        <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
          <div className="p-4 rounded-xl bg-white shadow-md">
            <Star className="mx-auto mb-2" size={32} style={{ color: colors.gold }} />
            <p className="font-semibold text-sm" style={{ color: colors.text }}>Find Your Level</p>
          </div>
          <div className="p-4 rounded-xl bg-white shadow-md">
            <Gift className="mx-auto mb-2" size={32} style={{ color: colors.secondary }} />
            <p className="font-semibold text-sm" style={{ color: colors.text }}>Get Free Resources</p>
          </div>
          <div className="p-4 rounded-xl bg-white shadow-md">
            <Trophy className="mx-auto mb-2" size={32} style={{ color: colors.success }} />
            <p className="font-semibold text-sm" style={{ color: colors.text }}>Start Your Journey</p>
          </div>
        </div>

        <div className="p-6 rounded-2xl mb-8 max-w-xl mx-auto" style={{ backgroundColor: colors.accent }}>
          <p className="text-lg font-semibold mb-3" style={{ color: colors.text }}>
            🎁 Complete the quiz and unlock:
          </p>
          <ul className="text-left space-y-2 inline-block">
            <li className="flex items-center gap-2">
              <CheckCircle size={20} style={{ color: colors.success }} />
              <span style={{ color: colors.text }}>Your personalized transformation roadmap</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={20} style={{ color: colors.success }} />
              <span style={{ color: colors.text }}>Free downloadable starter guide</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={20} style={{ color: colors.success }} />
              <span style={{ color: colors.text }}>Exclusive discount on your recommended level</span>
            </li>
          </ul>
        </div>

        <button
          onClick={() => setScreen('assessment')}
          className="px-12 py-5 rounded-full text-white text-xl font-bold transition-all hover:scale-110 shadow-2xl animate-pulse"
          style={{ backgroundColor: colors.primary }}
        >
          Take the FREE Quiz Now →
        </button>

        <p className="text-sm mt-4" style={{ color: colors.text, opacity: 0.6 }}>
          ⏱️ Takes less than 2 minutes • No credit card required
        </p>
      </div>
    </div>
  );

  // Assessment Screen with gamification
  const AssessmentScreen = () => {
    const currentQuestionIndex = Object.keys(answers).length;
    const currentQuestion = questions[currentQuestionIndex];
    const progress = (currentQuestionIndex / questions.length) * 100;

    if (currentQuestionIndex >= questions.length) {
      calculateRecommendation();
      return null;
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8" style={{ backgroundColor: colors.light }}>
        <div className="max-w-3xl w-full">
          {/* Progress with celebration */}
          <div className="mb-8">
            <div className="flex justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles size={20} style={{ color: colors.gold }} />
                <span className="text-sm font-bold" style={{ color: colors.text }}>
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
              </div>
              <span className="text-sm font-bold" style={{ color: colors.primary }}>
                {Math.round(progress)}% Complete 🎯
              </span>
            </div>
            <div className="relative w-full h-3 rounded-full overflow-hidden" style={{ backgroundColor: '#E0E0E0' }}>
              <div 
                className="h-3 rounded-full transition-all duration-500 relative overflow-hidden"
                style={{ backgroundColor: colors.primary, width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer" />
              </div>
            </div>
          </div>

          {/* Question Card with animation */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 transform transition-all">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: colors.text }}>
                {currentQuestion.question}
              </h2>
              <p className="text-base md:text-lg" style={{ color: colors.text, opacity: 0.6 }}>
                {currentQuestion.subtitle}
              </p>
            </div>

            <div className="space-y-3 md:space-y-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setAnswers({
                      ...answers,
                      [currentQuestion.id]: option
                    });
                  }}
                  className="w-full p-4 md:p-6 rounded-2xl text-left transition-all hover:scale-102 hover:shadow-xl border-3 group"
                  style={{ 
                    backgroundColor: 'white',
                    borderColor: colors.primary,
                    borderWidth: '2px'
                  }}
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="text-2xl md:text-3xl flex-shrink-0">
                      {option.emoji}
                    </div>
                    <span className="text-base md:text-lg font-semibold group-hover:scale-105 transition-transform" style={{ color: colors.text }}>
                      {option.text}
                    </span>
                    <ArrowRight 
                      className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" 
                      size={24} 
                      style={{ color: colors.primary }} 
                    />
                  </div>
                </button>
              ))}
            </div>

            {currentQuestionIndex > 0 && (
              <button
                onClick={() => {
                  const newAnswers = { ...answers };
                  const previousQuestion = questions[currentQuestionIndex - 1];
                  delete newAnswers[previousQuestion.id];
                  setAnswers(newAnswers);
                }}
                className="mt-6 px-6 py-3 rounded-full font-semibold transition-all hover:scale-105"
                style={{ 
                  backgroundColor: 'white',
                  color: colors.text,
                  border: `2px solid ${colors.primary}`
                }}
              >
                ← Back
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Email Capture Screen - Lead Magnet
  const EmailCaptureScreen = () => {
    if (!recommendedLevel) return null;
    
    const Icon = recommendedLevel.icon;

    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8" style={{ backgroundColor: colors.light }}>
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 text-center">
            <div className="mb-6">
              <div className="inline-block p-6 rounded-full mb-4" style={{ backgroundColor: colors.gold, opacity: 0.2 }}>
                <Lock size={56} style={{ color: colors.gold }} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.text }}>
                🎉 Results Ready!
              </h2>
              <p className="text-lg md:text-xl mb-2" style={{ color: colors.text }}>
                We've identified your perfect starting point
              </p>
              <p className="text-base md:text-lg font-semibold" style={{ color: colors.primary }}>
                You're ready for: <span style={{ color: recommendedLevel.color }}>Level {recommendedLevel.number}</span>
              </p>
            </div>

            <div className="p-6 rounded-2xl mb-6" style={{ backgroundColor: colors.accent }}>
              <Gift size={48} style={{ color: colors.gold }} className="mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3" style={{ color: colors.text }}>
                Unlock Your Free Transformation Kit
              </h3>
              <ul className="text-left space-y-2 max-w-md mx-auto">
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} style={{ color: colors.success }} className="flex-shrink-0 mt-1" />
                  <span style={{ color: colors.text }}>Your personalized Level {recommendedLevel.number} roadmap</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} style={{ color: colors.success }} className="flex-shrink-0 mt-1" />
                  <span style={{ color: colors.text }}>{recommendedLevel.quickWin}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} style={{ color: colors.success }} className="flex-shrink-0 mt-1" />
                  <span style={{ color: colors.text }}>Exclusive 20% discount code for Level {recommendedLevel.number}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} style={{ color: colors.success }} className="flex-shrink-0 mt-1" />
                  <span style={{ color: colors.text }}>Complete 5-level transformation roadmap</span>
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 rounded-full border-2 text-lg mb-4 focus:outline-none focus:ring-4"
                style={{ 
                  borderColor: colors.primary,
                  color: colors.text
                }}
              />
              <button
                onClick={() => {
                  if (email) {
                    setUnlockedReward(true);
                    setShowConfetti(true);
                    setTimeout(() => setScreen('recommendation'), 500);
                  }
                }}
                disabled={!email}
                className="w-full px-8 py-5 rounded-full text-white text-xl font-bold transition-all hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: colors.success }}
              >
                🎁 Unlock My Results + Free Kit
              </button>
            </div>

            <p className="text-xs" style={{ color: colors.text, opacity: 0.6 }}>
              🔒 Your email is safe. We respect your privacy and never spam.
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Recommendation Screen with rewards
  const RecommendationScreen = () => {
    if (!recommendedLevel) return null;
    
    const Icon = recommendedLevel.icon;

    useEffect(() => {
      if (showConfetti) {
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }, [showConfetti]);

    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 relative" style={{ backgroundColor: colors.light }}>
        {/* Confetti effect */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none z-50">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-fall"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-${Math.random() * 20}%`,
                  animation: `fall ${2 + Math.random() * 3}s linear`,
                  fontSize: '24px',
                }}
              >
                {['🎉', '✨', '🎊', '⭐', '💫'][Math.floor(Math.random() * 5)]}
              </div>
            ))}
          </div>
        )}

        <div className="max-w-5xl w-full">
          {/* Success Banner */}
          <div className="text-center mb-8 bg-white rounded-3xl shadow-xl p-6 md:p-8">
            <div className="flex justify-center mb-4">
              <Unlock size={64} style={{ color: colors.success }} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: colors.text }}>
              🎉 Welcome to Your Transformation!
            </h1>
            <p className="text-lg md:text-xl" style={{ color: colors.text, opacity: 0.7 }}>
              Check <span className="font-bold" style={{ color: colors.primary }}>{email}</span> for your free resources
            </p>
          </div>

          {/* Main Recommendation */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 mb-8">
            <div className="text-center mb-8">
              <div className="inline-block p-6 rounded-full mb-4 relative" style={{ backgroundColor: recommendedLevel.color, opacity: 0.2 }}>
                <Icon size={72} style={{ color: recommendedLevel.color }} />
                <div className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-lg">
                  <Star size={24} style={{ color: colors.gold }} />
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: colors.text }}>
                Your Perfect Starting Point
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: recommendedLevel.color }}>
                Level {recommendedLevel.number}: {recommendedLevel.title}
              </h3>
              <p className="text-xl" style={{ color: colors.text, opacity: 0.7 }}>
                {recommendedLevel.subtitle}
              </p>
            </div>

            {/* Transformation Promise */}
            <div className="p-6 rounded-2xl mb-8" style={{ backgroundColor: recommendedLevel.color, opacity: 0.1 }}>
              <h4 className="font-bold text-xl mb-3 text-center" style={{ color: colors.text }}>
                Your Transformation Journey
              </h4>
              <p className="text-2xl font-bold text-center" style={{ color: recommendedLevel.color }}>
                {recommendedLevel.transformation}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* What's Included */}
              <div>
                <h4 className="font-bold text-xl mb-4 flex items-center gap-2" style={{ color: colors.text }}>
                  <Gift size={24} style={{ color: recommendedLevel.color }} />
                  What's Included
                </h4>
                <ul className="space-y-3">
                  {recommendedLevel.includes.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle size={20} style={{ color: colors.success }} className="flex-shrink-0 mt-1" />
                      <span style={{ color: colors.text }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Perfect For You */}
              <div>
                <h4 className="font-bold text-xl mb-4 flex items-center gap-2" style={{ color: colors.text }}>
                  <User size={24} style={{ color: recommendedLevel.color }} />
                  Perfect For You If
                </h4>
                <ul className="space-y-3">
                  {recommendedLevel.forYouIf.slice(0, 3).map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Star size={20} style={{ color: colors.gold }} className="flex-shrink-0 mt-1" />
                      <span style={{ color: colors.text }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Special Offer */}
            {recommendedLevel.status === 'Available Now' && (
              <div className="p-6 rounded-2xl border-4 mb-6" style={{ borderColor: colors.gold, backgroundColor: colors.accent }}>
                <div className="text-center">
                  <Sparkles size={32} style={{ color: colors.gold }} className="mx-auto mb-3" />
                  <h4 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>
                    🎁 Special Quiz Taker Discount
                  </h4>
                  <p className="text-lg mb-4" style={{ color: colors.text }}>
                    Use code <span className="font-mono font-bold px-3 py-1 rounded" style={{ backgroundColor: 'white', color: colors.primary }}>LEVEL{recommendedLevel.number}</span> for 20% OFF
                  </p>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <span className="text-3xl font-bold line-through opacity-50" style={{ color: colors.text }}>
                      $29
                    </span>
                    <span className="text-5xl font-bold" style={{ color: colors.success }}>
                      $23
                    </span>
                  </div>
                  <button
                    className="w-full md:w-auto px-10 py-5 rounded-full text-white text-xl font-bold transition-all hover:scale-110 shadow-2xl"
                    style={{ backgroundColor: recommendedLevel.color }}
                   < 
                    Get Started Now - Save 20%
                  </button>
                  <p className="text-sm mt-3" style={{ color: colors.text, opacity: 0.6 }}>
                    ⏰ Discount expires in 24 hours
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Complete Journey Map */}
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: colors.text }}>
              Your Complete 5-Level Journey
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              {levels.map((level) => {
                const LevelIcon = level.icon;
                const isRecommended = level.id === recommendedLevel.id;
                return (
                  <div
                    key={level.id}
                    className="p-4 rounded-xl text-center transition-all relative"
                    style={{ 
                      backgroundColor: isRecommended ? level.color : colors.light,
                      opacity: isRecommended ? 1 : 0.6,
                      border: isRecommended ? `3px solid ${level.color}` : 'none',
                      transform: isRecommended ? 'scale(1.05)' : 'scale(1)'
                    }}
                  >
                    {isRecommended && (
                      <div className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-lg">
                        <Star size={20} style={{ color: colors.gold }} />
                      </div>
                    )}
                    <LevelIcon size={32} style={{ color: level.color }} className="mx-auto mb-2" />
                    <p className="font-bold text-xs md:text-sm mb-1" style={{ color: colors.text }}>
                      Level {level.number}
                    </p>
                    {isRecommended && (
                      <p className="text-xs font-bold" style={{ color: level.color }}>
                        START HERE
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="text-center">
              <Trophy size={48} style={{ color: colors.success }} className="mx-auto mb-2" />
              <p className="font-bold text-lg" style={{ color: colors.text }}>
                Complete Transformation
              </p>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-8 text-center">
            <p className="text-sm mb-4" style={{ color: colors.text, opacity: 0.7 }}>
              ⭐⭐⭐⭐⭐ Rated 5/5 by 500+ transforming entrepreneurs
            </p>
            <button
              onClick={() => {
                setAnswers({});
                setRecommendedLevel(null);
                setEmail('');
                setScreen('hook');
              }}
              className="px-6 py-3 rounded-full font-semibold transition-all hover:scale-105"
              style={{ 
                backgroundColor: 'white',
                color: colors.text,
                border: `2px solid ${colors.primary}`
              }}
            >
              Take Quiz Again
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans">
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-fall {
          animation: fall 3s linear;
        }
      `}</style>
      
      {screen === 'hook' && <HookScreen />}
      {screen === 'assessment' && <AssessmentScreen />}
      {screen === 'email-capture' && <EmailCaptureScreen />}
      {screen === 'recommendation' && <RecommendationScreen />}
    </div>
  );
}
