import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import {
  useLocalStorage,
  saveBookingData,
  getBookingData,
} from "../hooks/useLocalStorage";

interface BookingData {
  from: string;
  to: string;
  route: string;
  tickets: number;
  fare: number;
}

export default function BookingForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useLocalStorage<BookingData>(
    "busBookingForm",
    {
      from: "",
      to: "",
      route: "",
      tickets: 1,
      fare: 20.0,
    },
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const ticketData = {
      bookingData: formData,
      bookingTime: new Date().toLocaleString(),
    };

    // Save to localStorage
    saveBookingData(ticketData);

    // Navigate to ticket page with booking data
    navigate("/ticket", {
      state: ticketData,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "tickets"
          ? parseInt(value)
          : name === "fare"
            ? parseFloat(value)
            : value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Book Bus Ticket
          </h1>
          <p className="text-gray-600">Transport Dept. of Delhi</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="from"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <MapPin className="inline w-4 h-4 mr-1" />
                From
              </label>
              <input
                type="text"
                id="from"
                name="from"
                value={formData.from}
                onChange={handleInputChange}
                placeholder="Starting location"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            <div>
              <label
                htmlFor="to"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <MapPin className="inline w-4 h-4 mr-1" />
                To
              </label>
              <input
                type="text"
                id="to"
                name="to"
                value={formData.to}
                onChange={handleInputChange}
                placeholder="Destination"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            <div>
              <label
                htmlFor="route"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Bus Route
              </label>
              <input
                type="text"
                id="route"
                name="route"
                value={formData.route}
                onChange={handleInputChange}
                placeholder="Route number (e.g., 120)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            <div>
              <label
                htmlFor="tickets"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Number of Tickets
              </label>
              <select
                id="tickets"
                name="tickets"
                value={formData.tickets}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="fare"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Fare (₹)
              </label>
              <input
                type="number"
                id="fare"
                name="fare"
                value={formData.fare}
                onChange={handleInputChange}
                placeholder="Enter fare amount"
                step="0.01"
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-teal-600 hover:to-cyan-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
          >
            Book Ticket
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
