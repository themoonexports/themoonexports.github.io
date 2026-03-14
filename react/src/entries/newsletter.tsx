import { mountComponent } from '../utils/mountComponent';
import { NewsletterForm } from "@components/NewsletterForm";

/**
 * Newsletter Entry Point
 * Hydrates the existing newsletter form with React
 */
mountComponent('newsletter', <NewsletterForm />);
