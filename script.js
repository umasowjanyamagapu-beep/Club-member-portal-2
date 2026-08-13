// Team Directory
const teamMembers = [
  { name: "shanmukha sasi sadineni", role: "AWS Student Builder Group Leader", phone: "7396025334", email: "sadinenisasi@gmail.com", keywords: ["sasi", "shanmukha", "leader"] },
  { name: "revan kumar goud bommagoni", role: "Technical Lead", phone: "8106105746", email: "brevankumargoud@gmail.com", keywords: ["revan", "technical lead"] },
  { name: "shaik suhail", role: "Technical Associate", phone: "8244793270", email: "N/A", keywords: ["suhail"] },
  { name: "katta naga sai nikhila", role: "Technical Associate", phone: "6302951898", email: "kattasainikhila@gmail.com", keywords: ["nikhila"] },
  { name: "rashesh reddy yarram", role: "Community Outreach & Engagement Director", phone: "8985468719", email: "yarramradheshreddy@gmail.com", keywords: ["rashesh"] },
  { name: "palavari navyasree", role: "Community Outreach & Engagement Associate", phone: "6300489908", email: "navyasreepalavari@gmail.com", keywords: ["navyasree"] },
  { name: "panala aditya", role: "Events & Operations Director", phone: "9133770055", email: "N/A", keywords: ["aditya"] },
  { name: "bee bee reshma shaik", role: "Events & Operations Associate", phone: "9963098234", email: "beebeereshma.55@gmail.com", keywords: ["reshma", "bee bee"] },
  { name: "boda sandeep kumar", role: "Media & Creative Director", phone: "8019294885", email: "sandeepkumarboda777@gmail.com", keywords: ["sandeep"] },
  { name: "grandhe veera venkata sravya", role: "Media & Creative Associate", phone: "6304651563", email: "grandheveeravenkatasravya@gmail.com", keywords: ["sravya"] },
  { name: "rokkala sahith", role: "Media & Creative Associate", phone: "9550694280", email: "rokkaladhoni410@gmail.com", keywords: ["sahith"] },
  { name: "chittukuri anil kumar", role: "Public Relations & Social Media Director", phone: "6281852558", email: "anilkumarchittuluri@gmail.com", keywords: ["anil"] },
  { name: "palukuru jeevanmai", role: "Public Relations & Social Media Associate", phone: "8142483559", email: "jeevanmaipalukuru@gmail.com", keywords: ["jeevanmai"] }
];

// Document Knowledge Base
let docPack = [
  { file: "01-onboarding-faq.md", keywords: ["onboarding", "faq", "join", "meeting", "wednesdays", "room 101"], content: "General meetings are Wednesdays at 6:00 PM in CS building, Room 101." },
  { file: "02-aws-account-setup.md", keywords: ["account", "aws", "setup", "billing", "free tier", "alerts"], content: "AWS Account Setup: Free Tier offers 12 months. Enable billing alerts under preferences." },
  { file: "03-builder-center-publish.md", keywords: ["builder", "center", "publish", "article", "tags"], content: "Publish on Builder Center (builder.aws.com). Include tags #aws-student-builders-groups #buildonaws." },
  { file: "04-bedrock-starter.md", keywords: ["bedrock", "rag", "ai", "claude"], content: "Amazon Bedrock: Foundation models and RAG pipelines." },
  { file: "05-hackathon-rules.md", keywords: ["rule", "rules", "hackathon", "team"], content: "Hackathon Rules: Teams of 2-3 students. Deliverables: local demo, pitch, and Builder Center article." },
  { file: "06-workshop-index.md", keywords: ["workshop", "workshops", "schedule", "next"], content: "Workshops: Feb 12 RAG Chatbots on Bedrock in CS 204." },
  { file: "07-lambda-patterns.md", keywords: ["lambda", "serverless", "api"], content: "Serverless APIs using AWS Lambda behind API Gateway." },
  { file: "08-sbg-community.md", keywords: ["sbg", "community", "chapter"], content: "AWS Student Builder Groups campus chapter." }
];

const fallbackContact = "I could not find that in the club documents. Please contact Shanmukha Sasi Sadineni, AWS Student Builder Group Leader, at sadinenisasi@gmail.com or 7396025334.";

let loggedInUser = null;

function switchTab(tab) {
  document.getElementById("login-form").classList.add("hidden");
  document.getElementById("signup-form").classList.add("hidden");
  document.getElementById("forgot-form").classList.add("hidden");
  document.getElementById("tab-login-btn").classList.remove("active");
  document.getElementById("tab-signup-btn").classList.remove("active");

  if (tab === "login") {
    document.getElementById("login-form").classList.remove("hidden");
    document.getElementById("tab-login-btn").classList.add("active");
  } else if (tab === "signup") {
    document.getElementById("signup-form").classList.remove("hidden");
    document.getElementById("tab-signup-btn").classList.add("active");
  } else if (tab === "forgot") {
    document.getElementById("forgot-form").classList.remove("hidden");
  }
}

function handleLogin(e) {
  if (e) e.preventDefault();
  const emailInput = document.getElementById("login-email");
  loggedInUser = emailInput && emailInput.value ? emailInput.value : "Member";
  showChat();
}

function handleSignup(e) {
  if (e) e.preventDefault();
  const emailInput = document.getElementById("signup-email");
  loggedInUser = emailInput && emailInput.value ? emailInput.value : "Member";
  showChat();
}

function handleForgot(e) {
  if (e) e.preventDefault();
  alert("Password reset code sent to your email!");
  switchTab("login");
}

function showChat() {
  document.getElementById("auth-section").classList.add("hidden");
  document.getElementById("chat-section").classList.remove("hidden");
  document.getElementById("user-display").innerText = loggedInUser;
  document.getElementById("logout-btn").classList.remove("hidden");
}

function logout() {
  loggedInUser = null;
  document.getElementById("auth-section").classList.remove("hidden");
  document.getElementById("chat-section").classList.add("hidden");
  document.getElementById("user-display").innerText = "Guest User";
  document.getElementById("logout-btn").classList.add("hidden");
  switchTab("login");
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById("doc-title-input").value = file.name;
    document.getElementById("doc-content-input").value = e.target.result;
  };
  reader.readAsText(file);
}

function addCustomDocument() {
  const title = document.getElementById("doc-title-input").value.trim();
  const content = document.getElementById("doc-content-input").value.trim();

  if (!title || !content) {
    alert("Please enter both Document Title and Content!");
    return;
  }

  const keywords = title.toLowerCase().split(/\s+/).concat(content.toLowerCase().split(/\s+/).slice(0, 10));

  docPack.push({
    file: title,
    keywords: keywords,
    content: content
  });

  document.getElementById("doc-badge").innerText = `Docs Loaded (${docPack.length}/${docPack.length})`;
  document.getElementById("doc-title-input").value = "";
  document.getElementById("doc-content-input").value = "";
  alert(`Document '${title}' published successfully to Knowledge Base!`);
}

// Improved Search Algorithm with Friendly Greetings Support
function findBestAnswer(query) {
  const cleanQuery = query.toLowerCase().trim();

  // 1. Check Common Greetings
  const greetings = ["hello", "hi", "hey", "greetings", "good morning", "good afternoon"];
  if (greetings.includes(cleanQuery)) {
    return "Hello! How can I assist you today with the AWS Student Builder Group documents, team members, or workshops?";
  }

  const words = cleanQuery.replace(/[^\w\s]/gi, '').split(/\s+/).filter(w => w.length > 0);

  // 2. Search Team Members
  for (let person of teamMembers) {
    let matches = person.keywords.some(kw => cleanQuery.includes(kw)) || words.some(w => person.name.includes(w));
    if (matches) {
      let emailText = person.email !== "N/A" ? ` | Email: ${person.email}` : "";
      return `<b>${person.name.toUpperCase()}</b><br>Role: ${person.role}<br>Phone: ${person.phone}${emailText} <span class="source-tag">Source: 01-onboarding-faq.md</span>`;
    }
  }

  // 3. Search Documents
  let bestDoc = null;
  let highestScore = 0;

  docPack.forEach(doc => {
    let score = 0;
    words.forEach(w => {
      doc.keywords.forEach(kw => {
        if (kw.toLowerCase().includes(w) || w.includes(kw.toLowerCase())) score += 5;
      });
      if (doc.content.toLowerCase().includes(w)) score += 3;
    });

    if (score > highestScore) {
      highestScore = score;
      bestDoc = doc;
    }
  });

  if (bestDoc && highestScore >= 1) {
    return `${bestDoc.content} <span class="source-tag">Source: ${bestDoc.file}</span>`;
  } else {
    return `${fallbackContact} <span class="source-tag">Source: 01-onboarding-faq.md</span>`;
  }
}

function handleChat(e) {
  if (e) e.preventDefault();
  const inputEl = document.getElementById("chat-input");
  if (!inputEl) return;

  const text = inputEl.value.trim();
  if (!text) return;

  appendMessage(text, "user-message");
  inputEl.value = "";

  const response = findBestAnswer(text);
  setTimeout(() => {
    appendMessage(response, "bot-message");
  }, 200);
}

function appendMessage(text, className) {
  const chatBox = document.getElementById("chat-box");
  if (!chatBox) return;

  const msg = document.createElement("div");
  msg.className = `message ${className}`;
  msg.innerHTML = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
