import React from 'react';
import ReactDOM from 'react-dom';

class LoginComponent extends React.Component {
    constructor(props)
    {
        super(props);
    }
    render(){
                                    return (
                                        <form id="login" name="login" method="post" action="login">
                                                        <label for="email">Email Address</label>
                                                        <input class="text" name="email" type="text" required />
                                                        <br/>
                                                        <label for="password">Password</label>
                                                        <input name="password" type="password" />
                                                        <br/>
                                                        <input class="btn" type="submit" value="Login " required />
                                        </form>
                                    );
    }
}

export default LoginComponent;