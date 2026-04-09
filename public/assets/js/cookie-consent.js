const cookieConsentConfig = {
    guiOptions: {
        consentModal: {
            layout: "bar wide",
            position: "bottom",
        },
    },

    categories: {
        necessary: {
            enabled: true,
            readOnly: true,
        },
        analytics: {},
    },

    language: {
        default: "en",
        translations: {
            en: {
                consentModal: {
                    title:
                        "This website uses cookies to ensure you get the best experience on our website.",

                    acceptAllBtn: "Accept all",
                    acceptNecessaryBtn: "Reject all",
                    showPreferencesBtn: "Manage Individual preferences",
                },
                preferencesModal: {
                    title: "Manage cookie preferences",
                    acceptAllBtn: "Accept all",
                    acceptNecessaryBtn: "Reject all",
                    savePreferencesBtn: "Accept current selection",
                    closeIconLabel: "Close modal",
                    sections: [
                        {
                            title: "Somebody said ... cookies?",
                            description: "I want one!",
                        },
                        {
                            title: "Strictly Necessary cookies",
                            description:
                                "These cookies are essential for the proper functioning of the website and cannot be disabled.",
                            linkedCategory: "necessary",
                        },
                        {
                            title: "Performance and Analytics",
                            description:
                                "These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.",
                            linkedCategory: "analytics",
                        },
                        {
                            title: "More information",
                            description:
                                'For any queries in relation to my policy on cookies and your choices, please <a href="#contact-page">contact us</a>',
                        },
                    ],
                },
            },
        },
    },
}

function runCookieConsent() {
    if (window.CookieConsent && typeof window.CookieConsent.run === 'function') {
        window.CookieConsent.run(cookieConsentConfig)
    }
}

if (window.CookieConsent && typeof window.CookieConsent.run === 'function') {
    runCookieConsent()
} else {
    const existingScript = document.querySelector('script[data-cookie-consent-lib="true"]')

    if (existingScript) {
        existingScript.addEventListener('load', runCookieConsent, { once: true })
    } else {
        const script = document.createElement('script')
        script.src = '/assets/js/cookieconsent.umd.js'
        script.defer = true
        script.dataset.cookieConsentLib = 'true'
        script.addEventListener('load', runCookieConsent, { once: true })
        document.head.appendChild(script)
    }
}