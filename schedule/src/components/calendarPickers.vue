<template>
  <v-form>
    <v-container fluid class="py-0">
      <transition
        v-if="formStep == workerId + 1"
        appear
        name="form-animation"
        enter-active-class="animated fadeIn fast"
      >
        <v-row class="py-0">
          <v-col class="py-0">
            <h2 class="mx-auto mt-0 mb-0 title text-center white--text">
              Dias sin guardia
            </h2>
            <h3 class="mx-auto mt-0 mb-2 subtitle-1 text-center white--text">
              {{ name }}
            </h3>
            <v-date-picker
              class="my-0"
              v-model="dates"
              @input="addFreeDay"
              multiple
              color="teal darken-3"
              width="310"
            ></v-date-picker>
          </v-col>
        </v-row>
      </transition>
    </v-container>
  </v-form>
</template>

<script>
export default {
  props: {
    formStep: Number,
    workerId: Number,
    name: String
  },
  data() {
    return {
      dates: []
    };
  },
  computed: {},
  methods: {
      addFreeDay() {
          let data = {
              "dates": this.dates,
              "workerId": this.workerId
          }
          this.$emit("updateDays", data)
      }
  }
};
</script>

<style></style>
