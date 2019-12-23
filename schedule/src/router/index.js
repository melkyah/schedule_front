import Vue from "vue";
import VueRouter from "vue-router";
import ScheduleForm from "../views/ScheduleForm.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "form",
    component: ScheduleForm
  }
];

const router = new VueRouter({
  routes
});

export default router;
