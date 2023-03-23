

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import { FormEventHandler, useCallback, useEffect, useState } from 'react';
import { getCities } from '../../core/cities/httpCities';
import { CITIES_SCHEMA } from '../../core/cities/oramaSchema';
import { Results } from '../../core/useOrama/types';
import { useOramaSearch } from '../../core/useOrama/useOramaSearch';
import { useOramaSetData } from '../../core/useOrama/useOramaSetData';
import CityList from './components/CityList';

export default function Search() {
  const { isReady, search } = useOramaSearch<typeof CITIES_SCHEMA>();
  const { canSetData, setData } = useOramaSetData<typeof CITIES_SCHEMA>();
  const [results, setResults] = useState<Results<typeof CITIES_SCHEMA>>();
  const [searchType, setSearchType] = useState<'city' | 'admin_name'>('city');

  const handleChange = useCallback((
    _: React.MouseEvent<HTMLElement>,
    newSearchType: 'city' | 'admin_name',
  ) => {
    setSearchType(newSearchType);
  }, [setSearchType]);

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(async (e) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const searchTerms = form.elements.namedItem('searchTerms') as HTMLInputElement;
    console.log(searchTerms.value)
    console.log(searchType)
    const results = await search(searchTerms.value,
      [searchType]);
    setResults(results)
  }, [search, searchType, setResults])

  useEffect(() => {
    if (!canSetData) return;

    async function initDb() {
      const cities = await getCities()
      setData(cities)
    }
    initDb()
  }, [canSetData])

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Search Italian Cities
        </Typography>
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="searchTerms"
            label="Search"
            name="searchTerms"
            autoComplete="off"
            autoFocus
          />
          <ToggleButtonGroup
            fullWidth
            color="primary"
            value={searchType}
            exclusive
            onChange={handleChange}
            aria-label="Search Type"
            size='small'
          >
            <ToggleButton value="city">City</ToggleButton>
            <ToggleButton value="admin_name">Region</ToggleButton>
          </ToggleButtonGroup>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
            disabled={!isReady}
          >
            {isReady ? 'Search' : 'Loading...'}
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {results && <CityList cities={results} />}
      </Box>

    </Container>
  )
}
