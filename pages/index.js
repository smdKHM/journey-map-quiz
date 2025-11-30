import { useState } from 'react';

export default function JourneyMapQuiz() {
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);
  const [hoveredOption, setHoveredOption] = useState(null);

  // Brand colors
  const colors = {
    navyBlue: '#1e3a5f',
    darkBlue: '#1a2642',
    mediumBlue: '#2d4a7c',
    gold: '#f4b942',
    goldHover: '#e5a832',
    lightBlue: '#4a90e2',
    white: '#ffffff',
    lightGray: '#f8f9fa',
    gray: '#6b7280',
    darkGray: '#374151',
  };

  const questions = [
    {
      id: 1,
      question: "What's your biggest challenge right now?",
      options: [
        { text: "I feel stuck and don't know where to start", value: 1, emoji: "😔" },
        { text: "My finances are a mess and I need structure", value: 2, emoji: "📊" },
        { text: "I'm ready to scale but lack the systems", value: 3, emoji: "🚀" },
        { text: "I want to optimize what I've already built", value: 4, emoji: "⚡" }
      ]
    },
    {
      id: 2,
      question: "How do you currently track your business finances?",
      options: [
        { text: "What tracking? Everything's in my head", value: 1, emoji: "🤷" },
        { text: "Spreadsheets and receipts everywhere", value: 2, emoji: "📝" },
        { text: "Basic system but needs improvement", value: 3, emoji: "💼" },
        { text: "Solid system, just want to level up", value: 4, emoji: "✅" }
      ]
    },
    {
      id: 3,
      question: "What's your monthly revenue goal?",
      options: [
        { text: "Still dreaming of my first sale", value: 1, emoji: "💭" },
        { text: "$1K-$5K per month", value: 2, emoji: "💵" },
        { text: "$5K-$20K per month", value: 3, emoji: "💰" },
        { text: "$20K+ per month", value: 4, emoji: "🏆" }
      ]
    },
    {
      id: 4,
      question: "How much time do you spend on admin work?",
      options: [
        { text: "Too much! It's overwhelming", value: 1, emoji: "⏰" },
        { text: "Several hours per week", value: 2, emoji: "📅" },
        { text: "Moderate, but could be better", value: 3, emoji: "✂️" },
        { text: "Pretty efficient already", value: 4, emoji: "⚙️" }
      ]
    },
    {
      id: 5,
      question: "What do you need most right now?",
      options: [
        { text: "Personal development and mindset", value: 1, emoji: "🌱" },
        { text: "Systems and templates to get organized", value: 2, emoji: "📋" },
        { text: "Growth strategies and scaling plans", value: 3, emoji: "📈" },
        { text: "Advanced optimization tools", value: 4, emoji: "🎯" }
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
        name: "Quick Start Tracker",
        price: "$7",
        description: "Simple Excel tracker + 5-page guide - Perfect if you've never tracked before. Start tracking in 15 minutes.",
        url: "https://stan.store/Ledgerliftstudio/p/track-my-money-better-quick-start",
        featured: false
      },
      {
        name: "Phase 1 Core Workbook",
        price: "$17",
        description: "18-page transformation guide - Discover your values, define your vision, build sustainable habits. Complete personal development foundation.",
        url: "https://stan.store/Ledgerliftstudio/p/-level-1-build-yourself-first-part-of-the-boots",
        featured: true
      },
      {
        name: "Level 1: Complete Bundle ⭐",
        price: "$29",
        description: "Complete foundation system - Core Workbook + Start Here Guide + Quick Start Guide + Daily Tracker + Bonus Resources (Save $12)",
        url: "https://stan.store/Ledgerliftstudio/p/-level-1-build-yourself-first-part-of-the-boots",
        featured: false
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
          description: "Complete monthly financial close system",
          url: "https://stan.store/Ledgerliftstudio/p/monthly-close-command-center"
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
          description: "Complete operational framework (Coming Soon)",
          url: "https://stan.store/Ledgerliftstudio"
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
          description: "Advanced scaling systems (Coming Soon)",
          url: "https://stan.store/Ledgerliftstudio"
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
          description: "Elite optimization tools (Coming Soon)",
          url: "https://stan.store/Ledgerliftstudio"
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
    
    if (currentPage <= questions.length) {
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
      }, 300);
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
  const level = calculateLevel();
  
  // 🔥 ADD WEBHOOK CODE HERE - Send data to Zapier
  const webhookData = {
    email: email,
    level: level,
    timestamp: new Date().toISOString()
  };

  // Replace with your actual Zapier webhook URL
  fetch('/api/webhook', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(webhookData)
  })
  .then(response => response.json())
  .then(data => {
    console.log('✅ Data sent to Zapier successfully:', data);
  })
  .catch((error) => {
    console.error('❌ Error sending to Zapier:', error);
    // Still show results even if webhook fails
  });
  // END WEBHOOK CODE

  setResult(levels[level]);
  setCurrentPage(questions.length + 1);
};

  const resetQuiz = () => {
    setCurrentPage(0);
    setAnswers({});
    setEmail('');
    setResult(null);
  };

  // Styles
  const styles = {
    pageContainer: {
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${colors.darkBlue} 0%, ${colors.navyBlue} 50%, ${colors.mediumBlue} 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    card: {
      maxWidth: '800px',
      width: '100%',
      backgroundColor: colors.white,
      borderRadius: '24px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      padding: '48px',
    },
    heading: {
      fontSize: '48px',
      fontWeight: 'bold',
      color: colors.navyBlue,
      marginBottom: '16px',
      textAlign: 'center',
      lineHeight: '1.2',
    },
    subtitle: {
      fontSize: '20px',
      color: colors.gray,
      marginBottom: '32px',
      textAlign: 'center',
    },
    checkmarkContainer: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      marginBottom: '12px',
    },
    checkmark: {
      color: colors.gold,
      fontSize: '20px',
      flexShrink: 0,
    },
    checkmarkText: {
      color: colors.darkGray,
      fontSize: '16px',
      lineHeight: '1.6',
    },
    button: {
      backgroundColor: colors.gold,
      color: colors.white,
      fontWeight: 'bold',
      padding: '16px 48px',
      borderRadius: '50px',
      fontSize: '18px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    },
    buttonHover: {
      backgroundColor: colors.goldHover,
      transform: 'scale(1.05)',
    },
    answerBox: {
      width: '100%',
      padding: '24px',
      textAlign: 'left',
      borderRadius: '16px',
      border: `2px solid #e5e7eb`,
      backgroundColor: colors.white,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    answerBoxHover: {
      borderColor: colors.lightBlue,
      backgroundColor: '#eff6ff',
      transform: 'scale(1.02)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    },
    progressBar: {
      width: '100%',
      height: '8px',
      backgroundColor: colors.mediumBlue,
      borderRadius: '4px',
      overflow: 'hidden',
      marginBottom: '32px',
    },
    progressFill: {
      height: '100%',
      backgroundColor: colors.gold,
      transition: 'width 0.3s ease',
    },
    emailInput: {
      width: '100%',
      padding: '18px 24px',
      fontSize: '18px',
      border: `2px solid #d1d5db`,
      borderRadius: '16px',
      outline: 'none',
      transition: 'border-color 0.3s ease',
      marginBottom: '16px',
    },
  };

  // Landing Page
  if (currentPage === 0) {
    return (
      <div style={styles.pageContainer}>
        <div style={styles.card}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>✨</div>
            <h1 style={styles.heading}>
              Feeling Stuck?<br />Ready for Change?
            </h1>
            <p style={styles.subtitle}>
              Take our FREE 5-Question Assessment
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <div style={styles.checkmarkContainer}>
              <span style={styles.checkmark}>✓</span>
              <span style={styles.checkmarkText}>Your personalized transformation roadmap</span>
            </div>
            <div style={styles.checkmarkContainer}>
              <span style={styles.checkmark}>✓</span>
              <span style={styles.checkmarkText}>Affordable starter resources from $7</span>
            </div>
            <div style={styles.checkmarkContainer}>
              <span style={styles.checkmark}>✓</span>
              <span style={styles.checkmarkText}>Exclusive discount on your recommended level</span>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => setCurrentPage(1)}
              style={styles.button}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = colors.goldHover;
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = colors.gold;
                e.target.style.transform = 'scale(1)';
              }}
            >
              Find Your Level →
            </button>
            <p style={{ fontSize: '14px', color: colors.gray, marginTop: '16px' }}>
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
      <div style={styles.pageContainer}>
        <div style={{ maxWidth: '900px', width: '100%' }}>
          {/* Progress Bar */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: colors.white, fontSize: '14px', marginBottom: '8px' }}>
              <span>Question {currentPage} of {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div style={styles.progressBar}>
              <div style={{ ...styles.progressFill, width: `${progress}%` }} />
            </div>
          </div>

          {/* Question Card */}
          <div style={styles.card}>
            <h2 style={{ ...styles.heading, fontSize: '36px', marginBottom: '32px' }}>
              {question.question}
            </h2>

            <div>
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(question.id, option.value)}
                  style={{
                    ...styles.answerBox,
                    ...(hoveredOption === `${question.id}-${index}` ? styles.answerBoxHover : {})
                  }}
                  onMouseEnter={() => setHoveredOption(`${question.id}-${index}`)}
                  onMouseLeave={() => setHoveredOption(null)}
                >
                  <span style={{ fontSize: '32px' }}>{option.emoji}</span>
                  <span style={{ fontSize: '18px', color: colors.darkGray, fontWeight: '500' }}>
                    {option.text}
                  </span>
                </button>
              ))}
            </div>

            {currentPage > 1 && (
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                style={{ marginTop: '32px', color: colors.lightBlue, background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: '500' }}
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
      <div style={styles.pageContainer}>
        <div style={styles.card}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎯</div>
            <h2 style={{ ...styles.heading, fontSize: '40px' }}>
              Your Results Are Ready!
            </h2>
            <p style={styles.subtitle}>
              Enter your email to unlock your personalized roadmap
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <div style={styles.checkmarkContainer}>
              <span style={styles.checkmark}>✓</span>
              <span style={styles.checkmarkText}>Your transformation level & next steps</span>
            </div>
            <div style={styles.checkmarkContainer}>
              <span style={styles.checkmark}>✓</span>
              <span style={styles.checkmarkText}>Your personalized resource recommendations</span>
            </div>
            <div style={styles.checkmarkContainer}>
              <span style={styles.checkmark}>✓</span>
              <span style={styles.checkmarkText}>Exclusive discount code</span>
            </div>
          </div>

          <form onSubmit={handleEmailSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              style={styles.emailInput}
              onFocus={(e) => e.target.style.borderColor = colors.lightBlue}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
            <button
              type="submit"
              style={{ ...styles.button, width: '100%' }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = colors.goldHover;
                e.target.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = colors.gold;
                e.target.style.transform = 'scale(1)';
              }}
            >
              Get My Results →
            </button>
          </form>

          <p style={{ fontSize: '14px', color: colors.gray, textAlign: 'center', marginTop: '24px' }}>
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    );
  }

  // Results Page
  if (result) {
    return (
      <div style={{ ...styles.pageContainer, padding: '48px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={styles.card}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>🏆</div>
              <h1 style={{ ...styles.heading, fontSize: '40px' }}>
                {result.title}
              </h1>
              <p style={styles.subtitle}>
                {result.description}
              </p>
            </div>

            <div style={{ backgroundColor: '#eff6ff', borderRadius: '16px', padding: '24px', marginBottom: '32px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: colors.navyBlue, marginBottom: '16px' }}>
                Your Next Steps:
              </h3>
              <div>
                {result.nextSteps.map((step, index) => (
                  <div key={index} style={styles.checkmarkContainer}>
                    <span style={styles.checkmark}>✓</span>
                    <span style={styles.checkmarkText}>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldHover} 100%)`, borderRadius: '16px', padding: '32px', color: colors.white, marginBottom: '32px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
                Recommended Resources:
              </h3>
            {result.products.map((product, index) => (
              <div 
                key={index} 
                style={{ 
                  backgroundColor: product.featured ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.7)', 
                  borderRadius: '12px',
                  border: product.featured ? '4px solid #f97316' : '2px solid rgba(255, 255, 255, 0.3)',
                  padding: '24px',
                  marginBottom: '20px',
                  position: 'relative',
                  boxShadow: product.featured ? '0 10px 25px rgba(249, 115, 22, 0.2)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                {product.featured && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    right: '20px',
                    backgroundColor: '#f97316',
                    color: 'white',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 10px rgba(249, 115, 22, 0.4)'
                  }}>
                    ⭐ BEST VALUE
                  </div>
                )}
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <h4 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: colors.gold }}>
                    {product.name}
                  </h4>
                  <span style={{ 
                    fontSize: '28px', 
                    fontWeight: 'bold', 
                    color: product.featured ? '#f97316' : colors.gold,
                    marginLeft: '16px'
                  }}>
                    {product.price}
                  </span>
                </div>
                
                <p style={{ 
                  marginBottom: '20px', 
                  opacity: 0.9,
                  fontSize: '15px',
                  lineHeight: '1.5',
                  color: colors.white
                }}>
                  {product.description}
                </p>
                
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ 
                    backgroundColor: product.featured ? '#f97316' : colors.white,
                    color: product.featured ? 'white' : colors.gold,
                    fontWeight: 'bold', 
                    padding: '14px 32px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    display: 'inline-block',
                    transition: 'all 0.3s ease',
                    border: product.featured ? '2px solid #f97316' : `2px solid ${colors.gold}`,
                    fontSize: '16px',
                    cursor: 'pointer'
                  }}
                >
                  {product.featured ? 'Get Complete Bundle' : 'Get Workbook'}
                </a>
              </div>
            ))}

            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                onClick={resetQuiz}
                style={{ color: colors.lightBlue, background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: '500' }}
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


