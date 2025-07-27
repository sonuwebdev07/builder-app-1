import { useState, useEffect } from "react";
import QRCode from "qrcode";
import { X } from "lucide-react";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketData: string;
}

export default function QRCodeModal({
  isOpen,
  onClose,
  ticketData,
}: QRCodeModalProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  useEffect(() => {
    if (isOpen && ticketData) {
      QRCode.toDataURL(ticketData, {
        width: 200,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      })
        .then((url) => setQrCodeUrl(url))
        .catch((err) => console.error(err));
    }
  }, [isOpen, ticketData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-xs w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Ticket QR Code
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex justify-center mb-4">
          {qrCodeUrl && (
            <img src={qrCodeUrl} alt="Ticket QR Code" className="w-48 h-48" />
          )}
        </div>

        <p className="text-sm text-gray-600 text-center mb-4">
          Show this QR code to the conductor for ticket verification
        </p>

        <button
          onClick={onClose}
          className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
