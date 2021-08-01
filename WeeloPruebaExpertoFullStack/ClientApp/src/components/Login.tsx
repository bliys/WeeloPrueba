import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../store";
import * as LoginStore from "../store/LoginStore";
import "./Login.css";

type LoginProps = LoginStore.LoginState &
  typeof LoginStore.actionCreators &
  RouteComponentProps;

interface IState {
  user: string;
  pass: string;
}

class Login extends React.PureComponent<LoginProps> {
  state: Readonly<IState> = {
    user: "",
    pass: "",
  };

  constructor(props: LoginProps) {
    super(props);
  }

  public buttonOptions = {
    text: "Register",
    type: "success",
    useSubmitBehavior: true,
  };

  public submitLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (this.state.user.trim() === "" || this.state.pass.trim() === "") {
      return;
    }

    this.props.requestLogin(this.state.user, this.state.pass);
  };

  public handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  public render() {
    return (
      <React.Fragment>
        <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto align-middle c-principal">
          <div className="card card0 border-0">
            <div className="row d-flex">
              <div className="col-lg-6">
                <div className="card1 pb-5">
                  <div className="row">
                    <img src="./img/logo200x100.png" className="logo" alt="" />{" "}
                  </div>
                  <div className="row px-3 justify-content-center mt-4 border-line">
                    <img src="./img/react.png" className="image" alt="" />
                  </div>
                  <div className="row px-3 justify-content-center mt-4 message-p">
                    <p>React Js | Redux</p>
                    <span className="message-b">Training</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <form
                  onSubmit={this.submitLogin}
                  className="card2 card border-0 px-4 py-5"
                >
                  <div className="row px-3">
                    <label className="mb-1">
                      <h6 className="mb-0 text-sm">Usuario</h6>
                    </label>
                    <input
                      required
                      className="input-login mb-4"
                      type="text"
                      name="user"
                      placeholder="Enter a valid email address"
                      value={this.state.user}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className="row px-3">
                    <label className="mb-1">
                      <h6 className="mb-0 text-sm">Password*</h6>
                    </label>
                    <input
                      required
                      className="input-login"
                      type="password"
                      name="pass"
                      placeholder="Constraseña"
                      value={this.state.pass}
                      onChange={this.handleInputChange}
                    />
                  </div>

                  <div className="row mb-3 px-3">
                    <button type="submit" className="btn btn-red text-center">
                      Iniciar sesion{this.props.isLoading && <img alt="" style={{width:20, marginLeft:20}} src="./img/loading.gif" />}

                    </button>
                  </div>

                  <div className="row">
                    <div className="col-md-12" style={{ minHeight: 20, maxHeight: 20 }}>
                      {this.props.notFound && <p className="text-danger">*Usuario o contraseña incorrecto</p>}
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="bg-blue py-4">
              <div className="row px-3">
                <small className="ml-4 ml-sm-5 mb-2">
                  Copyright &copy; 2020. All rights reserved.
                </small>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.login,
  LoginStore.actionCreators
)(Login as any);