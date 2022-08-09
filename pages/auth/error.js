 export async function getServerSideProps(context) {
  return {
    redirect: {
      permanent: false,
      destination: `${process.env.BASE_URL}/auth/signin?error=AccessDenied`,
    }
  };
  
}

export default function SignIn({ providers, csrfToken }) {
  return (
    <>
    <h1>Error</h1>
    </>
    )
  }
  
// http://localhost:3000/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000&error=OAuthCallback retorn al signin
// http://localhost:3000/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000&error=OAuthCallback