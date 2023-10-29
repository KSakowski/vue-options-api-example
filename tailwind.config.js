module.exports = {
    // purge: {
    //     content: [
    //         './public/**/*.html',
    //         './src/**/*.vue',
    //     ],
    //     options: {
    //         safelist: ['md:grid-cols-5'],
    //     },
    // },
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            'sans': ['Inter', 'Sans-serif']
        },
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        h1: {
                            marginTop: '0px',
                        },
                        h2: {
                            marginTop: '0px',
                            marginBottom: '0px',
                        },
                        h3: {
                            marginTop: '0px',
                            fontWeight: '400'
                        },
                        h4: {
                            marginTop: '0px'
                        },
                        img: {
                            margin: '0px'
                        },
                        ul: {
                            li: {
                                '&::before': {
                                    display: 'none',
                                },
                                padding: '0px',
                            },
                        },
                    },
                },
            }
        },
        zIndex: {
            '0': 0,
            '10': 10,
            '20': 20,
            '30': 30,
            '40': 40,
            '50': 50,
            '75': 75,
            '100': 100,
            'auto': 'auto',
        }
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
