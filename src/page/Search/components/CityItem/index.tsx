import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { CITIES_SCHEMA } from '../../../../core/cities/oramaSchema'
import type { Result } from '../../../../core/useOrama/types'

interface CityItemProps {
  city: Result<typeof CITIES_SCHEMA>
}

export default function CityItem({
  city
}: CityItemProps) {
  return <>
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={city.document.city}
        secondary={
          <>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {city.document.admin_name}
            </Typography>
            {" — " + city.document.population + " inhabitants"}
          </>
        }
      />
    </ListItem>
    <Divider variant="fullWidth" component="li" />
  </>
}
