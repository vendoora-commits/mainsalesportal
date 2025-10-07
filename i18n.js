// Internationalization (i18n) module
const i18n = {
    currentLanguage: 'en',
    
    translations: {
        en: {
            app: {
                title: 'Smart Hotel Configurator'
            },
            progress: {
                property: 'Property Setup',
                kiosk: 'Kiosk Selection',
                locks: 'Smart Locks',
                rooms: 'Smart Rooms',
                review: 'Review'
            },
            step1: {
                title: 'Property Setup',
                description: 'Tell us about your property to customize your smart hotel experience.',
                propertyName: 'Property Name',
                numberOfRooms: 'Number of Rooms',
                propertyType: 'Property Type',
                types: {
                    hotel: 'Hotel',
                    resort: 'Resort',
                    boutique: 'Boutique Hotel',
                    hostel: 'Hostel',
                    aparthotel: 'Aparthotel'
                },
                inspectionForm: 'Inspection Form Requirements',
                inspection: {
                    checkin: 'Check-in inspection',
                    checkout: 'Check-out inspection',
                    daily: 'Daily housekeeping inspection',
                    maintenance: 'Maintenance inspection'
                },
                floors: 'Number of Floors'
            },
            step2: {
                title: 'Kiosk Selection',
                description: 'Choose the kiosk features that best suit your property\'s needs.',
                passportScanner: {
                    title: 'Passport Scanner',
                    description: 'Automated guest identification and registration',
                    ocr: 'OCR data extraction',
                    biometric: 'Biometric verification'
                },
                printer: {
                    title: 'Printer',
                    description: 'Print registration cards and receipts',
                    thermal: 'Thermal',
                    inkjet: 'Inkjet',
                    laser: 'Laser'
                },
                keyDispenser: {
                    title: 'Key Card Dispenser',
                    description: 'Automated key card encoding and dispensing',
                    rfid: 'RFID encoding',
                    magnetic: 'Magnetic stripe'
                },
                payment: {
                    title: 'Payment Terminal',
                    description: 'Process guest payments at check-in',
                    contactless: 'Contactless',
                    chip: 'Chip & PIN'
                }
            },
            step3: {
                title: 'Smart Lock Configuration',
                description: 'Configure your smart lock system for maximum security and convenience.',
                powerType: 'Power Type',
                power: {
                    battery: 'Battery Powered',
                    batteryDesc: 'Long-lasting batteries, wireless installation',
                    wired: 'Wired Power',
                    wiredDesc: 'Hardwired connection, no battery changes',
                    hybrid: 'Hybrid (Battery + Wired)',
                    hybridDesc: 'Best of both worlds with backup power'
                },
                accessMethods: 'Access Methods',
                access: {
                    keycard: 'Key Card / RFID',
                    mobile: 'Mobile App / Bluetooth',
                    fingerprint: 'Fingerprint Scanner',
                    pin: 'PIN Code',
                    face: 'Facial Recognition'
                },
                securityFeatures: 'Security Features',
                security: {
                    tamper: 'Tamper Alert',
                    audit: 'Access Audit Trail',
                    remote: 'Remote Lock/Unlock',
                    auto: 'Auto-lock Function'
                }
            },
            step4: {
                title: 'Smart Room Features',
                description: 'Create the perfect guest experience with intelligent room automation.',
                lighting: {
                    title: 'Lighting Control',
                    switches: 'Smart Light Switches',
                    dimmer: 'Dimmable Lights',
                    scenes: 'Lighting Scenes (Relax, Work, Sleep)',
                    motion: 'Motion-activated Lighting'
                },
                sensors: {
                    title: 'Environmental Sensors',
                    motion: 'Motion Sensors',
                    occupancy: 'Occupancy Detection',
                    temperature: 'Temperature Sensors',
                    humidity: 'Humidity Sensors',
                    airQuality: 'Air Quality Monitoring'
                },
                blinds: {
                    title: 'Window Treatments',
                    motorized: 'Motorized Blinds/Curtains',
                    scheduled: 'Scheduled Opening/Closing',
                    lightSensing: 'Light-sensing Auto-adjustment'
                },
                climate: {
                    title: 'Climate Control',
                    thermostat: 'Smart Thermostat',
                    zoneControl: 'Multi-zone Temperature Control',
                    energySaving: 'Energy-saving Mode (vacant rooms)',
                    schedule: 'Temperature Scheduling'
                },
                entertainment: {
                    title: 'Entertainment & Connectivity',
                    smartTv: 'Smart TV Integration',
                    voice: 'Voice Assistant',
                    casting: 'Screen Casting'
                }
            },
            step5: {
                title: 'Configuration Review',
                description: 'Review your smart hotel configuration before finalizing.',
                exportJson: 'Export as JSON',
                print: 'Print Configuration'
            },
            nav: {
                previous: 'Previous',
                next: 'Next',
                finish: 'Finish Configuration'
            },
            summary: {
                propertyDetails: 'Property Details',
                kioskFeatures: 'Kiosk Features',
                lockConfiguration: 'Smart Lock Configuration',
                roomFeatures: 'Smart Room Features'
            }
        },
        es: {
            app: {
                title: 'Configurador de Hotel Inteligente'
            },
            progress: {
                property: 'Configuración de Propiedad',
                kiosk: 'Selección de Kiosco',
                locks: 'Cerraduras Inteligentes',
                rooms: 'Habitaciones Inteligentes',
                review: 'Revisar'
            },
            step1: {
                title: 'Configuración de Propiedad',
                description: 'Cuéntenos sobre su propiedad para personalizar su experiencia de hotel inteligente.',
                propertyName: 'Nombre de la Propiedad',
                numberOfRooms: 'Número de Habitaciones',
                propertyType: 'Tipo de Propiedad',
                types: {
                    hotel: 'Hotel',
                    resort: 'Resort',
                    boutique: 'Hotel Boutique',
                    hostel: 'Hostal',
                    aparthotel: 'Aparthotel'
                },
                inspectionForm: 'Requisitos de Formulario de Inspección',
                inspection: {
                    checkin: 'Inspección de entrada',
                    checkout: 'Inspección de salida',
                    daily: 'Inspección de limpieza diaria',
                    maintenance: 'Inspección de mantenimiento'
                },
                floors: 'Número de Pisos'
            },
            step2: {
                title: 'Selección de Kiosco',
                description: 'Elija las características del kiosco que mejor se adapten a las necesidades de su propiedad.',
                passportScanner: {
                    title: 'Escáner de Pasaportes',
                    description: 'Identificación y registro automatizado de huéspedes',
                    ocr: 'Extracción de datos OCR',
                    biometric: 'Verificación biométrica'
                },
                printer: {
                    title: 'Impresora',
                    description: 'Imprimir tarjetas de registro y recibos',
                    thermal: 'Térmica',
                    inkjet: 'Inyección de tinta',
                    laser: 'Láser'
                },
                keyDispenser: {
                    title: 'Dispensador de Tarjetas Llave',
                    description: 'Codificación y dispensación automática de tarjetas llave',
                    rfid: 'Codificación RFID',
                    magnetic: 'Banda magnética'
                },
                payment: {
                    title: 'Terminal de Pago',
                    description: 'Procesar pagos de huéspedes en el check-in',
                    contactless: 'Sin contacto',
                    chip: 'Chip y PIN'
                }
            },
            step3: {
                title: 'Configuración de Cerraduras Inteligentes',
                description: 'Configure su sistema de cerraduras inteligentes para máxima seguridad y comodidad.',
                powerType: 'Tipo de Energía',
                power: {
                    battery: 'Alimentado por Batería',
                    batteryDesc: 'Baterías de larga duración, instalación inalámbrica',
                    wired: 'Alimentación Cableada',
                    wiredDesc: 'Conexión cableada, sin cambios de batería',
                    hybrid: 'Híbrido (Batería + Cableado)',
                    hybridDesc: 'Lo mejor de ambos mundos con energía de respaldo'
                },
                accessMethods: 'Métodos de Acceso',
                access: {
                    keycard: 'Tarjeta Llave / RFID',
                    mobile: 'Aplicación Móvil / Bluetooth',
                    fingerprint: 'Escáner de Huellas Dactilares',
                    pin: 'Código PIN',
                    face: 'Reconocimiento Facial'
                },
                securityFeatures: 'Características de Seguridad',
                security: {
                    tamper: 'Alerta de Manipulación',
                    audit: 'Registro de Auditoría de Acceso',
                    remote: 'Bloqueo/Desbloqueo Remoto',
                    auto: 'Función de Auto-bloqueo'
                }
            },
            step4: {
                title: 'Características de Habitaciones Inteligentes',
                description: 'Cree la experiencia perfecta para los huéspedes con automatización inteligente de habitaciones.',
                lighting: {
                    title: 'Control de Iluminación',
                    switches: 'Interruptores de Luz Inteligentes',
                    dimmer: 'Luces Regulables',
                    scenes: 'Escenas de Iluminación (Relajar, Trabajar, Dormir)',
                    motion: 'Iluminación Activada por Movimiento'
                },
                sensors: {
                    title: 'Sensores Ambientales',
                    motion: 'Sensores de Movimiento',
                    occupancy: 'Detección de Ocupación',
                    temperature: 'Sensores de Temperatura',
                    humidity: 'Sensores de Humedad',
                    airQuality: 'Monitoreo de Calidad del Aire'
                },
                blinds: {
                    title: 'Tratamientos de Ventanas',
                    motorized: 'Persianas/Cortinas Motorizadas',
                    scheduled: 'Apertura/Cierre Programado',
                    lightSensing: 'Ajuste Automático con Sensor de Luz'
                },
                climate: {
                    title: 'Control de Clima',
                    thermostat: 'Termostato Inteligente',
                    zoneControl: 'Control de Temperatura Multi-zona',
                    energySaving: 'Modo de Ahorro de Energía (habitaciones vacías)',
                    schedule: 'Programación de Temperatura'
                },
                entertainment: {
                    title: 'Entretenimiento y Conectividad',
                    smartTv: 'Integración de TV Inteligente',
                    voice: 'Asistente de Voz',
                    casting: 'Transmisión de Pantalla'
                }
            },
            step5: {
                title: 'Revisión de Configuración',
                description: 'Revise su configuración de hotel inteligente antes de finalizar.',
                exportJson: 'Exportar como JSON',
                print: 'Imprimir Configuración'
            },
            nav: {
                previous: 'Anterior',
                next: 'Siguiente',
                finish: 'Finalizar Configuración'
            },
            summary: {
                propertyDetails: 'Detalles de la Propiedad',
                kioskFeatures: 'Características del Kiosco',
                lockConfiguration: 'Configuración de Cerraduras Inteligentes',
                roomFeatures: 'Características de Habitaciones Inteligentes'
            }
        },
        fr: {
            app: {
                title: 'Configurateur d\'Hôtel Intelligent'
            },
            progress: {
                property: 'Configuration de Propriété',
                kiosk: 'Sélection de Kiosque',
                locks: 'Serrures Intelligentes',
                rooms: 'Chambres Intelligentes',
                review: 'Révision'
            },
            step1: {
                title: 'Configuration de Propriété',
                description: 'Parlez-nous de votre propriété pour personnaliser votre expérience d\'hôtel intelligent.',
                propertyName: 'Nom de la Propriété',
                numberOfRooms: 'Nombre de Chambres',
                propertyType: 'Type de Propriété',
                types: {
                    hotel: 'Hôtel',
                    resort: 'Station',
                    boutique: 'Hôtel Boutique',
                    hostel: 'Auberge',
                    aparthotel: 'Appart\'hôtel'
                },
                inspectionForm: 'Exigences du Formulaire d\'Inspection',
                inspection: {
                    checkin: 'Inspection à l\'arrivée',
                    checkout: 'Inspection au départ',
                    daily: 'Inspection quotidienne du ménage',
                    maintenance: 'Inspection de maintenance'
                },
                floors: 'Nombre d\'Étages'
            },
            nav: {
                previous: 'Précédent',
                next: 'Suivant',
                finish: 'Terminer la Configuration'
            }
        },
        de: {
            app: {
                title: 'Smart Hotel Konfigurator'
            },
            progress: {
                property: 'Eigenschaftseinrichtung',
                kiosk: 'Kiosk-Auswahl',
                locks: 'Intelligente Schlösser',
                rooms: 'Intelligente Zimmer',
                review: 'Überprüfung'
            },
            step1: {
                title: 'Eigenschaftseinrichtung',
                description: 'Erzählen Sie uns von Ihrer Immobilie, um Ihr intelligentes Hotelerlebnis anzupassen.',
                propertyName: 'Eigenschaftsname',
                numberOfRooms: 'Anzahl der Zimmer',
                propertyType: 'Eigenschaftstyp',
                types: {
                    hotel: 'Hotel',
                    resort: 'Resort',
                    boutique: 'Boutique-Hotel',
                    hostel: 'Hostel',
                    aparthotel: 'Aparthotel'
                },
                inspectionForm: 'Anforderungen an Inspektionsformulare',
                inspection: {
                    checkin: 'Check-in-Inspektion',
                    checkout: 'Check-out-Inspektion',
                    daily: 'Tägliche Reinigungsinspektion',
                    maintenance: 'Wartungsinspektion'
                },
                floors: 'Anzahl der Etagen'
            },
            nav: {
                previous: 'Zurück',
                next: 'Weiter',
                finish: 'Konfiguration Abschließen'
            }
        },
        zh: {
            app: {
                title: '智能酒店配置器'
            },
            progress: {
                property: '物业设置',
                kiosk: '自助服务终端选择',
                locks: '智能门锁',
                rooms: '智能客房',
                review: '审查'
            },
            step1: {
                title: '物业设置',
                description: '告诉我们您的物业信息以定制您的智能酒店体验。',
                propertyName: '物业名称',
                numberOfRooms: '房间数量',
                propertyType: '物业类型',
                types: {
                    hotel: '酒店',
                    resort: '度假村',
                    boutique: '精品酒店',
                    hostel: '青年旅舍',
                    aparthotel: '公寓式酒店'
                },
                inspectionForm: '检查表要求',
                inspection: {
                    checkin: '入住检查',
                    checkout: '退房检查',
                    daily: '每日客房检查',
                    maintenance: '维护检查'
                },
                floors: '楼层数'
            },
            nav: {
                previous: '上一步',
                next: '下一步',
                finish: '完成配置'
            }
        }
    },

    // Initialize i18n
    init() {
        const savedLang = localStorage.getItem('language') || 'en';
        this.setLanguage(savedLang);
        
        // Add event listener for language selector
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.value = savedLang;
            languageSelect.addEventListener('change', (e) => {
                this.setLanguage(e.target.value);
            });
        }
    },

    // Set language and update UI
    setLanguage(lang) {
        if (!this.translations[lang]) {
            lang = 'en'; // fallback to English
        }
        
        this.currentLanguage = lang;
        localStorage.setItem('language', lang);
        this.updateUI();
    },

    // Update all UI elements with translations
    updateUI() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            
            if (translation) {
                if (element.tagName === 'INPUT' && element.placeholder) {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
    },

    // Get translation by key (supports nested keys like 'step1.title')
    getTranslation(key) {
        const keys = key.split('.');
        let translation = this.translations[this.currentLanguage];
        
        for (const k of keys) {
            if (translation && translation[k]) {
                translation = translation[k];
            } else {
                // Fallback to English if translation not found
                translation = this.translations.en;
                for (const fallbackKey of keys) {
                    if (translation && translation[fallbackKey]) {
                        translation = translation[fallbackKey];
                    } else {
                        return key; // Return key if translation not found
                    }
                }
                break;
            }
        }
        
        return translation;
    }
};

// Initialize i18n when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => i18n.init());
} else {
    i18n.init();
}
