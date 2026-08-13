// Starter Knowledge Base (8 Mock Documents)
const docPack = [
  {
    file: "01-onboarding-faq.md",
    keywords: ["onboarding", "faq", "contact", "leader", "shanmukha", "sasi", "phone", "email", "help", "who", "lead"],
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

// UI Toggle Functions
function showForgotPassword() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("forgot-form").style.display = "block";
}

function showLogin() {
  document.getElementById("forgot-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}

// Smart Search Function
function findBestAnswer(userQuery) {
  const query = userQuery.toLowerCase().trim();
  const stopWords = ["is", "the", "a", "an", "how", "do", "i", "when", "what", "where", "can", "to", "in", "on", "for", "of", "my"];
  const words = query.split(/\s+/).filter(word => !stopWords.includes(word) && word.length > 1);

  let bestMatch = null;
  let highestScore = 0;

  docPack.forEach(doc => {
    let score = 0;

    // 1. Keyword Phrase Match
    doc.keywords.forEach(kw => {
      if (query.includes(kw.toLowerCase())) {
        score += 5;
      }
    });

    // 2. Individual Word Match
    words.forEach(word => {
      doc.keywords.forEach(kw => {
        if (kw.toLowerCase().includes(word)) {
          score += 2;
        }
      });
      if (doc.content.toLowerCase().includes(word)) {
        score += 1;
      }
    });

    if (score > highestScore) {
      highestScore = score;
      bestMatch = doc;
    }
  });

  if (bestMatch && highestScore >= 2) {
    return `${bestMatch.content}<br><br><strong>Source:</strong> ${bestMatch.file}`;
  } else {
    return `${fallbackContact}<br><br><strong>Source:</strong> 01-onboarding-faq.md`;
  }
}

// Chat Submission Handler
function handleChatSubmit(event) {
  if (event) event.preventDefault();
  
  const inputEl = document.getElementById("chat-input");
  if (!inputEl) return;
  
  const userText = inputEl.value.trim();
  if (!userText) return;

  // Append User Message
  appendMessage(userText, "user-message");
  inputEl.value = "";

  // Get AI Response
  const botAnswer = findBestAnswer(userText);

  setTimeout(() => {
    appendMessage(botAnswer, "bot-message");
  }, 300);
}

// Helper to Append Messages to Chat UI
function appendMessage(text, className) {
  const chatBox = document.getElementById("chat-box");
  if (!chatBox) return;

  const msgDiv = document.createElement("div");
  msgDiv.className = `message ${className}`;
  msgDiv.innerHTML = text;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
