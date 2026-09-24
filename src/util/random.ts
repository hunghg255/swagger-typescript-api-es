const getRandomFloat = (min = 0, max = 1) => {
  return Math.random() * (max - min) + min;
};

/**
 * Returns a uniformly distributed integer in the inclusive range [min, max].
 */
const getRandomInt = (min = 0, max = 1) => {
  if (min === max) {
    return min;
  }

  return Math.floor(getRandomFloat(min, max + 1));
};

export { getRandomInt, getRandomFloat };
