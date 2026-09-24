/**
 * Comparator of objects by a property (compared with the JS relational operators).
 */
const sortByProperty =
  <K extends PropertyKey>(propertyName: K) =>
  (o1: { [P in K]?: unknown }, o2: { [P in K]?: unknown }): 1 | -1 | 0 => {
    // relational operators are applied to the raw values (strings in practice), as in JS
    const value1 = o1[propertyName] as string;
    const value2 = o2[propertyName] as string;

    if (value1 > value2) {
      return 1;
    }
    if (value1 < value2) {
      return -1;
    }
    return 0;
  };

export { sortByProperty };
