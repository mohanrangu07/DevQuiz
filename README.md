# 🚀 DevQuiz

DevQuiz is a full-stack quiz application built with **React** (frontend) and **Spring Boot** (backend). It provides categorized quizzes for Programming, Frontend, and Backend technologies, helping users improve their technical knowledge interactively.

---

## 📁 Project Structure

```
QuizApp/
├── Backend/           # Spring Boot backend
│   └── QuizApp/
│       ├── src/
│       ├── pom.xml
├── Databse/           # SQL scripts
│   └── TestApp.sql
├── my-quiz/           # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
```

---

## 🌐 Frontend (React)
- Built with **Vite + React**
- Categories: Programming, Frontend, Backend
- Features:
  - Choose topic and sub-topic
  - Select question count
  - Multiple-choice quiz
  - Score visualization

### ▶️ Run Frontend:
```bash
cd my-quiz
npm install
npm run dev
```

---

## 🔧 Backend (Spring Boot)
- RESTful API to fetch quiz questions
- Connects to SQL database

### ▶️ Run Backend:
```bash
cd Backend/QuizApp
./mvnw spring-boot:run
```

---

## 🧠 Sample Categories & Subcategories

### Programming:
- Java
- C++
- C
- Python

### Frontend:
- HTML
- CSS
- JavaScript
- React

### Backend:
- Node.js
- Spring Boot
- Django/Flask
- Ruby on Rails

---

## 💻 Technologies Used
- React (Vite)
- Tailwind CSS
- Spring Boot
- MySQL / SQL

---

## 📦 Setup Instructions
1. Clone the repo
```bash
git clone https://github.com/mohanrangu07/DevQuiz.git
cd DevQuiz
```
2. Configure database in `Backend/QuizApp/src/main/resources/application.properties`
3. Import SQL script from `Databse/TestApp.sql`
4. Start Backend and Frontend as shown above

---

## 🙌 Author
**Mohan Rangu**  
[GitHub](https://github.com/mohanrangu07)

