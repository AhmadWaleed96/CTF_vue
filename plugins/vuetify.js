import colors from 'vuetify/es5/util/colors'
import { loadMessages, locale } from 'devextreme/localization';

import { en, ar, fr, tr, ur, zh } from '~/i18n'

import devextremeConfig from 'devextreme/core/config';
import i18nDevextreme from '~/i18n/devextreme.json'
loadMessages(i18nDevextreme)


let darkMode = false
let currentLeng = 'ar'
let isRtl = true
if (typeof Storage !== 'undefined') {

    const themeMode = localStorage.getItem('darkMode')
    //console.log(themeMode)
    if (themeMode != null)
        darkMode = themeMode === 'true';

    const lang = localStorage.getItem('currentLeng')
    if (lang != null)
        currentLeng = lang;


    const dir = localStorage.getItem('direction')
    if (dir != null)
        isRtl = dir === 'rtl';

    localStorage.currentLeng = currentLeng
    localStorage.direction = isRtl ? 'rtl' : 'ltr'
    localStorage.darkMode = darkMode

    devextremeConfig({ rtlEnabled: isRtl })
    locale(currentLeng)
}
/*
const palette = {
    money: {
        primary: colors.green.base, // primary main
        primarylight: colors.green.lighten4, // primary light
        primarydark: colors.green.darken3, // primary dark
        secondary: colors.amber.darken2, // secondary main
        secondarylight: colors.amber.lighten4, // secondary light
        secondarydark: colors.amber.darken4, // secondary dark
        anchor: colors.green.base // link
    }
}

export const theme = {
    ...palette.money
}
*/
export default {
    breakpoint: {},
    icons: {
        iconfont: 'mdi',
    },
    lang: {
        locales: { en, ar, fr, tr, ur, zh },
        current: currentLeng
    },
    rtl: isRtl,
    forceIsoDateParsing: true,
    theme: {
        dark: darkMode,
        themes: {
            light: {
                primary: '#4caf50',
                secondary: '#4caf50',
                tertiary: '#495057',
                accent: '#82B1FF',
                error: '#f55a4e',
                info: '#00d3ee',
                success: '#5cb860',
                warning: '#ffa21a',
            },
            dark: {
                primary: colors.blue.lighten3,
                background: colors.indigo.base,
                tertiary: colors.green.darken3,

            },
        },
    },

    /*theme: {
        dark: darkMode,
        themes: {
            light: {
                stc_color_purple: '#4f008c',
                stc_color_purple_dark: '#420076',
                stc_color_coral: '#ff375e',
                stc_color_air: '#f3f3f1',
                stc_color_silver: '#8e9aa0',
                stc_color_onyx: '#1d252d',
                stc_color_sunlight: '#ffdd40',
                stc_color_sunsetlight: '#ff6a39',
                stc_color_sealight: '#1bced7',
                stc_color_moonlight: '#a54ee1',
                stc_color_oasislight: '#00c48c',
                stc_color_half: 'rgba(255, 255, 255, 0.5)',
                stc_color_white: '#fff',
                stc_color_border: '#ddd',
                stc_color_hover: 'rgba(221, 221, 221, 0.3)',
                stc_color_mtea: '#eff3f6',

                primary: '#4f008c',
                secondary: '#3f0070',
                accent: '#f3f3f1',
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC107'
            },
            dark: {
                stc_color_purple: '#4f008c',
                stc_color_purple_dark: '#420076',
                stc_color_coral: '#ff375e',
                stc_color_air: '#f3f3f1',
                stc_color_silver: '#8e9aa0',
                stc_color_onyx: '#1d252d',
                stc_color_sunlight: '#ffdd40',
                stc_color_sunsetlight: '#ff6a39',
                stc_color_moonlight: '#a54ee1',
                stc_color_oasislight: '#00c48c',
                stc_color_half: 'rgba(255, 255, 255, 0.5)',
                stc_color_white: '#fff',
                stc_color_border: '#ddd',
                stc_color_hover: 'rgba(221, 221, 221, 0.3)',
                stc_color_mtea: '#eff3f6',

                primary: colors.blue.darken2,
                accent: colors.grey.darken3,
                secondary: colors.amber.darken3,
                info: colors.teal.lighten1,
                warning: colors.amber.base,
                error: colors.deepOrange.accent4,
                success: colors.green.accent3
            }
        },
        options: {
            customProperties: true
        }
    }*/
}
