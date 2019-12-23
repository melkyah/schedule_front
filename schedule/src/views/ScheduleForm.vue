<template>
  <v-form>
    <v-container fluid id="step-1" class="py-0">
      <v-row class="py-0">
        <v-col class="py-0">
          <h2
            class="mx-auto mt-0 mb-4 headline text-center white--text font-weight-bold"
          >
            PASO 1
          </h2>
          <v-card
            max-width="600"
            min-width="310"
            flat
            color="white"
            class="mx-auto py-1"
          >
            <v-card-title style="color:#004D40" class="headline mx-auto"
              >Numero de residentes</v-card-title
            >
            <v-slider
              v-model="workerNumber"
              :min="minWorkers"
              :max="maxWorkers"
              color="teal darken-3"
              track-color="teal lighten-3"
              class="mx-4 my-0"
            ></v-slider>
            <p style="color:#004D40" class="mx-auto mb-1 headline text-center">
              {{ workerNumber }}
            </p>
          </v-card>
          <v-expand-transition
            v-for="worker in workerList"
            v-bind:key="worker.id"
          >
            <v-card
              max-width="500"
              flat
              color="white"
              class="mx-auto my-2 py-1"
            >
              <v-card-title style="color:#004D40" class="title"
                >Residente {{ worker.id + 1 }}</v-card-title
              >
              <v-text-field
                class="mx-4"
                filled
                label="Nombre"
                v-model="worker.name"
                :rules="nameConstraint"
                counter="32"
              ></v-text-field>
            </v-card>
          </v-expand-transition>
        </v-col>
      </v-row>
      <v-row align-content="center" class="mx-1" id="nav-var">
        <v-col v-if="formStep > 1" cols="auto" class="px-0">
          <v-btn fab elevation="0" color="white" class="my-2">
            <v-icon dark large color="teal darken-3">mdi-chevron-left</v-icon>
          </v-btn>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto" class="px-0">
          <v-btn fab elevation="0" color="white" class="my-2">
            <v-icon dark large color="teal darken-3">mdi-chevron-right</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      workerNumber: 0,
      minWorkers: 0,
      maxWorkers: 10,
      formStep: 1,
      maxNameCharacters: 32
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
    },
    nameConstraint() {
      return [
        v => v.length <= this.maxNameCharacters || "Maximo 32 caracteres"
      ];
    }
  }
};
</script>

<style></style>
