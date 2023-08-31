import { auth } from "../components/firebase/index";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/router';

const PrivateRoute = (WrappedComponent) => {
const PrivateRoute = (props) => {
    const Router = useRouter()
    const [user, loading, error] = useAuthState(auth);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        Router.push('/login');
        return null;
    }

    return <WrappedComponent {...props} />;
};

PrivateRoute.getInitialProps = async (ctx) => {
    const wrappedComponentInitialProps = WrappedComponent.getInitialProps
        ? await WrappedComponent.getInitialProps(ctx)
        : {};

       return { ...wrappedComponentInitialProps };
    };

   return PrivateRoute;
};

export default PrivateRoute;