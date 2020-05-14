import React from 'react'
import { UserConsumer } from './Context/userContext'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import ErrorMessage from './errorMessage'
import jwt_decode from 'jwt-decode'
import Navbar from './Navigation'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            authorized: false,
            error: false,
            errorMessage: ''
        }
        this.onChange = this.onChange.bind(this)
        //this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })

    }

    verifyLogin(props) {
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('http://localhost:5000/users/login', user)
            .then(res => {
                if (res.statusText === 'OK') {
                    const userDetails = jwt_decode(res.data)
                    props.setUser({ name: userDetails.user_name, id: userDetails._id, isAdmin: userDetails.isAdmin, token: res.data })
                }
            }).then(() => {
                this.setState({ authorized: true })
            })
            .catch(err => {
                this.setState({ error: true })
                this.setState({ errorMessage: `${err.response.data}` })
            })
    }



    async redirectToHome(props, e) {
        e.preventDefault()
        console.log('checkpoint')
        const result = await this.verifyLogin(props)

        //if(result) return console.log('result:')
        // if (res.status === 'ok') {
        //     this.setState({ authorized: true })
        //     console.log(this.state.authorized)
        // }
    }

    render() {
        return (
            (!this.state.authorized) ?
                (<UserConsumer>
                    {props => {
                        return <div>
                            <Navbar />
                            <div className='container mt-5 pt-5'>
                                <form noValidate onSubmit={(e) => this.redirectToHome(props, e)}>
                                    <h1 className='text-light'>Sign in</h1>
                                    <div className='form-group'>


                                        <label htmlFor='email' className='text-light'>Email address</label>
                                        <input
                                            type='email'
                                            className='form-control'
                                            name='email'
                                            placeholder='Enter email'
                                            value={this.state.email}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="password" className='text-light'>Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            placeholder="Password"
                                            value={this.state.password}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-lg btn-primary btn-block"
                                    >
                                        Sign in
                    </button>
                                </form>
                            </div>
                            <ErrorMessage onClose={() => this.setState({ error: false })} show={this.state.error} text={this.state.errorMessage} />
                        </div>
                    }}
                </UserConsumer>
                ) :

                (
                    <Redirect
                        to={{ pathname: "/" }}
                    />
                )
        )
    }
}

