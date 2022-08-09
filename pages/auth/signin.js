import { getProviders, signIn, signOut, useSession, getSession, getCsrfToken } from 'next-auth/react'
import Layout from '../../components/authForm/Layout'
import AuthForm from '../../components/authForm/AuthForm'

export async function getServerSideProps(context) {

  const providers = await getProviders()
  const csrfToken = await getCsrfToken(context)
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: `${process.env.BASE_URL}`,
      }
    };
  }

  return {
    props: {
      providers,
      csrfToken
    },
  }
}

export default function signup({providers, csrfToken}) {
  
  return (
    <Layout 
      title={"Sign in"}
      showLog={false} 
    >
      <AuthForm 
        typeAuth='signin'
        providers={providers} 
        csrfToken={csrfToken}
      />
    </Layout>
  )
}