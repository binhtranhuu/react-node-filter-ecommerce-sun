export const baseURL = "http://localhost:5000/api";

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

export const ratings = [
  {
    name: "4stars & up",
    rating: 4,
  },

  {
    name: "3stars & up",
    rating: 3,
  },

  {
    name: "2stars & up",
    rating: 2,
  },

  {
    name: "1stars & up",
    rating: 1,
  },
];

export const prices = [
  {
    name: `$1 to $80`,
    min: 1,
    max: 80,
  },
  {
    name: `$80 to $160`,
    min: 80,
    max: 160,
  },
  {
    name: `$160 to $240`,
    min: 160,
    max: 240,
  },
  {
    name: `$240 to $320`,
    min: 240,
    max: 320,
  },
  {
    name: `$320 to $640`,
    min: 320,
    max: 640,
  },
  {
    name: `$640 to $1000`,
    min: 640,
    max: 1000,
  },
  {
    name: `$1000 to $2000`,
    min: 1000,
    max: 2000,
  },
];
