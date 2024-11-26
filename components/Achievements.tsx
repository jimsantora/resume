import React, { useState, useEffect } from 'react';
import { Trophy, Terminal, Code2, Gamepad2, Brain } from 'lucide-react';

export type Achievement = {
  id: string;
  title: string;
  description: string;
  section: string;
  points?: number;
  icon?: React.ReactNode;
};

const achievements: Achievement[] = [
  {
    id: 'bio-unlocked',
    title: 'Origin Story',
    description: 'Discovered the background of a seasoned SRE',
    section: 'intro',
    points: 100,
    icon: <Brain className="w-6 h-6" />
  },
  {
    id: 'skills-unlocked',
    title: 'Skill Tree Revealed',
    description: 'Explored a diverse technical skillset',
    section: 'skills',
    points: 200,
    icon: <Terminal className="w-6 h-6" />
  },
  {
    id: 'experience-unlocked',
    title: 'Career Path Uncovered',
    description: 'Traced the journey from IT Manager to SRE',
    section: 'experience',
    points: 300,
    icon: <Code2 className="w-6 h-6" />
  },
  {
    id: 'games-unlocked',
    title: 'Game Credits Roll',
    description: 'Viewed contributions to major game titles',
    section: 'game-credits',
    points: 400,
    icon: <Gamepad2 className="w-6 h-6" />
  }
];

const sectionAchievements: { [key: string]: string } = {
  'intro': 'bio-unlocked',
  'skills': 'skills-unlocked',
  'experience': 'experience-unlocked',
  'game-credits': 'games-unlocked'
};

const STORAGE_KEY = 'resume-achievements';

export const useAchievements = () => {
  // Initialize state from sessionStorage
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  const [currentNotification, setCurrentNotification] = useState<Achievement | null>(null);
  const [totalPoints, setTotalPoints] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return 0;
    const unlocked = JSON.parse(stored);
    return unlocked.reduce((total: number, id: string) => {
      const achievement = achievements.find(a => a.id === id);
      return total + (achievement?.points || 0);
    }, 0);
  });

  // Update sessionStorage when achievements change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(unlockedAchievements));
    }
  }, [unlockedAchievements]);

  const unlockAchievement = (sectionId: string) => {
    const achievementId = sectionAchievements[sectionId];
    if (!achievementId) return;

    // Don't proceed if already unlocked
    if (unlockedAchievements.includes(achievementId)) return;

    const achievement = achievements.find(a => a.id === achievementId);
    if (achievement) {
      setUnlockedAchievements(prev => {
        // Double check we haven't already added this
        if (prev.includes(achievementId)) return prev;
        return [...prev, achievementId];
      });
      setCurrentNotification(achievement);
      setTotalPoints(prev => prev + (achievement.points || 0));
      setTimeout(() => setCurrentNotification(null), 3000);
    }
  };

  return {
    unlockedAchievements,
    currentNotification,
    unlockAchievement,
    achievements,
    totalPoints
  };
};

// Previous notification component remains the same
export const AchievementNotification: React.FC<{
  achievement: Achievement | null;
  theme: string;
}> = ({ achievement, theme }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (achievement) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 2700);
      return () => clearTimeout(timer);
    }
  }, [achievement]);

  if (!achievement) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 transform transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}
    >
      <div
        className={`p-4 rounded-lg shadow-lg border-2 border-orange-500 flex items-start gap-3 max-w-sm ${
          theme === 'dark' ? 'bg-gray-800 shadow-orange-500/20' : 'bg-white shadow-orange-500/10'
        }`}
      >
        <div className="flex-shrink-0 mt-1">
          <Trophy className="w-6 h-6 text-yellow-500" />
        </div>
        <div>
          <h3 className="font-bold text-orange-500">{achievement.title}</h3>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {achievement.description}
          </p>
          <p className="text-xs text-yellow-500 mt-1">+{achievement.points} XP</p>
        </div>
      </div>
    </div>
  );
};

// Updated achievements list to show total points
export const AchievementsList: React.FC<{
  unlockedAchievements: string[];
  theme: string;
  totalPoints: number;
}> = ({ unlockedAchievements, theme, totalPoints }) => {
  return (
    <div className="fixed left-4 top-20 max-w-xs">
      <div
        className={`p-4 rounded-lg shadow-lg border-2 border-orange-500 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <h3 className="text-orange-500 font-bold mb-3 flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Achievements ({unlockedAchievements.length}/{achievements.length})
        </h3>
        <p className="text-sm text-yellow-500 mb-3">Total XP: {totalPoints}</p>
        <div className="space-y-2">
          {achievements.map(achievement => {
            const isUnlocked = unlockedAchievements.includes(achievement.id);
            return (
              <div
                key={achievement.id}
                className={`p-2 rounded ${isUnlocked ? 'opacity-100' : 'opacity-50'}`}
              >
                <div className="flex items-center gap-2">
                  {achievement.icon || (
                    <Trophy
                      className={`w-4 h-4 ${isUnlocked ? 'text-yellow-500' : 'text-gray-500'}`}
                    />
                  )}
                  <span
                    className={`font-medium ${isUnlocked ? 'text-orange-500' : 'text-gray-500'}`}
                  >
                    {achievement.title}
                  </span>
                </div>
                <p
                  className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  {isUnlocked ? achievement.description : '???'}
                </p>
                {isUnlocked && (
                  <p className="text-xs text-yellow-500 mt-1">+{achievement.points} XP</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
