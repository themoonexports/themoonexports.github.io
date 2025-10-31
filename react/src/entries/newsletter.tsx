import { createRoot } from "react-dom/client";
import { NewsletterForm } from "@components/NewsletterForm";

const mount = document.querySelector<HTMLElement>("[data-react-root='newsletter']");

if (mount) {
  const root = createRoot(mount);
  root.render(<NewsletterForm />);
}
