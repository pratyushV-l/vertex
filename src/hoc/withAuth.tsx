import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const isLoggedIn = Cookies.get('logged_in');

      if (!isLoggedIn) {
        router.push('/Login-Signup');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;