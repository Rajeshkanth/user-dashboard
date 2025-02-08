import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";

const Context = createContext();

const getUsers = async () => {
  const response = await axios.get(process.env.REACT_APP_GET_USERS);
  if (response.status != 200) throw new Error("Internal Error");
  return response;
};

export const Provider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const { data, error, isLoading, refetch } = useQuery("users", getUsers);

  const onEdit = (user) => {
    setSelectedUser(user);
    setIsEdit(true);
  };

  const onClose = () => {
    setSelectedUser(null);
  }

  const customSort = (valueA, valueB) => {
    if (!valueA) return -1;
    if (!valueB) return 1;
    return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
  };

  const colDefs = [
    {
      field: "name",
      headerName: "Name",
      sortable: true,
      filter: true,
      flex: 1,
      filterParams: {
        filterOptions: ["contains"],
        debounceMs: 500,
      },
      minWidth: 200,
      comparator: customSort,
      sort: "asc",
    },
    {
      field: "username",
      headerName: "Username",
      sortable: false,
      filter: false,
      flex: 4,
      cellStyle: {
        whiteSpace: "nowrap",
        textOverflow: "clip",
        wordWrap: "break-word",
        overflowX: "auto",
      },
      minWidth: 200,
    },
    {
      field: "email",
      headerName: "Email",
      sortable: true,
      filter: false,
      flex: 4,
      cellStyle: {
        whiteSpace: "nowrap",
        textOverflow: "clip",
        wordWrap: "break-word",
        overflowX: "auto",
      },
      minWidth: 200,
      comparator: customSort,
    },
    {
      field: "address",
      headerName: "Address",
      headerTooltip: "Address",
      sortable: false,
      flex: 3,
      cellStyle: {
        width: "auto",
        display: "block",
        maxHeight: "50px",
        overflowX: "auto",
        whiteSpace: "normal",
      },
      minWidth: 400,
      valueGetter: (params) =>
        `${params.data.address.street}, ${params.data.address.suite}, ${params.data.address.city}, ${params.data.address.zipcode}`,
    },
    {
      field: "phone",
      headerName: "Phone",
      sortable: false,
      filter: false,
      flex: 2,
      minWidth: 200,
    },
    {
      field: "website",
      headerName: "Website",
      sortable: false,
      minWidth: 200,
    },
    {
      field: "company",
      headerName: "Company",
      sortable: false,
      flex: 3,
      cellStyle: {
        whiteSpace: "nowrap",
        textOverflow: "clip",
        wordWrap: "break-word",
        overflowX: "auto",
      },

      minWidth: 400,
      valueGetter: (params) =>
        `${params.data.company.name} - ${params.data.company.catchPhrase} (${params.data.company.bs})`,
    },
    {
      field: "action",
      sortable:false,
      headerName: "Action",
      cellRenderer: (params) => (
        <button
          className=" text-primary px-4 rounded border-none outline-none"
          onClick={() => onEdit(params.data)}
        >
          Edit
        </button>
      ),
      minWidth: 100,
    },
  ];

  const updateUser = (updatedUser) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setSelectedUser(null);
    setIsEdit(false);
  };

  const fields = [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone", type: "tel", required: true },
    { name: "website", label: "Website", type: "text", readOnly: true },
    { name: "company", label: "Company", type: "text", readOnly: true },
  ];

  const buttons = [
    {
      label: "Save",
      type: "submit",
      className:
        "focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-white hover:bg-gray-100 focus:ring-red-500 text-primary outline outline-primary",
    },
    {
      label: "Cancel",
      className:
        "text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-primary hover:bg-red-500 focus:ring-red-500 outline",
      onClick: onClose,
    },
  ];

  

  useEffect(() => {
    console.log(data);

    if (data) setUsers(data.data);
  }, [data]);

  return (
    <Context.Provider
      value={{ users, error, isLoading, refetch,
        setUsers,
        colDefs,
        updateUser,
        fields,
        buttons,
        selectedUser, isEdit, onClose
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => useContext(Context);
