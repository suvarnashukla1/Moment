# **Volunteer Connect** 🤝

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/MongoDB-6.0-47A248?logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Express.js-4.18-000000?logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License">
</div>

<br>

**Volunteer Connect** bridges the gap between organizations/NGOs and volunteers by providing a seamless platform for event listings, volunteer matching, and donations. Organizations can post events, while volunteers discover opportunities tailored to their interests, location, and availability.

## **✨ Key Features**

### **🏢 For Organizations/NGOs**
✅ **List Events** – Add event details, requirements, and upload files (using **Multer**)  
✅ **AI Event Suggestions** – Get data-driven planning insights via **Groq API**  
✅ **Secure Auth** – JWT tokens + **OAuth** (Google/GitHub) for easy sign-in  
✅ **Donations** – Accept payments securely via **PayPal API**  
✅ **Smart Filtering** – Sort events by date, location, or time  

### **👥 For Volunteers**
✅ **Discover Events** – Browse by interest, location, or date  
✅ **One-Click Sign-Up** – Register via OAuth or email/password (JWT)  
✅ **Real-Time Updates** – Stay informed about new events or changes  

## **🛠️ Tech Stack**

| **Category** | **Technologies** |
|--------------|------------------|
| **Frontend** | React.js (Vite), Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose) |
| **Authentication** | JWT, OAuth (Google/GitHub) |
| **APIs** | Groq AI (Event suggestions), PayPal (Donations) |
| **File Upload** | Multer |

## **📋 Prerequisites**

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (v6.0 or higher)
- [Git](https://git-scm.com/)

## **🚀 Installation & Setup**

### **1. Clone the Repository**
```bash
git clone https://github.com/suvarnashukla1/Moment.git
cd Moment
```

### **2. Install Dependencies**
```bash
# Install all dependencies
npm install

# Or install frontend and backend separately
npm install --prefix frontend
npm install --prefix backend
```

### **3. Environment Configuration**
Create `.env` files in both frontend and backend directories:

**Backend `.env`:**
```env
# Database
MONGODB_URI=mongodb://localhost:27017/volunteer-connect

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# APIs
GROQ_API_KEY=your_groq_api_key
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret

# Server
PORT=5000
NODE_ENV=development
```

**Frontend `.env`:**
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
```

### **4. Database Setup**
Make sure MongoDB is running on your system:
```bash
# Start MongoDB service
mongod

# Or using MongoDB Atlas (cloud)
# Update MONGODB_URI in .env with your Atlas connection string
```

### **5. Run the Application**

**Development Mode:**
```bash
# Start backend server
npm run server
# or
npx nodemon index.js

# Start frontend development server (in new terminal)
npm run dev
# or
cd frontend && npm run dev
```

**Production Mode:**
```bash
# Build frontend
npm run build

# Start production server
npm start
```

## **📱 Usage**

1. **Access the Application:** Open `http://localhost:3000` in your browser
2. **Sign Up/Login:** Use OAuth (Google/GitHub) or email/password
3. **For Organizations:** Create events, manage volunteers, accept donations
4. **For Volunteers:** Browse events, register for activities, make donations

## **🌟 Problem It Solves**

### **For Volunteers**
🔹 **No more manual searches** – Find nearby events matching skills/interests  
🔹 **Flexible scheduling** – Filter by date/time to fit availability  
🔹 **Transparency** – Real-time updates on event status  

### **For Organizations**
🔹 **Reach the right volunteers** – AI-driven matching reduces no-shows  
🔹 **Streamlined management** – Automated sorting/filtering of participants  
🔹 **Fundraising boost** – Integrated PayPal donations  
