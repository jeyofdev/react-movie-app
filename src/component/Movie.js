import react, { Component } from 'react'
import axios from 'axios'
import '../style/css/Movie.css'

class Movie extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            poster: '',
            comment: '',
            message: null,
            error: false,
            post: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({ post: true })

        axios.post('https://post-a-form.herokuapp.com/api/movies/', this.state)
            .then(response => response.data)
            .then(data => {
                console.log(`The film ${data.title} has been added.`);
                this.setState({
                    error: false,
                    message: `The film ${data.title} has been added.`,
                    title: '',
                    poster: '',
                    comment: '',
                })
            })
            .catch(e => {
                console.error(`Error while adding the movie`);
                this.setState({ 
                    error: true,
                    message: 'There was a problem, the movie was not added'
                })
            })
    }

    render () {
        const { title, poster, comment, message, error, post } = this.state;
        const alertClassName = (post && error)? 'alert alert-danger' : 'alert alert-success'

        return (
            <div className="Movie">
                {post && <p className={alertClassName}>{message}</p>}
                <form onSubmit={this.handleSubmit} >
                    <div className="form-data">
                        <label htmlFor="title">Title :</label>
                        <input 
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="form-data">
                        <label htmlFor="poster">Image url :</label>
                        <input 
                            type="url"
                            id="poster"
                            name="poster"
                            value={poster}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="form-data">
                        <label htmlFor="comment">Comment :</label>
                        <textarea 
                            type="text"
                            id="comment"
                            name="comment"
                            rows="8"
                            value={comment}
                            onChange={this.handleChange}
                        />
                    </div>

                    <button type="submit">Add</button>
                </form>
            </div>
        )
    }
}

export default Movie