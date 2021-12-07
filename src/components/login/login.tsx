import React, { useState, useEffect } from 'react';
// react-redux lib
import { useDispatch, useSelector } from 'react-redux';

// fetch
import { postLogin } from '../../store/login';


const Login = (props: any) => {
    console.log(props);
    const [ id, setStateId ] = useState('');
    const [ pw, setStatePw ] = useState('');
    const [ error, setError ] = useState(false);

    // 상태 조회
    const { loginState } = useSelector((state:any) => ({loginState: state.login}));

    // 액션 디스패치
    const dispatch = useDispatch();

    useEffect(() => {
        if (sessionStorage.getItem('authorization')) {
            sessionStorage.removeItem('authorization');
        }
        if (loginState && loginState.status === 'SUCCESS') {
            sessionStorage.setItem('authorization', 'success');
            props.history.push('/setup');
        }
        if (loginState && loginState.status === 'FAILURE') {
            setError(true);
        }
    });

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>, id: string, pw: string) => {
        event.preventDefault();
        dispatch(postLogin({ id, pw }));
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

export default Login;