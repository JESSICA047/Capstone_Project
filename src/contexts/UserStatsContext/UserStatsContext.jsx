import React, { createContext, useContext, useState, useEffect } from "react";

const UserStatsContext = createContext();

export const UserStatsProvider = ({ children }) => {
  const [userStats, setUserStats] = useState({
    daysActive: 0,
    mealsPlanned: 0,
    recipesBookmarked: 0,
  });

  // Load stats on mount
  useEffect(() => {
    const storedStats = JSON.parse(localStorage.getItem("userStats") || "null");

    if (storedStats) {
      setUserStats(storedStats);
    } else {
      // Initialize with default values
      const initialStats = {
        daysActive: 1,
        mealsPlanned: 0,
        recipesBookmarked: 0,
      };
      setUserStats(initialStats);
      localStorage.setItem("userStats", JSON.stringify(initialStats));
    }

    // Increment days active once per day
    const lastActiveDate = localStorage.getItem("lastActiveDate");
    const today = new Date().toDateString();

    if (lastActiveDate !== today) {
      // New day - increment daysActive
      setTimeout(() => {
        updateStat("daysActive", userStats.daysActive + 1);
        localStorage.setItem("lastActiveDate", today);
      }, 1000); // Slight delay to ensure stats are loaded first
    }
  }, []);

  // In your context file
  const updateStat = (statName, value) => {
    setUserStats((prev) => {
      const newStats = {
        ...prev,
        [statName]: value,
      };
      localStorage.setItem("userStats", JSON.stringify(newStats));
      return newStats;
    });
  };

  // Helper function to update any stat
  const updateUserStat = (statName, value) => {
    updateStat(statName, value);
  };

  // Export these functions to be used in other components
  const incrementMealsPlanned = () => {
    updateStat("mealsPlanned", userStats.mealsPlanned + 1);
  };

  const incrementRecipesBookmarked = () => {
    updateStat("recipesBookmarked", userStats.recipesBookmarked + 1);
  };

  return (
    <UserStatsContext.Provider
      value={{
        userStats,
        updateStat,
        incrementMealsPlanned,
        incrementRecipesBookmarked,
      }}
    >
      {children}
    </UserStatsContext.Provider>
  );
};

// Custom hook to use the context
export const useUserStats = () => useContext(UserStatsContext);
