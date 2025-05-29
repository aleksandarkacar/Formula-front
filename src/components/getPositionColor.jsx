export default function getPositionColor(position) {
  // console.log(position);
  if (position == 1) {
    return {
      backgroundColor: "#ffd700",
      color: "black",
    };
  }
  if (position == 2) {
    return { backgroundColor: "#c0c0c0", color: "black" };
  }
  if (position == 3) {
    return {
      backgroundColor: "#cd7f32",
      color: "black",
    };
  }
  if (position == 4) {
    return {
      backgroundColor: `rgba(227, 91, 143, 0.5)`,
      color: "white",
    };
  }
  if (position == 5) {
    return {
      backgroundColor: `rgba(221, 173, 221, 0.5)`,
      color: "white",
    };
  }
  if (position > 5 && position <= 10) {
    return {
      backgroundColor: `rgba(205, 184, 145, 0.5)`,
      color: "white",
    };
  }
  if (position > 10) {
    return {
      backgroundColor: `#080c16`,
      color: "white",
    };
  }
}
