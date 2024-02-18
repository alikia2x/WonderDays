const supportLanguages = ["zh-CN", "en", "ja"];
function setLang() {
    let { locale } = useI18n();
    let lang = navigator.language;
    for (let l of supportLanguages) {
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
    let lang = navigator.language;
    for (let l of supportLanguages) {
        if (lang.toLowerCase().includes(l.toLowerCase())) {
            return l;
        }
    }
    return "en";
}

export default setLang;