# Remindly AI

Remindly AI is an intelligent, AI-powered CRM tool that lets users manage contacts, notes, and reminders using natural language — making CRM as simple as having a conversation.

## ✨ Overview

Traditional CRMs can feel complex and clunky. Remindly AI streamlines the entire experience by letting users create and manage CRM data by just typing commands like:

> "Add a note for Sarah that she’s interested in the Pro Plan. Follow up next Monday."

The AI parses the instruction and executes the correct actions after a quick confirmation — from setting reminders to attaching notes to contacts.

---

## 🚀 Features

* **Natural Language Commands**: Manage your CRM with plain English instructions.
* **Contact Management**: Add, update, delete, and browse contacts.
* **Smart Notes**: Attach notes to contacts for personalized tracking.
* **AI Reminders**: Schedule and track reminders effortlessly.
* **Confirmation Workflow**: Approve AI-suggested actions before they’re saved.
* **Responsive UI**: Clean, accessible design with dark mode support.
* **Real-Time Feedback**: Toasts, loaders, and error messages for a smooth experience.

---

## 🧠 Tech Stack

* **Frontend**: Next.js, Tailwind CSS
* **Backend**: FastAPI (Python)
* **Database**: Supabase (PostgreSQL + Auth)
* **AI Engine**: OpenAI (natural language understanding and parsing)
* **DevOps**: Vercel (frontend), Supabase dashboard (DB & Auth), GitHub

---

## ⚙️ Setup & Installation

1. **Clone the repository**:

```bash
git clone https://github.com/yourusername/remindly-ai.git
cd remindly-ai
```

2. **Install frontend dependencies**:

```bash
cd frontend
npm install
```

3. **Run the frontend**:

```bash
npm run dev
```

4. **Run the backend (Python FastAPI)**:

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

---

## 🧪 Example Prompt

> "Remind me to call John tomorrow at 10am"

➡️ The assistant parses the request → shows a confirmation → creates a reminder under contact “John.”

---

## 📍 Roadmap

* [ ] Voice command support (Web Speech API)
* [ ] Smart suggestions & follow-ups
* [ ] Calendar/email integration
* [ ] Mobile PWA
* [ ] Multi-user/team collaboration
* [ ] AI-powered search & analytics

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

MIT

---

## 📬 Contact

Feel free to reach out via [LinkedIn](https://www.linkedin.com/in/abdullah-naeem-802518201/) or email at [abdullahnaeem0914@gmail.com](mailto:abdullahnaeem0914@gmail.com) for questions, collaborations, or consulting opportunities.

---

## 🌐 Live Demo

Coming Soon!
