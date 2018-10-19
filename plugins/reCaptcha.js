// This site key for the captcha is owned by `Mauro`

export default function() {
    const appendScript = new Promise(resolve => {
        const tag = document.createElement("script");
        tag.setAttribute("src", "https://www.google.com/recaptcha/api.js");
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        tag.onload = resolve;
    });

    return appendScript;
}
