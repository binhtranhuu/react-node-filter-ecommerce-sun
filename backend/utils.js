import _ from "lodash";

export const uniqueArrayWithCounts = (arr, str) => {
  const result = arr.reduce((accum, val) => {
    const dupeIndex = accum.findIndex(
      (arrayItem) => arrayItem[str].toString() === val[str].toString()
    );

    if (dupeIndex === -1) {
      // Not found, so initialize.
      accum.push({
        qty: 1,
        [str]: val[str],
      });
    } else {
      // Found, so increment counter.
      accum[dupeIndex].qty++;
    }
    return accum;
  }, []);

  return result;
};

export const filterByTypes = (arrTypes) => {
  const typeNotSort = uniqueArrayWithCounts(arrTypes, "type");

  const typeSorted = _.sortBy(typeNotSort, "qty").reverse();

  return typeSorted;
};

export const filterByBrands = (arrBrands) => {
  const brandNotSort = uniqueArrayWithCounts(arrBrands, "brand");

  const brandSorted = _.sortBy(brandNotSort, "qty").reverse();

  return brandSorted;
};

export const convertArrayToTree = (list) => {
  var map = {},
    node,
    roots = [],
    i;

  for (i = 0; i < list.length; i += 1) {
    map[list[i].key] = i; // initialize the map
    list[i].children = []; // initialize the children
  }

  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.parentId !== null) {
      // if you have dangling branches check that map[node.parentId] exists
      list[map[node.parentId]]?.children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
};
