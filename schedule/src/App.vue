<template>
  <v-app>
    <v-app-bar app color="teal lighten-3" dark>
      <v-container class="mx-auto">
        <v-toolbar-title>Calendario de residentes</v-toolbar-title>
      </v-container>
    </v-app-bar>

    <v-content>
      <ScheduleForm />
    </v-content>
  </v-app>
</template>

<script>
import ScheduleForm from "./views/ScheduleForm";

export default {
  name: "App",

  components: {
    ScheduleForm
  },

  data: () => ({
    //
  })
};
</script>
