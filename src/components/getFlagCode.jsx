export function getAlpha2ByNationality(flags, nat) {
  // console.log("Get country code", nat);
  if (!flags) {
    return null;
  }

  if (nat === "Dutch") {
    return "NL";
  }
  if (nat === "Korean") {
    return "KR";
  }
  if (nat === "British") {
    return "GB";
  }
  if (nat === "Monegasque") {
    return "MC";
  }
  if (nat === "Argentinian ") {
    return "AR";
  }
  if (nat === "New Zealander") {
    return "NZ";
  }
  const flag = flags.find((flag) => flag.nationality === nat);
  if (!flag) {
    return null;
  }
  return flag.alpha_2_code;
}

export function getAlpha2ByCountryName(flags, name) {
  if (!flags) {
    return null;
  }
  if (name === "Korea") {
    return "KR";
  }
  if (name === "UK") {
    return "GB";
  }
  if (name === "USA") {
    return "US";
  }
  if (name === "United States") {
    return "US";
  }
  if (name === "UAE") {
    return "AE";
  }
  if (name === "Azerbaijan") {
    return "LY";
  }
  if (name === "Russia") {
    return "RU";
  }

  const country = flags.find((flag) => flag.en_short_name === name);

  if (!country) {
    return null;
  }
  return country.alpha_2_code;
}
