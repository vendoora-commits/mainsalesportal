import { useState, useEffect } from 'react';
import { locales, type Locale, defaultLocale } from '@/lib/i18n';

// Simple translation hook for the multilingual system
// This provides a foundation that can be easily replaced with next-intl later

interface TranslationMessages {
  [key: string]: string | TranslationMessages;
}

interface UseTranslationReturn {
  t: (key: string) => string;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isLoading: boolean;
}

// Mock translation messages - in a real app, these would be loaded from JSON files
const mockMessages: Record<Locale, TranslationMessages> = {
  en: {
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      view: 'View',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      continue: 'Continue',
      finish: 'Finish',
      close: 'Close',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      export: 'Export',
      import: 'Import',
      download: 'Download',
      upload: 'Upload',
      submit: 'Submit',
      reset: 'Reset',
      clear: 'Clear',
      select: 'Select',
      choose: 'Choose',
      add: 'Add',
      remove: 'Remove',
      update: 'Update',
      create: 'Create',
      confirm: 'Confirm',
      yes: 'Yes',
      no: 'No',
      ok: 'OK'
    },
    navigation: {
      home: 'Home',
      setup: 'Setup',
      kiosk: 'Kiosk Selection',
      locks: 'Smart Locks',
      features: 'Room Features',
      checkout: 'Checkout',
      admin: 'Admin',
      dashboard: 'Dashboard',
      orders: 'Orders',
      products: 'Products',
      analytics: 'Analytics',
      settings: 'Settings',
      profile: 'Profile',
      logout: 'Logout'
    },
    home: {
      title: 'Transform Your Hotel with Smart Technology',
      subtitle: 'Customize your hotel property with intelligent kiosks, smart locks, and automated room features. Create the perfect guest experience with our comprehensive smart hotel solutions.',
      startConfiguration: 'Start Configuration',
      viewSolutions: 'View Solutions',
      completeSolutions: 'Complete Smart Hotel Solutions',
      solutionsDescription: 'Everything you need to modernize your hotel property',
      configurationProcess: 'Simple Configuration Process',
      processDescription: 'Get your smart hotel solution in just 4 easy steps',
      startYourConfiguration: 'Start Your Configuration'
    }
  },
  es: {
    common: {
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
      cancel: 'Cancelar',
      save: 'Guardar',
      delete: 'Eliminar',
      edit: 'Editar',
      view: 'Ver',
      back: 'Atrás',
      next: 'Siguiente',
      previous: 'Anterior',
      continue: 'Continuar',
      finish: 'Terminar',
      close: 'Cerrar',
      search: 'Buscar',
      filter: 'Filtrar',
      sort: 'Ordenar',
      export: 'Exportar',
      import: 'Importar',
      download: 'Descargar',
      upload: 'Subir',
      submit: 'Enviar',
      reset: 'Restablecer',
      clear: 'Limpiar',
      select: 'Seleccionar',
      choose: 'Elegir',
      add: 'Agregar',
      remove: 'Quitar',
      update: 'Actualizar',
      create: 'Crear',
      confirm: 'Confirmar',
      yes: 'Sí',
      no: 'No',
      ok: 'OK'
    },
    navigation: {
      home: 'Inicio',
      setup: 'Configuración',
      kiosk: 'Selección de Kioscos',
      locks: 'Cerraduras Inteligentes',
      features: 'Características de Habitación',
      checkout: 'Pago',
      admin: 'Administrador',
      dashboard: 'Panel de Control',
      orders: 'Pedidos',
      products: 'Productos',
      analytics: 'Analíticas',
      settings: 'Configuración',
      profile: 'Perfil',
      logout: 'Cerrar Sesión'
    },
    home: {
      title: 'Transforma Tu Hotel con Tecnología Inteligente',
      subtitle: 'Personaliza tu propiedad hotelera con kioscos inteligentes, cerraduras inteligentes y características automatizadas de habitaciones. Crea la experiencia perfecta para huéspedes con nuestras soluciones integrales de hotel inteligente.',
      startConfiguration: 'Iniciar Configuración',
      viewSolutions: 'Ver Soluciones',
      completeSolutions: 'Soluciones Completas de Hotel Inteligente',
      solutionsDescription: 'Todo lo que necesitas para modernizar tu propiedad hotelera',
      configurationProcess: 'Proceso de Configuración Simple',
      processDescription: 'Obtén tu solución de hotel inteligente en solo 4 pasos fáciles',
      startYourConfiguration: 'Inicia Tu Configuración'
    }
  },
  fr: {
    common: {
      loading: 'Chargement...',
      error: 'Erreur',
      success: 'Succès',
      cancel: 'Annuler',
      save: 'Enregistrer',
      delete: 'Supprimer',
      edit: 'Modifier',
      view: 'Voir',
      back: 'Retour',
      next: 'Suivant',
      previous: 'Précédent',
      continue: 'Continuer',
      finish: 'Terminer',
      close: 'Fermer',
      search: 'Rechercher',
      filter: 'Filtrer',
      sort: 'Trier',
      export: 'Exporter',
      import: 'Importer',
      download: 'Télécharger',
      upload: 'Téléverser',
      submit: 'Soumettre',
      reset: 'Réinitialiser',
      clear: 'Effacer',
      select: 'Sélectionner',
      choose: 'Choisir',
      add: 'Ajouter',
      remove: 'Supprimer',
      update: 'Mettre à jour',
      create: 'Créer',
      confirm: 'Confirmer',
      yes: 'Oui',
      no: 'Non',
      ok: 'OK'
    },
    navigation: {
      home: 'Accueil',
      setup: 'Configuration',
      kiosk: 'Sélection de Kiosques',
      locks: 'Serrures Intelligentes',
      features: 'Caractéristiques de Chambre',
      checkout: 'Paiement',
      admin: 'Administrateur',
      dashboard: 'Tableau de Bord',
      orders: 'Commandes',
      products: 'Produits',
      analytics: 'Analyses',
      settings: 'Paramètres',
      profile: 'Profil',
      logout: 'Déconnexion'
    },
    home: {
      title: 'Transformez Votre Hôtel avec la Technologie Intelligente',
      subtitle: 'Personnalisez votre propriété hôtelière avec des kiosques intelligents, des serrures intelligentes et des fonctionnalités automatisées de chambre. Créez l\'expérience parfaite pour les invités avec nos solutions complètes d\'hôtel intelligent.',
      startConfiguration: 'Commencer la Configuration',
      viewSolutions: 'Voir les Solutions',
      completeSolutions: 'Solutions Complètes d\'Hôtel Intelligent',
      solutionsDescription: 'Tout ce dont vous avez besoin pour moderniser votre propriété hôtelière',
      configurationProcess: 'Processus de Configuration Simple',
      processDescription: 'Obtenez votre solution d\'hôtel intelligent en seulement 4 étapes faciles',
      startYourConfiguration: 'Commencez Votre Configuration'
    }
  },
  de: {
    common: {
      loading: 'Laden...',
      error: 'Fehler',
      success: 'Erfolg',
      cancel: 'Abbrechen',
      save: 'Speichern',
      delete: 'Löschen',
      edit: 'Bearbeiten',
      view: 'Anzeigen',
      back: 'Zurück',
      next: 'Weiter',
      previous: 'Vorherige',
      continue: 'Fortfahren',
      finish: 'Beenden',
      close: 'Schließen',
      search: 'Suchen',
      filter: 'Filtern',
      sort: 'Sortieren',
      export: 'Exportieren',
      import: 'Importieren',
      download: 'Herunterladen',
      upload: 'Hochladen',
      submit: 'Senden',
      reset: 'Zurücksetzen',
      clear: 'Löschen',
      select: 'Auswählen',
      choose: 'Wählen',
      add: 'Hinzufügen',
      remove: 'Entfernen',
      update: 'Aktualisieren',
      create: 'Erstellen',
      confirm: 'Bestätigen',
      yes: 'Ja',
      no: 'Nein',
      ok: 'OK'
    },
    navigation: {
      home: 'Startseite',
      setup: 'Einrichtung',
      kiosk: 'Kiosk-Auswahl',
      locks: 'Intelligente Schlösser',
      features: 'Zimmerfunktionen',
      checkout: 'Kasse',
      admin: 'Administrator',
      dashboard: 'Dashboard',
      orders: 'Bestellungen',
      products: 'Produkte',
      analytics: 'Analytik',
      settings: 'Einstellungen',
      profile: 'Profil',
      logout: 'Abmelden'
    },
    home: {
      title: 'Verwandeln Sie Ihr Hotel mit intelligenter Technologie',
      subtitle: 'Personalisieren Sie Ihre Hotelimmobilie mit intelligenten Kiosken, intelligenten Schlössern und automatisierten Zimmerfunktionen. Schaffen Sie die perfekte Gästeerfahrung mit unseren umfassenden intelligenten Hotel-Lösungen.',
      startConfiguration: 'Konfiguration starten',
      viewSolutions: 'Lösungen anzeigen',
      completeSolutions: 'Vollständige intelligente Hotel-Lösungen',
      solutionsDescription: 'Alles was Sie brauchen, um Ihre Hotelimmobilie zu modernisieren',
      configurationProcess: 'Einfacher Konfigurationsprozess',
      processDescription: 'Erhalten Sie Ihre intelligente Hotel-Lösung in nur 4 einfachen Schritten',
      startYourConfiguration: 'Starten Sie Ihre Konfiguration'
    }
  },
  it: {
    common: {
      loading: 'Caricamento...',
      error: 'Errore',
      success: 'Successo',
      cancel: 'Annulla',
      save: 'Salva',
      delete: 'Elimina',
      edit: 'Modifica',
      view: 'Visualizza',
      back: 'Indietro',
      next: 'Avanti',
      previous: 'Precedente',
      continue: 'Continua',
      finish: 'Termina',
      close: 'Chiudi',
      search: 'Cerca',
      filter: 'Filtra',
      sort: 'Ordina',
      export: 'Esporta',
      import: 'Importa',
      download: 'Scarica',
      upload: 'Carica',
      submit: 'Invia',
      reset: 'Reimposta',
      clear: 'Cancella',
      select: 'Seleziona',
      choose: 'Scegli',
      add: 'Aggiungi',
      remove: 'Rimuovi',
      update: 'Aggiorna',
      create: 'Crea',
      confirm: 'Conferma',
      yes: 'Sì',
      no: 'No',
      ok: 'OK'
    },
    navigation: {
      home: 'Home',
      setup: 'Configurazione',
      kiosk: 'Selezione Chioschi',
      locks: 'Serrature Intelligenti',
      features: 'Caratteristiche Camera',
      checkout: 'Checkout',
      admin: 'Amministratore',
      dashboard: 'Dashboard',
      orders: 'Ordini',
      products: 'Prodotti',
      analytics: 'Analisi',
      settings: 'Impostazioni',
      profile: 'Profilo',
      logout: 'Logout'
    },
    home: {
      title: 'Trasforma il Tuo Hotel con la Tecnologia Intelligente',
      subtitle: 'Personalizza la tua proprietà alberghiera con chioschi intelligenti, serrature intelligenti e caratteristiche automatizzate delle camere. Crea l\'esperienza perfetta per gli ospiti con le nostre soluzioni complete per hotel intelligenti.',
      startConfiguration: 'Inizia Configurazione',
      viewSolutions: 'Visualizza Soluzioni',
      completeSolutions: 'Soluzioni Complete per Hotel Intelligenti',
      solutionsDescription: 'Tutto ciò di cui hai bisogno per modernizzare la tua proprietà alberghiera',
      configurationProcess: 'Processo di Configurazione Semplice',
      processDescription: 'Ottieni la tua soluzione per hotel intelligenti in soli 4 passaggi facili',
      startYourConfiguration: 'Inizia la Tua Configurazione'
    }
  },
  pt: {
    common: {
      loading: 'Carregando...',
      error: 'Erro',
      success: 'Sucesso',
      cancel: 'Cancelar',
      save: 'Salvar',
      delete: 'Excluir',
      edit: 'Editar',
      view: 'Visualizar',
      back: 'Voltar',
      next: 'Próximo',
      previous: 'Anterior',
      continue: 'Continuar',
      finish: 'Finalizar',
      close: 'Fechar',
      search: 'Pesquisar',
      filter: 'Filtrar',
      sort: 'Ordenar',
      export: 'Exportar',
      import: 'Importar',
      download: 'Baixar',
      upload: 'Enviar',
      submit: 'Enviar',
      reset: 'Redefinir',
      clear: 'Limpar',
      select: 'Selecionar',
      choose: 'Escolher',
      add: 'Adicionar',
      remove: 'Remover',
      update: 'Atualizar',
      create: 'Criar',
      confirm: 'Confirmar',
      yes: 'Sim',
      no: 'Não',
      ok: 'OK'
    },
    navigation: {
      home: 'Início',
      setup: 'Configuração',
      kiosk: 'Seleção de Quiosques',
      locks: 'Fechaduras Inteligentes',
      features: 'Recursos do Quarto',
      checkout: 'Finalizar Compra',
      admin: 'Administrador',
      dashboard: 'Painel',
      orders: 'Pedidos',
      products: 'Produtos',
      analytics: 'Análises',
      settings: 'Configurações',
      profile: 'Perfil',
      logout: 'Sair'
    },
    home: {
      title: 'Transforme Seu Hotel com Tecnologia Inteligente',
      subtitle: 'Personalize sua propriedade hoteleira com quiosques inteligentes, fechaduras inteligentes e recursos automatizados de quarto. Crie a experiência perfeita para hóspedes com nossas soluções completas de hotel inteligente.',
      startConfiguration: 'Iniciar Configuração',
      viewSolutions: 'Ver Soluções',
      completeSolutions: 'Soluções Completas de Hotel Inteligente',
      solutionsDescription: 'Tudo que você precisa para modernizar sua propriedade hoteleira',
      configurationProcess: 'Processo de Configuração Simples',
      processDescription: 'Obtenha sua solução de hotel inteligente em apenas 4 passos fáceis',
      startYourConfiguration: 'Inicie Sua Configuração'
    }
  },
  ja: {
    common: {
      loading: '読み込み中...',
      error: 'エラー',
      success: '成功',
      cancel: 'キャンセル',
      save: '保存',
      delete: '削除',
      edit: '編集',
      view: '表示',
      back: '戻る',
      next: '次へ',
      previous: '前へ',
      continue: '続行',
      finish: '完了',
      close: '閉じる',
      search: '検索',
      filter: 'フィルター',
      sort: '並び替え',
      export: 'エクスポート',
      import: 'インポート',
      download: 'ダウンロード',
      upload: 'アップロード',
      submit: '送信',
      reset: 'リセット',
      clear: 'クリア',
      select: '選択',
      choose: '選択',
      add: '追加',
      remove: '削除',
      update: '更新',
      create: '作成',
      confirm: '確認',
      yes: 'はい',
      no: 'いいえ',
      ok: 'OK'
    },
    navigation: {
      home: 'ホーム',
      setup: 'セットアップ',
      kiosk: 'キオスク選択',
      locks: 'スマートロック',
      features: '客室機能',
      checkout: 'チェックアウト',
      admin: '管理者',
      dashboard: 'ダッシュボード',
      orders: '注文',
      products: '製品',
      analytics: '分析',
      settings: '設定',
      profile: 'プロフィール',
      logout: 'ログアウト'
    },
    home: {
      title: 'スマートテクノロジーでホテルを変革',
      subtitle: 'インテリジェントなキオスク、スマートロック、自動化された客室機能でホテルプロパティをカスタマイズ。包括的なスマートホテルソリューションで完璧なゲスト体験を作り出します。',
      startConfiguration: '設定を開始',
      viewSolutions: 'ソリューションを見る',
      completeSolutions: '完全なスマートホテルソリューション',
      solutionsDescription: 'ホテルプロパティを近代化するために必要なすべて',
      configurationProcess: 'シンプルな設定プロセス',
      processDescription: 'わずか4つの簡単なステップでスマートホテルソリューションを取得',
      startYourConfiguration: '設定を開始'
    }
  },
  ko: {
    common: {
      loading: '로딩 중...',
      error: '오류',
      success: '성공',
      cancel: '취소',
      save: '저장',
      delete: '삭제',
      edit: '편집',
      view: '보기',
      back: '뒤로',
      next: '다음',
      previous: '이전',
      continue: '계속',
      finish: '완료',
      close: '닫기',
      search: '검색',
      filter: '필터',
      sort: '정렬',
      export: '내보내기',
      import: '가져오기',
      download: '다운로드',
      upload: '업로드',
      submit: '제출',
      reset: '재설정',
      clear: '지우기',
      select: '선택',
      choose: '선택',
      add: '추가',
      remove: '제거',
      update: '업데이트',
      create: '생성',
      confirm: '확인',
      yes: '예',
      no: '아니오',
      ok: 'OK'
    },
    navigation: {
      home: '홈',
      setup: '설정',
      kiosk: '키오스크 선택',
      locks: '스마트 잠금',
      features: '객실 기능',
      checkout: '결제',
      admin: '관리자',
      dashboard: '대시보드',
      orders: '주문',
      products: '제품',
      analytics: '분석',
      settings: '설정',
      profile: '프로필',
      logout: '로그아웃'
    },
    home: {
      title: '스마트 기술로 호텔을 변화시키세요',
      subtitle: '지능형 키오스크, 스마트 잠금, 자동화된 객실 기능으로 호텔 부동산을 맞춤 설정하세요. 포괄적인 스마트 호텔 솔루션으로 완벽한 게스트 경험을 만드세요.',
      startConfiguration: '설정 시작',
      viewSolutions: '솔루션 보기',
      completeSolutions: '완전한 스마트 호텔 솔루션',
      solutionsDescription: '호텔 부동산을 현대화하는 데 필요한 모든 것',
      configurationProcess: '간단한 설정 프로세스',
      processDescription: '단 4개의 쉬운 단계로 스마트 호텔 솔루션을 얻으세요',
      startYourConfiguration: '설정을 시작하세요'
    }
  },
  zh: {
    common: {
      loading: '加载中...',
      error: '错误',
      success: '成功',
      cancel: '取消',
      save: '保存',
      delete: '删除',
      edit: '编辑',
      view: '查看',
      back: '返回',
      next: '下一步',
      previous: '上一步',
      continue: '继续',
      finish: '完成',
      close: '关闭',
      search: '搜索',
      filter: '筛选',
      sort: '排序',
      export: '导出',
      import: '导入',
      download: '下载',
      upload: '上传',
      submit: '提交',
      reset: '重置',
      clear: '清除',
      select: '选择',
      choose: '选择',
      add: '添加',
      remove: '移除',
      update: '更新',
      create: '创建',
      confirm: '确认',
      yes: '是',
      no: '否',
      ok: '确定'
    },
    navigation: {
      home: '首页',
      setup: '设置',
      kiosk: '自助服务机选择',
      locks: '智能锁',
      features: '客房功能',
      checkout: '结账',
      admin: '管理员',
      dashboard: '仪表板',
      orders: '订单',
      products: '产品',
      analytics: '分析',
      settings: '设置',
      profile: '个人资料',
      logout: '退出登录'
    },
    home: {
      title: '用智能技术改变您的酒店',
      subtitle: '通过智能自助服务机、智能锁和自动化客房功能定制您的酒店物业。通过我们全面的智能酒店解决方案为客人创造完美体验。',
      startConfiguration: '开始配置',
      viewSolutions: '查看解决方案',
      completeSolutions: '完整的智能酒店解决方案',
      solutionsDescription: '现代化您的酒店物业所需的一切',
      configurationProcess: '简单的配置流程',
      processDescription: '只需4个简单步骤即可获得您的智能酒店解决方案',
      startYourConfiguration: '开始您的配置'
    }
  },
  ar: {
    common: {
      loading: 'جاري التحميل...',
      error: 'خطأ',
      success: 'نجح',
      cancel: 'إلغاء',
      save: 'حفظ',
      delete: 'حذف',
      edit: 'تعديل',
      view: 'عرض',
      back: 'رجوع',
      next: 'التالي',
      previous: 'السابق',
      continue: 'متابعة',
      finish: 'إنهاء',
      close: 'إغلاق',
      search: 'بحث',
      filter: 'تصفية',
      sort: 'ترتيب',
      export: 'تصدير',
      import: 'استيراد',
      download: 'تحميل',
      upload: 'رفع',
      submit: 'إرسال',
      reset: 'إعادة تعيين',
      clear: 'مسح',
      select: 'اختيار',
      choose: 'اختيار',
      add: 'إضافة',
      remove: 'إزالة',
      update: 'تحديث',
      create: 'إنشاء',
      confirm: 'تأكيد',
      yes: 'نعم',
      no: 'لا',
      ok: 'موافق'
    },
    navigation: {
      home: 'الرئيسية',
      setup: 'الإعداد',
      kiosk: 'اختيار الكشك',
      locks: 'الأقفال الذكية',
      features: 'ميزات الغرفة',
      checkout: 'الدفع',
      admin: 'المدير',
      dashboard: 'لوحة التحكم',
      orders: 'الطلبات',
      products: 'المنتجات',
      analytics: 'التحليلات',
      settings: 'الإعدادات',
      profile: 'الملف الشخصي',
      logout: 'تسجيل الخروج'
    },
    home: {
      title: 'حول فندقك بالتكنولوجيا الذكية',
      subtitle: 'خصص عقار فندقك بأكشاك ذكية وأقفال ذكية وميزات غرف مؤتمتة. أنشئ تجربة ضيوف مثالية مع حلول الفندق الذكي الشاملة.',
      startConfiguration: 'بدء التكوين',
      viewSolutions: 'عرض الحلول',
      completeSolutions: 'حلول الفندق الذكي الكاملة',
      solutionsDescription: 'كل ما تحتاجه لتحديث عقار فندقك',
      configurationProcess: 'عملية تكوين بسيطة',
      processDescription: 'احصل على حل الفندق الذكي في 4 خطوات سهلة فقط',
      startYourConfiguration: 'ابدأ تكوينك'
    }
  }
};

export function useTranslation(initialLocale: Locale = defaultLocale): UseTranslationReturn {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [isLoading, setIsLoading] = useState(false);

  const setLocale = (newLocale: Locale) => {
    setIsLoading(true);
    setLocaleState(newLocale);
    
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = mockMessages[locale];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if key not found
        value = mockMessages[defaultLocale];
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return key if not found in fallback
          }
        }
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return {
    t,
    locale,
    setLocale,
    isLoading
  };
}
