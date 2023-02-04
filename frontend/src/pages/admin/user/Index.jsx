import { useEffect, useState } from "react";

import { getUsers } from "api/request.api";

function Index() {
    const [users, setUsers] = useState([]);

    const fetchUser = async () => {
        try {
            const response = await getUsers();
            setUsers(response.data);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div>
            <h1>Index - User</h1>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => {
                            return (
                                <tr key={user._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>Delete</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Index;