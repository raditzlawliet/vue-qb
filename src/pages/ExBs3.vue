<template>
  <div class="main-wrapper-bs3">
    <div class="container-fluid">
      <div class="row no-gutter">
        <div class="col-xs-12">
          <h3>Bootstrap 3</h3>

          <hr />

          <vue-query-builder
            ref="foo"
            :query="query"
            :rules="rules"
            @update:complete-query="onQueryUpdate"
            :templateOptions="templateOptions"
          ></vue-query-builder>

          <hr />
          <button class="btn btn-success" @click="generateSQL">Print SQL</button>
          <div class="alert alert-info" role="alert" style="margin-top: 1em">
            <code>{{ generatedSQL }}</code>
          </div>
          <div class="alert alert-success" role="alert" style="margin-top: 1em">
            <code>{{ generatedJSON }}</code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "expose-loader?jQuery!jquery";
import "bootstrap3";
export default {
  name: "app",
  components: {},
  computed: {},
  data() {
    return {
      generatedSQL: "",
      generatedJSON: "",
      templateOptions: {
        template: "bs3"
      },
      query: {
        // type: "Trim",
        // values: [],
        // value: {
        //   type: "Concat",
        //   values: []
        // }
      },
      objects: [{ id: 1, name: "1", sqlValue: "1" }],
      rules: {
        "": {
          funcId: "",
          type: "selector",
          label: " -- Select -- ",
          maxDepth: -1
        },
        Case: {
          funcId: "Case",
          type: "statement",
          label: "Case",
          maxDepth: -1,
          list: () => {
            return lObjects;
          }
        },
        Trim: {
          funcId: "Trim",
          type: "function",
          maxDepth: -1,
          label: "Trim"
        },
        Concat: {
          funcId: "Concat",
          type: "function",
          maxDepth: -1,
          label: "Concat"
        },
        Object: {
          funcId: "Object",
          type: "value",
          label: "Table / Object",
          maxDepth: -1,
          list: () => {
            return this.objects;
          }
        },
        Attribute: {
          funcId: "Attribute",
          type: "value",
          label: "Column / Attribute",
          maxDepth: -1,
          list: () => {
            return [];
          }
        },
        Value: {
          funcId: "Value",
          type: "value",
          label: "Value",
          maxDepth: -1,
          isRemoveable: (myrule, depth, query) => {
            // return depth != 0;
            return true
          }
        },
        Manual: {
          funcId: "Value",
          type: "value",
          label: "Manual",
          maxDepth: -1
        }
      }
    };
  },
  methods: {
    generateSQL: function() {
      var x = this.$refs.foo.generateSQL();
      this.generatedSQL = x;
    },
    onQueryUpdate: function(q) {
      this.generatedJSON = JSON.stringify(q);
    }
  },
  mounted() {
    this.query = {
      // type: "Trim",
      // values: [],
      // value: {
      //   type: "Concat",
      //   values: [
      //     { type: "Value", value: "123" },
      //     { type: "Object", values: [] },
      //     { type: "Attribute", values: [] },
      //     { type: "Case", values: [] },
      //     { type: "Trim", values: [] }
      //   ]
      // }
    };
    this.query = {
      type: "Concat",
      values: [
        { type: "Value", value: "123" },
        { type: "Object", values: [] },
        { type: "Attribute", values: [] },
        { type: "Case", values: [] },
        { type: "Trim", values: [] }
      ]
    };
    setTimeout(() => {
      this.generateSQL();
      this.generatedJSON = JSON.stringify(this.query);
    }, 250);
  }
};
</script>

<style scoped lang="less">
.main-wrapper-bs3 ::v-deep {
  @import "~bootstrap3/less/bootstrap";
}
</style>

<style scoped lang="scss">
// .main-wrapper-bs3 ::v-deep {
//   .ml-2 {
//     margin-left: 1em !important;
//   }
// }
.main-wrapper-bs3 ::v-deep {
  @import "@/assets/sass/bs3vqb/bs3vqb.scss";
}
</style>
