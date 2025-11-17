import React from "react";
import ReactCountryFlag from "react-country-flag";

export const FlagIcon = ({ code }: { code: string }) => {
  const flagMap: Record<string, string> = {
    en: "GB", // English (Great Britain)
    zh: "CN", // Chinese (China)
    ja: "JP", // Japanese (Japan)
    ko: "KR", // Korean (South Korea)
    fr: "FR", // French (France)
    de: "DE", // German (Germany)
    es: "ES", // Spanish (Spain)
    it: "IT", // Italian (Italy)
    ru: "RU", // Russian (Russia)
    pt: "PT", // Portuguese (Portugal)
    ar: "SA", // Arabic (Saudi Arabia)
    hi: "IN", // Hindi (India)
    tr: "TR", // Turkish (Turkey)
    vi: "VN", // Vietnamese (Vietnam)
    id: "ID", // Indonesian (Indonesia)
    nl: "NL", // Dutch (Netherlands)
    sv: "SE", // Swedish (Sweden)
    pl: "PL", // Polish (Poland)
    th: "TH", // Thai (Thailand)
    br: "BR", // Brazilian Portuguese (Brazil)
  };

  const countryCode = flagMap[code] || "GB"; // 默认使用英国国旗

  return (
    <ReactCountryFlag
      countryCode={countryCode}
      svg
      style={{ width: "1.2em", height: "1.2em", marginRight: "0.5rem" }}
      aria-label={`${code} flag`}
    />
  );
};

interface ChevronDownIconProps {
  className?: string;
}

export function ChevronDownIcon({
  className = "w-4 h-4 ml-1 transition-transform duration-200",
}: ChevronDownIconProps) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}

export function MenuIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}

export function CloseIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

export function GlobeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
