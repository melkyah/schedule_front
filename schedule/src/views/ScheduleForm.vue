<template>
  <v-container id="step-1" class="py-0">
    <v-row class="py-0">
      <v-col class="py-0">
        <v-card dark max-width="400" flat color="#00796B" class="mx-auto py-1">
          <v-card-title class="headline">Numero de residentes</v-card-title>
          <v-slider
            v-model="workerNumber"
            :min="minWorkers"
            :max="maxWorkers"
            color="#80CBC4"
            class="mx-6 my-0"
          ></v-slider>
          <p class="mx-auto mb-1 headline text-center">{{ workerNumber }}</p>
        </v-card>
        <v-card
          v-for="worker in workerList"
          v-bind:key="worker.id"
          dark
          max-width="400"
          flat
          color="#00796B"
          class="mx-auto my-2 py-1"
        >
          <v-card-title class="title"
            >Residente {{ worker.id + 1 }}</v-card-title
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      workerNumber: 0,
      minWorkers: 0,
      maxWorkers: 10,
      formStep: 1
    };
  },
  computed: {
    workerList() {
      let worker = {
        name: "",
        id: 0
      };
      let baseList = Array(this.workerNumber).fill(worker);
      let populatedList = baseList.map((i, index) => {
        let temp = Object.assign({}, i);
        temp.id = index;
        return temp;
      });
      return populatedList;
    }
  }
};
</script>

<style></style>
