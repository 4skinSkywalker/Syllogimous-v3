export function delayedScrollTo(queryString: string, ms?: number) {
    ms = ms || 150;
    setTimeout(
        () =>
            document.querySelector(queryString)
                ?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'center'
                }),
        ms
    );
}

export function blur() {
    (document.activeElement as any)?.blur();
}