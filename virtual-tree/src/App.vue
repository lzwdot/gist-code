<template>
  <div id="app">
        <vl-tree
            ref="tree"
            :data="tree"
            :props="props"
            showCheckbox
            :default-checked-keys="defaultCheckedKeys"
            :default-expanded-keys="defaultExpandedKeys"
        ></vl-tree>
<!--    <el-tree-->
<!--        :props="props"-->
<!--        :data="tree"-->
<!--        :height="300"-->
<!--        show-checkbox-->
<!--        :default-checked-keys="defaultCheckedKeys"-->
<!--        :default-expanded-keys="defaultExpandedKeys"-->
<!--    >-->
<!--    </el-tree>-->
  </div>
</template>

<script>
import data from "./data.json";
import selectData from "./select.json";

const toFlatArray = (tree, parentId) => {
  return tree.reduce((t, item) => {
    const child = item["children"];
    return [
      ...t, // 已有的
      parentId ? {...item, parentId} : item,
      ...(child && child.length ? toFlatArray(child, item["id"]) : []), // 递归
    ];
  }, []);
};
// eslint-disable-next-line no-unused-vars
const getIds = (flatArray, id) => {
  let ids = [id];
  let child = flatArray.find((_) => _["id"] === id);
  while (child && child.parentId) {
    ids = [child.parentId, ...ids];
    child = flatArray.find((_) => _["id"] === child.parentId);
  }
  return ids;
};

// eslint-disable-next-line no-unused-vars
const flatArr = toFlatArray(data);

export default {
  name: "App",
  components: {},
  data() {
    return {
      tree: data,
      defaultCheckedKeys: [],
      defaultExpandedKeys: [],
      props: {
        value: "id",
        label: "orName",
        children: "children",
      },
    };
  },
  created() {
    // this.tree = this.createData(4, 30, 40);
    // console.log(this.tree, 15);
    this.defaultCheckedKeys = selectData.map((v) => v.id);
    this.defaultExpandedKeys = this.defaultCheckedKeys
        .map((id) => {
          return getIds(flatArr, id);
        })
        .flat();
  },
  mounted() {
    console.log("mounted");
  },
  methods: {
    getKey(prefix, id) {
      return `${prefix}-${id}`;
    },
    createData(maxDeep, maxChildren, minNodesNumber, deep = 1, key = "node") {
      let id = 0;
      return Array.from({length: minNodesNumber})
          .fill(deep)
          .map(() => {
            const childrenNumber =
                deep === maxDeep ? 0 : Math.round(Math.random() * maxChildren);
            const nodeKey = this.getKey(key, ++id);
            return {
              id: nodeKey,
              label: nodeKey,
              children: childrenNumber
                  ? this.createData(
                      maxDeep,
                      maxChildren,
                      childrenNumber,
                      deep + 1,
                      nodeKey
                  )
                  : undefined,
            };
          });
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
