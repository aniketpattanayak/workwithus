import { useState } from "react";
import emailjs from "emailjs-com";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    whatsapp: "",
    email: "",
    location: "",
    business: "",
    queryAbout: "Website",
    minBudget: 9999,
    maxBudget: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (e) => {
    let minBudgetValue;
    if (e.target.value === "Website") minBudgetValue = 9999;
    else if (e.target.value === "App") minBudgetValue = 39999;
    else minBudgetValue = 49999;

    setFormData({
      ...formData,
      queryAbout: e.target.value,
      minBudget: minBudgetValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      name: formData.name,
      contact: formData.contact,
      whatsapp: formData.whatsapp,
      email: formData.email,
      location: formData.location,
      business: formData.business,
      queryAbout: formData.queryAbout,
      minBudget: formData.minBudget,
      maxBudget: formData.maxBudget,
    };

    emailjs
      .send(
        "service_kz1a1wi",
        "template_jeraeos",
        templateParams,
        "r_QpI7QihqD9mJqNl"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Your query has been sent successfully!");
          setIsSubmitted(true);
        },
        (err) => {
          console.log("FAILED...", err);
          alert("Something went wrong. Please try again.");
        }
      );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0C1A2A] p-4">
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold text-center text-[#0C1A2A] mb-6">
          Inquiry Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B6B6]"
            required
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B6B6]"
            required
          />
          <input
            type="text"
            name="whatsapp"
            placeholder="WhatsApp"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B6B6]"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B6B6]"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Your Location"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B6B6]"
            required
          />
          <input
            type="text"
            name="business"
            placeholder="Your Business"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B6B6]"
            required
          />

          <div className="space-y-2">
            <label className="block text-[#0C1A2A] font-medium">
              Query About:
            </label>
            <div className="flex space-x-4">
              {["Website", "App", "Both"].map((option) => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="queryAbout"
                    value={option}
                    onChange={handleRadioChange}
                    className="w-4 h-4"
                    checked={formData.queryAbout === option}
                    required
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex space-x-2">
            <input
              type="number"
              name="minBudget"
              value={formData.minBudget}
              readOnly
              className="w-1/2 p-3 border rounded-lg bg-gray-200 focus:outline-none"
            />
            <input
              type="number"
              name="maxBudget"
              placeholder="Your Budget"
              onChange={handleChange}
              min={formData.minBudget}
              className="w-1/2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B6B6]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-[#00B6B6] text-white font-semibold rounded-lg hover:bg-[#008C8C] transition duration-300"
          >
            Submit
          </button>
          <div className="text-xs text-center text-gray-600 mt-2">
            <p>
              <em>This form submission is not payable.</em>
            </p>
          </div>
        </form>
        {isSubmitted && (
          <div className="text-center mt-4">
            <a
              href="https://zoomsterhub.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block p-3 bg-[#00B6B6] text-white font-semibold rounded-lg hover:bg-[#008C8C] transition duration-300"
            >
              Visit Our Website
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
