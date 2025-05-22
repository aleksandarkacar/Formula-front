export function getAlpha2ByNationality(flags, nat){
            if(!flags){
                return null;
            }
            if (nat === "Dutch") {
                return "NL"
            }
            if (nat === "Korean") {
                return "KR"
            }
            if (nat === "British") {
                return "GB"
            }
            const flag =  flags.find((flag)=> flag.nationality === nat);
            if(!flag) {
                return null;
            }
            return flag.alpha_2_code;

}

export function getAlpha2ByCountryName(flags, name){
            // console.log("Get country code",flags,name)
            if(!flags){
                return null;
            }
            if (name === "Korea"){
                return "KR"
            }
            if (name === "UK"){
                return "GB"
            }
            if (name === "USA"){
                return "US"
            }
                        if (name === "UAE"){
                return "AE"
            }
            const country =  flags.find((flag)=> flag.en_short_name === name);
            // console.log("if coun", name, country );

            if(!country) {
                return null;
            }
            return country.alpha_2_code;
}
