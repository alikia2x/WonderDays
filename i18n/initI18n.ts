const supportLanguages = ["zh-CN", "en", "ja"];
function setLang() {
    const { locale } = useI18n();
    const lang = navigator.language;
    for (const l of supportLanguages) {
        if (lang.toLowerCase().includes(l.toLowerCase())) {
            locale.value = l;
            document.documentElement.setAttribute('lang', navigator.language);
            return;
        }
    }
    locale.value = "en";
    document.documentElement.setAttribute('lang', 'en-US');
}

export const getLang = () =>{
    const lang = navigator.language;
    for (const l of supportLanguages) {
        if (lang.toLowerCase().includes(l.toLowerCase())) {
            return l;
        }
    }
    return "en";
}

export default setLang;