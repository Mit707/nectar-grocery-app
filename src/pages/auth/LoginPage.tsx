import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { useAuthStore } from '../../store/authStore'

export function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const validate = () => {
    const e: typeof errors = {}
    if (!email.includes('@')) e.email = 'Enter a valid email'
    if (password.length < 6) e.password = 'Password must be at least 6 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleLogin = () => {
    if (!validate()) return
    setLoading(true)
    setTimeout(() => {
      login({ id: '1', name: 'User', email })
      navigate('/home', { replace: true })
    }, 800)
  }

  return (
    <div className="page-container min-h-screen bg-auth-gradient flex flex-col">
      {/* Carrot icon */}
      <div className="flex justify-center pt-16 pb-2">
        <div className="w-16 h-16">
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M32 10 C28 10 18 20 18 36 C18 46 24 54 32 54 C40 54 46 46 46 36 C46 20 36 10 32 10Z"
              fill="#F8A44C"
            />
            <path d="M29 8 Q30 4 32 2 Q34 4 35 8" stroke="#53B175" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M25 7 Q26 4 28 3" stroke="#53B175" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M39 7 Q38 4 36 3" stroke="#53B175" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 pt-6">
        <h1 className="text-3xl font-bold text-nectar-black mb-2">Loging</h1>
        <p className="text-nectar-gray text-sm mb-8">Enter your emails and password</p>

        <div className="flex flex-col gap-7">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="imshuvo97@gmail.com"
            error={errors.email}
            autoComplete="email"
          />
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            error={errors.password}
            autoComplete="current-password"
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            }
          />
        </div>

        <div className="flex justify-end mt-4 mb-8">
          <button className="text-sm text-nectar-black font-medium">
            Forgot Password?
          </button>
        </div>

        <Button onClick={handleLogin} loading={loading}>
          Log In
        </Button>

        <p className="text-center text-sm text-nectar-gray mt-6">
          Don&apos;t have an account?{' '}
          <button
            onClick={() => navigate('/auth/signup')}
            className="text-primary font-semibold"
          >
            Singup
          </button>
        </p>
      </div>
    </div>
  )
}
