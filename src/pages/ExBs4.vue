<template>
  <div class="main-wrapper-bs4">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <h3>Bootstrap 4</h3>
          <hr />
          <!-- <dynamic-selector
            ref="foo"
            :query="query"
            @query-update="onQueryUpdate"
            :templateOptions="templateOptions"
          ></dynamic-selector>-->
          <vue-query-builder
            ref="foo"
            :query="queryComplex"
            @query-update="onQueryUpdate"
            :template-options="templateOptions"
          ></vue-query-builder>
          <hr />
          <button class="btn btn-success" @click="generateSQL">Print SQL</button>
          <div class="mt-2 alert alert-primary">
            <code>{{ generatedSQL }}</code>
          </div>
          <div class="mt-2 alert alert-success">
            <code>{{ generatedJSON }}</code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap";
export default {
  name: "app",
  components: {},
  computed: {},
  data() {
    return {
      generatedSQL: "",
      generatedJSON: "",
      templateOptions: {
        template: "bs4"
      },
      // query: {
      //   type: "Trim",
      //   values: [],
      //   value: {
      //     type: "Concat",
      //     values: [
      //       { type: "Value", value: "123" },
      //       { type: "Object", values: [] },
      //       { type: "Attribute", values: [] },
      //       { type: "Case", values: [] },
      //       { type: "", values: [] }
      //     ]
      //   }
      // }
      query: {
        type: "Trim",
        values: [],
        value: {
          type: "Trim",
          values: [],
          value: {
            type: "Trim",
            values: [],
            value: {
              type: "Trim",
              values: [],
              value: {
                type: "Trim",
                values: [],
                value: {
                  type: "Trim",
                  values: [],
                  value: {
                    type: "Trim",
                    values: [],
                    value: {
                      type: "Trim",
                      values: [],
                      value: {
                        type: "Trim",
                        values: [],
                        value: {
                          type: "Trim",
                          values: [],
                          value: {
                            type: "Trim",
                            values: [],
                            value: {
                              type: "Trim",
                              values: [],
                              value: {
                                type: "Trim",
                                values: [],
                                value: {
                                  type: "Trim",
                                  values: [],
                                  value: {
                                    type: "Trim",
                                    values: [],
                                    value: {
                                      type: "Trim",
                                      values: [],
                                      value: {
                                        type: "Trim",
                                        values: [],
                                        value: {
                                          type: "Trim",
                                          values: [],
                                          value: {
                                            type: "Trim",
                                            values: [],
                                            value: {
                                              type: "Trim",
                                              values: [],
                                              value: {
                                                type: "Trim",
                                                values: []
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      queryComplex: {
        type: "Trim",
        value: {
          type: "Trim",
          value: {
            type: "Trim",
            value: {
              type: "Trim",
              value: {
                type: "Trim",
                value: {
                  type: "Trim",
                  value: {
                    type: "Trim",
                    value: {
                      type: "Trim",
                      value: {
                        type: "Trim",
                        value: {
                          type: "Trim",
                          value: {
                            type: "Trim",
                            value: {
                              type: "Trim",
                              value: {
                                type: "Trim",
                                value: {
                                  type: "Trim",
                                  value: {
                                    type: "Trim",
                                    value: {
                                      type: "Trim",
                                      value: {
                                        type: "Trim",
                                        value: {
                                          type: "Trim",
                                          value: {
                                            type: "Trim",
                                            value: {
                                              type: "Trim",
                                              value: {
                                                type: "Trim",
                                                value: {
                                                  type: "Concat",
                                                  values: [
                                                    {
                                                      type: "Case",
                                                      values: [
                                                        {
                                                          uuid:
                                                            "9a2f3591-bf43-11e9-9ac5-7b6087ada34e",
                                                          whenValue: {
                                                            type: "Value",
                                                            value: "CASE ~",
                                                            values: [],
                                                            uuid:
                                                              "9a2f3592-bf43-11e9-9ac5-7b6087ada34e"
                                                          },
                                                          thenValue: {
                                                            type: "",
                                                            values: [],
                                                            uuid:
                                                              "9a2f5ca0-bf43-11e9-9ac5-7b6087ada34e"
                                                          }
                                                        },
                                                        {
                                                          uuid:
                                                            "9c6416f0-bf43-11e9-9ac5-7b6087ada34e",
                                                          whenValue: {
                                                            type: "",
                                                            values: [],
                                                            uuid:
                                                              "9c6416f1-bf43-11e9-9ac5-7b6087ada34e"
                                                          },
                                                          thenValue: {
                                                            type: "",
                                                            values: [],
                                                            uuid:
                                                              "9c6416f2-bf43-11e9-9ac5-7b6087ada34e"
                                                          }
                                                        },
                                                        {
                                                          uuid:
                                                            "9c7c0bc0-bf43-11e9-9ac5-7b6087ada34e",
                                                          whenValue: {
                                                            type: "",
                                                            values: [],
                                                            uuid:
                                                              "9c7c0bc1-bf43-11e9-9ac5-7b6087ada34e"
                                                          },
                                                          thenValue: {
                                                            type: "",
                                                            values: [],
                                                            uuid:
                                                              "9c7c0bc2-bf43-11e9-9ac5-7b6087ada34e"
                                                          }
                                                        }
                                                      ],
                                                      uuid:
                                                        "993f0931-bf43-11e9-9ac5-7b6087ada34e"
                                                    },
                                                    {
                                                      type: "Case",
                                                      values: [
                                                        {
                                                          uuid:
                                                            "a35a9f10-bf43-11e9-9ac5-7b6087ada34e",
                                                          whenValue: {
                                                            type: "Concat",
                                                            values: [
                                                              {
                                                                type: "",
                                                                values: [],
                                                                uuid:
                                                                  "a4792e70-bf43-11e9-9ac5-7b6087ada34e"
                                                              },
                                                              {
                                                                type: "",
                                                                values: [],
                                                                uuid:
                                                                  "a594d7a0-bf43-11e9-9ac5-7b6087ada34e"
                                                              },
                                                              {
                                                                type: "",
                                                                values: [],
                                                                uuid:
                                                                  "a5addde0-bf43-11e9-9ac5-7b6087ada34e"
                                                              },
                                                              {
                                                                type: "Value",
                                                                value: "12121",
                                                                values: [],
                                                                uuid:
                                                                  "a5c70b30-bf43-11e9-9ac5-7b6087ada34e"
                                                              }
                                                            ],
                                                            uuid:
                                                              "a35a9f11-bf43-11e9-9ac5-7b6087ada34e"
                                                          },
                                                          thenValue: {
                                                            type: "",
                                                            values: [],
                                                            uuid:
                                                              "a35a9f12-bf43-11e9-9ac5-7b6087ada34e"
                                                          }
                                                        }
                                                      ],
                                                      uuid:
                                                        "9ba69350-bf43-11e9-9ac5-7b6087ada34e",
                                                      elseValue: {
                                                        type: "Value",
                                                        value: "OK",
                                                        values: [],
                                                        uuid:
                                                          "a35b3b50-bf43-11e9-9ac5-7b6087ada34e"
                                                      }
                                                    }
                                                  ],
                                                  uuid:
                                                    "9800e3e0-bf43-11e9-9ac5-7b6087ada34e"
                                                },
                                                values: [],
                                                uuid:
                                                  "97fff980-bf43-11e9-9ac5-7b6087ada34e"
                                              },
                                              values: [],
                                              uuid:
                                                "97ff5d41-bf43-11e9-9ac5-7b6087ada34e"
                                            },
                                            values: [],
                                            uuid:
                                              "97ff0f20-bf43-11e9-9ac5-7b6087ada34e"
                                          },
                                          values: [],
                                          uuid:
                                            "97fe72e0-bf43-11e9-9ac5-7b6087ada34e"
                                        },
                                        values: [],
                                        uuid:
                                          "97fd8880-bf43-11e9-9ac5-7b6087ada34e"
                                      },
                                      values: [],
                                      uuid:
                                        "97fcc530-bf43-11e9-9ac5-7b6087ada34e"
                                    },
                                    values: [],
                                    uuid: "97fc01e0-bf43-11e9-9ac5-7b6087ada34e"
                                  },
                                  values: [],
                                  uuid: "97fb65a0-bf43-11e9-9ac5-7b6087ada34e"
                                },
                                values: [],
                                uuid: "97fac960-bf43-11e9-9ac5-7b6087ada34e"
                              },
                              values: [],
                              uuid: "97fa2d21-bf43-11e9-9ac5-7b6087ada34e"
                            },
                            values: [],
                            uuid: "97f91bb0-bf43-11e9-9ac5-7b6087ada34e"
                          },
                          values: [],
                          uuid: "97f87f70-bf43-11e9-9ac5-7b6087ada34e"
                        },
                        values: [],
                        uuid: "97f7bc20-bf43-11e9-9ac5-7b6087ada34e"
                      },
                      values: [],
                      uuid: "97f6f8d1-bf43-11e9-9ac5-7b6087ada34e"
                    },
                    values: [],
                    uuid: "97f60e70-bf43-11e9-9ac5-7b6087ada34e"
                  },
                  values: [],
                  uuid: "97f57230-bf43-11e9-9ac5-7b6087ada34e"
                },
                values: [],
                uuid: "97f4aee0-bf43-11e9-9ac5-7b6087ada34e"
              },
              values: [],
              uuid: "97f3eb90-bf43-11e9-9ac5-7b6087ada34e"
            },
            values: [],
            uuid: "97f2da20-bf43-11e9-9ac5-7b6087ada34e"
          },
          values: [],
          uuid: "97f1efc0-bf43-11e9-9ac5-7b6087ada34e"
        },
        values: [],
        uuid: "97df0400-bf43-11e9-9ac5-7b6087ada34e"
      }
    };
  },
  methods: {
    del: function(i) {
      this.coba.splice(i, 1);
    },
    generateSQL: function() {
      var x = this.$refs.foo.generateSQL();
      this.generatedSQL = x;
    },
    onQueryUpdate: function(q) {
      this.generatedJSON = JSON.stringify(q);
    }
  },
  mounted() {
    setTimeout(() => {
      this.generatedJSON = JSON.stringify(this.queryComplex);
    }, 250);
    setTimeout(() => {
      this.generateSQL();
    }, 500);
  }
};
</script>

<style scoped lang="scss">
.main-wrapper-bs4 ::v-deep {
  @import "~bootstrap/scss/bootstrap";
}
</style>

