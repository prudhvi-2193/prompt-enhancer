// Prompt Enhancement Engine
class PromptEnhancer {
    constructor() {
        this.strategies = {
            code: this.enhanceCodePrompt.bind(this),
            creative: this.enhanceCreativePrompt.bind(this),
            analysis: this.enhanceAnalysisPrompt.bind(this),
            business: this.enhanceBusinessPrompt.bind(this),
            general: this.enhanceGeneralPrompt.bind(this)
        };
    }

    enhance(text, type = 'general') {
        if (!text || text.trim().length === 0) {
            return null;
        }

        const strategy = this.strategies[type] || this.strategies.general;
        return strategy(text.trim());
    }

    enhanceCodePrompt(text) {
        const sections = [];
        
        sections.push("**Task**: Create a " + this.extractMainGoal(text));
        
        sections.push("\n**Requirements**:");
        sections.push("- Implement clean, maintainable, and well-documented code");
        sections.push("- Follow best practices and design patterns");
        sections.push("- Ensure responsive design (if applicable)");
        sections.push("- Include error handling and edge cases");
        
        if (this.mentionsUI(text)) {
            sections.push("\n**UI/UX Specifications**:");
            sections.push("- Modern, intuitive interface");
            sections.push("- Smooth animations and transitions");
            sections.push("- Accessible (WCAG 2.1 compliant)");
            sections.push("- Mobile-responsive design");
        }
        
        sections.push("\n**Technical Details**:");
        sections.push("- Use modern JavaScript (ES6+)");
        sections.push("- Optimize for performance");
        sections.push("- Add inline comments for complex logic");
        sections.push("- Follow naming conventions");
        
        sections.push("\n**Deliverables**:");
        sections.push("- Complete, working code");
        sections.push("- Brief explanation of key implementation decisions");
        sections.push("- Any dependencies or setup instructions");
        
        return sections.join("\n");
    }

    enhanceCreativePrompt(text) {
        const sections = [];
        
        sections.push("**Creative Brief**: " + this.capitalizeFirst(text));
        
        sections.push("\n**Style & Tone**:");
        sections.push("- Engaging and immersive narrative");
        sections.push("- Vivid, descriptive language");
        sections.push("- Consistent voice throughout");
        sections.push("- Emotionally resonant");
        
        sections.push("\n**Structure**:");
        sections.push("- Clear beginning, middle, and end");
        sections.push("- Well-developed characters (if applicable)");
        sections.push("- Compelling conflict or central theme");
        sections.push("- Satisfying resolution");
        
        sections.push("\n**Creative Elements**:");
        sections.push("- Rich sensory details");
        sections.push("- Unique perspective or angle");
        sections.push("- Memorable imagery and metaphors");
        sections.push("- Authentic dialogue (if applicable)");
        
        sections.push("\n**Length**: Approximately 500-800 words");
        
        sections.push("\n**Audience**: General readers interested in " + this.extractTopic(text));
        
        return sections.join("\n");
    }

    enhanceAnalysisPrompt(text) {
        const sections = [];
        
        sections.push("**Analysis Objective**: " + this.capitalizeFirst(text));
        
        sections.push("\n**Scope**:");
        sections.push("- Comprehensive examination of key factors");
        sections.push("- Data-driven insights");
        sections.push("- Multiple perspectives considered");
        sections.push("- Current trends and patterns");
        
        sections.push("\n**Methodology**:");
        sections.push("- Systematic approach to analysis");
        sections.push("- Evidence-based conclusions");
        sections.push("- Comparison of relevant data points");
        sections.push("- Identification of correlations and causations");
        
        sections.push("\n**Deliverables**:");
        sections.push("1. Executive summary");
        sections.push("2. Detailed analysis with supporting data");
        sections.push("3. Key findings and insights");
        sections.push("4. Actionable recommendations");
        sections.push("5. Future outlook and predictions");
        
        sections.push("\n**Format**:");
        sections.push("- Clear section headings");
        sections.push("- Bullet points for key insights");
        sections.push("- Data visualizations (if applicable)");
        sections.push("- Citations for sources (if applicable)");
        
        return sections.join("\n");
    }

    enhanceBusinessPrompt(text) {
        const sections = [];
        
        sections.push("**Business Objective**: " + this.capitalizeFirst(text));
        
        sections.push("\n**Context**:");
        sections.push("- Industry: [Specify relevant industry]");
        sections.push("- Target audience: [Define stakeholders]");
        sections.push("- Business goals: [Align with strategic objectives]");
        sections.push("- Timeline: [Specify urgency/deadlines]");
        
        sections.push("\n**Requirements**:");
        sections.push("- Professional, business-appropriate tone");
        sections.push("- Clear, concise communication");
        sections.push("- Data-driven decision making");
        sections.push("- ROI considerations");
        
        sections.push("\n**Deliverables**:");
        sections.push("- Executive summary");
        sections.push("- Detailed proposal/plan");
        sections.push("- Risk assessment");
        sections.push("- Success metrics and KPIs");
        sections.push("- Implementation roadmap");
        
        sections.push("\n**Format**:");
        sections.push("- Professional business document structure");
        sections.push("- Clear headings and sections");
        sections.push("- Supporting data and evidence");
        sections.push("- Actionable next steps");
        
        return sections.join("\n");
    }

    enhanceGeneralPrompt(text) {
        const sections = [];
        
        sections.push("**Request**: " + this.capitalizeFirst(text));
        
        sections.push("\n**Context**:");
        sections.push("Please provide a comprehensive response that:");
        sections.push("- Addresses the core question or request");
        sections.push("- Includes relevant background information");
        sections.push("- Considers multiple perspectives");
        sections.push("- Provides practical, actionable insights");
        
        sections.push("\n**Format**:");
        sections.push("- Clear, well-organized structure");
        sections.push("- Logical flow of information");
        sections.push("- Examples or illustrations where helpful");
        sections.push("- Summary of key points");
        
        sections.push("\n**Tone**: Professional yet approachable");
        
        sections.push("\n**Length**: Detailed enough to be thorough, concise enough to be readable");
        
        return sections.join("\n");
    }

    // Helper methods
    extractMainGoal(text) {
        // Remove common starting words and clean up
        const cleaned = text.toLowerCase()
            .replace(/^(create|make|build|develop|write|generate|design)\s+/i, '')
            .trim();
        return cleaned;
    }

    extractTopic(text) {
        // Extract the main topic from the text
        const words = text.toLowerCase().split(' ');
        const stopWords = ['a', 'an', 'the', 'about', 'write', 'create', 'make'];
        const meaningfulWords = words.filter(w => !stopWords.includes(w));
        return meaningfulWords.slice(0, 3).join(' ');
    }

    capitalizeFirst(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    mentionsUI(text) {
        const uiKeywords = ['page', 'interface', 'ui', 'website', 'app', 'form', 'button', 'design'];
        return uiKeywords.some(keyword => text.toLowerCase().includes(keyword));
    }

    calculateMetrics(originalText, enhancedText) {
        const originalLength = originalText.length;
        const enhancedLength = enhancedText.length;
        
        // Clarity score based on structure and detail
        const hasStructure = enhancedText.includes('**') && enhancedText.includes('\n');
        const hasBulletPoints = enhancedText.includes('-');
        const clarityScore = hasStructure && hasBulletPoints ? '95%' : '75%';
        
        // Detail level based on length increase
        const lengthIncrease = enhancedLength / originalLength;
        let detailLevel = 'Low';
        if (lengthIncrease > 10) detailLevel = 'Very High';
        else if (lengthIncrease > 7) detailLevel = 'High';
        else if (lengthIncrease > 4) detailLevel = 'Medium';
        
        return {
            clarityScore,
            detailLevel,
            characterCount: enhancedLength
        };
    }
}

// Example prompts database
const examplePrompts = {
    code: {
        before: "create a login page",
        after: "Create a modern, responsive login page with the following specifications:\n\n**Requirements**:\n- Email and password input fields\n- Form validation with error messages\n- 'Remember me' checkbox\n- 'Forgot password' link\n- Social login options (Google, GitHub)\n\n**Design**:\n- Clean, minimalist interface\n- Smooth animations on interactions\n- Mobile-responsive layout\n- Accessibility compliant\n\n**Technical**:\n- HTML5 semantic markup\n- CSS3 with flexbox/grid\n- Vanilla JavaScript for validation\n- Password visibility toggle\n\n**Deliverables**:\n- Complete HTML, CSS, and JavaScript files\n- Working form validation\n- Responsive design for all screen sizes"
    },
    creative: {
        before: "write a story about space",
        after: "Write an engaging science fiction short story set in deep space with the following elements:\n\n**Setting**:\n- Distant future, aboard a generation ship\n- Journey to a new habitable planet\n- Isolated from Earth for decades\n\n**Characters**:\n- A curious engineer who discovers something unusual\n- Supporting crew members with conflicting motivations\n- Well-developed personalities and backgrounds\n\n**Plot**:\n- Mysterious signal or anomaly detected\n- Tension builds as crew investigates\n- Unexpected revelation that changes everything\n- Satisfying resolution with emotional impact\n\n**Style**:\n- Vivid descriptions of space and technology\n- Balance of action and character development\n- Sense of wonder and isolation\n- Thought-provoking themes\n\n**Length**: 1500-2000 words"
    },
    analysis: {
        before: "analyze market trends",
        after: "Conduct a comprehensive analysis of current market trends with the following structure:\n\n**Scope**:\n- Technology sector focus (specify sub-sector)\n- Last 12-24 months of data\n- Global and regional perspectives\n- Competitive landscape\n\n**Analysis Components**:\n1. Market size and growth rates\n2. Key drivers and inhibitors\n3. Emerging technologies and innovations\n4. Consumer behavior shifts\n5. Regulatory impacts\n\n**Methodology**:\n- Data from reputable sources\n- Statistical analysis of trends\n- Comparison with historical patterns\n- Expert opinions and forecasts\n\n**Deliverables**:\n- Executive summary (200 words)\n- Detailed findings with supporting data\n- Visual charts/graphs\n- Key insights and patterns\n- Future predictions (6-12 months)\n- Actionable recommendations"
    }
};

// DOM Elements
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const enhanceBtn = document.getElementById('enhanceBtn');
const copyBtn = document.getElementById('copyBtn');
const promptTypeSelector = document.getElementById('promptType');
const inputCharCount = document.getElementById('inputCharCount');
const outputCharCount = document.getElementById('outputCharCount');
const clarityScore = document.getElementById('clarityScore');
const detailLevel = document.getElementById('detailLevel');
const enhancementMetrics = document.getElementById('enhancementMetrics');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notificationText');

// Initialize enhancer
const enhancer = new PromptEnhancer();

// Event Listeners
inputText.addEventListener('input', () => {
    const count = inputText.value.length;
    inputCharCount.textContent = `${count} character${count !== 1 ? 's' : ''}`;
});

enhanceBtn.addEventListener('click', enhancePrompt);

copyBtn.addEventListener('click', copyToClipboard);

// Example buttons
document.querySelectorAll('.try-example-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.example-card');
        const type = card.dataset.type;
        const example = examplePrompts[type];
        
        if (example) {
            inputText.value = example.before;
            promptTypeSelector.value = type;
            inputCharCount.textContent = `${example.before.length} characters`;
            
            // Scroll to input
            inputText.scrollIntoView({ behavior: 'smooth', block: 'center' });
            inputText.focus();
            
            // Auto-enhance after a short delay
            setTimeout(() => {
                enhancePrompt();
            }, 500);
        }
    });
});

// Functions
function enhancePrompt() {
    const input = inputText.value.trim();
    const type = promptTypeSelector.value;
    
    if (!input) {
        showNotification('Please enter some text first!', 'warning');
        return;
    }
    
    // Add loading state
    enhanceBtn.disabled = true;
    enhanceBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2" stroke-dasharray="50" stroke-dashoffset="0"><animateTransform attributeName="transform" type="rotate" from="0 10 10" to="360 10 10" dur="1s" repeatCount="indefinite"/></circle></svg> Enhancing...';
    
    // Simulate processing time for better UX
    setTimeout(() => {
        const enhanced = enhancer.enhance(input, type);
        
        if (enhanced) {
            // Display enhanced prompt
            outputText.innerHTML = formatEnhancedPrompt(enhanced);
            
            // Calculate and display metrics
            const metrics = enhancer.calculateMetrics(input, enhanced);
            clarityScore.textContent = metrics.clarityScore;
            detailLevel.textContent = metrics.detailLevel;
            outputCharCount.textContent = metrics.characterCount;
            enhancementMetrics.style.display = 'flex';
            
            // Show success notification
            showNotification('Prompt enhanced successfully!', 'success');
        }
        
        // Reset button
        enhanceBtn.disabled = false;
        enhanceBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2L12 8L18 10L12 12L10 18L8 12L2 10L8 8L10 2Z" fill="currentColor"/></svg> Enhance Prompt';
    }, 800);
}

function formatEnhancedPrompt(text) {
    // Convert markdown-style formatting to HTML
    let formatted = text
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>')
        .replace(/^- (.+)$/gm, '<div style="padding-left: 1.5rem; position: relative;"><span style="position: absolute; left: 0;">•</span> $1</div>');
    
    return `<div style="line-height: 1.8;">${formatted}</div>`;
}

function copyToClipboard() {
    const textContent = outputText.innerText;
    
    if (!textContent || textContent.includes('Your enhanced prompt will appear here')) {
        showNotification('Nothing to copy yet!', 'warning');
        return;
    }
    
    navigator.clipboard.writeText(textContent).then(() => {
        showNotification('Copied to clipboard!', 'success');
        
        // Visual feedback on button
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fill="currentColor"/></svg> Copied!';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
        }, 2000);
    }).catch(err => {
        showNotification('Failed to copy. Please try again.', 'error');
        console.error('Copy failed:', err);
    });
}

function showNotification(message, type = 'success') {
    notificationText.textContent = message;
    
    // Change color based on type
    if (type === 'warning') {
        notification.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
    }
    
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to enhance
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        enhancePrompt();
    }
    
    // Ctrl/Cmd + C when output is focused
    if ((e.ctrlKey || e.metaKey) && e.key === 'c' && document.activeElement === outputText) {
        copyToClipboard();
    }
});

// Initialize
console.log('🚀 Prompt Enhancement Agent initialized!');
console.log('💡 Tip: Press Ctrl+Enter to enhance your prompt quickly!');
