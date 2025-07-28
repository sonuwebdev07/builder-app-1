import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, AlertTriangle, QrCode } from "lucide-react";
import { getBookingData, saveTicketData } from "../hooks/useLocalStorage";

interface TicketData {
  bookingData: {
    from: string;
    to: string;
    route: string;
    tickets: number;
    fare: number;
  };
  bookingTime: string;
}

export default function Ticket() {
  const location = useLocation();
  const navigate = useNavigate();

  const ticketData = location.state as TicketData;

  // Try to get data from localStorage if no state data
  const savedBookingData = getBookingData();

  // Use data from navigation state, localStorage, or fallback to sample data
  const { bookingData, bookingTime } = ticketData ||
    savedBookingData || {
      bookingData: {
        from: "Khampur Village",
        to: "Narela Terminal",
        route: "120",
        tickets: 1,
        fare: 20.0,
      },
      bookingTime: "19 Jun, 25 | 04:46 PM",
    };

  // Generate ticket number and longer transaction ID
  const ticketNumber = `DL51EV${Math.floor(Math.random() * 10000)}`;
  const transactionId = `T${Math.floor(Math.random() * 1000000000).toString(16)}${Math.floor(Math.random() * 1000000000).toString(16)}${Date.now().toString(16)}`;
  const fare = bookingData.fare;
  const finalPrice = fare * 0.9145; // Small discount calculation

  // Save complete ticket data to localStorage
  const completeTicketData = {
    bookingData,
    bookingTime,
    ticketNumber,
    transactionId,
    fare,
    finalPrice,
  };

  // Save to localStorage when component mounts
  React.useEffect(() => {
    saveTicketData(completeTicketData);
  }, []);

  const qrData = JSON.stringify({
    ticketNumber,
    route: bookingData.route,
    from: bookingData.from,
    to: bookingData.to,
    fare,
    tickets: bookingData.tickets,
    bookingTime,
    transactionId,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 to-cyan-500">
      {/* Header */}
      <div className="flex items-center justify-between p-4 text-white">
        <button onClick={() => navigate("/")} className="flex items-center">
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-yellow-300" />
          <span className="text-sm">Issue with ticket?</span>
          <span className="ml-4 text-sm">View all tickets</span>
        </div>
      </div>

      {/* Ticket Card */}
      <div className="px-4 pb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mx-auto max-w-sm">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Transport Dept. of Delhi
            </h2>
          </div>

          {/* Ticket Number and Price */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-xl font-bold text-gray-800">{ticketNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-gray-800">₹{finalPrice}</p>
            </div>
          </div>

          <hr className="border-gray-300 mb-6" />

          {/* Route and Fare */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-600">Bus Route</p>
              <p className="text-lg font-semibold text-gray-800">
                {bookingData.route}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Fare</p>
              <p className="text-lg font-semibold text-gray-800">₹{fare}</p>
            </div>
          </div>

          {/* Booking Time and Tickets */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-600">Booking Time</p>
              <p className="text-base font-medium text-gray-800">
                {bookingTime}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Tickets</p>
              <p className="text-lg font-semibold text-gray-800">
                {bookingData.tickets}
              </p>
            </div>
          </div>

          {/* Starting Stop */}
          <div className="mb-4">
            <p className="text-sm text-gray-600">Starting stop</p>
            <p className="text-base font-medium text-gray-800">
              {bookingData.from}
            </p>
          </div>

          {/* Ending Stop */}
          <div className="mb-6">
            <p className="text-sm text-gray-600">Ending stop</p>
            <p className="text-base font-medium text-gray-800">
              {bookingData.to}
            </p>
          </div>

          {/* Transaction ID */}
          <div className="text-center mb-6">
            <p className="text-xs text-gray-500">{transactionId}</p>
          </div>

          {/* Show QR Code Button */}
          <button
            onClick={() => navigate("/qr-code", { state: { qrData } })}
            className="w-full bg-teal-100 hover:bg-teal-200 border-2 border-teal-400 text-teal-700 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            <QrCode className="w-5 h-5 mr-2" />
            Show QR code
          </button>

          {/* Footer */}
          <div className="text-center mt-6">
            <img src="assets/logo.png" alt="Logo" className="mx-auto h-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
