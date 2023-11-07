const setLevel = (score) => {
  if (score < 1000) {
    return 1;
  } else if (score >= 1000 && score < 2999) {
    return 2;
  } else if (score >= 3000 && score < 5999) {
    return 3;
  } else if (score >= 6000) {
    return 4;
  }
};

const setMininumScore = async (level) => {
  let score;
  switch (level) {
    case 1:
      score = 0;
      break;
    case 2:
      score = 1000;
      break;
    case 3:
      score = 3000;
      break;
    case 4:
      score = 6000;
      break;

    default:
      break;
  }
  return score;
};

const cusLevel = { setLevel, setMininumScore };

export default cusLevel;
