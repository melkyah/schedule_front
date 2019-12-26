<template>
  <transition
    appear
    name="form-animation"
    enter-active-class="animated fadeIn fast"
  >
    <v-container class="pb-0 mb-0">
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
              {{ formStep }} - Revision de datos
            </v-card-title>
            <v-card-subtitle
              style="color:white; background-color:#80CBC4"
              class="subtitle-1 mx-auto my-auto py-1"
            >
              Estos son los datos ingresados
            </v-card-subtitle>
            <v-list class="py-0">
              <v-list-group prepend-icon="mdi-calendar">
                <template v-slot:activator>
                  <v-list-item-title>Informacion general</v-list-item-title>
                </template>
                <v-divider class="mx-0"></v-divider>
                <v-list-item-group
                  style="background-color: #EEEEEE;"
                  class="mx-0 px-7"
                >
                  <v-list-item dense> Año: {{ year }} </v-list-item>
                  <v-divider class="mx-4"></v-divider>
                  <v-list-item dense> Mes: {{ month }} </v-list-item>
                  <v-divider class="mx-4"></v-divider>
                  <v-list-item dense>
                    Numero de residentes: {{ residentNumber }}
                  </v-list-item>
                  <v-divider class="mx-4"></v-divider>
                  <v-list-item dense>
                    Guardias mensuales: {{ workDays }}
                  </v-list-item>
                  <v-divider class="mx-4"></v-divider>
                  <v-list-item dense>
                    Viernes y Domingo: {{ fridaySunday }}
                  </v-list-item>
                </v-list-item-group>
                <v-divider class="mx-0"></v-divider>
              </v-list-group>
              <v-list-group prepend-icon="mdi-account-multiple">
                <template v-slot:activator>
                  <v-list-item-title>Residentes por dia</v-list-item-title>
                </template>
                <v-divider class="mx-0"></v-divider>
                <v-list-item-group
                  style="background-color: #EEEEEE;"
                  class="mx-0 px-7"
                >
                  <v-list-item dense inactive>
                    Lunes: {{ workersPerDay[0] }}
                  </v-list-item>
                  <v-divider class="mx-4"></v-divider>
                  <v-list-item dense inactive>
                    Martes: {{ workersPerDay[1] }}
                  </v-list-item>
                  <v-divider class="mx-4"></v-divider>
                  <v-list-item dense inactive>
                    Miercoles: {{ workersPerDay[2] }}
                  </v-list-item>
                  <v-divider class="mx-4"></v-divider>
                  <v-list-item dense inactive>
                    Jueves: {{ workersPerDay[3] }}
                  </v-list-item>
                  <v-divider class="mx-4"></v-divider>
                  <v-list-item dense inactive>
                    Viernes: {{ workersPerDay[4] }}
                  </v-list-item>
                  <v-divider class="mx-4"></v-divider>
                  <v-list-item dense inactive>
                    Sabado: {{ workersPerDay[5] }}
                  </v-list-item>
                  <v-divider class="mx-4"></v-divider>
                  <v-list-item dense inactive>
                    Domingo: {{ workersPerDay[6] }}
                  </v-list-item>
                </v-list-item-group>
                <v-divider class="mx-0"></v-divider>
              </v-list-group>
              <v-list-group
                prepend-icon="mdi-medical-bag"
                v-for="(worker, index) in workerList"
                :key="index"
              >
                <template v-slot:activator>
                  <v-list-item-title>{{ worker.name }}</v-list-item-title>
                </template>
                <v-divider class="mx-0"></v-divider>
                <v-list-item-group
                  style="background-color: #EEEEEE;"
                  class="mx-0 px-7 py-1"
                >
                  <p class="my-2">Dias libres</p>
                  <div v-for="(day, index) in worker.freeDays" :key="index">
                    <v-divider class="mx-4"></v-divider>
                    <v-list-item dense inactive class="mx-1">
                      {{ day.substr(8, 9) }}-{{ month }}
                    </v-list-item>
                  </div>
                </v-list-item-group>
                <v-divider class="mx-0"></v-divider>
              </v-list-group>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mx-auto mb-10 pb-5">
        <v-col cols="auto" class="mx-auto py-0">
          <v-btn
            class="my-0"
            style="border-bottom-left-radius: 25px; border-bottom-right-radius: 25px;"
            large
            tile
            dark
            depressed
            color="#00695C"
          >
            Generar itinerario
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </transition>
</template>

<script>
export default {
  props: {
    formStep: Number,
    request: Object,
    workerList: Array
  },
  computed: {
    year() {
      return this.request.data.year;
    },
    month() {
      return this.request.data.month;
    },
    residentNumber() {
      return this.request.data.residents.length;
    },
    workDays() {
      return this.request.data.times_to_work;
    },
    fridaySunday() {
      if (this.request.data.friday_sunday) {
        return "Si";
      } else {
        return "No";
      }
    },
    workersPerDay() {
      return this.request.data.people_per_day;
    }
  }
};
</script>
