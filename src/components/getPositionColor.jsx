export default function getPositionColor(position) {
  if (position === 1) {
    return {
      backgroundColor: "#ffd700",
      color: "black",
    };
  }
  if (position === 2) {
    return { backgroundColor: "#c0c0c0", color: "black" };
  }
  if (position === 3) {
    return {
      backgroundColor: "#cd7f32",
      color: "black",
    };
  }
}
