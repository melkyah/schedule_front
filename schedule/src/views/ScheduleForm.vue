<template>
  <v-form>
    <transition
      appear
      name="form-animation"
      enter-active-class="animated fadeIn fast"
    >
      <v-container v-show="formStep == 0" fluid class="pt-0 mb-8">
        <v-row class="py-0">
          <v-col class="py-0">
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
              >
                Inicio - Seleccione mes
              </v-card-title>
              <v-date-picker
                v-model="selectedMonth"
                no-title
                color="#00695C"
                width="310"
                locale="es"
                type="month"
                :min="currentDate.substr(0, 7)"
              ></v-date-picker>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </transition>
    <transition
      appear
      name="form-animation"
      enter-active-class="animated fadeIn fast"
    >
      <v-container v-show="formStep == 1" fluid class="pt-0 mb-8">
        <v-row class="py-0">
          <v-col class="py-0">
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
                >1 - Condiciones de guardia</v-card-title
              >
              <v-card-title
                style="color:white; background-color:#80CBC4"
                class="subtitle-1 mx-auto py-1"
                >1.1 - Numero de residentes</v-card-title
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
                style="color:white; background-color:#80CBC4"
                class="subtitle-1 mx-auto py-1"
                >1.2 - Numero de guardias</v-card-title
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
                style="color:white; background-color:#80CBC4"
                class="subtitle-1 mx-auto py-1"
                >1.3 - Viernes + Domingo</v-card-title
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
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </transition>
    <transition
      appear
      name="form-animation"
      enter-active-class="animated fadeIn fast"
    >
      <v-container v-show="formStep == 2" fluid class="pt-0 mb-8">
        <v-row class="py-0">
          <v-col class="py-0">
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
                >2 - Cantidad de residentes por dia</v-card-title
              >
              <div
                class="mb-4"
                v-for="(day, index) in weekdayNames"
                :key="index"
              >
                <v-card-title
                  style="color:white; background-color:#80CBC4"
                  class="subtitle-1 mx-auto py-1"
                  >2.{{ index + 1 }} - {{ day }}</v-card-title
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
          </v-col>
        </v-row>
      </v-container>
    </transition>
    <transition
      appear
      name="form-animation"
      enter-active-class="animated fadeIn fast"
    >
      <transition
        appear
        name="form-animation"
        enter-active-class="animated fadeIn fast"
      >
        <v-container v-show="formStep == 3" fluid class="pt-0 mb-10">
          <v-row class="py-0">
            <v-col class="py-0">
              <v-card
                max-width="600"
                min-width="310"
                flat
                color="white"
                class="mx-auto"
              >
                <v-card-title
                  style="color:white; background-color:#00695C"
                  class="subtitle-1 mx-auto py-1"
                  >3 - Datos de residentes</v-card-title
                >
                <div v-for="worker in workerList" v-bind:key="worker.id">
                  <v-card-title
                    style="color:white; background-color:#80CBC4"
                    class="subtitle-1 mx-auto py-1"
                    >3.{{ worker.id }} - Residente {{ worker.id }}</v-card-title
                  >
                  <v-text-field
                    class="mx-4 my-3"
                    filled
                    label="Nombre"
                    v-model="worker.name"
                    :rules="nameConstraint"
                    counter="32"
                  ></v-text-field>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </transition>
    </transition>
    <calendar-pickers
      v-for="worker in workerList"
      v-bind:key="worker.id"
      :formStep="formStep"
      :workerId="worker.id"
      :name="worker.name"
      :selectedMonth="selectedMonth"
      @updateDays="updateFreeDays"
    ></calendar-pickers>
    <submitStep
      v-if="formStep == workerNumber + 4"
      :formStep="formStep"
      :request="request"
      :workerList="workerList"
    ></submitStep>
    <transition
      appear
      name="footer-animation"
      enter-active-class="animated fadeInUp faster"
      leave-active-class="animated fadeOutDown faster"
    >
      <v-footer fixed class="mx-auto py-0" color="teal darken-3">
        <navBar
          :formStep="formStep"
          :workerNumber="workerNumber"
          @nextStep="nextStep"
          @previousStep="previousStep"
          @goHome="goHome"
        ></navBar>
      </v-footer>
    </transition>
  </v-form>
</template>

<script>
import navBar from "../components/navBar.vue";
import calendarPickers from "../components/calendarPickers.vue";
import submitStep from "../components/submitStep.vue";

export default {
  components: {
    navBar,
    calendarPickers,
    submitStep
  },

  data() {
    return {
      workerNumber: 0,
      workDayNumber: 0,
      minWorkers: 0,
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
      ],
      selectedMonth: new Date().toISOString().substr(0, 7)
    };
  },
  computed: {
    currentDate() {
      let date = new Date().toISOString().substr(0, 10);
      return date;
    },
    workerList() {
      let worker = {
        name: "",
        id: 0,
        freeDays: []
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
        temp[i] = i + 1;
      }
      return temp;
    },
    workersIndexArray() {
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
          residents: this.workersIndexArray,
          friday_sunday: this.fridaySunday,
          times_to_work: this.workDayNumber,
          people_per_day: this.workersPerDay,
          month: this.selectedMonth.substr(5, 7),
          year: this.selectedMonth.substr(0, 4),
          calendar: []
        }
      };
      return request;
    }
  },
  methods: {
    nextStep() {
      if (this.formStep < this.workerNumber + 4) {
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
    },
    updateFreeDays(data) {
      let workerIndex = data.workerId - 1;
      this.workerList[workerIndex].freeDays = data.dates;
    }
  }
};
</script>

<style></style>
