import { X } from "lucide-react";
import { useState, useEffect } from "react";

export default function NewsletterModal({ open, onClose }) {
    const [email, setEmail] = useState("");
    const [visible, setVisible] = useState(false);

    // Handle enter / exit animation
    useEffect(() => {
        if (open) {
            setVisible(true);
        } else {
            setTimeout(() => setVisible(false), 200);
        }
    }, [open]);

    if (!open && !visible) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) return alert("Enter a valid email");

        console.log("Subscribed:", email);
        setEmail("");
        onClose();
    };

    return (
        <div
            onClick={onClose}
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-200
        ${open ? "opacity-100" : "opacity-0"}`}
        >
            {/* Modal */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={`relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl text-slate-900
          transform transition-all duration-200
          ${open ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-900"
                >
                    <X size={20} />
                </button>

                {/* Content */}
                <h3 className="text-2xl font-black tracking-tight mb-2">
                    Join Our Newsletter
                </h3>
                <p className="text-slate-600 text-sm mb-6">
                    Get ready-made templates, updates, and insights delivered monthly.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-100 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#31b8c6]"
                    />

                    <button
                        type="submit"
                        className="w-full px-6 py-4 bg-[#31b8c6] text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-[#279eaa] transition-all"
                    >
                        Subscribe
                    </button>
                </form>

                <p className="mt-4 text-xs text-slate-400 text-center">
                    No spam. Unsubscribe anytime.
                </p>
            </div>
        </div>
    );
}
