<template>
  <div>
    <BreadCrumb crumb="首页" />
    <CountPannel />
    <CurveGraph />
    <PieGraph />
    <ColumnGraph />
  </div>
</template>

<script>
import BreadCrumb from "@/views/widget/BreadCrumb";
import CountPannel from "@/views/widget/CountPannel";
import CurveGraph from "@/views/widget/CurveGraph";
import PieGraph from "@/views/widget/PieGraph";
import ColumnGraph from "@/views/widget/ColumnGraph";
export default {
  name: "Front",
  components: {
    BreadCrumb,
    CountPannel,
    CurveGraph,
    PieGraph,
    ColumnGraph,
  },
};
</script>

<style scoped></style>
