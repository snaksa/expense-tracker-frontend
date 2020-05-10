import { useCurrentUserQuery } from "api";
import bg from "./source/bg";

const translations: any = {
  bg: bg,
};

const useTranslations = () => {
  const { data: userData } = useCurrentUserQuery();
  const user: any = userData?.me ?? [];
  const lang: string = (user.language ?? "").toLowerCase();

  const t = (text: string) => {
    if (
      lang in translations &&
      text in translations[lang] &&
      translations[lang][text]
    ) {
      return translations[lang][text];
    }

    return text;
  };

  return {
    t,
  };
};

export default useTranslations;
