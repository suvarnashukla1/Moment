# **Volunteer Connect** 🤝



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

### ** Environment Configuration**
Create `.env` files in backend directory:


### ** Database Setup**
Make sure MongoDB is running on your system:
```bash
# Start MongoDB service


### ** Run the Application**

**Development Mode:**
```bash
# Start backend server
npm run server
# or
npx nodemon index.js

# Start frontend development server (in new terminal)
npm run dev
```


## **📱 Usage**

1. **Sign Up/Login:** Use OAuth (Google)
2. **For Organizations:** Create events, manage volunteers, accept donations
3. **For Volunteers:** Browse events, register for activities, make donations

## **🌟 Problem It Solves**

### **For Volunteers**
🔹 **No more manual searches** – Find nearby events matching skills/interests  
🔹 **Flexible scheduling** – Filter by date/time to fit availability  
🔹 **Transparency** – Real-time updates on event status  

### **For Organizations**
🔹 **Reach the right volunteers** – AI-driven matching reduces no-shows  
🔹 **Streamlined management** – Automated sorting/filtering of participants  
🔹 **Fundraising boost** – Integrated PayPal donations  
