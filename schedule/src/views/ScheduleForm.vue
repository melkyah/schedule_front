<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card dark max-width="400" flat color="#00796B" class="mx-auto py-1">
          <v-card-title class="headline">Numero de residentes</v-card-title>
          <v-slider
            v-model="workerNumber"
            :min="minWorkers"
            :max="maxWorkers"
            color="#80CBC4"
            class="mx-6"
          ></v-slider>
          <p class="mx-auto headline text-center">{{ workerNumber }}</p>
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
      maxWorkers: 10
    };
  }
};
</script>

<style></style>
