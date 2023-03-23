import List from "@mui/material/List"
import { CITIES_SCHEMA } from "../../../../core/cities/oramaSchema"
import type { Results } from "../../../../core/useOrama/types"
import CityItem from "../CityItem"

interface CityListProps {
  cities: Results<typeof CITIES_SCHEMA>
}

export default function CityList({
  cities
}: CityListProps) {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {cities.hits.map((city) => <CityItem key={city.id} city={city} />)}
    </List>
  )
}
