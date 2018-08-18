export default function(el, options) {
    return Promise.resolve(
        new Promise(resolve => {
            if (window.YT) resolve(window.YT);

            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName("script")[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            window.onYouTubeIframeAPIReady = () => resolve(window.YT);
        }).then(YT => {
            return new YT.Player(el, options);
        })
    );
}
