import { Cities, City } from "./models";

export const getCities = async (): Promise<City[]> => {
  const response = await fetch(
    `${import.meta.env.BASE_URL}/api/cities/it.json`
  );
  const cities = await response.json();

  return Cities.parse(cities);
};
