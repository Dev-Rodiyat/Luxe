function getInitials(name) {
    return name
        .split(" ")
        .map((n) => n[0].toUpperCase())
        .join("")
        .slice(0, 2);
}

function getRandomOrangeBrownShade() {
    const h = Math.floor(Math.random() * (45 - 20 + 1)) + 20;
    const s = Math.floor(Math.random() * 30) + 50;
    const l = Math.floor(Math.random() * 20) + 30;
    return { h, s, l };
}

const getRandomEmeraldShade = () => {
    const hue = Math.floor(Math.random() * 20) + 140;
    const saturation = Math.floor(Math.random() * 30) + 70;
    const lightness = Math.floor(Math.random() * 20) + 40;
    return { h: hue, s: saturation, l: lightness };
};

const getTextColorForLightness = (l) => {
    if (l < 45) return "FFFFFF";
    if (l < 55) return "FFBF00";
    return "000000";
};

const hslToHex = (h, s, l) => {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) =>
        Math.round(
            255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))))
        )
            .toString(16)
            .padStart(2, "0");
    return `${f(0)}${f(8)}${f(4)}`;
};

module.exports = { getInitials, getRandomOrangeBrownShade, hslToHex, getTextColorForLightness, getRandomEmeraldShade };
