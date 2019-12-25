<template>
  <v-app>
    <v-app-bar height="80" app color="teal darken-3" dark>
      <v-container class="mx-auto">
        <v-toolbar-title>Calendario de residentes</v-toolbar-title>
      </v-container>
    </v-app-bar>

    <v-content id="app-content" class="teal ligthen-3 mx-auto">
      <v-container fluid>
        <v-row>
          <v-col class="py-0">
            <ScheduleForm />
          </v-col>
        </v-row>
      </v-container>
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
<style>
#app-content {
  max-width: 1200px;
}
</style>
