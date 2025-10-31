import { createRoot } from "react-dom/client";
import { Header } from "@components/Header";

const target = document.querySelector<HTMLElement>("[data-react-root='header']");

if (target) {
  const root = createRoot(target);
  root.render(<Header />);
}
