<template>
  <v-form>
    <v-container
      v-for="worker in workerList"
      v-bind:key="worker.id"
      fluid
      class="py-0"
    >
      <v-expand-x-transition>
        <v-row v-if="formStep == worker.id" class="py-0">
          <v-col class="py-0">
            <h2
              class="mx-auto mt-0 mb-4 headline text-center white--text font-weight-bold"
            >
              PASO {{ worker.id + 1 }}
            </h2>
            <h3
              class="mx-auto mt-0 mb-4 subtitle text-center white--text font-weight-bold"
            >
              {{ worker.name }}
            </h3>
            <v-card
              max-width="600"
              min-width="310"
              flat
              color="white"
              class="mx-auto py-1"
            >
              <v-card-title style="color:#004D40" class="headline mx-auto"
                >Dias libres</v-card-title
              >
            </v-card>
          </v-col>
        </v-row>
      </v-expand-x-transition>
    </v-container>
    <v-container fluid class="py-0">
      <v-expand-x-transition>
        <v-row v-if="formStep == 0" class="py-0">
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
              <p
                style="color:#004D40"
                class="mx-auto mb-1 headline text-center"
              >
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
                  >Residente {{ worker.id }}</v-card-title
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
      </v-expand-x-transition>
      <v-row align-content="center" class="mx-1" id="nav-var">
        <v-col v-if="formStep > 0" cols="auto" class="px-0">
          <v-btn
            fab
            elevation="0"
            color="white"
            class="my-2"
            @click="previousStep"
          >
            <v-icon dark large color="teal darken-3">mdi-chevron-left</v-icon>
          </v-btn>
        </v-col>
        <v-spacer></v-spacer>
        <v-col v-if="formStep < workerNumber" cols="auto" class="px-0">
          <v-btn fab elevation="0" color="white" class="my-2" @click="nextStep">
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
      formStep: 0,
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
        temp.id = index + 1;
        return temp;
      });
      return populatedList;
    },
    nameConstraint() {
      return [
        v => v.length <= this.maxNameCharacters || "Maximo 32 caracteres"
      ];
    }
  },
  methods: {
    nextStep() {
      if (this.formStep < this.workerNumber) {
          this.formStep++;
      }
    },
    previousStep() {
      if (this.formStep >= 1) {
        this.formStep--;
      }
    }
  }
};
</script>

<style></style>
