import { extendTheme, theme as base } from "@chakra-ui/react";

// 2. Add your color mode config
const config = {
   initialColorMode: "light",
   useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({
   config,
   textStyles: {
      countdown: { fontFamily: `Noto Sans Mono, ${base.fonts?.heading}` },
   },
});

export { theme };
