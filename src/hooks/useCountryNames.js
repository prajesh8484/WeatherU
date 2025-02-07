import countryCodes from '../utils/countryCodes.json';

const useCountryNames = () => {
  const getCountryName = (code) => countryCodes[code] || 'Unknown Country';

  return { getCountryName };
};

export default useCountryNames;

    