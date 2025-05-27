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
  if (position === 4) {
    return {
      backgroundColor: "#3fa7d6",
      color: "white",
    };
  }
  if (position === 5) {
    return {
      backgroundColor: "#34c38f",
      color: "white",
    };
  }
  if (position > 5 && position <= 10) {
    return {
      backgroundColor: "#e35b8f",
      color: "white",
    };
  }
  if (position > 10) {
    return {
      backgroundColor: "#00bfa6",
      color: "white",
    };
  }
}
