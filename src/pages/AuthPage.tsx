import { useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowLeft, Eye, EyeOff, Scale } from '../components/ui/Icons';
import styles from './AuthPage.module.css';

type AuthMode = 'signup' | 'signin';

interface AuthPageProps {
  onBack: () => void;
  onAuthenticated: () => void;
}

const getPasswordChecks = (password: string) => [
  password.length >= 8,
  /[A-Z]/.test(password),
  /[0-9]/.test(password),
  /[^A-Za-z0-9]/.test(password),
];

export const AuthPage = ({ onBack, onAuthenticated }: AuthPageProps) => {
  const [mode, setMode] = useState<AuthMode>('signup');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const checks = getPasswordChecks(password);
  const strength = checks.filter(Boolean).length;
  const strengthLabel = strength < 2 ? 'Needs work' : strength < 4 ? 'Getting stronger' : 'Strong password';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAuthenticated();
  };

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setPassword('');
    setShowPassword(false);
  };

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <button className={styles.backButton} type="button" onClick={onBack}>
          <ArrowLeft />
          Back to LawTrack
        </button>

        <section className={styles.intro}>
          <div className={styles.logo} aria-hidden="true"><Scale /></div>
          <p className={styles.eyebrow}>A clearer way to know your rights</p>
          <h1>{mode === 'signup' ? 'Make the law easier to follow.' : 'Welcome back to LawTrack.'}</h1>
          <p className={styles.lede}>
            {mode === 'signup'
              ? 'Create your personal view of the laws and deadlines that matter to you.'
              : 'Sign in to pick up where you left off.'}
          </p>
          <p className={styles.disclaimer}>General legal information only. Never legal advice.</p>
        </section>

        <section className={styles.formPanel} aria-labelledby="auth-title">
          <div className={styles.modeSwitch} role="tablist" aria-label="Account access">
            <button className={mode === 'signup' ? styles.activeMode : ''} type="button" role="tab" aria-selected={mode === 'signup'} onClick={() => switchMode('signup')}>Sign up</button>
            <button className={mode === 'signin' ? styles.activeMode : ''} type="button" role="tab" aria-selected={mode === 'signin'} onClick={() => switchMode('signin')}>Sign in</button>
          </div>

          <div className={styles.formHeading}>
            <p className={styles.formKicker}>{mode === 'signup' ? 'Create your account' : 'Access your account'}</p>
            <h2 id="auth-title">{mode === 'signup' ? 'Start with you.' : 'Good to see you.'}</h2>
          </div>

          <form onSubmit={handleSubmit}>
            {mode === 'signup' ? (
              <div className={styles.fields}>
                <label>Full name<input name="name" type="text" autoComplete="name" placeholder="Your name" required /></label>
                <div className={styles.fieldRow}>
                  <label>Birthday<input name="birthday" type="date" autoComplete="bday" required /></label>
                  <label>City<input name="city" type="text" autoComplete="address-level2" placeholder="Phoenix" required /></label>
                </div>
                <label>Gender
                  <select name="gender" defaultValue="" required>
                    <option value="" disabled>Select an option</option>
                    <option>Woman</option>
                    <option>Man</option>
                    <option>Non-binary</option>
                    <option>Prefer not to say</option>
                  </select>
                </label>
                <label>Username<input name="username" type="text" autoComplete="username" placeholder="Choose a username" required /></label>
              </div>
            ) : (
              <div className={styles.fields}>
                <label>Username<input name="username" type="text" autoComplete="username" placeholder="Your username" required /></label>
              </div>
            )}

            <label className={styles.passwordField}>Password
              <span className={styles.passwordInput}>
                <input name="password" type={showPassword ? 'text' : 'password'} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                <button className={styles.eyeButton} type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </span>
            </label>

            {mode === 'signup' && (
              <div className={styles.strength} aria-live="polite">
                <div className={styles.strengthTop}><span>Password strength</span><strong>{password ? strengthLabel : 'Use 8+ characters'}</strong></div>
                <div className={styles.strengthBar} aria-hidden="true">{[0, 1, 2, 3].map((level) => <span className={level < strength ? styles.filled : ''} key={level} />)}</div>
                <p>Use 8+ characters with an uppercase letter, number, and symbol.</p>
              </div>
            )}

            {mode === 'signin' && <button className={styles.forgotButton} type="button">Forgot password?</button>}
            <button className={styles.submitButton} type="submit">{mode === 'signup' ? 'Create account' : 'Sign in'} <span aria-hidden="true">-&gt;</span></button>
          </form>
          <p className={styles.formFooter}>{mode === 'signup' ? 'Already have an account?' : 'New to LawTrack?'} <button type="button" onClick={() => switchMode(mode === 'signup' ? 'signin' : 'signup')}>{mode === 'signup' ? 'Sign in' : 'Create an account'}</button></p>
        </section>
      </div>
    </main>
  );
};
