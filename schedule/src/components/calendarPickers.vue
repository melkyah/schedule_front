<template>
  <v-form>
    <v-container
      v-for="worker in workerList"
      v-bind:key="worker.id"
      fluid
      class="py-0"
    >
      <transition
        v-if="formStep == worker.id + 1"
        appear
        name="form-animation"
        enter-active-class="animated fadeIn fast"
      >
        <v-row class="py-0">
          <v-col class="py-0">
            <h2 class="mx-auto mt-0 my-0 title text-center white--text">
              RESIDENTE {{ worker.id }}
            </h2>
            <h3 class="mx-auto mt-0 mb-2 subtitle-1 text-center white--text">
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
  </v-form>
</template>

<script>
export default {
  props: {
    workerList: Array
  }
};
</script>

<style></style>
