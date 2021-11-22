import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { postSetupLogin } from '../../store/login';

const Login = (props: any) => {

    const [ id, setStateId ] = useState('');
    const [ pw, setStatePw ] = useState('');
    const [ error, setError ] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem('authorization')) {
            sessionStorage.removeItem('authorization');
        }
        if (props.login && props.login.status === 'SUCCESS') {
            sessionStorage.setItem('authorization', 'success');
            props.history.push('/setup');
        }
        if (props.login && props.login.status === 'FAILURE') {
            setError(true);
        }
    }, [props] );

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>, id: string, pw: string) => {
        event.preventDefault();
        props.postSetupLogin({ id, pw });
        setStateId('');
        setStatePw('');
    }

    return (
        <div className="wrap" style={{ backgroundImage: `url(${`${ process.env.PUBLIC_URL }/assets/images/login_bg.jpg`})` } }>
            <section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 text-center mb-5">
                            <h2 className="heading-section">VURIX-DMS-PLATFORM</h2>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-4">
                            <div className="login-wrap p-0">
                                <h3 className="mb-4 text-center">셋업 설정 로그인</h3>
                                <form className="signin-form" onSubmit={ event => onFormSubmit(event, id, pw) }>
                                    <div className="form-group">
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="아이디" 
                                            value={ id }
                                            onChange={ event => setStateId(event.target.value) }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            placeholder="비밀번호" 
                                            autoComplete="off"
                                            value={ pw }
                                            onChange={ event => setStatePw(event.target.value) }  
                                        />
                                    </div>
                                    <div className="form-group">
                                        <button 
                                            type="submit" 
                                            className="form-control btn btn-primary submit px-3"
                                        >로그인</button>
                                    </div>
                                </form>
                                { error ? <span className="login-error">아이디 또는 비밀번호가 일치하지 않습니다.</span> : null }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

interface IStateToProps {
    loginState : {
        login: {
            status: string;
        }
    }
}

const mapStateToProps = ({ loginState }: IStateToProps) => {
    return loginState;
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({ postSetupLogin }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);