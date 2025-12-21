import { Instagram, MessageCircle } from "lucide-react";

const WhatsAppFloatingButton = () => {
  return (
    <div>
      <a
        href="https://wa.me/916232389832?text=Hi!%20I%20need%20help"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-emerald-500 hover:bg-emerald-600 p-4 rounded-full shadow-xl transition-transform hover:scale-110 z-50"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>

       {/* <a
      href={"https://ig.me/m/true_pin2"}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full shadow-md transition-transform hover:scale-105"
    >
      <Instagram className="w-5 h-5" />
      Message us on Instagram
    </a> */}
    </div>
  );
};

export default WhatsAppFloatingButton;
