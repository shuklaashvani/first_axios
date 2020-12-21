import React, { Component } from "react";
import axios from "axios";
import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";

class Blog extends Component {
  state = {
    posts: [],
    PostId: null,
  };
  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
      const post = response.data.slice(0, 4);
      const updatePost = post.map((posts) => {
        return {
          ...posts,
          author: "Max",
        };
      });
      this.setState({ posts: updatePost });
    });
  }

  postSelect = (id) => {
    this.setState({ PostId: id });
  };

  render() {
    const posts = this.state.posts.map((post) => {
      return (
        <Post
          key={post.id}
          title={post.title}
          Author={post.author}
          clicked={() => {
            this.postSelect(post.id);
          }}
        />
      );
    });

    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost id={this.state.PostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
