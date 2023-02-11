export function get_color_from_rank(rank){
    switch (true) {
        case rank<1200:
            return "#8b898b";
        case rank<1400:
            return "#0fdb0f";
        case rank<1600:
            return "#55d3ab";
        case rank<1900:
            return "#2e2eff";
        case rank<2100:
            return "#fc3dff";
        case rank<2300:
            return "#ffbd66";
        case rank<2400:
            return "#ffaf38";
        case rank<2600:
            return "#fe5858";
        default:
            return "#ff0000";
    }

}

export const CONSTANTS = {
    THIRTY_MINUTES: 1800,
    TWO_HOURS: 7200,
    FOUR_HOURS: 14400,
    ONE_DAY: 86400,
  };