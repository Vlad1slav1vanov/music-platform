import HomePage from "../../pages/home-page";
import { Route, Routes } from "react-router-dom";
import AlbumsPage from "../../pages/albums-page";
import TracksPage from "../../pages/tracks-page";
import SingleTrackPage from "../../pages/single-track-page";
import LoginPage from "../../pages/login-page";
import RegisterPage from "../../pages/register-page";
import ProfilePage from "../../pages/profile-page";
import SingleAlbumPage from "../../pages/single-album-page";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/albums" element={<AlbumsPage />} />
      <Route path="/albums/:id" element={<SingleAlbumPage />} />
      <Route path="/tracks" element={<TracksPage />} />
      <Route path="/tracks/:id" element={<SingleTrackPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  )
}

export default Routing;