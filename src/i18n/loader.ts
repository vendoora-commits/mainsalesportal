/**
 * Translation Loader
 * Loads and manages translation files for all locales
 */

import type { Locale } from './config';

// Translation message type
export type Messages = Record<string, unknown>;

/**
 * Load messages for a locale
 */
export async function loadMessages(locale: Locale): Promise<Messages> {
  try {
    // Map new locale codes to existing message files
    const messageMap: Record<Locale, string> = {
      'en-US': 'en',
      'zh-CN': 'zh',
      'es-419': 'es',
      'pt-BR': 'pt',
      'de-DE': 'de',
      'fr-FR': 'fr',
      'ar': 'en', // TODO: Create ar.json
    };

    const messagePath = messageMap[locale] || 'en';
    const messages = await import(`../messages/${messagePath}.json`);
    return messages.default || messages;
  } catch (error) {
    console.error(`Failed to load messages for ${locale}:`, error);
    // Fallback to English
    const messages = await import(`../messages/en.json`);
    return messages.default || messages;
  }
}

/**
 * Get nested value from messages object
 */
export function getNestedValue(obj: unknown, path: string): string {
  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path; // Return key if not found
    }
  }

  return typeof current === 'string' ? current : path;
}

/**
 * Translation function
 */
export function createTranslator(messages: Messages, locale: Locale) {
  return function t(key: string, variables?: Record<string, string | number>): string {
    let text = getNestedValue(messages, key);

    // Replace variables like {name}, {count}
    if (variables) {
      Object.entries(variables).forEach(([key, value]) => {
        text = text.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
      });
    }

    return text;
  };
}

