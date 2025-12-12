import { useNavigate, useLocation } from "react-router-dom";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FaceTimeCall() {
  const navigate = useNavigate();
  const location = useLocation();
  const personaName = location.state?.personaName || "Angry Karen";

  const handleEndCall = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        {personaName}
      </div>

      {/* Iframe container */}
      <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10">
        <iframe
          src="https://lab.anam.ai/frame/6pKNFx5uFi-Xozfz_cXmR"
          width="720"
          height="480"
          allow="microphone"
          className="border-0 max-w-full"
        />
      </div>

      {/* End Call button */}
      <Button
        onClick={handleEndCall}
        className="mt-8 bg-red-500 hover:bg-red-600 rounded-full w-16 h-16 p-0"
      >
        <Phone className="w-6 h-6 rotate-[135deg]" />
      </Button>
    </div>
  );
}
