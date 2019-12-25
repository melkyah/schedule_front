<template>
  <v-form>
    <v-container
      v-for="worker in workerList"
      v-bind:key="worker.id"
      fluid
      class="py-0"
    >
      <transition
        v-if="formStep == worker.id"
        appear
        name="form-animation"
        enter-active-class="animated fadeIn fast"
      >
        <v-row class="py-0">
          <v-col class="py-0">
            <h2
              class="mx-auto mt-0 my-0 title text-center white--text"
            >
              RESIDENTE {{ worker.id }}
            </h2>
            <h3
              class="mx-auto mt-0 mb-2 subtitle-1 text-center white--text"
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
      </transition>
    </v-container>
    <v-container fluid class="pt-0 mb-10">
      <v-row v-show="formStep == 0" class="py-0">
        <v-col class="py-0">
          <h2
            class="mx-auto mt-0 mb-1 title text-center white--text"
          >
            INICIO
          </h2>
          <v-card
            max-width="600"
            min-width="310"
            flat
            color="white"
            class="mx-auto py-0"
          >
            <v-card-title
              style="color:white; background-color:#00695C"
              class="subtitle-1 mx-auto py-1"
              >Numero de residentes</v-card-title
            >
            <v-slider
              v-model="workerNumber"
              :min="minWorkers"
              :max="maxWorkers"
              color="teal darken-3"
              track-color="teal lighten-3"
              class="mx-4 mt-5"
            >
              <template v-slot:append>
                <v-text-field
                  v-model="workerNumber"
                  :rules="workerNumberConstraint"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  type="number"
                  style="width: 35px"
                ></v-text-field>
              </template>
            </v-slider>
            <v-card-title
              style="color:white; background-color:#00695C"
              class="subtitle-1 mx-auto py-1"
              >Numero de guardias</v-card-title
            >
            <v-slider
              v-model="workDayNumber"
              :min="minDays"
              :max="maxDays"
              color="teal darken-3"
              track-color="teal lighten-3"
              class="mx-4 mt-5"
            >
              <template v-slot:append>
                <v-text-field
                  v-model="workDayNumber"
                  :rules="workDayNumberConstraint"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  type="number"
                  style="width: 35px"
                ></v-text-field>
              </template>
            </v-slider>
            <v-card-title
              style="color:white; background-color:#00695C"
              class="subtitle-1 mx-auto py-1"
              >Viernes + Domingo</v-card-title
            >
            <v-row class="mx-auto px-2"
              ><v-col>
                <v-switch
                  :label="fridaySundayString"
                  color="teal darken-3"
                  flat
                  inset
                  v-model="fridaySunday"
                  class="mx-auto"
                ></v-switch> </v-col
            ></v-row>
            <v-card-title
              style="color:white; background-color:#00695C"
              class="subtitle-1 mx-auto py-1"
              >Cantidad de residentes por dia</v-card-title
            >
            <div class="mb-4" v-for="(day, index) in weekdayNames" :key="index">
              <v-card-title
                style="color:white; background-color:#80CBC4"
                class="subtitle-1 mx-auto py-1"
                >{{ day }}</v-card-title
              >
              <v-select
                filled
                label="Seleccione"
                :items="workersNumberArray"
                v-model="workersPerDay[index]"
                class="mx-4 mt-5"
              >
              </v-select>
            </div>
          </v-card>
          <transition
            appear
            name="card-animation"
            enter-active-class="animated fadeInDown faster"
            leave-active-class="animated fadeOutUp faster"
            v-for="worker in workerList"
            v-bind:key="worker.id"
          >
            <v-card
              max-width="500"
              flat
              color="white"
              class="mx-auto my-2 py-0"
            >
              <v-card-title
                style="color:white; background-color:#00695C"
                class="subtitle-1 mx-auto py-1"
                >Residente {{ worker.id }}</v-card-title
              >
              <v-text-field
                class="mx-4 my-3"
                filled
                label="Nombre"
                v-model="worker.name"
                :rules="nameConstraint"
                counter="32"
              ></v-text-field>
            </v-card>
          </transition>
        </v-col>
      </v-row>
    </v-container>
    <transition
      appear
      name="footer-animation"
      enter-active-class="animated fadeInUp faster"
      leave-active-class="animated fadeOutDown faster"
    >
      <v-footer fixed class="mx-auto py-0" color="teal darken-3">
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
              <v-icon dark large color="teal darken-3"
                >mdi-chevron-right</v-icon
              >
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-footer>
    </transition>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      workerNumber: 0,
      workDayNumber: 8,
      minWorkers: 1,
      maxWorkers: 10,
      minDays: 0,
      maxDays: 8,
      formStep: 0,
      maxNameCharacters: 32,
      fridaySunday: false,
      weekdayNames: [
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado",
        "Domingo"
      ]
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
    fridaySundayString() {
      if (this.fridaySunday) {
        return "Si";
      } else {
        return "No";
      }
    },
    workersPerDay() {
      return Array(this.weekdayNames.length).fill(this.minWorkers);
    },
    workersNumberArray() {
      let temp = Array(this.workerNumber);

      for (let i = 0; i < temp.length; i++) {
        temp[i] = i;
      }
      return temp;
    },
    nameConstraint() {
      return [
        v => v.length <= this.maxNameCharacters || "Maximo 32 caracteres."
      ];
    },
    workerNumberConstraint() {
      return [
        v => v <= this.maxWorkers || `Maximo ${this.maxWorkers} residentes.`
      ];
    },
    workDayNumberConstraint() {
      return [v => v <= this.maxDays || `Maximo ${this.maxDays} dias.`];
    },
    weekdayWorkersConstraint() {
      return [
        v => v <= this.workerNumber || `Maximo ${this.workerNumber} residentes.`
      ];
    },
    request() {
      let request = {
        data: {
          residents: this.workersNumberArray,
          friday_sunday: this.fridaySunday,
          times_to_work: this.workDayNumber,
          people_per_day: this.workersPerDay,
          month: "",
          calendar: []
        }
      };
      return request;
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
    },
    goHome() {
      if (this.formStep >= 1) {
        this.formStep = 0;
      }
    }
  }
};
</script>

<style></style>
