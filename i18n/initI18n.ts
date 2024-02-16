const supportLanguages = ["zh-CN", "en", "ja"];
function setLang() {
    if (!process.client) {
        return;
    }
    let { locale } = useI18n();
    let lang = navigator.language;
    for (let l of supportLanguages) {
        if (lang.toLowerCase().includes(l.toLowerCase())) {
            locale.value = l;
            return;
        }
    }
    locale.value = "en";
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