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

## 🛠️ Tech Stack

### 🔮 Frontend

- ![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
- ![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
- ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge)
- ![React Navigation](https://img.shields.io/badge/React_Navigation-000000?style=for-the-badge&logo=react&logoColor=white)

### ⚙️ Backend

- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
- ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
- ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
- ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
- ![dotenv](https://img.shields.io/badge/dotenv-8DD6F9?style=for-the-badge)


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
