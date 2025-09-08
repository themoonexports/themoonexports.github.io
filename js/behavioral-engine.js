/**
 * Behavioral Science Engagement Engine
 * Implements gamification, social proof, scarcity, and habit formation
 */

class BehavioralEngine {
    constructor() {
        this.userState = this.loadUserState();
        this.achievements = new Map();
        this.socialProofTimer = null;
        this.scarcityTimer = null;
        this.engagementLevel = 0;
        this.streakData = this.loadStreakData();
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.initializeAchievements();
        this.startSocialProof();
        this.startScarcityCountdowns();
        this.updateStreakCounter();
        this.trackEngagement();
        this.createClickEffects();
        this.initializeMysteryBoxes();
        this.showDailyChallenge();
    }
    
    // User State Management
    loadUserState() {
        const defaultState = {
            level: 1,
            xp: 0,
            visitCount: 0,
            timeSpent: 0,
            achievements: [],
            lastVisit: null,
            preferences: {},
            socialShares: 0,
            productsViewed: [],
            streakDays: 0
        };
        
        try {
            const saved = localStorage.getItem('moonExportsUserState');
            return saved ? { ...defaultState, ...JSON.parse(saved) } : defaultState;
        } catch (e) {
            console.warn('Error loading user state:', e);
            return defaultState;
        }
    }
    
    saveUserState() {
        try {
            localStorage.setItem('moonExportsUserState', JSON.stringify(this.userState));
        } catch (e) {
            console.warn('Error saving user state:', e);
        }
    }
    
    loadStreakData() {
        try {
            const saved = localStorage.getItem('moonExportsStreak');
            return saved ? JSON.parse(saved) : { lastVisit: null, streak: 0 };
        } catch (e) {
            return { lastVisit: null, streak: 0 };
        }
    }
    
    saveStreakData() {
        try {
            localStorage.setItem('moonExportsStreak', JSON.stringify(this.streakData));
        } catch (e) {
            console.warn('Error saving streak data:', e);
        }
    }
    
    // Achievement System
    initializeAchievements() {
        this.achievements.set('first-visit', {
            id: 'first-visit',
            title: 'Welcome Explorer!',
            description: 'Your journey into craftsmanship begins',
            icon: '🌟',
            condition: () => this.userState.visitCount === 1,
            xp: 50
        });
        
        this.achievements.set('curious-mind', {
            id: 'curious-mind',
            title: 'Curious Mind',
            description: 'Opened 3 mystery discoveries',
            icon: '🔍',
            condition: () => this.userState.mysteryBoxesOpened >= 3,
            xp: 100
        });
        
        this.achievements.set('product-explorer', {
            id: 'product-explorer',
            title: 'Product Explorer',
            description: 'Viewed 5 different products',
            icon: '🏺',
            condition: () => this.userState.productsViewed.length >= 5,
            xp: 150
        });
        
        this.achievements.set('social-butterfly', {
            id: 'social-butterfly',
            title: 'Social Butterfly',
            description: 'Shared our craft with friends',
            icon: '🦋',
            condition: () => this.userState.socialShares >= 1,
            xp: 200
        });
        
        this.achievements.set('dedicated-visitor', {
            id: 'dedicated-visitor',
            title: 'Dedicated Visitor',
            description: '7-day visit streak',
            icon: '🔥',
            condition: () => this.streakData.streak >= 7,
            xp: 500
        });
        
        this.achievements.set('craft-master', {
            id: 'craft-master',
            title: 'Craft Master',
            description: 'Reached level 5',
            icon: '👑',
            condition: () => this.userState.level >= 5,
            xp: 1000
        });
        
        // Check for new achievements
        this.checkAchievements();
    }
    
    checkAchievements() {
        this.achievements.forEach(achievement => {
            if (!this.userState.achievements.includes(achievement.id) && achievement.condition()) {
                this.unlockAchievement(achievement);
            }
        });
    }
    
    unlockAchievement(achievement) {
        this.userState.achievements.push(achievement.id);
        this.addXP(achievement.xp);
        this.showAchievementPopup(achievement);
        this.saveUserState();
        
        // Trigger confetti effect
        this.createConfetti();
        
        // Track achievement for analytics
        this.trackEvent('achievement_unlocked', {
            achievement_id: achievement.id,
            achievement_name: achievement.title
        });
    }
    
    showAchievementPopup(achievement) {
        const popup = document.createElement('div');
        popup.className = 'achievement-popup';
        popup.innerHTML = `
            <div class="icon">${achievement.icon}</div>
            <div>
                <strong>Achievement Unlocked!</strong><br>
                ${achievement.title}<br>
                <small>+${achievement.xp} XP</small>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        // Animate in
        setTimeout(() => popup.classList.add('show'), 100);
        
        // Remove after delay
        setTimeout(() => {
            popup.classList.remove('show');
            setTimeout(() => document.body.removeChild(popup), 500);
        }, 4000);
    }
    
    // XP and Leveling System
    addXP(amount) {
        this.userState.xp += amount;
        const newLevel = this.calculateLevel(this.userState.xp);
        
        if (newLevel > this.userState.level) {
            this.userState.level = newLevel;
            this.showLevelUpNotification();
        }
        
        this.updateProgressDisplay();
        this.saveUserState();
    }
    
    calculateLevel(xp) {
        return Math.floor(Math.sqrt(xp / 100)) + 1;
    }
    
    getXPForLevel(level) {
        return Math.pow(level - 1, 2) * 100;
    }
    
    showLevelUpNotification() {
        const notification = document.createElement('div');
        notification.className = 'achievement-popup';
        notification.style.background = 'var(--status-gradient)';
        notification.innerHTML = `
            <div class="icon">⬆️</div>
            <div>
                <strong>Level Up!</strong><br>
                You reached level ${this.userState.level}!<br>
                <small>Unlock new features</small>
            </div>
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 500);
        }, 4000);
    }
    
    // Progress Tracking
    updateProgressDisplay() {
        const tracker = document.querySelector('.progress-tracker');
        if (!tracker) return;
        
        const currentLevelXP = this.getXPForLevel(this.userState.level);
        const nextLevelXP = this.getXPForLevel(this.userState.level + 1);
        const progress = (this.userState.xp - currentLevelXP) / (nextLevelXP - currentLevelXP);
        
        const progressCircle = tracker.querySelector('.progress');
        if (progressCircle) {
            const circumference = 188.4;
            const offset = circumference - (progress * circumference);
            progressCircle.style.strokeDashoffset = offset;
        }
        
        const levelDisplay = tracker.querySelector('.level-display');
        if (levelDisplay) {
            levelDisplay.textContent = `Level ${this.userState.level}`;
        }
        
        const xpDisplay = tracker.querySelector('.xp-display');
        if (xpDisplay) {
            xpDisplay.textContent = `${this.userState.xp - currentLevelXP}/${nextLevelXP - currentLevelXP} XP`;
        }
    }
    
    // Social Proof System
    startSocialProof() {
        const socialMessages = [
            { message: "Sarah from London just viewed horn crafts", icon: "👀" },
            { message: "Ahmed from Dubai purchased a wooden bowl", icon: "🛒" },
            { message: "Maria from Berlin shared our resin collection", icon: "💝" },
            { message: "John from New York joined our newsletter", icon: "📧" },
            { message: "Priya from Mumbai discovered secret crafts", icon: "🔍" },
            { message: "Alex from Tokyo unlocked VIP status", icon: "👑" },
            { message: "Emma from Paris reached level 3", icon: "⬆️" },
            { message: "Chen from Singapore earned Master Crafter badge", icon: "🏆" }
        ];
        
        this.socialProofTimer = setInterval(() => {
            if (Math.random() < 0.3) { // 30% chance every interval
                const message = socialMessages[Math.floor(Math.random() * socialMessages.length)];
                this.showSocialActivity(message);
            }
        }, 15000); // Every 15 seconds
    }
    
    showSocialActivity(message) {
        const activity = document.createElement('div');
        activity.className = 'social-activity';
        activity.innerHTML = `
            <span class="icon">${message.icon}</span>
            ${message.message}
        `;
        
        document.body.appendChild(activity);
        
        setTimeout(() => activity.classList.add('show'), 100);
        setTimeout(() => {
            activity.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(activity)) {
                    document.body.removeChild(activity);
                }
            }, 500);
        }, 5000);
    }
    
    // Scarcity and Urgency
    startScarcityCountdowns() {
        const scarcityElements = document.querySelectorAll('.countdown-timer');
        scarcityElements.forEach(element => {
            const endTime = Date.now() + (Math.random() * 3600000) + 1800000; // 30min - 90min
            this.updateCountdown(element, endTime);
            
            setInterval(() => this.updateCountdown(element, endTime), 1000);
        });
    }
    
    updateCountdown(element, endTime) {
        const now = Date.now();
        const timeLeft = endTime - now;
        
        if (timeLeft <= 0) {
            element.textContent = "OFFER EXPIRED";
            element.style.color = '#dc3545';
            return;
        }
        
        const hours = Math.floor(timeLeft / 3600000);
        const minutes = Math.floor((timeLeft % 3600000) / 60000);
        const seconds = Math.floor((timeLeft % 60000) / 1000);
        
        element.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // Engagement Tracking
    trackEngagement() {
        let scrollDepth = 0;
        let timeOnPage = 0;
        
        // Track scroll depth
        window.addEventListener('scroll', () => {
            const depth = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
            scrollDepth = Math.max(scrollDepth, depth);
            
            // Update engagement bar
            const engagementBar = document.querySelector('.engagement-bar');
            if (engagementBar) {
                engagementBar.style.transform = `scaleX(${depth / 100})`;
                if (depth > 0) {
                    engagementBar.classList.add('active');
                }
            }
        });
        
        // Track time on page
        setInterval(() => {
            timeOnPage++;
            this.userState.timeSpent++;
            
            // Award XP for engagement milestones
            if (timeOnPage === 60) { // 1 minute
                this.addXP(10);
            } else if (timeOnPage === 300) { // 5 minutes
                this.addXP(50);
            } else if (timeOnPage === 600) { // 10 minutes
                this.addXP(100);
            }
        }, 1000);
        
        // Track page visibility
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                this.saveUserState();
            }
        });
    }
    
    // Click Effects
    createClickEffects() {
        document.addEventListener('click', (e) => {
            const effect = document.createElement('div');
            effect.className = 'click-effect';
            effect.style.left = e.clientX - 10 + 'px';
            effect.style.top = e.clientY - 10 + 'px';
            effect.style.width = '20px';
            effect.style.height = '20px';
            
            document.body.appendChild(effect);
            
            setTimeout(() => {
                if (document.body.contains(effect)) {
                    document.body.removeChild(effect);
                }
            }, 600);
        });
    }
    
    // Mystery Boxes
    initializeMysteryBoxes() {
        const mysteryBoxes = document.querySelectorAll('.mystery-box');
        mysteryBoxes.forEach((box, index) => {
            box.addEventListener('click', () => this.openMysteryBox(box, index));
        });
    }
    
    openMysteryBox(box, index) {
        if (box.classList.contains('opened')) return;
        
        box.classList.add('opened');
        this.userState.mysteryBoxesOpened = (this.userState.mysteryBoxesOpened || 0) + 1;
        
        const reveals = [
            { type: 'craft-secret', content: 'Secret: Our horn crafts are polished with ancient techniques!', xp: 25 },
            { type: 'discount', content: 'Congratulations! You unlocked a 10% discount code: EXPLORER10', xp: 50 },
            { type: 'fact', content: 'Did you know? Each horn craft takes 3-7 days to complete by hand.', xp: 15 },
            { type: 'challenge', content: 'Challenge: Share this page to unlock the Craft Ambassador badge!', xp: 30 }
        ];
        
        const reveal = reveals[index % reveals.length];
        
        box.innerHTML = `
            <div class="mystery-content">
                <div class="unlock-icon">🎉</div>
                <h4>Discovery Unlocked!</h4>
                <p>${reveal.content}</p>
                <small>+${reveal.xp} XP</small>
            </div>
        `;
        
        this.addXP(reveal.xp);
        this.checkAchievements();
        this.saveUserState();
    }
    
    // Streak System
    updateStreakCounter() {
        const now = new Date();
        const today = now.toDateString();
        const lastVisit = this.streakData.lastVisit;
        
        if (lastVisit) {
            const lastDate = new Date(lastVisit);
            const daysDiff = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));
            
            if (daysDiff === 1) {
                // Consecutive day
                this.streakData.streak++;
            } else if (daysDiff > 1) {
                // Streak broken
                this.streakData.streak = 1;
            }
            // Same day visits don't change streak
        } else {
            // First visit
            this.streakData.streak = 1;
        }
        
        this.streakData.lastVisit = today;
        this.saveStreakData();
        
        // Update streak display
        const streakDisplay = document.querySelector('.streak-counter .number');
        if (streakDisplay) {
            streakDisplay.textContent = this.streakData.streak;
        }
        
        // Award streak bonuses
        if (this.streakData.streak >= 3) {
            this.addXP(this.streakData.streak * 10);
        }
    }
    
    // Daily Challenge
    showDailyChallenge() {
        const challenges = [
            "Explore 3 different product categories today",
            "Share your favorite craft with a friend",
            "Subscribe to our newsletter for craft updates",
            "Spend 5 minutes learning about our artisans",
            "Discover the story behind horn crafts"
        ];
        
        const today = new Date().toDateString();
        const lastChallenge = localStorage.getItem('lastDailyChallenge');
        
        if (lastChallenge !== today) {
            const challengeIndex = new Date().getDate() % challenges.length;
            const challenge = challenges[challengeIndex];
            
            const challengeElement = document.querySelector('.daily-challenge');
            if (challengeElement) {
                challengeElement.innerHTML = `
                    <div class="challenge-icon">🎯</div>
                    <div>
                        <h4>Daily Challenge</h4>
                        <p>${challenge}</p>
                        <small>Complete for bonus XP!</small>
                    </div>
                `;
            }
            
            localStorage.setItem('lastDailyChallenge', today);
        }
    }
    
    // Confetti Effect
    createConfetti() {
        const colors = ['#D4AF37', '#B87333', '#CD7F32', '#ffc107', '#28a745'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.zIndex = '10001';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            
            document.body.appendChild(confetti);
            
            const animationDuration = Math.random() * 2000 + 1000;
            const horizontalMovement = (Math.random() - 0.5) * 200;
            
            confetti.animate([
                { transform: 'translateY(0px) translateX(0px) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight + 20}px) translateX(${horizontalMovement}px) rotate(360deg)`, opacity: 0 }
            ], {
                duration: animationDuration,
                easing: 'ease-out'
            }).onfinish = () => {
                if (document.body.contains(confetti)) {
                    document.body.removeChild(confetti);
                }
            };
        }
    }
    
    // Event Listeners
    setupEventListeners() {
        // Track visits
        this.userState.visitCount++;
        this.userState.lastVisit = new Date().toISOString();
        
        // Track product views
        const productLinks = document.querySelectorAll('a[href*="crafts"], a[href*="products"], a[href*="resin"]');
        productLinks.forEach(link => {
            link.addEventListener('click', () => {
                const productType = link.href.split('/').pop().split('.')[0];
                if (!this.userState.productsViewed.includes(productType)) {
                    this.userState.productsViewed.push(productType);
                    this.addXP(20);
                    this.checkAchievements();
                }
            });
        });
        
        // Track social shares
        const shareButtons = document.querySelectorAll('[class*="share"], [href*="facebook"], [href*="twitter"], [href*="instagram"]');
        shareButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.userState.socialShares++;
                this.addXP(100);
                this.checkAchievements();
            });
        });
        
        // Save state on page unload
        window.addEventListener('beforeunload', () => {
            this.saveUserState();
        });
    }
    
    // Analytics
    trackEvent(eventName, properties = {}) {
        // Implementation for analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, properties);
        }
        
        console.log('Behavioral Event:', eventName, properties);
    }
    
    // Public API methods
    getUserLevel() {
        return this.userState.level;
    }
    
    getUserXP() {
        return this.userState.xp;
    }
    
    getAchievements() {
        return this.userState.achievements;
    }
    
    getStreak() {
        return this.streakData.streak;
    }
}

// Initialize the behavioral engine when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.behavioralEngine = new BehavioralEngine();
    
    // Add progress tracker to the page
    const progressTracker = document.createElement('div');
    progressTracker.className = 'progress-tracker visible';
    progressTracker.innerHTML = `
        <div class="progress-ring">
            <svg>
                <circle cx="30" cy="30" r="30" class="background"></circle>
                <circle cx="30" cy="30" r="30" class="progress"></circle>
            </svg>
        </div>
        <div class="level-display">Level 1</div>
        <div class="xp-display">0/100 XP</div>
    `;
    document.body.appendChild(progressTracker);
    
    // Add engagement bar
    const engagementBar = document.createElement('div');
    engagementBar.className = 'engagement-bar';
    document.body.appendChild(engagementBar);
    
    console.log('Behavioral Science Engine initialized! 🚀');
});