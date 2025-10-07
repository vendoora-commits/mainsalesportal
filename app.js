// Smart Hotel Configurator - Main Application Logic
class SmartHotelConfigurator {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 5;
        this.formData = {};
        
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupEventListeners());
        } else {
            this.setupEventListeners();
        }
    }

    setupEventListeners() {
        // Navigation buttons
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const finishBtn = document.getElementById('finishBtn');

        if (prevBtn) prevBtn.addEventListener('click', () => this.previousStep());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextStep());
        if (finishBtn) finishBtn.addEventListener('click', () => this.finishConfiguration());

        // Export buttons
        const exportJsonBtn = document.getElementById('exportJson');
        const printConfigBtn = document.getElementById('printConfig');

        if (exportJsonBtn) exportJsonBtn.addEventListener('click', () => this.exportAsJson());
        if (printConfigBtn) printConfigBtn.addEventListener('click', () => this.printConfiguration());

        // Toggle switches for feature cards
        this.setupFeatureToggles();

        // Load saved data if any
        this.loadSavedData();
    }

    setupFeatureToggles() {
        // Set up toggle switches to show/hide feature options
        const toggleSwitches = document.querySelectorAll('.toggle-switch input[type="checkbox"]');
        toggleSwitches.forEach(toggle => {
            toggle.addEventListener('change', (e) => {
                const card = e.target.closest('.feature-card');
                if (card) {
                    const options = card.querySelector('.feature-options');
                    if (options) {
                        if (e.target.checked) {
                            options.classList.remove('hidden');
                        } else {
                            options.classList.add('hidden');
                        }
                    }
                }
            });
        });
    }

    nextStep() {
        if (!this.validateCurrentStep()) {
            return;
        }

        this.saveCurrentStepData();

        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.updateUI();
            
            // Generate summary if moving to review step
            if (this.currentStep === this.totalSteps) {
                this.generateSummary();
            }
        }
    }

    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateUI();
        }
    }

    validateCurrentStep() {
        const currentStepElement = document.getElementById(`step${this.currentStep}`);
        if (!currentStepElement) return true;

        // Validate required fields
        const requiredInputs = currentStepElement.querySelectorAll('[required]');
        let isValid = true;

        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = 'var(--danger-color)';
                isValid = false;
            } else {
                input.style.borderColor = '';
            }
        });

        if (!isValid) {
            alert('Please fill in all required fields.');
        }

        return isValid;
    }

    saveCurrentStepData() {
        const currentStepElement = document.getElementById(`step${this.currentStep}`);
        if (!currentStepElement) return;

        const stepKey = `step${this.currentStep}`;
        this.formData[stepKey] = {};

        // Save text inputs
        const textInputs = currentStepElement.querySelectorAll('input[type="text"], input[type="number"]');
        textInputs.forEach(input => {
            if (input.name) {
                this.formData[stepKey][input.name] = input.value;
            }
        });

        // Save select elements
        const selects = currentStepElement.querySelectorAll('select');
        selects.forEach(select => {
            if (select.name) {
                this.formData[stepKey][select.name] = select.value;
            }
        });

        // Save checkboxes
        const checkboxes = currentStepElement.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            if (checkbox.name) {
                if (!this.formData[stepKey][checkbox.name]) {
                    this.formData[stepKey][checkbox.name] = [];
                }
                if (checkbox.checked) {
                    if (Array.isArray(this.formData[stepKey][checkbox.name])) {
                        this.formData[stepKey][checkbox.name].push(checkbox.value);
                    } else {
                        this.formData[stepKey][checkbox.name] = [checkbox.value];
                    }
                }
            }
        });

        // Save radio buttons
        const radioGroups = {};
        const radios = currentStepElement.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            if (radio.name && radio.checked) {
                this.formData[stepKey][radio.name] = radio.value;
            }
        });

        // Save to localStorage
        localStorage.setItem('smartHotelConfig', JSON.stringify(this.formData));
    }

    loadSavedData() {
        const savedData = localStorage.getItem('smartHotelConfig');
        if (savedData) {
            try {
                this.formData = JSON.parse(savedData);
                this.restoreFormData();
            } catch (e) {
                console.error('Error loading saved data:', e);
            }
        }
    }

    restoreFormData() {
        Object.keys(this.formData).forEach(stepKey => {
            const stepData = this.formData[stepKey];
            const stepElement = document.getElementById(stepKey);
            if (!stepElement) return;

            Object.keys(stepData).forEach(fieldName => {
                const value = stepData[fieldName];

                // Restore text inputs
                const textInput = stepElement.querySelector(`input[name="${fieldName}"], select[name="${fieldName}"]`);
                if (textInput && !Array.isArray(value)) {
                    textInput.value = value;
                }

                // Restore checkboxes
                if (Array.isArray(value)) {
                    value.forEach(val => {
                        const checkbox = stepElement.querySelector(`input[name="${fieldName}"][value="${val}"]`);
                        if (checkbox) {
                            checkbox.checked = true;
                            // Trigger change event to show feature options
                            checkbox.dispatchEvent(new Event('change'));
                        }
                    });
                }

                // Restore radio buttons
                if (!Array.isArray(value)) {
                    const radio = stepElement.querySelector(`input[name="${fieldName}"][value="${value}"]`);
                    if (radio && radio.type === 'radio') {
                        radio.checked = true;
                    }
                }
            });
        });
    }

    updateUI() {
        // Update step content visibility
        document.querySelectorAll('.step-content').forEach((step, index) => {
            if (index + 1 === this.currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // Update progress bar
        document.querySelectorAll('.progress-step').forEach((step, index) => {
            if (index + 1 < this.currentStep) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (index + 1 === this.currentStep) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });

        // Update navigation buttons
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const finishBtn = document.getElementById('finishBtn');

        if (prevBtn) {
            prevBtn.disabled = this.currentStep === 1;
        }

        if (nextBtn && finishBtn) {
            if (this.currentStep === this.totalSteps) {
                nextBtn.classList.add('hidden');
                finishBtn.classList.remove('hidden');
            } else {
                nextBtn.classList.remove('hidden');
                finishBtn.classList.add('hidden');
            }
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    generateSummary() {
        const summaryContainer = document.getElementById('configurationSummary');
        if (!summaryContainer) return;

        let summaryHTML = '';

        // Property Details
        if (this.formData.step1) {
            summaryHTML += `
                <div class="summary-section">
                    <h3>${i18n.getTranslation('summary.propertyDetails')}</h3>
                    ${this.generatePropertySummary(this.formData.step1)}
                </div>
            `;
        }

        // Kiosk Features
        if (this.formData.step2) {
            summaryHTML += `
                <div class="summary-section">
                    <h3>${i18n.getTranslation('summary.kioskFeatures')}</h3>
                    ${this.generateKioskSummary(this.formData.step2)}
                </div>
            `;
        }

        // Smart Lock Configuration
        if (this.formData.step3) {
            summaryHTML += `
                <div class="summary-section">
                    <h3>${i18n.getTranslation('summary.lockConfiguration')}</h3>
                    ${this.generateLockSummary(this.formData.step3)}
                </div>
            `;
        }

        // Smart Room Features
        if (this.formData.step4) {
            summaryHTML += `
                <div class="summary-section">
                    <h3>${i18n.getTranslation('summary.roomFeatures')}</h3>
                    ${this.generateRoomSummary(this.formData.step4)}
                </div>
            `;
        }

        summaryContainer.innerHTML = summaryHTML;
    }

    generatePropertySummary(data) {
        let html = '<div class="summary-items">';
        
        if (data.propertyName) {
            html += `
                <div class="summary-item">
                    <label>Property Name:</label>
                    <span>${data.propertyName}</span>
                </div>
            `;
        }
        
        if (data.numberOfRooms) {
            html += `
                <div class="summary-item">
                    <label>Number of Rooms:</label>
                    <span>${data.numberOfRooms}</span>
                </div>
            `;
        }
        
        if (data.propertyType) {
            html += `
                <div class="summary-item">
                    <label>Property Type:</label>
                    <span>${data.propertyType}</span>
                </div>
            `;
        }
        
        if (data.floors) {
            html += `
                <div class="summary-item">
                    <label>Number of Floors:</label>
                    <span>${data.floors}</span>
                </div>
            `;
        }
        
        if (data.inspection && data.inspection.length > 0) {
            html += `
                <div class="summary-item">
                    <label>Inspection Requirements:</label>
                    <ul class="summary-list">
                        ${data.inspection.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        html += '</div>';
        return html;
    }

    generateKioskSummary(data) {
        let html = '<ul class="summary-list">';
        
        if (data.kiosk && data.kiosk.length > 0) {
            data.kiosk.forEach(feature => {
                html += `<li>${this.formatFeatureName(feature)}</li>`;
            });
        } else {
            html += '<li>No kiosk features selected</li>';
        }
        
        html += '</ul>';
        return html;
    }

    generateLockSummary(data) {
        let html = '<div class="summary-items">';
        
        if (data['lock-power']) {
            html += `
                <div class="summary-item">
                    <label>Power Type:</label>
                    <span>${this.formatFeatureName(data['lock-power'])}</span>
                </div>
            `;
        }
        
        if (data['lock-access'] && data['lock-access'].length > 0) {
            html += `
                <div class="summary-item">
                    <label>Access Methods:</label>
                    <ul class="summary-list">
                        ${data['lock-access'].map(item => `<li>${this.formatFeatureName(item)}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        if (data['lock-security'] && data['lock-security'].length > 0) {
            html += `
                <div class="summary-item">
                    <label>Security Features:</label>
                    <ul class="summary-list">
                        ${data['lock-security'].map(item => `<li>${this.formatFeatureName(item)}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        html += '</div>';
        return html;
    }

    generateRoomSummary(data) {
        let html = '<div class="summary-items">';
        
        const categories = [
            { key: 'room-lighting', label: 'Lighting Control' },
            { key: 'room-sensors', label: 'Environmental Sensors' },
            { key: 'room-blinds', label: 'Window Treatments' },
            { key: 'room-climate', label: 'Climate Control' },
            { key: 'room-entertainment', label: 'Entertainment & Connectivity' }
        ];
        
        categories.forEach(category => {
            if (data[category.key] && data[category.key].length > 0) {
                html += `
                    <div class="summary-item">
                        <label>${category.label}:</label>
                        <ul class="summary-list">
                            ${data[category.key].map(item => `<li>${this.formatFeatureName(item)}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }
        });
        
        html += '</div>';
        return html;
    }

    formatFeatureName(name) {
        return name
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    exportAsJson() {
        const config = {
            version: '1.0',
            timestamp: new Date().toISOString(),
            language: i18n.currentLanguage,
            configuration: this.formData
        };

        const jsonString = JSON.stringify(config, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `smart-hotel-config-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    printConfiguration() {
        window.print();
    }

    finishConfiguration() {
        // Save final configuration
        this.saveCurrentStepData();

        // Show success message
        alert('Configuration completed successfully!\n\nYour smart hotel configuration has been saved. You can export it as JSON or print it for your records.');

        // Optional: Clear saved data and reset
        // localStorage.removeItem('smartHotelConfig');
        // location.reload();
    }
}

// Initialize the application
const app = new SmartHotelConfigurator();
