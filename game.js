class MagicTrayGame {
    constructor() {
        // Game state
        this.level = 1;
        this.score = 0;
        this.lives = 3;
        this.progress = 0;
        this.maxProgress = 5;
        this.isPlaying = false;
        this.isPaused = false;
        this.showingSequence = false;
        
        // Game settings
        this.difficulty = 'medium';
        this.speed = 'medium';
        this.soundEnabled = true;
        this.pronunciationEnabled = true;
        
        // Text-to-Speech setup
        this.speechSynthesis = window.speechSynthesis;
        this.speechVoice = null;
        this.initializeSpeech();
        
        // Game data - Object pools by category
        this.objectPools = {
            magic: {
                name: '♦ Shapes',
                description: 'Different Shapes',
                items: [
                    { id: 'circle', emoji: '⚪', color: 'item-blue', name: 'Circle' },
                    { id: 'square', emoji: '⬜', color: 'item-purple', name: 'Square' },
                    { id: 'triangle', emoji: '🔺', color: 'item-green', name: 'Triangle' },
                    { id: 'diamond', emoji: '♦️', color: 'item-yellow', name: 'Diamond' },
                    { id: 'heart', emoji: '❤', color: 'item-red', name: 'Heart' },
                    { id: 'oval', emoji: '⬬', color: 'item-orange', name: 'Oval' },
                    { id: 'rectangle', emoji: '▬', color: 'item-pink', name: 'Rectangle' },
                    { id: 'star', emoji: '⭐', color: 'item-cyan', name: 'Star' }
                ]
            },
            fruits: {
                name: '🍎 Fruits',
                description: 'Delicious and healthy fruits',
                items: [
                    { id: 'apple', emoji: '🍎', color: 'item-red', name: 'Apple' },
                    { id: 'banana', emoji: '🍌', color: 'item-yellow', name: 'Banana' },
                    { id: 'orange', emoji: '🍊', color: 'item-orange', name: 'Orange' },
                    { id: 'grapes', emoji: '🍇', color: 'item-purple', name: 'Grapes' },
                    { id: 'strawberry', emoji: '🍓', color: 'item-red', name: 'Strawberry' },
                    { id: 'watermelon', emoji: '🍉', color: 'item-green', name: 'Watermelon' },
                    { id: 'pineapple', emoji: '🍍', color: 'item-yellow', name: 'Pineapple' },
                    { id: 'avocado', emoji: '🥑', color: 'item-pink', name: 'Avocado' }
                ]
            },
            vegetables: {
                name: '🥕 Vegetables',
                description: 'Fresh and nutritious vegetables',
                items: [
                    { id: 'carrot', emoji: '🥕', color: 'item-orange', name: 'Carrot' },
                    { id: 'pepper', emoji: '🌶', color: 'item-green', name: 'Hot Pepper' },
                    { id: 'tomato', emoji: '🍅', color: 'item-red', name: 'Tomato' },
                    { id: 'corn', emoji: '🌽', color: 'item-yellow', name: 'Corn' },
                    { id: 'eggplant', emoji: '🍆', color: 'item-purple', name: 'Eggplant' },
                    { id: 'cucumber', emoji: '🥒', color: 'item-green', name: 'Cucumber' },
                    { id: 'onion', emoji: '🧅', color: 'item-yellow', name: 'Onion' },
                    { id: 'potato', emoji: '🥔', color: 'item-orange', name: 'Potato' }
                ]
            },
            animals: {
                name: '🐘 Animals',
                description: 'Cute and friendly animals',
                items: [
                    { id: 'dog', emoji: '🐶', color: 'item-orange', name: 'Dog' },
                    { id: 'cat', emoji: '🐱', color: 'item-yellow', name: 'Cat' },
                    { id: 'rabbit', emoji: '🐰', color: 'item-pink', name: 'Rabbit' },
                    { id: 'bear', emoji: '🐻', color: 'item-orange', name: 'Bear' },
                    { id: 'lion', emoji: '🦁', color: 'item-yellow', name: 'Lion' },
                    { id: 'elephant', emoji: '🐘', color: 'item-blue', name: 'Elephant' },
                    { id: 'monkey', emoji: '🐵', color: 'item-orange', name: 'Monkey' },
                    { id: 'panda', emoji: '🐼', color: 'item-green', name: 'Panda' }
                ]
            },
            bodyparts: {
                name: '👁️ Body Parts',
                description: 'Learn about your body',
                items: [
                    { id: 'eye', emoji: '👁️', color: 'item-blue', name: 'Eye' },
                    { id: 'nose', emoji: '👃', color: 'item-pink', name: 'Nose' },
                    { id: 'mouth', emoji: '👄', color: 'item-red', name: 'Mouth' },
                    { id: 'ear', emoji: '👂', color: 'item-orange', name: 'Ear' },
                    { id: 'hand', emoji: '✋', color: 'item-yellow', name: 'Hand' },
                    { id: 'leg', emoji: '🦶', color: 'item-pink', name: 'Leg' },
                    { id: 'heart', emoji: '❤️', color: 'item-red', name: 'Heart' },
                    { id: 'brain', emoji: '🧠', color: 'item-purple', name: 'Brain' }
                ]
            },
            family: {
                name: '👨‍👩‍👧‍👦 Family',
                description: 'Family members and relationships',
                items: [
                    { id: 'mom', emoji: '👩', color: 'item-pink', name: 'Mom' },
                    { id: 'dad', emoji: '👨', color: 'item-blue', name: 'Dad' },
                    { id: 'girl', emoji: '👧', color: 'item-purple', name: 'Sister' },
                    { id: 'boy', emoji: '👦', color: 'item-cyan', name: 'Brother' },
                    { id: 'grandma', emoji: '👵', color: 'item-yellow', name: 'Grandma' },
                    { id: 'grandpa', emoji: '👴', color: 'item-orange', name: 'Grandpa' },
                    { id: 'baby', emoji: '👶', color: 'item-green', name: 'Baby' },
                    { id: 'family', emoji: '👨‍👩‍👧‍👦', color: 'item-red', name: 'Family' }
                ]
            }
        };
        
        this.selectedCategory = 'magic';
        this.magicItems = this.objectPools[this.selectedCategory].items;
        
        this.currentSequence = [];
        this.playerSequence = [];
        this.availableItems = [];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateDisplay();
        this.loadSettings();
        this.initializeSpeech();
    }

    initializeSpeech() {
        if ('speechSynthesis' in window) {
            // Wait for voices to be loaded
            const setVoice = () => {
                const voices = this.speechSynthesis.getVoices();
                // Prefer English voices, especially child-friendly ones
                this.speechVoice = voices.find(voice => 
                    voice.lang.startsWith('en') && 
                    (voice.name.includes('Google') || voice.name.includes('Microsoft'))
                ) || voices.find(voice => voice.lang.startsWith('en')) || voices[0];
            };

            if (this.speechSynthesis.getVoices().length > 0) {
                setVoice();
            } else {
                this.speechSynthesis.addEventListener('voiceschanged', setVoice);
            }
        }
    }

    pronounceWord(word) {
        if (!this.pronunciationEnabled || !('speechSynthesis' in window)) {
            return;
        }

        // Cancel any ongoing speech
        this.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(word);
        
        // Configure speech settings for children
        utterance.rate = 0.8; // Slightly slower for clarity
        utterance.pitch = 1.1; // Slightly higher pitch, more engaging for children
        utterance.volume = 0.8;
        
        if (this.speechVoice) {
            utterance.voice = this.speechVoice;
        }

        // Add some enthusiasm for children
        utterance.text = word;
        
        this.speechSynthesis.speak(utterance);
    }

    setupEventListeners() {
        // Start button
        document.getElementById('startBtn').addEventListener('click', () => {
            this.showCategorySelection();
        });

        // Category selection
        document.getElementById('categoryGrid').addEventListener('click', (e) => {
            const categoryCard = e.target.closest('.category-card');
            if (categoryCard) {
                this.selectCategory(categoryCard.dataset.category);
            }
        });

        // Start game with selected category
        document.getElementById('startGameBtn').addEventListener('click', () => {
            this.startGame();
        });

        // Back to category selection
        document.getElementById('backToCategoriesBtn').addEventListener('click', () => {
            this.showCategorySelection();
        });

        // Game controls
        document.getElementById('pauseBtn').addEventListener('click', () => {
            this.togglePause();
        });

        document.getElementById('hintBtn').addEventListener('click', () => {
            this.showHint();
        });

        document.getElementById('restartBtn').addEventListener('click', () => {
            this.restartGame();
        });

        // Selection controls
        document.getElementById('clearBtn').addEventListener('click', () => {
            this.clearSelection();
        });

        document.getElementById('submitBtn').addEventListener('click', () => {
            this.submitSequence();
        });

        // Result overlay
        document.getElementById('nextBtn').addEventListener('click', () => {
            this.nextLevel();
        });

        // Settings
        document.getElementById('closeSettingsBtn').addEventListener('click', () => {
            this.closeSettings();
        });

        // Settings icon (add to header)
        this.addSettingsIcon();

        // Touch events for mobile optimization
        document.addEventListener('touchstart', (e) => {
            // Only prevent default for specific cases, not all touches
            if (e.target.closest('.magic-item') && this.showingSequence) {
                // Prevent touch during sequence display
                e.preventDefault();
            }
        }, { passive: false });

        // Add touch event support for better mobile interaction
        document.addEventListener('touchend', (e) => {
            // Ensure touch events work properly on mobile
            const target = e.target.closest('.btn') || e.target.closest('.magic-item') || e.target.closest('.category-card');
            if (target && !this.showingSequence) {
                // Add visual feedback for touch
                target.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    target.style.transform = '';
                }, 150);
            }
        }, { passive: true });

        // Prevent zoom on double tap
        document.addEventListener('gesturestart', (e) => {
            e.preventDefault();
        });
    }

    addSettingsIcon() {
        const header = document.querySelector('.game-header');
        const settingsBtn = document.createElement('button');
        settingsBtn.innerHTML = '⚙️';
        settingsBtn.className = 'settings-btn';
        settingsBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255,255,255,0.2);
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 1.2rem;
            cursor: pointer;
            color: white;
        `;
        settingsBtn.addEventListener('click', () => {
            this.showSettings();
        });
        header.appendChild(settingsBtn);
    }

    showCategorySelection() {
        document.getElementById('instructions').style.display = 'none';
        document.getElementById('categorySelection').style.display = 'block';
        document.getElementById('magicTrayContainer').style.display = 'none';
        document.getElementById('selectionArea').style.display = 'none';
        
        this.renderCategoryGrid();
    }

    renderCategoryGrid() {
        const categoryGrid = document.getElementById('categoryGrid');
        categoryGrid.innerHTML = '';
        
        Object.entries(this.objectPools).forEach(([key, pool]) => {
            const categoryCard = document.createElement('div');
            categoryCard.className = 'category-card';
            categoryCard.dataset.category = key;
            
            if (key === this.selectedCategory) {
                categoryCard.classList.add('selected');
            }
            
            categoryCard.innerHTML = `
                <div class="category-icon">${pool.items[0].emoji}</div>
                <div class="category-name">${pool.name}</div>
                <div class="category-description">${pool.description}</div>
                <div class="category-preview">
                    ${pool.items.slice(0, 4).map(item => item.emoji).join(' ')}
                </div>
            `;
            
            categoryGrid.appendChild(categoryCard);
        });
    }

    selectCategory(categoryKey) {
        this.selectedCategory = categoryKey;
        this.magicItems = this.objectPools[categoryKey].items;
        
        // Update visual selection
        document.querySelectorAll('.category-card').forEach(card => {
            card.classList.remove('selected');
        });
        document.querySelector(`[data-category="${categoryKey}"]`).classList.add('selected');
        
        // Update selected category display
        const selectedPool = this.objectPools[categoryKey];
        document.getElementById('selectedCategoryName').textContent = selectedPool.name;
        document.getElementById('selectedCategoryDescription').textContent = selectedPool.description;
        document.getElementById('categoryPreview').innerHTML = selectedPool.items.map(item => 
            `<span class="preview-item">${item.emoji}</span>`
        ).join('');
        
        document.getElementById('selectedCategoryInfo').style.display = 'block';
        
        this.playSound('select');
    }

    startGame() {
        this.isPlaying = true;
        this.hideInstructions();
        this.hideCategorySelection();
        this.updateTrayTitle();
        this.updateCategoryDisplay();
        this.generateSequence();
        this.showSequence();
    }

    updateTrayTitle() {
        const trayTitle = document.querySelector('.tray-title');
        const selectedPool = this.objectPools[this.selectedCategory];
        trayTitle.textContent = `${selectedPool.name} Tray`;
    }

    updateCategoryDisplay() {
        const categoryDisplay = document.getElementById('categoryDisplay');
        const currentCategory = document.getElementById('currentCategory');
        const selectedPool = this.objectPools[this.selectedCategory];
        
        categoryDisplay.textContent = selectedPool.name;
        currentCategory.style.display = 'block';
    }

    hideInstructions() {
        document.getElementById('instructions').style.display = 'none';
        document.getElementById('magicTrayContainer').style.display = 'block';
    }

    hideCategorySelection() {
        document.getElementById('categorySelection').style.display = 'none';
        document.getElementById('magicTrayContainer').style.display = 'block';
    }

    generateSequence() {
        const sequenceLength = this.getSequenceLength();
        this.currentSequence = [];
        this.availableItems = [...this.magicItems];
        
        // Shuffle available items
        this.shuffleArray(this.availableItems);
        
        // Select items for sequence
        for (let i = 0; i < sequenceLength; i++) {
            const randomIndex = Math.floor(Math.random() * this.availableItems.length);
            this.currentSequence.push(this.availableItems[randomIndex]);
        }
        
        console.log('Generated sequence:', this.currentSequence.map(item => item.emoji));
    }

    getSequenceLength() {
        const baseLengths = {
            easy: { min: 3, max: 4 },
            medium: { min: 4, max: 6 },
            hard: { min: 6, max: 8 }
        };
        
        const range = baseLengths[this.difficulty];
        const levelBonus = Math.floor(this.level / 3);
        const min = Math.min(range.min + levelBonus, 8);
        const max = Math.min(range.max + levelBonus, 10);
        
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    async showSequence() {
        this.showingSequence = true;
        const tray = document.getElementById('magicTray');
        const status = document.getElementById('trayStatus');
        
        tray.classList.add('active');
        status.textContent = 'Watch carefully...';
        
        const delays = {
            slow: 1500,
            medium: 1000,
            fast: 700
        };
        
        const delay = delays[this.speed];
        
        for (let i = 0; i < this.currentSequence.length; i++) {
            if (this.isPaused) {
                await this.waitForUnpause();
            }
            
            await this.showItem(this.currentSequence[i], delay);
            await this.wait(200); // Brief pause between items
        }
        
        this.showingSequence = false;
        tray.classList.remove('active');
        status.textContent = 'Now recreate the sequence!';
        
        this.showSelectionArea();
    }

    async showItem(item, duration) {
        const tray = document.getElementById('magicTray');
        const itemElement = document.createElement('div');
        
        itemElement.className = `magic-item ${item.color} appear`;
        itemElement.innerHTML = item.emoji;
        itemElement.dataset.itemId = item.id;
        
        tray.appendChild(itemElement);
        
        // Play sound effect
        this.playSound('appear');
        
        // Pronounce the item name for educational purposes
        setTimeout(() => {
            this.pronounceWord(item.name);
        }, 300); // Small delay to let the visual appear first
        
        // Haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
        
        await this.wait(duration);
        
        itemElement.classList.add('disappear');
        await this.wait(300);
        
        tray.removeChild(itemElement);
    }

    showSelectionArea() {
        const selectionArea = document.getElementById('selectionArea');
        const itemsGrid = document.getElementById('itemsGrid');
        const selectionTitle = document.querySelector('.selection-title');
        
        // Update title based on selected category
        const selectedPool = this.objectPools[this.selectedCategory];
        selectionTitle.textContent = `🎭 Select the ${selectedPool.name.split(' ')[1] || 'Items'}`;
        
        selectionArea.style.display = 'block';
        itemsGrid.innerHTML = '';
        
        // Show all available items for selection
        this.availableItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = `magic-item ${item.color}`;
            itemElement.innerHTML = item.emoji;
            itemElement.dataset.itemId = item.id;
            itemElement.title = item.name; // Add tooltip with item name
            
            itemElement.addEventListener('click', () => {
                this.selectItem(item, itemElement);
            });
            
            itemsGrid.appendChild(itemElement);
        });
        
        this.playerSequence = [];
        this.updateSelectionDisplay();
    }

    selectItem(item, element) {
        if (this.playerSequence.length >= this.currentSequence.length) {
            this.showMessage('Sequence complete! Click Submit to check.', 'info');
            return;
        }
        
        this.playerSequence.push(item);
        
        // Visual feedback
        element.classList.add('selected');
        setTimeout(() => {
            element.classList.remove('selected');
        }, 300);
        
        // Play sound
        this.playSound('select');
        
        // Pronounce the selected item name
        this.pronounceWord(item.name);
        
        // Haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate(30);
        }
        
        this.updateSelectionDisplay();
        
        // Auto-submit if sequence is complete
        if (this.playerSequence.length === this.currentSequence.length) {
            setTimeout(() => {
                this.submitSequence();
            }, 500);
        }
    }

    updateSelectionDisplay() {
        const status = document.getElementById('trayStatus');
        const progress = `${this.playerSequence.length}/${this.currentSequence.length}`;
        status.textContent = `Selected: ${progress} - ${this.playerSequence.map(item => item.emoji).join(' ')}`;
    }

    clearSelection() {
        this.playerSequence = [];
        this.updateSelectionDisplay();
        this.playSound('clear');
    }

    submitSequence() {
        if (this.playerSequence.length !== this.currentSequence.length) {
            this.showMessage('Please complete the sequence first!', 'warning');
            return;
        }
        
        const isCorrect = this.checkSequence();
        this.showResult(isCorrect);
    }

    checkSequence() {
        for (let i = 0; i < this.currentSequence.length; i++) {
            if (this.currentSequence[i].id !== this.playerSequence[i].id) {
                return false;
            }
        }
        return true;
    }

    showResult(isCorrect) {
        const overlay = document.getElementById('resultOverlay');
        const icon = document.getElementById('resultIcon');
        const title = document.getElementById('resultTitle');
        const message = document.getElementById('resultMessage');
        const nextBtn = document.getElementById('nextBtn');
        
        if (isCorrect) {
            this.handleSuccess();
            icon.textContent = '🌟';
            title.textContent = 'Perfect!';
            message.textContent = `Amazing memory! You got the sequence exactly right!`;
            nextBtn.textContent = 'Next Level';
            this.playSound('success');
            
            // Celebration haptic
            if (navigator.vibrate) {
                navigator.vibrate([100, 50, 100, 50, 100]);
            }
        } else {
            this.handleFailure();
            icon.textContent = '💫';
            title.textContent = 'Try Again!';
            message.textContent = `Not quite right. The correct sequence was: ${this.currentSequence.map(item => item.emoji).join(' ')}`;
            nextBtn.textContent = this.lives > 0 ? 'Try Again' : 'Game Over';
            this.playSound('failure');
            
            // Error haptic
            if (navigator.vibrate) {
                navigator.vibrate(300);
            }
        }
        
        overlay.classList.add('show');
    }

    handleSuccess() {
        const baseScore = 100;
        const levelBonus = this.level * 10;
        const lengthBonus = this.currentSequence.length * 5;
        const speedBonus = this.speed === 'fast' ? 20 : this.speed === 'medium' ? 10 : 0;
        
        const earnedScore = baseScore + levelBonus + lengthBonus + speedBonus;
        this.score += earnedScore;
        this.progress++;
        
        this.updateDisplay();
    }

    handleFailure() {
        this.lives--;
        this.updateDisplay();
        
        if (this.lives <= 0) {
            this.gameOver();
        }
    }

    nextLevel() {
        const overlay = document.getElementById('resultOverlay');
        overlay.classList.remove('show');
        
        if (this.lives <= 0) {
            this.restartGame();
            return;
        }
        
        if (this.progress >= this.maxProgress) {
            this.levelUp();
        } else {
            this.generateSequence();
            this.showSequence();
        }
        
        document.getElementById('selectionArea').style.display = 'none';
    }

    levelUp() {
        this.level++;
        this.progress = 0;
        this.lives = Math.min(this.lives + 1, 5); // Bonus life
        
        this.showMessage(`🎉 Level ${this.level}! Bonus life awarded!`, 'success');
        
        this.generateSequence();
        this.showSequence();
        document.getElementById('selectionArea').style.display = 'none';
    }

    gameOver() {
        this.isPlaying = false;
        this.showMessage(`Game Over! Final Score: ${this.score}`, 'gameover');
    }

    restartGame() {
        this.level = 1;
        this.score = 0;
        this.lives = 3;
        this.progress = 0;
        this.isPlaying = false;
        this.isPaused = false;
        
        document.getElementById('instructions').style.display = 'block';
        document.getElementById('categorySelection').style.display = 'none';
        document.getElementById('magicTrayContainer').style.display = 'none';
        document.getElementById('selectionArea').style.display = 'none';
        document.getElementById('resultOverlay').classList.remove('show');
        document.getElementById('currentCategory').style.display = 'none';
        
        this.updateDisplay();
    }

    togglePause() {
        this.isPaused = !this.isPaused;
        const btn = document.getElementById('pauseBtn');
        btn.textContent = this.isPaused ? '▶️ Resume' : '⏸️ Pause';
        
        this.showMessage(this.isPaused ? 'Game Paused' : 'Game Resumed', 'info');
    }

    async waitForUnpause() {
        while (this.isPaused) {
            await this.wait(100);
        }
    }

    showHint() {
        if (!this.isPlaying || this.showingSequence) {
            return;
        }
        
        const hints = [
            `The sequence has ${this.currentSequence.length} items`,
            `First item was: ${this.currentSequence[0].emoji}`,
            `Last item was: ${this.currentSequence[this.currentSequence.length - 1].emoji}`,
            `Items included: ${this.currentSequence.slice(0, 2).map(item => item.emoji).join(', ')}...`
        ];
        
        const randomHint = hints[Math.floor(Math.random() * hints.length)];
        this.showMessage(`💡 Hint: ${randomHint}`, 'hint');
    }

    showSettings() {
        document.getElementById('settingsPanel').classList.add('show');
    }

    closeSettings() {
        document.getElementById('settingsPanel').classList.remove('show');
        this.saveSettings();
    }

    loadSettings() {
        const saved = localStorage.getItem('magicTraySettings');
        if (saved) {
            const settings = JSON.parse(saved);
            this.difficulty = settings.difficulty || 'medium';
            this.speed = settings.speed || 'medium';
            this.soundEnabled = settings.soundEnabled !== false;
            this.pronunciationEnabled = settings.pronunciationEnabled !== false;
            
            document.getElementById('difficultySelect').value = this.difficulty;
            document.getElementById('speedSelect').value = this.speed;
            document.getElementById('soundToggle').checked = this.soundEnabled;
            
            // Update pronunciation toggle if it exists
            const pronunciationToggle = document.getElementById('pronunciationToggle');
            if (pronunciationToggle) {
                pronunciationToggle.checked = this.pronunciationEnabled;
            }
        }
    }

    saveSettings() {
        this.difficulty = document.getElementById('difficultySelect').value;
        this.speed = document.getElementById('speedSelect').value;
        this.soundEnabled = document.getElementById('soundToggle').checked;
        
        const pronunciationToggle = document.getElementById('pronunciationToggle');
        if (pronunciationToggle) {
            this.pronunciationEnabled = pronunciationToggle.checked;
        }
        
        const settings = {
            difficulty: this.difficulty,
            speed: this.speed,
            soundEnabled: this.soundEnabled,
            pronunciationEnabled: this.pronunciationEnabled
        };
        
        localStorage.setItem('magicTraySettings', JSON.stringify(settings));
    }

    updateDisplay() {
        document.getElementById('level').textContent = this.level;
        document.getElementById('score').textContent = this.score;
        document.getElementById('lives').textContent = this.lives;
        document.getElementById('progressText').textContent = `${this.progress}/${this.maxProgress}`;
        
        const progressPercent = (this.progress / this.maxProgress) * 100;
        document.getElementById('progressFill').style.width = `${progressPercent}%`;
    }

    showMessage(text, type = 'info') {
        // Create temporary message element
        const message = document.createElement('div');
        message.className = 'temp-message';
        message.textContent = text;
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            font-size: 1rem;
            z-index: 2000;
            animation: fadeIn 0.3s ease-out;
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.animation = 'fadeOut 0.3s ease-in';
            setTimeout(() => {
                document.body.removeChild(message);
            }, 300);
        }, 2000);
    }

    playSound(type) {
        if (!this.soundEnabled) return;
        
        // Simple sound simulation using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            const frequencies = {
                appear: 800,
                select: 600,
                success: 1000,
                failure: 300,
                clear: 400
            };
            
            oscillator.frequency.setValueAtTime(frequencies[type] || 500, audioContext.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        } catch (e) {
            console.log('Audio not supported');
        }
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.magicTrayGame = new MagicTrayGame();
});

// Add CSS for temporary messages
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);
