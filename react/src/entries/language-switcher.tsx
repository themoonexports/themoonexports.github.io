import { mountComponent } from '../utils/mountComponent';
import { LanguageSwitcher } from "@components/LanguageSwitcher";

/**
 * Language Switcher Entry Point
 * Hydrates language selection flags
 */
mountComponent('language-switcher', <LanguageSwitcher />);
