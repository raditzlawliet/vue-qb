<template>
  <div class="selector">
    <slot name="f-case-begin">
      <label>CASE</label>
    </slot>
    <button class="btn btn-success btn-sm ml-2" @click="addItem">+</button>
    <div v-for="(whenThen, index) in querylocal.values" :key="index" class="ml-2">
      <slot name="f-case-when-then">
        <div class="d-flex d-flex-row">
          <div>
            <button class="btn btn-danger btn-sm mr-2" v-show="index != 0" @click="removeItem(index)">X</button>
          </div>
          <div class="flex-grow-1">
            <label>WHEN</label>
            <dynamic-selector
              ref="whenValue_"
              :emitRef="`whenValue_${index}`"
              :query="whenThen.whenValue"
              @query-update="onQueryUpdate"
            >
              <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
              <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
                <slot :name="name" v-bind="slotData" />
              </template>
            </dynamic-selector>
          </div>
          <div class="flex-grow-1">
            <label>THEN</label>
            <dynamic-selector
              ref="thenValue_"
              :emitRef="`thenValue_${index}`"
              :query="whenThen.thenValue"
              @query-update="onQueryUpdate"
            >
              <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
              <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
                <slot :name="name" v-bind="slotData" />
              </template>
            </dynamic-selector>
          </div>
        </div>
      </slot>
    </div>
    <slot name="f-case-else">
      <div class="ml-2">
        <label>ELSE</label>
        <dynamic-selector
          ref="elseValue"
          emitRef="elseValue"
          :query="querylocal.elseValue"
          @query-update="onQueryUpdate"
        >
          <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
          <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
            <slot :name="name" v-bind="slotData" />
          </template>
        </dynamic-selector>
      </div>
    </slot>
    <slot name="f-case-end">
      <label>END</label>
    </slot>
    <button
      class="btn btn-danger btn-sm ml-2"
      v-show="optionslocal.removeable && querylocal.type"
      @click="remove"
    >X</button>
  </div>
</template>
<script>
import Placeholder from "./Placeholder.vue";
export default {
  extends: Placeholder,
  props: {},
  data() {
    return {};
  },
  created() {
    if (this.querylocal.values.length == 0) this.add();
  },
  updated() {
    if (this.querylocal.values.length == 0) this.add();
  },
  methods: {
    generateSQL: function() {
      var whenThenValues = this.querylocal.values
        .map((v, i) => {
          var whenValue = this.$refs.whenValue_[i]
            ? this.$refs.whenValue_[i].generateSQL()
            : "";
          var thenValue = this.$refs.thenValue_[i]
            ? this.$refs.thenValue_[i].generateSQL()
            : "";
          return `WHEN ${whenValue} THEN ${thenValue}`;
        })
        .join("\n");

      return `
        CASE
          ${whenThenValues}
          ELSE ${this.$refs.elseValue.generateSQL()}
          END
      `;
    },
    // normalizeQuery: function(d) {
    //   return Object.assign(
    //     {
    //       type: "", // for type
    //       // value: undefined, // for value
    //       values: [] // for array
    //     },
    //     d
    //   );
    // }
    // onQueryUpdate: function(emitRef, value) {
    //   this.querylocal[emitRef] = this.normalizeQuery(value);
    // }
    addItem: function() {
      this.querylocal.values.push({
        whenValue: this.getQueryModel(),
        thenValue: this.getQueryModel()
      });
    },
    removeItem: function(i) {
      this.querylocal.values.splice(i, 1);
    },
    onQueryUpdate: function(emitRef, value) {
      console.log(emitRef);
      if (emitRef.startsWith("whenValue_")) {
        let index = emitRef.split("_").pop();
        this.querylocal.values[index].whenValue = this.normalizeQuery(value);
      } else if (emitRef.startsWith("thenValue_")) {
        let index = emitRef.split("_").pop();
        this.querylocal.values[index].thenValue = this.normalizeQuery(value);
      } else {
        this.querylocal[emitRef] = this.normalizeQuery(value);
      }
      this.$emit("query-update", this.emitRef, this.querylocal);
      // console.log(emitRef, JSON.stringify(this.querylocal));
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
