"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

interface AuthModalProps {
  onClose: () => void;
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [recoveryPhrase, setRecoveryPhrase] = useState("");
  const [showRecovery, setShowRecovery] = useState(false);
  const [generatedPhrase, setGeneratedPhrase] = useState("");

  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isLogin) {
        await login(username, password);
        toast.success("Login successful!");
      } else {
        if (!showRecovery) {
          const phrase = generateRecoveryPhrase();
          setGeneratedPhrase(phrase);
          setShowRecovery(true);
          return;
        } else {
          if (recoveryPhrase === generatedPhrase) {
            await register(username, password);
            toast.success("Registration successful!");
          } else {
            toast.error("Recovery phrase does not match");
            return;
          }
        }
      }
      onClose();
    } catch (error) {
      toast.error(isLogin ? "Login failed" : "Registration failed");
    }
  };

  const generateRecoveryPhrase = () => {
    const words = [
      "abandon",
      "ability",
      "able",
      "about",
      "above",
      "absent",
      "absorb",
      "abstract",
      "absurd",
      "abuse",
      "access",
      "accident",
      "account",
      "accuse",
      "achieve",
      "acid",
      "acoustic",
      "acquire",
      "across",
      "act",
    ];
    const phrase = [];
    for (let i = 0; i < 12; i++) {
      phrase.push(words[Math.floor(Math.random() * words.length)]);
    }
    return phrase.join(" ");
  };

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setRecoveryPhrase("");
    setShowRecovery(false);
    setGeneratedPhrase("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-secondary rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {isLogin ? "Login" : "Register"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        {!showRecovery ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-accent focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-accent focus:outline-none"
                required
              />
            </div>

            <button type="submit" className="w-full btn-primary">
              {isLogin ? "Login" : "Continue"}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-gray-800 rounded border border-accent">
              <h3 className="font-semibold mb-2">Recovery Phrase</h3>
              <p className="text-sm text-gray-300 mb-3">
                Write down this 12-word recovery phrase. You'll need it to
                recover your account.
              </p>
              <div className="bg-gray-900 p-3 rounded font-mono text-sm">
                {generatedPhrase}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Confirm Recovery Phrase
                </label>
                <input
                  type="text"
                  value={recoveryPhrase}
                  onChange={(e) => setRecoveryPhrase(e.target.value)}
                  placeholder="Enter the recovery phrase above"
                  className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-accent focus:outline-none"
                  required
                />
              </div>

              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowRecovery(false);
                    resetForm();
                  }}
                  className="flex-1 btn-secondary"
                >
                  Back
                </button>
                <button type="submit" className="flex-1 btn-primary">
                  Complete Registration
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              resetForm();
            }}
            className="text-accent hover:underline"
          >
            {isLogin ? "Need an account? Register" : "Have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
