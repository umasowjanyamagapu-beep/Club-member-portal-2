// Smart Knowledge Base with Individual Directory Search
const teamMembers = [
  { name: "shanmukha sasi sadineni", role: "AWS Student Builder Group Leader", phone: "7396025334", email: "sadinenisasi@gmail.com", keywords: ["sasi", "shanmukha", "leader", "head"] },
  { name: "revan kumar goud bommagoni", role: "Technical Lead", phone: "8106105746", email: "brevankumargoud@gmail.com", keywords: ["revan", "technical lead", "tech lead"] },
  { name: "shaik suhail", role: "Technical Associate", phone: "8244793270", email: "N/A", keywords: ["suhail"] },
  { name: "katta naga sai nikhila", role: "Technical Associate", phone: "6302951898", email: "kattasainikhila@gmail.com", keywords: ["nikhila"] },
  { name: "rashesh reddy yarram", role: "Community Outreach & Engagement Director", phone: "8985468719", email: "yarramradheshreddy@gmail.com", keywords: ["rashesh", "outreach"] },
  { name: "palavari navyasree", role: "Community Outreach & Engagement Associate", phone: "6300489908", email: "navyasreepalavari@gmail.com", keywords: ["navyasree"] },
  { name: "panala aditya", role: "Events & Operations Director", phone: "9133770055", email: "N/A", keywords: ["aditya"] },
  { name: "bee bee reshma shaik", role: "Events & Operations Associate", phone: "9963098234", email: "beebeereshma.55@gmail.com", keywords: ["reshma", "bee bee"] },
  { name: "boda sandeep kumar", role: "Media & Creative Director", phone: "8019294885", email: "sandeepkumarboda777@gmail.com", keywords: ["sandeep", "media"] },
  { name: "grandhe veera venkata sravya", role: "Media & Creative Associate", phone: "6304651563", email: "grandheveeravenkatasravya@gmail.com", keywords: ["sravya"] },
  { name: "rokkala sahith", role: "Media & Creative Associate", phone: "9550694280", email: "rokkaladhoni410@gmail.com", keywords: ["sahith"] },
  { name: "chittukuri anil kumar", role: "Public Relations & Social Media Director", phone: "6281852558", email: "anilkumarchittuluri@gmail.com", keywords: ["anil", "pr"] },
  { name: "palukuru jeevanmai", role: "Public Relations & Social Media Associate", phone: "8142483559", email: "jeevanmaipalukuru@gmail.com", keywords: ["jeevanmai"] }
];

const docPack = [
  {
    file: "01-onboarding-faq.md",
    keywords: ["onboarding", "faq", "join", "meeting", "wednesdays", "cs building", "room 101"],
    content: "General meetings are Wednesdays at 6:00 PM in CS building, Room 101. Sign up on the portal with your campus email."
  },
  {
    file: "02-aws-account-setup.md",
    keywords: ["account", "aws account", "setup", "create", "billing", "free tier", "alerts", "iam"],
    content: "AWS Account Setup: Register at aws.amazon.com using personal/student email. AWS Free Tier offers 12 months. Enable billing alerts under preferences."
  },
  {
    file: "03-builder-center-publish.md",
    keywords: ["builder center", "publish", "article", "post", "blog", "tags", "builder.aws.com"],
    content: "Publish on Builder Center (builder.aws.com): Write an article with screenshots of sign-up, login, and chat. Tags: #aws-student-builders-groups #buildonaws #amazon-bedrock #rag."
  },
  {
    file: "04-bedrock-starter.md",
    keywords: ["bedrock", "amazon bedrock", "rag", "foundation model", "claude", "s3", "knowledge base"],
    content: "Amazon Bedrock: Managed service for foundation models and RAG pipelines (Ingest to S3 -> Index -> Retrieve -> Generate -> Cite)."
  },
  {
    file: "05-hackathon-rules.md",
    keywords: ["rule", "rules", "hackathon", "team", "submission", "demo", "pitch"],
    content: "Hackathon Rules: Teams of 2-3 students. Deliverables: 70% local demo, pitch deck on AWS deployment, and Builder Center article."
  },
  {
    file: "06-workshop-index.md",
    keywords: ["workshop", "workshops", "schedule", "jan 15", "jan 29", "feb 12", "feb 26", "mar 12", "next workshop"],
    content: "Workshops Schedule: Jan 15 (Intro to AWS), Jan 29 (Lambda), Feb 12 (RAG Chatbots on Bedrock - CS 204), Feb 26 (Publish Party), Mar 12 (Prep Clinic). Next Workshop: RAG Chatbots on Bedrock."
  },
  {
    file: "07-lambda-patterns.md",
    keywords: ["lambda", "serverless", "api", "api gateway", "routes", "/chat"],
    content: "Serverless API Patterns: Use AWS Lambda behind API Gateway for routes POST /auth/signup, POST /auth/forgot, and POST /chat."
  },
  {
    file: "08-sbg-community.md",
    keywords: ["sbg", "community", "chapter", "student builder group", "mission", "about"],
    content: "AWS Student Builder Groups: Campus initiative where students learn by building and share work on Builder Center."
  }
];

const fallbackContact = "I could not find that in the club documents. Please contact Shanmukha Sasi Sadineni, AWS Student Builder Group Leader, at sadinenisasi@gmail.com or 7396025334.";

let loggedInUser = null;

function switchTab(tab) {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const forgotForm = document.getElementById("forgot-form");
  const tabLoginBtn = document.getElementById("tab-login-btn");
  const tabSignupBtn = document.getElementById("tab-signup-btn");

  if (loginForm) loginForm.classList.add("hidden");
  if (signupForm) signupForm.classList.add("hidden");
  if (forgotForm) forgotForm.classList.add("hidden");
  if (tabLoginBtn) tabLoginBtn.classList.remove("active");
  if (tabSignupBtn) tabSignupBtn.classList.remove("active");

  if (tab === "login") {
    if (loginForm) loginForm.classList.remove("hidden");
    if (tabLoginBtn) tabLoginBtn.classList.add("active");
  } else if (tab === "signup") {
    if (signupForm) signupForm.classList.remove("hidden");
    if (tabSignupBtn) tabSignupBtn.classList.add("active");
  } else if (tab === "forgot") {
    if (forgotForm) forgotForm.classList.remove("hidden");
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

// Updated Search Algorithm (Checks Persons First, then Docs)
function findBestAnswer(query) {
  const cleanQuery = query.toLowerCase().trim();
  const words = cleanQuery.replace(/[^\w\s]/gi, '').split(/\s+/).filter(w => w.length > 0);

  // 1. First Search in Team Directory
  for (let person of teamMembers) {
    let matches = false;
    
    // Check keywords or full name match
    if (person.keywords.some(kw => cleanQuery.includes(kw))) matches = true;
    if (words.some(w => person.name.includes(w))) matches = true;

    if (matches) {
      let emailText = person.email !== "N/A" ? ` | Email: ${person.email}` : "";
      return `<b>${person.name.toUpperCase()}</b><br>Role: ${person.role}<br>Phone: ${person.phone}${emailText} <span class="source-tag">Source: 01-onboarding-faq.md</span>`;
    }
  }

  // 2. Search in Document Pack
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
