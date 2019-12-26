<template>
  <v-form>
    <v-container fluid class="py-0">
      <transition
        v-if="formStep == workerId + 3"
        appear
        name="form-animation"
        enter-active-class="animated fadeIn fast"
      >
        <v-row class="py-0">
          <v-col class="py-0">
            <v-card
              max-width="310"
              min-width="310"
              flat
              color="white"
              class="mx-auto"
            >
              <v-card-title
                style="color:white; background-color:#00695C"
                class="subtitle-1 mx-auto py-1"
              >
                {{ formStep }} - Dias sin guardia
              </v-card-title>
              <v-card-title
                style="color:white; background-color:#80CBC4"
                class="subtitle-1 mx-auto py-1"
              >
                {{ name }}
              </v-card-title>
              <v-date-picker
                v-model="dates"
                no-title
                locale="es"
                type="date"
                @input="addFreeDay"
                :min="`${selectedMonth}-01`"
                :picker-date="`${selectedMonth}-01`"
                multiple
                color="teal darken-3"
                full-width
              ></v-date-picker>
            </v-card>
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
    name: String,
    selectedMonth: String
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
        dates: this.dates,
        workerId: this.workerId
      };
      this.$emit("updateDays", data);
    }
  }
};
</script>

<style></style>
