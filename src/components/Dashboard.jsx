import React from "react";
import Table from "../components/Table";
import { useAppContext } from "./Context";

import Loader from "./Loader";
import Error from "./Error";
import { Toaster } from "sonner";

const Dashboard = () => {
  const { error, isLoading, refetch } = useAppContext();

  if (isLoading) return <Loader />;
  if (error) return <Error retry={refetch} />;
  return (
    <div>
      <nav className="fixed top-0 justify-start items-start p-4 pl-8 bg-white shadow-md w-full ">
        <h1 className="font-bold text-2xl cursor-default text-primary">
          Dashboard
        </h1>
      </nav>
      <div className="h-full w-full text-4xl flex flex-col justify-center items-center">
        <div className="w-full h-screen flex justify-center items-center mt-0">
          <Table paginationPageSize={5} pageSize={[5, 10]} />
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default Dashboard;
