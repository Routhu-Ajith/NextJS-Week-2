const { useState } = require("react")
import Body from "./Body";

 

 const NewUserForm = ({onClose,onSave}) => {
    const [formData,setformData] = useState({
        id:'',
        first_name:'',
        last_name:'',
        gender:'',
        email:'',
        ip_address:''
    });

    const handleChange =(e) => {
        setformData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose(); //close the prop
        setformData({
            id:'',
            first_name:'',
            last_name:'',
            gender:'',
            email:'',
            ip_address:''
        });
    };


    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-lg font-bold mb-4">Add New Person</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">ID</label>
                        <input
                            type="text"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            className="mt-1 p-2 border w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">First Name</label>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            className="mt-1 p-2 border w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="mt-1 p-2 border w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Gender</label>
                        <input
                            type="text"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="mt-1 p-2 border w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                            <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 p-2 border w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">IP Address</label>
                        <input
                            type="text"
                            name="ip_address"
                            value={formData.ip_address}
                            onChange={handleChange}
                            className="mt-1 p-2 border w-full"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={onClose}
                          className="mr-3 px-2 py-2 bg-black text-white rounded transition-transform transform duration-150 hover:scale-105"
                        >
                            Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-3 py-2 bg-black text-white rounded transition-transform transform duration-150 hover:scale-105"
                        >
                            Save
                        </button>
                    </div>
                
                </form>
            </div>
        </div>
    );
 };

 export default NewUserForm;