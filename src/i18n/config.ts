import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        common: {
            loading: "Loading...",
            error: "Error",
            success: "Success",
            submit: "Submit",
            cancel: "Cancel",
            close: "Close",
            save: "Save",
            delete: "Delete",
            edit: "Edit",
            search: "Search",
            contactUs: "Contact us"
        },
        navigation: {
            home: "Home",
            about: "About",
            services: "Services",
            portfolio: "Portfolio",
            blog: "Blog",
            contact: "Contact"
        }
    },
    fr: {
        common: {
            loading: "Chargement...",
            error: "Erreur",
            success: "Succès",
            submit: "Soumettre",
            cancel: "Annuler",
            close: "Fermer",
            save: "Enregistrer",
            delete: "Supprimer",
            edit: "Modifier",
            search: "Rechercher",
            contactUs: "Nous contacter"
        },
        navigation: {
            home: "Accueil",
            about: "À propos",
            services: "Services",
            portfolio: "Portfolio",
            blog: "Blog",
            contact: "Contact"
        }
    },
    ar: {
        common: {
            loading: "جارٍ التحميل...",
            error: "خطأ",
            success: "نجاح",
            submit: "إرسال",
            cancel: "إلغاء",
            close: "إغلاق",
            save: "حفظ",
            delete: "حذف",
            edit: "تعديل",
            search: "بحث",
            contactUs: "اتصل بنا"
        },
        navigation: {
            home: "الرئيسية",
            about: "من نحن",
            services: "الخدمات",
            portfolio: "الأعمال",
            blog: "المدونة",
            contact: "اتصل بنا"
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'fr',
        supportedLngs: ['en', 'fr', 'ar'],
        defaultNS: 'common',
        ns: ['common', 'navigation'],
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
        react: {
            useSuspense: false,
        },
    });

i18n.on('languageChanged', (lng) => {
    const dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lng);
});

export default i18n;
