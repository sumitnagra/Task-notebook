import React, { useState, useContext } from 'react';
import Notecontext from './Notecontext';
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

interface User {
  name: string;
  email: string;
  password: string;
}

interface SignUpProps {
  showAlert: (message: string, type: string) => void;
}

const SignUP: React.FC<SignUpProps> = (props) => {
  const [progress, setProgress] = useState<number>(0);
  const [user, setUser] = useState<User>({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const a = useContext(Notecontext);
  const host = 'https://sumitportfolio-u9sd.onrender.com';

  const signup = async (user: User) => {
    setProgress(30);
    const response = await fetch(`${host}/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: user.name, email: user.email, password: user.password }),
    });

    const json = await response.json();

    if (json) {
      setProgress(70);
      localStorage.setItem('auth-token', json.jwtData);
      navigate('/login');
      props.showAlert('Account created successfully', 'success');
      setProgress(100);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup(user);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
      <LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => setProgress(0)} />
      <br />
      <br />
      <div className="container" data-aos="fade-left">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card-group mb-0">
              <div className="card p-4">
                <div className="card-body">
                  <h1>Create Account</h1>
                  <p className="text-muted">Signup your account</p>
                  <div className="input-group mb-3">
                    <span className="input-group-addon">
                      <i className="fa fa-user mx-1"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      name="name"
                      onChange={onChange}
                      required
                      minLength={3}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-addon">
                      <i className="fa-regular fa-envelope mx-1"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="input-group mb-4">
                    <span className="input-group-addon">
                      <i className="fa fa-lock mx-1"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      onChange={onChange}
                      minLength={5}
                      required
                    />
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <button type="button" className="btn btn-primary px-4 mx-3" onClick={handleSubmit}>
                        Register
                      </button>
                    </div>
                    <div className="col-6 text-right">
                      <button type="button" className="btn btn-link px-0">
                        Forgot password?
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card text-white bg-primary py-5 d-md-down-none suggestion">
                <div className="card-body text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Please create an account if you are the first-time visitor on iNotebook. If you already have an
                      account, please login instead of Signup.
                    </p>
                    <button type="button" className="btn btn-primary active mt-3" onClick={handleSubmit}>
                      Register Now!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUP;
