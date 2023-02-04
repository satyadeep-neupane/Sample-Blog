import FloatingInput from "component/FloatingInput";
import { useState } from "react";

import { login } from "api/request.api";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

function Login() {
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{
            const response = await login(data);
            localStorage.setItem("token", response.data.accessToken);
            navigate("/admin/user")
        }catch(err)
        {
            toast.error(err.response.data.message)
        }
    }
    return (
        <div>
            <h1>Login</h1>

            <div className="row">
                <div className="col-6 mx-auto">
                    <form onSubmit={handleSubmit}>
                        <FloatingInput
                            label="Email"
                            type="text"
                            placeholder="Enter email..."
                            name="email"
                            id="email"
                            value={data.email}
                            handler={handleChange}
                        />
                        <FloatingInput
                            label="Password"
                            type="password"
                            placeholder="Enter password..."
                            name="password"
                            id="password"
                            value={data.password}
                            handler={handleChange}
                        />
                        <button>Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;