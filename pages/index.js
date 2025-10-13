import { useState } from 'react';
import { useRouter } from 'next/router';

export default function JourneyMapQuiz() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);

  const questions = [
    {
      id: 1,
      question: "What's your biggest challenge right now?",
      options: [
        { text: "😔 I feel stuck and don't know where to start", value: 1, emoji: "😔" },
        { text: "📊 My finances are a mess and I need structure", value: 2, emoji: "📊" },
        { text: "🚀 I'm ready to scale but lack the systems", value: 3, emoji: "🚀" },
        { text: "⚡ I want to optimize what I've already built", value: 4, emoji: "⚡" }
      ]
    },
    {
      id: 2,
      question: "How do you currently track your business finances?",
      options: [
        { text: "🤷 What tracking? Everything's in my head", value: 1, emoji: "🤷" },
        { text: "📝 Spreadsheets and receipts everywhere", value: 2, emoji: "📝" },
        { text: "💼 Basic system but needs improvement", value: 3, emoji: "💼" },
        { text: "✅ Solid system, just want to level up", value: 4, emoji: "✅" }
      ]
    },
    {
      id: 3,
      question: "What's your monthly revenue goal?",
      options: [
        { text: "💭 Still dreaming of my first sale", value: 1, emoji: "💭" },
        { text: "💵 $1K-$5K per month", value: 2, emoji: "💵" },
        { text: "💰 $5K-$20K per month", value: 3, emoji: "💰" },
        { text: "🏆 $20K+ per month", value: 4, emoji: "🏆" }
      ]
    },
    {
      id: 4,
      question: "How much time do you spend on admin work?",
      options: [
        { text: "⏰ Too much! It's overwhelming", value: 1, emoji: "⏰" },
        { text: "📅 Several hours per week", value: 2, emoji: "📅" },
        { text: "✂️ Moderate, but could be better", value: 3, emoji: "✂️" },
        { text: "⚙️ Pretty efficient already", value: 4, emoji: "⚙️" }
      ]
    },
    {
      id: 5,
      question: "What do you need most right now?",
      options: [
        { text: "🌱 Personal development and mindset", value: 1, emoji: "🌱" },
        { text: "📋 Systems and templates to get organized", value: 2, emoji: "📋" },
        { text: "📈 Growth strategies and scaling plans", value: 3, emoji: "📈" },
        { text: "🎯 Advanced optimization tools", value: 4, emoji: "🎯" }
      ]
    }
  ];

  const levels = {
    1: {
      title: "👤 Level 1: Build Yourself First",
      description: "Focus on personal development and foundational mindset work before diving into business systems.",
      nextSteps: [
        "Start with our Personal Development Workbook",
        "Work on goal-setting and vision clarity",
        "Build sustainable habits and routines",
        "Develop emotional intelligence and self-awareness"
      ],
      products: [
        {
          name: "Phase 1 Core Workbook",
          price: "$17",
          description: "Complete personal development foundation"
        }
      ]
    },
    2: {
      title: "💰 Level 2: Monthly Close Mastery",
      description: "Get your financial house in order with systematic monthly close processes.",
      nextSteps: [
        "Implement monthly close checklist",
        "Set up executive financial summaries",
        "Create a monthly review routine",
        "Build financial awareness habits"
      ],
      products: [
        {
          name: "Monthly Close Command Center",
          price: "$29",
          description: "Complete monthly financial close system"
        }
      ]
    },
    3: {
      title: "💼 Level 3: Business Systems",
      description: "Scale your operations with robust business systems and processes.",
      nextSteps: [
        "Implement business operating systems",
        "Create SOPs for key processes",
        "Build team management frameworks",
        "Develop client delivery systems"
      ],
      products: [
        {
          name: "Business Systems Bundle",
          price: "$49",
          description: "Complete operational framework (Coming Soon)"
        }
      ]
    },
    4: {
      title: "🚀 Level 4: Scale & Automate",
      description: "Leverage technology and delegation to scale efficiently.",
      nextSteps: [
        "Automate repetitive tasks",
        "Build delegation frameworks",
        "Implement advanced analytics",
        "Create scalable revenue systems"
      ],
      products: [
        {
          name: "Scale & Automation Toolkit",
          price: "$79",
          description: "Advanced scaling systems (Coming Soon)"
        }
      ]
    },
    5: {
      title: "⚡ Level 5: Optimize & Master",
      description: "Fine-tune your operations for peak performance and maximum impact.",
      nextSteps: [
        "Advanced performance metrics",
        "Strategic planning frameworks",
        "Innovation and iteration systems",
        "Mastery-level optimization"
      ],
      products: [
        {
          name: "Optimization Mastery Suite",
          price: "$99",
          description: "Elite optimization tools (Coming Soon)"
        }
      ]
    }
  };

  const calculateLevel = () => {
    const total = Object.values(answers).reduce((sum, val) => sum + val, 0);
    const average = total / Object.keys(answers).length;
    
    if (average <= 1.5) return 1;
    if (average <= 2.5) return 2;
    if (average <= 3.5) return 3;
    if (average <= 4.5) return 4;
    return 5;
  };

  const handleAnswer = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
    
    if (currentPage < questions.length) {
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
      }, 300);
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const level = calculateLevel();
    setResult(levels[level]);
    setCurrentPage(questions.length + 1);
  };

  const resetQuiz = () => {
    setCurrentPage(0);
    setAnswers({});
    setEmail('');
    setResult(null);
  };

  // Landing Page
  if (currentPage === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">✨</div>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
              Feeling Stuck?<br />Ready for Change?
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Take our FREE 5-Question Assessment
            </p>
          </div>

          <div className="space-y-3 mb-8">
            <div className="flex items-start gap-3">
              <span className="text-gold-500 text-xl flex-shrink-0">✓</span>
              <span className="text-gray-700">Your personalized transformation roadmap</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-gold-500 text-xl flex-shrink-0">✓</span>
              <span className="text-gray-700">Free downloadable starter guide</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-gold-500 text-xl flex-shrink-0">✓</span>
              <span className="text-gray-700">Exclusive discount on your recommended level</span>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => setCurrentPage(1)}
              className="bg-gold-500 hover:bg-gold-600 text-white font-bold py-4 px-12 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Find Your Level →
            </button>
            <p className="text-sm text-gray-500 mt-4">
              Takes less than 2 minutes • No credit card required
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Question Pages
  if (currentPage >= 1 && currentPage <= questions.length) {
    const question = questions[currentPage - 1];
    const progress = (currentPage / questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-4">
        <div className="max-w-3xl w-full">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-white text-sm mb-2">
              <span>Question {currentPage} of {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-blue-700 rounded-full h-2">
              <div
                className="bg-gold-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
              {question.question}
            </h2>

            <div className="space-y-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(question.id, option.value)}
                  className="w-full p-6 text-left rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all transform hover:scale-105 hover:shadow-lg group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl group-hover:scale-110 transition-transform">
                      {option.emoji}
                    </span>
                    <span className="text-lg text-gray-700 group-hover:text-blue-900 font-medium">
                      {option.text.replace(option.emoji, '').trim()}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Back Button */}
            {currentPage > 1 && (
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                className="mt-8 text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Back
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Email Capture Page
  if (currentPage === questions.length + 1 && !result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Your Results Are Ready!
            </h2>
            <p className="text-xl text-gray-600">
              Enter your email to unlock your personalized roadmap
            </p>
          </div>

          <div className="space-y-3 mb-8">
            <div className="flex items-start gap-3">
              <span className="text-gold-500 text-xl flex-shrink-0">✓</span>
              <span className="text-gray-700">Your transformation level & next steps</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-gold-500 text-xl flex-shrink-0">✓</span>
              <span className="text-gray-700">Free downloadable resources</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-gold-500 text-xl flex-shrink-0">✓</span>
              <span className="text-gray-700">Exclusive discount code</span>
            </div>
          </div>

          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
            <button
              type="submit"
              className="w-full bg-gold-500 hover:bg-gold-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Get My Results →
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    );
  }

  // Results Page
  if (result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🏆</div>
              <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
                {result.title}
              </h1>
              <p className="text-xl text-gray-600">
                {result.description}
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                Your Next Steps:
              </h3>
              <div className="space-y-3">
                {result.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-gold-500 text-xl flex-shrink-0">✓</span>
                    <span className="text-gray-700">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl p-8 text-white mb-8">
              <h3 className="text-2xl font-bold mb-4">
                Recommended Resources:
              </h3>
              {result.products.map((product, index) => (
                <div key={index} className="bg-white bg-opacity-20 rounded-lg p-6 backdrop-blur">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold">{product.name}</h4>
                    <span className="text-2xl font-bold">{product.price}</span>
                  </div>
                  <p className="text-white text-opacity-90 mb-4">{product.description}</p>
                  <button className="bg-white text-gold-600 font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-all transform hover:scale-105">
                    Get Started →
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={resetQuiz}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Take the quiz again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
