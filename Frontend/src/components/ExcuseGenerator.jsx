import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Select from "react-select";

const ExcuseGenerator = () => {
  const [category, setCategory] = useState("");
  const [excuse, setExcuse] = useState("");
  const [showCard, setShowCard] = useState(false);

  const categoryOptions = [
    { value: "Work", label: "Work" },
    { value: "School", label: "School" },
    { value: "Office", label: "Office" },
    { value: "Social", label: "Social" },
  ];

  const handleGenerateExcuse = async () => {
    try {
      const response = await axios.post("http://localhost:5000/generate-excuse", { category });
      setExcuse(response.data.excuse);
      setShowCard(true);
    } catch (error) {
      console.error("Error generating excuse:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-pink-300 to-purple-400 p-10 rounded-xl">
      <h1 className="text-5xl font-extrabold text-white mb-4">Excuse-o-Matic ✨</h1>
      <p className="text-white text-lg font-light mb-8">
        Your AI-powered excuse generator for life&apos;s awkward moments
      </p>

      <div className="flex items-center gap-4 mb-6">
        <Select
          options={categoryOptions}
          className="w-40"
          placeholder="Select"
          onChange={(selectedOption) => setCategory(selectedOption?.value)}
          theme={(theme) => ({
            ...theme,
            borderRadius: 10,
            colors: {
              ...theme.colors,
              primary25: "#E9D5FF",
              primary: "#A855F7",
            },
          })}
          styles={{
            control: (base) => ({
              ...base,
              borderColor: "#A855F7",
              boxShadow: "0 0 5px rgba(168, 85, 247, 0.5)",
              "&:hover": {
                borderColor: "#9333EA",
              },
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isSelected ? "#A855F7" : state.isFocused ? "#EDE9FE" : "white",
              color: state.isSelected ? "white" : "#333",
              "&:hover": {
                backgroundColor: "#E9D5FF",
              },
            }),
          }}
        />
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
          onClick={handleGenerateExcuse}
        >
          Generate <span className="ml-1">⚡</span>
        </button>
      </div>

      {showCard && (
        <motion.div
          className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg border border-gray-200 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-gray-500 bg-gray-200 py-1 px-3 rounded">
              {category || "General"}
            </span>
          </div>
          <motion.p
            className="text-gray-800 text-2xl font-semibold text-center mb-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1.05 }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
          >
            {excuse || "No excuse yet!"}
          </motion.p>
          <div className="flex items-center justify-center gap-4">
            <button
              className="bg-green-100 hover:bg-green-200 text-green-600 font-medium px-4 py-2 rounded-lg shadow-sm transition hover:shadow-lg"
              onClick={() => alert("Excuse Liked!")}
            >
              👍 Like
            </button>
            <button
              className="bg-red-100 hover:bg-red-200 text-red-600 font-medium px-4 py-2 rounded-lg shadow-sm transition hover:shadow-lg"
              onClick={() => alert("Excuse Disliked!")}
            >
              👎 Dislike
            </button>
          </div>
          <div className="mt-4 flex justify-center">
            <button
              className="text-gray-500 hover:text-gray-700 flex items-center gap-2 text-sm"
              onClick={() => navigator.clipboard.writeText(excuse)}
            >
              📋 Copy Excuse
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ExcuseGenerator;
