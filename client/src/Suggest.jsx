import { useState, useEffect } from "react";

const Suggest = () => {
  const [suggestion, setSuggestion] = useState("");

  // Save data before refresh
window.addEventListener("beforeunload", () => {
  localStorage.setItem("pageState", window.location.href);
});

// Restore after refresh
window.addEventListener("DOMContentLoaded", () => {
  const savedPage = localStorage.getItem("pageState");
  if (savedPage && savedPage !== window.location.href) {
      window.location.href = savedPage;
  }
});

  useEffect(() => {
    fetch("http://localhost:5000/api/Suggest", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
    //
      .then(response => response.json())
      .then(data => setSuggestion(data.sugs.replace(/[:*]/g, ""))) // ✅ Clean special characters
      .catch(() => setSuggestion("Error fetching suggestion"));
  }, []);

  return (
    <>
    <div className="bg-red-400 w-full h-screen ">
      <h1 className="font-bold text-4xl text-center text-black mt-[50px] ">AI Suggestions</h1>
      <div className="ml-20 mr-20 mt-10 border border-black p-4 bg-white">{suggestion}</div>
      </div>
    </>
  );
};

export default Suggest;
