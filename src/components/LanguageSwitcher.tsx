import { useTranslation } from 'react-i18next';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Globe } from 'lucide-react';

const languages = [
    { code: 'fr', name: 'Français', nativeName: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇲🇦' },
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
];

export function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const handleLanguageChange = (langCode: string) => {
        i18n.changeLanguage(langCode);
    };

    const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

    return (
        <Select value={i18n.language} onValueChange={handleLanguageChange}>
            <SelectTrigger
                className="w-[140px]"
                aria-label="Select language"
            >
                <Globe className="w-4 h-4 mr-2" />
                <SelectValue>
                    <span className="flex items-center gap-2">
                        <span>{currentLanguage.flag}</span>
                        <span>{currentLanguage.nativeName}</span>
                    </span>
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                {languages.map((language) => (
                    <SelectItem
                        key={language.code}
                        value={language.code}
                        className="cursor-pointer"
                    >
                        <span className="flex items-center gap-2">
                            <span>{language.flag}</span>
                            <span>{language.nativeName}</span>
                        </span>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
