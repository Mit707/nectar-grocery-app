import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Check } from 'lucide-react'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

export function SignUpPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const emailValid = email.includes('@') && email.includes('.')

  const handleSignUp = () => {
    setLoading(true)
    setTimeout(() => navigate('/auth/verify'), 800)
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
        <h1 className="text-3xl font-bold text-nectar-black mb-2">Sign Up</h1>
        <p className="text-nectar-gray text-sm mb-8">Enter your credentials to continue</p>

        <div className="flex flex-col gap-7">
          <Input
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Afsar Hossen Shuvo"
            autoComplete="name"
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="imshuvo97@gmail.com"
            autoComplete="email"
            rightIcon={
              emailValid ? <Check size={18} className="text-primary" /> : null
            }
          />
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="new-password"
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

        <p className="text-sm text-nectar-gray mt-6 mb-8 leading-relaxed">
          By continuing you agree to our{' '}
          <button className="text-primary font-semibold">Terms of Service</button> and{' '}
          <button className="text-primary font-semibold">Privacy Policy</button>.
        </p>

        <Button
          onClick={handleSignUp}
          loading={loading}
          disabled={!username || !email || !password}
        >
          Sing Up
        </Button>

        <p className="text-center text-sm text-nectar-gray mt-6">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/auth/login')}
            className="text-primary font-semibold"
          >
            Singup
          </button>
        </p>
      </div>
    </div>
  )
}
