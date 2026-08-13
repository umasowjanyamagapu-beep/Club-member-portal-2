// Starter Knowledge Base (8 Mock Documents)
const docPack = [
  {
    file: "01-onboarding-faq.md",
    keywords: ["onboarding", "faq", "contact", "leader", "shanmukha", "sasi", "phone", "email", "help", "who", "lead", "contact"],
    content: "Campus AWS Student Builder Group Leader: Shanmukha Sasi Sadineni (sadinenisasi@gmail.com | 7396025334)."
  },
  {
    file: "02-aws-account-setup.md",
    keywords: ["account", "billing", "setup", "credits", "free tier", "create", "aws account"],
    content: "Set up your AWS account using your student email to activate AWS Educate or AWS Free Tier options."
  },
  {
    file: "03-builder-center-publish.md",
    keywords: ["builder center", "publish", "article", "post", "blog", "tags", "how to publish"],
    content: "To publish on Builder Center: Write your project details, add screenshots, include tags #aws-student-builders-groups #buildonaws, and publish at builder.aws.com."
  },
  {
    file: "04-bedrock-starter.md",
    keywords: ["bedrock", "ai", "llm", "model", "claude", "genai", "generative ai"],
    content: "Amazon Bedrock provides API access to generative AI foundation models like Claude for building chatbots and RAG applications."
  },
  {
    file: "05-hackathon-rules.md",
    keywords: ["rule", "rules", "team", "hackathon", "submission", "members", "size", "pitch"],
    content: "Hackathon Rules: Teams must consist of 2-3 students. Deliverables include 70% baseline local demo, pitch deck, and Builder Center article."
  },
  {
    file: "06-workshop-index.md",
    keywords: ["workshop", "workshops", "next workshop", "schedule", "event", "when", "time", "date"],
    content: "The next workshop on 'AWS Bedrock & RAG Integration' is scheduled for Friday at 4:00 PM in Lab 3."
  },
  {
    file: "07-lambda-patterns.md",
    keywords: ["lambda", "serverless", "api", "function", "backend", "code"],
    content: "Use AWS Lambda for serverless backend functionality without managing servers."
  },
  {
    file: "08-sbg-community.md",
    keywords: ["community", "chapter", "sbg", "club", "student builder group", "about"],
    content: "AWS Student Builder Groups foster peer learning, open-source building, and cloud innovation across university campuses."
  }
];

const fallbackContact = "I could not find that in the club documents. Please contact Shanmukha Sasi Sadineni, AWS Student Builder Group Leader, at sadinenisasi@gmail.com or 7396025334.";

// Flexible Smart Search Function
function findBestAnswer(userQuery) {
  const query = userQuery.toLowerCase().trim();
  const stopWords = ["is", "the", "a", "an", "how", "do", "i", "when", "what", "where", "can", "to", "in", "on", "for", "of", "my", "tell", "me", "about"];
  const words = query.split(/\s+/).filter(word => !stopWords.includes(word) && word.length > 0);

  let bestMatch = null;
  let highestScore = 0;

  docPack.forEach(doc => {
    let score = 0;

    // 1. Keyword Matches
    doc.keywords.forEach(kw => {
      if (query.includes(kw.toLowerCase())) {
        score += 5;
      }
    });

    // 2. Individual Word Matching across content & keywords
    words.forEach(word => {
      doc.keywords.forEach(kw => {
        if (kw.toLowerCase().includes(word)) score += 2;
      });
      if (doc.content.toLowerCase().includes(word)) {
        score += 2;
      }
    });

    if (score > highestScore) {
      highestScore = score;
      bestMatch = doc;
    }
  });

  if (bestMatch && highestScore >= 1) {
    return `${bestMatch.content}<br><br><strong>Source:</strong> ${bestMatch.file}`;
  } else {
    return `${fallbackContact}<br><br><strong>Source:</strong> 01-onboarding-faq.md`;
  }
}

// Global Event Listener to attach submit handling dynamically
document.addEventListener("DOMContentLoaded", () => {
  const chatForm = document.querySelector("form") || document.getElementById("chat-form");
  
  // Attach Submit Handler
  window.handleChatSubmit = function(event) {
    if (event) event.preventDefault();
    
    const inputEl = document.querySelector('input[type="text"]') || document.getElementById("chat-input");
    if (!inputEl) return;
    
    const userText = inputEl.value.trim();
    if (!userText) return;

    // Show User Message
    appendMessage(userText, "user-message");
    inputEl.value = "";

    // Generate Answer
    const botAnswer = findBestAnswer(userText);

    setTimeout(() => {
      appendMessage(botAnswer, "bot-message");
    }, 300);
  };
});

// Message Append Utility
function appendMessage(text, className) {
  const chatBox = document.getElementById("chat-box") || document.querySelector(".chat-box") || document.querySelector(".messages");
  if (!chatBox) return;

  const msgDiv = document.createElement("div");
  msgDiv.className = `message ${className}`;
  msgDiv.style.margin = "8px 0";
  msgDiv.style.padding = "10px";
  msgDiv.style.borderRadius = "6px";
  msgDiv.style.background = className.includes("user") ? "#2563eb" : "#334155";
  msgDiv.style.color = "#fff";
  
  msgDiv.innerHTML = text;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
