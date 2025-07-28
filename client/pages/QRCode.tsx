import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import QRCodeLib from "qrcode";
import { getTicketData } from "../hooks/useLocalStorage";

export default function QRCode() {
  const location = useLocation();
  const navigate = useNavigate();
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  const qrData = location.state?.qrData;

  // Try to get ticket data from localStorage if no QR data provided
  const savedTicketData = getTicketData();

  useEffect(() => {
    let dataToUse = qrData;

    // If no QR data, try to create it from saved ticket data
    if (!dataToUse && savedTicketData) {
      dataToUse = JSON.stringify({
        ticketNumber: savedTicketData.ticketNumber,
        route: savedTicketData.bookingData.route,
        from: savedTicketData.bookingData.from,
        to: savedTicketData.bookingData.to,
        fare: savedTicketData.fare,
        tickets: savedTicketData.bookingData.tickets,
        bookingTime: savedTicketData.bookingTime,
        transactionId: savedTicketData.transactionId,
      });
    }

    if (!dataToUse) {
      navigate("/");
      return;
    }

    QRCodeLib.toDataURL(dataToUse, {
      width: 300,
      margin: 3,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    })
      .then((url) => setQrCodeUrl(url))
      .catch((err) => console.error(err));
  }, [qrData, savedTicketData, navigate]);

  if (!qrData && !savedTicketData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 to-cyan-500">
      {/* Header */}
      <div className="flex items-center p-4 text-white">
        <button onClick={() => navigate(-1)} className="flex items-center mr-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold">Ticket QR Code</h1>
      </div>

      {/* QR Code Content */}
      <div className="px-4 pb-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 mx-auto max-w-sm text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Your Ticket QR Code
          </h2>

          <div className="flex justify-center mb-6">
            {qrCodeUrl && (
              <img
                src={qrCodeUrl}
                alt="Ticket QR Code"
                className="w-72 h-72 border rounded-lg"
              />
            )}
          </div>

          <p className="text-sm text-gray-600 mb-6">
            Show this QR code to the conductor for ticket verification
          </p>

          <div className="text-center">
            <img src="logo.png" alt="Logo" className="mx-auto h-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
