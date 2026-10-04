import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { Icon } from "../../layouts/icons.jsx";
import "./AiGenerativeStudioPage.css";

export default function AiGenerativeStudioPage() {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState("");

  const firstName = (user?.name || "Pengguna").split(" ")[0];

  return (
    <div className="ags">
      <div className="ags__greeting">
        <p>Good morning, {firstName}.</p>
        <p>How can I help move your business forward today?</p>
      </div>

      <div className="ags__box">
        <textarea
          className="ags__input"
          placeholder="Ask me..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={2}
        />
        <div className="ags__toolbar">
          <button type="button" className="ags__tool">
            <Icon name="plus" />
          </button>
          <button type="button" className="ags__dropdown">
            Output <Icon name="chevronDown" />
          </button>
          <button type="button" className="ags__dropdown">
            AI Model <Icon name="chevronDown" />
          </button>
          <button type="button" className="ags__mic" aria-label="Rekam suara">
            <Icon name="mic" />
          </button>
        </div>
      </div>
    </div>
  );
}
