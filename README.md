# 💡 Smart SIP - Smarter Investment Planning

Smart SIP is a financial planning application that helps users achieve their investment goals by suggesting the best mutual fund SIP (Systematic Investment Plan) combinations. It considers factors like investment duration, risk preference, and expected returns to recommend optimal fund allocations or notify the user if the goal is unachievable.

---

## 🚀 Features

- 🔐 User Authentication (Login, Signup)
- 📈 SIP Future Value Calculator
- 🧠 Smart SIP Suggestions based on:
  - Risk Preference (Low, Medium, High)
  - Investment Duration
  - Target Amount
- 📊 Real-time Mutual Fund Data (NAV, CAGR, Fund Type)
- 🎯 Personalized Fund Combinations
- ⚠️ Goal Feasibility Alerts

---

## 🛠️ Tech Stack

### 🔮 Frontend (React Native + Expo)
- React Native with TypeScript – cross-platform mobile app development
- Expo CLI – easy development and deployment
- Axios – for API integration
- React Navigation – seamless screen transitions
- Styled Components / Custom Styles – for consistent UI

### ⚙️ Backend (Node.js + Express)
- Node.js + Express.js – RESTful API server
- MongoDB with Mongoose – NoSQL database for user and fund data
- JWT – secure token-based authentication
- CORS, dotenv, body-parser – essential middlewares

---

## 📂 Project Structure
<pre> ```
Smart-SIP/
│
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── utils/
│ └── server.js
│
├── frontend/
│ ├── components/
│ ├── screens/
│ ├── navigation/
│ ├── services/
│ └── App.tsx
│
├── README.md
``` </pre>

---

## ⚙️ Installation

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Add your MongoDB URI and JWT_SECRET in .env
npm start
