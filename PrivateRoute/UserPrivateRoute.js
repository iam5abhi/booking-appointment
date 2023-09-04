import { userAuth } from "../components/firebase/UserFirebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/router';

const UserPrivateRoute = (WrappedComponent) => {
const UserPrivateRoute = (props) => {
    const Router = useRouter()
    const [user, loading, error] = useAuthState(userAuth);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        Router.push('/user-login');
        return null;
    }

    return <WrappedComponent {...props} />;
};

UserPrivateRoute.getInitialProps = async (ctx) => {
    const wrappedComponentInitialProps = WrappedComponent.getInitialProps
        ? await WrappedComponent.getInitialProps(ctx)
        : {};

       return { ...wrappedComponentInitialProps };
    };

   return UserPrivateRoute;
};

export default UserPrivateRoute;