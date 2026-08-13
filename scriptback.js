// Starter Knowledge Base (8 Mock Documents)
const docPack = [
  { file: "01-onboarding-faq.md", keywords: ["workshop", "next", "time", "contact", "leader"], content: "Next workshop details and directory are available on the dashboard." },
  { file: "02-aws-account-setup.md", keywords: ["account", "billing", "setup", "credits"], content: "AWS account setup requires an active email and valid credit/debit card for billing." },
  { file: "03-builder-center-publish.md", keywords: ["publish", "builder center", "article"], content: "To publish on Builder Center, submit your article markdown at builder.aws.com with relevant tags." },
  { file: "04-bedrock-starter.md", keywords: ["bedrock", "ai", "llm", "model"], content: "Amazon Bedrock provides foundation models for generative AI app development." },
  { file: "05-hackathon-rules.md", keywords: ["hackathon", "rules", "team"], content: "Teams must consist of 2-3 students. 70% baseline is mandatory." },
  { file: "06-workshop-index.md", keywords: ["past workshops", "history"], content: "Index of all previous club workshops and slides." },
  { file: "07-lambda-patterns.md", keywords: ["lambda", "serverless", "api"], content: "Serverless API architectures using AWS Lambda and API Gateway." },
  { file: "08-sbg-community.md", keywords: ["sbg", "community", "chapter"], content: "About Student Builder Groups and chapter leadership details." }
];

const fallbackContact = "I could not find that in the club documents. Please contact Shanmukha Sasi Sadineni, AWS Student Builder Group Leader, at sadinenisasi@gmail.com or 7396025334.";

function showForgotPassword() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("forgot-form").style.display = "block";
}

function showLogin() {
  document.getElementById("forgot-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}

function login() {
  const email = document.getElementById("login-email").value;
  const pass = document.getElementById("login-password").value;
  if (email && pass) {
    document.getElementById("auth-section").style.display = "none";
    document.getElementById("chat-section").style.display = "block";
    addBotMessage("Hello! I am your Club Assistant. Ask me anything about our documents.");
  } else {
    alert("Please enter both email and password.");
  }
}

function logout() {
  document.getElementById("chat-section").style.display = "none";
  document.getElementById("auth-section").style.display = "block";
}

function resetPassword() {
  const email = document.getElementById("reset-email").value;
  if (email) {
    document.getElementById("reset-msg").innerText = "Reset link/code sent to " + email;
  } else {
    alert("Please enter your email address.");
  }
}

function sendMessage() {
  const input = document.getElementById("user-input");
  const text = input.value.trim().toLowerCase();
  if (!text) return;

  addUserMessage(input.value);
  input.value = "";

  // Search logic
  let match = docPack.find(doc => doc.keywords.some(kw => text.includes(kw)));

  setTimeout(() => {
    if (match) {
      addBotMessage(`${match.content}`, `Source: ${match.file}`);
    } else {
      addBotMessage(fallbackContact);
    }
  }, 500);
}

function addUserMessage(text) {
  const box = document.getElementById("chat-box");
  const div = document.createElement("div");
  div.className = "msg user-msg";
  div.innerText = text;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

function addBotMessage(text, source = null) {
  const box = document.getElementById("chat-box");
  const div = document.createElement("div");
  div.className = "msg bot-msg";
  div.innerText = text;
  if (source) {
    const srcSpan = document.createElement("span");
    srcSpan.className = "source-tag";
    srcSpan.innerText = source;
    div.appendChild(srcSpan);
  }
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}
