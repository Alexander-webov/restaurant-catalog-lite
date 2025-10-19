import { useNavigate, useSearchParams, Link } from "react-router-dom";
import LoginForm from "../../entities/login/LoginForm";

const LoginPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = params.get("redirect") || "/admin-panel";

  return (
    <div className="text-center mt-10">
      <h2 className="text-3xl mb-5">Login</h2>
      <LoginForm onSuccess={() => navigate(redirect, { replace: true })} />
      <p className="mt-5 uppercase text-xl ">
        fast links:{" "}
        <Link className="font-bold underline" to="/admin-panel">
          Manager
        </Link>{" "}
        ·{" "}
        <Link className=" font-bold underline" to="/kitchen">
          Kitchen
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
