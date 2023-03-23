import { createTheme, ThemeProvider } from '@mui/material/styles';
// @ts-ignore
import { stemmer } from '@orama/orama/stemmer/it';


import { CITIES_SCHEMA } from './core/cities/oramaSchema';
import { OramaProvider } from './core/useOrama/Provider';
import Search from './page/Search';

const theme = createTheme();

function App() {
  return <ThemeProvider theme={theme}>
    <OramaProvider schema={CITIES_SCHEMA} options={{
      components: {
        tokenizer: {
          language: 'italian',
          tokenize: stemmer,
          normalizationCache: new Map<string, string>(),
        },
      },
    }}>
      <Search />
    </OramaProvider>
  </ThemeProvider>
}

export default App
