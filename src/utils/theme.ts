// theme.ts
export interface Theme {
  colors: {
    darkBlue: string;
    darkBlueLighter: string;
    blueishGrey: string;
    white: string;
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