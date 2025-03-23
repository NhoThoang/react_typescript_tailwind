import { useNavigate } from 'react-router-dom';
import './page404.css';

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <button onClick={() => navigate('/')}>
        Return to Home
      </button>
    </div>
  );
};

export default Page404;
