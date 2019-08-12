<template>
  <div>
    <div v-if="normalizedTemplateOptions.template =='bs4'">
      <div>
        <label class="col-form-label col-form-label-sm">CASE</label>
        <button :class="[...normalizedTemplateOptions.options.addBtnClass]" @click="addItem">
          <slot name="btn-add">+</slot>
        </button>
      </div>
      <div
        v-for="(whenThen, index) in querylocal.values"
        :key="index"
        class="form-row d-flex d-flex-row mb-0 ml-1"
      >
        <div class="form-group">
          <div class="mr-1">
            <button
              :class="[...normalizedTemplateOptions.options.removeBtnClass]"
              :disabled="index == 0"
              @click="removeItem(index)"
            >X</button>
          </div>
        </div>
        <div class="form-group flex-grow-1 mr-1 mb-0">
          <label class="col-form-label col-form-label-sm">WHEN (</label>
          <div class="ml-2">
            <dynamic-selector
              ref="whenValue_"
              :emitRef="`whenValue_${index}`"
              :query="whenThen.whenValue"
              @query-update="onQueryUpdate"
              :templateOptions="templateOptions"
            >
              <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
              <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
                <slot :name="name" v-bind="slotData" />
              </template>
            </dynamic-selector>
          </div>
        </div>
        <div class="form-group flex-grow-1 ml-1 mb-0">
          <label class="col-form-label col-form-label-sm">THEN</label>
          <div class="ml-2">
            <dynamic-selector
              ref="thenValue_"
              :emitRef="`thenValue_${index}`"
              :query="whenThen.thenValue"
              @query-update="onQueryUpdate"
              :templateOptions="templateOptions"
            >
              <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
              <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
                <slot :name="name" v-bind="slotData" />
              </template>
            </dynamic-selector>
          </div>
        </div>
      </div>
      <div>
        <slot name="f-case-else">
          <div>
            <label class="col-form-label col-form-label-sm">ELSE</label>
          </div>
          <div class="ml-2">
            <dynamic-selector
              ref="elseValue"
              emitRef="elseValue"
              :query="querylocal.elseValue"
              @query-update="onQueryUpdate"
              :templateOptions="templateOptions"
            >
              <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
              <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
                <slot :name="name" v-bind="slotData" />
              </template>
            </dynamic-selector>
          </div>
        </slot>
      </div>
      <slot name="f-case-end">
        <label class="col-form-label col-form-label-sm">END</label>
      </slot>
      <button
        :class="[...normalizedTemplateOptions.options.removeBtnClass]"
        v-show="optionslocal.removeable && querylocal.type"
        @click="remove"
      >
        <slot name="btn-remove">X</slot>
      </button>
    </div>
    <div v-if="normalizedTemplateOptions.template =='bs3'">
      <div>
        <label class="control-label input-sm">CASE</label>
        <button :class="[...normalizedTemplateOptions.options.addBtnClass]" @click="addItem">
          <slot name="btn-add">+</slot>
        </button>
      </div>
      <div
        v-for="(whenThen, index) in querylocal.values"
        :key="index"
        class="form-row d-flex d-flex-row mb-0 ml-1"
      >
        <div class="form-group">
          <div class="mr-1">
            <button
              :class="[...normalizedTemplateOptions.options.removeBtnClass]"
              :disabled="index == 0"
              @click="removeItem(index)"
            >X</button>
          </div>
        </div>
        <div class="form-group flex-grow-1 mr-1 mb-0">
          <label class="control-label input-sm">WHEN</label>
          <div class="ml-2">
            <dynamic-selector
              ref="whenValue_"
              :emitRef="`whenValue_${index}`"
              :query="whenThen.whenValue"
              @query-update="onQueryUpdate"
              :templateOptions="templateOptions"
            >
              <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
              <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
                <slot :name="name" v-bind="slotData" />
              </template>
            </dynamic-selector>
          </div>
        </div>
        <div class="form-group flex-grow-1 ml-1 mb-0">
          <label class="control-label input-sm">THEN</label>
          <div class="ml-2">
            <dynamic-selector
              ref="thenValue_"
              :emitRef="`thenValue_${index}`"
              :query="whenThen.thenValue"
              @query-update="onQueryUpdate"
              :templateOptions="templateOptions"
            >
              <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
              <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
                <slot :name="name" v-bind="slotData" />
              </template>
            </dynamic-selector>
          </div>
        </div>
      </div>
      <div>
        <slot name="f-case-else">
          <div>
            <label class="control-label input-sm">ELSE</label>
          </div>
          <div class="ml-2">
            <dynamic-selector
              ref="elseValue"
              emitRef="elseValue"
              :query="querylocal.elseValue"
              @query-update="onQueryUpdate"
              :templateOptions="templateOptions"
            >
              <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
              <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
                <slot :name="name" v-bind="slotData" />
              </template>
            </dynamic-selector>
          </div>
        </slot>
      </div>
      <slot name="f-case-end">
        <label class="control-label input-sm">END</label>
      </slot>
      <button
        :class="[...normalizedTemplateOptions.options.removeBtnClass]"
        v-show="optionslocal.removeable && querylocal.type"
        @click="remove"
      >
        <slot name="btn-remove">X</slot>
      </button>
    </div>
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
    if (this.querylocal.values.length == 0) this.addItem();
  },
  updated() {
    if (this.querylocal.values.length == 0) this.addItem();
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
      // console.log(emitRef);
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
