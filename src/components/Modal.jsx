import React, { useState } from "react";
import { toast } from "sonner";

const Modal = ({ title, fields, data, onSave, onClose, buttons }) => {
  const [formData, setFormData] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({...prev, [name]: value, }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    toast.success("Updated successfully!");
  };

  return (
    <div className="fixed h-full w-full backdrop-blur-lg flex justify-center items-center z-10 mx-auto">
      <form
        className="max-w-md md:w-1/2 lg:w-[30%] mx-auto p-12 py-12 flex flex-col justify-center items-center gap-4 rounded-xl border shadow-md bg-white"
        onSubmit={handleSubmit}
      >
        <h1 className="text-red-500 m-0 mb-4 font-semibold text-2xl">{title}</h1>

        {fields.map((field) => (
          <div key={field.name} className="relative z-0 w-full mb-5 group">
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name].name ?? formData[field.name]}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=" "
              required={field.required}
              readOnly={field.readOnly}
              pattern={field.type === "tel" ? "[0-9()]*" : undefined}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              {field.label}
            </label>
          </div>
        ))}

        <div className="grid md:grid-cols-2 md:gap-6 w-full">
          {buttons.map((button) => (
            <button
              key={button.label}
              type={button.type || "button"}
              onClick={button.onClick}
              className={`${button.className} px-5 py-2.5 text-sm rounded-lg font-medium`}
            >
              {button.label}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
};

export default Modal;
