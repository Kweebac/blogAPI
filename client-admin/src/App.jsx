import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Posts from "./components/Posts";
import DetailedPost from "./components/DetailedPost";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import Register from "./components/Register";
import Login from "./components/Login";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate replace to="/posts" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/create" element={<CreatePost />} />
        <Route path="/posts/:postId" element={<DetailedPost />} />
        <Route path="/posts/:postId/edit" element={<EditPost />} />
      </Routes>
    </>
  );
}

export default App;
