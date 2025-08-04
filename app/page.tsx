"use client";

import { useState, useEffect } from "react";
import TokenList from "@/components/TokenList";
import Portfolio from "@/components/Portfolio";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/hooks/useAuth";
import { Token } from "@/types/token";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="min-h-screen bg-primary">
      <header className="bg-secondary border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-white">Crypto Portfolio</h1>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <span className="text-white">Welcome, {user?.username}</span>
                  <button className="btn-secondary">Logout</button>
                </div>
              ) : (
                <button
                  className="btn-primary"
                  onClick={() => setShowAuthModal(true)}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TokenList
              onTokenSelect={setSelectedToken}
              onAddToPortfolio={() => {
                if (!isAuthenticated) {
                  setShowAuthModal(true);
                }
              }}
            />
          </div>
          <div className="lg:col-span-1">
            <Portfolio />
          </div>
        </div>
      </main>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  );
}
