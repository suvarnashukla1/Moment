# 📌 Volunteer Connect  

Volunteer Connect is a platform where organizations and NGOs can list their events, and people in the nearby area can volunteer based on their interests. It provides a seamless experience for both organizers and volunteers by integrating various features to enhance event planning, participation, and donations.  

---

## 🚀 Features  

### 🎯 For Organizations/NGOs:  
✅ **List Events** – Add event details, requirements, and upload files via Multer.  
✅ **AI Event Suggestions** – Uses Groq API to provide event planning insights.  
✅ **Secure Authentication** – Login via JWT tokens and OAuth for convenience.  
✅ **Donation Integration** – Accepts donations via PayPal API.  
✅ **Event Sorting & Filtering** – Filter events by date, location, and time.  

### 🤝 For Volunteers:  
✅ **Browse & Choose Events** – Find events based on location & interest.  
✅ **Easy Registration** – Sign up via OAuth or JWT-based authentication.  
✅ **Real-time Event Listings** – Updated event details from organizations.  

---

## 🛠️ Tech Stack  

- **Frontend:** React.js + Vite, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT & OAuth  

### **APIs Used**  
- **Groq API** – AI-powered event suggestions  
- **PayPal API** – Secure donations  

---

## 📥 Installation  

Run the following commands to set up the project:  

```sh
# Clone the Repository  
git clone https://github.com/suvarnashukla1/Moment.git  

# Navigate to the project directory  
cd Moment  

# Install dependencies  
npm install  

# Start the frontend  
npm run dev  

# Start the backend  
npx nodemon index.js  
