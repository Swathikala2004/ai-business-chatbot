import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";
import "./Plans.css";

function Plans() {
  const payNow = async (amount, plan) => {
    try {
      const response = await API.post("/payments/create", {
        amount,
        plan
      });

      window.location.href = response.data.checkoutUrl;
    } catch (error) {
      alert("Payment failed to start");
      console.log(error);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Navbar />

        <div className="plans-page">
          <h2>Plans & Pricing</h2>
          <p>Choose the best plan for your business chatbot</p>

          <div className="plans-grid">
            <div className="plan-card">
              <h3>Free</h3>
              <h2>₹0</h2>
              <p>Basic chatbot demo</p>
              <button>Current Plan</button>
            </div>

            <div className="plan-card featured">
              <h3>Pro</h3>
              <h2>₹999/mo</h2>
              <p>Documents, leads, analytics</p>
              <button onClick={() => payNow(99900, "pro")}>
                Pay with PhonePe
              </button>
            </div>

            <div className="plan-card">
              <h3>Enterprise</h3>
              <h2>₹4999/mo</h2>
              <p>WhatsApp, custom AI, support</p>
              <button onClick={() => payNow(499900, "enterprise")}>
                Pay with PhonePe
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Plans;