import { Box, Stack, Skeleton, Grid } from "@mui/material";
import { useState } from "react";
import CourseCard from "./CourseCard";
import Layout from "../Layout";
// import React from "react";

const DefaultContent = () => {


  return (
    <Layout>
      <Grid container spacing={8} sx={{ padding: 3, justifyContent: 'flex-start', alignItems: "flex-start" }} >
        <Grid item="true" xs={12} sm={6} >
          <CourseCard />
        </Grid>
        <Grid item="true" xs={12} sm={6}  >
          <CourseCard />
        </Grid>
        <Grid item="true" xs={12} sm={6}  >
          <CourseCard />
        </Grid>
        <Grid item="true" xs={12} sm={6}  >
          <CourseCard />
        </Grid>
        <Grid item="true" xs={12} sm={6}  >
          <CourseCard />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default DefaultContent;