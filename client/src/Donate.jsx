import React, { useEffect, useState } from 'react';

const Donate = () => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const donationAmount = 100.00; // Example donation amount
    setTotal(donationAmount);
  }, []);

  // PayPal Button rendering logic
  useEffect(() => {
    const paypalContainer = document.getElementById('paypal-button-container');

    // Only initialize PayPal button if there's a total amount
    if (total > 0 && window.paypal) {
      // Clear previous PayPal button instances
      paypalContainer.innerHTML = '';

      // Format the total to two decimal places
      const formattedTotal = total.toFixed(2); // Ensure total has two decimals

      // Create PayPal button with the provided total
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: formattedTotal, // Pass formatted total to PayPal
                },
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert(`Donation successful! Transaction ID: ${details.id}`);
          });
        },
        onError: (err) => {
          console.error('PayPal Checkout Error:', err);
          alert('Something went wrong with the donation. Please try again.');
        },
      }).render('#paypal-button-container'); // Render the PayPal button in this div
    }
  }, [total]); // Re-run whenever the total changes

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100">
      <h2 className="text-2xl font-semibold italic text-blue-800 mb-6">No one is more cherished in this world than someone who lightens the burden of another.Thank you</h2>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl text-gray-700 mb-4">Total Donation Amount: ₹{total.toFixed(2)}</h3>
        {total > 0 && (
          <div id="paypal-button-container" className="mt-4"></div>
        )}
      </div>
    </div>
  );
};

export default Donate;
