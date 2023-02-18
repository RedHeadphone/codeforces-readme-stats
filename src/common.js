
export const COLORS = {
    NEWBIE: "#8b898b",
    PUPIL: "#0fdb0f",
    SPECIALIST: "#55d3ab",
    EXPERT: "#2e2eff",
    CANDIDATE_MASTER: "#fc3dff",
    MASTER: "#ffbd66",
    INTERNATIONAL_MASTER: "#ffaf38",
    GRANDMASTER: "#fe5858",
    INTERNATIONAL_GRANDMASTER: "#ff0000",
};

export function get_color_from_rating(rank){
    switch (true) {
        case rank<1200:
            return COLORS.NEWBIE;
        case rank<1400:
            return COLORS.PUPIL;
        case rank<1600:
            return COLORS.SPECIALIST;
        case rank<1900:
            return COLORS.EXPERT;
        case rank<2100:
            return COLORS.CANDIDATE_MASTER;
        case rank<2300:
            return COLORS.MASTER;
        case rank<2400:
            return COLORS.INTERNATIONAL_MASTER;
        case rank<2600:
            return COLORS.GRANDMASTER;
        default:
            return COLORS.INTERNATIONAL_GRANDMASTER;
    }

};

export const CONSTANTS = {
    THIRTY_MINUTES: 1800,
    TWO_HOURS: 7200,
    FOUR_HOURS: 14400,
    ONE_DAY: 86400,
  };

export const clamp_value = (number, min, max) => {
    if (Number.isNaN(parseInt(number))) return min;
    return Math.max(min, Math.min(number, max));
};

export const capitalize = (str) => {
    const words = str.split(" ");
    const capitalized_words = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalized_words.join(" ");
  };

export const word_count = (str) => { 
    return str.split(" ").length;
  }