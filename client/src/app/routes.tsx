import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AlbumDetailsPage from 'pages/album-details-page'
import AlbumUploadPage from 'pages/album-upload-page'
import AlbumsPage from 'pages/albums-page'
import HomePage from 'pages/home-page'
import LoginPage from 'pages/login-page'
import RegisterPage from 'pages/register-page'
import TrackDetailsPage from 'pages/track-details-page'
import TracksListPage from 'pages/tracks-list-page'
import UploadTrackPage from 'pages/upload-track-page'

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/albums' element={<AlbumsPage />}/>
        <Route path='/albums/:albumId' element={<AlbumDetailsPage />}/>
        <Route path='/albums/upload' element={<AlbumUploadPage />}/>
        <Route path='/tracks' element={<TracksListPage />}/>
        <Route path='/tracks/:trackId' element={<TrackDetailsPage />}/>
        <Route path='/tracks/upload' element={<UploadTrackPage />}/>
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/login' element={<LoginPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
