interface Language {
  code: string;
  flag: string;
  label: string;
  alt: string;
  path: string;
}

const languages: Language[] = [
  { code: "de", flag: "images/german.png", label: "Switch to German", alt: "German", path: "/de" },
  { code: "fr", flag: "images/french.png", label: "Switch to French", alt: "French", path: "/fr" }
];

export function LanguageSwitcher(): JSX.Element {
  return (
    <div className="usano">
      {languages.map((lang) => (
        <a key={lang.code} href={lang.path} aria-label={lang.label}>
            <img
              src={lang.flag}
              alt={lang.alt}
              className="img-circle"
              width={25}
              height={25}
          />
        </a>
      ))}
    </div>
  );
}
