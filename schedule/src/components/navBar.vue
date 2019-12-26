<template>
  <v-container class="py-0">
    <v-row align-content="center" class="mx-auto" id="nav-var">
      <v-spacer></v-spacer>
      <v-col v-show="formStep >= 0" cols="auto" class="px-6">
        <v-btn
          fab
          :disabled="formStep == 0"
          elevation="0"
          color="white"
          class="my-0 animated fadeIn fast"
          @click="previousStep"
        >
          <v-icon dark large color="teal darken-3">mdi-chevron-left</v-icon>
        </v-btn>
      </v-col>
      <v-col v-show="formStep >= 0" cols="auto" class="px-0">
        <v-btn
          fab
          :disabled="formStep == 0"
          elevation="0"
          color="white"
          class="my-0 animated fadeIn fast"
          @click="goHome"
        >
          <v-icon dark large color="teal darken-3">mdi-home</v-icon>
        </v-btn>
      </v-col>
      <v-col v-show="formStep <= workerNumber" cols="auto" class="px-6">
        <v-btn
          fab
          :disabled="formStep == workerNumber"
          elevation="0"
          color="white"
          class="my-0 animated fadeIn fast"
          @click="nextStep"
        >
          <v-icon dark large color="teal darken-3">mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    formStep: Number,
    workerNumber: Number
  },
  methods: {
    nextStep() {
      this.$emit("nextStep");
    },
    previousStep() {
      this.$emit("previousStep");
    },
    goHome() {
      this.$emit("goHome");
    }
  }
};
</script>

<style></style>
