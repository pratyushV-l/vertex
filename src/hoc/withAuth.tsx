import { useRouter } from 'next/navigation';
import { JSX, useEffect } from 'react';
import Cookies from 'js-cookie';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const ComponentWithAuth = (props: JSX.IntrinsicAttributes) => {
    const router = useRouter();

    useEffect(() => {
      const isLoggedIn = Cookies.get('logged_in');

      if (!isLoggedIn) {
        router.push('/Login-Signup');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithAuth;
};

export default withAuth;