// theme.ts
export interface Theme {
  colors: {
    gray: any;
    darkBlue: string;
    darkBlueLighter: string;
    blueishGrey: string;
    white: string;
    lightBlue: string;
    lightBlueDarker: string;
    lightGrey: string;
    hoverBlue: string;
    transparentWhite: string;
    transparentWhiteDarker: string;
    // You can add more colors or derived colors as needed
  };
  spacing: {
    small: string;
    medium: string;
    large: string;
  };
  typography: {
    fontFamily: string;
    sizes: {
      small: string;
      medium: string;
      large: string;
    };
  };
}

const theme: Theme = {
  colors: {
    darkBlue: '#263238',
    darkBlueLighter: '#37474F',
    blueishGrey: '#667887',
    white: '#FFFFFF',
    lightBlue: '#29B6F6',
    lightBlueDarker: '#0288D1',
    lightGrey: '#F5F5F5',
    hoverBlue: '#364850',
    transparentWhite: 'rgba(255, 255, 255, 0.1)',
    transparentWhiteDarker: 'rgba(255, 255, 255, 0.2)',
    gray: undefined
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
  typography: {
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    sizes: {
      small: '12px',
      medium: '16px',
      large: '24px',
    },
  },
};

export default theme;