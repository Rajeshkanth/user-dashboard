import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { useAppContext } from "./Context";
import { AllCommunityModule, ModuleRegistry, TooltipModule } from "ag-grid-community";
import Modal from "./Modal";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule, TooltipModule]);

const Table = ({pageSize, paginationPageSize,}) => {
  const { users, colDefs, updateUser, fields, buttons, selectedUser, isEdit, onClose } = useAppContext();
  const [search, setSearch] = useState("");
  const [rowData, setRowData] = useState([]);
  
  const onGridReady = (params) => {
    params.api.sizeColumnsToFit();
  };

  useEffect(() => {
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    setRowData(filteredUsers);
  }, [users, search]);

  return (
    <>
      <div className="w-full h-1/2 flex flex-col items-center justify-center">
        <div className="ag-theme-quartz w-[90%] h-full">
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            pagination={true}
            paginationPageSize={paginationPageSize}
            paginationPageSizeSelector={pageSize}
            onGridReady={onGridReady}
            domLayout="normal"
          />
        </div>

        {selectedUser && isEdit && (
          <Modal title="User Details" fields={fields} data={selectedUser} onSave={updateUser} onClose={onClose} buttons={buttons} />
        )}
      </div>
    </>
  );
};

export default Table;
