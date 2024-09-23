import { PropsWithChildren } from "react";
import { useAuth } from "./AuthProvider";
import { User } from "../types/user";

type ProtectedRouteProps = PropsWithChildren & {
  allowedRoles: User["role"][];
};

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { currentUser } = useAuth();

  if (currentUser === undefined) {
    return <div>Loading...</div>;
  }

  if (
    currentUser === null ||
    (allowedRoles && !allowedRoles.includes(currentUser.role))
  ) {
    return <div>Permission denied</div>;
  }

  return children;
};
export default ProtectedRoute;
