"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LANGUAGES } from "@/lib/settings";
import { FlagIcon, ChevronDownIcon, GlobeIcon } from "@/components/ui/Icons";

export function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname(); // e.g. /en/swap
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentLang = pathname.split("/")[1] || "en";
  const languages = LANGUAGES;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (code: string) => {
    if (code === currentLang) return;

    // Replace lang and navigate
    const segments = pathname.split("/");
    segments[1] = code;
    const newPath = segments.join("/");
    const queryString = searchParams.toString();
    const newUrl = queryString ? `${newPath}?${queryString}` : newPath;
    document.cookie = `lang=${code}; path=/`; // Set cookie (used by middleware)
    router.push(newUrl);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-white text-sm transition-all duration-300 bg-transparent hover:opacity-80"
      >
        <GlobeIcon className="w-5 h-5" />
        <span className="text-sm font-medium">
          {currentLang === 'zh' ? '中文' : languages.find((lang) => lang.code === currentLang)?.code.toUpperCase()}
        </span>
        <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <div
        className={`absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md shadow-xl rounded-lg border border-white/20 transition-all duration-200 z-50 ${
          isOpen ? "opacity-100 visible transform translate-y-0" : "opacity-0 invisible transform -translate-y-2"
        }`}
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => {
              handleLanguageChange(lang.code);
              setIsOpen(false);
            }}
            className={`flex items-center w-full px-4 py-3 text-sm transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
              currentLang === lang.code
                ? "bg-gradient-to-r from-[#ffa700]/20 to-[#d03d0a]/20 text-[#d03d0a] font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FlagIcon code={lang.code} />
            <span className="font-medium">{lang.nativeName}</span>
            {currentLang === lang.code && (
              <div className="ml-auto w-2 h-2 bg-gradient-to-r from-[#ffa700] to-[#d03d0a] rounded-full"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
