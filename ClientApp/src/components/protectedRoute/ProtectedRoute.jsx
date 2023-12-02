import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ canActivate }) => {
  const navigate = useNavigate();

  if (!canActivate) {
    navigate('/');
    return null;
  }

  return <Outlet/>;
};

export default ProtectedRoute;