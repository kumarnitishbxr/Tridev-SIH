import { useNavigate } from "react-router";


export default function LoginPage() {
  

  const navigate = useNavigate()


  return (
    <div className="flex items-center justify-center h-screen bg-base-100">
      <div className="card w-96 bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            defaultValue='ersamirsingh'
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full mt-3"
            defaultValue='Samir@123'
          />
          
          <button 
            className="btn btn-primary w-full mt-4"
            onClick={()=>navigate('/admin')}

          >Login</button>
        </div>
      </div>
    </div>
  );
}
