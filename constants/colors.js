import HexToRgb from "./../functions/hexToRgb";
const DarkScale = [...Array(9)].map((v, i) => `rgba(0,0,0,0.${i})`);

const LightScale = [...Array(9)].map((v, i) => `rgba(255,255,255,0.${i})`);

const Custom = [
    "#4BB488",
    "#EC6086",
    "#2E4999",
    "#79BF84",
    "#EFE409",
    "#53BFD2",
    "#3B4294",
    "#ED6E61",
    "#F9EB97",
    "#8ECCBA",
    "#ACC90E",
    "#6256A1",
    "#8D4393",
    "#F5C364",
    "#B3D38D",
    "#9796C9",
    "#50B264",
    "#D54B35",
    "#C78E44",
    "#88C064",
    "#ABB5DD",
    "#F08281",
    "#574B99"
];

const CustomLighter = Custom.map(HexToRgb).map(rgba => {
    rgba[3] = 0.5;
    return `rgba(${rgba.join(",")})`;
});

export default {
    DarkScale,
    LightScale,
    Custom,
    CustomLighter
};
