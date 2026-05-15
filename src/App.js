import React, { useState, useEffect } from 'react';
import { Search, MessageCircle, Download, Eye } from 'lucide-react';

// SKILLS DATA - 31 Singapore Government Skills
const SKILLS_DATA = [
  { id: 1, name: "Automated Grant Eligibility Assessment", category: "Administrative & Operations", description: "Analyzes client information against eligibility criteria to determine benefit entitlements and reduce manual review time", primaryUseCase: "Determine benefit eligibility quickly", targetJobRoles: "Case Workers; Family Service Officers; Social Workers; Benefit Processing Officers", efficiencyGain: "40% reduction in processing time", complexityLevel: "Medium", dependencies: "Client database; eligibility rules engine" },
  { id: 2, name: "Application Triage & Routing Engine", category: "Administrative & Operations", description: "Automatically categorizes submitted applications and routes to appropriate departments/officers based on classification rules", primaryUseCase: "Route incoming applications efficiently", targetJobRoles: "Administrative Officers; Application Processing Teams; Service Centres", efficiencyGain: "35% faster application routing", complexityLevel: "High", dependencies: "Application management system; department directory" },
  { id: 3, name: "Meeting Briefing Generator", category: "Administrative & Operations", description: "Creates comprehensive background summaries on clients/cases before consultations based on file documents", primaryUseCase: "Prepare for client consultations", targetJobRoles: "Policy Officers; Case Workers; Child Protection Officers", efficiencyGain: "50% reduction in prep time", complexityLevel: "Medium", dependencies: "Case management system; document storage" },
  { id: 4, name: "Document Compliance Checker", category: "Administrative & Operations", description: "Verifies submitted documents against regulatory requirements and flags missing or non-compliant items", primaryUseCase: "Validate application completeness", targetJobRoles: "Compliance Officers; Administrative Support; Processing Units", efficiencyGain: "45% faster document review", complexityLevel: "Medium", dependencies: "Regulatory database; document scanning" },
  { id: 5, name: "Trend Analysis from Case Data", category: "Data & Intelligence", description: "Extracts patterns from case records to identify emerging social issues or community needs for policy insights", primaryUseCase: "Identify emerging community trends", targetJobRoles: "Policy Officers; Research Officers; Operations Analysts; MSF officers", efficiencyGain: "30% faster trend identification", complexityLevel: "High", dependencies: "Case data warehouse; analytics tools" },
  { id: 6, name: "Risk Assessment Prioritizer", category: "Data & Intelligence", description: "Scores cases by urgency and vulnerability to prioritize caseloads based on risk factors", primaryUseCase: "Prioritize vulnerable cases", targetJobRoles: "Child Protection Officers; Social Workers; Case Managers", efficiencyGain: "25% improvement in prioritization accuracy", complexityLevel: "Medium", dependencies: "Risk assessment framework; case database" },
  { id: 7, name: "Stakeholder Communication Mapper", category: "Data & Intelligence", description: "Identifies all relevant agencies/organizations for cross-agency collaboration on complex cases", primaryUseCase: "Enable better coordination", targetJobRoles: "Policy Officers; Case Workers; Interagency Coordinators", efficiencyGain: "40% faster stakeholder identification", complexityLevel: "Medium", dependencies: "Agency directory; case classification" },
  { id: 8, name: "Data Quality Auditor", category: "Data & Intelligence", description: "Scans records for inconsistencies, missing fields, or data entry errors before submissions", primaryUseCase: "Ensure data integrity", targetJobRoles: "IT Compliance Officers; IT Audit Engineers; Operations Officers", efficiencyGain: "50% faster data quality checks", complexityLevel: "Medium", dependencies: "Data validation rules; audit logs" },
  { id: 9, name: "Regulatory Requirement Analyzer", category: "Data & Intelligence", description: "Monitors policy changes and generates impact assessments for internal procedures", primaryUseCase: "Track regulatory changes", targetJobRoles: "Compliance Officers; Policy Officers; IT Governance Engineers", efficiencyGain: "35% reduction in compliance review time", complexityLevel: "High", dependencies: "Regulatory monitoring sources; policy database" },
  { id: 10, name: "Plain Language Translator", category: "Communication & Engagement", description: "Converts complex policy language into simple explanations for citizen communication", primaryUseCase: "Create accessible content", targetJobRoles: "Frontline Service Officers; Digital Ambassadors; Community Engagement Officers", efficiencyGain: "45% faster content creation", complexityLevel: "Low", dependencies: "Policy documents; language database" },
  { id: 11, name: "Multi-Language Response Generator", category: "Communication & Engagement", description: "Creates culturally appropriate responses in multiple languages for diverse communities", primaryUseCase: "Serve multilingual citizens", targetJobRoles: "Community Workers; Frontline Officers; Service Centre Staff", efficiencyGain: "60% faster multilingual responses", complexityLevel: "Medium", dependencies: "Translation database; cultural guidelines" },
  { id: 12, name: "Communication Template Advisor", category: "Communication & Engagement", description: "Suggests appropriate communication style/format based on case type and audience", primaryUseCase: "Select right communication approach", targetJobRoles: "Case Workers; Social Workers; Youth Officers", efficiencyGain: "30% faster message composition", complexityLevel: "Low", dependencies: "Template library; communication guidelines" },
  { id: 13, name: "Feedback Sentiment Analyzer", category: "Communication & Engagement", description: "Analyzes citizen feedback to identify satisfaction gaps and service improvement areas", primaryUseCase: "Improve service delivery", targetJobRoles: "Operations Officers; Service Delivery Managers; Policy Officers", efficiencyGain: "40% faster feedback analysis", complexityLevel: "Medium", dependencies: "Feedback collection system; sentiment analysis model" },
  { id: 14, name: "Case Summary Synthesizer", category: "Case Management & Social Work", description: "Automatically creates concise case summaries from lengthy notes for handovers and reports", primaryUseCase: "Prepare case handovers", targetJobRoles: "Case Workers; Social Workers; Child Protection Officers", efficiencyGain: "50% reduction in documentation time", complexityLevel: "Medium", dependencies: "Case management system; NLP tools" },
  { id: 15, name: "Service Referral Recommender", category: "Case Management & Social Work", description: "Suggests appropriate community services and VWO programs based on client needs", primaryUseCase: "Match clients to services", targetJobRoles: "Social Workers; Family Service Officers; Case Workers", efficiencyGain: "35% improvement in service matching", complexityLevel: "Medium", dependencies: "Service database; needs assessment framework" },
  { id: 16, name: "Intervention Progress Tracker", category: "Case Management & Social Work", description: "Monitors client progress against goals and flags cases needing intervention adjustments", primaryUseCase: "Track intervention effectiveness", targetJobRoles: "Social Workers; Case Workers; Family Service Officers; Rehabilitation Officers", efficiencyGain: "30% faster progress reviews", complexityLevel: "Medium", dependencies: "Case goals database; tracking system" },
  { id: 17, name: "Client Information Consolidator", category: "Case Management & Social Work", description: "Aggregates information from multiple touchpoints into unified client profile", primaryUseCase: "Create single client view", targetJobRoles: "Case Workers; Social Workers; Administrative Staff", efficiencyGain: "45% reduction in information gathering time", complexityLevel: "Medium", dependencies: "Multi-system data integration" },
  { id: 18, name: "IT Policy Compliance Auditor", category: "Compliance & Governance", description: "Checks infrastructure/projects against IT policies and flags deviations automatically", primaryUseCase: "Audit IT compliance", targetJobRoles: "IT Governance & Compliance Engineers; IT Audit Officers; Project Managers", efficiencyGain: "55% faster compliance checks", complexityLevel: "High", dependencies: "IT policy database; system audit tools" },
  { id: 19, name: "Project Quality Control Assistant", category: "Compliance & Governance", description: "Reviews project documentation for adherence to governance standards and quality gates", primaryUseCase: "Ensure project quality", targetJobRoles: "Project Managers; IT Compliance Officers; Quality Assurance Officers", efficiencyGain: "40% faster quality reviews", complexityLevel: "Medium", dependencies: "Quality standards database; project management system" },
  { id: 20, name: "Cybersecurity Risk Scorer", category: "Compliance & Governance", description: "Assesses submitted reports and systems against security governance frameworks", primaryUseCase: "Rate security posture", targetJobRoles: "IT Compliance Officers; Cybersecurity Governance Officers; IT Audit Engineers", efficiencyGain: "50% faster risk assessment", complexityLevel: "High", dependencies: "Cybersecurity framework; risk scoring model" },
  { id: 21, name: "Audit Finding Tracker", category: "Compliance & Governance", description: "Monitors remediation status of audit findings and alerts when timelines slip", primaryUseCase: "Track audit remediation", targetJobRoles: "Internal Auditors; IT Compliance Officers; Governance Officers", efficiencyGain: "45% reduction in tracking time", complexityLevel: "Low", dependencies: "Audit management system; alert system" },
  { id: 22, name: "Policy Documentation Auto-Generator", category: "Content & Documentation", description: "Drafts policy documents with required sections and regulatory language based on inputs", primaryUseCase: "Draft policies efficiently", targetJobRoles: "Policy Officers; Corporate Secretarial Staff; Compliance Officers", efficiencyGain: "60% reduction in drafting time", complexityLevel: "High", dependencies: "Policy templates; regulatory language library" },
  { id: 23, name: "Training Material Creator", category: "Content & Documentation", description: "Develops training modules and procedure guides from policy documents for officer upskilling", primaryUseCase: "Create training content", targetJobRoles: "Training Officers; HR Officers; Workforce Development Officers", efficiencyGain: "55% faster content development", complexityLevel: "Medium", dependencies: "Training framework; policy documents" },
  { id: 24, name: "Case Report Template Matcher", category: "Content & Documentation", description: "Selects and formats appropriate report templates based on case classification", primaryUseCase: "Format case reports", targetJobRoles: "Case Workers; Social Workers; Administrative Staff", efficiencyGain: "40% faster report formatting", complexityLevel: "Low", dependencies: "Report template library; case classification system" },
  { id: 25, name: "FAQ Generation from Policies", category: "Citizen-Facing Service", description: "Creates frequently asked questions content from government policies for citizens", primaryUseCase: "Publish citizen resources", targetJobRoles: "Digital Ambassadors; Frontline Service Officers; Communications Officers", efficiencyGain: "50% faster FAQ creation", complexityLevel: "Low", dependencies: "Policy documents; FAQ template" },
  { id: 26, name: "Digital Literacy Assessment", category: "Citizen-Facing Service", description: "Evaluates citizen digital capability and recommends appropriate support/training", primaryUseCase: "Assess digital readiness", targetJobRoles: "Digital Ambassadors; Community Development Officers; Service Centre Staff", efficiencyGain: "35% faster assessments", complexityLevel: "Low", dependencies: "Assessment framework; digital support database" },
  { id: 27, name: "Service Journey Simplifier", category: "Citizen-Facing Service", description: "Maps and simplifies multi-step government processes into clearer citizen pathways", primaryUseCase: "Improve process clarity", targetJobRoles: "Service Centre Managers; Operations Officers; Experience Design Officers", efficiencyGain: "40% faster journey mapping", complexityLevel: "Medium", dependencies: "Process documentation; user research tools" },
  { id: 28, name: "External Intelligence Aggregator", category: "Intelligence & Research", description: "Compiles news, reports, and research on relevant topics for contextual intelligence", primaryUseCase: "Research external environment", targetJobRoles: "Policy Officers; Operations Analysts; Research Officers; Intelligence Analysts", efficiencyGain: "45% faster research compilation", complexityLevel: "Medium", dependencies: "News feeds; research databases; web scraping tools" },
  { id: 29, name: "Comparative Policy Analyzer", category: "Intelligence & Research", description: "Benchmarks Singapore policies against international practices or other agencies", primaryUseCase: "Conduct policy benchmarking", targetJobRoles: "Policy Officers; Strategic Planning Officers; Management Consultants", efficiencyGain: "50% reduction in analysis time", complexityLevel: "High", dependencies: "Policy databases; international sources; comparative framework" },
  { id: 30, name: "Interview Insight Extractor", category: "Intelligence & Research", description: "Transcribes and summarizes key findings from stakeholder/citizen interviews", primaryUseCase: "Extract interview insights", targetJobRoles: "Policy Officers; Researchers; Operations Analysts", efficiencyGain: "40% faster interview analysis", complexityLevel: "Medium", dependencies: "Transcription service; interview analysis tools" },
  { id: 31, name: "Cross-Agency Availability Finder", category: "Scheduling & Coordination", description: "Identifies optimal times for multi-agency meetings by checking stakeholder calendars", primaryUseCase: "Coordinate meetings", targetJobRoles: "Project Managers; Interagency Coordinators; Operations Managers", efficiencyGain: "35% faster scheduling", complexityLevel: "Medium", dependencies: "Calendar integration; meeting management system" }
];

// Mock LLM matching logic
const mockLLMMatch = (prompt, limit = null) => {
  const promptLower = prompt.toLowerCase();
  const keywords = promptLower.split(/\s+/);
  
  const matches = SKILLS_DATA.map(skill => {
    let score = 0;
    const skillText = `${skill.name} ${skill.description} ${skill.primaryUseCase} ${skill.targetJobRoles}`.toLowerCase();
    
    keywords.forEach(keyword => {
      if (skillText.includes(keyword)) score += 2;
      if (skill.primaryUseCase.toLowerCase().includes(keyword)) score += 3;
      if (skill.name.toLowerCase().includes(keyword)) score += 4;
    });
    
    return { ...skill, matchScore: score };
  }).filter(s => s.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore);
  
  return limit ? matches.slice(0, limit) : matches;
};

// Feedback submission function
const submitFeedback = async (feedback) => {
  const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfROdXJLc8KqVV2vfTg5f3xYRYzf5DlOLGu8M-Z3XdGhYvqpA/formResponse";
  
  const formData = new FormData();
  formData.append("entry.1234567890", new Date().toISOString()); // Timestamp
  formData.append("entry.2345678901", feedback.workflow); // Workflow
  formData.append("entry.3456789012", feedback.screen); // Screen
  formData.append("entry.4567890123", feedback.reaction); // Reaction
  formData.append("entry.5678901234", feedback.comment); // Comment
  
  try {
    await fetch(formUrl, {
      method: "POST",
      body: formData,
      mode: "no-cors"
    });
    return true;
  } catch (error) {
    console.error("Feedback submission error:", error);
    return false;
  }
};

// Feedback Widget Component
const FeedbackWidget = ({ workflow, screen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reaction, setReaction] = useState(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (reaction) {
      await submitFeedback({
        workflow,
        screen,
        reaction,
        comment
      });
      setSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setSubmitted(false);
        setReaction(null);
        setComment('');
      }, 2000);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-4 w-80 border border-gray-200">
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">How helpful was this?</h3>
            <div className="flex gap-3 mb-4">
              <button
                onClick={() => setReaction('👍')}
                className={`flex-1 py-2 rounded-lg font-semibold transition ${
                  reaction === '👍'
                    ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-400'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                👍 Helpful
              </button>
              <button
                onClick={() => setReaction('👎')}
                className={`flex-1 py-2 rounded-lg font-semibold transition ${
                  reaction === '👎'
                    ? 'bg-amber-100 text-amber-700 border-2 border-amber-400'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                👎 Not helpful
              </button>
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Optional: Tell us more..."
              className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
              rows="3"
            />
          </div>
          {submitted ? (
            <div className="text-center py-2 text-emerald-600 font-semibold">
              ✓ Thank you for your feedback!
            </div>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!reaction}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
            >
              Submit Feedback
            </button>
          )}
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition transform hover:scale-110"
        title="Send feedback"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
};

// Workflow 1: Browse Library
const WorkflowBrowse = ({ onFeedbackContext }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const allCategories = [
    "Administrative & Operations",
    "Data & Intelligence",
    "Communication & Engagement",
    "Case Management & Social Work",
    "Compliance & Governance",
    "Content & Documentation",
    "Citizen-Facing Service",
    "Intelligence & Research",
    "Scheduling & Coordination"
  ];

  const toggleCategory = (category) => {
    const newSelected = new Set(selectedCategories);
    if (newSelected.has(category)) {
      newSelected.delete(category);
    } else {
      newSelected.add(category);
    }
    setSelectedCategories(newSelected);
  };

  const filteredSkills = SKILLS_DATA.filter(skill => {
    const matchesSearch = 
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategories.size === 0 || selectedCategories.has(skill.category);
    
    return matchesSearch && matchesCategory;
  });

  const categoryColors = {
    "Administrative & Operations": "bg-blue-100 text-blue-800",
    "Data & Intelligence": "bg-purple-100 text-purple-800",
    "Communication & Engagement": "bg-green-100 text-green-800",
    "Case Management & Social Work": "bg-pink-100 text-pink-800",
    "Compliance & Governance": "bg-orange-100 text-orange-800",
    "Content & Documentation": "bg-cyan-100 text-cyan-800",
    "Citizen-Facing Service": "bg-teal-100 text-teal-800",
    "Intelligence & Research": "bg-indigo-100 text-indigo-800",
    "Scheduling & Coordination": "bg-amber-100 text-amber-800"
  };

  const categoryBgColors = {
    "Administrative & Operations": "hover:bg-blue-50 border-blue-200",
    "Data & Intelligence": "hover:bg-purple-50 border-purple-200",
    "Communication & Engagement": "hover:bg-green-50 border-green-200",
    "Case Management & Social Work": "hover:bg-pink-50 border-pink-200",
    "Compliance & Governance": "hover:bg-orange-50 border-orange-200",
    "Content & Documentation": "hover:bg-cyan-50 border-cyan-200",
    "Citizen-Facing Service": "hover:bg-teal-50 border-teal-200",
    "Intelligence & Research": "hover:bg-indigo-50 border-indigo-200",
    "Scheduling & Coordination": "hover:bg-amber-50 border-amber-200"
  };

  return (
    <div className="max-w-7xl mx-auto">
      {!selectedSkill ? (
        <>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Skills Library</h2>
            
            {/* Search & Filter Bar */}
            <div className="flex gap-3 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search skills by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-3 rounded-lg font-semibold transition whitespace-nowrap border-2 ${
                  showFilters
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                }`}
              >
                🔽 Filter
                {selectedCategories.size > 0 && (
                  <span className="ml-2 bg-blue-500 text-white px-2 py-0.5 rounded-full text-xs">
                    {selectedCategories.size}
                  </span>
                )}
              </button>
            </div>

            {/* Filter Dropdown */}
            {showFilters && (
              <div className="mb-4 bg-white border-2 border-gray-300 rounded-lg p-4 shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Filter by Category</h3>
                  {selectedCategories.size > 0 && (
                    <button
                      onClick={() => setSelectedCategories(new Set())}
                      className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {allCategories.map(category => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.has(category)}
                        onChange={() => toggleCategory(category)}
                        className="w-4 h-4 accent-blue-600"
                      />
                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Results counter */}
            <div className="text-sm text-gray-600 mb-4">
              Showing <span className="font-semibold">{filteredSkills.length}</span> of {SKILLS_DATA.length} skills
            </div>
          </div>

          {/* Skills Grid - Compact layout for more cards visible */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filteredSkills.map(skill => (
              <div
                key={skill.id}
                className={`bg-white border-2 border-gray-200 rounded-lg p-3 hover:shadow-md hover:border-blue-400 transition cursor-pointer ${categoryBgColors[skill.category]}`}
                onClick={() => {
                  setSelectedSkill(skill);
                  onFeedbackContext('browse', 'skill_card');
                }}
              >
                <div className={`inline-block px-2 py-0.5 rounded text-xs font-semibold mb-2 ${categoryColors[skill.category]}`}>
                  {skill.category.split(' & ')[0]}
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2">{skill.name}</h3>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{skill.primaryUseCase}</p>
                <button
                  className="text-blue-600 hover:text-blue-700 font-semibold text-xs flex items-center gap-1"
                >
                  <Eye size={14} /> Details
                </button>
              </div>
            ))}
          </div>

          {filteredSkills.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {selectedCategories.size > 0 
                  ? `No skills found in selected categories${searchTerm ? ` matching "${searchTerm}"` : ''}`
                  : `No skills found matching "${searchTerm}"`
                }
              </p>
              {selectedCategories.size > 0 && (
                <button
                  onClick={() => setSelectedCategories(new Set())}
                  className="text-blue-600 hover:text-blue-700 font-semibold mt-4"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </>
      ) : (
        <SkillDetailModal
          skill={selectedSkill}
          onClose={() => setSelectedSkill(null)}
          onFeedbackContext={() => onFeedbackContext('browse', 'detail_view')}
        />
      )}
    </div>
  );
};

// Workflow 2a: AI Curated Selection
const WorkflowCurated = ({ onFeedbackContext }) => {
  const [prompt, setPrompt] = useState('');
  const [results, setResults] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    if (prompt.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        setResults(mockLLMMatch(prompt, 5));
        setIsLoading(false);
        onFeedbackContext('curated', 'results');
      }, 500);
    }
  };

  const categoryColors = {
    "Administrative & Operations": "bg-blue-100 text-blue-800",
    "Data & Intelligence": "bg-purple-100 text-purple-800",
    "Communication & Engagement": "bg-green-100 text-green-800",
    "Case Management & Social Work": "bg-pink-100 text-pink-800",
    "Compliance & Governance": "bg-orange-100 text-orange-800",
    "Content & Documentation": "bg-cyan-100 text-cyan-800",
    "Citizen-Facing Service": "bg-teal-100 text-teal-800",
    "Intelligence & Research": "bg-indigo-100 text-indigo-800",
    "Scheduling & Coordination": "bg-amber-100 text-amber-800"
  };

  const getRelevanceExplanation = (skill, prompt) => {
    const promptLower = prompt.toLowerCase();
    if (promptLower.includes('risk')) return "Addresses risk assessment and case prioritization";
    if (promptLower.includes('case')) return "Directly supports case management workflows";
    if (promptLower.includes('policy')) return "Helps with policy analysis and documentation";
    if (promptLower.includes('meeting')) return "Useful for meeting preparation and scheduling";
    if (promptLower.includes('data')) return "Enhances data quality and analysis";
    if (promptLower.includes('compliance')) return "Supports compliance tracking and auditing";
    if (promptLower.includes('communication')) return "Improves cross-agency communication";
    return "Relevant to your operational needs";
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!results ? (
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Find the Right Skills</h2>
          <p className="text-gray-600 mb-6">Describe what you need help with, and we'll suggest the best skills for your role.</p>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              What do you need help with?
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && e.ctrlKey && handleSearch()}
              placeholder="e.g., I need to assess risk in case management, or I'm preparing for client meetings..."
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900 mb-4"
              rows="4"
            />
            <button
              onClick={handleSearch}
              disabled={!prompt.trim() || isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
            >
              {isLoading ? '🔄 Searching...' : '🔍 Find Skills'}
            </button>
          </div>
        </div>
      ) : selectedSkill ? (
        <SkillDetailModal
          skill={selectedSkill}
          onClose={() => setSelectedSkill(null)}
          onFeedbackContext={() => onFeedbackContext('curated', 'detail_view')}
        />
      ) : (
        <div>
          <button
            onClick={() => setResults(null)}
            className="text-blue-600 hover:text-blue-700 font-semibold mb-6 flex items-center gap-1"
          >
            ← Search Again
          </button>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Your search:</span> "{prompt}"
            </p>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Recommended Skills ({results.length} matches)
          </h3>

          <div className="space-y-4">
            {results.map(skill => (
              <div key={skill.id} className="bg-white border-2 border-gray-200 rounded-lg p-5 hover:shadow-md hover:border-blue-300 transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${categoryColors[skill.category]}`}>
                      {skill.category.split(' & ')[0]}
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">{skill.name}</h4>
                    <p className="text-sm text-emerald-700 font-semibold mt-2">
                      ✓ {getRelevanceExplanation(skill, prompt)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedSkill(skill);
                    onFeedbackContext('curated', 'detail_view');
                  }}
                  className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-2 mt-3"
                >
                  <Eye size={16} /> View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Workflow 2b: AI Filtered List
const WorkflowFiltered = ({ onFeedbackContext }) => {
  const [prompt, setPrompt] = useState('');
  const [results, setResults] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState(new Set());
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    if (prompt.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        setResults(mockLLMMatch(prompt));
        setSelectedSkills(new Set());
        setIsLoading(false);
        onFeedbackContext('filtered', 'results');
      }, 500);
    }
  };

  const toggleSkillSelection = (skillId) => {
    const newSelected = new Set(selectedSkills);
    if (newSelected.has(skillId)) {
      newSelected.delete(skillId);
    } else {
      newSelected.add(skillId);
    }
    setSelectedSkills(newSelected);
  };

  const categoryColors = {
    "Administrative & Operations": "bg-blue-100 text-blue-800",
    "Data & Intelligence": "bg-purple-100 text-purple-800",
    "Communication & Engagement": "bg-green-100 text-green-800",
    "Case Management & Social Work": "bg-pink-100 text-pink-800",
    "Compliance & Governance": "bg-orange-100 text-orange-800",
    "Content & Documentation": "bg-cyan-100 text-cyan-800",
    "Citizen-Facing Service": "bg-teal-100 text-teal-800",
    "Intelligence & Research": "bg-indigo-100 text-indigo-800",
    "Scheduling & Coordination": "bg-amber-100 text-amber-800"
  };

  return (
    <div className="max-w-5xl mx-auto">
      {!results ? (
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Find and Download Skills</h2>
          <p className="text-gray-600 mb-6">Describe what you need, select relevant skills, and download them all at once.</p>
          
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 border border-indigo-200">
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              What do you need help with?
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && e.ctrlKey && handleSearch()}
              placeholder="e.g., I manage case work and need tools for assessment, tracking, and reporting..."
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-gray-900 mb-4"
              rows="4"
            />
            <button
              onClick={handleSearch}
              disabled={!prompt.trim() || isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
            >
              {isLoading ? '🔄 Searching...' : '🔍 Find Skills'}
            </button>
          </div>
        </div>
      ) : selectedSkill ? (
        <SkillDetailModal
          skill={selectedSkill}
          onClose={() => setSelectedSkill(null)}
          onFeedbackContext={() => onFeedbackContext('filtered', 'detail_view')}
        />
      ) : (
        <div>
          <button
            onClick={() => setResults(null)}
            className="text-purple-600 hover:text-purple-700 font-semibold mb-6 flex items-center gap-1"
          >
            ← Search Again
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Skills List */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Available Skills ({results.length})
              </h3>

              <div className="space-y-3">
                {results.map((skill, idx) => (
                  <div
                    key={skill.id}
                    className={`border-2 rounded-lg p-4 transition ${
                      selectedSkills.has(skill.id)
                        ? 'bg-purple-50 border-purple-400'
                        : 'bg-white border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={selectedSkills.has(skill.id)}
                        onChange={() => toggleSkillSelection(skill.id)}
                        className="mt-1 w-5 h-5 cursor-pointer accent-purple-600"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1">{skill.name}</h4>
                        <div className={`inline-block px-2 py-0.5 rounded text-xs font-semibold mb-2 ${categoryColors[skill.category]}`}>
                          {skill.category.split(' & ')[0]}
                        </div>
                        <p className="text-sm text-purple-700 font-semibold">
                          {Math.round((skill.matchScore / Math.max(...results.map(s => s.matchScore))) * 100)}% match
                        </p>
                        <button
                          onClick={() => {
                            setSelectedSkill(skill);
                            onFeedbackContext('filtered', 'detail_view');
                          }}
                          className="text-purple-600 hover:text-purple-700 font-semibold text-sm mt-2 flex items-center gap-1"
                        >
                          <Eye size={14} /> View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selection Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-300 rounded-lg p-5">
                <h4 className="font-bold text-gray-900 mb-4">Selection Summary</h4>
                
                <div className="bg-white rounded-lg p-3 mb-4 border border-purple-200">
                  <p className="text-lg font-bold text-purple-700">
                    {selectedSkills.size} skill{selectedSkills.size !== 1 ? 's' : ''} selected
                  </p>
                </div>

                {selectedSkills.size > 0 && (
                  <>
                    <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
                      {Array.from(selectedSkills).map(skillId => {
                        const skill = results.find(s => s.id === skillId);
                        return (
                          <div key={skillId} className="text-sm bg-white p-2 rounded border border-purple-200">
                            <p className="font-semibold text-gray-800 line-clamp-2">{skill.name}</p>
                          </div>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => {
                        onFeedbackContext('filtered', 'download');
                        alert(`📥 Downloading ${selectedSkills.size} selected skills...`);
                      }}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                    >
                      <Download size={18} /> Download Selected
                    </button>
                  </>
                )}

                {selectedSkills.size === 0 && (
                  <p className="text-sm text-gray-500 italic">Select skills to download them</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Skill Detail Modal
const SkillDetailModal = ({ skill, onClose, onFeedbackContext }) => {
  useEffect(() => {
    if (onFeedbackContext) {
      onFeedbackContext();
    }
  }, [onFeedbackContext]);

  return (
    <div className="bg-white border-2 border-gray-300 rounded-xl p-6 md:p-8">
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700 mb-4 flex items-center gap-1"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{skill.name}</h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Category</label>
              <p className="text-gray-900">{skill.category}</p>
            </div>

            <div>
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Description</label>
              <p className="text-gray-700">{skill.description}</p>
            </div>

            <div>
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Primary Use Case</label>
              <p className="text-gray-700">{skill.primaryUseCase}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-lg p-4">
            <label className="text-sm font-bold text-emerald-800 uppercase tracking-wide block mb-2">Expected Efficiency Gain</label>
            <p className="text-lg font-bold text-emerald-700">{skill.efficiencyGain}</p>
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Complexity Level</label>
            <p className="text-gray-900 font-semibold">{skill.complexityLevel}</p>
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Target Job Roles</label>
            <p className="text-gray-700 text-sm">{skill.targetJobRoles}</p>
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Dependencies</label>
            <p className="text-gray-700 text-sm">{skill.dependencies}</p>
          </div>

          <button
            onClick={() => {
              alert(`📥 Downloaded: ${skill.name}.md`);
            }}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
          >
            <Download size={18} /> Download Skill
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function SkillsLabApp() {
  const [activeWorkflow, setActiveWorkflow] = useState('workflow1');
  const [feedbackContext, setFeedbackContext] = useState({ workflow: 'workflow1', screen: 'browse' });

  const handleFeedbackContext = (workflow, screen) => {
    setFeedbackContext({
      workflow: workflow === 'curated' ? 'workflow2a' : workflow === 'filtered' ? 'workflow2b' : 'workflow1',
      screen
    });
  };

  const workflowLabels = {
    workflow1: 'Browse Library',
    workflow2a: 'AI Curated Selection',
    workflow2b: 'AI Filtered List'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b-2 border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Singapore Government Skills Lab</h1>
              <p className="text-gray-600 text-sm mt-1">Discover and download AI skills for your team</p>
            </div>
          </div>

          {/* Workflow Selector */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {Object.entries(workflowLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveWorkflow(key)}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
                  activeWorkflow === key
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {key === 'workflow1' && '1️⃣ '}
                {key === 'workflow2a' && '2️⃣ '}
                {key === 'workflow2b' && '3️⃣ '}
                {label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {activeWorkflow === 'workflow1' && (
          <WorkflowBrowse onFeedbackContext={handleFeedbackContext} />
        )}
        {activeWorkflow === 'workflow2a' && (
          <WorkflowCurated onFeedbackContext={handleFeedbackContext} />
        )}
        {activeWorkflow === 'workflow2b' && (
          <WorkflowFiltered onFeedbackContext={handleFeedbackContext} />
        )}
      </main>

      {/* Feedback Widget */}
      <FeedbackWidget workflow={feedbackContext.workflow} screen={feedbackContext.screen} />
    </div>
  );
}