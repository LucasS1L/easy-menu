import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            black: string;
            white: string;
            paleWhite: string;
            redBlood: string;
            yellowSun: string;
        };
        fonts: {
            primary: string;
            secondary: string;
        };
        fontSizes: {
            small: string;
            medium: string;
            large: string;
        };
    }
}
