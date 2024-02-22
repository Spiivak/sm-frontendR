import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPhoneNumber } from 'firebase/auth'
import { useState } from 'react'
import { auth } from '../config/firebase.config'
import { userService } from '../services/user.service'
import { login } from '../store/actions/user.actions'
import { useEffectUpdate } from '../customHooks/useEffectUpdate'
import { useNavigate } from 'react-router-dom'


type Props = {}

const LoginIndex = (props: Props) => {
  const navigate = useNavigate()

  const [error, setError] = useState(false)
  const [user, setUser] = useState<any>(userService.getLoggedinUser())
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState("")

  useEffectUpdate(() => {
    if (user) {
      navigate('/')
    }
  }, [user])

  const handleLogin = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    login(email, password)
  }

  return (
    <section className="login-index index">
      <form className='login' onSubmit={handleLogin}>
        <input type="email" name="email" id="" placeholder='email' onChange={(e) => setEmail(e.target.value)} />
        <input type="password" name="password" id="" placeholder='password' onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>Login</button>
      </form>
      {error && <span>Wrong email or password!</span>}
    </section>
  )
}


export default LoginIndex